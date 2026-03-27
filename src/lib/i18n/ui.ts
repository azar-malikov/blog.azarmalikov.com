import type { Locale } from '@/lib/constants';

export type UiKey =
  | 'nav.home'
  | 'nav.blog'
  | 'nav.writeups'
  | 'nav.cheatsheets'
  | 'nav.checklists'
  | 'nav.glossary'
  | 'nav.notes'
  | 'nav.research'
  | 'nav.about'
  | 'nav.contact'
  | 'nav.search'
  | 'nav.archive'
  | 'nav.categories'
  | 'nav.tags'
  | 'nav.privacy'
  | 'nav.terms'
  | 'common.read'
  | 'common.continueReading'
  | 'common.continueStudying'
  | 'common.latest'
  | 'common.featured'
  | 'common.all'
  | 'common.filter'
  | 'common.copy'
  | 'common.copied'
  | 'common.minRead'
  | 'common.updated'
  | 'common.published'
  | 'common.related'
  | 'common.lineage'
  | 'common.usedIn'
  | 'common.translation'
  | 'common.staleTranslation'
  | 'common.sourceLang'
  | 'modes.reader'
  | 'modes.operator'
  | 'modes.study'
  | 'modes.density'
  | 'search.placeholder'
  | 'search.scopeAll'
  | 'search.open'
  | 'footer.rights'
  | 'footer.signature'
  | 'home.hero.kicker'
  | 'home.hero.title'
  | 'home.hero.lead'
  | 'home.strip.quote'
  | 'home.cta.title'
  | 'home.cta.body'
  | 'writeups.stages'
  | 'writeups.lab'
  | 'writeups.disclaimer'
  | 'glossary.term'
  | 'archive.byYear'
  | 'categories.title'
  | 'tags.title'
  | 'contact.formNote'
  | 'privacy.title'
  | 'terms.title'
  | '404.title'
  | '404.body'
  | 'studio.registry'
  | 'studio.corpus'
  | 'studio.viewModes'
  | 'home.masthead.index'
  | 'studio.snippets';

const en: Record<UiKey, string> = {
  'nav.home': 'Home',
  'nav.blog': 'Blog',
  'nav.writeups': 'Writeups',
  'nav.cheatsheets': 'Cheat sheets',
  'nav.checklists': 'Checklists',
  'nav.glossary': 'Glossary',
  'nav.notes': 'Notes for me',
  'nav.research': 'Research & ideas',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.search': 'Search',
  'nav.archive': 'Archive',
  'nav.categories': 'Categories',
  'nav.tags': 'Tags',
  'nav.privacy': 'Privacy',
  'nav.terms': 'Terms',
  'common.read': 'Read',
  'common.continueReading': 'Continue reading',
  'common.continueStudying': 'Continue studying',
  'common.latest': 'Latest',
  'common.featured': 'Featured',
  'common.all': 'All',
  'common.filter': 'Filter',
  'common.copy': 'Copy',
  'common.copied': 'Copied',
  'common.minRead': 'min read',
  'common.updated': 'Updated',
  'common.published': 'Published',
  'common.related': 'Related',
  'common.lineage': 'Content lineage',
  'common.usedIn': 'Used in',
  'common.translation': 'Translation',
  'common.staleTranslation': 'This translation may be older than the source.',
  'common.sourceLang': 'Source language',
  'modes.reader': 'Reader',
  'modes.operator': 'Operator',
  'modes.study': 'Study',
  'modes.density': 'Density',
  'search.placeholder': 'Search the knowledge base…',
  'search.scopeAll': 'All content',
  'search.open': 'Open search',
  'footer.rights': 'All rights reserved.',
  'footer.signature':
    'A personal knowledge studio—editorial systems, operator memory, multilingual publishing—wired together by design.',
  'home.hero.kicker': 'Knowledge studio',
  'home.hero.title': 'Rigor where narrative meets procedure.',
  'home.hero.lead':
    'Long-form analysis, lab writeups, and reusable operator notes—structured for study, not spectacle.',
  'home.strip.quote':
    'Security is a practice of attention: what you notice early determines what you can defend later.',
  'home.cta.title': 'Study with structure',
  'home.cta.body':
    'Move from narrative to procedure: writeups feed cheat sheets, glossary terms anchor language, checklists keep methodology honest.',
  'writeups.stages': 'Stages',
  'writeups.lab': 'Lab / target',
  'writeups.disclaimer': 'Ethics & scope',
  'glossary.term': 'Term',
  'archive.byYear': 'By year',
  'categories.title': 'Categories & topics',
  'tags.title': 'Tags',
  'contact.formNote': 'This form is a UI placeholder on static hosting; email works today.',
  'privacy.title': 'Privacy',
  'terms.title': 'Terms',
  '404.title': 'This route is not mapped',
  '404.body': 'The page may have moved, or the link may be stale. Try search or the archive.',
  'studio.registry': 'Registry',
  'studio.corpus': 'Corpus · this locale',
  'studio.viewModes': 'View modes',
  'home.masthead.index': 'Index',
  'studio.snippets': 'Snippets'
};

