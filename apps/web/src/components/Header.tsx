"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/access-home-logo.png"
              alt="Access Home Health"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden lg:block text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Account */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:block text-sm text-gray-700 whitespace-nowrap">
                  {user?.firstName}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <User size={20} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                <User size={20} />
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar - Expandable */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for medical supplies..."
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 text-base font-medium transition-colors w-full"
                >
                  <Search size={20} />
                  <span>Search</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
