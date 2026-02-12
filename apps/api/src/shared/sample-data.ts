export const sampleCategories = [
  {
    id: 'cat_mobility',
    name: 'Mobility Aids',
    slug: 'mobility-aids',
    description: 'Wheelchairs, walkers, and accessories for everyday comfort.',
  },
  {
    id: 'cat_respiratory',
    name: 'Respiratory Care',
    slug: 'respiratory-care',
    description: 'Nebulizers, oxygen supplies, and monitoring devices.',
  },
];

export const sampleProducts = [
  {
    id: 'prod_compact_chair',
    name: 'Compact Travel Wheelchair',
    slug: 'compact-travel-wheelchair',
    shortDescription: 'Lightweight aluminum frame with quick-fold release.',
    priceCents: 32900,
    currency: 'USD',
    categoryId: 'cat_mobility',
    media: [
      {
        id: 'media_wheelchair',
        url: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80',
      },
    ],
    variants: [
      { id: 'var_compact_standard', sku: 'CHAIR-STD', name: 'Standard', priceCents: 32900 },
      { id: 'var_compact_plus', sku: 'CHAIR-PLUS', name: 'Plus Cushion', priceCents: 35900 },
    ],
  },
  {
    id: 'prod_sleep_apnea',
    name: 'Sleep Apnea Therapy Kit',
    slug: 'sleep-apnea-therapy-kit',
    shortDescription: 'Complete CPAP starter bundle with built-in humidifier.',
    priceCents: 78900,
    currency: 'USD',
    categoryId: 'cat_respiratory',
    media: [
      {
        id: 'media_cpap',
        url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      },
    ],
    variants: [
      { id: 'var_cpap_standard', sku: 'CPAP-STD', name: 'Standard Tubing', priceCents: 78900 },
      { id: 'var_cpap_heated', sku: 'CPAP-HEAT', name: 'Heated Tubing', priceCents: 82900 },
    ],
  },
];

export const sampleOrders = [
  {
    id: 'order_demo',
    orderNumber: 'AH-10294',
    status: 'FULFILLED',
    subtotalCents: 82900,
    shippingCents: 2500,
    taxCents: 6100,
    totalCents: 91500,
    currency: 'USD',
    placedAt: new Date().toISOString(),
    items: [
      {
        id: 'order_item_demo',
        productName: 'Sleep Apnea Therapy Kit',
        variantName: 'Heated Tubing',
        quantity: 1,
        totalCents: 82900,
      },
    ],
  },
];

export const sampleShipments = [
  {
    id: 'ship_demo',
    orderId: 'order_demo',
    carrier: 'FedEx',
    trackingNumber: '7854 9930 1200',
    status: 'IN_TRANSIT',
    labelUrl: '#',
    estimatedDelivery: new Date(Date.now() + 2 * 86400000).toISOString(),
  },
];

export const sampleProfile = {
  id: 'user_primary',
  email: 'hello@accessmedhomehealth.com',
  firstName: 'Access',
  lastName: 'Home Health',
  phone: '+1 (800) 555-1029',
  preferredStore: 'Jacksonville, FL',
  recentlyViewed: sampleProducts.slice(0, 2).map((p) => ({ id: p.id, name: p.name })),
};
