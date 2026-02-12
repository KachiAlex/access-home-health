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
