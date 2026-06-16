import { Node, Edge } from 'reactflow';
import { PartnerNodeData, PartnerCategory, PartnerStatus } from './types';

export type PartnerNode = Node<PartnerNodeData>;

// ─── Helper ───────────────────────────────────────────────────────────────────
function p(
  id: string,
  depth: 0 | 1 | 2,
  branchId: string,
  data: Omit<PartnerNodeData, 'depth' | 'branchId' | 'leafIndex'>,
  leafIndex?: number
): PartnerNode {
  return {
    id,
    type: 'partner',
    position: { x: 0, y: 0 },
    data: { ...data, depth, branchId, leafIndex },
  };
}

// ─── Category edge colours ─────────────────────────────────────────────────────
export const CAT_EDGE_COLOR: Record<PartnerCategory, string> = {
  [PartnerCategory.CENTER]:    '#fbbf24',
  [PartnerCategory.LEAD]:      '#a855f7',
  [PartnerCategory.TECHNICAL]: '#0ea5e9',
  [PartnerCategory.FINANCING]: '#22c55e',
  [PartnerCategory.PUBLIC]:    '#f59e0b',
  [PartnerCategory.CIVIL]:     '#ec4899',
};

// ─── Nodes ────────────────────────────────────────────────────────────────────
export const CONSORTIUM_NODES: PartnerNode[] = [

  // ── Depth 0 — Center ──────────────────────────────────────────────────────
  p('center', 0, 'center', {
    name:       { en: 'SPILNO', uk: 'СПІЛЬНО' },
    shortDesc:  { en: 'Open Reconstruction Programme', uk: 'Відкрита програма відновлення' },
    description: {
      en: 'SPILNO is an open, transparent consortium framework for rebuilding Ukrainian cities after the war. It unites technical, financial, public, and civil-society partners under shared EU-aligned governance standards.',
      uk: 'СПІЛЬНО — відкрита та прозора консорціумна рамка для відновлення українських міст після війни. Вона об\'єднує технічних, фінансових, публічних та громадських партнерів під єдиними стандартами управління, узгодженими з ЄС.',
    },
    category:   PartnerCategory.CENTER,
    status:     'confirmed',
    icon:       'Globe',
    country:    'Ukraine / International',
    website:    'https://spilno.org',
    ndaSigned:  false,
  }),

  // ── Depth 1 — Branch: LEAD ────────────────────────────────────────────────
  p('lead', 1, 'lead', {
    name:       { en: 'Lead & Coordination', uk: 'Лідерство та координація' },
    shortDesc:  { en: 'Programme governance & secretariat', uk: 'Управління програмою та секретаріат' },
    description: {
      en: 'The Lead branch encompasses the programme secretariat, the international advisory board, and quality assurance functions that keep the consortium aligned with EU standards and anti-corruption principles.',
      uk: 'Гілка лідерства охоплює секретаріат програми, міжнародну консультативну раду та функції забезпечення якості, що забезпечують відповідність консорціуму стандартам ЄС і антикорупційним принципам.',
    },
    category:   PartnerCategory.LEAD,
    status:     'confirmed',
    icon:       'Landmark',
    ndaSigned:  true,
  }),

  // ── Depth 1 — Branch: TECHNICAL ───────────────────────────────────────────
  p('technical', 1, 'technical', {
    name:       { en: 'Technology Partners', uk: 'Технологічні партнери' },
    shortDesc:  { en: 'Digital twin, BIM, GIS, construction', uk: 'Цифровий двійник, BIM, ГІС, будівництво' },
    description: {
      en: 'Technology partners provide the digital infrastructure: 3D scanning, BIM modelling, GIS integration, satellite imagery, and smart construction materials that form the backbone of the digital twin platform.',
      uk: 'Технологічні партнери забезпечують цифрову інфраструктуру: 3D-сканування, BIM-моделювання, інтеграцію ГІС, супутникові знімки та інтелектуальні будівельні матеріали, що складають основу платформи цифрового двійника.',
    },
    category:   PartnerCategory.TECHNICAL,
    status:     'in_dialog',
    icon:       'Cpu',
  }),

  // ── Depth 1 — Branch: FINANCING ───────────────────────────────────────────
  p('financing', 1, 'financing', {
    name:       { en: 'Financing Partners', uk: 'Фінансові партнери' },
    shortDesc:  { en: 'EU funds, IFIs, impact capital', uk: 'Фонди ЄС, МФО, імпакт-капітал' },
    description: {
      en: 'A blended finance structure combining EU recovery grants, international financial institution loans, Nordic concessional finance, and private impact investors to de-risk reconstruction investments.',
      uk: 'Змішана фінансова структура поєднує гранти ЄС на відновлення, позики міжнародних фінансових організацій, пільгове фінансування скандинавських країн та приватних імпакт-інвесторів для зниження ризиків відновлення.',
    },
    category:   PartnerCategory.FINANCING,
    status:     'in_dialog',
    icon:       'CircleDollarSign',
  }),

  // ── Depth 1 — Branch: PUBLIC ──────────────────────────────────────────────
  p('public', 1, 'public', {
    name:       { en: 'Public Sector Bodies', uk: 'Державні органи' },
    shortDesc:  { en: 'Municipalities, ministries, EU missions', uk: 'Муніципалітети, міністерства, місії ЄС' },
    description: {
      en: 'Public sector partners provide democratic legitimacy, planning authority, and co-financing. They include Ukrainian municipalities, central government ministries, and EU country delegations and city networks.',
      uk: 'Партнери з державного сектору забезпечують демократичну легітимність, планувальні повноваження та спільне фінансування. Це українські муніципалітети, центральні міністерства та делегації ЄС і міські мережі.',
    },
    category:   PartnerCategory.PUBLIC,
    status:     'confirmed',
    icon:       'Flag',
  }),

  // ── Depth 1 — Branch: CIVIL ───────────────────────────────────────────────
  p('civil', 1, 'civil', {
    name:       { en: 'Civil Society & Academia', uk: 'Громадянське суспільство та академія' },
    shortDesc:  { en: 'Citizens, NGOs, universities, diaspora', uk: 'Громадяни, НГО, університети, діаспора' },
    description: {
      en: 'Civil society and academic partners ensure participatory design, independent oversight, and knowledge transfer. Citizens assemblies drive the CO-CREATE pillar; universities provide research and training.',
      uk: 'Партнери з громадянського суспільства та академії забезпечують партисипаторний дизайн, незалежний нагляд і передачу знань. Громадянські збори рухають пілар СО-CREATE; університети надають дослідження та навчання.',
    },
    category:   PartnerCategory.CIVIL,
    status:     'in_dialog',
    icon:       'GraduationCap',
  }),

  // ── Depth 2 — LEAD leaves ─────────────────────────────────────────────────
  p('lead-secretariat', 2, 'lead', {
    name:       { en: 'Spilno Programme Secretariat', uk: 'Секретаріат програми Спільно' },
    shortDesc:  { en: 'Day-to-day coordination & reporting', uk: 'Щоденна координація та звітність' },
    description: {
      en: 'The permanent secretariat provides operational management, stakeholder communication, progress reporting, and ensures that all consortium activities remain aligned with the programme charter and EU accountability standards.',
      uk: 'Постійний секретаріат здійснює оперативне управління, комунікацію зі стейкхолдерами, звітування про прогрес і забезпечує відповідність усіх заходів консорціуму статуту програми та стандартам підзвітності ЄС.',
    },
    category:   PartnerCategory.LEAD,
    status:     'confirmed',
    icon:       'ClipboardList',
    country:    'Ukraine',
    ndaSigned:  true,
    commitmentType: { en: 'Programme lead', uk: 'Керівник програми' },
  }, 0),

  p('lead-advisory', 2, 'lead', {
    name:       { en: 'International Advisory Board', uk: 'Міжнародна консультативна рада' },
    shortDesc:  { en: 'Strategic oversight & expertise', uk: 'Стратегічний нагляд і експертиза' },
    description: {
      en: 'The advisory board brings together senior experts in urban planning, EU cohesion policy, anti-corruption, digital infrastructure, and reconstruction economics. It meets quarterly and provides binding recommendations on major programme decisions.',
      uk: 'До консультативної ради входять провідні експерти з міського планування, політики згуртованості ЄС, антикорупції, цифрової інфраструктури та економіки відновлення. Рада збирається щоквартально та надає обов\'язкові рекомендації щодо ключових рішень програми.',
    },
    category:   PartnerCategory.LEAD,
    status:     'in_dialog',
    icon:       'Users',
    country:    'International',
    ndaSigned:  false,
    commitmentType: { en: 'Advisory', uk: 'Консультативна' },
  }, 1),

  p('lead-qa', 2, 'lead', {
    name:       { en: 'Quality & Compliance Office', uk: 'Офіс якості та відповідності' },
    shortDesc:  { en: 'Audit, anti-corruption, standards', uk: 'Аудит, антикорупція, стандарти' },
    description: {
      en: 'An independent quality and compliance function monitors procurement, tracks milestones, ensures EU audit readiness, and maintains the immutable activity log that underpins the programme\'s anti-corruption architecture.',
      uk: 'Незалежна функція якості та відповідності контролює закупівлі, відстежує контрольні показники, забезпечує готовність до аудиту ЄС і веде незмінний журнал діяльності, що лежить в основі антикорупційної архітектури програми.',
    },
    category:   PartnerCategory.LEAD,
    status:     'proposed',
    icon:       'ShieldCheck',
    country:    'EU',
    ndaSigned:  false,
    commitmentType: { en: 'Oversight', uk: 'Нагляд' },
  }, 2),

  // ── Depth 2 — TECHNICAL leaves ────────────────────────────────────────────
  p('tech-digital-twin', 2, 'technical', {
    name:       { en: 'Digital Twin Platform', uk: 'Платформа цифрового двійника' },
    shortDesc:  { en: '3D city model, BIM, real-time sync', uk: '3D-модель міста, BIM, синхронізація' },
    description: {
      en: 'A city-scale digital twin platform capturing pre-war building stock via satellite imagery and LiDAR scanning, integrated with BIM workflows for reconstruction design and a real-time synchronisation layer for on-site progress tracking.',
      uk: 'Цифровий двійник міського масштабу охоплює довоєнний фонд будівель за допомогою супутникових знімків та LiDAR-сканування, інтегрований із BIM-процесами для проектування відновлення та шаром синхронізації в реальному часі для відстеження прогресу на місці.',
    },
    category:   PartnerCategory.TECHNICAL,
    status:     'in_dialog',
    icon:       'Satellite',
    country:    'International',
    website:    'https://bentley.com',
    ndaSigned:  false,
    commitmentType: { en: 'Technology license', uk: 'Ліцензія на технологію' },
  }, 0),

  p('tech-bim', 2, 'technical', {
    name:       { en: 'BIM & Architectural Design', uk: 'BIM та архітектурне проектування' },
    shortDesc:  { en: 'EU-standard design, heritage-sensitive', uk: 'Проектування за стандартами ЄС' },
    description: {
      en: 'European architectural and engineering firms providing EU-standard BIM documentation, heritage-sensitive design solutions, and standardised typologies for rapid reconstruction that respect local architectural character.',
      uk: 'Європейські архітектурні та інженерні фірми надають BIM-документацію за стандартами ЄС, рішення для проектування з урахуванням спадщини та стандартизовані типології для швидкого відновлення, що поважають місцевий архітектурний характер.',
    },
    category:   PartnerCategory.TECHNICAL,
    status:     'contacted',
    icon:       'LayoutGrid',
    country:    'EU',
    ndaSigned:  false,
    commitmentType: { en: 'Technical services', uk: 'Технічні послуги' },
  }, 1),

  p('tech-gis', 2, 'technical', {
    name:       { en: 'GIS & Satellite Imagery', uk: 'ГІС та супутникові знімки' },
    shortDesc:  { en: 'Damage mapping, spatial analytics', uk: 'Картографування збитків, просторова аналітика' },
    description: {
      en: 'Geospatial intelligence providers supplying high-resolution pre- and post-war satellite imagery, AI-powered damage assessment, and spatial analytics dashboards for prioritisation and reconstruction planning.',
      uk: 'Постачальники геопросторової розвідки надають високороздільні супутникові знімки до і після війни, оцінку збитків за допомогою ШІ та просторово-аналітичні дашборди для пріоритизації та планування відновлення.',
    },
    category:   PartnerCategory.TECHNICAL,
    status:     'proposed',
    icon:       'Globe2',
    country:    'International',
    ndaSigned:  false,
    commitmentType: { en: 'Data services', uk: 'Послуги з даних' },
  }, 2),

  p('tech-construction', 2, 'technical', {
    name:       { en: 'Smart Construction Tech', uk: 'Технологія розумного будівництва' },
    shortDesc:  { en: 'Materials, prefab, IoT site monitoring', uk: 'Матеріали, збірні конструкції, IoT' },
    description: {
      en: 'Construction technology partners providing certified prefabricated building components, energy-efficient materials meeting EU standards, and IoT site monitoring solutions for quality assurance and progress verification.',
      uk: 'Технологічні партнери в будівництві постачають сертифіковані збірні будівельні компоненти, енергоефективні матеріали відповідно до стандартів ЄС та IoT-системи моніторингу будівельних майданчиків для забезпечення якості.',
    },
    category:   PartnerCategory.TECHNICAL,
    status:     'proposed',
    icon:       'HardHat',
    country:    'EU',
    ndaSigned:  false,
    commitmentType: { en: 'Supply chain', uk: 'Ланцюг постачання' },
  }, 3),

  // ── Depth 2 — FINANCING leaves ────────────────────────────────────────────
  p('fin-eu', 2, 'financing', {
    name:       { en: 'EU Recovery & Cohesion Funds', uk: 'Фонди відновлення та згуртованості ЄС' },
    shortDesc:  { en: 'Primary grant financing for reconstruction', uk: 'Основне грантове фінансування відновлення' },
    description: {
      en: 'EU reconstruction grants and future cohesion pre-accession funds represent the primary public funding layer, conditional on compliant procurement, audit readiness, and alignment with EU urban acquis and energy efficiency standards.',
      uk: 'Гранти ЄС на відновлення та майбутні кошти передвступної згуртованості становлять основний рівень публічного фінансування, умовою якого є відповідність закупівель, готовність до аудиту та узгодженість із міським acquis ЄС та стандартами енергоефективності.',
    },
    category:   PartnerCategory.FINANCING,
    status:     'confirmed',
    icon:       'Euro',
    country:    'EU',
    website:    'https://ec.europa.eu/regional_policy',
    financingAmount: 120,
    financingCurrency: 'M€',
    ndaSigned:  false,
    commitmentType: { en: 'Grant', uk: 'Грант' },
  }, 0),

  p('fin-ifi', 2, 'financing', {
    name:       { en: 'EIB / EBRD', uk: 'ЄІБ / ЄБРР' },
    shortDesc:  { en: 'Concessional loans & blended finance', uk: 'Пільгові позики та змішані фінанси' },
    description: {
      en: 'The European Investment Bank and EBRD provide concessional long-term loans and blended finance instruments that co-invest alongside EU grants, reducing the overall cost of capital and enabling larger project pipelines.',
      uk: 'Європейський інвестиційний банк та ЄБРР надають пільгові довгострокові позики та інструменти змішаного фінансування, що спільно інвестують поряд із грантами ЄС, знижуючи загальну вартість капіталу та уможливлюючи більші проектні конвеєри.',
    },
    category:   PartnerCategory.FINANCING,
    status:     'in_dialog',
    icon:       'TrendingUp',
    country:    'EU',
    financingAmount: 80,
    financingCurrency: 'M€',
    ndaSigned:  false,
    commitmentType: { en: 'Loan / co-investment', uk: 'Позика / спільне інвестування' },
  }, 1),

  p('fin-nordic', 2, 'financing', {
    name:       { en: 'Nordic Investment Bank (NIB)', uk: 'Північний інвестиційний банк (NIB)' },
    shortDesc:  { en: 'Green finance, energy efficiency', uk: 'Зелені фінанси, енергоефективність' },
    description: {
      en: 'NIB provides Nordic development finance focused on environmental sustainability, energy efficiency, and climate resilience — ensuring that reconstructed buildings meet EU green building standards and Nordic low-carbon benchmarks.',
      uk: 'NIB забезпечує скандинавське фінансування розвитку з акцентом на екологічну стійкість, енергоефективність та кліматичну стійкість — гарантуючи, що відновлені будівлі відповідають стандартам зеленого будівництва ЄС та скандинавським низьковуглецевим орієнтирам.',
    },
    category:   PartnerCategory.FINANCING,
    status:     'contacted',
    icon:       'Recycle',
    country:    'Nordic',
    website:    'https://nib.int',
    financingAmount: 45,
    financingCurrency: 'M€',
    ndaSigned:  false,
    commitmentType: { en: 'Green loan', uk: 'Зелена позика' },
  }, 2),

  p('fin-private', 2, 'financing', {
    name:       { en: 'Impact Capital Consortium', uk: 'Консорціум імпакт-капіталу' },
    shortDesc:  { en: 'Private investors, risk de-sharing', uk: 'Приватні інвестори, розподіл ризиків' },
    description: {
      en: 'A consortium of impact investors and ESG-focused private funds providing mezzanine capital that bridges the gap between public grants and commercial finance, structured to de-risk early-stage reconstruction pipeline development.',
      uk: 'Консорціум імпакт-інвесторів та приватних фондів, орієнтованих на ESG, надає мезонінний капітал, що заповнює розрив між публічними грантами та комерційним фінансуванням, структурований для зниження ризиків розробки конвеєра відновлення на ранніх стадіях.',
    },
    category:   PartnerCategory.FINANCING,
    status:     'proposed',
    icon:       'Network',
    country:    'International',
    financingAmount: 30,
    financingCurrency: 'M€',
    ndaSigned:  false,
    commitmentType: { en: 'Mezzanine / equity', uk: 'Мезонін / акціонерний капітал' },
  }, 3),

  // ── Depth 2 — PUBLIC leaves ───────────────────────────────────────────────
  p('pub-kharkiv', 2, 'public', {
    name:       { en: 'Municipality of Kharkiv', uk: 'Харківська міська рада' },
    shortDesc:  { en: 'Pilot city — Phase 1 reconstruction', uk: 'Пілотне місто — Фаза 1 відновлення' },
    description: {
      en: 'Kharkiv is confirmed as the Phase 1 pilot municipality. The city provides access to damaged building inventory, planning data, and local contractor networks. It hosts the programme secretariat during the pilot phase and commits co-financing from municipal budget.',
      uk: 'Харків підтверджено як пілотний муніципалітет Фази 1. Місто надає доступ до інвентарю пошкоджених будівель, планувальних даних та мережі місцевих підрядників. Воно приймає секретаріат програми під час пілотної фази та зобов\'язується до спільного фінансування з муніципального бюджету.',
    },
    category:   PartnerCategory.PUBLIC,
    status:     'confirmed',
    icon:       'Building2',
    country:    'Ukraine',
    contactEmail: 'international@city.kharkov.ua',
    ndaSigned:  true,
    commitmentType: { en: 'Pilot host + co-financing', uk: 'Пілотний хост + спільне фінансування' },
  }, 0),

  p('pub-ministry', 2, 'public', {
    name:       { en: 'Ministry of Reconstruction', uk: 'Міністерство відновлення' },
    shortDesc:  { en: 'National policy alignment & permits', uk: 'Узгодження з національною політикою' },
    description: {
      en: 'The Ukrainian Ministry for Communities, Territories and Infrastructure Development provides regulatory framework alignment, fast-track permitting procedures for the programme, and integration with the national reconstruction database and Diia digital government platform.',
      uk: 'Міністерство розвитку громад та територій України забезпечує узгодження регуляторної бази, прискорені дозвільні процедури для програми та інтеграцію з національною базою даних відновлення та платформою цифрового уряду Дія.',
    },
    category:   PartnerCategory.PUBLIC,
    status:     'in_dialog',
    icon:       'Landmark',
    country:    'Ukraine',
    ndaSigned:  false,
    commitmentType: { en: 'Regulatory / policy', uk: 'Регуляторна / політична' },
  }, 1),

  p('pub-eu-delegation', 2, 'public', {
    name:       { en: 'EU Delegation to Ukraine', uk: 'Делегація ЄС в Україні' },
    shortDesc:  { en: 'EU compliance bridge & programme oversight', uk: 'Міст відповідності ЄС та нагляд' },
    description: {
      en: 'The EU Delegation validates programme compliance with EU standards, facilitates access to pre-accession and recovery funds, and provides political backing that signals credibility to other international partners and investors.',
      uk: 'Делегація ЄС перевіряє відповідність програми стандартам ЄС, сприяє доступу до передвступних та відновлювальних фондів і забезпечує політичну підтримку, що сигналізує про довіру іншим міжнародним партнерам та інвесторам.',
    },
    category:   PartnerCategory.PUBLIC,
    status:     'contacted',
    icon:       'Globe',
    country:    'EU',
    website:    'https://eeas.europa.eu/delegations/ukraine',
    ndaSigned:  false,
    commitmentType: { en: 'Oversight / facilitation', uk: 'Нагляд / сприяння' },
  }, 2),

  p('pub-nordic-cities', 2, 'public', {
    name:       { en: 'Nordic-Baltic City Network', uk: 'Скандинавсько-балтійська мережа міст' },
    shortDesc:  { en: 'Municipal twinning & expertise transfer', uk: 'Міське партнерство та передача досвіду' },
    description: {
      en: 'A network of Nordic and Baltic municipalities offering city-twinning partnerships, peer-learning programmes, and direct technical expertise in sustainable urban development, digital government, and community planning.',
      uk: 'Мережа скандинавських та балтійських муніципалітетів, що пропонує партнерства між містами, програми взаємного навчання та безпосередню технічну експертизу в сталому міському розвитку, цифровому врядуванні та плануванні громад.',
    },
    category:   PartnerCategory.PUBLIC,
    status:     'proposed',
    icon:       'Compass',
    country:    'Nordic / Baltic',
    ndaSigned:  false,
    commitmentType: { en: 'Twinning / expertise', uk: 'Партнерство / експертиза' },
  }, 3),

  // ── Depth 2 — CIVIL leaves ────────────────────────────────────────────────
  p('civ-citizens', 2, 'civil', {
    name:       { en: 'Citizens Assembly Ukraine', uk: 'Громадянські збори України' },
    shortDesc:  { en: 'Participatory design & community voice', uk: 'Партисипаторний дизайн і голос громади' },
    description: {
      en: 'The citizens assembly drives the CO-CREATE pillar by organising structured community dialogue sessions (Explore → Evaluate → Propose → Decide). It ensures that reconstruction decisions reflect residents\' lived experience and cultural memory.',
      uk: 'Громадянські збори рухають пілар CO-CREATE, організовуючи структуровані сесії діалогу з громадою (Досліджуй → Оцінюй → Пропонуй → Вирішуй). Вони гарантують, що рішення з відновлення відображають повсякденний досвід та культурну пам\'ять мешканців.',
    },
    category:   PartnerCategory.CIVIL,
    status:     'in_dialog',
    icon:       'Vote',
    country:    'Ukraine',
    ndaSigned:  false,
    commitmentType: { en: 'Community engagement', uk: 'Залучення громади' },
  }, 0),

  p('civ-university', 2, 'civil', {
    name:       { en: 'European University Network', uk: 'Мережа Європейських університетів' },
    shortDesc:  { en: 'Research, training, documentation', uk: 'Дослідження, навчання, документація' },
    description: {
      en: 'A network of European universities providing independent research into post-war reconstruction methodologies, training programmes for Ukrainian planners and engineers, and academic documentation of the programme for evidence-based policy.',
      uk: 'Мережа університетів Європи, що проводить незалежні дослідження методологій відновлення після війни, навчальні програми для українських планувальників та інженерів і наукову документацію програми для доказово-обґрунтованої політики.',
    },
    category:   PartnerCategory.CIVIL,
    status:     'contacted',
    icon:       'GraduationCap',
    country:    'EU',
    ndaSigned:  false,
    commitmentType: { en: 'Research & training', uk: 'Дослідження та навчання' },
  }, 1),

  p('civ-ngo', 2, 'civil', {
    name:       { en: 'NGO Reconstruction Alliance', uk: 'НГО Альянс відновлення' },
    shortDesc:  { en: 'Civil oversight & advocacy', uk: 'Громадянський нагляд та адвокасі' },
    description: {
      en: 'A coalition of Ukrainian and international NGOs providing independent monitoring of programme activities, community advocacy, and connecting the reconstruction process to broader civil society networks and human rights frameworks.',
      uk: 'Коаліція українських та міжнародних НГО, що забезпечує незалежний моніторинг діяльності програми, адвокасі інтересів громади та пов\'язує процес відновлення з ширшими мережами громадянського суспільства та правозахисними рамками.',
    },
    category:   PartnerCategory.CIVIL,
    status:     'proposed',
    icon:       'HeartHandshake',
    country:    'International',
    ndaSigned:  false,
    commitmentType: { en: 'Civil oversight', uk: 'Громадянський нагляд' },
  }, 2),

  p('civ-diaspora', 2, 'civil', {
    name:       { en: 'Ukrainian Diaspora Networks', uk: 'Мережі Української діаспори' },
    shortDesc:  { en: 'Skills, funding, memory preservation', uk: 'Навички, фінансування, збереження пам\'яті' },
    description: {
      en: 'Diaspora networks mobilise Ukrainian professionals abroad (architects, engineers, planners) who contribute skills and funding to the reconstruction effort, while also serving as bridges to host-country city governments and business communities.',
      uk: 'Мережі діаспори мобілізують українських фахівців за кордоном (архітекторів, інженерів, планувальників), які вносять навички та фінансування в зусилля з відновлення, а також виступають містками до урядів міст країн-господарів і ділових спільнот.',
    },
    category:   PartnerCategory.CIVIL,
    status:     'proposed',
    icon:       'Heart',
    country:    'International',
    ndaSigned:  false,
    commitmentType: { en: 'Skills & funding', uk: 'Навички та фінансування' },
  }, 3),
];

