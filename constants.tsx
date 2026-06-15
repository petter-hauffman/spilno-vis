import { Node, Edge } from 'reactflow';
import { SpilnoNodeData, NodeCategory } from './types';

export type SpilnoNode = Node<SpilnoNodeData>;

// ─── Compact node factory ────────────────────────────────────────────────────
function nd(
  id: string, cat: NodeCategory, icon: string, depth: 0|1|2, branchId: string,
  lEN: string, lUK: string,
  dEN: string, dUK: string,
  sEN: string, sUK: string,
  wEN: string, wUK: string,
  ref?: string, leafIndex?: number
): SpilnoNode {
  return {
    id, type: 'custom', position: { x: 0, y: 0 },
    data: {
      label: { en: lEN, uk: lUK },
      shortDesc: { en: dEN, uk: dUK },
      inspectorSummary: { en: sEN, uk: sUK },
      whitepaperDetail: { en: wEN, uk: wUK },
      whitepaperRef: ref,
      category: cat, icon, depth, branchId, leafIndex,
    },
  };
}

const C = NodeCategory;

// ═══════════════════════════════════════════════════════════════════════════
// NODES
// ═══════════════════════════════════════════════════════════════════════════
export const INITIAL_NODES: SpilnoNode[] = [

  // ── DEPTH 0 — CENTER ─────────────────────────────────────────────────────
  nd('spilno', C.CENTER, 'Globe', 0, 'spilno',
    'SPILNO · Спільно', 'СПІЛЬНО · Spilno',
    'Together — Rebuilding Ukraine\'s Cities',
    'Разом — Відновлення міст України',
    'Spilno is an open reconstruction programme that rebuilds Ukrainian cities together with the communities who lived there. It combines AI digital twins, citizen co-design, and industrialised construction into one integrated pipeline.',
    'Спільно — відкрита програма реконструкції, що відновлює українські міста разом із громадами. Вона поєднує цифрові двійники на основі ШІ, участь громадян і промислове будівництво в єдиний конвеєр.',
    'The full-scale Russian invasion has caused $486 billion in reconstruction needs across Ukraine. Spilno addresses this with a three-pillar approach: remember the pre-war city through AI-powered digital twins, co-create the future with citizens, and rebuild faster through industrialised off-site manufacturing. The programme is designed to be open, anti-corruption by design, and EU-aligned from day one.',
    'Повномасштабне вторгнення спричинило потребу у відновленні на $486 млрд. Спільно вирішує це через три опори: відновлення пам\'яті міста за допомогою цифрових двійників ШІ, спільне проектування з громадянами та прискорене промислове будівництво. Програма відкрита, антикорупційна за своєю архітектурою та відповідає стандартам ЄС.',
    'Chapter 2 — Programme Concept'
  ),

  // ── DEPTH 1 — MAIN BRANCHES ──────────────────────────────────────────────
  nd('why', C.WHY, 'HeartHandshake', 1, 'why',
    'WHY — The Mission', 'ЧОМУ — Місія',
    'Why reconstruction must be done differently',
    'Чому відновлення має бути іншим',
    'The reconstruction of Ukraine is the largest urban rebuilding challenge of the 21st century. $486 billion in needs, 14 million displaced, and current approaches are fragmented, top-down, and prone to corruption. Spilno exists because doing this alone — slowly, expensively, without communities — is not acceptable.',
    'Відновлення України — найбільший виклик міського будівництва XXI століття. $486 млрд потреб, 14 млн переміщених осіб, а поточні підходи фрагментовані й схильні до корупції. Спільно існує тому, що робити це поодинці — повільно, дорого, без громад — неприйнятно.',
    'Ukraine\'s destruction spans ~2 million homes, 3,500+ schools, and 1,700+ healthcare facilities. Behind the statistics is a human crisis: 80% of displaced persons want to return, but only if their city is recognisable, safe, and liveable. The window to shape how Ukraine rebuilds is open now — reconstruction contracts are being awarded and standards are being set today.',
    'Руйнування в Україні охоплюють ~2 млн будинків, 3500+ шкіл та 1700+ медичних закладів. За статистикою стоїть людська криза: 80% переміщених осіб хочуть повернутися, але лише якщо їхнє місто буде впізнаваним, безпечним і придатним для життя. Вікно можливостей для формування підходу до відновлення відкрите зараз.',
    'Chapter 1 — The Challenge'
  ),

  nd('what', C.WHAT, 'Layers', 1, 'what',
    'WHAT — The Programme', 'ЩО — Програма',
    'Three-pillar reconstruction architecture',
    'Триопорна архітектура відновлення',
    'The Spilno programme is built on three interconnected pillars: REMEMBER reconstructs the pre-war city as a high-fidelity digital twin; CO-CREATE enables citizens to co-design their future neighbourhoods; REBUILD industrialises construction into a fast, quality-controlled pipeline.',
    'Програма Спільно побудована на трьох взаємопов\'язаних опорах: ПАМ\'ЯТАТИ відновлює довоєнне місто як цифровий двійник; СТВОРИТИ РАЗОМ дозволяє громадянам спільно проектувати; ВІДБУДУВАТИ перетворює будівництво на швидкий промисловий конвеєр.',
    'The three-pillar architecture ensures that reconstruction starts from evidence (the digital twin), proceeds through democratic endorsement (citizen dialogue), and delivers at speed and scale (industrialised pipeline). Each pillar is designed to be both independently valuable and mutually reinforcing.',
    'Триопорна архітектура гарантує, що відновлення починається з доказової бази (цифровий двійник), проходить через демократичне схвалення (діалог з громадянами) і реалізується швидко та у масштабі (промисловий конвеєр). Кожна опора цінна як самостійно, так і в єдності.',
    'Chapter 2 — The Concept'
  ),

  nd('who', C.WHO, 'Users', 1, 'who',
    'WHO — The Consortium', 'ХТО — Консорціум',
    'Open certified partner ecosystem',
    'Відкрита сертифікована партнерська мережа',
    'Spilno is delivered by an open consortium of Ukrainian stakeholders, technology partners, modular manufacturers, financiers, academic institutions, and civil society organisations. No single actor can deliver this alone — the consortium is the mechanism for assembling the capabilities required.',
    'Спільно реалізується відкритим консорціумом: українські стейкхолдери, технологічні партнери, модульні виробники, фінансисти, академічні установи та організації громадянського суспільства. Жоден суб\'єкт не може зробити це наодинці — консорціум забезпечує потрібні компетенції.',
    'The consortium is a certified partner ecosystem with UCity as platform operator. Founding members join during the pilot phase, co-fund implementation, and help shape standards. The model is designed to scale from a handful of founding members to a national programme open to any qualified municipality.',
    'Консорціум — сертифікована партнерська мережа, де UCity є оператором платформи. Члени-засновники приєднуються на етапі пілоту, співфінансують реалізацію та формують стандарти. Модель масштабується від кількох засновників до національної програми, відкритої для будь-якої громади.',
    'Chapter 12 — The Consortium'
  ),

  nd('how', C.HOW, 'ShieldCheck', 1, 'how',
    'HOW — Principles', 'ЯК — Принципи',
    'Six founding design principles',
    'Шість засадничих принципів',
    'Spilno is governed by six principles that distinguish it from conventional reconstruction: Memory before planning, Citizens before planners, Reuse before demolition, Factory before field, Pipeline before projects, and Openness before lock-in. These are not aspirations — they are structural design decisions.',
    'Спільно керується шістьма принципами: Пам\'ять до планування, Громадяни до планувальників, Повторне використання до знесення, Завод до майданчика, Конвеєр до проєктів, Відкритість до прив\'язки. Це не прагнення — це структурні рішення.',
    'Anti-corruption is embedded into the architecture: all procurement is digital and auditable via ProZorro integration, every decision has a full audit trail, multi-stakeholder sign-off prevents single-actor manipulation, and citizen endorsement empowers communities to monitor execution. The programme is EU-aligned from day one, built for Ukraine\'s accession path.',
    'Антикорупційність вбудована в архітектуру: вся закупівля цифрова та аудируєма через ProZorro, кожне рішення має повний аудитний слід, багатостороннє підписання запобігає маніпуляціям, а підтримка громади дозволяє контролювати виконання. Програма відповідає стандартам ЄС з першого дня.',
    'Chapter 4 — Governance'
  ),

  nd('where', C.WHERE, 'MapPin', 1, 'where',
    'WHERE & WHEN', 'ДЕ І КОЛИ',
    'Phase 0 → National platform by 2028+',
    'Фаза 0 → Національна платформа 2028+',
    'The programme moves from consortium formation now, through a 2026 pilot neighbourhood, to first residents returning in 2027, multi-city scaling in 2027–2028, and a standing national reconstruction platform by 2028+. The pilot to first handover target is 24 months — faster than any comparable post-conflict reconstruction.',
    'Програма рухається від формування консорціуму зараз — через пілотний район у 2026 році — до повернення перших мешканців у 2027 році, масштабування до кількох міст у 2027–2028 роках і постійної національної платформи з 2028 року. Ціль від пілоту до першого заселення — 24 місяці.',
    'The 24-month target from MoU to first residents is unprecedented in post-conflict urban reconstruction. Christchurch CBD took 8 years; Aceh 5 years; Beirut 15+ years. Spilno achieves this through industrialised off-site manufacturing, parallel workstreams, and a pre-certified consortium supply chain ready to activate on plan endorsement.',
    'Ціль у 24 місяці від підписання меморандуму до заселення перших мешканців — безпрецедентна у постконфліктному відновленні. CBD Крайстчерча — 8 років, Ачех — 5, Бейрут — 15+. Спільно досягає цього завдяки промисловому будівництву на заводах, паралельним потокам роботи та сертифікованому ланцюгу постачань.',
    'Chapter 13 — 24-Month Roadmap'
  ),

  // ── DEPTH 1 — WHAT SUB-BRANCHES ───────────────────────────────────────────
  nd('remember', C.REMEMBER, 'Brain', 1, 'remember',
    'REMEMBER — Digital Twin', 'ПАМ\'ЯТАТИ — Цифровий двійник',
    'AI-powered pre-war city reconstruction',
    'Відновлення довоєнного міста засобами ШІ',
    'Before any plan is drawn, Spilno reconstructs what was there. The AI-powered digital twin assembles every building, street, utility, tree, and public space from satellite imagery, street-level photographs, cadastral records, and engineering drawings into a high-fidelity 3D model.',
    'Перед будь-яким плануванням Спільно відновлює те, що було. Цифровий двійник на основі ШІ збирає кожну будівлю, вулицю, комунікацію, дерево та громадський простір із супутникових знімків, вуличних фото, кадастрових записів та інженерних креслень у 3D-модель.',
    'The digital twin is built on UCity\'s AI reconstruction engine: a zero-shot vision stack (Grounding DINO + SAM 2) classifies every façade element, a multi-view fusion pipeline builds the 3D model, and a valuation layer assigns economic and structural attributes to every element. The result is the first complete factual inventory of a destroyed city.',
    'Цифровий двійник побудований на движку реконструкції ШІ UCity: стек комп\'ютерного зору (Grounding DINO + SAM 2) класифікує кожен елемент фасаду, конвеєр мультиракурсного злиття будує 3D-модель, а шар оцінки присвоює економічні та структурні атрибути кожному елементу.',
    'Chapter 3 — Technology Architecture'
  ),

  nd('cocreate', C.COCREATE, 'MessageSquare', 1, 'cocreate',
    'CO-CREATE — Citizens', 'СТВОРИТИ РАЗОМ — Громадяни',
    'Four-stage citizen dialogue & endorsement',
    'Чотиристадійний діалог та затвердження громадою',
    'The digital twin is not a technocratic tool — it is a shared space for democratic decision-making. Citizens, diaspora, property owners, and municipalities walk through the pre-war city virtually, evaluate every element, and co-design scenarios before formally endorsing a reconstruction plan.',
    'Цифровий двійник — не технократичний інструмент, а простір для демократичного прийняття рішень. Громадяни, діаспора, власники майна та муніципалітети проходять крізь довоєнне місто, оцінюють кожен елемент і спільно розробляють сценарії перед офіційним затвердженням плану.',
    'The platform is accessible from any device by residents abroad, Diia-authenticated for verified Ukrainian identity, and designed to WCAG 2.1 AA accessibility standards. No plan advances to construction without genuine community endorsement — this is a structural requirement, not an advisory step.',
    'Платформа доступна з будь-якого пристрою для мешканців за кордоном, автентифікована через Дію та відповідає стандартам доступності WCAG 2.1 AA. Жоден план не переходить до будівництва без справжньої підтримки громади — це структурна вимога, а не консультативний крок.',
    'Chapter 2.2 — CO-CREATE Pillar'
  ),

  nd('rebuild', C.REBUILD, 'Building2', 1, 'rebuild',
    'REBUILD — Pipeline', 'ВІДБУДУВАТИ — Конвеєр',
    'Industrialised off-site manufacturing pipeline',
    'Промисловий конвеєр позамайданчикового виробництва',
    'Once a plan is endorsed, the rebuild pipeline activates. Component specifications flow to certified consortium factories in Ukraine and the EU. UXO clearance, structural triage, and site preparation run in parallel. Components arrive on-site pre-tested and ready for rapid assembly by trained crews.',
    'Після затвердження плану активується конвеєр відбудови. Специфікації компонентів надходять до сертифікованих заводів консорціуму в Україні та ЄС. Розмінування, структурний тріаж та підготовка майданчика відбуваються паралельно. Компоненти надходять на майданчик попередньо перевіреними та готовими до монтажу.',
    'The modular catalogue covers residential units (single-family to medium multi-family), schools, clinics, community centres, and infrastructure modules — all compliant with DBN and EU Eurocodes, all with mandatory integrated bomb shelters. Off-site manufacturing minimises on-site trades, compresses timelines, and controls quality at the factory level.',
    'Модульний каталог охоплює житлові одиниці (від індивідуальних до середньоповерхових), школи, клініки, громадські центри та інфраструктурні модулі — всі відповідають ДБН та Єврокодам, всі мають обов\'язкові вбудовані укриття. Виробництво на заводі мінімізує роботи на майданчику та контролює якість.',
    'Chapter 2.3–2.4 — REBUILD Pillar'
  ),

  // ── DEPTH 2 — WHY LEAVES ──────────────────────────────────────────────────
  nd('why-scale', C.WHY, 'BarChart3', 2, 'why',
    'Scale of Destruction', 'Масштаби руйнувань',
    '$486bn · 2M homes · 25k km roads',
    '$486 млрд · 2 млн будинків · 25 тис. км доріг',
    'The World Bank\'s RDNA4 estimates $486 billion in reconstruction needs over ten years. ~2 million housing units, 3,500+ schools, 1,700+ healthcare facilities, and 25,000+ km of roads have been damaged or destroyed. Regions most affected include Donetsk, Kharkiv, Kherson, Zaporizhzhia, and Mykolaiv.',
    'RDNA4 Світового банку оцінює потреби у відновленні у $486 млрд на десять років. Пошкоджено або знищено ~2 млн житлових одиниць, 3500+ шкіл, 1700+ медичних закладів та 25 000+ км доріг. Найбільш постраждалі регіони: Донецька, Харківська, Херсонська, Запорізька та Миколаївська обл.',
    'The destruction spans every category of built environment — housing, schools, healthcare, cultural heritage, transport, energy, and water infrastructure. The scale is comparable to post-WWII European reconstruction, but compressed into a fraction of the timeline and expected to meet 21st-century urban standards and EU building codes.',
    'Руйнування охоплюють усі категорії: житло, школи, охорону здоров\'я, культурну спадщину, транспорт, енергетику та водопостачання. Масштаб порівнянний із повоєнною відбудовою Європи після Другої світової, але стиснутий у коротші терміни та має відповідати стандартам XXI ст. та будівельним нормам ЄС.',
    'Chapter 1.1', 0
  ),

  nd('why-human', C.WHY, 'Heart', 2, 'why',
    'Human Dimension', 'Людський вимір',
    '6.7M refugees · 80% want to return',
    '6.7 млн біженців · 80% хочуть повернутися',
    '~6.7 million Ukrainian refugees are abroad and ~3.7 million are internally displaced. An estimated 80% express a desire to return — but only if safety, housing, schools, and services are restored. Rebuilt cities must be places people actively choose to return to, not just physical structures.',
    '~6.7 млн українських біженців перебувають за кордоном, ~3.7 млн — внутрішньо переміщені. Близько 80% хочуть повернутися — але лише за умови безпеки, наявності житла, шкіл та послуг. Відбудовані міста мають бути місцями, куди люди свідомо обирають повернутися.',
    'The reconstruction challenge is simultaneously social (rebuilding communities, not just structures), psychological (cities destroyed by trauma must be rebuilt with care for memory and place), demographic (preventing permanent population shrinkage), and economic (creating conditions for local employment and tax base). Physical reconstruction without addressing these dimensions will fail.',
    'Відновлення є одночасно соціальним викликом (відбудова громад, а не лише споруд), психологічним (пам\'ять місця), демографічним (запобігання постійному скороченню населення) та економічним (умови для зайнятості та податкової бази). Фізична відбудова без вирішення цих вимірів зазнає невдачі.',
    'Chapter 1.2', 1
  ),

  nd('why-fragmentation', C.WHY, 'Network', 2, 'why',
    'Fragmented Response', 'Фрагментована реакція',
    '50+ donors, no shared standard',
    '50+ донорів, без спільного стандарту',
    'Over 50 national and international donor organisations, multiple ministries, local authorities, and NGOs are running reconstruction activities without a shared data standard, decision-making framework, or accountability mechanism. The result is duplication, gaps, and incompatible outputs.',
    'Понад 50 національних та міжнародних донорських організацій, кілька міністерств, місцеві органи влади та НУО ведуть відновлення без спільного стандарту даних, механізму прийняття рішень чи підзвітності. Результат — дублювання, прогалини та несумісні результати.',
    'Current reconstruction is also vulnerable to top-down planning (communities consulted late or not at all), loss of pre-war knowledge (reusable infrastructure ignored), speed-quality trade-offs (political pressure to show progress fast), safety gaps (UXO contamination), and corruption risk. Spilno is designed to address each of these structural weaknesses.',
    'Поточне відновлення вразливе до: планування зверху вниз, втрати довоєнних знань, поступок якістю заради швидкості, прогалин безпеки (мінне забруднення) та корупційних ризиків. Спільно розроблено для усунення кожної з цих структурних вад.',
    'Chapter 1.3', 2
  ),

  nd('why-memory', C.WHY, 'Landmark', 2, 'why',
    'Cities Are Memory', 'Міста — це пам\'ять',
    'Place identity · heritage · belonging',
    'Ідентичність місця · спадщина · приналежність',
    'Cities are not just buildings — they are the accumulated memory of communities. Destroyed neighbourhoods represent decades of infrastructure investment, cultural meaning, and spatial identity. Reconstruction that ignores this produces places that feel foreign to returning residents, reducing the likelihood of return.',
    'Міста — це не просто будівлі, а накопичена пам\'ять громад. Зруйновані квартали — це десятиліття інвестицій в інфраструктуру, культурний сенс та просторову ідентичність. Відновлення без урахування цього створює місця, чужі для мешканців, що повертаються.',
    'Ukraine\'s built cultural heritage — UNESCO sites, nationally listed monuments, locally significant buildings — requires specific treatment within the reconstruction framework. Heritage-listed buildings are flagged in the digital twin, subject to a dedicated review track, and require approval from the Ministry of Culture. Reconstruction follows conservation principles: minimum intervention, reversibility, authenticity.',
    'Збудована культурна спадщина України — об\'єкти ЮНЕСКО, пам\'ятки національного значення — потребує особливого підходу. Пам\'ятки автоматично позначаються в цифровому двійнику, підпадають під окремий трек перевірки та потребують погодження Міністерства культури. Відновлення керується принципами консервації: мінімальне втручання, зворотність, автентичність.',
    'Chapter 1.2 / 4.5', 3
  ),

  nd('why-opportunity', C.WHY, 'Sparkles', 2, 'why',
    'Once-in-a-Generation Opportunity', 'Можливість покоління',
    'Build better · EU-aligned · digital future',
    'Будувати краще · відповідно до ЄС · цифрове майбутнє',
    'Ukraine\'s reconstruction is not merely a repair challenge. It is an opportunity to rebuild cities that are more energy-efficient, climate-resilient, and accessible than before; to establish digital city management systems that will serve Ukraine for decades; and to create a replicable model for post-conflict reconstruction globally.',
    'Відновлення України — це не просто ремонт. Це можливість збудувати міста більш енергоефективними, кліматостійкими та доступними; запровадити цифрові системи управління містом; і створити відтворювану модель постконфліктного відновлення для всього світу.',
    'Ukraine is a formal EU candidate country. Reconstruction programmes that align with EU standards — in procurement, data protection, building codes, and governance — will be eligible for EU funding and will accelerate accession. Spilno is built EU-alignment-compatible from day one, creating a strong incentive for EU actors across the supply chain.',
    'Україна є офіційним кандидатом на членство в ЄС. Програми відновлення, що відповідають стандартам ЄС — в закупівлях, захисті даних, будівельних нормах та врядуванні — мають право на фінансування ЄС та прискорюють інтеграцію. Спільно є сумісним зі стандартами ЄС з першого дня.',
    'Chapter 1.4', 4
  ),

  nd('why-window', C.WHY, 'Clock', 2, 'why',
    'The Window Is Now', 'Вікно можливостей — зараз',
    'Standards being set · act in 2025–26',
    'Стандарти формуються зараз · діяти у 2025–26',
    'The window to shape how Ukraine rebuilds is open now — but it will not remain open indefinitely. Reconstruction contracts are being awarded. Standards are being set. Supplier relationships are being established. Urban master plans are being drafted. Decisions made in 2025 and 2026 will determine the physical character of Ukrainian cities for the next 50 years.',
    'Вікно можливостей для формування підходу до відновлення відкрите зараз — але не назавжди. Укладаються контракти, встановлюються стандарти, формуються ланцюги постачань, розробляються генеральні плани. Рішення 2025–2026 років визначатимуть вигляд українських міст на наступні 50 років.',
    'Actors who engage now — with the right approach, the right technology, and the right consortium — will shape those decisions. Actors who arrive later will inherit constraints they did not design. This is the case for Spilno\'s urgency: not panic, but strategic clarity about the value of early engagement.',
    'Актори, що залучаться зараз — з правильним підходом, технологіями та консорціумом — сформують ці рішення. Ті, хто прийдуть пізніше, успадкують обмеження, яких вони не проектували. Це і є обґрунтування терміновості Спільно: не паніка, а стратегічна ясність щодо цінності раннього залучення.',
    'Chapter 1.5', 5
  ),

  // ── DEPTH 2 — REMEMBER LEAVES ─────────────────────────────────────────────
  nd('rem-twin', C.REMEMBER, 'Cpu', 2, 'remember',
    'AI Reconstruction Engine', 'Движок реконструкції ШІ',
    'Zero-shot vision · 3D model · semantic inventory',
    'Комп\'ютерний зір · 3D-модель · семантичний інвентар',
    'The AI Reconstruction Engine transforms fused multi-source imagery into a structured 3D model of the pre-war urban environment through an eight-stage pipeline: synthetic rendering, zero-shot detection (Grounding DINO + SAM 2), 3D back-projection, multi-view fusion, asset library placement, and continuous RL improvement.',
    'Движок реконструкції ШІ перетворює злиті багатоджерельні зображення у структуровану 3D-модель довоєнного міста через восьмиетапний конвеєр: синтетичний рендеринг, детекція нульового пострілу (Grounding DINO + SAM 2), зворотна 3D-проєкція, мультиракурсне злиття, розміщення в бібліотеці активів та постійне вдосконалення через RL.',
    'Because both zero-shot models (Grounding DINO and SAM 2) require no per-class retraining, the system is immediately applicable to any Ukrainian urban context — from pre-revolutionary masonry to Soviet panel construction to post-Soviet commercial buildings. The RL loop means the platform becomes measurably faster and more accurate with every project processed.',
    'Оскільки обидві моделі нульового пострілу не потребують перенавчання під кожен клас, система одразу застосовна до будь-якого українського міського середовища — від дореволюційного мурування до радянських панельних будинків. Цикл RL означає, що платформа стає швидшою і точнішою з кожним проєктом.',
    'Chapter 3.3', 0
  ),

  nd('rem-data', C.REMEMBER, 'Satellite', 2, 'remember',
    'Multi-Source Data Fusion', 'Злиття даних з кількох джерел',
    'Satellite · street-level · archives · drones',
    'Супутник · вулична панорама · архіви · дрони',
    'The digital twin is built from multiple heterogeneous data sources: pre-war satellite imagery (Maxar, Planet Labs, Sentinel), Google/Yandex street-level photography, historical photographs from archives and social media, current drone surveys, cadastral records, Soviet engineering drawings, and LiDAR data. Quality is tracked with per-element confidence scores.',
    'Цифровий двійник будується з кількох різнорідних джерел: довоєнні супутникові знімки (Maxar, Planet Labs, Sentinel), вулична панорама Google/Yandex, архівні фото та соціальні мережі, поточні дрон-зйомки, кадастрові записи, радянські інженерні креслення та дані LiDAR. Якість відстежується оцінками достовірності кожного елемента.',
    'A multi-stage fusion pipeline georeferencing all data to a common coordinate system, reconciles imagery from different dates, detects conflicts between sources, assigns confidence scores (High/Medium/Low), and flags gaps for targeted crowdsourcing or drone collection. Crowdsourcing is a primary mechanism for closing low-confidence gaps: residents are prompted to submit historical photographs of specific buildings.',
    'Багатоетапний конвеєр злиття прив\'язує всі дані до єдиної системи координат, узгоджує знімки різних дат, виявляє конфлікти між джерелами, присвоює оцінки достовірності та позначає прогалини для краудсорсингу. Краудсорсинг — основний механізм закриття прогалин низької достовірності: мешканці надсилають архівні фото конкретних будівель.',
    'Chapter 3.2', 1
  ),

  nd('rem-valuation', C.REMEMBER, 'CircleDollarSign', 2, 'remember',
    'Valuation & Assessment Layer', 'Шар оцінки та аналізу',
    'Every building valued · damage scored · reuse rated',
    'Кожна будівля оцінена · збиток · потенціал повторного використання',
    'On top of the 3D model, the valuation layer assigns economic and strategic attributes to every element: estimated pre-war market value, ownership records, damage assessment, estimated reconstruction cost from the modular catalogue, and a reuse factor (0–100%) indicating what proportion of existing structure can be salvaged.',
    'Поверх 3D-моделі шар оцінки присвоює кожному елементу економічні та стратегічні атрибути: орієнтовна довоєнна ринкова вартість, дані про власність, оцінка збитку, розрахункова вартість відновлення за модульним каталогом та коефіцієнт повторного використання (0–100%).',
    'For infrastructure: estimated replacement value, operational status (intact/damaged/destroyed), reuse viability, and priority category. For vegetation: ecosystem service value, age, condition, and replanting cost. The valuation layer enables damage and loss assessment per property — feeding into compensation frameworks, insurance claims, and donor-funded reconstruction prioritisation.',
    'Для інфраструктури: розрахункова вартість заміни, операційний стан, придатність до повторного використання. Для зелених насаджень: вартість екосистемних послуг, вік, стан, вартість насадження. Шар оцінки забезпечує оцінку збитків та втрат на рівні кожного об\'єкта — для компенсаційних механізмів та пріоритизації відновлення.',
    'Chapter 3.4', 2
  ),

  nd('rem-scale', C.REMEMBER, 'ZoomIn', 2, 'remember',
    'Scales Building to Nation', 'Від будівлі до держави',
    'Building → block → city → region → national',
    'Будівля → квартал → місто → область → держава',
    'The digital twin architecture supports reconstruction at every spatial level: individual building, block/courtyard, street corridor, neighbourhood/district, city, region/oblast, and national. The same pipeline that processes a single building can process an entire city — scaling is a logistics challenge, not a design challenge.',
    'Архітектура цифрового двійника підтримує реконструкцію на кожному просторовому рівні: від окремої будівлі до кварталу, вулиці, мікрорайону, міста, регіону та держави. Той самий конвеєр, що обробляє одну будівлю, може обробити ціле місто — масштабування є логістичним, а не проєктним завданням.',
    'The modular catalogue and standardised pipeline mean that the lessons and specifications from Site 1 are directly reusable at Sites 2, 3, and beyond. The RL loop means the AI engine improves with each site. At national scale, the programme projects 14–18 months per site — enabled by a mature supply chain and a pre-trained reconstruction engine.',
    'Модульний каталог і стандартизований конвеєр означають, що уроки з Ділянки 1 безпосередньо застосовуються на Ділянці 2, 3 і далі. Цикл RL означає, що рушій ШІ вдосконалюється з кожною ділянкою. У національному масштабі програма прогнозує 14–18 місяців на ділянку.',
    'Chapter 2 / 3.8', 3
  ),

  nd('rem-living', C.REMEMBER, 'Wifi', 2, 'remember',
    'Living City Operating System', 'Живий цифровий двійник міста',
    'Permanent city OS · maintenance · energy · civic',
    'Постійна ОС міста · обслуговування · енергетика · послуги',
    'The digital twin does not stop being useful after reconstruction. Once rebuilt, it becomes the city\'s permanent information infrastructure: municipal maintenance management, energy and utility management, emergency preparedness, future urban development, and citizen services integration. The municipality\'s investment delivers a lasting digital governance asset.',
    'Цифровий двійник не припиняє бути корисним після завершення відновлення. Після відбудови він стає постійною інформаційною інфраструктурою міста: управління технічним обслуговуванням, енергетикою, підготовка до надзвичайних ситуацій та інтеграція послуг для громадян. Інвестиція муніципалітету дає постійний цифровий актив управління.',
    'Data ownership is clear: the municipality owns all urban data generated through the process. UCity has processor status only. The municipality can export all data at any time in open formats (CityGML, GeoJSON, IFC, CSV). All data is stored in EU-jurisdiction cloud infrastructure with end-to-end encryption. No personal data is shared between municipalities.',
    'Право власності на дані чітке: муніципалітет є власником усіх міських даних, UCity — лише обробником. Муніципалітет може в будь-який час експортувати всі дані у відкритих форматах (CityGML, GeoJSON, IFC, CSV). Дані зберігаються в хмарі у юрисдикції ЄС із наскрізним шифруванням.',
    'Chapter 2.3 / 3.4.3', 4
  ),

  // ── DEPTH 2 — CO-CREATE LEAVES ────────────────────────────────────────────
  nd('co-explore', C.COCREATE, 'Eye', 2, 'cocreate',
    'Stage 1 — Explore', 'Стадія 1 — Дослідити',
    'Walk through your city as it was',
    'Пройдіться містом, яким воно було',
    'Residents, property owners, and displaced citizens are given access to the pre-war digital twin of their neighbourhood. They can walk through it virtually, zoom in on their own home, see their street as it was. This stage is about restoring emotional connection and shared memory — before any decisions about the future are made.',
    'Мешканці, власники майна та переміщені громадяни отримують доступ до довоєнного цифрового двійника свого мікрорайону. Вони можуть віртуально пройтися ним, наблизитися до власного будинку, побачити свою вулицю такою, якою вона була. Ця стадія — про відновлення емоційного зв\'язку та спільної пам\'яті.',
    'The Stage 1 viewer is browser-based (no installation, works from any device including mobile), uses 3D Tiles and WebGL for fluid navigation, includes comment and annotation tools for pinning memories or identifying errors, and integrates with Diia (Ukraine\'s national digital identity platform) for verified participation.',
    'Переглядач Стадії 1 є браузерним (не потребує встановлення, працює з будь-якого пристрою), використовує 3D Tiles та WebGL для плавної навігації, включає інструменти коментування та анотування, а також інтегрується з Дією для верифікованої участі.',
    'Chapter 2.2 Stage 1', 0
  ),

  nd('co-evaluate', C.COCREATE, 'ListChecks', 2, 'cocreate',
    'Stage 2 — Evaluate', 'Стадія 2 — Оцінити',
    'Preserve · Rebuild · Adapt · Replace',
    'Зберегти · Відновити · Адаптувати · Замінити',
    'Participants are guided through a structured assessment of every element in the twin: Preserve as-is, Rebuild as-was, Adapt, or Replace. These evaluations are aggregated, analysed, and presented back as community preference maps — showing points of consensus and points of divergence, block by block and element by element.',
    'Учасники проходять структуровану оцінку кожного елемента двійника: Зберегти як є, Відновити як було, Адаптувати або Замінити. Ці оцінки агрегуються та представляються у вигляді карт уподобань громади — з позначенням консенсусу та розбіжностей, квартал за кварталом.',
    'Evaluations are weighted by residency type, property ownership, and vulnerability status. The preference aggregation engine identifies contested areas requiring deeper dialogue and reports all data transparently to all stakeholders. The goal is not a simple majority vote but a nuanced map of community values that planners can design against.',
    'Оцінки зважуються за типом проживання, правом власності та вразливістю. Движок агрегації вподобань виявляє суперечливі зони, що потребують глибшого діалогу, та прозоро звітує всім стейкхолдерам. Мета — не просте голосування більшістю, а детальна карта цінностей громади для планувальників.',
    'Chapter 2.2 Stage 2', 1
  ),

  nd('co-propose', C.COCREATE, 'Lightbulb', 2, 'cocreate',
    'Stage 3 — Propose', 'Стадія 3 — Запропонувати',
    'AI + planners generate costed scenarios',
    'ШІ + планувальники генерують сценарії з вартістю',
    'Using preference data as input, urban planners, architects, and AI-assisted generative design tools produce reconstruction scenarios ranging from "as close to original as possible" to "transformative reimagining." Each proposal is scored against citizen preferences, cost, energy efficiency, buildability, safety, and reuse efficiency.',
    'Використовуючи дані уподобань, міські планувальники, архітектори та інструменти генеративного проєктування ШІ створюють сценарії відновлення — від "максимально наближеного до оригіналу" до "трансформаційного переосмислення". Кожна пропозиція оцінюється за вподобаннями громадян, вартістю, енергоефективністю, реалізовністю та безпекою.',
    'Multiple scenarios are presented simultaneously to the community with clear cost, time, and trade-off transparency. The AI planning engine uses parametric design tools, generative AI for façade proposals consistent with local character, and constraint satisfaction to ensure compliance with DBN building codes, safety requirements, and infrastructure constraints.',
    'Кілька сценаріїв представляються громаді одночасно з чіткою прозорістю щодо вартості, термінів та компромісів. Движок планування ШІ використовує параметричні інструменти проєктування, генеративний ШІ для пропозицій фасадів у місцевому стилі та задоволення обмежень для відповідності ДБН та вимогам безпеки.',
    'Chapter 2.2 Stage 3', 2
  ),

  nd('co-decide', C.COCREATE, 'Vote', 2, 'cocreate',
    'Stage 4 — Decide', 'Стадія 4 — Вирішити',
    'Multi-stakeholder sign-off · legal endorsement',
    'Багатостороннє підписання · юридичне затвердження',
    'A structured, transparent sign-off process brings together resident representatives, property owners, local government, national government representatives, and donor/financier representatives. The outcome is a formally endorsed urban plan — traceable, auditable, legally grounded — that all parties have signed. This document triggers the rebuild pipeline.',
    'Структурований, прозорий процес підписання об\'єднує представників мешканців, власників майна, місцеву владу, представників центральної влади та донорів/фінансистів. Результат — офіційно затверджений міський план, відстежуваний, аудируємий та юридично обґрунтований. Цей документ запускає конвеєр відбудови.',
    'All planning decisions — citizen evaluations, expert reviews, authority sign-offs — are recorded with full version control and audit trails. This creates a legally defensible and publicly accessible record of the entire process. Multi-party sign-off creates structural resistance to single-actor corruption: the system is designed to be resilient to individual bad actors.',
    'Всі рішення — оцінки громадян, експертні огляди, підписання органами влади — фіксуються з повним версійним контролем та аудитними слідами. Це створює юридично захищений та публічно доступний запис усього процесу. Багатостороннє підписання структурно протидіє корупції одного суб\'єкта.',
    'Chapter 2.2 Stage 4', 3
  ),

  nd('co-diia', C.COCREATE, 'Smartphone', 2, 'cocreate',
    'Diia Integration & Access', 'Інтеграція з Дією та доступність',
    'Any device · any language · diaspora-ready',
    'Будь-який пристрій · будь-яка мова · для діаспори',
    'The citizen dialogue platform is web-based and works from any device with an internet connection — including displaced citizens abroad. Authentication is via Diia (Ukraine\'s national digital identity platform) for verified Ukrainian identity, or email/phone verification for diaspora users without Diia access. Offline-compatible mode is available for low-connectivity areas.',
    'Платформа діалогу з громадянами є веббраузерною та працює з будь-якого пристрою з інтернет-з\'єднанням — включно з переміщеними за кордоном. Автентифікація через Дію (національна цифрова ідентифікація) або email/телефон для діаспори без доступу до Дії. Режим офлайн доступний для районів із поганим зв\'язком.',
    'The platform meets WCAG 2.1 AA accessibility standards and is available in Ukrainian, English, and other relevant languages. Special sub-groups receive targeted engagement: elderly residents with lower digital literacy get offline support and phone-based participation; residents with disabilities get on-ground facilitators; minority communities are served in their languages.',
    'Платформа відповідає стандартам доступності WCAG 2.1 AA та доступна українською, англійською та іншими мовами. Для особливих груп передбачена цільова участь: для людей похилого віку — офлайн-підтримка та телефонна участь; для людей з обмеженими можливостями — координатори на місцях; для меншин — рідні мови.',
    'Chapter 2.2 / 3.6', 4
  ),

  // ── DEPTH 2 — REBUILD LEAVES ──────────────────────────────────────────────
  nd('reb-spec', C.REBUILD, 'ClipboardList', 2, 'rebuild',
    'Component Specification', 'Специфікація компонентів',
    'Endorsed plan → bill of quantities → factory',
    'Затверджений план → відомість матеріалів → завод',
    'Once the urban plan is endorsed, it is translated into a component specification document: a full bill of quantities and materials with every building element defined to factory-production level. This is the interface between the citizen-endorsed design and the manufacturing supply chain — the moment democratic intent becomes an engineering specification.',
    'Після затвердження міського плану він перекладається у специфікаційний документ компонентів: повна відомість кількостей та матеріалів із кожним елементом будівлі, визначеним до рівня заводського виробництва. Це інтерфейс між задумом громади та виробничим ланцюгом постачань.',
    'Certified consortium suppliers receive component specifications via the procurement interface. Contracts are awarded based on pre-certified capability, price, lead time, and logistics. Multiple competing suppliers can produce the same component type, ensuring price competition and supply resilience. All procurement is published in OCDS (Open Contracting Data Standard) format.',
    'Сертифіковані постачальники консорціуму отримують специфікації через портал закупівель. Контракти присуджуються на основі попередньо сертифікованих можливостей, ціни та термінів. Кілька конкуруючих постачальників можуть виробляти одні й ті самі компоненти. Усі закупівлі публікуються у форматі OCDS (відкритий стандарт контрактування).',
    'Chapter 2.3 Step 1', 0
  ),

  nd('reb-demining', C.REBUILD, 'ShieldAlert', 2, 'rebuild',
    'Mine Clearance — Non-Negotiable', 'Розмінування — обов\'язкова умова',
    'UXO clearance before any construction',
    'Очищення від НВП перед будь-яким будівництвом',
    'Ukraine is one of the most heavily mined and UXO-contaminated territories in the world. No construction begins on any site until UXO clearance is confirmed. Demining partners — HALO Trust, FSD, Norwegian People\'s Aid, and Ukrainian military engineers — are integrated into the programme as certified civil society partners.',
    'Україна є однією з найбільш замінованих та забруднених ВОП (вибухонебезпечними пережитками війни) територій у світі. Жодне будівництво не починається до підтвердження розмінування. Партнери з розмінування — HALO Trust, FSD, NPA та українські військові сапери — інтегровані до програми.',
    'UXO clearance is the single biggest risk to the 24-month timeline. Site selection weights UXO status heavily — sites with lower contamination levels or early clearance progress are prioritised. Clearance status feeds directly into the platform\'s site preparation module; construction sequencing is locked to the clearance certificate date, not estimated.',
    'Розмінування — найбільший ризик для 24-місячного графіку. Відбір ділянок надає перевагу менш забрудненим або вже частково розмінованим зонам. Статус розмінування надходить безпосередньо до модуля підготовки ділянки платформи; послідовність будівництва прив\'язана до дати видачі свідоцтва про розмінування.',
    'Chapter 2.3 Step 3', 1
  ),

  nd('reb-factory', C.REBUILD, 'Factory', 2, 'rebuild',
    'Off-Site Manufacturing', 'Заводське виробництво',
    'EU + Ukraine factories · pre-tested components',
    'Заводи ЄС та України · попередньо перевірені компоненти',
    'Components are produced in factories — initially in Ukraine and EU countries, with a preference for growing Ukrainian manufacturing capacity as the programme scales. Quality is controlled at the factory level against UCity Rebuild certification standards. Components arrive on-site pre-tested and ready for assembly.',
    'Компоненти виробляються на заводах — спочатку в Україні та країнах ЄС, з перевагою розвитку виробничих потужностей в Україні. Якість контролюється на заводському рівні згідно зі стандартами сертифікації UCity Rebuild. Компоненти надходять на майданчик попередньо перевіреними та готовими до монтажу.',
    'Consortium modular manufacturers include specialists in modular timber (Lindbäcks, Stora Enso, Setra, KLH), modular concrete and steel (Strabag, Peab), and utility modules. All catalogue items are designed for compatibility with multiple construction systems — timber frame, CLT, light steel, precast concrete — allowing supplier diversity while maintaining design consistency.',
    'Виробники модульних конструкцій у консорціумі: спеціалісти з модульного дерева (Lindbäcks, Stora Enso, Setra, KLH), бетону та сталі (Strabag, Peab) та утилітних модулів. Усі позиції каталогу сумісні з кількома конструктивними системами — дерев\'яний каркас, CLT, легка сталь, збірний бетон.',
    'Chapter 2.3 Step 4', 2
  ),

  nd('reb-assembly', C.REBUILD, 'HardHat', 2, 'rebuild',
    'On-Site Assembly', 'Монтаж на майданчику',
    'Trained crews · choreographed sequence · QA',
    'Навчені бригади · хореографована послідовність · контроль якості',
    'Site crews trained through the consortium\'s workforce development programme assemble components according to a choreographed sequence. The modular system design minimises the number of distinct trades required simultaneously on site — resulting in faster, safer, more predictable construction. Three-stage QA: factory → delivery → installation.',
    'Бригади, навчені в рамках програми розвитку кадрів консорціуму, збирають компоненти відповідно до хореографованої послідовності. Дизайн модульної системи мінімізує кількість одночасно необхідних спеціальностей на майданчику — результат: швидше, безпечніше та передбачуваніше будівництво. Трирівневий контроль якості: завод → доставка → монтаж.',
    'Infrastructure integration and commissioning follows assembly: structures are connected to reconstructed or reused underground infrastructure, buildings are commissioned for utilities, building management systems, and connectivity, and bomb shelters are verified before handover to residents or municipalities. The digital twin is updated to reflect the as-built state.',
    'Інтеграція інфраструктури та введення в експлуатацію: будівлі підключаються до відновленої або повторно використаної підземної інфраструктури, вводяться в експлуатацію комунікації та системи управління будівлею, перевіряються укриття. Цифровий двійник оновлюється до стану "як збудовано".',
    'Chapter 2.3 Step 5', 3
  ),

  nd('reb-catalogue', C.REBUILD, 'LayoutGrid', 2, 'rebuild',
    'Modular Catalogue', 'Модульний каталог',
    'Residential · schools · clinics · all with shelters',
    'Житло · школи · клініки · всі з укриттями',
    'The UCity Rebuild Modular Catalogue is a library of pre-specified building components and complete building types: residential (single-family to medium multi-family), primary and secondary schools, healthcare centres, community/cultural centres, administrative buildings, and infrastructure modules. All compliant with DBN and Eurocode equivalents.',
    'Модульний каталог UCity Rebuild — бібліотека попередньо специфікованих будівельних компонентів: житлові будинки (від індивідуальних до середньоповерхових), початкові та середні школи, медичні центри, громадські/культурні центри, адміністративні будівлі та інфраструктурні модулі. Всі відповідають ДБН та Єврокодам.',
    'Safety features are mandatory in all catalogue types: integrated bomb shelter/civil defence space per DBN V.2.2-5:2023, structural resilience to blast overpressure, and emergency power connection points. Catalogue specifications are published as open standards — any certified supplier can produce components, preventing monopoly and enabling supplier diversity.',
    'Елементи безпеки обов\'язкові у всіх типах: вбудоване укриття/простір цивільного захисту згідно з ДБН В.2.2-5:2023, структурна стійкість до надлишкового тиску вибуху та точки підключення аварійного живлення. Специфікації каталогу публікуються як відкриті стандарти — будь-який сертифікований постачальник може виробляти компоненти.',
    'Chapter 2.4', 4
  ),

  nd('reb-handover', C.REBUILD, 'Home', 2, 'rebuild',
    'Handover & Post-Occupancy', 'Передача та моніторинг після заселення',
    'First residents home · living twin activated',
    'Перші мешканці вдома · живий двійник активовано',
    'Completed structures are handed over with full documentation. The digital twin is updated to the as-built final state. IoT connections, municipal maintenance modules, and citizen services are activated. Post-occupancy surveys establish a baseline for measuring reconstruction quality against programme KPIs.',
    'Завершені будівлі передаються з повною документацією. Цифровий двійник оновлюється до кінцевого стану "як збудовано". Підключаються IoT, модулі муніципального обслуговування та послуги для громадян. Опитування після заселення встановлюють базовий рівень для вимірювання якості відновлення.',
    'The programme\'s 24-month milestone: first residents moved in, handover ceremony, media briefing. Post-occupancy monitoring tools allow residents to flag quality defects or discrepancies from approved plans — creating a citizen accountability mechanism that continues beyond the construction phase and into the life of the rebuilt neighbourhood.',
    'Ціль 24-місячної програми: перші мешканці заселилися, церемонія передачі, прес-брифінг. Інструменти моніторингу після заселення дозволяють мешканцям повідомляти про дефекти або розбіжності із затвердженими планами — механізм громадянської підзвітності, що діє і після будівельної фази.',
    'Chapter 13 / 7.4', 5
  ),

  // ── DEPTH 2 — WHO LEAVES ──────────────────────────────────────────────────
  nd('who-ukraine', C.WHO, 'Flag', 2, 'who',
    'Ukrainian Stakeholders', 'Українські стейкхолдери',
    'Citizens · municipalities · ministries · Diia',
    'Громадяни · громади · міністерства · Дія',
    'Tier 1 primary stakeholders include Ukrainian citizens (resident, displaced, diaspora), property owners, and municipalities (hromady). Key national bodies: Ministry of Communities and Territories Development (MinRegion), Ministry of Digital Transformation (Diia), State Geocadastre, Ministry of Culture, and NABU/SAPO anti-corruption bodies.',
    'Первинні стейкхолдери рівня 1: українські громадяни (місцеві, переміщені, діаспора), власники майна та муніципалітети (громади). Ключові органи: Мінрегіон, Міністерство цифрової трансформації (Дія), Держгеокадастр, Міністерство культури та НАБУ/САП.',
    'Citizens have full participation rights in all four dialogue stages and voting rights in Stage 4. Municipalities are data owners, plan sign-off parties, and MoU signatories. National government provides regulatory support and integration into the national recovery plan. The principle of subsidiarity governs: decisions at the lowest level at which they can be effectively made.',
    'Громадяни мають повне право участі у всіх чотирьох стадіях діалогу та право голосу на Стадії 4. Муніципалітети є власниками даних, підписантами плану та меморандуму. Центральний уряд забезпечує регуляторну підтримку. Принцип субсидіарності: рішення ухвалюються на якомога нижчому рівні.',
    'Chapter 6.2', 0
  ),

  nd('who-tech', C.WHO, 'Cpu', 2, 'who',
    'Technology Partners', 'Технологічні партнери',
    'Esri · Microsoft · Autodesk · CitizenLab',
    'Esri · Microsoft · Autodesk · CitizenLab',
    'Technology partners contribute data, APIs, and AI components that integrate with the Spilno platform: digital twin and GIS (Esri, Bentley, Hexagon), AI and cloud computing (Microsoft, AWS, Google), BIM and construction tech (Autodesk, Forma), and citizen engagement platforms (CitizenLab/Govocal, Decidim, Maptionnaire).',
    'Технологічні партнери надають дані, API та компоненти ШІ для платформи: цифровий двійник та ГІС (Esri, Bentley, Hexagon), ШІ та хмарні обчислення (Microsoft, AWS, Google), BIM та будівельні технології (Autodesk, Forma), платформи громадянської участі (CitizenLab/Govocal, Decidim, Maptionnaire).',
    'Technology partners receive integration at scale (deployed across every Spilno site), co-development opportunities through working groups, a high-visibility Ukraine reconstruction reference case, and co-IP for working group contributions. The platform uses open standards (CityGML, IFC, WFS/WMS, 3D Tiles) ensuring no single vendor lock-in.',
    'Технологічні партнери отримують: інтеграцію в масштабі (на кожній ділянці Спільно), можливості співрозробки через робочі групи, реферальний кейс відновлення України та спільну ІВ за внески до робочих груп. Платформа використовує відкриті стандарти (CityGML, IFC, WFS/WMS, 3D Tiles).',
    'Chapter 6.2.7 / 12.2', 1
  ),

  nd('who-construction', C.WHO, 'Building2', 2, 'who',
    'Construction Partners', 'Будівельні партнери',
    'Lindbäcks · Strabag · Peab · Ukrainian factories',
    'Lindbäcks · Strabag · Peab · Українські заводи',
    'Certified modular manufacturers produce building components to Spilno catalogue specifications. Initially EU-based for speed and quality assurance (Lindbäcks, Stora Enso, Setra, KLH for timber; Strabag, Peab for concrete/steel), with a progressive shift toward Ukrainian manufacturing capacity as the programme scales.',
    'Сертифіковані виробники модульних конструкцій виробляють компоненти за специфікаціями каталогу Спільно. Спочатку базуються в ЄС (Lindbäcks, Stora Enso, Setra, KLH — дерево; Strabag, Peab — бетон/сталь), з поступовим переходом до українського виробництва в міру масштабування програми.',
    'Construction partners receive long-term pre-certified supply contracts with demand visibility, first-mover advantage in shaping specifications, access to Europe\'s largest construction market, the "UCity Rebuild Certified Supplier" certification mark, and knowledge transfer about Ukrainian construction conditions, logistics, and costs.',
    'Будівельні партнери отримують: довгострокові попередньо сертифіковані контракти постачання, перевагу першого гравця у формуванні специфікацій, доступ до найбільшого будівельного ринку Європи, знак сертифікації "UCity Rebuild Certified Supplier" та обмін знаннями про умови будівництва в Україні.',
    'Chapter 6.2.8 / 12.2', 2
  ),

  nd('who-finance', C.WHO, 'Euro', 2, 'who',
    'Finance & Donors', 'Фінанси та донори',
    'EU €50bn · EBRD · Nordic funds · impact investors',
    'ЄС €50 млрд · ЄБРР · Скандинавські фонди · імпакт-інвестори',
    'Financing comes from multiple sources: EU Ukraine Facility (€50 billion, 2024–2027), Nordic donors (Norway Nansen Fund, NEFCO, SIDA, NIB), development banks (EBRD, EIB, World Bank), and impact investors. Spilno positions itself as the digital infrastructure layer for EU Ukraine Facility-funded reconstruction.',
    'Фінансування з кількох джерел: Механізм підтримки України ЄС (€50 млрд, 2024–2027), скандинавські донори (Норвезький фонд Нансена, NEFCO, SIDA, NIB), банки розвитку (ЄБРР, ЄІБ, Світовий банк) та імпакт-інвестори. Спільно позиціонується як цифровий інфраструктурний шар для фінансованого ЄС відновлення.',
    'Finance partners receive deal flow with first visibility on financeable projects, significantly reduced due diligence costs (digital twin valuation data de-risks assessment), measurable auditable impact data for ESG reporting, and positioning alongside EU Ukraine Facility for co-investment eligibility. All procurement is ProZorro-integrated for anti-corruption compliance.',
    'Фінансові партнери отримують: потік угод з першим переглядом проєктів, значно знижені витрати на due diligence (дані оцінки цифрового двійника знижують ризики), вимірювані дані про вплив для ESG-звітності та позиціонування поряд із механізмом ЄС для права на спільне інвестування.',
    'Chapter 6.2.10 / 5', 3
  ),

  nd('who-academic', C.WHO, 'GraduationCap', 2, 'who',
    'Academic & Research', 'Академічні та дослідницькі партнери',
    'KTH · TU Delft · UCU · Kyiv Polytechnic',
    'KTH · TU Delft · УКУ · КПІ',
    'Academic and research partners provide independent evaluation of platform performance, development of Ukrainian-specific AI training datasets, publication of knowledge generated through the programme, and connections to international research networks. Key institutions include KTH, Chalmers, NTNU, TU Delft, ETH Zurich, Ukrainian Catholic University, and Kyiv Polytechnic Institute.',
    'Академічні та дослідницькі партнери: незалежна оцінка роботи платформи, розробка навчальних наборів даних ШІ, специфічних для України, публікація знань, отриманих у рамках програми. Ключові установи: KTH, Chalmers, NTNU, TU Delft, ETH Zurich, Українського Католицького університету, КПІ.',
    'A dedicated Horizon Europe consortium anchor (CL4 Virtual Worlds Partnership) connects the programme to EU research funding. Academic partners also contribute to the RL training loop — providing validated reconstructions, expert reviews, and research-grade evaluation of platform accuracy. This creates a virtuous cycle of academic validation and programme improvement.',
    'Прив\'язка до консорціуму Horizon Europe (Партнерство CL4 "Віртуальні світи") пов\'язує програму з науковим фінансуванням ЄС. Академічні партнери також вносять внесок у цикл навчання RL — надаючи перевірені реконструкції, експертні огляди та дослідницьку оцінку точності платформи.',
    'Chapter 6.2.12 / 12', 4
  ),

  nd('who-orchestration', C.WHO, 'Target', 2, 'who',
    'UCity — Orchestrator', 'UCity — Оркестратор',
    'Programme initiator · platform operator · open to scale',
    'Ініціатор програми · оператор платформи · відкритий до масштабування',
    'UCity is the programme initiator and coordination platform — owning and operating the UCity Rebuild platform, setting and enforcing quality and certification standards, managing programme governance and stakeholder relations, and coordinating knowledge management. UCity is designed to be open to new coordinators as the programme scales.',
    'UCity — ініціатор програми та координаційна платформа: власник і оператор платформи UCity Rebuild, встановлення та дотримання стандартів якості, управління врядуванням та відносинами зі стейкхолдерами, координація управління знаннями. UCity відкритий до нових координаторів у міру масштабування програми.',
    'UCity does not bid for components or engineering services — it manages the procurement process but does not compete within it. This separation of roles is essential to trust. Platform IP (AI models, process methodology, brand) remains UCity-owned; consortium-developed improvements grant permanent royalty-free licences to contributing members.',
    'UCity не бере участі в тендерах на компоненти чи інженерні послуги — управляє процесом закупівель, але не конкурує в ньому. Це розділення ролей є ключовим для довіри. Платформенна ІВ залишається власністю UCity; розроблені консорціумом вдосконалення надають постійні безвідплатні ліцензії учасникам-вкладникам.',
    'Chapter 12.2 / 12.3', 5
  ),

  // ── DEPTH 2 — HOW LEAVES ──────────────────────────────────────────────────
  nd('how-memory', C.HOW, 'Archive', 2, 'how',
    'Memory Before Planning', 'Пам\'ять до планування',
    'Reconstruct before replacing',
    'Відновити перш ніж замінювати',
    'Before any new plan is drawn, Spilno reconstructs what was there. The pre-war city is not a blank slate — it contains decades of infrastructure investment, community meaning, and spatial knowledge. Starting with reconstruction rather than replacement is both economically prudent (reuse billions in existing infrastructure) and socially essential.',
    'Перш ніж розробляти новий план, Спільно відновлює те, що було. Довоєнне місто — не чистий аркуш: це десятиліття інвестицій в інфраструктуру, громадський сенс та просторові знання. Починати з відновлення, а не заміни — і економічно розумно (повторне використання мільярдів існуючої інфраструктури), і соціально необхідно.',
    'This principle directly addresses one of the most costly failures of conventional reconstruction: starting from scratch and ignoring billions of dollars of reusable infrastructure (utilities, foundations, hardscaping, vegetation). Every element is assessed for reuse before demolition is considered — this is both financially prudent and environmentally responsible.',
    'Цей принцип безпосередньо вирішує одну з найдорожчих помилок традиційного відновлення: починати з нуля та ігнорувати мільярди доларів придатної для повторного використання інфраструктури (комунікації, фундаменти, тверде покриття, зелені насадження). Кожен елемент оцінюється на предмет повторного використання перш ніж розглядається знесення.',
    'Chapter 2.1 Principle 1', 0
  ),

  nd('how-citizens', C.HOW, 'UserCheck', 2, 'how',
    'Citizens Before Planners', 'Громадяни до планувальників',
    'Community endorsement is structural requirement',
    'Схвалення громади — структурна вимога',
    'Communities have the right to shape the cities they live in. The citizen dialogue process is not a consultation afterthought — it is a core part of the decision-making architecture. No plan advances to construction without genuine community endorsement. This is a structural requirement, not an advisory option.',
    'Громади мають право формувати міста, в яких живуть. Діалог з громадянами — не консультативний придаток: це центральна частина архітектури прийняття рішень. Жоден план не переходить до будівництва без справжньої підтримки громади. Це структурна вимога, а не консультативна опція.',
    'The inclusion-over-efficiency principle accepts that thorough engagement takes time — but rejects the temptation to streamline for speed. A plan that 90% of residents endorse will be implemented faster and more durably than a plan imposed in half the time. Citizen accountability empowers communities to monitor execution and flag deviations.',
    'Принцип включення понад ефективністю визнає, що повноцінна участь потребує часу — але відкидає спокусу спростити заради швидкості. План, підтриманий 90% мешканців, буде реалізований швидше і надійніше, ніж нав\'язаний за половину часу. Громадянська підзвітність дає громадам право контролювати виконання.',
    'Chapter 2.1 Principle 2 / 6.1', 1
  ),

  nd('how-reuse', C.HOW, 'Recycle', 2, 'how',
    'Reuse Before Demolition', 'Повторне використання до знесення',
    'Foundations · utilities · hardscape — assessed first',
    'Фундаменти · комунікації · тверде покриття — спочатку оцінка',
    'Existing underground infrastructure, foundations, hardscaping, and vegetation represent significant economic value — often billions in replacement cost. Every element is assessed for reuse before demolition is considered. The valuation layer quantifies reuse potential (0–100%) for every structural and infrastructure element in the digital twin.',
    'Існуюча підземна інфраструктура, фундаменти, тверде покриття та зелені насадження мають значну економічну цінність — часто мільярди у вартості заміни. Кожен елемент оцінюється на предмет повторного використання перш ніж розглядається знесення. Шар оцінки кількісно визначає потенціал повторного використання (0–100%) для кожного структурного та інфраструктурного елемента.',
    'The pilot success criteria include a KPI of ≥50% of viable existing underground infrastructure integrated into reconstruction rather than replaced. This metric directly measures the economic efficiency of the reuse-first approach and provides a benchmark for comparison against conventional reconstruction, which typically starts infrastructure from scratch.',
    'Критерії успіху пілоту включають KPI: ≥50% придатної існуючої підземної інфраструктури інтегрується у відновлення, а не замінюється. Цей показник безпосередньо вимірює економічну ефективність підходу "повторне використання перш за все" та є еталоном для порівняння із традиційним відновленням.',
    'Chapter 2.1 Principle 3', 2
  ),

  nd('how-factory', C.HOW, 'Wrench', 2, 'how',
    'Factory Before Field', 'Завод до майданчика',
    'Off-site quality · on-site assembly · fewer trades',
    'Якість на заводі · монтаж на майданчику · менше спеціальностей',
    'Minimising on-site construction reduces cost, time, and quality variability. The pipeline is designed around off-site manufacturing and on-site assembly. The fewer trades on site simultaneously, the faster and safer the build. Factory production also enables parallel manufacturing: components for multiple buildings are produced simultaneously while site preparation proceeds.',
    'Мінімізація будівництва на майданчику знижує вартість, терміни та варіабельність якості. Конвеєр побудований навколо заводського виробництва та монтажу на майданчику. Чим менше спеціальностей одночасно на майданчику, тим швидше та безпечніше будівництво. Заводське виробництво дозволяє паралельне виготовлення.',
    'This principle directly addresses the speed-quality trade-off endemic to conventional reconstruction. By moving quality control to the factory level, the programme eliminates the variability inherent in on-site craftsmanship under time pressure. Components arrive pre-tested, pre-certified, and ready for assembly — compressing on-site time to weeks rather than months.',
    'Цей принцип безпосередньо вирішує компроміс між швидкістю та якістю, притаманний традиційному будівництву. Переносячи контроль якості на завод, програма усуває варіабельність майданчикових робіт під тиском часу. Компоненти надходять попередньо перевіреними та готовими до монтажу.',
    'Chapter 2.1 Principle 4', 3
  ),

  nd('how-open', C.HOW, 'Unlock', 2, 'how',
    'Openness Before Lock-In', 'Відкритість до прив\'язки',
    'Open standards · municipal data sovereignty · no monopoly',
    'Відкриті стандарти · суверенітет даних громади · без монополії',
    'The consortium is designed to be open to qualified participants. Standards are compatible with multiple suppliers. Municipality-owned data is not captive to any single provider. Open standards (CityGML, IFC, OCDS) ensure interoperability and prevent monopolistic capture of Ukraine\'s reconstruction infrastructure.',
    'Консорціум відкритий для кваліфікованих учасників. Стандарти сумісні з кількома постачальниками. Дані муніципалітету не є заручниками жодного провайдера. Відкриті стандарти (CityGML, IFC, OCDS) забезпечують інтероперабельність та запобігають монополістичному захопленню інфраструктури відновлення.',
    'Data governance is explicit: municipalities own all urban data generated through the process and can export it at any time in open formats. Data portability, clear retention policies, and no inter-municipality personal data sharing are structural guarantees. This directly aligns with EU values and the GDPR framework Ukraine has adopted.',
    'Врядування даними є чітким: муніципалітети є власниками всіх міських даних і можуть у будь-який час їх експортувати. Переносність даних, чіткі політики зберігання та відсутність обміну персональними даними між муніципалітетами — структурні гарантії. Це відповідає цінностям ЄС та GDPR.',
    'Chapter 2.1 Principle 6 / 4.6', 4
  ),

  nd('how-anticorruption', C.HOW, 'Shield', 2, 'how',
    'Anti-Corruption by Design', 'Антикорупційність за проєктом',
    'ProZorro · audit trails · multi-party sign-off',
    'ProZorro · аудитні сліди · багатостороннє підписання',
    'Anti-corruption is built into the architecture: all procurement is digital and auditable via ProZorro integration, all contracts published in OCDS format, every decision has a full audit trail (who made it, when, based on what inputs), multi-stakeholder sign-off prevents single-actor manipulation, and citizen endorsement empowers communities to monitor execution.',
    'Антикорупційність вбудована в архітектуру: вся закупівля цифрова та аудируєма через ProZorro, всі контракти публікуються у форматі OCDS, кожне рішення має повний аудитний слід, багатостороннє підписання запобігає маніпуляціям, а підтримка громади дозволяє контролювати виконання.',
    'Periodic independent audits, NABU/SAPO integration, EU audit rights for EU-funded elements, and civil society monitoring access complete the anti-corruption architecture. Transparency International and EU auditing bodies have identified corruption as the primary risk to Ukraine reconstruction funding — Spilno is designed from the ground up to address this.',
    'Регулярні незалежні аудити, інтеграція з НАБУ/САП, права аудиту ЄС для фінансованих ним елементів та доступ НУО до моніторингу завершують антикорупційну архітектуру. TI та аудиторські органи ЄС визначили корупцію як основний ризик для відновлення України — Спільно розроблено для вирішення цієї проблеми.',
    'Chapter 4.3', 5
  ),

  // ── DEPTH 2 — WHERE LEAVES ────────────────────────────────────────────────
  nd('where-now', C.WHERE, 'Compass', 2, 'where',
    'Phase 0 — Now', 'Фаза 0 — Зараз',
    'Consortium formation · tech ready · mayors engaged',
    'Формування консорціуму · технологія готова · мери залучені',
    'Phase 0 covers programme and consortium formation: founding members join, technical architecture is finalised, city conversations begin via warm network, EU Ukraine Facility pre-application is submitted, and HALO Trust/FSD initial engagement on demining timelines begins. AI engine validated on test data.',
    'Фаза 0 охоплює формування програми та консорціуму: приєднання членів-засновників, фіналізація технічної архітектури, початок переговорів із містами через теплу мережу, подання попередньої заявки до Механізму підтримки України ЄС та початок взаємодії з HALO Trust/FSD щодо розмінування.',
    'Pre-launch gate: at least 3 candidate cities at Stage 2 site assessment; 3 founding consortium member LOIs in active conversation; AI engine validated on test data from an analogous urban environment. Legal templates (MoU, consortium agreement, data processing agreement) finalised. Citizen dialogue platform UX research with IDP community members complete.',
    'Ворота передзапуску: щонайменше 3 міста-кандидати на Стадії 2; 3 LOI членів-засновників; рушій ШІ перевірений на тестових даних аналогічного міського середовища. Юридичні шаблони (меморандум, угода про консорціум, угода про обробку даних) фіналізовані. UX-дослідження платформи діалогу з громадянами завершено.',
    'Chapter 13.2 / 7.2', 0
  ),

  nd('where-2026', C.WHERE, 'MapPin', 2, 'where',
    'Phase 1 — 2026 Pilot', 'Фаза 1 — Пілот 2026',
    'One neighbourhood · digital twin · citizen dialogue',
    'Один мікрорайон · цифровий двійник · діалог з громадянами',
    'Phase 1 targets one neighbourhood in one Ukrainian city: a safe location, mixed building types, government buy-in, and sufficient pre-war photographic data. The AI reconstruction engine builds the digital twin (Month 3–9), the citizen dialogue platform goes live (Month 7), and a formally endorsed reconstruction plan is produced (Month 14).',
    'Фаза 1 охоплює один мікрорайон в одному українському місті: безпечне розташування, змішані типи будівель, підтримка уряду та достатня довоєнна фотодокументація. Рушій ШІ будує цифровий двійник (місяці 3–9), платформа діалогу запускається (місяць 7), а офіційно затверджений план відновлення виробляється до місяця 14.',
    'Pilot site selection criteria: currently outside active conflict zone, UXO-assessed or clearable within programme timeline, national government approval, local MoU signed, sufficient pre-war photographic data. Preferred: a neighbourhood within a mid-sized city (50k–500k population), 200–800 housing units, mix of residential and civic buildings, traceable community.',
    'Критерії відбору пілотної ділянки: поза активною зоною конфлікту, оцінена щодо ВОП, підтримка центрального уряду, підписаний місцевий меморандум, достатня фотодокументація. Ідеально: мікрорайон у середньому місті (50–500 тис. жит.), 200–800 житлових одиниць, змішана забудова, відстежувана громада.',
    'Chapter 7.2 / 13.4', 1
  ),

  nd('where-2027', C.WHERE, 'Users', 2, 'where',
    'Phase 2 — 2027 First Returns', 'Фаза 2 — 2027 Перші повернення',
    'Construction complete · families home · evidence base',
    'Будівництво завершено · родини вдома · доказова база',
    'Phase 2 delivers: pilot construction complete, first families back in rebuilt homes (Month 23 target), and a comprehensive evidence base capturing cost per m², speed, citizen satisfaction scores, and return rates. This is the proof point that unlocks national programme discussions.',
    'Фаза 2 доставляє: завершення пілотного будівництва, перші родини у відбудованих будинках (ціль: місяць 23) та комплексна доказова база: вартість/м², швидкість, задоволеність громадян та коефіцієнт повернення. Це доказова точка, що відкриває переговори про національну програму.',
    'The pilot success criteria: digital twin ≥80% accuracy (independent expert review), ≥40% of traceable pre-war residents participated in dialogue, endorsed plan reflects ≥70% of stated community preferences, completed structures within ≤110% of target budget, first residents in by Month 24, ≥50% of viable underground infrastructure reused.',
    'Критерії успіху пілоту: точність цифрового двійника ≥80% (незалежна експертиза), ≥40% відстежуваних довоєнних мешканців взяли участь у діалозі, план відображає ≥70% уподобань громади, будівлі в межах ≤110% бюджету, перші мешканці до місяця 24, ≥50% придатної підземної інфраструктури повторно використано.',
    'Chapter 7.5 / 13.4', 2
  ),

  nd('where-scale', C.WHERE, 'TrendingUp', 2, 'where',
    'Phase 3 — 2027–28 Multi-City', 'Фаза 3 — 2027–28 Масштабування',
    'Same pipeline · multiple cities · consortium grows',
    'Той самий конвеєр · кілька міст · консорціум зростає',
    'Phase 3 scales the proven pipeline to multiple cities simultaneously. The same specifications, the same certified suppliers, the same platform — applied to Sites 2, 3, 4, and beyond. Consortium suppliers scale production capacity. Ukrainian manufacturers are in certification process. Timeline per site: 14–18 months (vs 24 months for the pilot).',
    'Фаза 3 масштабує перевірений конвеєр на кілька міст одночасно. Ті самі специфікації, ті самі сертифіковані постачальники, та сама платформа — для Ділянок 2, 3, 4 і далі. Постачальники консорціуму нарощують виробничі потужності. Українські виробники проходять сертифікацію. Термін на ділянку: 14–18 місяців (проти 24 для пілоту).',
    'At multi-city scale, the RL loop in the AI engine has accumulated multiple validated reconstructions — significantly improving accuracy and speed. The facilitator network has been trained through the UCity Rebuild Academy. The component catalogue is mature and certified. The programme is presenting results at the Ukraine Recovery Conference.',
    'У масштабі кількох міст цикл RL рушія ШІ накопичив кілька перевірених реконструкцій — суттєво підвищуючи точність та швидкість. Мережа фасилітаторів пройшла навчання через Академію UCity Rebuild. Компонентний каталог зрілий та сертифікований. Програма представляє результати на Конференції з відновлення України.',
    'Chapter 8 / 13.8', 3
  ),

  nd('where-national', C.WHERE, 'Globe2', 2, 'where',
    'Phase 4 — 2028+ National Platform', 'Фаза 4 — 2028+ Національна платформа',
    'Spilno becomes Ukraine\'s standing reconstruction OS',
    'Спільно — постійна ОС відновлення України',
    'Phase 4 establishes Spilno as Ukraine\'s standing reconstruction infrastructure: open to any municipality and any hromada, integrated with MinRegion\'s national recovery framework, EU funding secured for scaled programme, and Ukrainian manufacturing supply chain at full capacity. The programme is also positioned for international licensing as a global model.',
    'Фаза 4 робить Спільно постійною інфраструктурою відновлення України: відкритою для будь-якого муніципалітету та громади, інтегрованою з національною програмою Мінрегіону, з забезпеченим фінансуванням ЄС та українським ланцюгом постачань на повній потужності. Програма також позиціонується для міжнародного ліцензування.',
    'At national scale, Spilno becomes a permanent city operating system for every participating municipality. The living digital twins serve as governance infrastructure for decades: maintenance management, energy optimisation, emergency preparedness, and future urban planning. Ukraine\'s reconstruction becomes a replicable, exportable model for post-conflict recovery globally.',
    'У національному масштабі Спільно стає постійною операційною системою міста для кожного муніципалітету-учасника. Живі цифрові двійники слугують інфраструктурою врядування десятиліттями: технічне обслуговування, оптимізація енергетики, підготовка до надзвичайних ситуацій та майбутнє міське планування.',
    'Chapter 13.8', 4
  ),
];

