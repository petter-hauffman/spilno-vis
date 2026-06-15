export type Lang = 'en' | 'uk';

export interface BilingualText {
  en: string;
  uk: string;
}

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
  /** which top-level branch this node belongs to (used by layout.ts) */
  branchId: string;
  /** for depth-2 leaves: position index within their branch group */
  leafIndex?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
