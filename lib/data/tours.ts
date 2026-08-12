import { SupportedLocale } from '@/lib/i18n/config';

export interface TourProgram {
  id: string;
  slug: string;
  type: 'egypt' | 'international';
  title: Record<SupportedLocale, string>;
  summary: Record<SupportedLocale, string>;
  overview: Record<SupportedLocale, string>;
  duration: Record<SupportedLocale, string>;
  destinations: Record<SupportedLocale, string[]>;
  imageSrc: string;
  imageAlt: Record<SupportedLocale, string>;
  itinerary: Array<{
    day: number;
    title: Record<SupportedLocale, string>;
    description: Record<SupportedLocale, string>;
  }>;
  included: Record<SupportedLocale, string[]>;
  excluded: Record<SupportedLocale, string[]>;
  importantInfo?: Record<SupportedLocale, string[]>;
}

export const FEATURED_EGYPT_TOURS: TourProgram[] = [
  {
    id: 'cairo-classic',
    slug: 'cairo-classic',
    type: 'egypt',
    title: { ar: 'برنامج سحر القاهرة الكلاسيكي', en: 'Classic Cairo Discovery' },
    summary: {
      ar: 'جولة سياحية شاملة تكتشف من خلالها أهرامات الجيزة، متحف الحضارة، خان الخليلي والمتحف المصري.',
      en: 'A classic tour exploring the Giza Pyramids, Grand Egyptian Museum, Khan El Khalili, and Old Cairo.',
    },
    overview: {
      ar: 'برنامج متميز يستعرض أعرق المعالم التاريخية بالقاهرة والجيزة مع زيارة المعالم الفرعونية والإسلامية والقبطية.',
      en: 'An immersive tour showcasing Cairo’s ancient monuments, Pharaonic wonders, and rich Islamic and Coptic heritage.',
    },
    duration: { ar: '4 أيام / 3 ليالي', en: '4 Days / 3 Nights' },
    destinations: {
      ar: ['القاهرة', 'الجيزة'],
      en: ['Cairo', 'Giza'],
    },
    imageSrc: '/assets/references/cairo-classic.jpg',
    imageAlt: { ar: 'أهرامات الجيزة والقاهرة', en: 'Giza Pyramids and Cairo Skyline' },
    itinerary: [
      {
        day: 1,
        title: { ar: 'الوصول والاستقبال', en: 'Arrival & Hotel Check-in' },
        description: {
          ar: 'الاستقبال في مطار القاهرة الدولي والانتقال للفندق للتسكين والاستراحة.',
          en: 'Meet and assist at Cairo International Airport followed by private transfer to hotel.',
        },
      },
      {
        day: 2,
        title: { ar: 'أهرامات الجيزة والمتحف المصري', en: 'Giza Pyramids & Egyptian Museum' },
        description: {
          ar: 'زيارة أهرامات الجيزة وأبو الهول، ثم زيارة المتحف المصري بالتحرير وغداء بمطعم مطل على النيل.',
          en: 'Visit the Giza Pyramids, Great Sphinx, and the Egyptian Museum in Tahrir.',
        },
      },
      {
        day: 3,
        title: { ar: 'القاهرة المعزية وخان الخليلي', en: 'Old Cairo & Khan El Khalili' },
        description: {
          ar: 'جولة في قلعة صلاح الدين، الكنيسة المعلقة، وشارع المعز وخان الخليلي للشراء والتمتع بالأجواء.',
          en: 'Explore the Saladin Citadel, Hanging Church, El Moez Street, and Khan El Khalili Bazaar.',
        },
      },
      {
        day: 4,
        title: { ar: 'المغادرة النهائية', en: 'Final Departure' },
        description: {
          ar: 'الإفطار بالفندق والانتقال إلى مطار القاهرة للعودة سالمين.',
          en: 'Breakfast at hotel and private transfer to Cairo International Airport for final departure.',
        },
      },
    ],
    included: {
      ar: [
        'الإقامة في فندق 4 أو 5 نجوم بالإفطار',
        'الانتقالات بسيارات حديثة مكيفة',
        'مرشد سياحي متخصص خلال الجولات',
        'تذاكر دخول المعالم المذكورة',
      ],
      en: [
        'Accommodation in 4 or 5-star hotel with daily breakfast',
        'Private transfers in modern air-conditioned vehicle',
        'Professional licensed tour guide',
        'Entrance fees to specified sights',
      ],
    },
    excluded: {
      ar: [
        'تذاكر الطيران الدولي',
        'المصروفات الشخصية والإكراميات',
        'المشروبات والوجبات غير المذكورة',
      ],
      en: [
        'International flight tickets',
        'Personal expenses and gratuities',
        'Meals and beverages not specified',
      ],
    },
  },
  {
    id: 'cairo-alexandria',
    slug: 'cairo-alexandria',
    type: 'egypt',
    title: { ar: 'رحلة القاهرة والإسكندرية عروس البحر', en: 'Cairo & Alexandria Experience' },
    summary: {
      ar: 'برنامج ساحر يجمع بين عظمة أهرامات القاهرة وسحر ساحل الإسكندرية ومكتبتها الشهيرة.',
      en: 'Combine the historic wonders of Cairo with the Mediterranean charm of Alexandria.',
    },
    overview: {
      ar: 'رحلة متكاملة عبر أهم مدينتين في مصر للاستمتاع بالحضارة الفرعونية والجمال الساحلي الأبيض المتوسط.',
      en: 'A dual-city journey discovering ancient Egyptian monuments alongside Mediterranean heritage in Alexandria.',
    },
    duration: { ar: '6 أيام / 5 ليالي', en: '6 Days / 5 Nights' },
    destinations: {
      ar: ['القاهرة', 'الجيزة', 'الإسكندرية'],
      en: ['Cairo', 'Giza', 'Alexandria'],
    },
    imageSrc: '/assets/references/cairo-alexandria.jpg',
    imageAlt: { ar: 'قلعة قايتباي والأهرامات', en: 'Citadel of Qaitbay and Pyramids' },
    itinerary: [
      {
        day: 1,
        title: { ar: 'الوصول للقاهرة', en: 'Arrival in Cairo' },
        description: { ar: 'الاستقبال والانتقال للفندق بالقاهرة.', en: 'Arrival and private transfer to Cairo hotel.' },
      },
      {
        day: 2,
        title: { ar: 'الأهرامات وسقارة', en: 'Pyramids & Saqqara' },
        description: { ar: 'زيارة أهرامات الجيزة وهرم سقارة المدرج.', en: 'Tour the Giza Plateau and the Step Pyramid of Saqqara.' },
      },
      {
        day: 3,
        title: { ar: 'الانتقال إلى الإسكندرية', en: 'Transfer to Alexandria' },
        description: { ar: 'التحرك للإسكندرية وزيارة قلعة قايتباي ومكتبة الإسكندرية.', en: 'Drive to Alexandria; visit Qaitbay Citadel and Bibliotheca Alexandrina.' },
      },
      {
        day: 4,
        title: { ar: 'حدائق المنتزه والعودة للقاهرة', en: 'Montaza Gardens & Return' },
        description: { ar: 'زيارة حدائق المنتزه والمسرح الروماني والعودة للقاهرة.', en: 'Explore Montaza Palace Gardens and Roman Amphitheatre before returning to Cairo.' },
      },
      {
        day: 5,
        title: { ar: 'القاهرة الإسلامية والقبطية', en: 'Historic Cairo' },
        description: { ar: 'جولة بالمعز والقلعة والكنائس القديمة.', en: 'Full-day tour of Old Cairo, Citadel, and historic mosques.' },
      },
      {
        day: 6,
        title: { ar: 'المغادرة', en: 'Departure' },
        description: { ar: 'الانتقال للمطار للعودة.', en: 'Transfer to airport for departure.' },
      },
    ],
    included: {
      ar: ['إقامة بالفنادق بالإفطار', 'جميع الانتقالات والجولات', 'مرشد سياحي'],
      en: ['Hotel accommodation with breakfast', 'All transfers & tours', 'Expert guide'],
    },
    excluded: {
      ar: ['الطيران الدولي', 'المصروفات الشخصية'],
      en: ['International flights', 'Personal expenses'],
    },
  },
  {
    id: 'nile-cruise-luxor-aswan',
    slug: 'nile-cruise-luxor-aswan',
    type: 'egypt',
    title: { ar: 'رحلة نايل كروز الأقصر وأسوان', en: 'Nile Cruise Luxor & Aswan' },
    summary: {
      ar: 'إبحار فاخر عبر نهر النيل لزيارة معابد الكرنك، الأقصر، إدفو، كوم أمبو، وفيلة.',
      en: 'A luxurious Nile River cruise visiting Karnak, Luxor Temple, Edfu, Kom Ombo, and Philae.',
    },
    overview: {
      ar: 'تجربة سياحية فريدة على متن عائمة نيلية بين الأقصر وأسوان للاستمتاع بأكبر متحف مفتوح في العالم.',
      en: 'Sail along the legendary Nile aboard a full-board cruise vessel between Luxor and Aswan.',
    },
    duration: { ar: '5 أيام / 4 ليالي', en: '5 Days / 4 Nights' },
    destinations: {
      ar: ['الأقصر', 'إدفو', 'كوم أمبو', 'أسوان'],
      en: ['Luxor', 'Edfu', 'Kom Ombo', 'Aswan'],
    },
    imageSrc: '/assets/references/nile-cruise.jpg',
    imageAlt: { ar: 'نايل كروز ومعبد الأقصر', en: 'Nile Cruise and Luxor Temple' },
    itinerary: [
      {
        day: 1,
        title: { ar: 'التسكين بالأقصر ومعابد البر الشرقي', en: 'Embarkation in Luxor & East Bank' },
        description: { ar: 'الوصول للأقصر والتسكين بالنايل كروز وزيارة معبد الكرنك ومعبد الأقصر.', en: 'Board Nile Cruise in Luxor; visit Karnak and Luxor Temples.' },
      },
      {
        day: 2,
        title: { ar: 'البر الغربي والإبحار إلى إدفو', en: 'West Bank & Sail to Edfu' },
        description: { ar: 'زيارة وادي الملوك ومعبد حتشبسوت وتمثالي ممنون والإبحار لإدفو.', en: 'Visit Valley of the Kings, Hatshepsut Temple, and Colossi of Memnon; sail to Edfu.' },
      },
      {
        day: 3,
        title: { ar: 'إدفو وكوم أمبو والإبحار لأسوان', en: 'Edfu, Kom Ombo & Sail to Aswan' },
        description: { ar: 'زيارة معبد حورس بإدفو ومعبد كوم أمبو والإبحار لأسوان.', en: 'Visit Edfu Temple and Kom Ombo Temple; sail to Aswan.' },
      },
      {
        day: 4,
        title: { ar: 'معالم أسوان الساحرة', en: 'Aswan Highlights' },
        description: { ar: 'زيارة السد العالي ومعبد فيلة والمسلة الناقصة وركوب الفلوكة.', en: 'Visit High Dam, Philae Temple, and Unfinished Obelisk.' },
      },
      {
        day: 5,
        title: { ar: 'المغادرة من أسوان', en: 'Disembarkation & Departure' },
        description: { ar: 'الإفطار والانتقال لمطار أسوان.', en: 'Breakfast and transfer to Aswan Airport.' },
      },
    ],
    included: {
      ar: ['الإقامة الكاملة بالنايل كروز (إفطار، غداء، عشاء)', 'جولات المعابد والمزارات المذكورة', 'مرشد سياحي'],
      en: ['Full board accommodation on Nile Cruise', 'Guided temple visits & tours', 'Licensed guide'],
    },
    excluded: {
      ar: ['تذاكر الطيران الداخلي والخارجي', 'المشروبات والإكراميات'],
      en: ['Domestic and international flights', 'Drinks and tips'],
    },
  },
  {
    id: 'hurghada-sharm',
    slug: 'hurghada-sharm',
    type: 'egypt',
    title: { ar: 'الغردقة وشرم الشيخ', en: 'Hurghada & Sharm El Sheikh' },
    summary: {
      ar: 'برنامج شاطئي استوائي ممتع يجمع بين سحر منتجعات شرم الشيخ والشعب المرجانية بالغردقة.',
      en: 'A thrilling Red Sea getaway combining luxury beach resorts in Sharm El Sheikh and Hurghada.',
    },
    overview: {
      ar: 'استمتع بأفضل شواطئ البحر الأحمر والأنشطة البحرية والغوص في رحلة تجمع بين الغردقة وشرم الشيخ.',
      en: 'Experience top Red Sea beaches, coral reefs, and water sports combining Hurghada and Sharm El Sheikh.',
    },
    duration: { ar: '6 أيام / 5 ليالي', en: '6 Days / 5 Nights' },
    destinations: {
      ar: ['الغردقة', 'شرم الشيخ'],
      en: ['Hurghada', 'Sharm El Sheikh'],
    },
    imageSrc: '/images/site-update/tours/egypt-tour-hurghada-sharm.webp',
    imageAlt: { ar: 'منتجعات الغردقة وشرم الشيخ', en: 'Hurghada and Sharm El Sheikh Resorts' },
    itinerary: [
      {
        day: 1,
        title: { ar: 'الوصول والاستقبال', en: 'Arrival & Check-in' },
        description: { ar: 'الوصول والتسكين في منتجع شاطئي فاخر.', en: 'Arrival and transfer to luxury beach resort.' },
      },
      {
        day: 2,
        title: { ar: 'رحلة باخرة وشعب مرجانية', en: 'Boat Trip & Coral Reef Snorkeling' },
        description: { ar: 'رحلة بحرية لمحمية رأس محمد والسباحة بين الشعب المرجانية.', en: 'Full-day boat trip to Ras Mohammed National Park for snorkeling.' },
      },
      {
        day: 3,
        title: { ar: 'سفاري ورياضات مائية', en: 'Desert Safari & Water Sports' },
        description: { ar: 'سفاري بالبيتش باجي وعشاء بدوي وشاي بدوي الجبل.', en: 'Quad bike desert safari with traditional Bedouin dinner.' },
      },
      {
        day: 4,
        title: { ar: 'الاسترخاء والتسوق', en: 'Relaxation & Shopping' },
        description: { ar: 'جولة بخليج نعمة أو المارينا لشراء الهدايا والاستمتاع بالمطاعم.', en: 'Leisure day at Naama Bay or Hurghada Marina.' },
      },
      {
        day: 5,
        title: { ar: 'يوم شاطئي حر', en: 'Beach & Watersports Day' },
        description: { ar: 'يوم استرخاء حر على شواطئ البحر الأحمر.', en: 'Free leisure day to enjoy beach facilities and water activities.' },
      },
      {
        day: 6,
        title: { ar: 'المغادرة', en: 'Departure' },
        description: { ar: 'الإفطار والانتقال للمطار للعودة.', en: 'Breakfast and private transfer to airport.' },
      },
    ],
    included: {
      ar: ['الإقامة بالمنتجع الشاطئي شاملة الإفطار والعشاء', 'الانتقالات بسيارات حديثة', 'رحلة البحر والسفاري'],
      en: ['Resort accommodation with half board', 'Private transfers', 'Boat snorkeling trip & safari'],
    },
    excluded: {
      ar: ['الطيران الداخلي أو الخارجي', 'المصروفات الشخصية'],
      en: ['Flights', 'Personal expenses'],
    },
  },
];

