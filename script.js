    // ==================== ENHANCED PRODUCTS DATA ====================
    let products = [
      {
        id: 1,
        name: "كرتونة مياه 250 مل",
        nameEn: "Carton Water 250ml",
        description: "40 كاسة ورقية مع غطاء محكم × 250 مل - مثالية للمناسبات والرحلات والاجتماعات",
        fullDescription: "كرتونة مياه نقية معبأة في أكواب ورقية صديقة للبيئة مع أغطية محكمة الإغلاق. مثالية للمناسبات الاجتماعية، الرحلات، المؤتمرات، والمدارس. كل كوب معبأ بمياه نقية 99.97% بعد 7 مراحل تنقية.",
        price: 3.00,
        basePrice: 2.50,
        chilledPrice: 3.00,
        category: "carton",
        emoji: "🥤",
        image: "images/carton-250.jfif",
        options: [
          { id: "cold", label: "مبردة ❄️", price: 3.00, description: "معبأة ومبردة إلى 3-5°م، جاهزة للشرب فوراً" },
          { id: "normal", label: "عادية 🌡️", price: 2.50, description: "بدرجة حرارة الغرفة، مناسبة للتخزين الطويل" }
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
        price: 2.50,
        basePrice: 2.00,
        chilledPrice: 2.50,
        category: "carton",
        emoji: "🥤",
        image: "images/carton-200.jfif",
        options: [
          { id: "cold", label: "مبردة ❄️", price: 2.50, description: "معبأة ومبردة إلى 3-5°م، جاهزة للشرب فوراً" },
          { id: "normal", label: "عادية 🌡️", price: 2.00, description: "بدرجة حرارة الغرفة، مناسبة للتخزين الطويل" }
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
        price: 2.00,
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
        name: "شرنك مياه 600 مل",
        nameEn: "Shrink Water 600ml",
        description: "12 زجاجة × 600 مل - الحجم المثالي للاستهلاك اليومي والعائلي",
        fullDescription: "مجموعة من 12 زجاجة مياه نقية بحجم 600 مل، معبأة في زجاجات بلاستيكية عالية الجودة مع أغطية محكمة. الحجم المثالي الذي يوازن بين الكفاية وسهولة الحمل. مثالي للاستهلاك العائلي اليومي، الصالات الرياضية، والرحلات المتوسطة.",
        price: 3.50,
        category: "shrink",
        emoji: "📦",
        image: "images/shrink-600.jfif",
        options: null,
        badge: "شعبي",
        specs: {
          volume: "600 مل × 12 زجاجة",
          material: "بلاستيك PET آمن للاستخدام الغذائي، خالي من BPA",
          shelfLife: "12 شهر من تاريخ التعبئة",
          storage: "يحفظ في مكان بارد وجاف، بعيداً عن أشعة الشمس المباشرة",
          certifications: ["المؤسسة العامة للغذاء والدواء الأردنية", "مواصفة قياسية أردنية", "شهادة خلو من BPA"]
        },
        usageTips: [
          "حجم مثالي لاحتياجات الفرد اليومية",
          "مناسب للرياضيين والنشاطات البدنية",
          "اقتصادي للعائلات الصغيرة",
          "سهل الحمل في الحقائب المتوسطة"
        ]
      },
      {
        id: 5,
        name: "شرنك مياه 1.5 لتر",
        nameEn: "Shrink Water 1.5L",
        description: "6 زجاجات × 1.5 لتر - للعائلة والمنزل والمكاتب",
        fullDescription: "مجموعة من 6 زجاجات مياه نقية بحجم 1.5 لتر، معبأة في زجاجات بلاستيكية متينة مع أغطية محكمة. الحجم الكبير المثالي للعائلات والمكاتب، يقلل من عدد المرات التي تحتاج فيها لشراء المياه. معبأة بتقنية تحافظ على النقاء والطعم النقي.",
        price: 3.00,
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
        price: 4.00,
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
        price: 1.00,
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
        price: 2.50,
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
        price: 4.00,
        category: "ice",
        emoji: "🧊",
        image: "images/ice-5kg.png",
        options: null,
        badge: "اقتصادي",
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
        name: "دفتر كابونات خارجي 25 كابون",
        nameEn: "Outdoor Coupons Book 25",
        description: "دفتر كابونات خارجي يحتوي على 25 كابون - مناسب للتوزيع الخارجي",
        fullDescription: "دفتر كابونات خارجي يحتوي على 25 كابون، مناسب لخدمة التوزيع الخارجي والمتابعة المنظمة للطلبات المتكررة.",
        price: 20.00,
        category: "extras",
        emoji: "📘",
        image: "images/coupons-outdoor-25.jpg",
        options: null,
        badge: "خدمة مميزة",
        specs: {
          volume: "25 كابون",
          material: "دفتر ورقي منظم",
          shelfLife: "استخدام طويل",
          storage: "يحفظ في مكان جاف ونظيف",
          certifications: ["خدمة معتمدة"]
        },
        usageTips: [
          "مناسب للتوزيع الخارجي",
          "منظم وسهل الاستخدام",
          "مثالي للطلبات المتكررة",
          "عملي للمؤسسات والأفراد"
        ]
      },
      {
        id: 12,
        name: "دفتر كابونات خارجي 20 كابون",
        nameEn: "Outdoor Coupons Book 20",
        description: "دفتر كابونات خارجي يحتوي على 20 كابون - خيار اقتصادي وعملي",
        fullDescription: "دفتر كابونات خارجي يحتوي على 20 كابون، مناسب لمن يحتاج متابعة سهلة واقتصادية للطلبات الخارجية.",
        price: 16.00,
        category: "extras",
        emoji: "📘",
        image: "images/coupons-outdoor-20.jpg",
        options: null,
        badge: "اقتصادي",
        specs: {
          volume: "20 كابون",
          material: "دفتر ورقي منظم",
          shelfLife: "استخدام طويل",
          storage: "يحفظ في مكان جاف ونظيف",
          certifications: ["خدمة معتمدة"]
        },
        usageTips: [
          "اقتصادي ومرتب",
          "مناسب للأفراد",
          "سهل الحمل",
          "مناسب للخدمة الخارجية"
        ]
      },
      {
        id: 13,
        name: "دفتر كابونات داخلي 25 كابون",
        nameEn: "Indoor Coupons Book 25",
        description: "دفتر كابونات داخلي يحتوي على 25 كابون - مناسب للمنزل والمكتب",
        fullDescription: "دفتر كابونات داخلي يحتوي على 25 كابون، مثالي للاستخدام المنزلي والمكتبي مع متابعة منظمة للاستهلاك.",
        price: 16.00,
        category: "extras",
        emoji: "📗",
        image: "images/coupons-indoor-25.jpg",
        options: null,
        badge: "منزلي",
        specs: {
          volume: "25 كابون",
          material: "دفتر ورقي منظم",
          shelfLife: "استخدام طويل",
          storage: "يحفظ في مكان جاف ونظيف",
          certifications: ["خدمة معتمدة"]
        },
        usageTips: [
          "مثالي للمنزل",
          "مناسب للمكتب",
          "ينظم الطلبات المتكررة",
          "سهل الحفظ"
        ]
      },
      {
        id: 14,
        name: "دفتر كابونات داخلي 30 كابون",
        nameEn: "Indoor Coupons Book 30",
        description: "دفتر كابونات داخلي يحتوي على 30 كابون - قيمة أكبر واستخدام أطول",
        fullDescription: "دفتر كابونات داخلي يحتوي على 30 كابون، يوفر قيمة ممتازة لمن يحتاج استخداماً طويلاً ومنظماً.",
        price: 18.00,
        category: "extras",
        emoji: "📗",
        image: "images/coupons-indoor-30.jpg",
        options: null,
        badge: "الأوفر",
        specs: {
          volume: "30 كابون",
          material: "دفتر ورقي منظم",
          shelfLife: "استخدام طويل",
          storage: "يحفظ في مكان جاف ونظيف",
          certifications: ["خدمة معتمدة"]
        },
        usageTips: [
          "أفضل قيمة",
          "مدة استخدام أطول",
          "مثالي للمنزل والمكتب",
          "سهل التنظيم"
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
    const THEME_STORAGE_KEY = 'puredrop-theme';
    const INITIAL_PRODUCTS_LIMIT = 12;
    let visibleProductsLimit = INITIAL_PRODUCTS_LIMIT;
    let currentProductsFilter = 'all';

    const defaultBadgesByCategory = {
      carton: 'جودة عالية',
      shrink: 'متوفر',
      bottle: 'الأكثر طلباً',
      ice: 'نقي',
      extras: 'مميز'
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

    function canUseApi() {
      return window.location.protocol !== 'file:' || Boolean(API_BASE_URL);
    }

    async function puredropApiRequest(path, options = {}) {
      if (!canUseApi()) {
        throw new Error('API غير متاح عند فتح الموقع كملف ثابت');
      }

      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.error || 'تعذر الاتصال بقاعدة البيانات');
      }

      return data;
    }

    function normalizeApiProduct(product) {
      return {
        ...product,
        basePrice: product.basePrice ?? product.price,
        chilledPrice: product.chilledPrice ?? null,
        options: Array.isArray(product.options) && product.options.length ? product.options : null,
        specs: product.specs || {},
        usageTips: Array.isArray(product.usageTips) ? product.usageTips : []
      };
    }

    async function loadProductsFromApi() {
      try {
        const data = await puredropApiRequest('/api/products');
        if (Array.isArray(data.products) && data.products.length) {
          products = data.products.map(normalizeApiProduct);
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
      const safeTheme = theme === 'light' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', safeTheme);

      const desktopIcon = document.getElementById('themeToggleIcon');
      const mobileIcon = document.getElementById('mobileThemeToggleIcon');

      if (desktopIcon) {
        desktopIcon.className = safeTheme === 'light'
          ? 'fas fa-moon text-slate-300 group-hover:text-cyan-400 transition-colors text-lg'
          : 'fas fa-sun text-slate-300 group-hover:text-cyan-400 transition-colors text-lg';
      }

      if (mobileIcon) {
        mobileIcon.className = safeTheme === 'light'
          ? 'fas fa-moon text-cyan-400 transition-colors text-lg'
          : 'fas fa-sun text-cyan-400 transition-colors text-lg';
      }

      if (typeof initializeBubbles === 'function') {
        initializeBubbles();
      }
    }

    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
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
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

class Bubble {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * window.innerWidth;
    this.y = initial ? Math.random() * window.innerHeight : window.innerHeight + Math.random() * 130;
    this.size = Math.random() * 3.4 + 1.6;
    this.speedY = Math.random() * 38 + 42;
    this.speedX = (Math.random() - 0.5) * 18;
    this.opacity = Math.random() * 0.12 + 0.12;
    this.phase = Math.random() * Math.PI * 2;
    this.phaseSpeed = Math.random() * 1.25 + 0.95;
    this.wobbleAmplitude = Math.random() * 18 + 8;
    this.glowSize = this.size * (Math.random() * 1.2 + 1.9);
  }

  update(dt) {
    this.phase += this.phaseSpeed * dt;
    this.x += (this.speedX + Math.sin(this.phase) * this.wobbleAmplitude * 0.5) * dt;
    this.y -= this.speedY * dt;

    if (this.y < -36 || this.x < -48 || this.x > window.innerWidth + 48) {
      this.reset();
    }
  }

  draw() {
    if (!ctx) return;

    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    const rim = isLightTheme
      ? `rgba(3, 105, 161, ${this.opacity * 1.65})`
      : `rgba(103, 232, 249, ${this.opacity * 1.45})`;
    const coreCenter = isLightTheme
      ? `rgba(224, 242, 254, ${this.opacity * 0.95})`
      : `rgba(255, 255, 255, ${this.opacity * 1.28})`;
    const coreEdge = isLightTheme
      ? `rgba(56, 189, 248, ${this.opacity * 0.92})`
      : `rgba(34, 211, 238, ${this.opacity * 0.82})`;
    const haloStart = isLightTheme
      ? `rgba(14, 165, 233, ${this.opacity * 0.34})`
      : `rgba(34, 211, 238, ${this.opacity * 0.30})`;
    const haloEnd = isLightTheme
      ? 'rgba(14, 165, 233, 0)'
      : 'rgba(34, 211, 238, 0)';

    ctx.save();

    const halo = ctx.createRadialGradient(this.x, this.y, this.size * 0.15, this.x, this.y, this.glowSize);
    halo.addColorStop(0, haloStart);
    halo.addColorStop(1, haloEnd);
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
    ctx.fill();

    const grad = ctx.createRadialGradient(
      this.x - this.size * 0.35,
      this.y - this.size * 0.4,
      this.size * 0.14,
      this.x,
      this.y,
      this.size * 1.08
    );
    grad.addColorStop(0, coreCenter);
    grad.addColorStop(0.45, coreEdge);
    grad.addColorStop(1, isLightTheme ? 'rgba(56, 189, 248, 0)' : 'rgba(34, 211, 238, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 0.8;
    ctx.strokeStyle = rim;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x - (this.size * 0.42), this.y - (this.size * 0.44), this.size * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = isLightTheme
      ? `rgba(255,255,255,${this.opacity * 0.92})`
      : `rgba(255,255,255,${this.opacity * 1.08})`;
    ctx.fill();

    ctx.restore();
  }
}

function getBubbleCount() {
  const area = window.innerWidth * window.innerHeight;
  const density = 1 / 36000;
  return Math.max(34, Math.min(78, Math.floor(area * density)));
}

function initializeBubbles() {
  if (!canvas || !ctx) return;
  resizeCanvas();
  bubbles = [];
  const bubbleCount = getBubbleCount();
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new Bubble());
  }
}

function animateBubbles(timestamp) {
  if (!canvas || !ctx) return;

  if (!lastBubbleFrame) lastBubbleFrame = timestamp;
  let dt = (timestamp - lastBubbleFrame) / 1000;
  lastBubbleFrame = timestamp;
  if (dt > 0.05) dt = 0.05;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const bubble of bubbles) {
    bubble.update(dt);
    bubble.draw();
  }

  requestAnimationFrame(animateBubbles);
}

if (canvas && ctx) {
  initializeBubbles();
  requestAnimationFrame(animateBubbles);
  window.addEventListener('resize', initializeBubbles, { passive: true });
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
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 80) {
        navbar.classList.add('nav-scrolled-premium');
      } else {
        navbar.classList.remove('nav-scrolled-premium');
      }
    });

    // ==================== MOBILE MENU ====================
    function toggleMobileMenu() {
      document.getElementById('mobileMenu').classList.toggle('open');
      // Prevent body scroll when menu is open
      document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
    }

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

function renderProducts(filter = 'all') {
  currentProductsFilter = filter;

  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  const visibleProducts = filtered.slice(0, visibleProductsLimit);
  const { wrapper, button } = getLoadMoreControls();

  grid.innerHTML = visibleProducts.map((p, i) => {
    const displayPrice = p.options ? p.basePrice : p.price;
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
                <button onclick="selectOption(${p.id}, ${idx}, this)" class="option-btn-premium ${idx === 0 ? 'active' : ''}" data-opt="${idx}" data-price="${opt.price}">
                  ${opt.label}
                </button>
              `).join('')}
            </div>
            <p id="option-desc-${p.id}" class="text-xs text-slate-500 mt-2 min-h-[24px]">${p.options[0].description}</p>
          </div>
        ` : ''}

        <div class="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <span class="text-2xl font-black gradient-text-premium" id="price-${p.id}">${formatPrice(displayPrice)}</span>
            <span class="text-xs text-slate-500 block mt-0.5">دينار أردني</span>
          </div>
          <button onclick="addToCart(${p.id})" class="btn-water-premium w-13 h-13 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/30 transition-all group">
            <i class="fas fa-plus text-white text-lg group-hover:scale-110 transition-transform"></i>
          </button>
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
      const option = product.options[optIdx];

      // Update selected option UI
      btn.parentElement.querySelectorAll('.option-btn-premium').forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Update price display
      document.getElementById(`price-${productId}`).textContent = formatPrice(option.price);
      
      // Update description
      const descEl = document.getElementById(`option-desc-${productId}`);
      if (descEl) {
        descEl.textContent = option.description;
        descEl.classList.add('animate-fade-scale');
        setTimeout(() => descEl.classList.remove('animate-fade-scale'), 500);
      }

      // Store selected option in product object for cart logic
      product.selectedOptionIdx = optIdx;
    }

    function formatPrice(price) {
      return new Intl.NumberFormat('ar-JO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    }


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
        const optIdx = product.selectedOptionIdx !== undefined ? product.selectedOptionIdx : 0;
        const selectedOption = product.options[optIdx];
        price = selectedOption.price;
        optionLabel = selectedOption.label;
        optionId = selectedOption.id;
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
      
      // Add subtle animation to cart badge
      const badge = document.getElementById('cartCount');
      if (badge && !badge.classList.contains('hidden')) {
        badge.classList.add('animate-cart-pulse');
        setTimeout(() => badge.classList.remove('animate-cart-pulse'), 600);
      }
    }

    function updateCartUI() {
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      const badge = document.getElementById('cartCount');
      const mobileBadge = document.getElementById('mobileCartCount');

      if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.remove('hidden');
        badge.classList.add('flex', 'cart-badge-premium');
        mobileBadge.textContent = totalItems;
        mobileBadge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex', 'cart-badge-premium');
        mobileBadge.classList.add('hidden');
      }
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
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      document.getElementById('subtotal').textContent = formatPrice(subtotal) + ' JOD';
      document.getElementById('totalPrice').textContent = formatPrice(subtotal) + ' JOD';
      
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

    async function useCurrentLocation() {
      const statusEl = document.getElementById('gpsStatus');
      const btn = document.getElementById('useGpsBtn');
      const mapsLink = document.getElementById('gpsMapsLink');
      if (!navigator.geolocation) {
        showNotification('⚠️ غير مدعوم', 'متصفحك لا يدعم تحديد الموقع الجغرافي', 'error');
        return;
      }

      const original = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديد...';
      }
      if (statusEl) statusEl.textContent = 'جاري الحصول على موقعك الحالي...';

      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        document.getElementById('customerLat').value = String(lat);
        document.getElementById('customerLng').value = String(lng);

        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        if (mapsLink) {
          mapsLink.href = mapsUrl;
          mapsLink.classList.remove('hidden');
        }

        let addressText = `موقع GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&accept-language=ar`, {
            headers: { 'Accept': 'application/json' }
          });
          if (response.ok) {
            const data = await response.json();
            if (data && data.display_name) {
              addressText = data.display_name;
            }
          }
        } catch (error) {
          console.warn('Reverse geocode failed:', error);
        }

        const addressInput = document.getElementById('customerAddress');
        if (addressInput && !addressInput.value.trim()) {
          addressInput.value = addressText;
        } else if (addressInput && addressInput.value.trim() && !addressInput.value.includes('GPS')) {
          // Keep typed address; GPS coords are stored separately.
        } else if (addressInput) {
          addressInput.value = addressText;
        }

        if (statusEl) {
          statusEl.textContent = `تم تحديد الموقع: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          statusEl.className = 'mt-2 text-xs text-emerald-400';
        }
        showNotification('📍 تم تحديد الموقع', 'تم حفظ إحداثيات GPS مع الطلب', 'success');
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = original;
        }
      }, (error) => {
        let message = 'تعذر تحديد الموقع';
        if (error.code === 1) message = 'يرجى السماح بالوصول إلى الموقع من إعدادات المتصفح';
        if (error.code === 2) message = 'الموقع غير متاح حالياً';
        if (error.code === 3) message = 'انتهت مهلة تحديد الموقع، حاول مرة أخرى';
        if (statusEl) {
          statusEl.textContent = message;
          statusEl.className = 'mt-2 text-xs text-red-400';
        }
        showNotification('⚠️ فشل GPS', message, 'error');
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = original;
        }
      }, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      });
    }

    async function confirmOrder() {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const address = document.getElementById('customerAddress').value.trim();
  const notes = document.getElementById('customerNotes').value.trim();
  const latRaw = document.getElementById('customerLat')?.value;
  const lngRaw = document.getElementById('customerLng')?.value;
  const lat = latRaw ? Number(latRaw) : null;
  const lng = lngRaw ? Number(lngRaw) : null;

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
    const savedOrder = await saveOrderToDatabase({
      customer: {
        name,
        phone,
        address,
        notes,
        lat: Number.isFinite(lat) ? lat : undefined,
        lng: Number.isFinite(lng) ? lng : undefined
      },
      deliveryTime: deliveryTimeValue,
      items: cartSnapshot.map(item => ({
        productId: item.id,
        optionId: item.optionId,
        quantity: item.qty
      }))
    });

    const orderNum = savedOrder.orderNumber;
    const totalAmount = typeof savedOrder.total === 'number'
      ? savedOrder.total
      : cartSnapshot.reduce((sum, item) => sum + (item.price * item.qty), 0);

    document.getElementById('orderNumber').textContent = orderNum;
    document.getElementById('confirmItemsCount').textContent = totalItems;
    document.getElementById('confirmTotal').textContent = formatPrice(totalAmount) + ' JOD';

    cart = [];
    updateCartUI();

    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('cartPage').classList.remove('active');
    document.getElementById('aiChatPage')?.classList.remove('active');
    document.getElementById('orderConfirmPage').classList.add('active');

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

  
    // Premium confetti effect
    function createConfetti() {
      const container = document.getElementById('confettiContainer');
      container.innerHTML = '';
      
      const colors = ['#06b6d4', '#0ea5e9', '#3b82f6', '#8b5cf6', '#10b981'];
      
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
          confetti.remove();
        }, 4000);
      }
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
      } catch (error) {
        console.warn('Contact database save fallback:', error.message);
      }

      showNotification('✅ تم إرسال رسالتك!', 'سنتواصل معك خلال 15 دقيقة للرد على استفسارك', 'success');

      e.target.reset();
      e.target.querySelectorAll('input, textarea').forEach(el => {
        el.classList.remove('border-red-500');
      });
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
        answer: 'أسعار منتجات قطرة نقية:\n\n• كرتونة 250مل مبردة: 3.00 دينار\n• كرتونة 250مل عادية: 2.50 دينار\n• كرتونة 200مل مبردة: 2.50 دينار\n• كرتونة 200مل عادية: 2.00 دينار\n• شرنك 250مل (12 زجاجة): 2.00 دينار\n• شرنك 600مل (12 زجاجة): 3.50 دينار\n• شرنك 1.5 لتر (6 زجاجات): 3.00 دينار\n• قارورة 18.9 لتر: 4.00 دينار\n• ثلج 1 كغم: 1.00 دينار | 3 كغم: 2.50 دينار | 5 كغم: 4.00 دينار\n\nالتوصيل مجاني لجميع مناطق الأردن.'
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
        answer: 'اختَر حسب احتياجك:\n\n• مناسبات وتجمعات: كرتونة 250مل مبردة + ثلج\n• منزل وعائلة: شرنك 1.5 لتر أو قارورة 18.9 لتر\n• مكتب/شركة: قارورة 18.9 لتر + كراتين عادية\n• رحلات: شرنك 600مل أو كرتونة 200مل مبردة\n\nيمكنك أيضاً تصفح المنتجات وإضافتها للسلة مباشرة.'
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
          document.getElementById('mobileMenu').classList.remove('open');
          document.body.style.overflow = '';
          
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
        document.getElementById('mobileMenu').classList.remove('open');
        document.body.style.overflow = '';
        const aiPage = document.getElementById('aiChatPage');
        if (aiPage && aiPage.classList.contains('active')) {
          showMain();
        }
      }
    });



    // ==================== INITIALIZE ====================
    document.addEventListener('DOMContentLoaded', async function() {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
      applyTheme(savedTheme);

      const { button: loadMoreButton } = getLoadMoreControls();
      if (loadMoreButton) {
        loadMoreButton.id = 'loadMoreProductsBtn';
        loadMoreButton.type = 'button';
        loadMoreButton.onclick = toggleMoreProducts;
      }

      await loadProductsFromApi();
      renderProducts('all');
      
      // Add loading state for better UX
      setTimeout(() => {
        document.querySelectorAll('.reveal-elegant').forEach(el => {
          if (isElementInViewport(el)) {
            el.classList.add('active');
          }
        });
      }, 500);
    });
    
    // Helper to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Throttle scroll events for better performance
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
    
    // Apply throttle to scroll listener
    window.addEventListener('scroll', throttle(() => {
      // Navbar scroll effect already handled separately
    }, 100), { passive: true });

  
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

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.transition = 'none';
      card.style.boxShadow = `${-rotateY}px ${rotateX}px 18px rgba(0, 242, 254, 0.18)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
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
    recommendedProduct = 'شرنك مياه 600 مل';
    recText.innerHTML = "ننصحك بـ <b>شرنك مياه 600 مل</b>، الحجم المثالي للاستهلاك اليومي الفردي.";
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
  const internal25 = getProductById(13);
  const internal30 = getProductById(14);
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
    badgeText = 'كاش عند الحاجة';
    bestFitText = 'الدفع كاش';

    summaryText = `استهلاك العائلة يقارب <b>${monthlyBottlesRounded} قارورة</b> شهرياً فقط، وهذا يعتبر استهلاكاً بسيطاً. بما أن عدد القوارير أقل من <b>8 قوارير شهرياً</b> فالأفضل لك أن تطلب كاش عند الحاجة حتى تبقى مرناً ولا ترتبط بدفتر أكبر من استهلاكك.`;

    cards = [
      buildAdvisorCard({
        title: 'الدفع كاش عند الحاجة',
        subtitle: 'الخيار الأذكى للاستهلاك البسيط',
        hint: 'طالما أن استهلاكك الشهري منخفض، فالدفع كاش يمنحك مرونة أكبر ويوفر عليك تكلفة دفتر لا تحتاجه بالكامل.',
        tag: 'الخيار الأفضل',
        primary: true,
        icon: 'fas fa-money-bill-wave',
        mode: 'cash'
      }),
      buildAdvisorCard({
        title: bottleProduct ? bottleProduct.name : 'طلب القوارير الكبيرة',
        subtitle: bottleProduct ? `${formatPrice(bottleProduct.price)} دينار • اطلبها وقت الحاجة` : 'حل مباشر ومرن',
        hint: 'يمكنك طلب القوارير الكبيرة مباشرة كلما احتجت، بدون التزام شهري ثابت، وهذا أنسب كثيراً لعائلتك حالياً.',
        tag: 'حل مرن',
        productId: bottleProduct ? bottleProduct.id : null,
        icon: 'fas fa-jug-detergent',
        mode: bottleProduct ? 'bottle' : 'cash'
      })
    ];
  } else if (monthlyBottlesExact < 20) {
    tierTitle = dailyLiters >= 10 ? 'استهلاك مرتفع نسبيًا' : 'استهلاك متوسط';
    badgeText = 'اشتراك 20 كابون هو الأنسب';
    bestFitText = '20 كابون داخلي أو خارجي';

    summaryText = `استهلاك العائلة يقارب <b>${monthlyBottlesRounded} قارورة</b> شهرياً، وهذا يعني أن اشتراك <b>20 كابون</b> هو الخيار الأقرب لاحتياجك. وعند استهلاك يقارب <b>10 لتر يومياً</b> فنحن نعتبره استهلاكاً واضحاً يستحق الاشتراك بدل الاعتماد على الطلب العشوائي.`;

    const internal20Card = buildAdvisorCard({
      title: 'اشتراك داخلي 20 كابون',
      subtitle: 'مناسب إذا كنت تفضّل الخدمة الداخلية المنتظمة',
      hint: 'إذا كانت احتياجات العائلة ثابتة تقريباً وتفضّل تنظيم الخدمة داخلياً، فهذا الخيار هو الترشيح الأقرب لك حسب الاستهلاك الحالي.',
      tag: 'موصى به',
      primary: preference !== 'external',
      icon: 'fas fa-house',
      mode: 'contact',
      ctaText: 'تواصل معنا للاشتراك الداخلي'
    });

    const external20Card = buildAdvisorCard({
      title: external20 ? external20.name : 'اشتراك خارجي 20 كابون',
      subtitle: external20 ? `${formatPrice(external20.price)} دينار • الأنسب للخدمة الخارجية` : 'الأنسب للخدمة الخارجية',
      hint: 'إذا كنت تعتمد على الخدمة الخارجية، فهذا الاشتراك يوازن بين السعر والتنظيم ويغطي استهلاكك الشهري بشكل عملي.',
      tag: 'الخيار الخارجي',
      productId: external20 ? external20.id : null,
      primary: preference === 'external',
      icon: 'fas fa-truck',
      mode: external20 ? 'product' : 'contact',
      ctaText: 'تواصل معنا للاشتراك الخارجي'
    });

    if (preference === 'internal') {
      cards = [
        internal20Card,
        buildAdvisorCard({
          title: internal25 ? `${internal25.name} (بديل متاح)` : 'بديل داخلي متاح',
          subtitle: internal25 ? `${formatPrice(internal25.price)} دينار • إذا أردت هامشاً أعلى` : 'إذا رغبت بخيار داخلي أعلى',
          hint: 'إذا كنت تفضّل خياراً متاحاً مباشرة من المنتجات وبه هامش إضافي، يمكنك اختيار دفتر 25 داخلي كبديل قريب.',
          tag: 'بديل متاح',
          productId: internal25 ? internal25.id : null,
          icon: 'fas fa-layer-group',
          mode: internal25 ? 'product' : 'contact',
          ctaText: 'تواصل معنا'
        })
      ];
    } else if (preference === 'external') {
      cards = [
        external20Card,
        buildAdvisorCard({
          title: 'اشتراك داخلي 20 كابون',
          subtitle: 'بديل إذا أردت تحويل الخدمة من خارجية إلى داخلية',
          hint: 'يمكن اعتماد نفس التقدير على خطة داخلية 20 كابون إذا كانت هذه الخدمة أنسب لطبيعة منزلك.',
          tag: 'بديل',
          icon: 'fas fa-house',
          mode: 'contact',
          ctaText: 'استفسر عن الاشتراك الداخلي'
        })
      ];
    } else {
      cards = [internal20Card, external20Card];
    }
  } else {
    const veryHigh = monthlyBottlesExact >= 28;
    tierTitle = veryHigh ? 'استهلاك مرتفع جداً' : 'استهلاك مرتفع';
    badgeText = veryHigh ? '25 أو 30 كابون أنسب لك' : '25 كابون أنسب لك';
    bestFitText = veryHigh ? 'داخلي 30 أو خارجي 25' : 'داخلي 25 أو خارجي 25';

    summaryText = `استهلاك العائلة يقارب <b>${monthlyBottlesRounded} قارورة</b> شهرياً، وهذا مستوى مرتفع يحتاج إلى دفتر كابونات أكبر يوفّر عليك إعادة الطلب المستمرة ويحافظ على انتظام الخدمة طوال الشهر.`;

    const internalProduct = veryHigh ? internal30 : internal25;

    const internalCard = buildAdvisorCard({
      title: internalProduct ? internalProduct.name : (veryHigh ? 'اشتراك داخلي 30 كابون' : 'اشتراك داخلي 25 كابون'),
      subtitle: internalProduct ? `${formatPrice(internalProduct.price)} دينار • مناسب للخدمة الداخلية` : 'مناسب للخدمة الداخلية المنتظمة',
      hint: veryHigh
        ? 'لأن استهلاك العائلة مرتفع جداً، فالخيار الداخلي 30 كابون يعطيك راحة أكبر ويقلل احتمالية نفاد القوارير قبل نهاية الشهر.'
        : 'هذا الخيار الداخلي مناسب للعائلات ذات الاستهلاك المرتفع ويغطي الشهر بشكل مريح.',
      tag: 'الخيار الداخلي',
      productId: internalProduct ? internalProduct.id : null,
      primary: preference !== 'external',
      icon: 'fas fa-house',
      mode: internalProduct ? 'product' : 'contact',
      ctaText: 'تواصل معنا'
    });

    const externalCard = buildAdvisorCard({
      title: external25 ? external25.name : 'اشتراك خارجي 25 كابون',
      subtitle: external25 ? `${formatPrice(external25.price)} دينار • مناسب للخدمة الخارجية` : 'مناسب للخدمة الخارجية',
      hint: 'إذا كنت تعتمد على الخدمة الخارجية، فدفتر 25 كابون هو الترشيح الأقرب لتغطية استهلاكك العالي بشكل منظم.',
      tag: 'الخيار الخارجي',
      productId: external25 ? external25.id : null,
      primary: preference === 'external',
      icon: 'fas fa-truck',
      mode: external25 ? 'product' : 'contact',
      ctaText: 'تواصل معنا'
    });

    if (preference === 'internal') {
      cards = [
        internalCard,
        buildAdvisorCard({
          title: external25 ? `${external25.name} (بديل خارجي)` : 'بديل خارجي 25 كابون',
          subtitle: external25 ? `${formatPrice(external25.price)} دينار • إذا أردت تحويل الخدمة لخارجية` : 'بديل خارجي',
          hint: 'يمكنك أيضاً الاعتماد على الخارجي 25 كابون إذا كان هذا النوع من الخدمة أنسب لك في بعض الفترات.',
          tag: 'بديل',
          productId: external25 ? external25.id : null,
          icon: 'fas fa-route',
          mode: external25 ? 'product' : 'contact',
          ctaText: 'تواصل معنا'
        })
      ];
    } else if (preference === 'external') {
      cards = [
        externalCard,
        buildAdvisorCard({
          title: internalProduct ? `${internalProduct.name} (بديل داخلي)` : 'بديل داخلي',
          subtitle: internalProduct ? `${formatPrice(internalProduct.price)} دينار • إذا فضّلت التحويل للخدمة الداخلية` : 'بديل داخلي متاح',
          hint: veryHigh
            ? 'في حال فضّلت الخدمة الداخلية، سيكون خيار 30 داخلي هو الأقوى لهذه الكمية.'
            : 'في حال كانت الخدمة الداخلية أنسب، فدفتر 25 داخلي يعتبر بديلاً جيداً.',
          tag: 'بديل',
          productId: internalProduct ? internalProduct.id : null,
          icon: 'fas fa-house',
          mode: internalProduct ? 'product' : 'contact',
          ctaText: 'تواصل معنا'
        })
      ];
    } else {
      cards = [internalCard, externalCard];
    }
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

