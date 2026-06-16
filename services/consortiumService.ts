import { supabase, isSupabaseConfigured } from './supabase';
import { Comment, Proposal, ActivityItem, PartnerStatus, PartnerCategory, User, UserRole } from '../types';

// ─── Local storage keys ───────────────────────────────────────────────────────
const LS = {
  comments:  (nodeId: string) => `spilno_comments_${nodeId}`,
  proposals: () => 'spilno_proposals',
  status:    (nodeId: string) => `spilno_status_${nodeId}`,
  activity:  () => 'spilno_activity',
  guest:     () => 'spilno_guest',
};

function uid() {
  return crypto.randomUUID();
}

// ─── Guest session (localStorage) ────────────────────────────────────────────
export function getGuestUser(): User | null {
  const raw = localStorage.getItem(LS.guest());
  if (!raw) return null;
  try { return JSON.parse(raw) as User; } catch { return null; }
}

export function saveGuestUser(name: string, organisation?: string): User {
  const existing = getGuestUser();
  const user: User = {
    id: existing?.id ?? uid(),
    email: '',
    name,
    role: 'observer',
    organisation,
  };
  localStorage.setItem(LS.guest(), JSON.stringify(user));
  return user;
}

// ─── Supabase auth ────────────────────────────────────────────────────────────
export async function signInWithMagicLink(email: string, name: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { data: { name } },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(LS.guest());
}

export async function getSupabaseUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  if (!profile) return null;
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name || session.user.email || '',
    role: profile.role as UserRole,
    organisation: profile.organisation,
  };
}

// ─── Comments ─────────────────────────────────────────────────────────────────
export async function fetchComments(nodeId: string): Promise<Comment[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('node_id', nodeId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return (data || []).map(row => ({
      id: row.id,
      nodeId: row.node_id,
      authorId: row.author_id ?? '',
      authorName: row.author_name,
      authorRole: row.author_role as UserRole,
      text: row.text,
      timestamp: new Date(row.created_at).getTime(),
    }));
  }
  const raw = localStorage.getItem(LS.comments(nodeId));
  return raw ? (JSON.parse(raw) as Comment[]) : [];
}

export async function addComment(
  nodeId: string,
  text: string,
  author: User
): Promise<Comment> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        node_id: nodeId,
        author_id: author.id,
        author_name: author.name,
        author_role: author.role,
        text,
      })
      .select()
      .single();
    if (error) throw error;
    const comment: Comment = {
      id: data.id,
      nodeId: data.node_id,
      authorId: data.author_id,
      authorName: data.author_name,
      authorRole: data.author_role as UserRole,
      text: data.text,
      timestamp: new Date(data.created_at).getTime(),
    };
    await logActivity({ actorName: author.name, actorRole: author.role, action: 'comment', nodeId, detail: text.slice(0, 80) });
    return comment;
  }
  // localStorage fallback
  const comment: Comment = {
    id: uid(),
    nodeId,
    authorId: author.id,
    authorName: author.name,
    authorRole: author.role,
    text,
    timestamp: Date.now(),
  };
  const existing = await fetchComments(nodeId);
  localStorage.setItem(LS.comments(nodeId), JSON.stringify([...existing, comment]));
  await logActivity({ actorName: author.name, actorRole: author.role, action: 'comment', nodeId, detail: text.slice(0, 80) });
  return comment;
}

export async function deleteComment(nodeId: string, commentId: string, userId: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('comments').delete().eq('id', commentId);
    return;
  }
  const existing = await fetchComments(nodeId);
  localStorage.setItem(LS.comments(nodeId), JSON.stringify(existing.filter(c => c.id !== commentId)));
}

