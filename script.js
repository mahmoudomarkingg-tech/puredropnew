    // ==================== ENHANCED PRODUCTS DATA ====================
    const REFILL_PRODUCT_ID = 21;

    let products = [
      {
        id: 21,
        name: "تعبئة قارورة مياه شامل التوصيل",
        nameEn: "Bottle Refill with Delivery",
        description: "تعبئة قارورة مياه مع التوصيل — السعر 1 دينار أو كابون خارجي واحد من دفترك الرقمي",
        fullDescription: "خدمة تعبئة قارورة المياه مع التوصيل. ادفع ديناراً واحداً أو استخدم كابوناً خارجياً واحداً عبر رقم دفترك الرقمي. يُخصم الكابون بعد تأكيد التسليم من الإدارة.",
        price: 1.00,
        category: "bottle",
        emoji: "💧",
        image: "images/bottle-saudi-18l.png",
        options: null,
        badge: "تعبئة + توصيل",
        specs: {
          volume: "تعبئة قارورة قياسية",
          material: "خدمة تعبئة وتوصيل",
          shelfLife: "عند الطلب",
          storage: "يُفضّل استلام القارورة فور الوصول",
          certifications: ["المؤسسة العامة للغذاء والدواء الأردنية"]
        },
        usageTips: [
          "1 دينار أو كابون خارجي واحد",
          "أدخل رقم الدفتر عند الدفع بالكوبون",
          "الخصم بعد التسليم فقط",
          "احتفظ برقم الدفتر"
        ]
      },
      {
        id: 1,
        name: "كرتونة مياه 250 مل",
        nameEn: "Carton Water 250ml",
        description: "40 كاسة ورقية مع غطاء محكم × 250 مل - مثالية للمناسبات والرحلات والاجتماعات",
        fullDescription: "كرتونة مياه نقية معبأة في أكواب ورقية صديقة للبيئة مع أغطية محكمة الإغلاق. مثالية للمناسبات الاجتماعية، الرحلات، المؤتمرات، والمدارس. كل كوب معبأ بمياه نقية 99.97% بعد 7 مراحل تنقية.",
        price: 1.50,
        basePrice: 1.25,
        chilledPrice: 1.50,
        category: "carton",
        emoji: "🥤",
        image: "images/carton-250.jfif",
        options: [
          { id: "normal", label: "عادية 🌡️", price: 1.25, description: "بدرجة حرارة الغرفة، مناسبة للتخزين الطويل", isDefault: true },
          { id: "cold", label: "مبردة ❄️", price: 1.50, description: "معبأة ومبردة إلى 3-5°م، جاهزة للشرب فوراً (+0.25 دينار)" }
        ],
        badge: "الأكثر مبيعاً",
        specs: {
          volume: "250 مل × 40 كوب",
          material: "كوب ورقي مع غطاء بلاستيكي",
          shelfLife: "مبرد: 48 ساعة | عادي: 6 أشهر",
          storage: "يحفظ في مكان بارد وجاف بعيداً عن الشمس",
          certifications: ["ISO 22000", "المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية"]
        },
        usageTips: [
          "مثالية للرحلات والنزهات",
          "مناسبة للمدارس والجامعات",
          "حل عملي للمناسبات الاجتماعية",
          "سهلة التوزيع على الحضور"
        ]
      },
      {
        id: 2,
        name: "كرتونة مياه 200 مل",
        nameEn: "Carton Water 200ml",
        description: "40 كاسة × 200 مل - مثالية للأطفال والمدارس والفعاليات الصغيرة",
        fullDescription: "كرتونة مياه نقية بحجم صغير مناسب للأطفال والاستخدام الفردي. معبأة في أكواب ورقية عالية الجودة مع أغطية محكمة. خيار مثالي للمدارس، الحضانات، والفعاليات التي تتطلب أحجاماً صغيرة.",
        price: 1.25,
        basePrice: 1.00,
        chilledPrice: 1.25,
        category: "carton",
        emoji: "🥤",
        image: "images/carton-200.jfif",
        options: [
          { id: "normal", label: "عادية 🌡️", price: 1.00, description: "بدرجة حرارة الغرفة، مناسبة للتخزين الطويل", isDefault: true },
          { id: "cold", label: "مبردة ❄️", price: 1.25, description: "معبأة ومبردة إلى 3-5°م، جاهزة للشرب فوراً (+0.25 دينار)" }
        ],
        badge: "مثالية للأطفال",
        specs: {
          volume: "200 مل × 40 كوب",
          material: "كوب ورقي مع غطاء بلاستيكي آمن للأطفال",
          shelfLife: "مبرد: 48 ساعة | عادي: 6 أشهر",
          storage: "يحفظ في مكان بارد وجاف، بعيداً عن متناول الأطفال الصغار دون إشراف",
          certifications: ["ISO 22000", "المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية"]
        },
        usageTips: [
          "حجم مثالي لاحتياجات الأطفال اليومية",
          "مناسبة لوجبات المدارس والرحلات",
          "تقليل الهدر بحجم مناسب",
          "سهلة الحمل في الحقائب الصغيرة"
        ]
      },
      {
        id: 3,
        name: "شرنك مياه 250 مل",
        nameEn: "Shrink Water 250ml",
        description: "12 زجاجة بلاستيكية × 250 مل - سهلة الحمل والنقل، مثالية للاستخدام الشخصي",
        fullDescription: "مجموعة من 12 زجاجة مياه نقية معبأة في زجاجات بلاستيكية عالية الجودة (بولي إيثيلين تيرفثالات) مع أغطية محكمة. مغلفة بشرنك لحماية المنتج وسهولة النقل. مثالية للاستخدام الشخصي، الرحلات، والسيارات.",
        price: 1.25,
        category: "shrink",
        emoji: "📦",
        image: "images/shrink-250.jfif",
        options: null,
        badge: null,
        specs: {
          volume: "250 مل × 12 زجاجة",
          material: "بلاستيك PET آمن للاستخدام الغذائي، خالي من BPA",
          shelfLife: "12 شهر من تاريخ التعبئة",
          storage: "يحفظ في مكان بارد وجاف، بعيداً عن أشعة الشمس المباشرة",
          certifications: ["المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية", "شهادة خلو من BPA"]
        },
        usageTips: [
          "مثالية لرحلات السيارات والنزهات",
          "مناسبة للاستخدام اليومي في العمل أو المنزل",
          "سهلة التخزين في الثلاجة أو الحقائب",
          "زجاجات قابلة لإعادة التدوير"
        ]
      },
      {
        id: 4,
        name: "شرنك مياه 125 مل",
        nameEn: "Shrink Water 125ml",
        description: "12 زجاجة × 125 مل - حجم عملي وخفيف للاستخدام اليومي",
        fullDescription: "مجموعة من 12 زجاجة مياه نقية بحجم 125 مل، معبأة في زجاجات بلاستيكية عالية الجودة مع أغطية محكمة. مناسبة للاستخدام اليومي والرحلات القصيرة.",
        price: 1.25,
        category: "shrink",
        emoji: "📦",
        image: "images/shrink-600.jfif",
        options: null,
        badge: "شعبي",
        specs: {
          volume: "125 مل × 12 زجاجة",
          material: "بلاستيك PET آمن للاستخدام الغذائي، خالي من BPA",
          shelfLife: "12 شهر من تاريخ التعبئة",
          storage: "يحفظ في مكان بارد وجاف، بعيداً عن أشعة الشمس المباشرة",
          certifications: ["المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية", "شهادة خلو من BPA"]
        },
        usageTips: [
          "حجم خفيف وسهل الحمل",
          "مناسب للأطفال والاستخدام اليومي",
          "اقتصادي للكميات الصغيرة",
          "سهل التخزين في الحقائب"
        ]
      },
      {
        id: 5,
        name: "شرنك مياه 1.5 لتر",
        nameEn: "Shrink Water 1.5L",
        description: "6 زجاجات × 1.5 لتر - للعائلة والمنزل والمكاتب",
        fullDescription: "مجموعة من 6 زجاجات مياه نقية بحجم 1.5 لتر، معبأة في زجاجات بلاستيكية متينة مع أغطية محكمة. الحجم الكبير المثالي للعائلات والمكاتب، يقلل من عدد المرات التي تحتاج فيها لشراء المياه. معبأة بتقنية تحافظ على النقاء والطعم النقي.",
        price: 1.00,
        category: "shrink",
        emoji: "📦",
        image: "images/shrink-1.5.png",
        options: null,
        badge: null,
        specs: {
          volume: "1.5 لتر × 6 زجاجات",
          material: "بلاستيك PET عالي الجودة، خالي من BPA، مقاوم للكسر",
          shelfLife: "12 شهر من تاريخ التعبئة",
          storage: "يحفظ عمودياً في مكان بارد وجاف، بعيداً عن المواد الكيميائية",
          certifications: ["المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية", "شهادة خلو من BPA"]
        },
        usageTips: [
          "مثالي للاستخدام المنزلي اليومي",
          "مناسب للمكاتب والاجتماعات",
          "اقتصادي على المدى الطويل",
          "سهل التخزين في الثلاجات المنزلية"
        ]
      },
      {
        id: 6,
        name: "قارورة سعودية 18.9 لتر",
        nameEn: "Saudi Bottle 18.9L",
        description: "قارورة كبيرة 18.9 لتر من مصادر سعودية معتمدة - للاستخدام المنزلي والمكتبي مع أجهزة التبريد",
        fullDescription: "قارورة مياه معدنية نقية سعة 18.9 لتر من مصادر مياه سعودية معتمدة، معبأة بتقنيات حديثة تحافظ على المعادن الطبيعية والنقاء. مصممة للاستخدام مع أجهزة تبريد المياه المنزلية والمكتبية. تمر بـ 9 مراحل تنقية وفحص مخبري قبل التعبئة.",
        price: 5.00,
        category: "bottle",
        emoji: "🫙",
        image: "images/bottle-saudi-18l.png",
        options: null,
        badge: null,
        specs: {
          volume: "18.9 لتر (5 جالون أمريكي)",
          material: "بلاستيك بولي كربونات عالي الجودة، خالي من BPA، معاد تدويره",
          shelfLife: "6 أشهر من تاريخ التعبئة",
          storage: "تحفظ عمودياً في مكان بارد ومظلم، بعيداً عن المواد الكيميائية",
          certifications: ["الهيئة العامة للغذاء والدواء السعودية", "المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية", "شهادة خلو من BPA"]
        },
        usageTips: [
          "مثالية للمنازل والمكاتب مع أجهزة التبريد",
          "اقتصادية للاستخدام العائلي اليومي",
          "تقلل من النفايات البلاستيكية مقارنة بالزجاجات الصغيرة",
          "تتوفر خدمة استبدال القوارير الفارغة"
        ]
      },
      {
        id: 7,
        name: "قارورة أردنية 18.9 لتر",
        nameEn: "Jordanian Bottle 18.9L",
        description: "قارورة كبيرة 18.9 لتر من ينابيع الأردن الطبيعية - جودة عالية معتمدة وغنية بالمعادن",
        fullDescription: "قارورة مياه معدنية نقية سعة 18.9 لتر من ينابيع الأردن الطبيعية، غنية بالمعادن الأساسية مثل الكالسيوم والمغنيسيوم. معبأة بتقنيات حديثة تحافظ على الخصائص الطبيعية للماء. مثالية للاستهلاك اليومي مع ضمان الجودة والنقاء.",
        price: 4.00,
        category: "bottle",
        emoji: "🫙",
        image: "images/bottle-jordan-18l.png",
        options: null,
        badge: null,
        specs: {
          volume: "18.9 لتر (5 جالون أمريكي)",
          material: "بلاستيك بولي كربونات عالي الجودة، خالي من BPA، معاد تدويره",
          shelfLife: "6 أشهر من تاريخ التعبئة",
          storage: "تحفظ عمودياً في مكان بارد ومظلم، بعيداً عن المواد الكيميائية",
          certifications: ["مؤسسة الغذاء الأردنية", "المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية", "شهادة خلو من BPA"]
        },
        usageTips: [
          "غنية بالمعادن الطبيعية المفيدة للصحة",
          "طعم نقي ومنعش بفضل المصدر الطبيعي",
          "مثالية للعائلات التي تفضل المياه المعدنية الطبيعية",
          "متوافقة مع جميع أجهزة تبريد المياه القياسية"
        ]
      },
      {
        id: 8,
        name: "ثلج كيلو واحد",
        nameEn: "Ice 1kg",
        description: "كيلو ثلج نقي معبأ في أكياس محكمة - مثالي للمشروبات الباردة اليومية",
        fullDescription: "كيلو واحد من الثلج النقي المصنوع من مياه نقية 99.97%، معبأ في أكياس بلاستيكية محكمة الإغلاق. مثالي لتبريد المشروبات اليومية، العصائر، والكوكتيلات. يمر بعملية تجميد سريعة تحافظ على نقاء الثلج وتمنع تكون البلورات الكبيرة.",
        price: 0.75,
        category: "ice",
        emoji: "🧊",
        image: "images/ice-1kg.png",
        options: null,
        badge: null,
        specs: {
          weight: "1 كجم ± 50 جرام",
          material: "أكياس بلاستيكية غذائية محكمة الإغلاق",
          shelfLife: "6 أشهر في الفريزر عند -18°م أو أقل",
          storage: "يحفظ في الفريزر فور الاستلام، بعيداً عن الروائح القوية",
          certifications: ["المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية"]
        },
        usageTips: [
          "مثالي للمشروبات اليومية والعصائر",
          "يكفي لتبريد 5-8 أكواب من المشروبات",
          "بلورات ثلج صغيرة تذوب ببطء لتحافظ على برودة المشروب",
          "آمن للاستخدام المباشر مع المشروبات"
        ]
      },
      {
        id: 9,
        name: "ثلج 3 كيلو",
        nameEn: "Ice 3kg",
        description: "3 كيلو ثلج نقي - مثالي للتجمعات الصغيرة والحفلات المنزلية",
        fullDescription: "3 كيلوجرام من الثلج النقي المصنوع من مياه نقية 99.97%، معبأ في أكياس بلاستيكية متينة محكمة الإغلاق. مثالي للتجمعات العائلية الصغيرة، الحفلات المنزلية، والمناسبات الاجتماعية. يتم إنتاجه بتقنية التجميد السريع التي تضمن نقاء الثلج وجودة البلورات.",
        price: 2.00,
        category: "ice",
        emoji: "🧊",
        image: "images/ice-3kg.png",
        options: null,
        badge: null,
        specs: {
          weight: "3 كجم ± 100 جرام",
          material: "أكياس بلاستيكية غذائية مزدوجة الطبقة محكمة الإغلاق",
          shelfLife: "6 أشهر في الفريزر عند -18°م أو أقل",
          storage: "يحفظ في الفريزر فور الاستلام، بعيداً عن الروائح القوية",
          certifications: ["المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية"]
        },
        usageTips: [
          "مثالي للحفلات المنزلية والتجمعات الصغيرة",
          "يكفي لتبريد 15-25 كوب من المشروبات",
          "اقتصادي مقارنة بشراء أكياس صغيرة متعددة",
          "بلورات متوسطة الحجم مناسبة لمختلف أنواع المشروبات"
        ]
      },
      {
        id: 10,
        name: "ثلج 5 كيلو",
        nameEn: "Ice 5kg",
        description: "5 كيلو ثلج نقي - للاستخدام التجاري والمناسبات الكبيرة والحفلات",
        fullDescription: "5 كيلوجرام من الثلج النقي المصنوع من مياه نقية 99.97%، معبأ في أكياس بلاستيكية صناعية متينة محكمة الإغلاق. مثالي للاستخدام التجاري في المقاهي والمطاعم، والمناسبات الكبيرة مثل الأعراس والحفلات. يتم إنتاجه بمعايير صناعية تضمن الجودة والنقاء.",
        price: 3.00,
        category: "ice",
        emoji: "🧊",
        image: "images/ice-5kg.png",
        options: null,
        badge: "الأوفر",
        specs: {
          weight: "5 كجم ± 150 جرام",
          material: "أكياس بلاستيكية صناعية ثلاثية الطبقة محكمة الإغلاق",
          shelfLife: "6 أشهر في الفريزر عند -18°م أو أقل",
          storage: "يحفظ في الفريزر الصناعي فور الاستلام، بعيداً عن الروائح القوية",
          certifications: ["المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية", "شهادة جودة صناعية"]
        },
        usageTips: [
          "مثالي للمطاعم والمقاهي والمناسبات الكبيرة",
          "يكفي لتبريد 30-40 كوب من المشروبات",
          "اقتصادي جداً للكميات الكبيرة",
          "بلورات كبيرة الحجم مثالية للمشروبات التي تحتاج تبريد طويل"
        ]
      }
  
,
      {
        id: 11,
        name: "دفتر كابونات رقمي خارجي 25",
        nameEn: "Digital External Coupon Book 25",
        description: "دفتر رقمي خارجي بـ 25 كابون — تحصل على رقم دفتر تحتفظ به لاستخدامه مع تعبئة القارورة",
        fullDescription: "دفتر كابونات رقمي خارجي (25 كابون). بعد الشراء يظهر رقم الدفتر — احتفظ به وأدخله مع كل طلب تعبئة. يُخصم الكابون بعد التسليم فقط.",
        price: 20.00,
        category: "extras",
        emoji: "📱",
        image: "images/coupons-outdoor-25.jpg",
        options: null,
        badge: "دفتر رقمي",
        specs: {
          volume: "25 كابون رقمي خارجي",
          material: "دفتر رقمي برقم فريد",
          shelfLife: "رصيد دائم حتى الاستهلاك",
          storage: "احفظ رقم الدفتر",
          certifications: ["خدمة معتمدة"]
        },
        usageTips: [
          "احتفظ برقم الدفتر",
          "لتعبئة القارورة",
          "الخصم بعد التسليم",
          "كابون = تعبئة واحدة"
        ]
      },
      {
        id: 12,
        name: "دفتر كابونات رقمي خارجي 20",
        nameEn: "Digital External Coupon Book 20",
        description: "دفتر رقمي خارجي بـ 20 كابون — خيار اقتصادي مع رقم دفتر خاص بك",
        fullDescription: "دفتر كابونات رقمي خارجي (20 كابون) مع رقم دفتر تستخدمه عند طلب التعبئة.",
        price: 16.00,
        category: "extras",
        emoji: "📱",
        image: "images/coupons-outdoor-20.jpg",
        options: null,
        badge: "دفتر رقمي",
        specs: {
          volume: "20 كابون رقمي خارجي",
          material: "دفتر رقمي برقم فريد",
          shelfLife: "رصيد دائم حتى الاستهلاك",
          storage: "احفظ رقم الدفتر",
          certifications: ["خدمة معتمدة"]
        },
        usageTips: [
          "اقتصادي",
          "رقم دفتر واحد",
          "لتعبئة القارورة",
          "الخصم بعد التسليم"
        ]
      },
      {
        id: 13,
        name: "دفتر كابونات رقمي خارجي 25+",
        nameEn: "Digital External Coupon Book 25 Plus",
        description: "دفتر رقمي خارجي بـ 25 كابون — مناسب للاستخدام المنتظم مع التوصيل",
        fullDescription: "دفتر كابونات رقمي خارجي (25 كابون) للاستخدام المنتظم مع تعبئة القارورة.",
        price: 16.00,
        category: "extras",
        emoji: "📱",
        image: "images/coupons-indoor-25.jpg",
        options: null,
        badge: "دفتر رقمي",
        specs: {
          volume: "25 كابون رقمي خارجي",
          material: "دفتر رقمي برقم فريد",
          shelfLife: "رصيد دائم حتى الاستهلاك",
          storage: "احفظ رقم الدفتر",
          certifications: ["خدمة معتمدة"]
        },
        usageTips: [
          "استخدام منتظم",
          "أدخل رقم الدفتر",
          "لا خصم قبل التسليم",
          "خارجي فقط"
        ]
      },
      {
        id: 14,
        name: "دفتر كابونات رقمي خارجي 30",
        nameEn: "Digital External Coupon Book 30",
        description: "دفتر رقمي خارجي بـ 30 كابون — قيمة أكبر للاستهلاك العالي",
        fullDescription: "دفتر كابونات رقمي خارجي (30 كابون) للاستهلاك الأعلى مع رقم دفتر تحتفظ به.",
        price: 18.00,
        category: "extras",
        emoji: "📱",
        image: "images/coupons-indoor-30.jpg",
        options: null,
        badge: "دفتر رقمي",
        specs: {
          volume: "30 كابون رقمي خارجي",
          material: "دفتر رقمي برقم فريد",
          shelfLife: "رصيد دائم حتى الاستهلاك",
          storage: "احفظ رقم الدفتر",
          certifications: ["خدمة معتمدة"]
        },
        usageTips: [
          "قيمة أكبر",
          "خارجي فقط",
          "رقم دفتر للاحتفاظ",
          "الخصم بعد الاستلام"
        ]
      },
      {
        id: 15,
        name: "قارورة سحرية",
        nameEn: "Magic Bottle",
        description: "قارورة سحرية عملية وعالية الجودة للاستخدام اليومي",
        fullDescription: "قارورة سحرية عملية بتصميم متين ومناسب للاستخدام اليومي، مع شكل أنيق وسهولة في الاستعمال.",
        price: 15.00,
        category: "extras",
        emoji: "✨",
        image: "images/magic-bottle.jpg",
        options: null,
        badge: "مميز",
        specs: {
          volume: "قارورة خاصة",
          material: "بلاستيك متين",
          shelfLife: "استخدام طويل",
          storage: "يحفظ في مكان نظيف وجاف",
          certifications: ["جودة عالية"]
        },
        usageTips: [
          "عملية وسهلة الاستخدام",
          "مناسبة للمنزل",
          "تصميم متين",
          "شكل جذاب"
        ]
      },
      {
        id: 16,
        name: "فلتر منزلي",
        nameEn: "Home Filter",
        description: "فلتر منزلي اقتصادي لتحسين جودة المياه",
        fullDescription: "فلتر منزلي أساسي واقتصادي لتحسين جودة المياه اليومية، مناسب للاستخدام المنزلي البسيط.",
        price: 5.00,
        category: "extras",
        emoji: "🧰",
        image: "images/home-filter.jpg",
        options: null,
        badge: "منزلي",
        specs: {
          volume: "فلتر أساسي",
          material: "مكونات ترشيح منزلية",
          shelfLife: "حسب الاستخدام",
          storage: "يحفظ بعيداً عن الحرارة",
          certifications: ["استخدام منزلي"]
        },
        usageTips: [
          "اقتصادي",
          "يحسن الطعم والجودة",
          "سهل الاستخدام",
          "مناسب للمنزل"
        ]
      },
      {
        id: 17,
        name: "مضخة يدوية",
        nameEn: "Manual Pump",
        description: "مضخة يدوية للقوارير الكبيرة - سهلة وعملية",
        fullDescription: "مضخة يدوية مناسبة للقوارير الكبيرة 18.9 لتر، عملية وسهلة للاستخدام المنزلي والمكتبي.",
        price: 3.00,
        category: "extras",
        emoji: "🔧",
        image: "images/manual-pump.jpg",
        options: null,
        badge: "عملية",
        specs: {
          volume: "مضخة يدوية",
          material: "بلاستيك متين",
          shelfLife: "استخدام طويل",
          storage: "يحفظ في مكان نظيف",
          certifications: ["ملائم للقوارير الكبيرة"]
        },
        usageTips: [
          "سهلة الاستخدام",
          "اقتصادية",
          "مناسبة للقوارير الكبيرة",
          "مثالية للمنزل"
        ]
      },
      {
        id: 18,
        name: "مضخة إلكترونية",
        nameEn: "Electronic Pump",
        description: "مضخة إلكترونية للقوارير الكبيرة - مريحة بضغطة زر",
        fullDescription: "مضخة إلكترونية عملية للقوارير الكبيرة، توفر راحة أكبر وسهولة عالية في الاستخدام اليومي.",
        price: 5.00,
        category: "extras",
        emoji: "⚡",
        image: "images/electric-pump.jpg",
        options: null,
        badge: "حديث",
        specs: {
          volume: "مضخة إلكترونية",
          material: "بلاستيك + مكونات إلكترونية",
          shelfLife: "استخدام طويل",
          storage: "يحفظ بعيداً عن الماء المباشر",
          certifications: ["استخدام منزلي ومكتبي"]
        },
        usageTips: [
          "مريحة جداً",
          "تعمل بضغطة زر",
          "مناسبة للمنازل والمكاتب",
          "شكل حديث"
        ]
      },
      {
        id: 19,
        name: "كولر ماء",
        nameEn: "Water Cooler",
        description: "كولر ماء احترافي للمنازل والمكاتب",
        fullDescription: "كولر ماء احترافي بتصميم أنيق ومناسب للمنازل والمكاتب، يعمل مع القوارير الكبيرة ويوفر استخداماً عملياً.",
        price: 90.00,
        category: "extras",
        emoji: "❄️",
        image: "images/water-cooler.jpg",
        options: null,
        badge: "احترافي",
        specs: {
          volume: "جهاز تبريد ماء",
          material: "هيكل متين",
          shelfLife: "استخدام طويل",
          storage: "يوضع في مكان ثابت وجاف",
          certifications: ["جودة عالية"]
        },
        usageTips: [
          "مثالي للمكاتب",
          "مناسب للمنازل",
          "عملي جداً",
          "يتوافق مع القوارير الكبيرة"
        ]
      },
      {
        id: 20,
        name: "فلتر منزلي 7 مراحل",
        nameEn: "7 Stages Home Filter",
        description: "فلتر منزلي 7 مراحل لتنقية مياه متقدمة",
        fullDescription: "نظام فلتر منزلي 7 مراحل يمنحك تنقية متقدمة للمياه المنزلية مع جودة عالية وأداء قوي.",
        price: 120.00,
        category: "extras",
        emoji: "💧",
        image: "images/home-filter-7stages.jpg",
        options: null,
        badge: "7 مراحل",
        specs: {
          volume: "7 مراحل تنقية",
          material: "نظام ترشيح متكامل",
          shelfLife: "حسب الاستخدام والصيانة",
          storage: "تركيب منزلي ثابت",
          certifications: ["تنقية متقدمة"]
        },
        usageTips: [
          "تنقية قوية",
          "مناسب للمنزل",
          "يحسن جودة المياه بشكل واضح",
          "حل طويل الأمد"
        ]
      }

    ];

  
    // ==================== CART WITH ENHANCED LOGIC ====================
    let cart = [];
    let aiConversationHistory = []; // For context-aware AI responses
    // v2: default morning/light for all visitors (resets old dark default)
    const THEME_STORAGE_KEY = 'puredrop-theme-v2';
    const INITIAL_PRODUCTS_LIMIT = 12;
    let visibleProductsLimit = INITIAL_PRODUCTS_LIMIT;
    let currentProductsFilter = 'all';

    const defaultBadgesByCategory = {
      carton: 'جودة عالية',
      shrink: 'متوفر',
      bottle: 'الأكثر طلباً',
      ice: 'نقي',
      extras: 'رقمي'
    };

    function applyDefaultProductBadges() {
      products.forEach(product => {
        if (!product.badge) {
          product.badge = defaultBadgesByCategory[product.category] || 'متوفر';
        }
      });
    }

    applyDefaultProductBadges();

    // ==================== API + DATABASE INTEGRATION ====================
    // عند تشغيل الموقع من backend/server.js سيتم تحميل المنتجات وحفظ الطلبات والرسائل من/إلى PostgreSQL.
    // عند فتح الموقع كملفات ثابتة سيبقى يعمل اعتماداً على بيانات المنتجات الاحتياطية داخل هذا الملف.
    const API_BASE_URL = window.PUREDROP_API_BASE_URL || '';
    const CUSTOMER_TOKEN_KEY = 'puredrop_customer_token';
    let customerSession = null;
    let authConfig = { googleEnabled: false, demoLoginEnabled: true, googleClientId: null, emailAuthEnabled: true };
    let customerAuthMode = 'login';
    // When true, customer chose cash — do not auto-recheck coupon payment.
    let preferCashPayment = false;
    // Guest (not logged in) coupon balance looked up by phone or booklet number.
    let guestCouponLookup = { available: 0, bookNumber: '', phone: '' };
    let guestBookLookupTimer = null;

    function canUseApi() {
      return window.location.protocol !== 'file:' || Boolean(API_BASE_URL);
    }

    function getCustomerToken() {
      return localStorage.getItem(CUSTOMER_TOKEN_KEY) || '';
    }

    async function puredropApiRequest(path, options = {}) {
      if (!canUseApi()) {
        throw new Error('API غير متاح عند فتح الموقع كملف ثابت');
      }

      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      };
      const token = getCustomerToken();
      if (token && !headers.Authorization) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.error || 'تعذر الاتصال بقاعدة البيانات');
      }

      return data;
    }

    function getPrimaryCouponAccount() {
      const list = (customerSession?.coupons || []).filter(c => c.serviceType === 'external');
      return list[0] || null;
    }

    function setHiddenEl(el, hide) {
      if (!el) return;
      el.classList.toggle('is-hidden', hide);
      el.classList.toggle('hidden', hide);
    }

    function closeCustomerMenu() {
      const dropdown = document.getElementById('customerMenuDropdown');
      const toggle = document.getElementById('customerMenuToggle');
      setHiddenEl(dropdown, true);
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    function toggleCustomerMenu(event) {
      event?.stopPropagation?.();
      const dropdown = document.getElementById('customerMenuDropdown');
      const toggle = document.getElementById('customerMenuToggle');
      if (!dropdown || !toggle) return;
      const open = dropdown.classList.contains('is-hidden') || dropdown.classList.contains('hidden');
      setHiddenEl(dropdown, !open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function setCustomerAuthMode(mode) {
      customerAuthMode = mode === 'register' ? 'register' : 'login';
      const loginTab = document.getElementById('authTabLogin');
      const registerTab = document.getElementById('authTabRegister');
      const nameWrap = document.getElementById('authNameWrap');
      const phoneWrap = document.getElementById('authPhoneWrap');
      const submitBtn = document.getElementById('authEmailSubmitBtn');
      const passInput = document.getElementById('authEmailPassword');
      const titleEl = document.getElementById('authModalTitle');
      loginTab?.classList.toggle('active', customerAuthMode === 'login');
      registerTab?.classList.toggle('active', customerAuthMode === 'register');
      setHiddenEl(nameWrap, customerAuthMode !== 'register');
      setHiddenEl(phoneWrap, customerAuthMode !== 'register');
      if (submitBtn) {
        submitBtn.textContent = customerAuthMode === 'register' ? 'إنشاء الحساب' : 'تسجيل الدخول';
      }
      if (titleEl) {
        titleEl.textContent = customerAuthMode === 'register' ? 'إنشاء حساب' : 'تسجيل الدخول';
      }
      if (passInput) {
        passInput.autocomplete = customerAuthMode === 'register' ? 'new-password' : 'current-password';
      }
      const err = document.getElementById('authEmailError');
      setHiddenEl(err, true);
      const scroller = document.querySelector('#customerAuthModal .auth-modal-scroll');
      if (scroller) scroller.scrollTop = 0;
    }

    function openCustomerAuthModal(mode) {
      const modal = document.getElementById('customerAuthModal');
      if (!modal) return;

      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu?.classList.contains('open') && typeof setMobileMenuOpen === 'function') {
        setMobileMenuOpen(false);
      } else if (mobileMenu?.classList.contains('open')) {
        mobileMenu.classList.remove('open');
      }

      const demoBox = document.getElementById('authDemoFields');
      const googleBtn = document.getElementById('authModalGoogleBtn');
      const googleHint = document.getElementById('authGoogleHint');
      const googleReady = Boolean(authConfig.googleClientId);
      const demoMode = !googleReady && authConfig.demoLoginEnabled;

      setHiddenEl(demoBox, !demoMode);
      setHiddenEl(googleHint, googleReady);
      if (googleBtn) {
        setHiddenEl(googleBtn, !googleReady);
        if (googleReady && !googleBtn.querySelector('div[role="button"]')) {
          googleBtn.innerHTML = '<i class="fab fa-google"></i> المتابعة مع Google';
        }
      }

      const nextMode = mode === 'register' || mode === 'login' ? mode : (customerAuthMode || 'login');
      setCustomerAuthMode(nextMode);
      setHiddenEl(modal, false);
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('auth-modal-open');
      requestAnimationFrame(() => {
        const scroller = modal.querySelector('.auth-modal-scroll');
        if (scroller) scroller.scrollTop = 0;
        modal.scrollTop = 0;
        if (googleReady) renderGoogleSignInButton();
        const focusId = nextMode === 'register' ? 'authEmailName' : 'authEmailAddress';
        document.getElementById(focusId)?.focus?.({ preventScroll: true });
      });
    }

    function closeCustomerAuthModal() {
      const modal = document.getElementById('customerAuthModal');
      setHiddenEl(modal, true);
      if (modal) modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('auth-modal-open');
    }

    async function submitEmailCustomerAuth() {
      const email = (document.getElementById('authEmailAddress')?.value || '').trim();
      const password = document.getElementById('authEmailPassword')?.value || '';
      const fullName = (document.getElementById('authEmailName')?.value || '').trim();
      const phone = (document.getElementById('authEmailPhone')?.value || '').trim();
      const errEl = document.getElementById('authEmailError');
      const submitBtn = document.getElementById('authEmailSubmitBtn');
      const showErr = (msg) => {
        if (errEl) {
          errEl.textContent = msg;
          setHiddenEl(errEl, false);
        }
        showNotification('⚠️ تنبيه', msg, 'error');
      };

      if (!email || !password) {
        showErr('أدخل البريد وكلمة المرور');
        return;
      }
      if (customerAuthMode === 'register' && !fullName) {
        showErr('أدخل الاسم لإنشاء الحساب');
        return;
      }
      if (customerAuthMode === 'register') {
        const jordanPhoneRegex = /^07\d{8,9}$/;
        if (!phone || !jordanPhoneRegex.test(phone)) {
          showErr('رقم الهاتف إلزامي ويجب أن يبدأ بـ 07 (10 أو 11 رقماً)');
          document.getElementById('authEmailPhone')?.focus();
          return;
        }
      }

      const original = submitBtn?.textContent;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جارٍ المتابعة...';
      }
      setHiddenEl(errEl, true);

      try {
        const path = customerAuthMode === 'register' ? '/api/auth/register' : '/api/auth/login';
        const body = customerAuthMode === 'register'
          ? { email, password, fullName, phone }
          : { email, password };
        const data = await puredropApiRequest(path, {
          method: 'POST',
          body: JSON.stringify(body)
        });
        await setCustomerSession(data.token, data.customer);
        closeCustomerAuthModal();
        showNotification(
          customerAuthMode === 'register' ? '✅ تم إنشاء الحساب' : '✅ أهلاً بك',
          customerAuthMode === 'register' ? 'يمكنك الآن إتمام الطلب وربط رقم الدفتر' : 'تم تسجيل الدخول بنجاح',
          'success'
        );
      } catch (error) {
        showErr(error.message || 'تعذر إتمام العملية');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = original || (customerAuthMode === 'register' ? 'إنشاء الحساب' : 'تسجيل الدخول');
        }
      }
    }

    async function submitDemoCustomerLogin() {
      const email = (document.getElementById('authEmailAddress')?.value || 'customer@gmail.com').trim();
      const name = (document.getElementById('authEmailName')?.value || 'عميل قطرة نقية').trim() || 'عميل Google';
      try {
        const data = await puredropApiRequest('/api/auth/google-demo', {
          method: 'POST',
          body: JSON.stringify({ email, name })
        });
        await setCustomerSession(data.token, data.customer);
        closeCustomerAuthModal();
        showNotification('✅ دخول تجريبي', 'تم تسجيل الدخول (وضع محلي)', 'success');
      } catch (error) {
        showNotification('❌ فشل الدخول', error.message || 'حاول مرة أخرى', 'error');
      }
    }

    function renderCustomerAuthUI() {
      const loggedIn = Boolean(customerSession?.id);
      const chip = document.getElementById('customerAccountChip');
      const loginBtn = document.getElementById('googleLoginBtnDesktop');
      const acc = getPrimaryCouponAccount();
      const remaining = acc ? Number(acc.available ?? acc.remaining) || 0 : 0;
      const book = acc?.bookNumber || '—';

      setHiddenEl(chip, !loggedIn);
      setHiddenEl(loginBtn, loggedIn);
      setHiddenEl(document.getElementById('mobileNavAuthBtn'), loggedIn);
      if (!loggedIn) closeCustomerMenu();

      const nameChip = document.getElementById('customerNameChip');
      const couponChip = document.getElementById('customerCouponChip');
      const couponDetail = document.getElementById('customerCouponChipDetail');
      const bookChip = document.getElementById('customerBookChip');
      const avatar = document.getElementById('customerAvatar');
      const avatarFallback = document.getElementById('customerAvatarFallback');
      if (nameChip) nameChip.textContent = customerSession?.fullName || customerSession?.email || 'عميل';
      if (couponChip) couponChip.textContent = String(remaining);
      if (couponDetail) couponDetail.textContent = `${remaining} كابون متبقي`;
      if (bookChip) bookChip.textContent = book !== '—' ? `دفتر: ${book}` : 'دفتر: لم يُصدر بعد';
      if (avatar) {
        if (customerSession?.avatarUrl) {
          avatar.src = customerSession.avatarUrl;
          setHiddenEl(avatar, false);
          setHiddenEl(avatarFallback, true);
        } else {
          setHiddenEl(avatar, true);
          setHiddenEl(avatarFallback, false);
        }
      }

      const mobOut = document.getElementById('mobileCustomerLoggedOut');
      const mobIn = document.getElementById('mobileCustomerLoggedIn');
      setHiddenEl(mobOut, loggedIn);
      setHiddenEl(mobIn, !loggedIn);
      const mobName = document.getElementById('mobileCustomerName');
      const mobCoupons = document.getElementById('mobileCustomerCoupons');
      const mobBook = document.getElementById('mobileCustomerBook');
      if (mobName) mobName.textContent = customerSession?.fullName || customerSession?.email || '—';
      if (mobCoupons) mobCoupons.textContent = `${remaining} كابون متبقي`;
      if (mobBook) mobBook.textContent = `دفتر: ${book}`;

      const gate = document.getElementById('cartLoginGate');
      const bal = document.getElementById('cartAccountBalance');
      // Login is optional — guests can order with name/phone/booklet number.
      setHiddenEl(gate, loggedIn);
      setHiddenEl(bal, !loggedIn);
      if (bal) {
        const big = document.getElementById('cartAccountCouponsBig');
        const bookBig = document.getElementById('cartAccountBookBig');
        if (big) big.textContent = String(remaining);
        if (bookBig) bookBig.textContent = `دفتر: ${book}`;
      }

      if (loggedIn) {
        closeCustomerAuthModal();
        const nameEl = document.getElementById('customerName');
        const phoneEl = document.getElementById('customerPhone');
        if (nameEl && !nameEl.value && customerSession.fullName) nameEl.value = customerSession.fullName;
        if (phoneEl && customerSession.phone) phoneEl.value = customerSession.phone;
        const bookEl = document.getElementById('couponBookNumber');
        if (bookEl && acc?.bookNumber && !bookEl.value.trim()) {
          bookEl.value = acc.bookNumber;
          const payBox = document.getElementById('payWithDigitalCoupon');
          if (payBox && getRefillCartQty() > 0 && !preferCashPayment) payBox.checked = true;
          syncCouponRedeemQtyFromCart();
        }
      }
    }

    document.addEventListener('click', (event) => {
      const menu = document.getElementById('customerAccountChip');
      if (!menu || menu.classList.contains('hidden')) return;
      if (!menu.contains(event.target)) closeCustomerMenu();
    });
    document.getElementById('customerMenuToggle')?.addEventListener('click', toggleCustomerMenu);
    window.toggleCustomerMenu = toggleCustomerMenu;
    window.closeCustomerMenu = closeCustomerMenu;

    async function setCustomerSession(token, customer) {
      if (token) localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
      customerSession = customer || null;
      renderCustomerAuthUI();
    }

    async function refreshCustomerSession() {
      const token = getCustomerToken();
      if (!token) {
        customerSession = null;
        renderCustomerAuthUI();
        return null;
      }
      try {
        const data = await puredropApiRequest('/api/auth/me');
        customerSession = data.customer;
        renderCustomerAuthUI();
        return customerSession;
      } catch {
        localStorage.removeItem(CUSTOMER_TOKEN_KEY);
        customerSession = null;
        renderCustomerAuthUI();
        return null;
      }
    }

    async function syncCustomerPhoneIfNeeded(phone, name) {
      if (!getCustomerToken() || !phone) return;
      try {
        const data = await puredropApiRequest('/api/auth/me', {
          method: 'PATCH',
          body: JSON.stringify({ phone, fullName: name || undefined })
        });
        customerSession = data.customer;
        renderCustomerAuthUI();
      } catch (error) {
        console.warn('Customer phone sync failed:', error.message);
      }
    }

    function isMobileBrowser() {
      return /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent || ''
      ) || (Math.min(window.innerWidth || 9999, window.innerHeight || 9999) < 768);
    }

    function getGoogleRedirectUri() {
      return `${window.location.origin}/api/auth/google/redirect`;
    }

    function waitForGoogleIdentity(timeoutMs = 8000) {
      return new Promise((resolve) => {
        if (window.google?.accounts?.id) {
          resolve(true);
          return;
        }
        const started = Date.now();
        const timer = setInterval(() => {
          if (window.google?.accounts?.id) {
            clearInterval(timer);
            resolve(true);
            return;
          }
          if (Date.now() - started >= timeoutMs) {
            clearInterval(timer);
            resolve(false);
          }
        }, 120);
      });
    }

    function initializeGoogleIdentity() {
      if (!authConfig.googleClientId || !window.google?.accounts?.id) return false;
      // Always use redirect: popup/One Tap fails on many tablets and laptops (blank page / blocked popup).
      window.google.accounts.id.initialize({
        client_id: authConfig.googleClientId,
        callback: async (response) => {
          await handleGoogleCredential(response);
          closeCustomerAuthModal();
        },
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: false,
        ux_mode: 'redirect',
        login_uri: getGoogleRedirectUri()
      });
      return true;
    }

    function renderGoogleSignInButton() {
      const host = document.getElementById('authModalGoogleBtn');
      if (!host || !authConfig.googleClientId || !window.google?.accounts?.id) return;
      host.innerHTML = '';
      setHiddenEl(host, false);
      window.google.accounts.id.renderButton(host, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'continue_with',
        width: Math.max(220, Math.min(320, Math.floor(host.clientWidth || host.parentElement?.clientWidth || 280))),
        locale: 'ar'
      });
    }

    async function handleGoogleCredential(response) {
      try {
        const data = await puredropApiRequest('/api/auth/google', {
          method: 'POST',
          body: JSON.stringify({ credential: response.credential })
        });
        await setCustomerSession(data.token, data.customer);
        showNotification('✅ أهلاً بك', 'تم تسجيل الدخول عبر Google', 'success');
      } catch (error) {
        showNotification('❌ فشل الدخول', error.message || 'حاول مرة أخرى', 'error');
      }
    }

    async function startCustomerGoogleLogin() {
      try {
        if (!authConfig.googleClientId) {
          openCustomerAuthModal('login');
          showNotification(
            'ℹ️ Google غير مفعّل على السيرفر',
            'أضف GOOGLE_CLIENT_ID في Environment على Render، مع نطاق الموقع في Google Cloud، ثم أعد النشر.',
            'info'
          );
          return;
        }

        const ready = await waitForGoogleIdentity();
        if (!ready) {
          openCustomerAuthModal('login');
          showNotification('⚠️ تعذر تحميل Google', 'تحقق من الاتصال أو استخدم الدخول بالبريد', 'error');
          return;
        }

        initializeGoogleIdentity();
        openCustomerAuthModal('login');
        renderGoogleSignInButton();
        showNotification(
          '👆 اضغط زر Google',
          'اضغط زر المتابعة مع Google داخل النافذة — سيتم إرجاعك للموقع تلقائياً بعد الموافقة.',
          'info'
        );
      } catch (error) {
        openCustomerAuthModal('login');
        showNotification('❌ تعذر Google', (error.message || 'استخدم الدخول بالبريد'), 'error');
      }
    }

    function customerLogout() {
      localStorage.removeItem(CUSTOMER_TOKEN_KEY);
      customerSession = null;
      renderCustomerAuthUI();
      showNotification('👋 تم الخروج', 'يمكنك تسجيل الدخول عبر Google في أي وقت', 'info');
    }

    async function initCustomerAuth() {
      try {
        authConfig = await puredropApiRequest('/api/auth/config');
      } catch {
        authConfig = { googleEnabled: false, demoLoginEnabled: true, googleClientId: null };
      }
      if (authConfig.googleClientId) {
        await waitForGoogleIdentity();
        initializeGoogleIdentity();
      }
      // Returned from Google redirect login
      if (new URLSearchParams(window.location.search).get('google') === '1') {
        await refreshCustomerSession();
        if (customerSession?.id) {
          showNotification('✅ أهلاً بك', 'تم تسجيل الدخول عبر Google', 'success');
        }
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl || '/');
      } else {
        await refreshCustomerSession();
      }
    }

    window.startCustomerGoogleLogin = startCustomerGoogleLogin;
    window.openCustomerAuthModal = openCustomerAuthModal;
    window.closeCustomerAuthModal = closeCustomerAuthModal;
    window.submitDemoCustomerLogin = submitDemoCustomerLogin;
    window.submitEmailCustomerAuth = submitEmailCustomerAuth;
    window.setCustomerAuthMode = setCustomerAuthMode;
    window.customerLogout = customerLogout;
    window.handleGoogleCredential = handleGoogleCredential;

    function normalizeApiProduct(product) {
      let options = Array.isArray(product.options) && product.options.length ? [...product.options] : null;
      if (options) {
        options.sort((a, b) => {
          const aScore = (a.isDefault ? -2 : 0) + (a.id === 'normal' ? -1 : 0);
          const bScore = (b.isDefault ? -2 : 0) + (b.id === 'normal' ? -1 : 0);
          return aScore - bScore;
        });
      }
      return {
        ...product,
        basePrice: product.basePrice ?? product.price,
        chilledPrice: product.chilledPrice ?? null,
        options,
        specs: product.specs || {},
        usageTips: Array.isArray(product.usageTips) ? product.usageTips : []
      };
    }

    async function loadProductsFromApi() {
      try {
        const data = await puredropApiRequest('/api/products');
        if (Array.isArray(data.products) && data.products.length) {
          products = data.products.map(normalizeApiProduct);
          // Keep refill product first in the storefront grid.
          products.sort((a, b) => {
            if (Number(a.id) === REFILL_PRODUCT_ID) return -1;
            if (Number(b.id) === REFILL_PRODUCT_ID) return 1;
            return 0;
          });
          applyDefaultProductBadges();
          return true;
        }
      } catch (error) {
        console.warn('PureDrop API fallback:', error.message);
      }
      return false;
    }

    async function saveOrderToDatabase(orderPayload) {
      return puredropApiRequest('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload)
      });
    }

    async function saveContactMessageToDatabase(messagePayload) {
      return puredropApiRequest('/api/contact-messages', {
        method: 'POST',
        body: JSON.stringify(messagePayload)
      });
    }

    async function saveAiConversationMessage(messagePayload) {
      return puredropApiRequest('/api/ai-conversations', {
        method: 'POST',
        body: JSON.stringify(messagePayload)
      });
    }

    async function saveHydrationCalculation(calculationPayload) {
      return puredropApiRequest('/api/hydration-calculations', {
        method: 'POST',
        body: JSON.stringify(calculationPayload)
      });
    }

    async function saveFamilyAdvisorCalculation(calculationPayload) {
      return puredropApiRequest('/api/family-advisor-calculations', {
        method: 'POST',
        body: JSON.stringify(calculationPayload)
      });
    }

    function getAiSessionId() {
      const key = 'puredrop-ai-session-id';
      let sessionId = localStorage.getItem(key);
      if (!sessionId) {
        sessionId = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : 'pd-ai-' + Date.now() + '-' + Math.random().toString(16).slice(2);
        localStorage.setItem(key, sessionId);
      }
      return sessionId;
    }

    function applyTheme(theme) {
      const safeTheme = theme === 'dark' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', safeTheme);
      document.body?.classList.toggle('theme-light', safeTheme === 'light');
      document.body?.classList.toggle('theme-dark', safeTheme === 'dark');

      const meta = document.getElementById('themeColorMeta');
      if (meta) meta.setAttribute('content', safeTheme === 'light' ? '#e8f4ff' : '#0f172a');

      const desktopIcon = document.getElementById('themeToggleIcon');
      const compactIcon = document.getElementById('themeToggleIconCompact');
      const mobileIcon = document.getElementById('mobileThemeToggleIcon');
      // In light mode show moon (switch to night); in dark show sun (switch to morning).
      const iconClass = safeTheme === 'light'
        ? 'fas fa-moon theme-toggle-icon'
        : 'fas fa-sun theme-toggle-icon';

      if (desktopIcon) desktopIcon.className = iconClass;
      if (compactIcon) compactIcon.className = iconClass;
      if (mobileIcon) mobileIcon.className = iconClass;

      if (typeof refreshBubbleThemeCache === 'function') {
        refreshBubbleThemeCache();
      }
      if (typeof initializeBubbles === 'function') {
        initializeBubbles();
      }
    }

    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    }

    
