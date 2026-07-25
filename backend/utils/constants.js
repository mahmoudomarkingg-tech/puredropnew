'use strict';

const ORDER_STATUS_LABELS = {
  pending: 'طلب جديد',
  confirmed: 'تم التأكيد',
  preparing: 'قيد التجهيز',
  out_for_delivery: 'خرج للتوصيل',
  delivered: 'تم التسليم',
  cancelled: 'ملغي'
};

const ORDER_STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#06b6d4',
  preparing: '#3b82f6',
  out_for_delivery: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444'
};

const PAYMENT_STATUS_LABELS = {
  unpaid: 'غير مدفوع',
  paid: 'مدفوع',
  refunded: 'مسترد'
};

const PAYMENT_METHOD_LABELS = {
  cash_on_delivery: 'الدفع عند الاستلام',
  card: 'بطاقة',
  bank_transfer: 'حوالة بنكية'
};

const DELIVERY_TIME_LABELS = {
  asap: 'في أقرب وقت',
  evening: 'مساءً (6-10)'
};

const DELIVERY_STATUS_VALUES = new Set(['لم يتم التسليم', 'تم التسليم']);

module.exports = {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  DELIVERY_TIME_LABELS,
  DELIVERY_STATUS_VALUES
};
