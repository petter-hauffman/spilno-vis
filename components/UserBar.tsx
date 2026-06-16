import React, { useContext } from 'react';
import { LogOut, User as UserIcon, Shield, Eye } from 'lucide-react';
import { LangContext, AuthContext } from '../App';
import { t } from '../i18n';
import { signOut } from '../services/consortiumService';

interface Props {
  onSignInClick: () => void;
}

const ROLE_BADGE: Record<string, { label: string; cls: string }> = {
  coordinator: { label: 'Coordinator', cls: 'bg-purple-900/60 text-purple-300 border border-purple-700' },
  partner:     { label: 'Partner',     cls: 'bg-blue-900/60 text-blue-300 border border-blue-700'   },
  observer:    { label: 'Observer',    cls: 'bg-slate-800 text-slate-400 border border-slate-600'   },
};

const ROLE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  coordinator: Shield,
  partner:     UserIcon,
  observer:    Eye,
};

const UserBar: React.FC<Props> = ({ onSignInClick }) => {
  const { lang } = useContext(LangContext);
  const { user, setUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <button
        onClick={onSignInClick}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/80 hover:bg-blue-500 rounded-lg text-white text-xs font-medium transition-colors backdrop-blur-sm border border-blue-500/40"
      >
        <UserIcon className="w-3.5 h-3.5" />
        {t('signIn', lang)}
      </button>
    );
  }

  const badge = ROLE_BADGE[user.role] ?? ROLE_BADGE.observer;
  const RoleIcon = ROLE_ICON[user.role] ?? UserIcon;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl px-3 py-1.5">
        {/* Avatar initial */}
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">{user.name}</div>
          {user.organisation && (
            <div className="text-[9px] text-slate-400">{user.organisation}</div>
          )}
        </div>
        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ml-1 flex items-center gap-1 ${badge.cls}`}>
          <RoleIcon className="w-2.5 h-2.5" />
          {badge.label}
        </span>
      </div>
      <button
        onClick={handleSignOut}
        title={t('signOut', lang)}
        className="p-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
      >
        <LogOut className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default UserBar;
