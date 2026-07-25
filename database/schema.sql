-- PureDrop PostgreSQL Schema
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE,
  description TEXT NOT NULL,
  full_description TEXT,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  base_price NUMERIC(12, 2) CHECK (base_price IS NULL OR base_price >= 0),
  chilled_price NUMERIC(12, 2) CHECK (chilled_price IS NULL OR chilled_price >= 0),
  currency TEXT NOT NULL DEFAULT 'JOD',
  emoji TEXT,
  image_path TEXT,
  badge TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 999 CHECK (stock_quantity >= 0),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(sort_order);

CREATE TABLE IF NOT EXISTS product_options (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  option_code TEXT NOT NULL,
  label_ar TEXT NOT NULL,
  label_en TEXT,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  description TEXT,
  is_default INTEGER NOT NULL DEFAULT 0 CHECK (is_default IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, option_code)
);

CREATE INDEX IF NOT EXISTS idx_product_options_product_id ON product_options(product_id);

CREATE TABLE IF NOT EXISTS product_specs (
  product_id INTEGER PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  volume TEXT,
  weight TEXT,
  material TEXT,
  shelf_life TEXT,
  storage TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_certifications (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  certification TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE (product_id, certification)
);

CREATE INDEX IF NOT EXISTS idx_product_certifications_product_id ON product_certifications(product_id);

CREATE TABLE IF NOT EXISTS product_usage_tips (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tip TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE (product_id, tip)
);

CREATE INDEX IF NOT EXISTS idx_product_usage_tips_product_id ON product_usage_tips(product_id);

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);

CREATE TABLE IF NOT EXISTS order_statuses (
  status TEXT PRIMARY KEY,
  label_ar TEXT NOT NULL,
  description_ar TEXT,
  color TEXT NOT NULL DEFAULT '#06b6d4',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_final INTEGER NOT NULL DEFAULT 0 CHECK (is_final IN (0, 1))
);

INSERT INTO order_statuses (status, label_ar, description_ar, color, sort_order, is_final) VALUES
  ('pending', 'طلب جديد', 'تم استلام الطلب من الموقع وينتظر المراجعة', '#f59e0b', 1, 0),
  ('confirmed', 'تم التأكيد', 'تم تأكيد الطلب مع العميل', '#06b6d4', 2, 0),
  ('preparing', 'قيد التجهيز', 'الطلب قيد التجهيز في المستودع', '#3b82f6', 3, 0),
  ('out_for_delivery', 'خرج للتوصيل', 'الطلب مع السائق وفي الطريق للعميل', '#8b5cf6', 4, 0),
  ('delivered', 'تم التسليم', 'تم تسليم الطلب بنجاح', '#10b981', 5, 1),
  ('cancelled', 'ملغي', 'تم إلغاء الطلب', '#ef4444', 6, 1)
