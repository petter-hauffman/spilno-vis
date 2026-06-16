import { Lang } from './types';

export const UI_STRINGS = {
  // ── App general ──────────────────────────────────────────────────────────────
  appName:    { en: 'SPILNO', uk: 'СПІЛЬНО' },
  appSub:     { en: 'Спільно — Together', uk: 'Together — Спільно' },
  tagline:    { en: "Rebuilding Ukraine's cities — together", uk: 'Відновлення міст України — разом' },
  clickHint:  { en: 'Click any node to explore', uk: 'Натисніть на вузол, щоб дізнатися більше' },

  // ── Mode toggle ───────────────────────────────────────────────────────────────
  modeProgram:     { en: 'Programme Map', uk: 'Карта програми' },
  modeConsortium:  { en: 'Consortium Builder', uk: 'Будівник консорціуму' },

  // ── Program inspector ─────────────────────────────────────────────────────────
  overview:   { en: 'Overview', uk: 'Огляд' },
  detail:     { en: 'Programme Detail', uk: 'Деталі програми' },
  reference:  { en: 'Reference', uk: 'Джерело' },

  // ── Consortium inspector ──────────────────────────────────────────────────────
  partnerInfo:       { en: 'Partner Information', uk: 'Інформація про партнера' },
  partnerDesc:       { en: 'About', uk: 'Про партнера' },
  partnerStatus:     { en: 'Status', uk: 'Статус' },
  changeStatus:      { en: 'Change status', uk: 'Змінити статус' },
  partnerCountry:    { en: 'Country', uk: 'Країна' },
  partnerWebsite:    { en: 'Website', uk: 'Вебсайт' },
  partnerContact:    { en: 'Contact', uk: 'Контакт' },
  partnerNDA:        { en: 'NDA signed', uk: 'NDA підписано' },
  partnerNDAPending: { en: 'NDA pending', uk: 'NDA очікується' },
  commitment:        { en: 'Commitment type', uk: 'Тип участі' },
  financing:         { en: 'Financing', uk: 'Фінансування' },

  // ── Status labels ─────────────────────────────────────────────────────────────
  status_proposed:  { en: 'Proposed', uk: 'Запропоновано' },
  status_contacted: { en: 'Contacted', uk: 'Зв\'язались' },
  status_in_dialog: { en: 'In dialogue', uk: 'У діалозі' },
  status_confirmed: { en: 'Confirmed', uk: 'Підтверджено' },
  status_declined:  { en: 'Declined', uk: 'Відмовили' },

  // ── Comments ──────────────────────────────────────────────────────────────────
  comments:         { en: 'Comments', uk: 'Коментарі' },
  addComment:       { en: 'Add comment…', uk: 'Додати коментар…' },
  postComment:      { en: 'Post', uk: 'Надіслати' },
  noComments:       { en: 'No comments yet. Be first!', uk: 'Ще немає коментарів. Будьте першим!' },
  signInToComment:  { en: 'Sign in to comment', uk: 'Увійдіть, щоб коментувати' },

  // ── Proposals ─────────────────────────────────────────────────────────────────
  proposePartner:   { en: 'Propose a Partner', uk: 'Запропонувати партнера' },
  proposals:        { en: 'Proposals', uk: 'Пропозиції' },
  proposalName:     { en: 'Organisation name', uk: 'Назва організації' },
  proposalNameUk:   { en: 'Name in Ukrainian', uk: 'Назва українською' },
  proposalDesc:     { en: 'Why this partner?', uk: 'Чому цей партнер?' },
  proposalCategory: { en: 'Category', uk: 'Категорія' },
  proposalSubmit:   { en: 'Submit Proposal', uk: 'Надіслати пропозицію' },
  proposalSent:     { en: 'Proposal submitted!', uk: 'Пропозицію надіслано!' },
  proposalPending:  { en: 'Under review', uk: 'На розгляді' },
  proposalApproved: { en: 'Approved', uk: 'Затверджено' },
  proposalRejected: { en: 'Not accepted', uk: 'Не прийнято' },

  // ── Activity feed ─────────────────────────────────────────────────────────────
  activityFeed:    { en: 'Activity', uk: 'Активність' },
  activityEmpty:   { en: 'No activity yet', uk: 'Активності ще немає' },

  // ── Auth ──────────────────────────────────────────────────────────────────────
  signIn:          { en: 'Sign in', uk: 'Увійти' },
  signOut:         { en: 'Sign out', uk: 'Вийти' },
  signInEmail:     { en: 'Enter your email', uk: 'Введіть вашу пошту' },
  signInSend:      { en: 'Send login link', uk: 'Надіслати посилання' },
  signInSent:      { en: 'Check your email for the login link!', uk: 'Перевірте пошту — ми надіслали посилання!' },
  signInYourName:  { en: 'Your name', uk: 'Ваше ім\'я' },
  signInOrg:       { en: 'Organisation (optional)', uk: 'Організація (необов\'язково)' },
  roleCoordinator: { en: 'Coordinator', uk: 'Координатор' },
  rolePartner:     { en: 'Partner', uk: 'Партнер' },
  roleObserver:    { en: 'Observer', uk: 'Спостерігач' },
  guestMode:       { en: 'Continue as guest', uk: 'Продовжити як гість' },

  // ── AI Chat ───────────────────────────────────────────────────────────────────
  aiChat:          { en: 'Ask AI', uk: 'Запитати ШІ' },
  aiPlaceholder:   { en: 'Ask about this partner, their role, or the consortium…', uk: 'Запитайте про цього партнера, їхню роль або консорціум…' },
  aiSending:       { en: 'Thinking…', uk: 'Думаю…' },

  // ── UI misc ───────────────────────────────────────────────────────────────────
  close:           { en: 'Close', uk: 'Закрити' },
  cancel:          { en: 'Cancel', uk: 'Скасувати' },
  save:            { en: 'Save', uk: 'Зберегти' },
  langEN:          { en: 'EN', uk: 'EN' },
  langUK:          { en: 'UK', uk: 'UK' },
  mobileTitle:     { en: 'SPILNO — Interactive Map', uk: 'СПІЛЬНО — Інтерактивна карта' },
  mobileNote:      { en: 'The full interactive map requires a desktop browser.', uk: 'Повна інтерактивна карта потребує настільного браузера.' },
  totalFunding:    { en: 'Total funding', uk: 'Загальне фінансування' },
  confirmedPartners: { en: 'Confirmed partners', uk: 'Підтверджені партнери' },
};

export function t(key: keyof typeof UI_STRINGS, lang: Lang): string {
  return UI_STRINGS[key]?.[lang] ?? UI_STRINGS[key]?.en ?? key;
}
