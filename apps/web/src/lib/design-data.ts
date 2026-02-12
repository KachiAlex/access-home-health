export type Category = {
  title: string;
  description: string;
  imageUrl: string;
  productCount: number;
};

export type FeaturedProduct = {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  badge?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

export const categories: Category[] = [
  {
    title: "Mobility Aids",
    description: "Wheelchairs, walkers, and mobility scooters for enhanced independence",
    imageUrl:
      "https://images.unsplash.com/photo-1764745222833-a67f88ab0960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    productCount: 87,
  },
  {
    title: "Hospital Beds",
    description: "Adjustable hospital beds and medical mattresses for comfort",
    imageUrl:
      "https://images.unsplash.com/photo-1710074213379-2a9c2653046a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    productCount: 45,
  },
  {
    title: "Respiratory Care",
    description: "Oxygen concentrators, nebulizers, and breathing support equipment",
    imageUrl:
      "https://images.unsplash.com/photo-1630531207753-f7a2f475f809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    productCount: 62,
  },
  {
    title: "Diagnostic Tools",
    description: "Blood pressure monitors, thermometers, and health tracking devices",
    imageUrl:
      "https://images.unsplash.com/photo-1572996489084-bd293caab387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    productCount: 93,
  },
];

export const featuredProducts: FeaturedProduct[] = [
  {
    name: "Premium Lightweight Wheelchair",
    price: 349.99,
    originalPrice: 449.99,
    rating: 4.8,
    reviews: 156,
    imageUrl:
      "https://images.unsplash.com/photo-1764745222833-a67f88ab0960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "20% OFF",
  },
  {
    name: "Digital Blood Pressure Monitor",
    price: 49.99,
    rating: 4.9,
    reviews: 342,
    imageUrl:
      "https://images.unsplash.com/photo-1572996489084-bd293caab387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "BESTSELLER",
  },
  {
    name: "Adjustable Walking Cane with LED Light",
    price: 29.99,
    rating: 4.7,
    reviews: 89,
    imageUrl:
      "https://images.unsplash.com/photo-1728992311672-22059e8d277c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Portable Oxygen Concentrator",
    price: 1299.99,
    originalPrice: 1599.99,
    rating: 4.9,
    reviews: 78,
    imageUrl:
      "https://images.unsplash.com/photo-1630531207753-f7a2f475f809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    badge: "NEW",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Verified Customer",
    content:
      "Excellent service and high-quality products. The wheelchair I purchased has significantly improved my mother's mobility and independence.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Healthcare Professional",
    content:
      "As a healthcare provider, I trust Access Home Health for all my patient equipment needs. Their products are reliable and delivery is always on time.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Caregiver",
    content:
      "The customer support team was incredibly helpful in choosing the right hospital bed for my father. Installation was professional and efficient.",
    rating: 5,
  },
];
