// ─── Core ─────────────────────────────────────────────────────────────────────
export type Lang = 'en' | 'uk';
export type AppMode = 'program' | 'consortium';

export interface BilingualText {
  en: string;
  uk: string;
}

// ─── Program map types ────────────────────────────────────────────────────────
export enum NodeCategory {
  CENTER   = 'CENTER',
  WHY      = 'WHY',
  REMEMBER = 'REMEMBER',
  COCREATE = 'COCREATE',
  REBUILD  = 'REBUILD',
  WHO      = 'WHO',
  HOW      = 'HOW',
  WHERE    = 'WHERE',
  WHAT     = 'WHAT',
}

export interface SpilnoNodeData {
  label: BilingualText;
  subtitle?: BilingualText;
  shortDesc: BilingualText;
  inspectorSummary: BilingualText;
  whitepaperDetail: BilingualText;
  whitepaperRef?: string;
  category: NodeCategory;
  icon: string;
  depth: 0 | 1 | 2;
  branchId: string;
  leafIndex?: number;
}

// ─── Consortium types ─────────────────────────────────────────────────────────
export type PartnerStatus = 'proposed' | 'contacted' | 'in_dialog' | 'confirmed' | 'declined';
export type UserRole = 'coordinator' | 'partner' | 'observer';

export enum PartnerCategory {
  CENTER    = 'CENTER',
  LEAD      = 'LEAD',
  TECHNICAL = 'TECHNICAL',
  FINANCING = 'FINANCING',
  PUBLIC    = 'PUBLIC',
  CIVIL     = 'CIVIL',
}

export interface PartnerNodeData {
  name: BilingualText;
  shortDesc: BilingualText;
  description: BilingualText;
  category: PartnerCategory;
  status: PartnerStatus;
  icon: string;
  depth: 0 | 1 | 2;
  branchId: string;
  leafIndex?: number;
  country?: string;
  website?: string;
  contactEmail?: string;
  commitmentType?: BilingualText;
  financingAmount?: number;
  financingCurrency?: string;
  ndaSigned?: boolean;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organisation?: string;
}

// ─── Comments ─────────────────────────────────────────────────────────────────
export interface Comment {
  id: string;
  nodeId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  text: string;
  timestamp: number;
}

// ─── Proposals ────────────────────────────────────────────────────────────────
export interface Proposal {
  id: string;
  submitterId: string;
  submitterName: string;
  submitterOrg?: string;
  nameEn: string;
  nameUk: string;
  descriptionEn: string;
  descriptionUk: string;
  category: PartnerCategory;
  proposedStatus: PartnerStatus;
  reviewStatus: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}

// ─── Activity ─────────────────────────────────────────────────────────────────
export interface ActivityItem {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: 'comment' | 'proposal' | 'status_change' | 'join';
  nodeId?: string;
  nodeName?: string;
  detail?: string;
  timestamp: number;
}

// ─── Chat (Gemini) ────────────────────────────────────────────────────────────
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
