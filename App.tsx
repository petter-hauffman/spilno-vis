import React, {
  useState, useCallback, useContext, useEffect, Component, ErrorInfo,
} from 'react';

// ─── Error Boundary ──────────────────────────────────────────────────────────
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Spilno] Render error:', error, info);
    // Auto-retry once — first-render timing issue (contexts resolve on 2nd mount)
    setTimeout(() => this.setState({ error: null }), 50);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-8">
          <div className="bg-red-950/60 border border-red-500 rounded-xl p-6 max-w-lg w-full">
            <h2 className="text-red-300 font-bold text-lg mb-3">⚠️ Consortium Builder Error</h2>
            <pre className="text-red-200 text-xs whitespace-pre-wrap overflow-auto max-h-64">
              {this.state.error.message}
              {'\n\n'}
              {this.state.error.stack?.slice(0, 600)}
            </pre>
            <button
              onClick={() => this.setState({ error: null })}
              className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
import ReactFlow, {
  Background, Controls, useNodesState, useEdgesState,
  Node, ReactFlowProvider, BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { INITIAL_NODES, INITIAL_EDGES } from './constants';
import { CONSORTIUM_NODES, CONSORTIUM_EDGES } from './consortium-data';
import { computeLayout } from './layout';
import CustomNode from './components/CustomNode';
import ConsortiumNode from './components/ConsortiumNode';
import InspectorPanel from './components/InspectorPanel';
import ConsortiumPanel from './components/ConsortiumPanel';
import Header from './components/Header';
import MobileAccordion from './components/MobileAccordion';
import AuthModal from './components/AuthModal';
import UserBar from './components/UserBar';
import ActivityFeed from './components/ActivityFeed';
import ProposalForm from './components/ProposalForm';
import { Lang, AppMode, SpilnoNodeData, PartnerNodeData, PartnerStatus, User } from './types';
import { t } from './i18n';
import {
  getGuestUser, getSupabaseUser, fetchStatusOverrides, updatePartnerStatus,
} from './services/consortiumService';
import { supabase } from './services/supabase';

// ─── Contexts ────────────────────────────────────────────────────────────────
import { LangContext, AuthContext, AppModeContext } from './contexts';
export { LangContext, AuthContext, AppModeContext };

// ─── Node types ──────────────────────────────────────────────────────────────
const programNodeTypes = { custom: CustomNode };
const consortiumNodeTypes = { partner: ConsortiumNode };

// ─── Mode Toggle ─────────────────────────────────────────────────────────────
const ModeToggle: React.FC = () => {
  const { lang } = useContext(LangContext);
  const { mode, setMode } = useContext(AppModeContext);
  return (
    <div className="flex items-center bg-slate-800/70 border border-slate-700 rounded-lg p-0.5 gap-0.5">
      <button
        onClick={() => setMode('program')}
        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
          mode === 'program' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {t('modeProgram', lang)}
      </button>
      <button
        onClick={() => setMode('consortium')}
        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
          mode === 'consortium' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {t('modeConsortium', lang)}
      </button>
    </div>
  );
};

// ─── Language Toggle ─────────────────────────────────────────────────────────
const LangToggle: React.FC = () => {
  const { lang, setLang } = useContext(LangContext);
  return (
    <div className="flex items-center bg-slate-800/70 border border-slate-700 rounded-lg p-0.5 gap-0.5">
      {(['en', 'uk'] as Lang[]).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
            lang === l ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {l === 'en' ? '🇬🇧 EN' : '🇺🇦 UK'}
        </button>
      ))}
    </div>
  );
};

// ─── Program Flow ─────────────────────────────────────────────────────────────
const ProgramFlow: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(computeLayout(INITIAL_NODES));
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node<SpilnoNodeData> | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as Node<SpilnoNodeData>);
    setPanelOpen(true);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-950 relative overflow-hidden">
      <Header />
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={() => setPanelOpen(false)}
        nodeTypes={programNodeTypes}
        fitView fitViewOptions={{ padding: 0.15 }}
        className="bg-slate-950"
        defaultEdgeOptions={{ type: 'smoothstep', animated: true, style: { strokeWidth: 2 } }}
      >
        <Background color="#1e293b" gap={24} size={1} variant={BackgroundVariant.Dots} />
        <Controls
          className="!bg-slate-800 !border-slate-700 [&>button]:!fill-slate-300 [&>button:hover]:!bg-slate-700 [&>button]:!border-slate-600"
          style={{ bottom: 16, left: 16 }}
        />
      </ReactFlow>
      {panelOpen && selectedNode && (
        <InspectorPanel selectedNode={selectedNode} onClose={() => setPanelOpen(false)} />
      )}
    </div>
  );
};

