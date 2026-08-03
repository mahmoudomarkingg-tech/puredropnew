# قطرة نقية | PureDrop

موقع طلب مياه وكابونات رقمية مع لوحة إدارة (Express + PostgreSQL).

## التشغيل المحلي

```bash
npm install
cp .env.example .env
npm run start:local
```

- الموقع: http://localhost:3000  
- لوحة الإدارة: http://localhost:3000/admin/

عدّل `.env` قبل الإنتاج (كلمات المرور، `JWT_SECRET`، `GOOGLE_CLIENT_ID`).

## ملاحظات

- لا ترفع ملف `.env` إلى GitHub.
- استخدم `.env.example` كمرجع للإعدادات.
- دخول العملاء: **بريد + كلمة مرور** دائماً، وGoogle عند ضبط `GOOGLE_CLIENT_ID`.
- على Render: Environment → أضف `GOOGLE_CLIENT_ID` من Google Cloud (اختياري)، ولا ترفع ملف `.env`.
- الوضع الافتراضي للموقع: **صباحي (فاتح)**.
