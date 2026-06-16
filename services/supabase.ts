import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co');

export const supabase: SupabaseClient | null = (() => {
  if (!isSupabaseConfigured) return null;
  try {
    return createClient(supabaseUrl!, supabaseAnonKey!);
  } catch (e) {
    console.warn('[Spilno] Supabase client init failed — falling back to localStorage:', e);
    return null;
  }
})();
