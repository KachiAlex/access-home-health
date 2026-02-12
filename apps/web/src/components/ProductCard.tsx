'use client';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  badge?: string;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductCard({ name, price, originalPrice, rating, reviews, imageUrl, badge }: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 py-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="mt-3 flex items-center gap-1 text-sm text-gray-600">
            <div className="flex items-center gap-0.5 text-yellow-500">
              {Array.from({ length: Math.round(rating) }).map((_, index) => (
                <Star key={index} size={16} className="fill-current" />
              ))}
            </div>
            <span>{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({reviews} reviews)</span>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3">
          <span className="text-2xl font-semibold text-gray-900">{currency.format(price)}</span>
          {originalPrice ? (
            <span className="text-sm text-gray-500 line-through">{currency.format(originalPrice)}</span>
          ) : null}
        </div>
        <button className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          Add to cart
        </button>
      </div>
    </div>
  );
}
