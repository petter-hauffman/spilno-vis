import React, { useState, useEffect, useRef, useContext } from 'react';
import { X, Globe, Mail, Shield, MessageSquare, Send, Bot, ChevronDown, ExternalLink } from 'lucide-react';
import { Node } from 'reactflow';
import { PartnerNodeData, PartnerCategory, PartnerStatus, Comment, ChatMessage } from '../types';
import { LangContext, AuthContext } from '../App';
import { t } from '../i18n';
import {
  fetchComments, addComment, deleteComment, subscribeComments
} from '../services/consortiumService';
import { sendMessageToGemini } from '../services/geminiService';

interface Props {
  selectedNode: Node<PartnerNodeData>;
  currentStatus: PartnerStatus;
  onStatusChange: (nodeId: string, status: PartnerStatus) => void;
  onClose: () => void;
  onSignInClick: () => void;
  onProposeClick: () => void;
}

// ─── Category header colours ─────────────────────────────────────────────────
const CAT_HEADER: Record<PartnerCategory, string> = {
  [PartnerCategory.CENTER]:    'bg-yellow-900/50 border-b border-yellow-700',
  [PartnerCategory.LEAD]:      'bg-purple-900/50 border-b border-purple-700',
  [PartnerCategory.TECHNICAL]: 'bg-sky-900/50 border-b border-sky-700',
  [PartnerCategory.FINANCING]: 'bg-green-900/50 border-b border-green-700',
  [PartnerCategory.PUBLIC]:    'bg-amber-900/50 border-b border-amber-700',
  [PartnerCategory.CIVIL]:     'bg-pink-900/50 border-b border-pink-700',
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_BADGE: Record<PartnerStatus, string> = {
  proposed:  'bg-slate-700 text-slate-300',
  contacted: 'bg-yellow-900/60 text-yellow-300',
  in_dialog: 'bg-blue-900/60 text-blue-300',
  confirmed: 'bg-green-900/60 text-green-300',
  declined:  'bg-red-900/60 text-red-400',
};

const STATUSES: PartnerStatus[] = ['proposed','contacted','in_dialog','confirmed','declined'];

const hasGemini = Boolean((import.meta as Record<string, unknown> & { env?: Record<string, unknown> }).env?.VITE_GEMINI_API_KEY);

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) +
    ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

