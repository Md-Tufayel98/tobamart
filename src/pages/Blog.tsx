import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";

const Blog = () => {
  const { getItemCount } = useCart();

  const blogPosts = [
    {
      id: "1",
      title: "খাঁটি মধু চেনার ৫টি সহজ উপায়",
      excerpt: "বাজারে অনেক ভেজাল মধু পাওয়া যায়। জানুন কিভাবে সহজেই খাঁটি মধু চিনবেন এবং স্বাস্থ্যকর মধু কিনবেন।",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop",
      date: "১৫ জানুয়ারি, ২০২৬",
      author: "অর্গানিক স্টোর",
      category: "মধু",
    },
    {
      id: "2",
      title: "ঘি এর অসাধারণ স্বাস্থ্য উপকারিতা",
      excerpt: "প্রাচীনকাল থেকে আয়ুর্বেদে ঘি এর ব্যবহার হয়ে আসছে। জানুন ঘি কেন আপনার খাদ্যতালিকায় রাখা উচিত।",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop",
      date: "১০ জানুয়ারি, ২০২৬",
      author: "অর্গানিক স্টোর",
      category: "ঘি",
    },
    {
      id: "3",
      title: "অর্গানিক খাবার কেন খাবেন?",
      excerpt: "রাসায়নিক ও কীটনাশকমুক্ত খাবার আপনার ও পরিবারের স্বাস্থ্যের জন্য কতটা গুরুত্বপূর্ণ জানুন।",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
      date: "৫ জানুয়ারি, ২০২৬",
      author: "অর্গানিক স্টোর",
      category: "স্বাস্থ্য",
    },
    {
      id: "4",
      title: "বাদাম খাওয়ার সঠিক নিয়ম",
      excerpt: "বাদাম পুষ্টিকর হলেও অতিরিক্ত খেলে সমস্যা হতে পারে। জানুন কতটুকু ও কখন বাদাম খাওয়া উচিত।",
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=400&fit=crop",
      date: "১ জানুয়ারি, ২০২৬",
      author: "অর্গানিক স্টোর",
      category: "বাদাম",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={getItemCount()} />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ব্লগ
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              স্বাস্থ্যকর জীবনযাপন ও অর্গানিক খাবার সম্পর্কে জানুন
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card rounded-xl border border-border overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="link" className="p-0 h-auto gap-2">
                      আরো পড়ুন
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              আরো ব্লগ পোস্ট শীঘ্রই আসছে...
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;