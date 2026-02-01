import { Category, Product, Order, Shipment, Profile } from "./types";

export const categories: Category[] = [
  {
    id: "cat_mobility",
    name: "Mobility Aids",
    slug: "mobility-aids",
    description: "Wheelchairs, walkers, and accessories for confident movement.",
  },
  {
    id: "cat_respiratory",
    name: "Respiratory Care",
    slug: "respiratory-care",
    description: "CPAP kits, nebulizers, and monitoring devices.",
  },
  {
    id: "cat_daily",
    name: "Daily Living",
    slug: "daily-living",
    description: "Bath safety, cushions, and in-home essentials.",
  },
];

export const featuredProducts: Product[] = [
  {
    id: "prod_compact_chair",
    name: "Compact Travel Wheelchair",
    slug: "compact-travel-wheelchair",
    shortDescription: "Featherweight frame, airline-ready, and folds in 3 seconds.",
    priceCents: 32900,
    currency: "USD",
    categoryId: "cat_mobility",
    media: [
      {
        id: "media_wheelchair",
        url: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80",
        altText: "Compact wheelchair",
      },
    ],
  },
  {
    id: "prod_sleep_apnea",
    name: "Sleep Apnea Therapy Kit",
    slug: "sleep-apnea-therapy-kit",
    shortDescription: "CPAP starter bundle with humidifier and heated tubing.",
    priceCents: 78900,
    currency: "USD",
    categoryId: "cat_respiratory",
    media: [
      {
        id: "media_cpap",
        url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80",
        altText: "CPAP machine",
      },
    ],
  },
  {
    id: "prod_inclined_cushion",
    name: "Inclined Support Cushion",
    slug: "inclined-support-cushion",
    shortDescription: "Breathable memory foam wedge for elevated comfort.",
    priceCents: 11900,
    currency: "USD",
    categoryId: "cat_daily",
    media: [
      {
        id: "media_cushion",
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
        altText: "Support cushion",
      },
    ],
  },
];

export const catalogProducts: Product[] = [
  ...featuredProducts,
  {
    id: "prod_modular_ramp",
    name: "Modular Entry Ramp",
    slug: "modular-entry-ramp",
    shortDescription: "Tool-free aluminum ramp kits that adapt to any doorway.",
    priceCents: 28900,
    currency: "USD",
    categoryId: "cat_mobility",
  },
  {
    id: "prod_portable_nebulizer",
    name: "Portable Mesh Nebulizer",
    slug: "portable-mesh-nebulizer",
    shortDescription: "Cordless respiratory relief that fits in a coat pocket.",
    priceCents: 15900,
    currency: "USD",
    categoryId: "cat_respiratory",
  },
  {
    id: "prod_transfer_bench",
    name: "Pivot Transfer Bench",
    slug: "pivot-transfer-bench",
    shortDescription: "Pivot-seat bath bench simplifies safe transfers.",
    priceCents: 18900,
    currency: "USD",
    categoryId: "cat_daily",
  },
  {
    id: "prod_smart_pill",
    name: "Smart Pill Dispenser",
    slug: "smart-pill-dispenser",
    shortDescription: "App-connected reminders with caregiver alerts.",
    priceCents: 24900,
    currency: "USD",
    categoryId: "cat_daily",
  },
];

export const marketingHighlights = [
  {
    eyebrow: "Medicare Friendly",
    title: "Licensed in 21 states with concierge equipment delivery.",
    description: "We coordinate prescriptions, insurance approvals, and doorstep setup so you can focus on patient care.",
  },
  {
    eyebrow: "Clinical Partnerships",
    title: "Seamless intake workflows for hospital discharge planners.",
    description: "Secure referral portal, E-Fax automations, and shipment visibility keep teams aligned.",
  },
  {
    eyebrow: "Same-Week Shipping",
    title: "Regional warehouses move 85% of orders within 72 hours.",
    description: "Inventory telemetry alerts our team before a supply disruption impacts your patients.",
  },
];

export const supportForms = [
  {
    id: "form_prescription",
    name: "Prescription Upload",
    description: "Securely share RX documents and insurance details to start fulfillment.",
    fields: ["Patient Details", "Insurance Card", "Diagnosis Codes", "Preferred Delivery"],
  },
  {
    id: "form_service",
    name: "Service & Maintenance",
    description: "Request in-home tune-ups, part replacements, or loaner equipment.",
    fields: ["Equipment ID", "Issue Summary", "Location", "Urgency"],
  },
  {
    id: "form_shipping",
    name: "Shipping Inquiry",
    description: "Check status, reroute packages, or add delivery instructions.",
    fields: ["Order Number", "Contact", "Question"],
  },
];

export const marketingStats = [
  { label: "Providers served", value: "4,800+", detail: "Clinics and discharge teams trust our catalog" },
  { label: "Average CSAT", value: "4.9/5", detail: "Measured via post-delivery surveys" },
  { label: "Claims approved", value: "96%", detail: "Submitted with compliant documentation" },
];

export const testimonials = [
  {
    author: "Dr. L. Morales",
    role: "Pulmonology Lead, Coastal Care",
    quote:
      "Access Home Health owns the hand-off from our team to the patient—shipping, setup, and education happen without friction.",
  },
  {
    author: "Casey Bennett",
    role: "Hospital DME Coordinator",
    quote: "Their referral portal shaved two days off our discharge timeline for respiratory patients.",
  },
];

export const marketingAssets = [
  {
    id: "asset_brand",
    name: "Brand & style kit",
    description: "Logo suite, typography, and hero photography to relaunch your site or referral portal.",
    icon: "presentation",
    action: { label: "View deck", href: "#" },
  },
  {
    id: "asset_case",
    name: "Payer case studies",
    description: "Documentation workflows that lifted claim approvals to 96% across Medicare and commercial plans.",
    icon: "file-text",
    action: { label: "Download PDF", href: "#" },
  },
  {
    id: "asset_email",
    name: "Email nurture library",
    description: "Ready-to-send onboarding emails for caregivers, therapists, and hospital partners.",
    icon: "mail",
    action: { label: "Request access", href: "mailto:marketing@accessmedhomehealth.com" },
  },
];

export const accountProfile: Profile = {
  id: "user_primary",
  email: "hello@accessmedhomehealth.com",
  firstName: "Access",
  lastName: "Home Health",
  phone: "+1 (800) 555-1029",
  preferredStore: "Jacksonville, FL",
  recentlyViewed: featuredProducts.slice(0, 2).map((product) => ({
    id: product.id,
    name: product.name,
  })),
};

export const accountOrders: Order[] = [
  {
    id: "order_demo",
    orderNumber: "AH-10294",
    status: "FULFILLED",
    subtotalCents: 82900,
    shippingCents: 2500,
    taxCents: 6100,
    totalCents: 91500,
    currency: "USD",
    placedAt: new Date().toISOString(),
    items: [
      {
        id: "order_item_demo",
        productName: "Sleep Apnea Therapy Kit",
        variantName: "Heated Tubing",
        quantity: 1,
        totalCents: 82900,
      },
    ],
  },
];

export const accountShipments: Shipment[] = [
  {
    id: "ship_demo",
    orderId: "order_demo",
    carrier: "FedEx",
    trackingNumber: "7854 9930 1200",
    status: "IN_TRANSIT",
    labelUrl: "#",
    estimatedDelivery: new Date(Date.now() + 2 * 86400000).toISOString(),
  },
];
