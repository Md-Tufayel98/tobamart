"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function HomePage() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      return data || [];
    },
  });

  const { data: products } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .eq("is_active", true)
        .limit(8);
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              TobaMart
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/shop" className="hover:text-primary transition-colors">দোকান</Link>
              <Link href="/cart" className="hover:text-primary transition-colors">কার্ট</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
            খাঁটি প্রাকৃতিক পণ্যের বাজার
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            বাংলাদেশের সেরা অনলাইন মুদি দোকান - খাঁটি মধু, ঘি, তেল এবং আরও অনেক কিছু
          </p>
          <Link
            href="/shop"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
          >
            কেনাকাটা শুরু করুন
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">পণ্যের ধরন</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories?.map((category: any) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group border rounded-lg p-4 text-center hover:border-primary hover:shadow-lg transition-all"
              >
                {category.image_url && (
                  <img 
                    src={category.image_url} 
                    alt={category.name_bn}
                    className="w-full aspect-square object-cover rounded-lg mb-2"
                  />
                )}
                {!category.image_url && (
                  <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-4xl">{category.name_bn[0]}</span>
                  </div>
                )}
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {category.name_bn}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">বিশেষ পণ্য</h2>
            <Link href="/shop" className="text-primary hover:underline">
              সব দেখুন →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product: any) => (
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
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TobaMart</h3>
              <p className="text-muted-foreground">
                বাংলাদেশের সেরা অনলাইন মুদি দোকান
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">লিংক</h3>
              <div className="flex flex-col gap-2">
                <Link href="/shop" className="text-muted-foreground hover:text-primary">দোকান</Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary">আমাদের সম্পর্কে</Link>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">যোগাযোগ</Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">যোগাযোগ</h3>
              <p className="text-muted-foreground">
                ঢাকা, বাংলাদেশ<br />
                ফোন: +৮৮০১৭০০০০০০০০
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TobaMart. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