// ─── Edges ────────────────────────────────────────────────────────────────────
export const CONSORTIUM_EDGES: Edge[] = [
  // Center → branches
  { id: 'e-center-lead',      source: 'center', target: 'lead',      style: { stroke: CAT_EDGE_COLOR[PartnerCategory.LEAD],      strokeWidth: 2 }, animated: true, type: 'smoothstep' },
  { id: 'e-center-technical', source: 'center', target: 'technical', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.TECHNICAL], strokeWidth: 2 }, animated: true, type: 'smoothstep' },
  { id: 'e-center-financing', source: 'center', target: 'financing', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.FINANCING], strokeWidth: 2 }, animated: true, type: 'smoothstep' },
  { id: 'e-center-public',    source: 'center', target: 'public',    style: { stroke: CAT_EDGE_COLOR[PartnerCategory.PUBLIC],    strokeWidth: 2 }, animated: true, type: 'smoothstep' },
  { id: 'e-center-civil',     source: 'center', target: 'civil',     style: { stroke: CAT_EDGE_COLOR[PartnerCategory.CIVIL],     strokeWidth: 2 }, animated: true, type: 'smoothstep' },
  // Lead → leaves
  { id: 'e-lead-secretariat', source: 'lead', target: 'lead-secretariat', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.LEAD], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-lead-advisory',    source: 'lead', target: 'lead-advisory',    style: { stroke: CAT_EDGE_COLOR[PartnerCategory.LEAD], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-lead-qa',          source: 'lead', target: 'lead-qa',          style: { stroke: CAT_EDGE_COLOR[PartnerCategory.LEAD], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  // Technical → leaves
  { id: 'e-tech-dt',   source: 'technical', target: 'tech-digital-twin', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.TECHNICAL], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-tech-bim',  source: 'technical', target: 'tech-bim',          style: { stroke: CAT_EDGE_COLOR[PartnerCategory.TECHNICAL], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-tech-gis',  source: 'technical', target: 'tech-gis',          style: { stroke: CAT_EDGE_COLOR[PartnerCategory.TECHNICAL], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-tech-con',  source: 'technical', target: 'tech-construction', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.TECHNICAL], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  // Financing → leaves
  { id: 'e-fin-eu',      source: 'financing', target: 'fin-eu',      style: { stroke: CAT_EDGE_COLOR[PartnerCategory.FINANCING], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-fin-ifi',     source: 'financing', target: 'fin-ifi',     style: { stroke: CAT_EDGE_COLOR[PartnerCategory.FINANCING], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-fin-nordic',  source: 'financing', target: 'fin-nordic',  style: { stroke: CAT_EDGE_COLOR[PartnerCategory.FINANCING], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-fin-private', source: 'financing', target: 'fin-private', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.FINANCING], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  // Public → leaves
  { id: 'e-pub-kharkiv',       source: 'public', target: 'pub-kharkiv',       style: { stroke: CAT_EDGE_COLOR[PartnerCategory.PUBLIC], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-pub-ministry',      source: 'public', target: 'pub-ministry',      style: { stroke: CAT_EDGE_COLOR[PartnerCategory.PUBLIC], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-pub-eu-delegation', source: 'public', target: 'pub-eu-delegation', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.PUBLIC], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-pub-nordic-cities', source: 'public', target: 'pub-nordic-cities', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.PUBLIC], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  // Civil → leaves
  { id: 'e-civ-citizens',   source: 'civil', target: 'civ-citizens',   style: { stroke: CAT_EDGE_COLOR[PartnerCategory.CIVIL], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-civ-university', source: 'civil', target: 'civ-university', style: { stroke: CAT_EDGE_COLOR[PartnerCategory.CIVIL], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-civ-ngo',        source: 'civil', target: 'civ-ngo',        style: { stroke: CAT_EDGE_COLOR[PartnerCategory.CIVIL], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
  { id: 'e-civ-diaspora',   source: 'civil', target: 'civ-diaspora',   style: { stroke: CAT_EDGE_COLOR[PartnerCategory.CIVIL], strokeWidth: 1.5 }, animated: false, type: 'smoothstep' },
];