// ─── Consortium Flow ──────────────────────────────────────────────────────────
const ConsortiumFlow: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const [nodes, setNodes, onNodesChange] = useNodesState(computeLayout(CONSORTIUM_NODES));
  const [edges, , onEdgesChange] = useEdgesState(CONSORTIUM_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node<PartnerNodeData> | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, PartnerStatus>>({});
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [proposalOpen, setProposalOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);

  // Load status overrides on mount
  useEffect(() => {
    fetchStatusOverrides().then(overrides => {
      if (Object.keys(overrides).length === 0) return;
      setStatusOverrides(overrides);
      setNodes(prev => prev.map(n => ({
        ...n,
        data: overrides[n.id] ? { ...n.data, status: overrides[n.id] } : n.data,
      })));
    }).catch(() => {});
  }, [setNodes]);

  const handleStatusChange = useCallback(async (nodeId: string, status: PartnerStatus) => {
    if (!user) return;
    const node = nodes.find(n => n.id === nodeId);
    await updatePartnerStatus(nodeId, status, user, node?.data.name.en);
    setStatusOverrides(prev => ({ ...prev, [nodeId]: status }));
    setNodes(prev => prev.map(n =>
      n.id === nodeId ? { ...n, data: { ...n.data, status } } : n
    ));
    setSelectedNode(prev =>
      prev?.id === nodeId ? { ...prev, data: { ...prev.data, status } } : prev
    );
  }, [user, nodes, setNodes]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as Node<PartnerNodeData>);
    setPanelOpen(true);
  }, []);

  const currentStatus = selectedNode
    ? (statusOverrides[selectedNode.id] ?? selectedNode.data.status)
    : 'proposed';

  // Stats
  const confirmedCount = nodes.filter(n =>
    (statusOverrides[n.id] ?? (n.data as PartnerNodeData).status) === 'confirmed'
  ).length;
  const totalFunding = nodes.reduce((sum, n) => {
    const pn = n.data as PartnerNodeData;
    return sum + (pn.financingAmount ?? 0);
  }, 0);

  return (
    <div className="w-full h-screen bg-slate-950 relative overflow-hidden">

      {/* ── Top header bar ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2.5 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/60 gap-3">
        {/* Left */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-sm font-black text-white tracking-wider">🇺🇦 SPILNO</span>
          <ModeToggle />
          <LangToggle />
        </div>
        {/* Center stats */}
        <div className="hidden md:flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-green-400 font-semibold">{confirmedCount}</span> confirmed
          </span>
          <span className="text-slate-600">|</span>
          <span>
            <span className="text-green-400 font-semibold">{totalFunding}</span> M€ mapped
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            in dialogue
          </span>
        </div>
        {/* Right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setActivityOpen(v => !v)}
            className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors border ${
              activityOpen
                ? 'bg-blue-600 text-white border-blue-500'
                : 'text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 border-slate-700'
            }`}
          >
            {t('activityFeed', 'en')}
          </button>
          <UserBar onSignInClick={() => setAuthModalOpen(true)} />
        </div>
      </div>

      {/* ── ReactFlow ── */}
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={() => setPanelOpen(false)}
        nodeTypes={consortiumNodeTypes}
        fitView fitViewOptions={{ padding: 0.12 }}
        className="bg-slate-950"
        style={{ paddingTop: '3.5rem' }}
        defaultEdgeOptions={{ type: 'smoothstep', animated: false, style: { strokeWidth: 1.5 } }}
      >
        <Background color="#1e293b" gap={24} size={1} variant={BackgroundVariant.Dots} />
        <Controls
          className="!bg-slate-800 !border-slate-700 [&>button]:!fill-slate-300 [&>button:hover]:!bg-slate-700 [&>button]:!border-slate-600"
          style={{ bottom: 60, left: 16 }}
        />
      </ReactFlow>

      {/* ── Status legend ── */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1">
        {(['proposed','contacted','in_dialog','confirmed','declined'] as PartnerStatus[]).map(s => (
          <div key={s} className="flex items-center gap-1.5 text-[9px] text-slate-400">
            <span className={`w-1.5 h-1.5 rounded-full ${
              s === 'proposed' ? 'bg-slate-400' :
              s === 'contacted' ? 'bg-yellow-400' :
              s === 'in_dialog' ? 'bg-blue-400' :
              s === 'confirmed' ? 'bg-green-400' : 'bg-red-500'
            }`} />
            {s.replace('_', ' ')}
          </div>
        ))}
      </div>

      {/* ── Propose button ── */}
      <button
        onClick={() => user ? setProposalOpen(true) : setAuthModalOpen(true)}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-xs font-semibold shadow-lg transition-colors"
      >
        + {t('proposePartner', 'en')}
      </button>

      {/* ── Panels ── */}
      {panelOpen && selectedNode && (
        <ConsortiumPanel
          selectedNode={selectedNode}
          currentStatus={currentStatus as PartnerStatus}
          onStatusChange={handleStatusChange}
          onClose={() => setPanelOpen(false)}
          onSignInClick={() => setAuthModalOpen(true)}
          onProposeClick={() => setProposalOpen(true)}
        />
      )}
      {activityOpen && <ActivityFeed onClose={() => setActivityOpen(false)} />}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onUser={u => { setUser(u); setAuthModalOpen(false); }}
        />
      )}
      {proposalOpen && user && (
        <ProposalForm
          onClose={() => setProposalOpen(false)}
          onSubmitted={() => setProposalOpen(false)}
        />
      )}
    </div>
  );
};

// ─── AppInner — mobile / desktop / mode switch ────────────────────────────────
const AppInner: React.FC = () => {
  const { mode } = useContext(AppModeContext);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return <MobileAccordion />;
  }

  return (
    mode === 'program'
      ? <ReactFlowProvider><ProgramFlow /></ReactFlowProvider>
      : <ReactFlowProvider><ErrorBoundary><ConsortiumFlow /></ErrorBoundary></ReactFlowProvider>
  );
};

// ─── App root ─────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [lang, setLang] = useState<Lang>('en');
  const [mode, setMode] = useState<AppMode>('program');
  const [user, setUser] = useState<User | null>(null);

  // Initialise user session on mount
  useEffect(() => {
    const init = async () => {
      const sbUser = await getSupabaseUser();
      if (sbUser) { setUser(sbUser); return; }
      const guestUser = getGuestUser();
      if (guestUser) setUser(guestUser);
    };
    init();

    // Supabase auth state listener
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
        if (event === 'SIGNED_IN') {
          const u = await getSupabaseUser();
          if (u) setUser(u);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <AppModeContext.Provider value={{ mode, setMode }}>
          <AppInner />
        </AppModeContext.Provider>
      </AuthContext.Provider>
    </LangContext.Provider>
  );
};

export default App;
