"use client";

import Link from "next/link";
import { Phone, ShoppingCart, LogOut } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/forms", label: "Clinical Forms" },
  { href: "/marketing", label: "Marketing Kit" },
  { href: "/account", label: "My Account" },
];

export function Header() {
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="border-b border-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Access Home Health</p>
          <p className="text-sm text-muted-foreground">
            Modern durable medical equipment for providers, caregivers, and patients.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-foreground/80">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1 transition hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <a
              href="tel:1-800-555-2040"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Phone size={16} />
              1-800-555-2040
            </a>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-sm transition hover:bg-primary/90 relative"
            >
              <ShoppingCart size={16} />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Hi, {user?.firstName}</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
