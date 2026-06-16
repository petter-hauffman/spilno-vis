import React, { useContext } from 'react';
import { LangContext, AppModeContext } from '../contexts';
import LanguageToggle from './LanguageToggle';
import { t } from '../i18n';
import { AppMode } from '../types';

const Header: React.FC = () => {
  const { lang } = useContext(LangContext);
  const { mode, setMode } = useContext(AppModeContext);

  return (
    <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-2xl max-w-xs">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl leading-none select-none">🇺🇦</div>
        <div>
          <h1 className="text-lg font-black text-white tracking-tight">
            {t('appName', lang)}
          </h1>
          <p className="text-xs text-slate-400">{t('appSub', lang)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-2 mb-3">
        {t('tagline', lang)}
      </p>

      {/* Mode toggle */}
      <div className="flex items-center bg-slate-800/70 border border-slate-700 rounded-lg p-0.5 gap-0.5 mb-3">
        {(['program', 'consortium'] as AppMode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 px-2 py-1 rounded-md text-xs font-medium transition-colors text-center ${
              mode === m
                ? m === 'consortium'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {m === 'program' ? t('modeProgram', lang) : t('modeConsortium', lang)}
          </button>
        ))}
      </div>

      <LanguageToggle />
    </div>
  );
};

export default Header;
