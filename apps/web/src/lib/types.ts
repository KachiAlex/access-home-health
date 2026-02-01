export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type ProductMedia = {
  id: string;
  url: string;
  altText?: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  name: string;
  priceCents: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  priceCents: number;
  currency: string;
  categoryId?: string;
  media?: ProductMedia[];
  variants?: ProductVariant[];
};

export type OrderItem = {
  id: string;
  productName: string;
  variantName?: string;
  quantity: number;
  totalCents: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  status: string;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  currency: string;
  placedAt?: string;
  items?: OrderItem[];
};

export type Shipment = {
  id: string;
  orderId: string;
  carrier: string;
  trackingNumber?: string;
  status: string;
  labelUrl?: string;
  estimatedDelivery?: string;
};

export type Profile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferredStore?: string;
  recentlyViewed: { id: string; name: string }[];
};