// ═══════════════════════════════════════════════════════════════════════════
// EDGES
// ═══════════════════════════════════════════════════════════════════════════

// Edge stroke colours by category
const EC = {
  CENTER:   '#fbbf24',
  WHY:      '#4a90e2',
  WHAT:     '#6366f1',
  REMEMBER: '#0ea5e9',
  COCREATE: '#22c55e',
  REBUILD:  '#f59e0b',
  WHO:      '#a855f7',
  HOW:      '#ec4899',
  WHERE:    '#06b6d4',
};

function edge(id: string, src: string, tgt: string, color: string): Edge {
  return {
    id, source: src, target: tgt,
    type: 'smoothstep',
    animated: true,
    style: { stroke: color, strokeWidth: 2 },
  };
}

export const INITIAL_EDGES: Edge[] = [
  // Center → branches
  edge('e-spilno-why',   'spilno', 'why',   EC.WHY),
  edge('e-spilno-what',  'spilno', 'what',  EC.WHAT),
  edge('e-spilno-who',   'spilno', 'who',   EC.WHO),
  edge('e-spilno-how',   'spilno', 'how',   EC.HOW),
  edge('e-spilno-where', 'spilno', 'where', EC.WHERE),

  // What → sub-branches
  edge('e-what-remember', 'what', 'remember', EC.REMEMBER),
  edge('e-what-cocreate', 'what', 'cocreate', EC.COCREATE),
  edge('e-what-rebuild',  'what', 'rebuild',  EC.REBUILD),

  // WHY leaves
  edge('e-why-scale',         'why', 'why-scale',         EC.WHY),
  edge('e-why-human',         'why', 'why-human',         EC.WHY),
  edge('e-why-fragmentation', 'why', 'why-fragmentation', EC.WHY),
  edge('e-why-memory',        'why', 'why-memory',        EC.WHY),
  edge('e-why-opportunity',   'why', 'why-opportunity',   EC.WHY),
  edge('e-why-window',        'why', 'why-window',        EC.WHY),

  // REMEMBER leaves
  edge('e-rem-twin',      'remember', 'rem-twin',      EC.REMEMBER),
  edge('e-rem-data',      'remember', 'rem-data',      EC.REMEMBER),
  edge('e-rem-valuation', 'remember', 'rem-valuation', EC.REMEMBER),
  edge('e-rem-scale',     'remember', 'rem-scale',     EC.REMEMBER),
  edge('e-rem-living',    'remember', 'rem-living',    EC.REMEMBER),

  // CO-CREATE leaves
  edge('e-co-explore',  'cocreate', 'co-explore',  EC.COCREATE),
  edge('e-co-evaluate', 'cocreate', 'co-evaluate', EC.COCREATE),
  edge('e-co-propose',  'cocreate', 'co-propose',  EC.COCREATE),
  edge('e-co-decide',   'cocreate', 'co-decide',   EC.COCREATE),
  edge('e-co-diia',     'cocreate', 'co-diia',     EC.COCREATE),

  // REBUILD leaves
  edge('e-reb-spec',      'rebuild', 'reb-spec',      EC.REBUILD),
  edge('e-reb-demining',  'rebuild', 'reb-demining',  EC.REBUILD),
  edge('e-reb-factory',   'rebuild', 'reb-factory',   EC.REBUILD),
  edge('e-reb-assembly',  'rebuild', 'reb-assembly',  EC.REBUILD),
  edge('e-reb-catalogue', 'rebuild', 'reb-catalogue', EC.REBUILD),
  edge('e-reb-handover',  'rebuild', 'reb-handover',  EC.REBUILD),

  // WHO leaves
  edge('e-who-ukraine',      'who', 'who-ukraine',      EC.WHO),
  edge('e-who-tech',         'who', 'who-tech',         EC.WHO),
  edge('e-who-construction', 'who', 'who-construction', EC.WHO),
  edge('e-who-finance',      'who', 'who-finance',      EC.WHO),
  edge('e-who-academic',     'who', 'who-academic',     EC.WHO),
  edge('e-who-orchestration','who', 'who-orchestration',EC.WHO),

  // HOW leaves
  edge('e-how-memory',         'how', 'how-memory',         EC.HOW),
  edge('e-how-citizens',       'how', 'how-citizens',       EC.HOW),
  edge('e-how-reuse',          'how', 'how-reuse',          EC.HOW),
  edge('e-how-factory',        'how', 'how-factory',        EC.HOW),
  edge('e-how-open',           'how', 'how-open',           EC.HOW),
  edge('e-how-anticorruption', 'how', 'how-anticorruption', EC.HOW),

  // WHERE leaves
  edge('e-where-now',      'where', 'where-now',      EC.WHERE),
  edge('e-where-2026',     'where', 'where-2026',     EC.WHERE),
  edge('e-where-2027',     'where', 'where-2027',     EC.WHERE),
  edge('e-where-scale',    'where', 'where-scale',    EC.WHERE),
  edge('e-where-national', 'where', 'where-national', EC.WHERE),
];

// ═══════════════════════════════════════════════════════════════════════════
// GEMINI SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════════════════════
export const SYSTEM_CONTEXT_PROMPT = `You are an expert advisor on the Spilno open reconstruction programme for Ukraine (also known as UCity Rebuild). Spilno is a three-pillar programme combining AI-powered digital twin reconstruction of pre-war cities, citizen co-design dialogue, and industrialised modular construction. The programme is designed to be open, anti-corruption by design, and EU-aligned. You help users understand the programme, its technology, governance, stakeholders, and timeline. Keep answers concise, factual, and relevant to urban reconstruction, EU standards, and consortium partnerships. Respond in the same language as the user's question.`;
