import React, { useState, useEffect, useContext } from 'react';
import { X, MessageSquare, Plus, RefreshCw, Activity } from 'lucide-react';
import { LangContext } from '../App';
import { t } from '../i18n';
import { fetchActivity, subscribeActivity } from '../services/consortiumService';
import { ActivityItem } from '../types';

interface Props {
  onClose: () => void;
}

const ACTION_ICON: Record<ActivityItem['action'], React.ComponentType<{ className?: string }>> = {
  comment:       MessageSquare,
  proposal:      Plus,
  status_change: RefreshCw,
  join:          Activity,
};

const ACTION_COLOR: Record<ActivityItem['action'], string> = {
  comment:       'text-blue-400 bg-blue-950/40',
  proposal:      'text-green-400 bg-green-950/40',
  status_change: 'text-amber-400 bg-amber-950/40',
  join:          'text-purple-400 bg-purple-950/40',
};

const ROLE_COLOR: Record<string, string> = {
  coordinator: 'text-purple-400',
  partner:     'text-blue-400',
  observer:    'text-slate-400',
};

function timeAgo(ts: number): string {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60)  return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const ActivityFeed: React.FC<Props> = ({ onClose }) => {
  const { lang } = useContext(LangContext);
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity(50).then(data => {
      setItems(data);
      setLoading(false);
    }).catch(() => setLoading(false));

    const unsub = subscribeActivity(item => {
      setItems(prev => [item, ...prev].slice(0, 50));
    });
    return unsub;
  }, []);

  return (
    <div className="fixed left-0 top-0 h-full w-full md:w-[340px] bg-slate-900/95 border-r border-slate-700 shadow-2xl flex flex-col z-50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          <h2 className="font-bold text-white text-sm">{t('activityFeed', lang)}</h2>
          {items.length > 0 && (
            <span className="text-[10px] bg-blue-600/30 text-blue-400 border border-blue-700/40 rounded-full px-1.5">
              {items.length}
            </span>
          )}
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading && (
          <div className="flex items-center justify-center py-8 text-slate-500 text-sm">
            Loading…
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            {t('activityEmpty', lang)}
          </div>
        )}

        {items.map(item => {
          const IconComp = ACTION_ICON[item.action];
          const iconColor = ACTION_COLOR[item.action];
          const roleColor = ROLE_COLOR[item.actorRole] ?? ROLE_COLOR.observer;

          return (
            <div
              key={item.id}
              className="flex gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/80 transition-colors"
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                <IconComp className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-semibold text-white">{item.actorName}</span>
                  <span className={`text-[9px] ${roleColor}`}>{item.actorRole}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  {item.action === 'comment' && (
                    <>commented on <span className="text-white font-medium">{item.nodeName || item.nodeId}</span></>
                  )}
                  {item.action === 'proposal' && (
                    <>proposed <span className="text-white font-medium">{item.detail}</span></>
                  )}
                  {item.action === 'status_change' && (
                    <>changed <span className="text-white font-medium">{item.nodeName || item.nodeId}</span> to <span className="font-medium">{item.detail?.replace('_', ' ')}</span></>
                  )}
                  {item.action === 'join' && <>joined the consortium</>}
                </div>
                {item.action === 'comment' && item.detail && (
                  <div className="text-[10px] text-slate-400 mt-1 italic line-clamp-2">
                    "{item.detail}"
                  </div>
                )}
                <div className="text-[9px] text-slate-500 mt-1">{timeAgo(item.timestamp)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
