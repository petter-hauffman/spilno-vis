import React, { useContext } from 'react';
import { LangContext } from '../contexts';

const LanguageToggle: React.FC = () => {
  const { lang, setLang } = useContext(LangContext);

  return (
    <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-700 rounded-lg p-1">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
          lang === 'en'
            ? 'bg-slate-700 text-white'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        🇬🇧 EN
      </button>
      <button
        onClick={() => setLang('uk')}
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
          lang === 'uk'
            ? 'bg-slate-700 text-white'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        🇺🇦 UK
      </button>
    </div>
  );
};

export default LanguageToggle;
