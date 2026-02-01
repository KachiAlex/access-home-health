import type { FeaturedProduct } from "@/lib/design-data";
import { Star } from "lucide-react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductCard({ name, price, originalPrice, rating, reviews, imageUrl, badge }: FeaturedProduct) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden">
        <img src={imageUrl} alt={name} className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
        {badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 py-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: Math.round(rating) }).map((_, index) => (
                <Star key={index} size={16} className="fill-current" />
              ))}
            </div>
            <span>{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3">
          <span className="text-2xl font-semibold text-primary">{currency.format(price)}</span>
          {originalPrice ? (
            <span className="text-sm text-muted-foreground line-through">{currency.format(originalPrice)}</span>
          ) : null}
        </div>
        <button className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
          Add to cart
        </button>
      </div>
    </div>
  );
}
