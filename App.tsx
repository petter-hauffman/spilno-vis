import React, { useState, useCallback, createContext, useContext } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  ReactFlowProvider,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { INITIAL_NODES, INITIAL_EDGES, SpilnoNode } from './constants';
import { computeLayout } from './layout';
import CustomNode from './components/CustomNode';
import InspectorPanel from './components/InspectorPanel';
import Header from './components/Header';
import MobileAccordion from './components/MobileAccordion';
import { Lang, SpilnoNodeData } from './types';

// ─── Language context ────────────────────────────────────────────────────────
export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
});

// ─── Node types ──────────────────────────────────────────────────────────────
const nodeTypes = { custom: CustomNode };

// ─── Main Flow canvas ────────────────────────────────────────────────────────
const Flow = () => {
  const [nodes, , onNodesChange] = useNodesState(computeLayout(INITIAL_NODES));
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [selectedNode, setSelectedNode] = useState<Node<SpilnoNodeData> | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as Node<SpilnoNodeData>);
    setPanelOpen(true);
  }, []);

  const onPaneClick = useCallback(() => {
    setPanelOpen(false);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-950 relative overflow-hidden">
      <Header />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        className="bg-slate-950"
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { strokeWidth: 2 },
        }}
      >
        <Background
          color="#1e293b"
          gap={24}
          size={1}
          variant={BackgroundVariant.Dots}
        />
        <Controls
          className="!bg-slate-800 !border-slate-700 [&>button]:!fill-slate-300 [&>button:hover]:!bg-slate-700 [&>button]:!border-slate-600"
          style={{ bottom: 16, left: 16 }}
        />
      </ReactFlow>

      {panelOpen && (
        <InspectorPanel
          selectedNode={selectedNode}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </div>
  );
};

// ─── App root — handles mobile vs desktop ───────────────────────────────────
const AppInner = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return isMobile ? <MobileAccordion /> : (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

const App = () => {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <AppInner />
    </LangContext.Provider>
  );
};

export default App;
