import { createContext } from 'react';
import { Lang, AppMode, User } from './types';

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en', setLang: () => {},
});

export const AuthContext = createContext<{ user: User | null; setUser: (u: User | null) => void }>({
  user: null, setUser: () => {},
});

export const AppModeContext = createContext<{ mode: AppMode; setMode: (m: AppMode) => void }>({
  mode: 'program', setMode: () => {},
});
