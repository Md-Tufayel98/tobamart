import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  // Demo products - will be replaced with Supabase data
  const products = [
    {
      id: "1",
      name_bn: "সুন্দরবনের খাঁটি মধু",
      slug: "sundarban-pure-honey",
      image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
      base_price: 850,
      sale_price: 750,
      rating: 4.8,
      reviews_count: 124,
      is_featured: true,
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
      is_featured: true,
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
      is_featured: true,
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
      is_featured: true,
      stock_quantity: 100,
    },
  ];

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
    // Will implement cart functionality
  };

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              বিশেষ পণ্যসমূহ
            </h2>
            <p className="text-muted-foreground mt-1">
              আমাদের সেরা মানের অর্গানিক পণ্য
            </p>
          </div>
          <Link to="/products?featured=true">
            <Button variant="outline" className="hidden sm:flex items-center gap-2">
              সব দেখুন
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link to="/products?featured=true">
            <Button variant="outline" className="w-full">
              সব দেখুন
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
