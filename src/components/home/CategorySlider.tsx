import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name_bn: string;
  slug: string;
  image_url?: string;
}

const CategorySlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Demo categories - will be replaced with Supabase data
  const categories: Category[] = [
    {
      id: "1",
      name_bn: "মধু",
      slug: "honey",
      image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop",
    },
    {
      id: "2",
      name_bn: "ঘি",
      slug: "ghee",
      image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop",
    },
    {
      id: "3",
      name_bn: "চাল",
      slug: "rice",
      image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
    },
    {
      id: "4",
      name_bn: "তেল",
      slug: "oil",
      image_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop",
    },
    {
      id: "5",
      name_bn: "মসলা",
      slug: "spices",
      image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop",
    },
    {
      id: "6",
      name_bn: "ড্রাই ফ্রুটস",
      slug: "dry-fruits",
      image_url: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop",
    },
    {
      id: "7",
      name_bn: "চা",
      slug: "tea",
      image_url: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=200&h=200&fit=crop",
    },
    {
      id: "8",
      name_bn: "গুড়",
      slug: "jaggery",
      image_url: "https://images.unsplash.com/photo-1605197788044-5a55a8e16b96?w=200&h=200&fit=crop",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            ক্যাটাগরি
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="flex-shrink-0 group"
            >
              <div className="w-24 md:w-28 flex flex-col items-center gap-2">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors shadow-card">
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name_bn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-2xl">🌿</span>
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors">
                  {category.name_bn}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
