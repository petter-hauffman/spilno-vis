import { Lang } from './types';

export const UI_STRINGS = {
  appName:    { en: 'SPILNO', uk: 'СПІЛЬНО' },
  appSub:     { en: 'Спільно — Together', uk: 'Together — Спільно' },
  tagline:    { en: "Rebuilding Ukraine's cities — together", uk: 'Відновлення міст України — разом' },
  clickHint:  { en: 'Click any node to explore', uk: 'Натисніть на вузол, щоб дізнатися більше' },
  overview:   { en: 'Overview', uk: 'Огляд' },
  detail:     { en: 'Programme Detail', uk: 'Деталі програми' },
  reference:  { en: 'Reference', uk: 'Джерело' },
  aiChat:     { en: 'Ask AI', uk: 'Запитати ШІ' },
  aiPlaceholder: { en: 'Ask about reconstruction, partnerships, technology…', uk: 'Запитайте про відновлення, партнерство, технології…' },
  aiSending:  { en: 'Thinking…', uk: 'Думаю…' },
  close:      { en: 'Close', uk: 'Закрити' },
  langEN:     { en: 'EN', uk: 'EN' },
  langUK:     { en: 'UK', uk: 'UK' },
  mobileTitle: { en: 'SPILNO — Interactive Map', uk: 'СПІЛЬНО — Інтерактивна карта' },
  mobileNote:  { en: 'The full interactive radial map requires a desktop browser. Here is the programme overview:', uk: 'Повна інтерактивна карта потребує настільного браузера. Ось огляд програми:' },
};

export function t(key: keyof typeof UI_STRINGS, lang: Lang): string {
  return UI_STRINGS[key][lang] ?? UI_STRINGS[key].en;
}
