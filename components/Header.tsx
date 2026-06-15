import React, { useContext } from 'react';
import { LangContext } from '../App';
import LanguageToggle from './LanguageToggle';
import { t } from '../i18n';

const Header: React.FC = () => {
  const { lang } = useContext(LangContext);

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
      <LanguageToggle />
    </div>
  );
};

export default Header;
