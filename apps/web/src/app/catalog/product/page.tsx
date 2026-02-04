"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Loader } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailPage() {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Mock product data for static export
  const product = {
    id: "1",
    name: "Premium Lightweight Wheelchair",
    shortDescription: "High-quality lightweight wheelchair for enhanced mobility",
    priceCents: 34999,
    currency: "USD",
    media: [
      {
        url: "https://images.unsplash.com/photo-1764745222833-a67f88ab0960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
        altText: "Premium Lightweight Wheelchair"
      }
    ],
    variants: [
      {
        id: "variant-1",
        name: "Standard Size",
        sku: "WC-001-STD",
        priceCents: 34999
      },
      {
        id: "variant-2", 
        name: "Large Size",
        sku: "WC-001-LRG",
        priceCents: 39999
      }
    ],
    categoryId: "mobility_aids"
  };

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

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
      setQuantity(1);
    }
  };

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
    </div>
  );
}