const ConsortiumPanel: React.FC<Props> = ({
  selectedNode, currentStatus, onStatusChange, onClose, onSignInClick,
}) => {
  const { lang } = useContext(LangContext);
  const { user } = useContext(AuthContext);
  const data = selectedNode.data;

  // ── Comments state ────────────────────────────────────────────────────────
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // ── AI state ──────────────────────────────────────────────────────────────
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Load comments on node change
  useEffect(() => {
    setComments([]);
    setCommentText('');
    setChatMessages([]);
    fetchComments(selectedNode.id).then(setComments).catch(() => {});
    const unsub = subscribeComments(selectedNode.id, newComment => {
      setComments(prev => {
        if (prev.find(c => c.id === newComment.id)) return prev;
        return [...prev, newComment];
      });
    });
    return unsub;
  }, [selectedNode.id]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleAddComment = async () => {
    if (!user || !commentText.trim() || submitting) return;
    setSubmitting(true);
    try {
      const c = await addComment(selectedNode.id, commentText.trim(), user);
      setComments(prev => [...prev, c]);
      setCommentText('');
    } catch { /* ignore */ } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user) return;
    await deleteComment(selectedNode.id, commentId, user.id);
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg: ChatMessage = { role: 'user', text: chatInput, timestamp: Date.now() };
    setChatMessages(prev => [...prev, msg]);
    setChatInput('');
    setChatLoading(true);
    try {
      const ctx = `Partner: ${data.name[lang]}. Description: ${data.description[lang]}`;
      const reply = await sendMessageToGemini(chatInput, ctx);
      setChatMessages(prev => [...prev, { role: 'model', text: reply, timestamp: Date.now() }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'model', text: 'Connection error.', timestamp: Date.now() }]);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatMessages]);

  const headerCls = CAT_HEADER[data.category];

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[440px] bg-slate-900/96 border-l border-slate-700 shadow-2xl flex flex-col z-50 backdrop-blur-sm">
      {/* ── Header ── */}
      <div className={`p-4 flex justify-between items-start ${headerCls}`}>
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">{data.category}</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE[currentStatus]}`}>
              {currentStatus.replace('_', ' ')}
            </span>
            {data.ndaSigned && (
              <span className="text-[10px] font-medium text-purple-400 flex items-center gap-1">
                <Shield className="w-2.5 h-2.5" /> NDA
              </span>
            )}
          </div>
          <h2 className="font-bold text-white text-sm leading-snug">{data.name[lang]}</h2>
          {data.country && <p className="text-[11px] text-slate-400 mt-0.5">{data.country}</p>}
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-5">

          {/* Partner info row */}
          <div className="flex flex-wrap gap-2">
            {data.website && (
              <a href={data.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 transition-colors">
                <Globe className="w-3 h-3" /><span className="truncate max-w-[160px]">{data.website.replace('https://', '')}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            )}
            {data.contactEmail && (
              <a href={`mailto:${data.contactEmail}`}
                className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200 transition-colors">
                <Mail className="w-3 h-3" />{data.contactEmail}
              </a>
            )}
          </div>

          {/* Financing amount */}
          {data.financingAmount && (
            <div className="flex items-center gap-3 p-3 bg-green-950/30 rounded-xl border border-green-800/40">
              <div>
                <div className="text-[10px] text-slate-400">{t('financing', lang)}</div>
                <div className="text-lg font-bold text-green-400">{data.financingAmount} {data.financingCurrency ?? 'M€'}</div>
              </div>
              {data.commitmentType && (
                <div className="ml-auto text-[11px] text-green-300/70">{data.commitmentType[lang]}</div>
              )}
            </div>
          )}

          {/* Commitment type (non-financial) */}
          {data.commitmentType && !data.financingAmount && (
            <div className="text-[11px] text-slate-400">
              <span className="text-slate-500">{t('commitment', lang)}: </span>{data.commitmentType[lang]}
            </div>
          )}

          {/* Description */}
          <section>
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">{t('partnerDesc', lang)}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{data.description[lang]}</p>
          </section>

          {/* Status change (coordinator only) */}
          {user?.role === 'coordinator' && (
            <section className="border border-slate-700 rounded-xl p-3">
              <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {t('changeStatus', lang)}
              </h3>
              <div className="relative">
                <select
                  value={currentStatus}
                  onChange={e => onStatusChange(selectedNode.id, e.target.value as PartnerStatus)}
                  className="w-full appearance-none bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </section>
          )}

          {/* ── Comments ── */}
          <section>
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3 h-3" />
              {t('comments', lang)}
              {comments.length > 0 && (
                <span className="text-[9px] bg-slate-700 text-slate-400 rounded-full px-1.5">{comments.length}</span>
              )}
            </h3>

            {comments.length === 0 && (
              <p className="text-[11px] text-slate-500 italic">{t('noComments', lang)}</p>
            )}

            <div className="space-y-3 max-h-48 overflow-y-auto mb-3">
              {comments.map(c => (
                <div key={c.id} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-700/50 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {c.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-white">{c.authorName}</span>
                      <span className="text-[9px] text-slate-500">{formatTime(c.timestamp)}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{c.text}</p>
                    {(user?.id === c.authorId || user?.role === 'coordinator') && (
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="text-[9px] text-slate-600 hover:text-red-400 mt-0.5 transition-colors"
                      >
                        delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={commentsEndRef} />
            </div>

            {/* Comment input */}
            {user ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                  placeholder={t('addComment', lang)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleAddComment}
                  disabled={submitting || !commentText.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="w-full p-2 text-xs text-blue-400 hover:text-blue-300 border border-slate-700 rounded-lg hover:bg-blue-950/20 transition-colors"
              >
                {t('signInToComment', lang)}
              </button>
            )}
          </section>
        </div>

        {/* ── AI Chat ── */}
        {hasGemini && (
          <div className="border-t border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-4 h-4 text-blue-400" />
              <h3 className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">{t('aiChat', lang)}</h3>
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto mb-3" ref={chatRef}>
              {chatMessages.map((msg, i) => (
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
              {chatLoading && (
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
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleChatSend()}
                placeholder={t('aiPlaceholder', lang)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleChatSend}
                disabled={chatLoading || !chatInput.trim()}
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

export default ConsortiumPanel;
