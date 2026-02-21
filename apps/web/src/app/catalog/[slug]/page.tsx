"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Loader } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useCart } from "@/lib/cart-context";
import { Product, ProductVariant } from "@/lib/types";
import { formatCurrency } from "@/lib/formatters";

// FIXED: Clean component

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = (await apiClient.getProductBySlug(slug)) as Product;
        setProduct(data);
        if (data?.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Unable to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (selectedVariant && product) {
      addItem({
        productId: product.id,
        productName: product.name,
        variantId: selectedVariant.id,
        variantName: selectedVariant.name,
        sku: selectedVariant.sku,
        priceCents: selectedVariant.priceCents,
        quantity,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
      setQuantity(1); // Reset quantity
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="animate-spin text-sky-500" size={32} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-8">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700">
          <ArrowLeft size={18} />
          Back to catalog
        </Link>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10">
          <p className="text-red-700 font-medium">{error || "Product not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link href="/catalog" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium">
        <ArrowLeft size={18} />
        Back to catalog
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product image */}
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          {product.media && product.media.length > 0 ? (
            <img
              src={product.media[0].url}
              alt={product.media[0].altText || product.name}
              className="w-full h-full object-cover aspect-square"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center aspect-square">
              <p className="text-slate-500">No image available</p>
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500 mb-2">Medical Equipment</p>
            <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
            <p className="mt-4 text-lg text-slate-600">{product.shortDescription}</p>
          </div>

          {/* Price */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {formatCurrency(selectedVariant?.priceCents || product.priceCents)}
              </span>
              <span className="text-sm text-slate-600">USD</span>
            </div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 1 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-900">Choose option:</p>
              <div className="grid gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`rounded-lg border-2 px-4 py-3 text-left transition ${
                      selectedVariant?.id === variant.id
                        ? "border-sky-500 bg-sky-50 font-medium text-sky-900"
                        : "border-slate-200 hover:border-slate-300 text-slate-900"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{variant.name}</span>
                      <span className="text-sm text-slate-600">{formatCurrency(variant.priceCents)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-900">Quantity:</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-lg border border-slate-200 w-10 h-10 flex items-center justify-center hover:bg-slate-50 transition"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 rounded-lg border border-slate-200 px-3 py-2 text-center"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-lg border border-slate-200 w-10 h-10 flex items-center justify-center hover:bg-slate-50 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full rounded-full bg-sky-600 px-6 py-4 text-white font-medium transition hover:bg-sky-700 flex items-center justify-center gap-2 shadow-sm"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          {addedToCart && (
            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm font-medium">
              ✓ Added to cart!
            </div>
          )}

          {/* Product specs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <h3 className="font-medium text-slate-900">Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">SKU</dt>
                <dd className="text-slate-900 font-mono">{selectedVariant?.sku}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Category</dt>
                <dd className="text-slate-900">{product.categoryId?.replace(/_/g, " ")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Currency</dt>
                <dd className="text-slate-900">{product.currency}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Related products - coming soon */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
        <p className="text-slate-600">Related products coming soon</p>
      </div>
    </div>
  );
}