ON CONFLICT (status) DO NOTHING;

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'))
    REFERENCES order_statuses(status) ON UPDATE CASCADE ON DELETE RESTRICT,
  delivery_time_preference TEXT,
  customer_name_snapshot TEXT,
  customer_phone_snapshot TEXT,
  customer_address_snapshot TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  location_maps_url TEXT,
  subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
  delivery_fee NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
  tax NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
  total NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
  currency TEXT NOT NULL DEFAULT 'JOD',
  source TEXT NOT NULL DEFAULT 'website',
  payment_method TEXT NOT NULL DEFAULT 'cash_on_delivery'
    CHECK (payment_method IN ('cash_on_delivery', 'card', 'bank_transfer')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  delivery_status TEXT NOT NULL DEFAULT 'لم يتم التسليم'
    CHECK (delivery_status IN ('لم يتم التسليم', 'تم التسليم')),
  delivery_notes TEXT,
  delivery_status_updated_at TIMESTAMPTZ,
  notes TEXT,
  admin_notes TEXT,
  confirmed_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_delivery_status ON orders(delivery_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  product_option_id INTEGER REFERENCES product_options(id) ON DELETE SET NULL,
  product_name_snapshot TEXT NOT NULL,
  option_label_snapshot TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  line_total NUMERIC(12, 2) NOT NULL CHECK (line_total >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

CREATE TABLE IF NOT EXISTS order_status_history (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  old_status TEXT REFERENCES order_statuses(status) ON UPDATE CASCADE ON DELETE SET NULL,
  new_status TEXT NOT NULL REFERENCES order_statuses(status) ON UPDATE CASCADE ON DELETE RESTRICT,
  note TEXT,
  changed_by TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_created_at ON order_status_history(created_at);

CREATE TABLE IF NOT EXISTS "متابعة_تسليم_الطلبات" (
  "معرف الطلب" INTEGER PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
  "رقم الطلب" TEXT NOT NULL UNIQUE,
  "هل تم التسليم" TEXT NOT NULL DEFAULT 'لم يتم التسليم'
    CHECK ("هل تم التسليم" IN ('لم يتم التسليم', 'تم التسليم')),
  "تاريخ التسليم" TIMESTAMPTZ,
  "ملاحظات التسليم" TEXT,
  "آخر تحديث" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "idx_متابعة_التسليم_الحالة" ON "متابعة_تسليم_الطلبات" ("هل تم التسليم");
CREATE INDEX IF NOT EXISTS "idx_متابعة_التسليم_رقم_الطلب" ON "متابعة_تسليم_الطلبات" ("رقم الطلب");

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  service_type TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'seen', 'replied', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

CREATE TABLE IF NOT EXISTS ai_conversations (
  id SERIAL PRIMARY KEY,
  session_id TEXT,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_session_id ON ai_conversations(session_id);

CREATE TABLE IF NOT EXISTS hydration_calculations (
  id SERIAL PRIMARY KEY,
  weight_kg NUMERIC(10, 2) NOT NULL,
  activity_level TEXT NOT NULL,
  recommended_liters NUMERIC(10, 2) NOT NULL,
  recommended_product TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS family_advisor_calculations (
  id SERIAL PRIMARY KEY,
  daily_liters NUMERIC(10, 2) NOT NULL,
  monthly_liters NUMERIC(10, 2) NOT NULL,
  monthly_bottles INTEGER NOT NULL,
  service_preference TEXT,
  best_fit TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_categories_updated_at ON categories;
CREATE TRIGGER trg_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS trg_product_options_updated_at ON product_options;
CREATE TRIGGER trg_product_options_updated_at
BEFORE UPDATE ON product_options
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS trg_product_specs_updated_at ON product_specs;
CREATE TRIGGER trg_product_specs_updated_at
BEFORE UPDATE ON product_specs
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS trg_customers_updated_at ON customers;
CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS trg_orders_updated_at ON orders;
CREATE TRIGGER trg_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS trg_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER trg_contact_messages_updated_at
BEFORE UPDATE ON contact_messages
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE OR REPLACE FUNCTION sync_delivery_tracking_on_order_insert()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "متابعة_تسليم_الطلبات"
    ("معرف الطلب", "رقم الطلب", "هل تم التسليم", "تاريخ التسليم", "ملاحظات التسليم")
  VALUES
    (NEW.id, NEW.order_number, COALESCE(NEW.delivery_status, 'لم يتم التسليم'), NEW.delivered_at, NEW.delivery_notes)
  ON CONFLICT ("معرف الطلب") DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_orders_create_delivery_tracking ON orders;
CREATE TRIGGER trg_orders_create_delivery_tracking
AFTER INSERT ON orders
FOR EACH ROW EXECUTE PROCEDURE sync_delivery_tracking_on_order_insert();

CREATE OR REPLACE FUNCTION touch_delivery_tracking_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."آخر تحديث" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_delivery_tracking_updated_at ON "متابعة_تسليم_الطلبات";
CREATE TRIGGER trg_delivery_tracking_updated_at
BEFORE UPDATE ON "متابعة_تسليم_الطلبات"
FOR EACH ROW EXECUTE PROCEDURE touch_delivery_tracking_updated_at();

CREATE OR REPLACE FUNCTION sync_delivery_tracking_to_orders()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE orders
  SET
    delivery_status = NEW."هل تم التسليم",
    delivery_notes = NEW."ملاحظات التسليم",
    delivery_status_updated_at = NOW(),
    delivered_at = CASE
      WHEN NEW."هل تم التسليم" = 'تم التسليم'
        THEN COALESCE(NEW."تاريخ التسليم", delivered_at, NOW())
      ELSE NULL
    END,
    status = CASE
      WHEN NEW."هل تم التسليم" = 'تم التسليم' AND status <> 'cancelled' THEN 'delivered'
      WHEN NEW."هل تم التسليم" = 'لم يتم التسليم' AND status = 'delivered' THEN 'out_for_delivery'
      ELSE status
    END
  WHERE id = NEW."معرف الطلب";
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_delivery_tracking_to_orders ON "متابعة_تسليم_الطلبات";
CREATE TRIGGER trg_delivery_tracking_to_orders
AFTER UPDATE OF "هل تم التسليم", "تاريخ التسليم", "ملاحظات التسليم"
ON "متابعة_تسليم_الطلبات"
FOR EACH ROW EXECUTE PROCEDURE sync_delivery_tracking_to_orders();
