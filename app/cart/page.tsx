"use client";

import Link from "next/link";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              TobaMart
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/shop" className="hover:text-primary transition-colors">দোকান</Link>
              <Link href="/cart" className="text-primary font-semibold">কার্ট</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">আপনার কার্ট</h1>
        
        <div className="bg-card border rounded-lg p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-muted-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">আপনার কার্ট খালি</h2>
            <p className="text-muted-foreground mb-6">
              আপনার কার্টে এখনো কোন পণ্য নেই। কেনাকাটা শুরু করুন!
            </p>
            <Link
              href="/shop"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              কেনাকাটা শুরু করুন
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