const az: Record<UiKey, string> = {
  'nav.home': 'Ana səhifə',
  'nav.blog': 'Blog',
  'nav.writeups': 'Writeup-lar',
  'nav.cheatsheets': 'Cheat sheet-lər',
  'nav.checklists': 'Yoxlama siyahıları',
  'nav.glossary': 'Lüğət',
  'nav.notes': 'Şəxsi qeydlər',
  'nav.research': 'Tədqiqat və ideyalar',
  'nav.about': 'Haqqımda',
  'nav.contact': 'Əlaqə',
  'nav.search': 'Axtarış',
  'nav.archive': 'Arxiv',
  'nav.categories': 'Kateqoriyalar',
  'nav.tags': 'Teqlər',
  'nav.privacy': 'Məxfilik',
  'nav.terms': 'Şərtlər',
  'common.read': 'Oxu',
  'common.continueReading': 'Oxumağa davam et',
  'common.continueStudying': 'Öyrənməyə davam et',
  'common.latest': 'Ən son',
  'common.featured': 'Seçilmiş',
  'common.all': 'Hamısı',
  'common.filter': 'Filtr',
  'common.copy': 'Kopyala',
  'common.copied': 'Kopyalandı',
  'common.minRead': 'dəq oxu',
  'common.updated': 'Yeniləndi',
  'common.published': 'Dərc',
  'common.related': 'Əlaqəli',
  'common.lineage': 'Məzmun xətti',
  'common.usedIn': 'İstifadə olundu',
  'common.translation': 'Tərcümə',
  'common.staleTranslation': 'Bu tərcümə mənbədən köhnə ola bilər.',
  'common.sourceLang': 'Mənbə dil',
  'modes.reader': 'Oxucu',
  'modes.operator': 'Operator',
  'modes.study': 'Tədris',
  'modes.density': 'Sıxlıq',
  'search.placeholder': 'Bilik bazasında axtar…',
  'search.scopeAll': 'Bütün məzmun',
  'search.open': 'Axtarışı aç',
  'footer.rights': 'Bütün hüquqlar qorunur.',
  'footer.signature':
    'Şəxsi bilik studiyası—redaksiya qurğuları, operator yaddaşı, çoxdilli nəşr—bir sistem kimi birləşdirilib.',
  'home.hero.kicker': 'Bilik studiyası',
  'home.hero.title': 'Ofensiv təhlükəsizlik üçün sakit intizam.',
  'home.hero.lead':
    'Uzun analizlər, laboratoriya writeup-ları və təkrar istifadə olunan operator qeydləri—tamaşa üçün deyil, tədris üçün qurulub.',
  'home.strip.quote':
    'Təhlükəsizlik diqqət praktikasıdır: tez nə görürsünüz, sonradan nəyi müdafiə edə biləcəyinizi müəyyən edir.',
  'home.cta.title': 'Strukturla öyrənin',
  'home.cta.body':
    'Narrativdən prosedura keçin: writeup-lar cheat sheet-ləri qidalandırır, lüğət terminləri dilə dayaq olur.',
  'writeups.stages': 'Mərhələlər',
  'writeups.lab': 'Lab / hədəf',
  'writeups.disclaimer': 'Etika və çərçivə',
  'glossary.term': 'Termin',
  'archive.byYear': 'İllərə görə',
  'categories.title': 'Kateqoriyalar və mövzular',
  'tags.title': 'Teqlər',
  'contact.formNote': 'Statik hostinqdə forma UI placeholder-dir; email işləyir.',
  'privacy.title': 'Məxfilik',
  'terms.title': 'Şərtlər',
  '404.title': 'Bu marşrut xəritələnməyib',
  '404.body': 'Səhifə köçürülüb və ya link köhnəlib. Axtarış və ya arxivi yoxlayın.',
  'studio.registry': 'Reyestr',
  'studio.corpus': 'Korpus · bu dil',
  'studio.viewModes': 'Görüş rejimləri',
  'home.masthead.index': 'İndeks',
  'studio.snippets': 'Snippets'
};

