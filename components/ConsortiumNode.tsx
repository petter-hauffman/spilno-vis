import React, { memo, useContext } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  Globe, Landmark, Cpu, CircleDollarSign, Flag, GraduationCap,
  ClipboardList, Users, ShieldCheck, Satellite, LayoutGrid,
  Globe2, HardHat, Euro, TrendingUp, Recycle, Network,
  Building2, Compass, Vote, HeartHandshake, Heart, Brain,
  MessageSquare, CheckCircle, AlertTriangle,
} from 'lucide-react';
import { PartnerNodeData, PartnerCategory, PartnerStatus } from '../types';
import { LangContext } from '../App';

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Landmark, Cpu, CircleDollarSign, Flag, GraduationCap,
  ClipboardList, Users, ShieldCheck, Satellite, LayoutGrid,
  Globe2, HardHat, Euro, TrendingUp, Recycle, Network,
  Building2, Compass, Vote, HeartHandshake, Heart, Brain,
  MessageSquare, CheckCircle, AlertTriangle,
};

// ─── Category colours ────────────────────────────────────────────────────────
type ColourSet = { border: string; bg: string; icon: string };
const CAT_COLOURS: Record<PartnerCategory, ColourSet> = {
  [PartnerCategory.CENTER]:    { border: 'border-yellow-400', bg: 'bg-yellow-950/40', icon: 'text-yellow-300' },
  [PartnerCategory.LEAD]:      { border: 'border-purple-500', bg: 'bg-purple-950/40', icon: 'text-purple-400' },
  [PartnerCategory.TECHNICAL]: { border: 'border-sky-500',    bg: 'bg-sky-950/40',    icon: 'text-sky-400'    },
  [PartnerCategory.FINANCING]: { border: 'border-green-500',  bg: 'bg-green-950/40',  icon: 'text-green-400'  },
  [PartnerCategory.PUBLIC]:    { border: 'border-amber-500',  bg: 'bg-amber-950/40',  icon: 'text-amber-400'  },
  [PartnerCategory.CIVIL]:     { border: 'border-pink-500',   bg: 'bg-pink-950/40',   icon: 'text-pink-400'   },
};

// ─── Status indicator styles ─────────────────────────────────────────────────
const STATUS_DOT: Record<PartnerStatus, string> = {
  proposed:  'bg-slate-400',
  contacted: 'bg-yellow-400',
  in_dialog: 'bg-blue-400 animate-pulse',
  confirmed: 'bg-green-400',
  declined:  'bg-red-500',
};

const STATUS_RING: Record<PartnerStatus, string> = {
  proposed:  'ring-slate-600/40',
  contacted: 'ring-yellow-500/40',
  in_dialog: 'ring-blue-500/50',
  confirmed: 'ring-green-400/60',
  declined:  'ring-red-600/40',
};

const ALL_HANDLES = (
  <>
    <Handle type="target"  position={Position.Top}    className="!bg-slate-500 !w-2 !h-2 !opacity-30" />
    <Handle type="target"  position={Position.Left}   className="!opacity-0 !w-1 !h-1" id="tl" />
    <Handle type="source"  position={Position.Bottom} className="!bg-slate-500 !w-2 !h-2 !opacity-30" />
    <Handle type="source"  position={Position.Right}  className="!opacity-0 !w-1 !h-1" id="r" />
  </>
);

const ConsortiumNode = ({ data }: NodeProps<PartnerNodeData>) => {
  const { lang } = useContext(LangContext);
  const c = CAT_COLOURS[data.category];
  const IconComp = ICON_MAP[data.icon] ?? Globe;
  const statusDot = STATUS_DOT[data.status];
  const statusRing = STATUS_RING[data.status];

  // ── Center node ─────────────────────────────────────────────────────────
  if (data.depth === 0) {
    return (
      <div className={`relative w-[150px] h-[150px] rounded-full border-2 ${c.border} ${c.bg} backdrop-blur-md shadow-2xl ring-4 ${statusRing} flex flex-col items-center justify-center text-center p-3 transition-all hover:scale-105`}>
        {ALL_HANDLES}
        <div className="p-2 rounded-full bg-slate-900/60 mb-2">
          <IconComp className={`w-6 h-6 ${c.icon}`} />
        </div>
        <div className="text-[11px] font-black text-white uppercase tracking-widest leading-tight">
          {data.name[lang]}
        </div>
        <div className={`text-[9px] ${c.icon} mt-1 leading-tight`}>
          {data.shortDesc[lang]}
        </div>
        {/* Status dot */}
        <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full ${statusDot} ring-1 ring-slate-900`} />
      </div>
    );
  }

  // ── Depth-1 branch node ──────────────────────────────────────────────────
  if (data.depth === 1) {
    return (
      <div className={`relative min-w-[155px] max-w-[185px] rounded-xl border-2 ${c.border} ${c.bg} backdrop-blur-md shadow-xl ring-2 ${statusRing} p-3 transition-all hover:scale-105`}>
        {ALL_HANDLES}
        {/* Status dot */}
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${statusDot}`} />
        <div className="flex items-center gap-2 mb-1.5">
          <div className="p-1.5 rounded-full bg-slate-900/60 flex-shrink-0">
            <IconComp className={`w-4 h-4 ${c.icon}`} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-100 uppercase tracking-wider leading-tight pr-3">
            {data.name[lang]}
          </h3>
        </div>
        <div className="text-[9px] text-slate-300 leading-snug border-t border-white/10 pt-1.5 line-clamp-2">
          {data.shortDesc[lang]}
        </div>
      </div>
    );
  }

  // ── Depth-2 leaf node ────────────────────────────────────────────────────
  return (
    <div className={`relative min-w-[148px] max-w-[172px] rounded-xl border ${c.border} ${c.bg} backdrop-blur-md shadow-lg ring-1 ${statusRing} p-2.5 transition-all hover:scale-105`}>
      {ALL_HANDLES}
      {/* Status dot */}
      <div className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${statusDot}`} />
      <div className="flex items-center gap-1.5 mb-1">
        <IconComp className={`w-3.5 h-3.5 ${c.icon} flex-shrink-0`} />
        <h3 className="text-[9px] font-bold text-slate-200 uppercase tracking-wide leading-tight pr-3">
          {data.name[lang]}
        </h3>
      </div>
      <div className="text-[8px] text-slate-400 leading-snug line-clamp-2">
        {data.shortDesc[lang]}
      </div>
      {/* Financing amount badge */}
      {data.financingAmount && (
        <div className="mt-1 text-[8px] font-semibold text-green-400">
          {data.financingAmount} {data.financingCurrency ?? 'M€'}
        </div>
      )}
      {/* NDA indicator */}
      {data.ndaSigned && (
        <div className="mt-0.5 text-[7px] text-purple-400 font-medium">✓ NDA</div>
      )}
    </div>
  );
};

export default memo(ConsortiumNode);
