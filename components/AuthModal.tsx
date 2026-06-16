import React, { useState, useContext } from 'react';
import { X, Mail, User, Building2, Send, CheckCircle, LogIn } from 'lucide-react';
import { LangContext } from '../contexts';
import { t } from '../i18n';
import { isSupabaseConfigured } from '../services/supabase';
import { signInWithMagicLink, saveGuestUser } from '../services/consortiumService';
import { User as UserType } from '../types';

interface Props {
  onClose: () => void;
  onUser: (user: UserType) => void;
}

const AuthModal: React.FC<Props> = ({ onClose, onUser }) => {
  const { lang } = useContext(LangContext);
  const [mode, setMode] = useState<'choose' | 'email' | 'guest' | 'sent'>('choose');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMagicLink = async () => {
    if (!email.trim() || !name.trim()) return;
    setLoading(true);
    setError('');
    try {
      await signInWithMagicLink(email.trim(), name.trim());
      setMode('sent');
    } catch (e: unknown) {
      let msg = 'Error sending link — please try again';
      if (e instanceof Error) {
        const raw = e.message ?? '';
        if (raw.includes('rate') || raw.includes('limit')) {
          msg = 'Too many emails sent — please wait ~1 hour and try again';
        } else if (raw === '{}' || raw === '' || raw === '[]') {
          msg = 'SMTP not configured correctly — check Supabase Auth → SMTP Settings';
        } else if (raw.includes('invalid') || raw.includes('Invalid')) {
          msg = 'Invalid email address';
        } else {
          msg = raw;
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    if (!name.trim()) return;
    const user = saveGuestUser(name.trim(), org.trim() || undefined);
    onUser(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <LogIn className="w-4 h-4 text-blue-400" />
            <h2 className="font-bold text-white text-sm">{t('signIn', lang)}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {/* Choose mode */}
          {mode === 'choose' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-300 mb-4">
                Sign in to comment, propose partners, and track activity.
              </p>
              {isSupabaseConfigured && (
                <button
                  onClick={() => setMode('email')}
                  className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Sign in with email (magic link)</span>
                </button>
              )}
              <button
                onClick={() => setMode('guest')}
                className="w-full flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-200 font-medium text-sm transition-colors"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>{t('guestMode', lang)}</span>
              </button>
            </div>
          )}

          {/* Email magic link */}
          {mode === 'email' && (
            <div className="space-y-3">
              <button onClick={() => setMode('choose')} className="text-xs text-slate-400 hover:text-slate-200 mb-2">← Back</button>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">{t('signInYourName', lang)}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">{t('signInEmail', lang)}</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleMagicLink()}
                  placeholder="you@organisation.org"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                onClick={handleMagicLink}
                disabled={loading || !email.trim() || !name.trim()}
                className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending…' : t('signInSend', lang)}
              </button>
            </div>
          )}

          {/* Sent */}
          {mode === 'sent' && (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <p className="text-sm text-slate-200 font-medium">{t('signInSent', lang)}</p>
              <p className="text-xs text-slate-400 mt-2">{email}</p>
              <button onClick={onClose} className="mt-4 text-xs text-blue-400 hover:text-blue-300">Close</button>
            </div>
          )}

          {/* Guest */}
          {mode === 'guest' && (
            <div className="space-y-3">
              <button onClick={() => setMode('choose')} className="text-xs text-slate-400 hover:text-slate-200 mb-1">← Back</button>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">{t('signInYourName', lang)} *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">{t('signInOrg', lang)}</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={org}
                    onChange={e => setOrg(e.target.value)}
                    placeholder="Organisation"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={handleGuest}
                disabled={!name.trim()}
                className="w-full flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <User className="w-4 h-4" />
                {t('guestMode', lang)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