const tr: Record<UiKey, string> = {
  'nav.home': 'Ana sayfa',
  'nav.blog': 'Blog',
  'nav.writeups': 'Writeup’lar',
  'nav.cheatsheets': 'Cheat sheet’ler',
  'nav.checklists': 'Kontrol listeleri',
  'nav.glossary': 'Sözlük',
  'nav.notes': 'Bana notlar',
  'nav.research': 'Araştırma ve fikirler',
  'nav.about': 'Hakkımda',
  'nav.contact': 'İletişim',
  'nav.search': 'Arama',
  'nav.archive': 'Arşiv',
  'nav.categories': 'Kategoriler',
  'nav.tags': 'Etiketler',
  'nav.privacy': 'Gizlilik',
  'nav.terms': 'Şartlar',
  'common.read': 'Oku',
  'common.continueReading': 'Okumaya devam',
  'common.continueStudying': 'Çalışmaya devam',
  'common.latest': 'Son',
  'common.featured': 'Öne çıkan',
  'common.all': 'Tümü',
  'common.filter': 'Filtre',
  'common.copy': 'Kopyala',
  'common.copied': 'Kopyalandı',
  'common.minRead': 'dk okuma',
  'common.updated': 'Güncellendi',
  'common.published': 'Yayın',
  'common.related': 'İlgili',
  'common.lineage': 'İçerik soy ağacı',
  'common.usedIn': 'Kullanıldığı yer',
  'common.translation': 'Çeviri',
  'common.staleTranslation': 'Bu çeviri kaynaktan daha eski olabilir.',
  'common.sourceLang': 'Kaynak dil',
  'modes.reader': 'Okuyucu',
  'modes.operator': 'Operatör',
  'modes.study': 'Çalışma',
  'modes.density': 'Yoğunluk',
  'search.placeholder': 'Bilgi tabanında ara…',
  'search.scopeAll': 'Tüm içerik',
  'search.open': 'Aramayı aç',
  'footer.rights': 'Tüm hakları saklıdır.',
  'footer.signature':
    'Kişisel bilgi stüdyosu—editoryal düzen, operatör belleği, çok dilli yayıncılık—tasarımla birbirine bağlı.',
  'home.hero.kicker': 'Bilgi stüdyosu',
  'home.hero.title': 'Sakin disiplin, ofansif güvenlik zanaatı için.',
  'home.hero.lead':
    'Uzun analizler, lab writeup’ları ve yeniden kullanılabilir operatör notları—gösteri için değil, çalışma için yapılandırıldı.',
  'home.strip.quote':
    'Güvenlik bir dikkat pratiğidir: erken neyi fark ettiğiniz, sonra neyi savunabileceğinizi belirler.',
  'home.cta.title': 'Yapı ile çalışın',
  'home.cta.body':
    'Öyküden prosedüre geçin: writeup’lar cheat sheet’leri besler, sözlük terimleri dili sabitler.',
  'writeups.stages': 'Aşamalar',
  'writeups.lab': 'Lab / hedef',
  'writeups.disclaimer': 'Etik ve kapsam',
  'glossary.term': 'Terim',
  'archive.byYear': 'Yıla göre',
  'categories.title': 'Kategoriler ve konular',
  'tags.title': 'Etiketler',
  'contact.formNote': 'Bu form statik barındırmada UI yer tutucusudur; e-posta çalışır.',
  'privacy.title': 'Gizlilik',
  'terms.title': 'Şartlar',
  '404.title': 'Bu rota eşlenmedi',
  '404.body': 'Sayfa taşınmış veya bağlantı bayatlamış olabilir. Arama veya arşivi deneyin.',
  'studio.registry': 'Kayıt',
  'studio.corpus': 'Korpus · bu dil',
  'studio.viewModes': 'Görünüm modları',
  'home.masthead.index': 'İndeks',
  'studio.snippets': 'Snippets'
};

const ru: Record<UiKey, string> = {
  ...en,
  'nav.home': 'Главная',
  'nav.blog': 'Блог',
  'nav.writeups': 'Разборы',
  'nav.cheatsheets': 'Шпаргалки',
  'nav.checklists': 'Чек-листы',
  'nav.glossary': 'Глоссарий',
  'nav.notes': 'Заметки для себя',
  'nav.research': 'Исследования',
  'nav.about': 'Обо мне',
  'nav.contact': 'Контакты',
  'nav.search': 'Поиск',
  'nav.archive': 'Архив',
  'nav.categories': 'Категории',
  'nav.tags': 'Теги',
  'nav.privacy': 'Конфиденциальность',
  'nav.terms': 'Условия',
  'search.placeholder': 'Поиск по базе знаний…',
  'footer.signature':
    'Персональная студия знаний: редакционные системы, операторская память, многоязычная публикация — связаны архитектурно.',
  'home.hero.kicker': 'Персональная платформа знаний',
  'home.hero.title': 'Спокойная строгость для offensive security.',
  '404.title': 'Маршрут не найден',
  '404.body': 'Страница могла переехать. Попробуйте поиск или архив.',
  'studio.registry': 'Реестр',
  'studio.corpus': 'Корпус · эта локаль',
  'studio.viewModes': 'Режимы просмотра',
  'home.masthead.index': 'Индекс',
  'studio.snippets': 'Сниппеты'
};

const bundles: Record<Locale, Record<UiKey, string>> = {
  en,
  az,
  tr,
  ru
};

export function t(locale: Locale, key: UiKey): string {
  return bundles[locale][key] ?? bundles.en[key] ?? key;
}
