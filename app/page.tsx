import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import HeroBanner from "@/src/components/home/HeroBanner";
import CategorySlider from "@/src/components/home/CategorySlider";
import FeaturedProducts from "@/src/components/home/FeaturedProducts";
import PromotionalBanners from "@/src/components/home/PromotionalBanners";
import AllProducts from "@/src/components/home/AllProducts";
import CustomerReviews from "@/src/components/home/CustomerReviews";
import WhyChooseUs from "@/src/components/home/WhyChooseUs";
import Benefits from "@/src/components/home/Benefits";
import MoneyBackGuarantee from "@/src/components/home/MoneyBackGuarantee";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={0} />
      
      <main className="flex-1">
        <HeroBanner />
        <CategorySlider />
        <FeaturedProducts />
        <PromotionalBanners />
        <AllProducts />
        <CustomerReviews />
        <WhyChooseUs />
        <Benefits />
        <MoneyBackGuarantee />
      </main>

      <Footer />
    </div>
  );
}
