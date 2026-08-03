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
- دخول العملاء عبر Google؛ في التطوير يمكن تفعيل `ALLOW_DEMO_GOOGLE_LOGIN=true`.