// ==================== PREMIUM BUBBLES CANVAS ====================
const canvas = document.getElementById('bubbles-canvas');
const ctx = canvas ? canvas.getContext('2d', { alpha: true }) : null;
let bubbles = [];
let lastBubbleFrame = 0;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);

  // Avoid resetting the drawing buffer if size barely changed (mobile URL bar scroll)
  const nextW = Math.floor(width * dpr);
  const nextH = Math.floor(height * dpr);
  if (canvas.width === nextW && canvas.height === nextH) return false;

  canvas.width = nextW;
  canvas.height = nextH;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return true;
}

class Bubble {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    this.x = Math.random() * w;
    this.y = initial ? Math.random() * h : h + Math.random() * 40;
    this.size = Math.random() * 3.6 + 2.4;
    // Constant vertical speed for every drop (no accel / no slowdown)
    this.speedY = 68;
    this.speedX = 0;
    this.opacity = Math.random() * 0.22 + 0.38;
  }

  update(dt) {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    // Linear motion only — no wobble / sine (those feel like hitching)
    this.y -= this.speedY * dt;
    this.x += this.speedX * dt;

    if (this.y < -36 || this.x < -48 || this.x > w + 48) {
      this.reset(false);
      if (this.y > h + 80) this.y = h + Math.random() * 40;
    }
  }

  draw() {
    if (!ctx) return;

    const isLightTheme = cachedThemeIsLight;
    // Stronger colors so "rain" stays visible on light backgrounds
    const fill = isLightTheme
      ? `rgba(14, 165, 233, ${this.opacity * 0.85})`
      : `rgba(103, 232, 249, ${this.opacity * 0.75})`;
    const rim = isLightTheme
      ? `rgba(3, 105, 161, ${Math.min(1, this.opacity * 1.1)})`
      : `rgba(165, 243, 252, ${Math.min(1, this.opacity * 0.95)})`;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = rim;
    ctx.stroke();
  }
}