// Subscribe to real-time comments (Supabase only; returns unsubscribe fn)
export function subscribeComments(nodeId: string, callback: (c: Comment) => void): () => void {
  if (!isSupabaseConfigured || !supabase) return () => {};
  const channel = supabase
    .channel(`comments:${nodeId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'comments',
      filter: `node_id=eq.${nodeId}`,
    }, payload => {
      const row = payload.new as Record<string, unknown>;
      callback({
        id: row.id as string,
        nodeId: row.node_id as string,
        authorId: (row.author_id ?? '') as string,
        authorName: row.author_name as string,
        authorRole: row.author_role as UserRole,
        text: row.text as string,
        timestamp: new Date(row.created_at as string).getTime(),
      });
    })
    .subscribe();
  return () => { supabase.removeChannel(channel); };
}

// ─── Partner status ───────────────────────────────────────────────────────────
export async function fetchStatusOverrides(): Promise<Record<string, PartnerStatus>> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('partner_status').select('node_id,status');
    const result: Record<string, PartnerStatus> = {};
    (data || []).forEach(row => { result[row.node_id] = row.status as PartnerStatus; });
    return result;
  }
  // Scan localStorage for all status keys
  const result: Record<string, PartnerStatus> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('spilno_status_')) {
      const nodeId = key.replace('spilno_status_', '');
      result[nodeId] = localStorage.getItem(key) as PartnerStatus;
    }
  }
  return result;
}

export async function updatePartnerStatus(
  nodeId: string,
  status: PartnerStatus,
  updatedBy: User,
  nodeName?: string
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('partner_status').upsert({
      node_id: nodeId,
      status,
      updated_by: updatedBy.id,
      updated_at: new Date().toISOString(),
    });
  } else {
    localStorage.setItem(LS.status(nodeId), status);
  }
  await logActivity({
    actorName: updatedBy.name,
    actorRole: updatedBy.role,
    action: 'status_change',
    nodeId,
    nodeName,
    detail: status,
  });
}

// ─── Proposals ────────────────────────────────────────────────────────────────
export async function fetchProposals(): Promise<Proposal[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false });
    return (data || []).map(row => ({
      id: row.id,
      submitterId: row.submitter_id ?? '',
      submitterName: row.submitter_name,
      submitterOrg: row.submitter_org,
      nameEn: row.name_en,
      nameUk: row.name_uk,
      descriptionEn: row.description_en ?? '',
      descriptionUk: row.description_uk ?? '',
      category: row.category as PartnerCategory,
      proposedStatus: 'proposed',
      reviewStatus: row.review_status as 'pending' | 'approved' | 'rejected',
      timestamp: new Date(row.created_at).getTime(),
    }));
  }
  const raw = localStorage.getItem(LS.proposals());
  return raw ? (JSON.parse(raw) as Proposal[]) : [];
}

export async function addProposal(
  proposal: Omit<Proposal, 'id' | 'reviewStatus' | 'timestamp'>,
  author: User
): Promise<Proposal> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('proposals')
      .insert({
        submitter_id: author.id,
        submitter_name: author.name,
        submitter_org: proposal.submitterOrg,
        name_en: proposal.nameEn,
        name_uk: proposal.nameUk,
        description_en: proposal.descriptionEn,
        description_uk: proposal.descriptionUk,
        category: proposal.category,
      })
      .select()
      .single();
    if (error) throw error;
    const result: Proposal = {
      id: data.id,
      submitterId: data.submitter_id,
      submitterName: data.submitter_name,
      submitterOrg: data.submitter_org,
      nameEn: data.name_en,
      nameUk: data.name_uk,
      descriptionEn: data.description_en ?? '',
      descriptionUk: data.description_uk ?? '',
      category: data.category,
      proposedStatus: 'proposed',
      reviewStatus: 'pending',
      timestamp: new Date(data.created_at).getTime(),
    };
    await logActivity({ actorName: author.name, actorRole: author.role, action: 'proposal', detail: proposal.nameEn });
    return result;
  }
  const result: Proposal = {
    ...proposal,
    id: uid(),
    reviewStatus: 'pending',
    timestamp: Date.now(),
  };
  const existing = await fetchProposals();
  localStorage.setItem(LS.proposals(), JSON.stringify([result, ...existing]));
  await logActivity({ actorName: author.name, actorRole: author.role, action: 'proposal', detail: proposal.nameEn });
  return result;
}

// ─── Activity log ─────────────────────────────────────────────────────────────
export async function fetchActivity(limit = 40): Promise<ActivityItem[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    return (data || []).map(row => ({
      id: row.id,
      actorName: row.actor_name,
      actorRole: row.actor_role as UserRole,
      action: row.action as ActivityItem['action'],
      nodeId: row.node_id,
      nodeName: row.node_name,
      detail: row.detail,
      timestamp: new Date(row.created_at).getTime(),
    }));
  }
  const raw = localStorage.getItem(LS.activity());
  if (!raw) return [];
  const items: ActivityItem[] = JSON.parse(raw);
  return items.slice(0, limit);
}

async function logActivity(item: Omit<ActivityItem, 'id' | 'timestamp'>): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('activity_log').insert({
      actor_name: item.actorName,
      actor_role: item.actorRole,
      action: item.action,
      node_id: item.nodeId,
      node_name: item.nodeName,
      detail: item.detail,
    });
    return;
  }
  const newItem: ActivityItem = { ...item, id: uid(), timestamp: Date.now() };
  const existing = await fetchActivity(200);
  localStorage.setItem(LS.activity(), JSON.stringify([newItem, ...existing].slice(0, 200)));
}

export function subscribeActivity(callback: (item: ActivityItem) => void): () => void {
  if (!isSupabaseConfigured || !supabase) return () => {};
  const channel = supabase
    .channel('activity_feed')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log' }, payload => {
      const row = payload.new as Record<string, unknown>;
      callback({
        id: row.id as string,
        actorName: row.actor_name as string,
        actorRole: row.actor_role as UserRole,
        action: row.action as ActivityItem['action'],
        nodeId: row.node_id as string | undefined,
        nodeName: row.node_name as string | undefined,
        detail: row.detail as string | undefined,
        timestamp: new Date(row.created_at as string).getTime(),
      });
    })
    .subscribe();
  return () => { supabase.removeChannel(channel); };
}