export const INTERNATIONAL_TOURS: TourProgram[] = [
  {
    id: 'dubai-highlights',
    slug: 'dubai-highlights',
    type: 'international',
    title: { ar: 'برنامج سحر دبي والإمارات', en: 'Dubai Highlights & Desert Safari' },
    summary: {
      ar: 'رحلة ممتعة تشمل برج خليفة، دبي مول، السفاري الصحراوي ورحلة اليخت.',
      en: 'An exciting getaway featuring Burj Khalifa, Dubai Mall, Desert Safari, and Marina Cruise.',
    },
    overview: {
      ar: 'برنامج دولي رائع للاستمتاع بأحدث المدن العالمية وجمال الصحراء العربية.',
      en: 'A premier international tour experiencing modern architecture and Arabian desert hospitality.',
    },
    duration: { ar: '5 أيام / 4 ليالي', en: '5 Days / 4 Nights' },
    destinations: { ar: ['دبي', 'الإمارات'], en: ['Dubai', 'UAE'] },
    imageSrc: '/assets/references/dubai-highlights.jpg',
    imageAlt: { ar: 'برج خليفة ودبي', en: 'Burj Khalifa Dubai' },
    itinerary: [
      {
        day: 1,
        title: { ar: 'الوصول لدبي', en: 'Arrival in Dubai' },
        description: { ar: 'الاستقبال بالمطار والانتقال للفندق.', en: 'Arrival and transfer to hotel.' },
      },
      {
        day: 2,
        title: { ar: 'جولة دبي وبرج خليفة', en: 'Dubai City Tour & Burj Khalifa' },
        description: { ar: 'زيارة دبي القديمة ودبي مول وصعود برج خليفة.', en: 'City tour covering Old Dubai, Dubai Mall, and Burj Khalifa.' },
      },
      {
        day: 3,
        title: { ar: 'سفاري صحراوي وعشاء', en: 'Desert Safari & BBQ Dinner' },
        description: { ar: 'رحلة سفاري بالدفع الرباعي وعشاء في المخيم الصحراوي.', en: '4x4 dune bashing safari with traditional BBQ dinner camp.' },
      },
      {
        day: 4,
        title: { ar: 'يوم حر وتأجير يخت', en: 'Leisure Day & Marina Cruise' },
        description: { ar: 'يوم حر للتسوق وجولة عشاء على يخت دبي مارينا.', en: 'Free day for shopping and evening Marina dhow dinner cruise.' },
      },
      {
        day: 5,
        title: { ar: 'العودة', en: 'Departure' },
        description: { ar: 'الانتقال للمطار للعودة.', en: 'Transfer to Dubai Airport.' },
      },
    ],
    included: {
      ar: ['الإقامة بفندق 4 نجوم مع الإفطار', 'السفاري ورحلة اليخت', 'الانتقالات من وإلى المطار'],
      en: ['4-star hotel accommodation with breakfast', 'Desert safari & Marina cruise', 'Airport transfers'],
    },
    excluded: {
      ar: ['رسوم التأشيرة إذا لزم الأمر', 'تذاكر الطيران الدولي'],
      en: ['Visa fees if required', 'International flights'],
    },
  },
  {
    id: 'istanbul-week',
    slug: 'istanbul-week',
    type: 'international',
    title: { ar: 'أسبوع في إسطنبول', en: 'One Week in Istanbul' },
    summary: {
      ar: 'برنامج سياحي رائع لمدة أسبوع لاستكشاف معالم إسطنبول التاريخية والبوسفور والتسوق.',
      en: 'A delightful 7-day tour exploring historic Istanbul, Bosphorus cruises, and bazaars.',
    },
    overview: {
      ar: 'استمتع بأسبوع كامل في عاصمة التاريخ إسطنبول لزيارة آيا صوفيا والمسجد الأزرق ورحلة البوسفور.',
      en: 'Spend a full week exploring the majestic history of Istanbul, Hagia Sophia, Blue Mosque, and Bosphorus.',
    },
    duration: { ar: '7 أيام / 6 ليالي', en: '7 Days / 6 Nights' },
    destinations: { ar: ['إسطنبول'], en: ['Istanbul'] },
    imageSrc: '/images/site-update/tours/international-tour-istanbul-week.webp',
    imageAlt: { ar: 'معالم إسطنبول والبوسفور', en: 'Istanbul Skyline and Bosphorus' },
    itinerary: [
      {
        day: 1,
        title: { ar: 'الوصول لإسطنبول', en: 'Arrival in Istanbul' },
        description: { ar: 'الاستقبال في مطار إسطنبول والانتقال للفندق.', en: 'Meet and assist at Istanbul airport and transfer to hotel.' },
      },
      {
        day: 2,
        title: { ar: 'السلطان أحمد وآيا صوفيا', en: 'Sultanahmet & Hagia Sophia' },
        description: { ar: 'جولة بالبلدة القديمة، المسجد الأزرق، آيا صوفيا وقصر توبكابي.', en: 'Old city tour covering Hagia Sophia, Blue Mosque, and Topkapi Palace.' },
      },
      {
        day: 3,
        title: { ar: 'جولة البوسفور البانورامية', en: 'Bosphorus Cruise & Asian Side' },
        description: { ar: 'رحلة بحرية بالبوسفور وتل العرائس وجسر البوسفور.', en: 'Bosphorus boat tour, Camlica Hill, and Asian continent crossing.' },
      },
      {
        day: 4,
        title: { ar: 'جزيرة الأميرات', en: 'Princes’ Islands Excursion' },
        description: { ar: 'رحلة بالعبارة لجزيرة بويوك أدا للاستمتاع بالطبيعة والهدوء.', en: 'Ferry trip to Buyukada island with lunch and electric carriage tour.' },
      },
      {
        day: 5,
        title: { ar: 'ميدان تقسيم والتسوق', en: 'Taksim Square & Shopping' },
        description: { ar: 'جولة بشارع الاستقلال وجراند بازار والسوق المصري.', en: 'Istiklal Street, Grand Bazaar, and Spice Market shopping.' },
      },
      {
        day: 6,
        title: { ar: 'يوم حر للراحة والتسوق', en: 'Leisure Day' },
        description: { ar: 'يوم حر للتنزه والتسوق الذاتي بأسواق إسطنبول.', en: 'Free day for shopping and personal exploration.' },
      },
      {
        day: 7,
        title: { ar: 'المغادرة', en: 'Departure' },
        description: { ar: 'الإفطار والانتقال لمطار إسطنبول للعودة.', en: 'Breakfast and private transfer to airport.' },
      },
    ],
    included: {
      ar: ['الإقامة بفندق 4 نجوم مع الإفطار', 'جولة البوسفور وجزيرة الأميرات', 'الانتقالات من وإلى المطار'],
      en: ['4-star hotel accommodation with breakfast', 'Bosphorus cruise & Princes’ Islands trip', 'Airport transfers'],
    },
    excluded: {
      ar: ['تأشيرة تركيا إذا لزم الأمر', 'تذاكر الطيران الدولي'],
      en: ['Turkey visa if required', 'International flights'],
    },
  },
];