function getBubbleCount() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return 30;
  const area = window.innerWidth * window.innerHeight;
  const density = 1 / 30000;
  return Math.max(32, Math.min(58, Math.floor(area * density)));
}

let bubblesRafId = 0;
let bubblesPaused = false;
let cachedThemeIsLight = false;
let lastBubbleWidth = 0;

function refreshBubbleThemeCache() {
  cachedThemeIsLight = document.documentElement.getAttribute('data-theme') === 'light';
}

function shouldDisableBubbles() {
  // Only pause when tab is hidden — keep rain/waves running always for branding
  return document.hidden;
}

function initializeBubbles(force = false) {
  if (!canvas || !ctx) return;
  if (shouldDisableBubbles()) {
    bubbles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const widthChanged = Math.abs((window.innerWidth || 0) - lastBubbleWidth) >= 48;
  resizeCanvas();
  refreshBubbleThemeCache();

  // Only rebuild particles when width changes meaningfully — never on height-only scroll resize
  if (!force && bubbles.length && !widthChanged) return;

  lastBubbleWidth = window.innerWidth || 0;
  bubbles = [];
  const bubbleCount = getBubbleCount();
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new Bubble());
  }
}

function animateBubbles(timestamp) {
  if (!canvas || !ctx) return;
  bubblesRafId = requestAnimationFrame(animateBubbles);

  if (bubblesPaused || shouldDisableBubbles()) {
    return;
  }

  if (!bubbles.length) {
    initializeBubbles(true);
  }

  if (!lastBubbleFrame) lastBubbleFrame = timestamp;
  let dt = (timestamp - lastBubbleFrame) / 1000;
  lastBubbleFrame = timestamp;
  // Stable real-time step: ignore tiny jitter, clamp only huge pauses (tab switch)
  if (dt < 0.008) dt = 0.008;
  if (dt > 0.033) dt = 0.033; // ~30fps max step — prevents speed spikes, keeps motion linear

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update(dt);
    bubbles[i].draw();
  }
}

