"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CircleArrowRight, Filter, PackageSearch, Loader } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { apiClient } from "@/lib/api-client";
import { Category, Product } from "@/lib/types";

export default function CatalogPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, productsData] = await Promise.all([
          apiClient.getCategories(),
          apiClient.getProducts(),
        ]);
        setCategories(categoriesData || []);
        setProducts(productsData || []);
      } catch (err) {
        console.error("Failed to fetch catalog data:", err);
        setError("Unable to load catalog. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="space-y-12">
        <section className="rounded-3xl border border-red-200 bg-red-50 p-10">
          <p className="text-red-700 font-medium">{error}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Catalog</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Curated durable medical equipment ready for prescription routing.
            </h1>
            <p className="text-sm text-slate-600">
              Browse in-stock inventory—each item has verified HCPCS mappings, delivery windows, and documentation checklists.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-slate-600 lg:text-right">
            <p className="inline-flex items-center gap-2">
              <PackageSearch size={16} className="text-sky-500" /> {products.length}+ SKUs staged across regional warehouses.
            </p>
            <p className="inline-flex items-center gap-2">
              <Filter size={16} className="text-sky-500" /> Filtered for Medicare-compliant accessories.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader className="animate-spin text-sky-500" size={24} />
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-500">{category.slug}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{category.description}</p>
            </div>
          ))
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Featured inventory</h2>
          <Link href="/forms" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
            Route prescription <CircleArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
              <Loader className="animate-spin text-sky-500" size={24} />
            </div>
          ) : (
            products.map((product) => (
              <Link key={product.id} href={`/catalog/${product.slug}`}>
                <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition cursor-pointer h-full">
                  {product.media && product.media.length > 0 && (
                    <div className="mb-4 rounded-lg overflow-hidden bg-slate-100 aspect-video">
                      <img
                        src={product.media[0].url}
                        alt={product.media[0].altText || product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.slug.replace(/-/g, " ")}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900">{product.name}</h3>
                    </div>
                    <span className="text-lg font-semibold text-slate-900 ml-2">{formatCurrency(product.priceCents)}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{product.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                    {product.variants?.slice(0, 3).map((variant) => (
                      <span key={variant.id} className="rounded-full border border-slate-200 px-3 py-1">
                        {variant.name}
                      </span>
                    ))}
                    {product.variants && product.variants.length > 3 && (
                      <span className="rounded-full border border-slate-200 px-3 py-1">
                        +{product.variants.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="mt-4 inline-block text-sky-600 font-medium text-sm hover:text-sky-700">
                    View details →
                  </div>
                </article>
              </Link>
            ))
          )}
                    <span key={variant.id} className="rounded-full border border-slate-200 px-3 py-1">
                      {variant.name}
                    </span>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
