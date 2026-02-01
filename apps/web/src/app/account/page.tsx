"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-slate-900">My Account</h1>
        <Link href="/catalog" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition">
          Continue shopping
        </Link>
      </div>

      {/* Profile info */}
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Profile Information</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-600 mb-1">First Name</p>
            <p className="text-lg font-medium text-slate-900">{user.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Last Name</p>
            <p className="text-lg font-medium text-slate-900">{user.lastName}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-slate-600 mb-1">Email</p>
            <p className="text-lg font-medium text-slate-900">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Order history */}
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Recent Orders</h2>
        <div className="text-center py-8">
          <p className="text-slate-600">No orders yet</p>
          <Link href="/catalog" className="inline-block mt-4 text-sky-600 font-medium hover:text-sky-700">
            Start shopping
          </Link>
        </div>
      </div>

      {/* Addresses */}
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Saved Addresses</h2>
        <div className="text-center py-8">
          <p className="text-slate-600">No saved addresses</p>
          <p className="text-sm text-slate-500 mt-2">Addresses will be saved during checkout</p>
        </div>
      </div>
    </div>
  );
}
                <span>Subtotal: {formatCurrency(primaryOrder.subtotalCents)}</span>
                <span>Shipping: {formatCurrency(primaryOrder.shippingCents)}</span>
                <span>Total: {formatCurrency(primaryOrder.totalCents)}</span>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">No orders yet.</p>
          )}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Shipments</p>
          <div className="mt-4 space-y-4">
            {accountShipments.map((shipment) => (
              <div key={shipment.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{shipment.carrier}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{shipment.status}</p>
                  </div>
                  <p className="text-sm text-slate-500">#{shipment.trackingNumber}</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">Order {shipment.orderId}</p>
                <p className="text-xs text-slate-500">ETA {formatDate(shipment.estimatedDelivery)}</p>
                {shipment.labelUrl && (
                  <Link href={shipment.labelUrl} className="mt-3 inline-flex text-sky-600">
                    Download label
                  </Link>
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Recently viewed</p>
            <h2 className="text-2xl font-semibold text-slate-900">Pick up where you left off</h2>
            <p className="text-sm text-slate-600">Quick links to equipment you reviewed last session.</p>
          </div>
          <Link href="/catalog" className="text-sm font-medium text-slate-900">
            View catalog
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {accountProfile.recentlyViewed.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <p className="text-sm font-medium text-slate-900">{item.name}</p>
              <p className="text-xs text-slate-500">ID: {item.id}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