function pauseBubbles() {
  bubblesPaused = true;
}

function resumeBubbles() {
  bubblesPaused = false;
  lastBubbleFrame = 0;
  if (!bubbles.length) initializeBubbles(true);
}

if (canvas && ctx) {
  initializeBubbles(true);
  bubblesRafId = requestAnimationFrame(animateBubbles);

  window.addEventListener('resize', () => {
    // Height-only changes (mobile browser chrome) only resize buffer — animation keeps running
    resizeCanvas();
    const widthChanged = Math.abs((window.innerWidth || 0) - lastBubbleWidth) >= 48;
    if (widthChanged) initializeBubbles(true);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseBubbles();
    else resumeBubbles();
  });
}



    // ==================== ADVANCED SCROLL REVEAL ====================
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Stop observing after reveal for performance
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal-elegant').forEach(el => observer.observe(el));

    // ==================== PREMIUM NAVBAR BEHAVIOR ====================
    let navScrollTicking = false;
    window.addEventListener('scroll', () => {
      if (navScrollTicking) return;
      navScrollTicking = true;
      requestAnimationFrame(() => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
          if (window.scrollY > 80) navbar.classList.add('nav-scrolled-premium');
          else navbar.classList.remove('nav-scrolled-premium');
        }
        navScrollTicking = false;
      });
    }, { passive: true });

    // ==================== MOBILE MENU ====================
    let mobileMenuScrollY = 0;

    function setMobileMenuOpen(willOpen) {
      const menu = document.getElementById('mobileMenu');
      const backdrop = document.getElementById('mobileMenuBackdrop');
      const scroller = document.getElementById('mobileMenuScroll');
      if (!menu) return;

      menu.classList.toggle('open', willOpen);
      menu.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
      if (backdrop) {
        backdrop.hidden = !willOpen;
        backdrop.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
      }

      if (willOpen) {
        mobileMenuScrollY = window.scrollY || window.pageYOffset || 0;
        document.body.classList.add('mobile-menu-open');
        document.body.style.top = `-${mobileMenuScrollY}px`;
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (scroller) {
          scroller.scrollTop = 0;
          scroller.style.webkitOverflowScrolling = 'touch';
        }
      } else {
        document.body.classList.remove('mobile-menu-open');
        document.body.style.top = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.scrollTo(0, mobileMenuScrollY);
      }
    }

    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      if (!menu) return;
      setMobileMenuOpen(!menu.classList.contains('open'));
    }

    window.toggleMobileMenu = toggleMobileMenu;

    // ==================== PREMIUM NOTIFICATIONS ====================
    function showNotification(title, msg, type = 'success') {
      const notif = document.getElementById('notification');
      document.getElementById('notifTitle').textContent = title;
      document.getElementById('notifMsg').textContent = msg;
      
      // Update icon based on type
      const icon = notif.querySelector('i');
      if (type === 'error') {
        icon.className = 'fas fa-exclamation-triangle';
        notif.querySelector('div:first-child').className = 'w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center flex-shrink-0';
        icon.className = 'fas fa-exclamation-triangle text-white text-lg';
      } else {
        icon.className = 'fas fa-check';
        notif.querySelector('div:first-child').className = 'w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0';
        icon.className = 'fas fa-check text-white text-lg';
      }
      
      notif.classList.add('show');
      setTimeout(() => notif.classList.remove('show'), 4000);
    }


// ==================== RENDER PREMIUM PRODUCTS ====================
function getLoadMoreControls() {
  const wrapper = document.getElementById('loadMoreWrapper') || document.querySelector('#products .text-center.mt-16');
  const button = document.getElementById('loadMoreProductsBtn') || (wrapper ? wrapper.querySelector('button') : null);
  return { wrapper, button };
}

function preserveProductsViewport(updateFn) {
  const anchor = document.getElementById('loadMoreWrapper') || document.getElementById('productsGrid');
  const beforeTop = anchor ? anchor.getBoundingClientRect().top : null;
  const beforeHeight = document.documentElement.scrollHeight;

  updateFn();

  requestAnimationFrame(() => {
    if (anchor && beforeTop !== null) {
      const afterTop = anchor.getBoundingClientRect().top;
      const delta = afterTop - beforeTop;
      if (Math.abs(delta) > 1) {
        window.scrollBy({ top: delta, left: 0, behavior: 'auto' });
      }
    }

    const afterHeight = document.documentElement.scrollHeight;
    if (beforeHeight !== afterHeight && window.scrollY + window.innerHeight > afterHeight) {
      window.scrollTo({ top: Math.max(0, afterHeight - window.innerHeight), behavior: 'auto' });
    }
  });
}

function getDefaultOptionIndex(product) {
  if (!Array.isArray(product?.options) || !product.options.length) return -1;
  const byFlag = product.options.findIndex(opt => opt.isDefault === true);
  if (byFlag >= 0) return byFlag;
  const byNormal = product.options.findIndex(opt => opt.id === 'normal');
  if (byNormal >= 0) return byNormal;
  return 0;
}

