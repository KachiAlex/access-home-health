"use client";

import Link from "next/link";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/formatters";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotalCents, clearCart } = useCart();

  const shippingCents = items.length > 0 ? 1500 : 0; // $15 flat rate
  const taxCents = Math.round(subtotalCents * 0.08); // 8% tax
  const totalCents = subtotalCents + shippingCents + taxCents;

  if (items.length === 0) {
    return (
      <div className="space-y-8">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium">
          <ArrowLeft size={18} />
          Back to shopping
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-slate-600 mb-6">Your cart is empty</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium">
          <ArrowLeft size={18} />
          Back to shopping
        </Link>
        <h1 className="text-3xl font-semibold text-slate-900">Shopping Cart</h1>
        <div className="w-20"></div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.productName}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.variantName}</p>
                  <p className="text-xs text-slate-500 mt-2">SKU: {item.sku}</p>
                </div>
                <p className="text-lg font-semibold text-slate-900">{formatCurrency(item.priceCents)}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-lg border border-slate-200 w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-lg border border-slate-200 w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-600">Subtotal</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatCurrency(item.priceCents * item.quantity)}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-lg border border-red-200 text-red-600 p-2 hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="w-full rounded-lg border border-red-200 text-red-600 px-4 py-2 hover:bg-red-50 transition text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        {/* Order summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit sticky top-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Order Summary</h2>

          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>{formatCurrency(shippingCents)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (8%)</span>
              <span>{formatCurrency(taxCents)}</span>
            </div>
          </div>

          <div className="my-6 flex justify-between items-center">
            <span className="text-lg font-semibold text-slate-900">Total</span>
            <span className="text-2xl font-bold text-sky-600">{formatCurrency(totalCents)}</span>
          </div>

          <button className="w-full rounded-full bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition shadow-sm">
            Proceed to Checkout
          </button>

          <p className="text-xs text-slate-500 text-center mt-4">
            Checkout functionality coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
