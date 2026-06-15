import React, { memo, useContext } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  Globe, HeartHandshake, Layers, Users, ShieldCheck, MapPin,
  Brain, MessageSquare, Building2, BarChart3, Heart, Network,
  Landmark, Sparkles, Clock, Cpu, Satellite, ZoomIn, Wifi,
  Eye, ListChecks, Lightbulb, Vote, Smartphone, ClipboardList,
  ShieldAlert, Factory, HardHat, LayoutGrid, Home, Flag,
  Euro, GraduationCap, Target, Archive, UserCheck, Recycle,
  Wrench, Unlock, Shield, Compass, TrendingUp, Globe2,
  CircleDollarSign, CheckCircle, AlertTriangle, Database,
} from 'lucide-react';
import { SpilnoNodeData, NodeCategory } from '../types';
import { LangContext } from '../App';

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, HeartHandshake, Layers, Users, ShieldCheck, MapPin,
  Brain, MessageSquare, Building2, BarChart3, Heart, Network,
  Landmark, Sparkles, Clock, Cpu, Satellite, ZoomIn, Wifi,
  Eye, ListChecks, Lightbulb, Vote, Smartphone, ClipboardList,
  ShieldAlert, Factory, HardHat, LayoutGrid, Home, Flag,
  Euro, GraduationCap, Target, Archive, UserCheck, Recycle,
  Wrench, Unlock, Shield, Compass, TrendingUp, Globe2,
  CircleDollarSign, CheckCircle, AlertTriangle, Database,
};

// ─── Category → colours ──────────────────────────────────────────────────────
type ColourSet = { border: string; bg: string; icon: string; glow: string };
const CAT_COLOURS: Record<NodeCategory, ColourSet> = {
  [NodeCategory.CENTER]:   { border: 'border-yellow-400',  bg: 'bg-yellow-950/40',  icon: 'text-yellow-300',  glow: 'shadow-yellow-500/20' },
  [NodeCategory.WHY]:      { border: 'border-blue-500',    bg: 'bg-blue-950/40',    icon: 'text-blue-400',    glow: 'shadow-blue-500/20'   },
  [NodeCategory.WHAT]:     { border: 'border-indigo-500',  bg: 'bg-indigo-950/40',  icon: 'text-indigo-400',  glow: 'shadow-indigo-500/20' },
  [NodeCategory.REMEMBER]: { border: 'border-sky-500',     bg: 'bg-sky-950/40',     icon: 'text-sky-400',     glow: 'shadow-sky-500/20'    },
  [NodeCategory.COCREATE]: { border: 'border-green-500',   bg: 'bg-green-950/40',   icon: 'text-green-400',   glow: 'shadow-green-500/20'  },
  [NodeCategory.REBUILD]:  { border: 'border-amber-500',   bg: 'bg-amber-950/40',   icon: 'text-amber-400',   glow: 'shadow-amber-500/20'  },
  [NodeCategory.WHO]:      { border: 'border-purple-500',  bg: 'bg-purple-950/40',  icon: 'text-purple-400',  glow: 'shadow-purple-500/20' },
  [NodeCategory.HOW]:      { border: 'border-pink-500',    bg: 'bg-pink-950/40',    icon: 'text-pink-400',    glow: 'shadow-pink-500/20'   },
  [NodeCategory.WHERE]:    { border: 'border-cyan-500',    bg: 'bg-cyan-950/40',    icon: 'text-cyan-400',    glow: 'shadow-cyan-500/20'   },
};

const ALL_HANDLES = (
  <>
    <Handle type="target"  position={Position.Top}    className="!bg-slate-500 !w-2 !h-2 !opacity-30" />
    <Handle type="target"  position={Position.Left}   className="!opacity-0 !w-1 !h-1" id="tl" />
    <Handle type="source"  position={Position.Bottom} className="!bg-slate-500 !w-2 !h-2 !opacity-30" />
    <Handle type="source"  position={Position.Right}  className="!opacity-0 !w-1 !h-1" id="r" />
  </>
);

const CustomNode = ({ data }: NodeProps<SpilnoNodeData>) => {
  const { lang } = useContext(LangContext);
  const c = CAT_COLOURS[data.category];
  const IconComp = ICON_MAP[data.icon] ?? Globe;

  // ── Center node ─────────────────────────────────────────────────────────
  if (data.depth === 0) {
    return (
      <div className={`relative w-[150px] h-[150px] rounded-full border-2 ${c.border} ${c.bg} backdrop-blur-md shadow-2xl ${c.glow} flex flex-col items-center justify-center text-center p-3 transition-all hover:scale-105`}>
        {ALL_HANDLES}
        <div className={`p-2 rounded-full bg-slate-900/60 mb-2`}>
          <IconComp className={`w-6 h-6 ${c.icon}`} />
        </div>
        <div className="text-[11px] font-black text-white uppercase tracking-widest leading-tight">
          {data.label[lang]}
        </div>
        <div className={`text-[9px] ${c.icon} mt-1 leading-tight`}>
          {data.shortDesc[lang]}
        </div>
      </div>
    );
  }

  // ── Depth-1 branch node ──────────────────────────────────────────────────
  if (data.depth === 1) {
    return (
      <div className={`relative min-w-[155px] max-w-[180px] rounded-xl border-2 ${c.border} ${c.bg} backdrop-blur-md shadow-xl ${c.glow} p-3 transition-all hover:scale-105`}>
        {ALL_HANDLES}
        <div className="flex items-center gap-2 mb-1.5">
          <div className={`p-1.5 rounded-full bg-slate-900/60 flex-shrink-0`}>
            <IconComp className={`w-4 h-4 ${c.icon}`} />
          </div>
          <h3 className="text-[10px] font-bold text-slate-100 uppercase tracking-wider leading-tight">
            {data.label[lang]}
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
    <div className={`relative min-w-[145px] max-w-[170px] rounded-xl border ${c.border} ${c.bg} backdrop-blur-md shadow-lg p-2.5 transition-all hover:scale-105`}>
      {ALL_HANDLES}
      <div className="flex items-center gap-1.5 mb-1">
        <IconComp className={`w-3.5 h-3.5 ${c.icon} flex-shrink-0`} />
        <h3 className="text-[9px] font-bold text-slate-200 uppercase tracking-wide leading-tight">
          {data.label[lang]}
        </h3>
      </div>
      <div className="text-[8px] text-slate-400 leading-snug line-clamp-2">
        {data.shortDesc[lang]}
      </div>
    </div>
  );
};

export default memo(CustomNode);
