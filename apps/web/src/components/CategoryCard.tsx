'use client';
import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

export function CategoryCard({ title, description, imageUrl, productCount }: CategoryCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900">
          {productCount} products
        </span>
      </div>
      <div className="space-y-2 px-6 py-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
