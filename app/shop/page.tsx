"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ShopPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              TobaMart
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/shop" className="text-primary font-semibold">দোকান</Link>
              <Link href="/cart" className="hover:text-primary transition-colors">কার্ট</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">সব পণ্য</h1>
        
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card border rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {product.images && product.images[0] && (
                  <img 
                    src={product.images[0]} 
                    alt={product.name_bn}
                    className="w-full aspect-square object-cover"
                  />
                )}
                {(!product.images || !product.images[0]) && (
                  <div className="w-full aspect-square bg-muted flex items-center justify-center">
                    <span className="text-6xl text-muted-foreground">{product.name_bn[0]}</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name_bn}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    {product.sale_price && (
                      <>
                        <p className="text-primary font-bold text-lg">৳{product.sale_price}</p>
                        <p className="text-muted-foreground text-sm line-through">৳{product.base_price}</p>
                      </>
                    )}
                    {!product.sale_price && (
                      <p className="text-primary font-bold text-lg">৳{product.base_price}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && (!products || products.length === 0) && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-xl mb-4">কোন পণ্য পাওয়া যায়নি</p>
            <Link href="/" className="text-primary hover:underline">
              হোমপেজে ফিরে যান
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