function renderProducts(filter = 'all') {
  currentProductsFilter = filter;

  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  const visibleProducts = filtered.slice(0, visibleProductsLimit);
  const { wrapper, button } = getLoadMoreControls();

  grid.innerHTML = visibleProducts.map((p, i) => {
    const defaultOptIdx = getDefaultOptionIndex(p);
    if (defaultOptIdx >= 0) {
      p.selectedOptionIdx = defaultOptIdx;
    }
    const activeOption = defaultOptIdx >= 0 ? p.options[defaultOptIdx] : null;
    const displayPrice = activeOption ? Number(activeOption.price) : Number(p.price);
    const primarySpec = p.specs.volume || p.specs.weight || '';

    return `
    <div class="reveal-elegant reveal-delay-${(i % 4) + 1} product-card-premium glass-elegant" data-category="${p.category}">
      ${p.badge ? `<div class="product-badge-premium">${p.badge}</div>` : ''}

      <div class="relative h-56 overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center group">
        <img loading="lazy" decoding="async" src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"/>
        <div class="hidden absolute inset-0 items-center justify-center bg-slate-900/50">
          <span class="text-7xl">${p.emoji}</span>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <button onclick="showProductDetails(${p.id})" class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-sm font-medium text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 flex items-center gap-2">
          <i class="fas fa-eye"></i>
          عرض التفاصيل
        </button>
      </div>

      <div class="p-5 card-content flex flex-col">
        <h3 class="text-lg font-bold mb-1.5">${p.name}</h3>
        <p class="text-xs text-slate-400 mb-3 line-clamp-2">${p.description}</p>

        <div class="flex flex-wrap gap-1.5 mb-4">
          ${primarySpec ? `<span class="spec-badge"><i class="fas fa-ruler-combined text-cyan-400 text-xs"></i> ${primarySpec}</span>` : ''}
          ${p.specs.shelfLife ? `<span class="spec-badge"><i class="fas fa-clock text-blue-400 text-xs"></i> ${p.specs.shelfLife.split('|')[0].replace('مبرد: ', '').replace('عادي: ', '')}</span>` : ''}
          ${p.category === 'carton' ? `<span class="spec-badge"><i class="fas fa-temperature-low text-cyan-400 text-xs"></i> خيار التبريد</span>` : ''}
        </div>

        ${p.options ? `
          <div class="mb-4">
            <div class="option-selector-premium">
              ${p.options.map((opt, idx) => `
                <button type="button" onclick="selectOption(${p.id}, ${idx}, this)" class="option-btn-premium ${idx === defaultOptIdx ? 'active' : ''}" data-opt="${idx}" data-price="${opt.price}" data-option-id="${opt.id}">
                  ${opt.label}
                </button>
              `).join('')}
            </div>
            <p id="option-desc-${p.id}" class="text-xs text-slate-500 mt-2 min-h-[24px]">${activeOption ? activeOption.description : ''}</p>
          </div>
        ` : ''}

        <div class="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <span class="text-2xl font-black gradient-text-premium" id="price-${p.id}">${formatPrice(displayPrice)}</span>
            <span class="text-xs text-slate-500 block mt-0.5">دينار أردني</span>
          </div>
          <div class="product-qty-stepper" data-product-qty="${p.id}">
            <button type="button" class="product-qty-btn" data-qty-minus="${p.id}" onclick="adjustProductQty(${p.id}, -1)" aria-label="إنقاص الكمية">−</button>
            <span class="product-qty-value" id="qty-display-${p.id}">0</span>
            <button type="button" class="product-qty-btn product-qty-btn-plus" data-qty-plus="${p.id}" onclick="adjustProductQty(${p.id}, 1)" aria-label="زيادة الكمية">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
  }).join('');

  if (wrapper && button) {
    if (filtered.length > INITIAL_PRODUCTS_LIMIT) {
      wrapper.style.display = 'block';
      button.innerHTML = visibleProductsLimit >= filtered.length
        ? '<i class="fas fa-minus"></i> إخفاء المنتجات الإضافية'
        : '<i class="fas fa-plus"></i> عرض المزيد من المنتجات';
    } else {
      wrapper.style.display = 'none';
    }
  }

  setTimeout(() => {
    document.querySelectorAll('.reveal-elegant').forEach(el => {
      if (!el.classList.contains('active')) observer.observe(el);
    });
    init3DTilt();
    syncProductCardQuantities();
  }, 100);
}

function toggleMoreProducts() {
  const filtered = currentProductsFilter === 'all'
    ? products
    : products.filter(p => p.category === currentProductsFilter);

  preserveProductsViewport(() => {
    visibleProductsLimit = visibleProductsLimit >= filtered.length
      ? INITIAL_PRODUCTS_LIMIT
      : filtered.length;

    renderProducts(currentProductsFilter);
  });
}

function showMoreProducts() {
  toggleMoreProducts();
}

    // Show product details modal (simplified for this demo)
    function showProductDetails(productId) {
      const product = products.find(p => p.id === productId);
      if (!product) return;
      
      // In a real app, this would open a modal with full details
      showNotification('تفاصيل المنتج', `${product.name}\n${product.fullDescription}`, 'info');
    }

    function selectOption(productId, optIdx, btn) {
      const product = products.find(p => p.id === productId);
      if (!product?.options?.[optIdx]) return;
      const option = product.options[optIdx];

      // Update selected option UI
      const parent = btn?.parentElement || document.querySelector(`#option-desc-${productId}`)?.previousElementSibling;
      if (parent) {
        parent.querySelectorAll('.option-btn-premium').forEach(b => b.classList.remove('active'));
      }
      if (btn) btn.classList.add('active');

      // Keep displayed price synced with selected option
      const priceEl = document.getElementById(`price-${productId}`);
      if (priceEl) priceEl.textContent = formatPrice(Number(option.price));
      
      // Update description
      const descEl = document.getElementById(`option-desc-${productId}`);
      if (descEl) {
        descEl.textContent = option.description || '';
        descEl.classList.add('animate-fade-scale');
        setTimeout(() => descEl.classList.remove('animate-fade-scale'), 500);
      }

      // Store selected option in product object for cart logic
      product.selectedOptionIdx = optIdx;
      syncProductCardQuantities(productId);
    }

    function formatPrice(price) {
      return new Intl.NumberFormat('ar-JO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    }

    function getSelectedOptionMeta(product) {
      if (!product?.options?.length) {
        return { optionId: null, optionLabel: null, price: Number(product?.price || 0) };
      }
      const optIdx = product.selectedOptionIdx !== undefined
        ? product.selectedOptionIdx
        : getDefaultOptionIndex(product);
      const selectedOption = product.options[Math.max(0, optIdx)];
      return {
        optionId: selectedOption.id,
        optionLabel: selectedOption.label,
        price: Number(selectedOption.price)
      };
    }

    function getCartQtyForProduct(productId, optionId = null) {
      const item = cart.find(entry =>
        entry.id === productId &&
        (optionId == null ? entry.optionId == null : entry.optionId === optionId)
      );
      return item ? item.qty : 0;
    }

    function syncProductCardQuantities(productId = null) {
      const list = productId == null
        ? products
        : products.filter(p => p.id === Number(productId));

      list.forEach(product => {
        const qtyEl = document.getElementById(`qty-display-${product.id}`);
        if (!qtyEl) return;
        const { optionId } = getSelectedOptionMeta(product);
        const qty = getCartQtyForProduct(product.id, optionId);
        qtyEl.textContent = String(qty);
        qtyEl.classList.toggle('has-qty', qty > 0);

        const minusBtn = document.querySelector(`[data-qty-minus="${product.id}"]`);
        if (minusBtn) {
          minusBtn.disabled = qty <= 0;
          minusBtn.classList.toggle('is-disabled', qty <= 0);
        }

        const stepper = document.querySelector(`[data-product-qty="${product.id}"]`);
        if (stepper) stepper.classList.toggle('is-active', qty > 0);
      });
    }

    function adjustProductQty(productId, delta) {
      const product = products.find(p => p.id === productId);
      if (!product || !delta) return;

      const { optionId, optionLabel, price } = getSelectedOptionMeta(product);
      const existingIndex = cart.findIndex(item =>
        item.id === productId && item.optionId === optionId
      );

      if (delta > 0) {
        if (existingIndex === -1) {
          cart.push({
            id: product.id,
            name: product.name,
            price,
            qty: 1,
            image: product.image,
            emoji: product.emoji,
            optionLabel,
            optionId,
            basePrice: product.basePrice || product.price,
            category: product.category
          });
          showNotification('✅ تمت الإضافة', `${product.name}${optionLabel ? ` (${optionLabel})` : ''} — الكمية 1`, 'success');
        } else {
          cart[existingIndex].qty += 1;
        }
      } else if (existingIndex !== -1) {
        cart[existingIndex].qty -= 1;
        if (cart[existingIndex].qty <= 0) {
          cart.splice(existingIndex, 1);
        }
      } else {
        return;
      }

      const qtyEl = document.getElementById(`qty-display-${productId}`);
      if (qtyEl) {
        qtyEl.classList.add('qty-pulse');
        setTimeout(() => qtyEl.classList.remove('qty-pulse'), 280);
      }

      updateCartUI();
      syncProductCardQuantities(productId);
    }

    window.adjustProductQty = adjustProductQty;
    window.syncProductCardQuantities = syncProductCardQuantities;


// ==================== FILTER PRODUCTS ====================
function filterProducts(category) {
  visibleProductsLimit = INITIAL_PRODUCTS_LIMIT;
  currentProductsFilter = category;

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/30');
    btn.classList.add('text-slate-400', 'border-white/10');
  });

  const activeBtn = (typeof event !== 'undefined' && event.currentTarget) ? event.currentTarget : null;
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/30');
    activeBtn.classList.remove('text-slate-400', 'border-white/10');
  }

  const grid = document.getElementById('productsGrid');
  grid.style.opacity = '0.7';
  grid.style.transform = 'scale(0.98)';

  setTimeout(() => {
    renderProducts(category);
    grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    grid.style.opacity = '1';
    grid.style.transform = 'scale(1)';
    setTimeout(() => {
      grid.style.transition = '';
    }, 300);
  }, 200);
}

    // ==================== ENHANCED CART FUNCTIONS ====================
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      let price = product.price;
      let optionLabel = null;
      let optionId = null;

      // Handle products with options (chilled vs normal)
      if (product.options) {
        const optIdx = product.selectedOptionIdx !== undefined
          ? product.selectedOptionIdx
          : getDefaultOptionIndex(product);
        const selectedOption = product.options[Math.max(0, optIdx)];
        price = Number(selectedOption.price);
        optionLabel = selectedOption.label;
        optionId = selectedOption.id;
        product.selectedOptionIdx = Math.max(0, optIdx);
      }

      // Check if item with same option already exists in cart
      const existingIndex = cart.findIndex(item => 
        item.id === productId && 
        item.optionId === optionId
      );
      
      if (existingIndex !== -1) {
        // Update quantity if exists
        cart[existingIndex].qty++;
        showNotification('✅ تم التحديث', `تم زيادة كمية ${product.name} (${optionLabel || 'بدون خيار'}) في السلة`, 'success');
      } else {
        // Add new item with option details
        cart.push({
          id: productId,
          name: product.name,
          emoji: product.emoji,
          image: product.image,
          price: price,
          basePrice: product.basePrice || product.price,
          qty: 1,
          optionLabel: optionLabel,
          optionId: optionId,
          category: product.category
        });
        showNotification('✅ تمت الإضافة', `${product.name} ${optionLabel ? `(${optionLabel})` : ''} أُضيف إلى سلة طلباتك`, 'success');
      }

      updateCartUI();
      syncProductCardQuantities(productId);

      // Add subtle animation to cart badge
      ['cartCount', 'cartCountCompact'].forEach((id) => {
        const badge = document.getElementById(id);
        if (badge && !badge.classList.contains('hidden')) {
          badge.classList.add('animate-cart-pulse');
          setTimeout(() => badge.classList.remove('animate-cart-pulse'), 600);
        }
      });
    }

    function updateCartUI() {
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      const badges = [
        document.getElementById('cartCount'),
        document.getElementById('cartCountCompact'),
        document.getElementById('mobileCartCount')
      ].filter(Boolean);

      badges.forEach((badge) => {
        if (totalItems > 0) {
          badge.textContent = totalItems;
          badge.classList.remove('hidden', 'is-hidden');
          badge.classList.add('flex', 'cart-badge-premium');
        } else {
          badge.classList.add('hidden', 'is-hidden');
          badge.classList.remove('flex', 'cart-badge-premium');
        }
      });

      syncProductCardQuantities();
    }

    function showCart() {
      document.getElementById('mainContent')?.classList.add('hidden');
      document.getElementById('aiChatPage')?.classList.remove('active');
      document.getElementById('orderConfirmPage')?.classList.remove('active');
      document.getElementById('cartPage')?.classList.add('active');
      renderCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderCart() {
      const itemsContainer = document.getElementById('cartItems');
      const emptyCart = document.getElementById('emptyCart');
      const summary = document.getElementById('cartSummary');

      if (cart.length === 0) {
        itemsContainer.innerHTML = '';
        emptyCart.classList.remove('hidden');
        summary.classList.add('hidden');
        return;
      }

      emptyCart.classList.add('hidden');
      summary.classList.remove('hidden');

      itemsContainer.innerHTML = cart.map((item, idx) => {
        // Get product details for additional info
        const product = products.find(p => p.id === item.id);
        
        return `
        <div class="glass-elegant rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover-lift-elegant border border-white/10">
          <!-- Product Image -->
          <div class="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center border border-white/10">
            <img loading="lazy" decoding="async" src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'text-4xl\\'>${item.emoji}</span>';">
          </div>
          
          <!-- Product Details -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h4 class="font-bold text-lg mb-1">${item.name}</h4>
                ${item.optionLabel ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-2">
                  <i class="fas fa-temperature-low"></i>
                  ${item.optionLabel}
                </span>` : ''}
                <p class="text-sm text-slate-400 mb-2">${product?.description || ''}</p>
                
                <!-- Premium Specs Preview -->
                ${product?.specs ? `
                <div class="flex flex-wrap gap-1.5 mb-2">
                  ${product.specs.volume ? `<span class="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded">${product.specs.volume}</span>` : ''}
                  ${product.specs.shelfLife ? `<span class="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded">${product.specs.shelfLife.split('|')[0]}</span>` : ''}
                </div>
                ` : ''}
              </div>
              <button onclick="removeFromCart(${idx})" class="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors flex-shrink-0 tooltip-premium">
                <i class="fas fa-trash-alt text-red-400"></i>
                <span class="tooltip-text">إزالة من السلة</span>
              </button>
            </div>
            
            <!-- Price and Quantity Controls -->
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
              <div>
                <span class="text-xl font-black gradient-text-premium">${formatPrice(item.price)}</span>
                <span class="text-xs text-slate-500 block">لكل وحدة</span>
              </div>
              <div class="flex items-center gap-2.5 bg-white/5 rounded-xl p-1">
                <button onclick="changeQty(${idx}, -1)" class="qty-btn-premium">−</button>
                <span class="w-9 text-center font-bold text-lg">${item.qty}</span>
                <button onclick="changeQty(${idx}, 1)" class="qty-btn-premium">+</button>
              </div>
            </div>
          </div>
        </div>
      `}).join('');

      // Update totals with premium formatting
      updateCartTotalsPreview();
      
      // Free delivery badge animation
      const deliveryEl = document.getElementById('deliveryFee');
      deliveryEl.classList.add('animate-pulse');
      setTimeout(() => deliveryEl.classList.remove('animate-pulse'), 2000);
    }

    function changeQty(idx, delta) {
      cart[idx].qty += delta;
      if (cart[idx].qty <= 0) {
        const removedItem = cart.splice(idx, 1)[0];
        showNotification('🗑️ تم الحذف', `${removedItem.name} أُزيل من سلة طلباتك`, 'success');
      }
      updateCartUI();
      renderCart();
    }

    function removeFromCart(idx) {
      const item = cart[idx];
      cart.splice(idx, 1);
      updateCartUI();
      renderCart();
      showNotification('🗑️ تم الحذف', `${item.name} ${item.optionLabel ? `(${item.optionLabel})` : ''} أُزيل من سلة طلباتك`, 'success');
    }

    function getGeoPosition(options) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }

    function describeGeoError(error) {
      if (!error) return 'تعذر تحديد الموقع';
      if (error.code === 1) {
        return 'تم رفض إذن الموقع. من إعدادات المتصفح/الهاتف اسمح بالوصول للموقع لهذا الموقع ثم أعد المحاولة.';
      }
      if (error.code === 2) return 'الموقع غير متاح حالياً. تأكد أن GPS/الموقع مفعّل على الهاتف.';
      if (error.code === 3) return 'انتهت مهلة تحديد الموقع. حاول مرة أخرى مع إبقاء الشاشة مفتوحة.';
      return error.message || 'تعذر تحديد الموقع';
    }

    async function resolveGpsPosition(onAttempt) {
      const attempts = [
        { label: 'سريع', enableHighAccuracy: false, timeout: 10000, maximumAge: 180000 },
        { label: 'دقيق', enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      ];

      let lastError = null;
      for (const attempt of attempts) {
        try {
          if (typeof onAttempt === 'function') onAttempt(attempt.label);
          const position = await getGeoPosition({
            enableHighAccuracy: attempt.enableHighAccuracy,
            timeout: attempt.timeout,
            maximumAge: attempt.maximumAge
          });
          if (position?.coords) return position;
        } catch (error) {
          lastError = error;
          if (error && error.code === 1) throw error;
        }
      }
      throw lastError || new Error('تعذر تحديد الموقع');
    }

    async function useCurrentLocation() {
      const statusEl = document.getElementById('gpsStatus');
      const btn = document.getElementById('useGpsBtn');
      const mapsLink = document.getElementById('gpsMapsLink');

      if (!window.isSecureContext) {
        const message = 'تحديد الموقع يحتاج فتح الموقع عبر HTTPS (وليس ملف محلي).';
        if (statusEl) {
          statusEl.textContent = message;
          statusEl.className = 'mt-2 text-xs text-red-400';
        }
        showNotification('⚠️ غير آمن', message, 'error');
        return;
      }

      if (!navigator.geolocation) {
        showNotification('⚠️ غير مدعوم', 'متصفحك لا يدعم تحديد الموقع الجغرافي', 'error');
        return;
      }

      const original = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديد...';
      }
      if (statusEl) {
        statusEl.textContent = 'جاري الحصول على موقعك الحالي...';
        statusEl.className = 'mt-2 text-xs text-cyan-300';
      }

      try {
        if (navigator.permissions?.query) {
          try {
            const permission = await navigator.permissions.query({ name: 'geolocation' });
            if (permission.state === 'denied') {
              throw { code: 1, message: 'permission denied' };
            }
          } catch (permErr) {
            if (permErr && permErr.code === 1) throw permErr;
          }
        }

        const position = await resolveGpsPosition((label) => {
          if (statusEl) statusEl.textContent = `جاري تحديد الموقع (${label})...`;
        });
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = Number(position.coords.accuracy || 0);

        document.getElementById('customerLat').value = String(lat);
        document.getElementById('customerLng').value = String(lng);

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        if (mapsLink) {
          mapsLink.href = mapsUrl;
          mapsLink.classList.remove('hidden');
        }

        let addressText = `موقع GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        if (statusEl) statusEl.textContent = 'تم التقاط الإحداثيات، جاري تحسين العنوان...';

        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 6000);
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&accept-language=ar`,
            {
              headers: { Accept: 'application/json' },
              signal: controller.signal
            }
          );
          clearTimeout(timer);
          if (response.ok) {
            const data = await response.json();
            if (data?.display_name) addressText = data.display_name;
          }
        } catch (error) {
          console.warn('Reverse geocode failed:', error);
        }

        const addressInput = document.getElementById('customerAddress');
        if (addressInput) {
          const current = addressInput.value.trim();
          if (!current || current.includes('GPS') || current.startsWith('موقع GPS')) {
            addressInput.value = addressText;
          }
        }

        const accuracyText = accuracy > 0 ? ` (دقة تقريبية ${Math.round(accuracy)}م)` : '';
        if (statusEl) {
          statusEl.textContent = `تم تحديد الموقع: ${lat.toFixed(5)}, ${lng.toFixed(5)}${accuracyText}`;
          statusEl.className = 'mt-2 text-xs text-emerald-400';
        }
        showNotification('📍 تم تحديد الموقع', 'تم حفظ إحداثيات GPS مع الطلب', 'success');
      } catch (error) {
        const message = describeGeoError(error);
        if (statusEl) {
          statusEl.textContent = message;
          statusEl.className = 'mt-2 text-xs text-red-400';
        }
        showNotification('⚠️ فشل GPS', message, 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = original;
        }
      }
    }

    const DIGITAL_BOOK_CREDITS = { 11: 25, 12: 20, 13: 25, 14: 30 };

    function getRefillCartQty() {
      return cart
        .filter(item => Number(item.id) === REFILL_PRODUCT_ID)
        .reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    }

    function getCartDigitalBookCredits() {
      return cart.reduce((sum, item) => {
        const per = DIGITAL_BOOK_CREDITS[Number(item.id)];
        return per ? sum + per * (Number(item.qty) || 0) : sum;
      }, 0);
    }

    /** Available coupons for this checkout: account/guest balance + books in the same cart. */
    function getEffectiveCouponAvailable() {
      const acc = getPrimaryCouponAccount();
      const sessionBase = acc ? Number(acc.available ?? acc.remaining) || 0 : 0;
      const bookEl = (document.getElementById('couponBookNumber')?.value || '').trim().toUpperCase();
      const guestMatchesBook =
        Boolean(guestCouponLookup.bookNumber) &&
        Boolean(bookEl) &&
        guestCouponLookup.bookNumber === bookEl;
      const guestBase = guestMatchesBook ? Number(guestCouponLookup.available) || 0 : 0;
      const base = Math.max(sessionBase, guestBase);
      return Math.max(0, base + getCartDigitalBookCredits());
    }

    function applyGuestCouponAccounts(accounts, phone = '') {
      const list = (accounts || []).filter(a => a.serviceType === 'external');
      if (!list.length) {
        guestCouponLookup = { available: 0, bookNumber: '', phone: phone || '' };
        return null;
      }
      const match = list[0];
      guestCouponLookup = {
        available: Number(match.available ?? match.remaining) || 0,
        bookNumber: String(match.bookNumber || '').toUpperCase(),
        phone: phone || match.phone || ''
      };
      return match;
    }

    async function lookupCouponByBookNumber(bookNumber, { silent = false } = {}) {
      const code = String(bookNumber || '').trim().toUpperCase();
      if (!code || code.length < 6) return null;
      const statusEl = document.getElementById('couponBalanceStatus');
      try {
        const data = await puredropApiRequest(
          `/api/coupons/balance?bookNumber=${encodeURIComponent(code)}`
        );
        const match = applyGuestCouponAccounts(data.accounts || [], data.phone || '');
        if (!match) return null;
        const bookEl = document.getElementById('couponBookNumber');
        if (bookEl && match.bookNumber) bookEl.value = match.bookNumber;
        const payBox = document.getElementById('payWithDigitalCoupon');
        if (payBox && getRefillCartQty() > 0 && !preferCashPayment) payBox.checked = true;
        syncCouponRedeemQtyFromCart();
        updateCartTotalsPreview();
        const text = `دفتر ${match.bookNumber}: متاح ${match.available ?? match.remaining} كابون`;
        if (statusEl) statusEl.textContent = text + ' — يمكنك الطلب بدون تسجيل دخول.';
        if (!silent) showNotification('✅ رصيد الدفتر', text, 'success');
        return match;
      } catch (error) {
        if (!silent && statusEl) statusEl.textContent = error.message || 'تعذر التحقق من رقم الدفتر';
        if (!silent) showNotification('❌ تعذر التحقق', error.message || 'تحقق من رقم الدفتر', 'error');
        return null;
      }
    }

    /** Smallest packs that cover a coupon shortage (for same-cart top-up). */
    function getSuggestedBooksForShortage(shortage) {
      const need = Math.max(0, Number(shortage) || 0);
      if (need <= 0) return [];
      const packs = [
        { id: 12, credits: 20, label: 'دفتر 20' },
        { id: 13, credits: 25, label: 'دفتر 25+' },
        { id: 11, credits: 25, label: 'دفتر 25' },
        { id: 14, credits: 30, label: 'دفتر 30' }
      ];
      const covering = packs
        .filter(p => p.credits >= need)
        .sort((a, b) => a.credits - b.credits || a.id - b.id);
      // Prefer the smallest covering pack + one larger option if different.
      const picks = [];
      if (covering[0]) picks.push(covering[0]);
      const larger = covering.find(p => p.credits > (covering[0]?.credits || 0));
      if (larger) picks.push(larger);
      if (!picks.length) {
        // Shortage bigger than largest single pack: suggest largest pack (may need qty>1 later).
        picks.push(packs[packs.length - 1]);
      }
      return picks.map(p => {
        const product = typeof getProductById === 'function' ? getProductById(p.id) : null;
        const price = product ? Number(product.price) : null;
        return { ...p, price, name: product?.name || p.label };
      });
    }

    function addBookToCoverCouponShortage(productId) {
      const id = Number(productId);
      if (![11, 12, 13, 14].includes(id)) return;
      addToCart(id);
      preferCashPayment = false;
      const payBox = document.getElementById('payWithDigitalCoupon');
      if (payBox) payBox.checked = true;
      syncCouponRedeemQtyFromCart();
      updateCartTotalsPreview();
      renderCart?.();
      const available = getEffectiveCouponAvailable();
      const refillQty = getRefillCartQty();
      if (refillQty <= available) {
        showNotification(
          '✅ تم إضافة الدفتر',
          `الرصيد يصبح ${available} كابون ويكفي لتعبئة ${refillQty}. يمكنك تأكيد الطلب الآن.`,
          'success'
        );
      } else {
        const stillNeed = refillQty - available;
        showNotification(
          '📘 أُضيف الدفتر',
          `ما زال ينقصك ${stillNeed} كابون. أضف دفتراً آخر أو قلّل كمية التعبئة.`,
          'info'
        );
      }
    }

    function renderCouponTopUpSuggest(refillQty, available) {
      const box = document.getElementById('couponBookTopUpSuggest');
      const textEl = document.getElementById('couponBookTopUpText');
      const buttonsEl = document.getElementById('couponBookTopUpButtons');
      if (!box || !textEl || !buttonsEl) return;

      const shortage = Math.max(0, refillQty - available);
      if (shortage <= 0) {
        box.classList.add('is-hidden', 'hidden');
        buttonsEl.innerHTML = '';
        return;
      }

      const suggestions = getSuggestedBooksForShortage(shortage);
      textEl.textContent = `رصيدك الحالي ${available} كابون وتطلب ${refillQty} تعبئة — ينقصك ${shortage} كابون. أضف دفتراً رقمياً لنفس السلة ليُحسب الرصيد الجديد فوراً ويكمل الطلب.`;
      buttonsEl.innerHTML = suggestions.map(s => {
        const priceTxt = s.price != null ? ` • ${formatPrice(s.price)} JOD` : '';
        return `<button type="button" class="px-3 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors" onclick="addBookToCoverCouponShortage(${s.id})">+ ${s.label} (${s.credits} كابون${priceTxt})</button>`;
      }).join('');

      // Also offer reducing qty to available balance.
      if (available > 0) {
        buttonsEl.innerHTML += `<button type="button" class="px-3 py-2 rounded-xl text-xs font-bold border border-slate-500 text-slate-200 hover:bg-white/5 transition-colors" onclick="setRefillQtyToAvailableCoupons()">تقليل التعبئة إلى ${available}</button>`;
      }

      box.classList.remove('is-hidden', 'hidden');
    }

    function setRefillQtyToAvailableCoupons() {
      let keep = Math.max(0, getEffectiveCouponAvailable());
      cart.forEach(item => {
        if (Number(item.id) !== REFILL_PRODUCT_ID) return;
        const qty = Number(item.qty) || 0;
        if (keep <= 0) item.qty = 0;
        else if (qty > keep) {
          item.qty = keep;
          keep = 0;
        } else {
          keep -= qty;
        }
      });
      cart = cart.filter(item => (Number(item.qty) || 0) > 0);
      updateCartUI();
      renderCart();
      syncCouponRedeemQtyFromCart();
      updateCartTotalsPreview();
      showNotification('✅ تم التعديل', `تم تقليل التعبئة لتتوافق مع رصيدك (${getRefillCartQty()} تعبئة).`, 'success');
    }

    function isPayingWithDigitalCoupon() {
      const payBox = document.getElementById('payWithDigitalCoupon');
      return !!payBox?.checked;
    }

    function syncCouponRedeemQtyFromCart() {
      const payBox = document.getElementById('payWithDigitalCoupon');
      const qtyInput = document.getElementById('couponRedeemQty');
      const refillQty = getRefillCartQty();
      const bookFields = document.getElementById('couponBookFields');
      const refillLabel = document.getElementById('cartRefillQtyLabel');
      const redeemLabel = document.getElementById('couponRedeemQtyLabel');
      const bookNumber = (document.getElementById('couponBookNumber')?.value || '').trim();

      if (refillLabel) refillLabel.textContent = String(refillQty);

      const hasDigitalBookInCart = cart.some(item => [11, 12, 13, 14].includes(Number(item.id)));

      // Auto-suggest coupon pay only if customer did not choose cash.
      if (
        payBox &&
        refillQty > 0 &&
        !payBox.checked &&
        !preferCashPayment &&
        (bookNumber || hasDigitalBookInCart)
      ) {
        payBox.checked = true;
      }

      const payWithCoupon = isPayingWithDigitalCoupon();

      // Coupons always equal refill qty when paying with digital coupon.
      const redeemQty = payWithCoupon && refillQty > 0 ? refillQty : 0;
      if (qtyInput) {
        qtyInput.value = String(redeemQty);
        qtyInput.max = String(Math.max(0, refillQty));
      }
      if (redeemLabel) {
        redeemLabel.textContent = String(redeemQty);
        redeemLabel.style.color = '';
      }

      // Book number field stays editable (was previously locked / overlapping with disabled styles).
      if (bookFields) {
        bookFields.classList.remove('opacity-60', 'pointer-events-none');
        bookFields.style.opacity = refillQty > 0 || payWithCoupon ? '1' : '0.85';
      }
      const bookInput = document.getElementById('couponBookNumber');
      if (bookInput) {
        bookInput.disabled = false;
        bookInput.readOnly = false;
        bookInput.removeAttribute('aria-disabled');
      }
      const bookRequiredMark = document.getElementById('couponBookRequiredMark');
      const firstHint = document.getElementById('firstOrderBookHint');
      if (bookRequiredMark) {
        bookRequiredMark.classList.toggle('hidden', hasDigitalBookInCart && !bookNumber);
      }
      if (firstHint) {
        firstHint.textContent = hasDigitalBookInCart
          ? 'أول طلب مع دفتر في السلة: يمكنك ترك رقم الدفتر فارغاً — يُنشأ تلقائياً ويُستخدم مع التعبئة في نفس الطلب.'
          : 'اكتب رقم دفترك هنا. إن لم يكن لديك دفتر بعد، أضف دفتراً رقمياً مع التعبئة في أول طلب.';
      }

      const available = getEffectiveCouponAvailable();
      const statusEl = document.getElementById('couponBalanceStatus');
      const limitWarn = document.getElementById('couponLimitWarning');
      if (payWithCoupon && refillQty > 0) {
        if (refillQty > available) {
          const shortage = refillQty - available;
          if (statusEl) {
            statusEl.textContent = `ينقصك ${shortage} كابون لإكمال ${refillQty} تعبئة (المتاح ${available}). أضف دفتراً جديداً أدناه أو قلّل الكمية.`;
            statusEl.classList.add('text-red-300');
            statusEl.classList.remove('text-slate-400');
          }
          if (limitWarn) {
            limitWarn.textContent = `⛔ الكمية أكبر من الرصيد: متاح ${available} / طلبت ${refillQty}`;
            limitWarn.classList.remove('is-hidden', 'hidden');
          }
          renderCouponTopUpSuggest(refillQty, available);
        } else if (statusEl) {
          statusEl.textContent = `متاح للدفع بالكوبون: ${available} كابون • لهذا الطلب: ${redeemQty}`;
          statusEl.classList.remove('text-red-300');
          statusEl.classList.add('text-slate-400');
          if (limitWarn) limitWarn.classList.add('is-hidden', 'hidden');
          renderCouponTopUpSuggest(refillQty, available);
        }
      } else {
        if (statusEl) {
          statusEl.textContent = preferCashPayment
            ? `الدفع نقداً مفعّل — يمكنك تفعيل الكوبون لاحقاً إن رغبت (متاح ${available} كابون).`
            : `فعّل الدفع بالكوبون أو اتركه معطّلاً للدفع نقداً. المتاح: ${available} كابون.`;
          statusEl.classList.remove('text-red-300');
          statusEl.classList.add('text-slate-400');
        }
        if (limitWarn) limitWarn.classList.add('is-hidden', 'hidden');
        renderCouponTopUpSuggest(0, available);
      }

      const panel = document.getElementById('digitalCouponPanel');
      if (panel) {
        if (refillQty > 0) {
          panel.classList.add('ring-1', 'ring-violet-400/40');
        } else {
          panel.classList.remove('ring-1', 'ring-violet-400/40');
          if (payBox && payBox.checked) payBox.checked = false;
          preferCashPayment = false;
        }
      }
    }

    function estimateCouponDiscountPreview() {
      const payWithCoupon = isPayingWithDigitalCoupon();
      if (!payWithCoupon) return 0;
      const redeemQty = Math.max(0, Number.parseInt(document.getElementById('couponRedeemQty')?.value || '0', 10) || 0);
      if (redeemQty <= 0) return 0;
      const refillPrices = [];
      cart.forEach(item => {
        if (Number(item.id) === REFILL_PRODUCT_ID) {
          for (let i = 0; i < item.qty; i += 1) refillPrices.push(Number(item.price) || 1);
        }
      });
      // Strict: never discount more units than refill qty in cart.
      const use = Math.min(redeemQty, refillPrices.length);
      let discount = 0;
      for (let i = 0; i < use; i += 1) discount += refillPrices[i];
      return discount;
    }

    function updateCartBookSummary() {
      const payWithCoupon = isPayingWithDigitalCoupon();
      const bookNumber = (document.getElementById('couponBookNumber')?.value || '').trim().toUpperCase();
      const redeemQty = Math.max(0, Number.parseInt(document.getElementById('couponRedeemQty')?.value || '0', 10) || 0);
      const refillQty = getRefillCartQty();
      const bookRow = document.getElementById('cartBookNumberRow');
      const bookDisplay = document.getElementById('cartBookNumberDisplay');
      const linkRow = document.getElementById('cartCouponLinkRow');
      const linkText = document.getElementById('cartCouponLinkText');

      if (bookRow && bookDisplay) {
        if (payWithCoupon && bookNumber) {
          bookRow.classList.remove('hidden');
          bookRow.classList.add('flex');
          bookDisplay.textContent = bookNumber;
        } else {
          bookRow.classList.add('hidden');
          bookRow.classList.remove('flex');
          bookDisplay.textContent = '—';
        }
      }

      if (linkRow && linkText) {
        if (payWithCoupon && refillQty > 0) {
          linkRow.classList.remove('hidden');
          linkText.textContent = `${redeemQty} تعبئة = ${redeemQty} كابون لهذا الطلب`;
        } else {
          linkRow.classList.add('hidden');
          linkText.textContent = '';
        }
      }
    }

    function updateCartTotalsPreview() {
      syncCouponRedeemQtyFromCart();
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const couponDiscount = estimateCouponDiscountPreview();
      const total = Math.max(0, subtotal - couponDiscount);
      const subtotalEl = document.getElementById('subtotal');
      const totalEl = document.getElementById('totalPrice');
      const row = document.getElementById('couponDiscountRow');
      const discountEl = document.getElementById('couponDiscountValue');
      if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal) + ' JOD';
      if (totalEl) totalEl.textContent = formatPrice(total) + ' JOD';
      if (row && discountEl) {
        if (couponDiscount > 0) {
          row.classList.remove('hidden');
          row.classList.add('flex');
          discountEl.textContent = '−' + formatPrice(couponDiscount) + ' JOD';
        } else {
          row.classList.add('hidden');
          row.classList.remove('flex');
        }
      }
      updateCartBookSummary();
    }

    async function checkDigitalCouponBalance() {
      const phone = document.getElementById('customerPhone')?.value.trim() || '';
      const bookNumber = (document.getElementById('couponBookNumber')?.value || '').trim().toUpperCase();
      const statusEl = document.getElementById('couponBalanceStatus');
      const jordanPhoneRegex = /^07\d{8,9}$/;

      // Prefer booklet number for guests who already typed it.
      if (bookNumber.length >= 6 && !jordanPhoneRegex.test(phone)) {
        if (statusEl) statusEl.textContent = 'جارٍ التحقق من رقم الدفتر...';
        await lookupCouponByBookNumber(bookNumber);
        return;
      }

      if (!jordanPhoneRegex.test(phone)) {
        if (bookNumber.length >= 6) {
          if (statusEl) statusEl.textContent = 'جارٍ التحقق من رقم الدفتر...';
          await lookupCouponByBookNumber(bookNumber);
          return;
        }
        if (statusEl) statusEl.textContent = 'أدخل رقم الهاتف أو رقم الدفتر ثم اضغط «جلب رقمي».';
        showNotification('⚠️ بيانات ناقصة', 'أدخل رقم الهاتف أو رقم الدفتر للتحقق من الرصيد', 'error');
        return;
      }
      if (statusEl) statusEl.textContent = 'جارٍ التحقق من رصيد الدفتر الرقمي...';
      try {
        const data = await puredropApiRequest(`/api/coupons/balance?phone=${encodeURIComponent(phone)}`);
        const match = applyGuestCouponAccounts(data.accounts || [], phone);
        if (!match) {
          if (statusEl) statusEl.textContent = 'لا يوجد دفتر رقمي خارجي لهذا الرقم بعد. اشترِ دفتراً رقمياً خارجياً أولاً.';
          showNotification('ℹ️ لا رصيد', 'لا يوجد دفتر رقمي خارجي على هذا الرقم حالياً', 'info');
          return;
        }
        const bookEl = document.getElementById('couponBookNumber');
        if (bookEl && match.bookNumber) {
          bookEl.value = match.bookNumber;
        }
        const payBox = document.getElementById('payWithDigitalCoupon');
        if (payBox && getRefillCartQty() > 0 && !preferCashPayment) payBox.checked = true;
        syncCouponRedeemQtyFromCart();
        const text = (data.accounts || [])
          .filter(a => a.serviceType === 'external')
          .map(a => `دفتر ${a.bookNumber || '—'}: متبقي ${a.remaining} • متاح ${a.available ?? a.remaining}`)
          .join(' • ');
        if (statusEl) statusEl.textContent = text + ' — يمكنك الطلب بدون تسجيل دخول.';
        if (document.getElementById('couponRedeemQty')) {
          const refillQty = getRefillCartQty();
          const available = Number(match.available ?? match.remaining) || 0;
          document.getElementById('couponRedeemQty').max = String(Math.max(0, Math.min(available, refillQty || available)));
        }
        updateCartTotalsPreview();
        showNotification('✅ رصيد الدفتر', text, 'success');
      } catch (error) {
        if (statusEl) statusEl.textContent = error.message || 'تعذر جلب الرصيد';
        showNotification('❌ تعذر التحقق', error.message || 'حاول مرة أخرى', 'error');
      }
    }

    window.checkDigitalCouponBalance = checkDigitalCouponBalance;
    window.updateCartTotalsPreview = updateCartTotalsPreview;
    window.addBookToCoverCouponShortage = addBookToCoverCouponShortage;
    window.setRefillQtyToAvailableCoupons = setRefillQtyToAvailableCoupons;

    document.addEventListener('input', (event) => {
      if (event.target && (event.target.id === 'couponRedeemQty' || event.target.id === 'couponBookNumber')) {
        updateCartTotalsPreview();
      }
      if (event.target && event.target.id === 'couponBookNumber') {
        const code = (event.target.value || '').trim().toUpperCase();
        if (guestBookLookupTimer) clearTimeout(guestBookLookupTimer);
        if (code.length < 6) return;
        guestBookLookupTimer = setTimeout(() => {
          lookupCouponByBookNumber(code, { silent: true });
        }, 550);
      }
    });
    document.addEventListener('change', (event) => {
      if (event.target && event.target.id === 'payWithDigitalCoupon') {
        preferCashPayment = !event.target.checked;
        if (preferCashPayment) {
          const qtyInput = document.getElementById('couponRedeemQty');
          if (qtyInput) qtyInput.value = '0';
          showNotification('💵 دفع نقدي', 'تم إلغاء الدفع بالكوبون لهذا الطلب — ستدفع بالدينار.', 'info');
        } else {
          showNotification('🎟️ دفع بالكوبون', 'تم تفعيل الدفع بالكابونات الرقمية.', 'success');
        }
        syncCouponRedeemQtyFromCart();
        updateCartTotalsPreview();
      }
    });

    async function confirmOrder() {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const address = document.getElementById('customerAddress').value.trim();
  const notes = document.getElementById('customerNotes').value.trim();
  const latRaw = document.getElementById('customerLat')?.value;
  const lngRaw = document.getElementById('customerLng')?.value;
  const lat = latRaw ? Number(latRaw) : null;
  const lng = lngRaw ? Number(lngRaw) : null;
  syncCouponRedeemQtyFromCart();
  const payWithCoupon = isPayingWithDigitalCoupon();
  const couponBookNumber = payWithCoupon
    ? (document.getElementById('couponBookNumber')?.value || '').trim().toUpperCase()
    : '';
  const couponRedeemQty = payWithCoupon
    ? Math.max(0, Number.parseInt(document.getElementById('couponRedeemQty')?.value || '0', 10) || 0)
    : 0;

  // Guests may order freely (cash or coupon with booklet). Login is optional.

  const deliveryTimeElement = document.querySelector('input[name="deliveryTime"]:checked');
  const deliveryTimeValue = deliveryTimeElement ? deliveryTimeElement.value : 'asap';

  if (!name || !phone || !address) {
    showNotification('⚠️ تنبيه', 'يرجى ملء جميع الحقول المطلوبة (*) لإتمام الطلب', 'error');
    if (!name) document.getElementById('customerName').classList.add('border-red-500');
    if (!phone) document.getElementById('customerPhone').classList.add('border-red-500');
    if (!address) document.getElementById('customerAddress').classList.add('border-red-500');
    return;
  }

  const jordanPhoneRegex = /^07\d{8,9}$/;
  if (!jordanPhoneRegex.test(phone)) {
    document.getElementById('customerPhone').classList.add('border-red-500');
    showNotification('⚠️ رقم غير صالح', 'يرجى إدخال رقم أردني صحيح يبدأ بـ 07', 'error');
    return;
  }

  if (cart.length === 0) {
    showNotification('⚠️ تنبيه', 'سلة طلباتك فارغة! يرجى إضافة منتجات قبل إتمام الطلب', 'error');
    return;
  }

  const refillQty = getRefillCartQty();
  const hasDigitalBookInCart = cart.some(item => [11, 12, 13, 14].includes(Number(item.id)));
  if (payWithCoupon) {
    if (refillQty <= 0) {
      showNotification('⚠️ تنبيه', 'الدفع بالكوبون متاح لمنتج تعبئة القارورة فقط — أضفه للسلة أولاً', 'error');
      return;
    }
    // First order: allow empty book number if buying a digital book in the same cart
    // (server will create/use the new book automatically).
    if (!couponBookNumber && !hasDigitalBookInCart) {
      showNotification(
        '⚠️ رقم الدفتر مطلوب',
        'اكتب رقم دفترك، أو أضف دفتراً رقمياً للسلة مع التعبئة ليُنشأ الرقم في أول طلب',
        'error'
      );
      document.getElementById('couponBookNumber')?.focus();
      document.getElementById('couponBookNumber')?.classList.add('border-red-500');
      return;
    }
    if (couponRedeemQty !== refillQty) {
      showNotification(
        '⚠️ عدد غير متطابق',
        `عدد الكابونات يجب أن يساوي عدد التعبئة في السلة (${refillQty}).`,
        'error'
      );
      return;
    }
    // Refresh guest booklet balance before validating locally.
    if (couponBookNumber && (!getCustomerToken() || getEffectiveCouponAvailable() < refillQty)) {
      await lookupCouponByBookNumber(couponBookNumber, { silent: true });
    }
    const availableCoupons = getEffectiveCouponAvailable();
    if (refillQty > availableCoupons) {
      const shortage = refillQty - availableCoupons;
      showNotification(
        '⛔ رصيد غير كافٍ',
        `ينقصك ${shortage} كابون. أضف دفتراً رقمياً من الاقتراحات في السلة، أو قلّل التعبئة إلى ${availableCoupons}.`,
        'error'
      );
      document.getElementById('couponBookTopUpSuggest')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      renderCouponTopUpSuggest(refillQty, availableCoupons);
      return;
    }
  }

  const confirmButton = document.querySelector('button[onclick="confirmOrder()"]');
  const originalButtonHtml = confirmButton ? confirmButton.innerHTML : '';
  if (confirmButton) {
    confirmButton.disabled = true;
    confirmButton.classList.add('opacity-70', 'cursor-not-allowed');
    confirmButton.innerHTML = '<i class="fas fa-database animate-pulse"></i> جارٍ حفظ الطلب في قاعدة البيانات...';
  }

  const cartSnapshot = cart.map(item => ({ ...item }));
  const totalItems = cartSnapshot.reduce((sum, item) => sum + item.qty, 0);

  try {
    const orderPayload = {
      customer: {
        name,
        phone,
        address,
        notes,
        lat: Number.isFinite(lat) ? lat : undefined,
        lng: Number.isFinite(lng) ? lng : undefined,
        mapsUrl: (Number.isFinite(lat) && Number.isFinite(lng))
          ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
          : undefined
      },
      deliveryTime: deliveryTimeValue,
      items: cartSnapshot.map(item => ({
        productId: item.id,
        optionId: item.optionId,
        quantity: item.qty
      }))
    };
    if (couponRedeemQty > 0) {
      orderPayload.couponRedeem = {
        quantity: couponRedeemQty,
        bookNumber: couponBookNumber,
        serviceType: 'external'
      };
    }
    await syncCustomerPhoneIfNeeded(phone, name);
    const savedOrder = await saveOrderToDatabase(orderPayload);

    const orderNum = savedOrder.orderNumber;
    const totalAmount = typeof savedOrder.total === 'number'
      ? savedOrder.total
      : cartSnapshot.reduce((sum, item) => sum + (item.price * item.qty), 0);

    document.getElementById('orderNumber').textContent = orderNum;
    document.getElementById('confirmItemsCount').textContent = totalItems;
    document.getElementById('confirmTotal').textContent = formatPrice(totalAmount) + ' JOD';

    const bookWrap = document.getElementById('confirmBookNumberWrap');
    const bookConfirmEl = document.getElementById('confirmBookNumber');
    const issuedBook =
      savedOrder.issuedCoupons?.find(row => row.bookNumber)?.bookNumber ||
      savedOrder.couponBookNumber ||
      null;
    if (bookWrap && bookConfirmEl && issuedBook) {
      bookConfirmEl.textContent = issuedBook;
      bookWrap.classList.remove('hidden');
    } else if (bookWrap) {
      bookWrap.classList.add('hidden');
    }

    cart = [];
    updateCartUI();
    if (document.getElementById('couponRedeemQty')) document.getElementById('couponRedeemQty').value = '0';
    if (document.getElementById('payWithDigitalCoupon')) document.getElementById('payWithDigitalCoupon').checked = false;
    if (document.getElementById('couponBalanceStatus')) {
      document.getElementById('couponBalanceStatus').textContent =
        'لتعبئة القارورة بالكوبون: أدخل رقم دفترك الرقمي. الدفع نقداً = 1 دينار لكل تعبئة، أو كابون خارجي واحد.';
    }
    updateCartTotalsPreview();

    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('cartPage').classList.remove('active');
    document.getElementById('aiChatPage')?.classList.remove('active');
    document.getElementById('orderConfirmPage').classList.add('active');

    if (savedOrder.issuedCoupons?.length) {
      const issuedText = savedOrder.issuedCoupons
        .map(row => `${row.label || 'دفتر رقمي'}: +${row.coupons}${row.bookNumber ? ` • رقم الدفتر ${row.bookNumber}` : ''}`)
        .join(' • ');
      showNotification('📱 رقم دفترك جاهز فوراً', issuedText + ' — احفظ الرقم وسيظهر في حسابك', 'success');
    }
    if (savedOrder.couponsRedeemed > 0) {
      if (savedOrder.couponRedeemStatus === 'applied') {
        showNotification(
          '🎫 تم خصم الكابونات فوراً',
          `خُصم ${savedOrder.couponsRedeemed} كابون من دفترك (${savedOrder.couponBookNumber || couponBookNumber}) لأن هذا طلب متكرر.`,
          'success'
        );
      } else {
        showNotification(
          '🎫 تم حجز الكابونات',
          `أول استخدام: ${savedOrder.couponsRedeemed} كابون محجوزة على دفتر ${savedOrder.couponBookNumber || couponBookNumber}. الخصم النهائي بعد «تم التسليم» من الإدارة.`,
          'info'
        );
      }
    }
    await refreshCustomerSession();

    createConfetti();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification('🎉 تم حفظ الطلب!', 'تم إرسال الطلب مباشرة إلى قاعدة البيانات ولوحة الإدارة', 'success');
  } catch (error) {
    console.error('Order save failed:', error);
    showNotification('❌ تعذر حفظ الطلب', error.message || 'يرجى التأكد من تشغيل الموقع عبر npm start ثم المحاولة مرة أخرى', 'error');
  } finally {
    if (confirmButton) {
      confirmButton.disabled = false;
      confirmButton.classList.remove('opacity-70', 'cursor-not-allowed');
      confirmButton.innerHTML = originalButtonHtml;
    }
  }
}

window.useCurrentLocation = useCurrentLocation;
window.confirmOrder = confirmOrder;

  
    // Premium confetti effect (lightweight)
    function createConfetti() {
      const container = document.getElementById('confettiContainer');
      if (!container) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      container.innerHTML = '';

      const colors = ['#06b6d4', '#0ea5e9', '#3b82f6', '#10b981'];
      const count = window.innerWidth < 768 ? 18 : 28;
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 7 + 4;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.animationDelay = Math.random() * 1.2 + 's';
        confetti.style.animationDuration = Math.random() * 1.5 + 1.8 + 's';
        fragment.appendChild(confetti);
      }
      container.appendChild(fragment);
      setTimeout(() => { container.innerHTML = ''; }, 3800);
    }

    // ==================== PREMIUM NAVIGATION ====================
    function showMain() {
      document.getElementById('mainContent')?.classList.remove('hidden');
      document.getElementById('cartPage')?.classList.remove('active');
      document.getElementById('orderConfirmPage')?.classList.remove('active');
      document.getElementById('aiChatPage')?.classList.remove('active');
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ==================== CONTACT FORM HANDLING ====================
    async function handleContactSubmit(e) {
      e.preventDefault();

      const inputs = e.target.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('border-red-500');
          isValid = false;
        } else {
          input.classList.remove('border-red-500');
        }
      });

      const phoneInput = e.target.querySelector('input[type="tel"]');
      const jordanPhoneRegex = /^07\d{8}$/;
      if (phoneInput && !jordanPhoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add('border-red-500');
        showNotification('⚠️ رقم غير صالح', 'يرجى إدخال رقم أردني صحيح مكوّن من 10 أرقام ويبدأ بـ 07', 'error');
        return;
      }

      if (!isValid) {
        showNotification('⚠️ تنبيه', 'يرجى ملء جميع الحقول المطلوبة (*)', 'error');
        return;
      }

      const textInputs = e.target.querySelectorAll('input[type="text"]');
      const selectInput = e.target.querySelector('select');
      const messageInput = e.target.querySelector('textarea');

      const contactPayload = {
        name: textInputs[0]?.value.trim() || '',
        phone: phoneInput?.value.trim() || '',
        address: textInputs[1]?.value.trim() || '',
        serviceType: selectInput?.value || 'استفسار عام',
        message: messageInput?.value.trim() || ''
      };

      try {
        await saveContactMessageToDatabase(contactPayload);
        showNotification('✅ تم إرسال رسالتك!', 'تم حفظ الرسالة في قاعدة البيانات وسنتواصل معك قريباً', 'success');
        e.target.reset();
        e.target.querySelectorAll('input, textarea').forEach(el => {
          el.classList.remove('border-red-500');
        });
      } catch (error) {
        console.error('Contact database save failed:', error);
        showNotification('❌ تعذر حفظ الرسالة', error.message || 'يرجى التأكد من تشغيل الموقع ثم المحاولة مرة أخرى', 'error');
      }
    }

    function showAIChat() {
      document.getElementById('mainContent')?.classList.add('hidden');
      document.getElementById('cartPage')?.classList.remove('active');
      document.getElementById('orderConfirmPage')?.classList.remove('active');
      document.getElementById('aiChatPage')?.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderAiFaqList();
    }

    // ==================== STORED FAQ ASSISTANT (NO CHAT) ====================
    const AI_FAQ_ITEMS = [
      {
        id: 'prices',
        icon: 'fas fa-tag',
        question: 'ما هي أسعار المنتجات؟',
        answer: 'أسعار منتجات قطرة نقية:\n\n• كرتونة 250مل عادية: 1.25 دينار | مبردة: 1.50 دينار (+0.25)\n• كرتونة 200مل عادية: 1.00 دينار | مبردة: 1.25 دينار (+0.25)\n• شرنك 250مل: 1.25 دينار\n• شرنك 125مل: 1.25 دينار\n• شرنك 1.5 لتر: 1.00 دينار\n• قارورة سعودية 18.9 لتر: 5.00 دينار\n• قارورة أردنية 18.9 لتر: 4.00 دينار\n\nالتوصيل مجاني لجميع مناطق الأردن.'
      },
      {
        id: 'delivery',
        icon: 'fas fa-truck',
        question: 'ما هي مناطق وأوقات التوصيل؟',
        answer: 'معلومات التوصيل:\n\n• عمّان: خلال 25-35 دقيقة تقريباً\n• باقي المحافظات: من 1 إلى 3 ساعات حسب الموقع\n• التوصيل مجاني بالكامل\n• نغطي عمّان وجميع المحافظات الأردنية\n• يتم الاتصال بك قبل الوصول بـ 5-10 دقائق'
      },
      {
        id: 'chilled',
        icon: 'fas fa-snowflake',
        question: 'ما الفرق بين الماء المبرد والعادي؟',
        answer: 'الماء المبرد:\n• معبأ ومبرد إلى 3-5°م\n• جاهز للشرب فوراً\n• يُفضّل استهلاكه خلال 48 ساعة\n\nالماء العادي:\n• بدرجة حرارة الغرفة\n• مناسب للتخزين حتى 6 أشهر\n• خيار اقتصادي للكميات الكبيرة\n\nالجودة والنقاء متماثلان في النوعين.'
      },
      {
        id: 'recommend',
        icon: 'fas fa-lightbulb',
        question: 'ما المنتج الأنسب لي؟',
    answer: 'اختَر حسب احتياجك:\n\n• مناسبات وتجمعات: كرتونة 250مل مبردة + ثلج\n• منزل وعائلة: شرنك 1.5 لتر أو قارورة 18.9 لتر\n• مكتب/شركة: قارورة 18.9 لتر + كراتين عادية\n• رحلات: شرنك 125مل أو كرتونة 200مل مبردة\n\nيمكنك أيضاً تصفح المنتجات وإضافتها للسلة مباشرة.'
      },
      {
        id: 'quality',
        icon: 'fas fa-flask',
        question: 'كيف تضمنون جودة المياه؟',
        answer: 'نلتزم بمعايير صارمة للجودة:\n\n• تنقية متعددة المراحل ونقاء مرتفع\n• تعقيم وتعبئة في بيئة معقمة\n• فحوصات مخبرية دورية\n• ترخيص من الجهات الرسمية الأردنية\n• عبوات آمنة للاستخدام الغذائي'
      },
      {
        id: 'track',
        icon: 'fas fa-map-marker-alt',
        question: 'كيف أتابع طلبي؟',
        answer: 'بعد تأكيد الطلب:\n\n• يظهر لك رقم الطلب مباشرة\n• يتم التواصل معك على رقم الهاتف المسجل\n• يمكنك مراجعة حالة الطلب من لوحة الإدارة (للإدارة)\n• لأي استفسار: تواصل معنا عبر نموذج الاتصال أو الهاتف\n\nحالات الطلب الشائعة: قيد التحضير → في الطريق → تم التسليم.'
      },
      {
        id: 'bulk',
        icon: 'fas fa-building',
        question: 'هل يوجد خصم للطلبات الكبيرة؟',
        answer: 'نعم، نوفر حلول أعمال وطلبات جملة:\n\n• خصومات للكميات الكبيرة والطلبات الدورية\n• توصيل مجدول حسب وقت مناسب لكم\n• مناسب للمطاعم والمكاتب والفنادق\n\nللتفاصيل: استخدم نموذج التواصل في الموقع وسنعاود الاتصال بك.'
      },
      {
        id: 'storage',
        icon: 'fas fa-box',
        question: 'كيف أخزّن المياه والثلج بشكل صحيح؟',
        answer: 'نصائح التخزين:\n\n• الثلج: في الفريزر داخل كيسه الأصلي\n• الماء العادي: مكان بارد وجاف بعيداً عن الشمس\n• الماء المبرد: ضعه في الثلاجة فور الاستلام\n• القوارير الكبيرة: احفظها عمودياً\n• لا تستخدم المنتج إذا تغيّر الطعم أو تلفت العبوة'
      }
    ];

    function formatFaqAnswer(text) {
      return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    }

    function renderAiFaqList() {
      const list = document.getElementById('aiFaqList');
      if (!list) return;

      list.innerHTML = AI_FAQ_ITEMS.map((item) => `
        <div class="ai-faq-item" data-faq-id="${item.id}">
          <button type="button" class="ai-faq-question" onclick="toggleAiFaq('${item.id}')">
            <span class="flex items-center gap-3">
              <i class="${item.icon} text-cyan-400"></i>
              <span>${item.question}</span>
            </span>
            <i class="fas fa-chevron-down chevron"></i>
          </button>
          <div class="ai-faq-answer">${formatFaqAnswer(item.answer)}</div>
        </div>
      `).join('');
    }

    function toggleAiFaq(faqId) {
      const list = document.getElementById('aiFaqList');
      if (!list) return;

      list.querySelectorAll('.ai-faq-item').forEach((item) => {
        if (item.getAttribute('data-faq-id') === faqId) {
          item.classList.toggle('open');
        } else {
          item.classList.remove('open');
        }
      });
    }

    window.showAIChat = showAIChat;
    window.toggleAiFaq = toggleAiFaq;
    window.handleContactSubmit = handleContactSubmit;

    // توافق مع أي استدعاءات قديمة
    function sendAIMessage() {}
    function handleAIChat(e) {
      if (e && e.preventDefault) e.preventDefault();
    }

    // ==================== SMOOTH SCROLL PREMIUM ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          // Close mobile menu if open
          if (typeof setMobileMenuOpen === 'function') setMobileMenuOpen(false);
          else {
            document.getElementById('mobileMenu')?.classList.remove('open');
            document.body.style.overflow = '';
          }

          // Smooth scroll with offset for fixed navbar
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // ==================== WATER RIPPLE EFFECT ON CLICK ====================
    document.addEventListener('click', function(e) {
      // Only create ripple on main content clicks, not on interactive elements
      if (e.target.closest('button, a, input, textarea, select') || 
          e.target.closest('.no-ripple')) {
        return;
      }
      
      const ripple = document.createElement('span');
      ripple.className = 'water-ripple';
      ripple.style.left = (e.clientX - 10) + 'px';
      ripple.style.top = (e.clientY - 10) + 'px';
      ripple.style.width = ripple.style.height = '20px';
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 2000);
    });

    // ==================== FORM FIELD HIGHLIGHTING ====================
    document.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', function() {
        this.classList.remove('border-red-500');
      });
    });

    // ==================== KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', function(e) {
      // Ctrl+K or Cmd+K to open AI chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showAIChat();
      }
      
      // Escape to close modals/menus
      if (e.key === 'Escape') {
        if (typeof setMobileMenuOpen === 'function') setMobileMenuOpen(false);
        else {
          document.getElementById('mobileMenu')?.classList.remove('open');
          document.body.style.overflow = '';
        }
        closeCustomerAuthModal?.();
        const aiPage = document.getElementById('aiChatPage');
        if (aiPage && aiPage.classList.contains('active')) {
          showMain();
        }
      }
    });



    // ==================== INITIALIZE ====================
    document.addEventListener('DOMContentLoaded', async function() {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light');
      if (!savedTheme) localStorage.setItem(THEME_STORAGE_KEY, 'light');

      const { button: loadMoreButton } = getLoadMoreControls();
      if (loadMoreButton) {
        loadMoreButton.id = 'loadMoreProductsBtn';
        loadMoreButton.type = 'button';
        loadMoreButton.onclick = toggleMoreProducts;
      }

      // Paint instantly from local fallback, then refresh from API when ready
      renderProducts('all');
      const loaded = await loadProductsFromApi();
      if (loaded) renderProducts(currentProductsFilter || 'all');
      await initCustomerAuth();

      requestAnimationFrame(() => {
        document.querySelectorAll('.reveal-elegant').forEach(el => {
          if (isElementInViewport(el)) el.classList.add('active');
        });
      });
    });
    
    // Helper to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    function throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }

  
// تأثير 3D للبطاقات (Parallax Tilt Effect)
function canUseTilt() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1024;
}

function init3DTilt() {
  const cards = document.querySelectorAll('.product-card-premium');

  if (!canUseTilt()) {
    cards.forEach(card => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
    return;
  }

  cards.forEach(card => {
    if (card.dataset.tiltReady === 'true') return;
    card.dataset.tiltReady = 'true';
    let frame = 0;

    card.addEventListener('mousemove', e => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        card.style.transition = 'none';
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.35s ease';
      card.style.boxShadow = '';
    });
  });
}

window.addEventListener('resize', () => {
  init3DTilt();
});

setTimeout(init3DTilt, 500);




// منطق الحاسبة الذكية
function calculateHydration() {
  const weight = document.getElementById('smartWeight').value;
  const activity = document.getElementById('smartActivity').value;
  const resultDiv = document.getElementById('smartResult');
  const amountText = document.getElementById('waterAmount');
  const recText = document.getElementById('smartRecommendation');

  if (!weight || weight <= 0) {
    alert("يرجى إدخال وزن صحيح");
    return;
  }

  // معادلة علمية تقريبية: الوزن × 35 مل + كمية إضافية حسب النشاط
  let baseAmount = weight * 0.035; 
  if (activity === 'medium') baseAmount += 0.5;
  if (activity === 'high') baseAmount += 1.0;

  const finalLiters = baseAmount.toFixed(1);
  amountText.textContent = `${finalLiters} لتر`;

  // التوصية الذكية بناءً على الكمية
  let recommendedProduct = '';
  if (finalLiters < 2) {
    recommendedProduct = 'شرنك مياه 250 مل';
    recText.innerHTML = "ننصحك بـ <b>شرنك مياه 250 مل</b> لسهولة شرب الكميات الصغيرة.";
  } else if (finalLiters >= 2 && finalLiters <= 3) {
    recommendedProduct = 'شرنك مياه 125 مل';
    recText.innerHTML = "ننصحك بـ <b>شرنك مياه 125 مل</b>، الحجم العملي للاستهلاك اليومي الفردي.";
  } else {
    recommendedProduct = 'شرنك مياه 1.5 لتر أو قارورة 18.9 لتر';
    recText.innerHTML = "ننصحك بـ <b>شرنك مياه 1.5 لتر</b> أو <b>قارورة 18.9 لتر</b> لتغطية احتياجك العالي.";
  }

  saveHydrationCalculation({
    weightKg: Number(weight),
    activityLevel: activity,
    recommendedLiters: Number(finalLiters),
    recommendedProduct
  }).catch(error => console.warn('Hydration calculation save fallback:', error.message));

  // إظهار النتيجة مع أنيميشن
  resultDiv.classList.remove('hidden');
  resultDiv.classList.add('animate-slide-up-elegant');
}

const LARGE_BOTTLE_VOLUME_LITERS = 18.9;

function setFamilyConsumptionPreset(value, button = null) {
  const input = document.getElementById('familyDailyLiters');
  if (!input) return;
  input.value = value;

  document.querySelectorAll('.advisor-chip').forEach(chip => chip.classList.remove('active'));
  if (button) button.classList.add('active');

  calculateFamilyBottleAdvisor();
}

function getProductById(productId) {
  return products.find(product => product.id === productId) || null;
}

function goToBottleProducts() {
  showMain();
  setTimeout(() => {
    filterProducts('bottle');
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 80);
}

function goToContactSection() {
  showMain();
  setTimeout(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 80);
}

function goToExtrasProducts() {
  showMain();
  setTimeout(() => {
    filterProducts('extras');
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 80);
}

function buildAdvisorCard({ title, subtitle, hint, tag, productId = null, primary = false, icon = 'fas fa-ticket-alt', mode = 'product', ctaText = '' }) {
  let buttonHtml = '';

  if (mode === 'product' && productId) {
    buttonHtml = `
      <div class="family-recommend-actions">
        <button type="button" onclick="addToCart(${productId})" class="btn-water-premium px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <i class="fas fa-plus"></i>
          أضفه إلى السلة
        </button>
        <button type="button" onclick="goToExtrasProducts()" class="px-4 py-2.5 rounded-xl glass-elegant text-sm font-bold border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
          <i class="fas fa-eye"></i>
          شاهده في المنتجات
        </button>
      </div>`;
  } else if (mode === 'bottle') {
    buttonHtml = `
      <div class="family-recommend-actions">
        <button type="button" onclick="goToBottleProducts()" class="btn-water-premium px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <i class="fas fa-jug-detergent"></i>
          شاهد القوارير
        </button>
        <button type="button" onclick="showCart()" class="px-4 py-2.5 rounded-xl glass-elegant text-sm font-bold border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
          <i class="fas fa-shopping-cart"></i>
          الطلب كاش
        </button>
      </div>`;
  } else if (mode === 'contact') {
    buttonHtml = `
      <div class="family-recommend-actions">
        <button type="button" onclick="goToContactSection()" class="btn-water-premium px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <i class="fas fa-headset"></i>
          ${ctaText || 'تواصل معنا'}
        </button>
      </div>`;
  } else if (mode === 'cash') {
    buttonHtml = `
      <div class="family-recommend-actions">
        <button type="button" onclick="goToBottleProducts()" class="btn-water-premium px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <i class="fas fa-jug-detergent"></i>
          شاهد القوارير الكبيرة
        </button>
      </div>`;
  }

  return `
    <div class="family-recommend-card ${primary ? 'primary' : ''}">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div class="flex items-start gap-3 min-w-0">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
            <i class="${icon} text-cyan-400"></i>
          </div>
          <div class="min-w-0">
            <h4 class="font-bold text-base sm:text-lg mb-1 leading-7">${title}</h4>
            <p class="text-sm text-slate-400 leading-6">${subtitle}</p>
          </div>
        </div>
        ${tag ? `<span class="family-recommend-pill">${tag}</span>` : ''}
      </div>
      <p class="text-sm text-slate-300 leading-7">${hint}</p>
      ${buttonHtml}
    </div>
  `;
}

function calculateFamilyBottleAdvisor() {
  const input = document.getElementById('familyDailyLiters');
  const servicePreference = document.getElementById('familyServicePreference');
  const resultBox = document.getElementById('familyAdvisorResult');

  if (!input || !servicePreference || !resultBox) return;

  const dailyLiters = parseFloat(input.value);
  if (!dailyLiters || dailyLiters <= 0) {
    showNotification('⚠️ أدخل الاستهلاك اليومي', 'يرجى إدخال استهلاك العائلة اليومي باللترات بشكل صحيح', 'error');
    input.focus();
    return;
  }

  const monthlyLiters = dailyLiters * 30;
  const monthlyBottlesExact = monthlyLiters / LARGE_BOTTLE_VOLUME_LITERS;
  const monthlyBottlesRounded = Math.max(1, Math.ceil(monthlyBottlesExact));
  const preference = servicePreference.value;

  const external25 = getProductById(11);
  const external20 = getProductById(12);
  const external30 = getProductById(14);
  const refillProduct = getProductById(REFILL_PRODUCT_ID);
  const bottleJordan = getProductById(7);
  const bottleSaudi = getProductById(6);
  const bottleProduct = bottleJordan || bottleSaudi;

  let tierTitle = 'استهلاك بسيط';
  let badgeText = 'الدفع كاش هو الأنسب';
  let bestFitText = 'الدفع كاش';
  let summaryText = '';
  let cards = [];

  if (monthlyBottlesExact < 8) {
    tierTitle = 'استهلاك بسيط';
    badgeText = 'تعبئة كاش عند الحاجة';
    bestFitText = 'تعبئة 1 دينار';

    summaryText = `استهلاك العائلة يقارب <b>${monthlyBottlesRounded} قارورة</b> شهرياً فقط. الأنسب طلب <b>تعبئة القارورة</b> بدينار واحد عند الحاجة، بدون الالتزام بدفتر كابونات أكبر من استهلاكك.`;

    cards = [
      buildAdvisorCard({
        title: refillProduct ? refillProduct.name : 'تعبئة قارورة شامل التوصيل',
        subtitle: '1 دينار لكل تعبئة — أو كابون خارجي لاحقاً',
        hint: 'للاستهلاك البسيط اطلب التعبئة نقداً. وإذا اشتريت دفتراً رقمياً خارجياً لاحقاً، احتفظ برقم الدفتر واستخدمه مع كل تعبئة.',
        tag: 'الخيار الأفضل',
        primary: true,
        productId: refillProduct ? refillProduct.id : null,
        icon: 'fas fa-tint',
        mode: refillProduct ? 'product' : 'cash'
      }),
      buildAdvisorCard({
        title: bottleProduct ? bottleProduct.name : 'طلب القوارير الكبيرة',
        subtitle: bottleProduct ? `${formatPrice(bottleProduct.price)} دينار • اطلبها وقت الحاجة` : 'حل مباشر ومرن',
        hint: 'يمكنك أيضاً طلب القوارير الكبيرة مباشرة كلما احتجت، بدون التزام شهري ثابت.',
        tag: 'حل مرن',
        productId: bottleProduct ? bottleProduct.id : null,
        icon: 'fas fa-jug-detergent',
        mode: bottleProduct ? 'bottle' : 'cash'
      })
    ];
  } else if (monthlyBottlesExact < 20) {
    tierTitle = dailyLiters >= 10 ? 'استهلاك مرتفع نسبيًا' : 'استهلاك متوسط';
    badgeText = 'دفتر رقمي خارجي 20';
    bestFitText = 'دفتر خارجي 20 كابون';

    summaryText = `استهلاك العائلة يقارب <b>${monthlyBottlesRounded} قارورة</b> شهرياً. الأنسب <b>دفتر كابونات رقمي خارجي 20</b> — بعد الشراء تحتفظ برقم الدفتر وتدخله مع كل طلب تعبئة، ويُخصم الكابون بعد التسليم فقط.`;

    cards = [
      buildAdvisorCard({
        title: external20 ? external20.name : 'دفتر رقمي خارجي 20',
        subtitle: external20 ? `${formatPrice(external20.price)} دينار • رقم دفتر تحتفظ به` : 'رقم دفتر + رصيد رقمي',
        hint: 'بعد الشراء يظهر رقم الدفتر. أدخله في كل طلب تعبئة قارورة. الإدارة تعتمد الخصم بعد التسليم فقط.',
        tag: 'موصى به',
        primary: true,
        productId: external20 ? external20.id : null,
        icon: 'fas fa-book',
        mode: external20 ? 'product' : 'contact',
        ctaText: 'تواصل معنا'
      }),
      buildAdvisorCard({
        title: refillProduct ? refillProduct.name : 'تعبئة قارورة شامل التوصيل',
        subtitle: '1 دينار أو كابون واحد من دفترك',
        hint: 'استخدم رقم دفترك مع كل طلب تعبئة. بدون دفتر يمكنك الدفع ديناراً نقداً.',
        tag: 'للطلب المتكرر',
        productId: refillProduct ? refillProduct.id : null,
        icon: 'fas fa-tint',
        mode: refillProduct ? 'product' : 'cash'
      })
    ];
  } else {
    const veryHigh = monthlyBottlesExact >= 28;
    const pack = veryHigh ? (external30 || external25) : external25;
    tierTitle = veryHigh ? 'استهلاك مرتفع جداً' : 'استهلاك مرتفع';
    badgeText = veryHigh ? 'دفتر خارجي 30' : 'دفتر خارجي 25';
    bestFitText = veryHigh ? 'دفتر خارجي 30 كابون' : 'دفتر خارجي 25 كابون';

    summaryText = `استهلاك العائلة يقارب <b>${monthlyBottlesRounded} قارورة</b> شهرياً. الأنسب دفتر كابونات رقمي <b>خارجي</b> أكبر، ثم تستخدم رقم الدفتر مع تعبئة القارورة؛ الخصم يتم بعد تأكيد التسليم.`;

    cards = [
      buildAdvisorCard({
        title: pack ? pack.name : (veryHigh ? 'دفتر رقمي خارجي 30' : 'دفتر رقمي خارجي 25'),
        subtitle: pack ? `${formatPrice(pack.price)} دينار • خارجي فقط` : 'دفتر رقمي خارجي',
        hint: 'احفظ رقم الدفتر بعد الشراء وأدخله مع كل تعبئة. لن يُنقص الرصيد إلا بعد استلام الطلب.',
        tag: 'موصى به',
        primary: true,
        productId: pack ? pack.id : null,
        icon: 'fas fa-book',
        mode: pack ? 'product' : 'contact',
        ctaText: 'تواصل معنا'
      }),
      buildAdvisorCard({
        title: refillProduct ? refillProduct.name : 'تعبئة قارورة شامل التوصيل',
        subtitle: 'كابون واحد = تعبئة واحدة مع التوصيل',
        hint: 'هذا المنتج هو نقطة استخدام دفترك الرقمي. الدفع نقداً بدينار متاح أيضاً.',
        tag: 'استخدام الدفتر',
        productId: refillProduct ? refillProduct.id : null,
        icon: 'fas fa-tint',
        mode: refillProduct ? 'product' : 'cash'
      })
    ];
  }

  document.getElementById('familyAdvisorTier').textContent = tierTitle;
  document.getElementById('familyAdvisorBadge').textContent = badgeText;
  document.getElementById('familyMonthlyLiters').textContent = `${monthlyLiters.toFixed(0)} لتر`;
  document.getElementById('familyMonthlyBottles').textContent = `${monthlyBottlesRounded} قارورة`;
  document.getElementById('familyAdvisorBestFit').textContent = bestFitText;
  document.getElementById('familyAdvisorSummary').innerHTML = summaryText;
  document.getElementById('familyAdvisorRecommendations').innerHTML = cards.join('');

  saveFamilyAdvisorCalculation({
    dailyLiters,
    monthlyLiters,
    monthlyBottles: monthlyBottlesRounded,
    servicePreference: preference,
    bestFit: bestFitText
  }).catch(error => console.warn('Family advisor calculation save fallback:', error.message));

  resultBox.classList.remove('hidden');
  resultBox.classList.add('animate-fade-scale');
  setTimeout(() => resultBox.classList.remove('animate-fade-scale'), 600);
}

