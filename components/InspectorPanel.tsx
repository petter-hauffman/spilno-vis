import React, { useState, useRef, useEffect, useContext } from 'react';
import { X, Bot, Send, BookOpen, FileText, Link2 } from 'lucide-react';
import { Node } from 'reactflow';
import { SpilnoNodeData, NodeCategory, ChatMessage } from '../types';
import { LangContext } from '../App';
import { t } from '../i18n';
import { sendMessageToGemini } from '../services/geminiService';

interface Props {
  selectedNode: Node<SpilnoNodeData> | null;
  onClose: () => void;
}

const CAT_HEADER: Record<NodeCategory, string> = {
  [NodeCategory.CENTER]:   'bg-yellow-900/60 border-b border-yellow-700',
  [NodeCategory.WHY]:      'bg-blue-900/60 border-b border-blue-700',
  [NodeCategory.WHAT]:     'bg-indigo-900/60 border-b border-indigo-700',
  [NodeCategory.REMEMBER]: 'bg-sky-900/60 border-b border-sky-700',
  [NodeCategory.COCREATE]: 'bg-green-900/60 border-b border-green-700',
  [NodeCategory.REBUILD]:  'bg-amber-900/60 border-b border-amber-700',
  [NodeCategory.WHO]:      'bg-purple-900/60 border-b border-purple-700',
  [NodeCategory.HOW]:      'bg-pink-900/60 border-b border-pink-700',
  [NodeCategory.WHERE]:    'bg-cyan-900/60 border-b border-cyan-700',
};

const hasGemini = Boolean(process.env.API_KEY);

const InspectorPanel: React.FC<Props> = ({ selectedNode, onClose }) => {
  const { lang } = useContext(LangContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [selectedNode?.id]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const ctx = selectedNode
        ? `Node: ${selectedNode.data.label[lang]}. Context: ${selectedNode.data.whitepaperDetail[lang]}`
        : undefined;
      const response = await sendMessageToGemini(input, ctx);
      setMessages(prev => [...prev, { role: 'model', text: response, timestamp: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: 'Connection error.', timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const data = selectedNode?.data;
  const headerClass = data ? CAT_HEADER[data.category] : 'bg-slate-800 border-b border-slate-700';

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-slate-900/95 border-l border-slate-700 shadow-2xl flex flex-col z-50 backdrop-blur-sm">
      {/* Header */}
      <div className={`p-4 flex justify-between items-start ${headerClass}`}>
        <div className="flex-1 min-w-0 pr-2">
          {data ? (
            <>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{data.category}</div>
              <h2 className="font-bold text-white text-sm leading-snug">{data.label[lang]}</h2>
              {data.subtitle && <p className="text-xs text-slate-300 mt-0.5">{data.subtitle[lang]}</p>}
            </>
          ) : (
            <h2 className="font-bold text-white">Spilno</h2>
          )}
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {data ? (
          <div className="p-4 space-y-5">
            {/* Overview */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <h3 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">{t('overview', lang)}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{data.inspectorSummary[lang]}</p>
            </section>

            {/* Programme Detail */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <h3 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">{t('detail', lang)}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{data.whitepaperDetail[lang]}</p>
            </section>

            {/* Reference */}
            {data.whitepaperRef && (
              <section>
                <div className="flex items-center gap-2">
                  <Link2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px] text-slate-500">{t('reference', lang)}: {data.whitepaperRef}</span>
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="p-6 text-slate-500 text-sm text-center">
            <p>Click any node on the map to explore the Spilno programme.</p>
          </div>
        )}

        {/* AI Chat section */}
        {hasGemini && (
          <div className="border-t border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-4 h-4 text-blue-400" />
              <h3 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">{t('aiChat', lang)}</h3>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-3" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-2.5 text-xs ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}>
                    {msg.role === 'model' && <Bot className="w-3 h-3 mb-1 text-blue-400" />}
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 rounded-lg p-2.5 border border-slate-700 flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('aiPlaceholder', lang)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorPanel;
