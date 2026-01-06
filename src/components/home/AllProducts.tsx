import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [visibleCount, setVisibleCount] = useState(8);

  // Demo products - will be replaced with Supabase data
  const allProducts = [
    {
      id: "1",
      name_bn: "সুন্দরবনের খাঁটি মধু",
      slug: "sundarban-pure-honey",
      image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
      base_price: 850,
      sale_price: 750,
      rating: 4.8,
      reviews_count: 124,
      stock_quantity: 50,
    },
    {
      id: "2",
      name_bn: "খাঁটি গাওয়া ঘি",
      slug: "pure-deshi-ghee",
      image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop",
      base_price: 1200,
      sale_price: null,
      rating: 4.9,
      reviews_count: 89,
      stock_quantity: 30,
    },
    {
      id: "3",
      name_bn: "কালোজিরা তেল (অর্গানিক)",
      slug: "organic-black-seed-oil",
      image_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
      base_price: 550,
      sale_price: 480,
      rating: 4.7,
      reviews_count: 56,
      stock_quantity: 45,
    },
    {
      id: "4",
      name_bn: "চিনিগুঁড়া চাল (৫ কেজি)",
      slug: "chinigura-rice-5kg",
      image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      base_price: 750,
      sale_price: null,
      rating: 4.6,
      reviews_count: 78,
      stock_quantity: 100,
    },
    {
      id: "5",
      name_bn: "সরিষার তেল (১ লিটার)",
      slug: "mustard-oil-1l",
      image_url: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&h=400&fit=crop",
      base_price: 280,
      sale_price: null,
      rating: 4.5,
      reviews_count: 92,
      stock_quantity: 80,
    },
    {
      id: "6",
      name_bn: "মিক্সড ড্রাই ফ্রুটস",
      slug: "mixed-dry-fruits",
      image_url: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop",
      base_price: 650,
      sale_price: 580,
      rating: 4.7,
      reviews_count: 45,
      stock_quantity: 35,
    },
    {
      id: "7",
      name_bn: "হলুদ গুঁড়া (অর্গানিক)",
      slug: "organic-turmeric-powder",
      image_url: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&h=400&fit=crop",
      base_price: 180,
      sale_price: null,
      rating: 4.6,
      reviews_count: 67,
      stock_quantity: 120,
    },
    {
      id: "8",
      name_bn: "খেজুরের গুড়",
      slug: "date-palm-jaggery",
      image_url: "https://images.unsplash.com/photo-1605197788044-5a55a8e16b96?w=400&h=400&fit=crop",
      base_price: 350,
      sale_price: 320,
      rating: 4.8,
      reviews_count: 38,
      stock_quantity: 60,
    },
    {
      id: "9",
      name_bn: "সিলেটি চা পাতা",
      slug: "sylheti-tea-leaves",
      image_url: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop",
      base_price: 420,
      sale_price: null,
      rating: 4.5,
      reviews_count: 52,
      stock_quantity: 70,
    },
    {
      id: "10",
      name_bn: "নারকেল তেল (ভার্জিন)",
      slug: "virgin-coconut-oil",
      image_url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop",
      base_price: 450,
      sale_price: 399,
      rating: 4.7,
      reviews_count: 84,
      stock_quantity: 55,
    },
    {
      id: "11",
      name_bn: "কাঠ বাদাম",
      slug: "almonds",
      image_url: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=400&fit=crop",
      base_price: 950,
      sale_price: null,
      rating: 4.6,
      reviews_count: 41,
      stock_quantity: 40,
    },
    {
      id: "12",
      name_bn: "মরিচ গুঁড়া (ঝাল)",
      slug: "red-chili-powder",
      image_url: "https://images.unsplash.com/photo-1599909533681-74cc1f9886d4?w=400&h=400&fit=crop",
      base_price: 220,
      sale_price: 199,
      rating: 4.4,
      reviews_count: 29,
      stock_quantity: 90,
    },
  ];

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, allProducts.length));
  };

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
  };

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            সকল পণ্য
          </h2>
          <p className="text-muted-foreground mt-1">
            আমাদের সম্পূর্ণ অর্গানিক পণ্যের তালিকা
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              className="px-8"
            >
              আরো দেখুন
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
