import { RotateCcw, CheckCircle, XCircle, Clock, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";

const ReturnPolicy = () => {
  const { getItemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={getItemCount()} />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <RotateCcw className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              রিটার্ন পলিসি
            </h1>
            <p className="text-muted-foreground">
              আমাদের রিটার্ন ও রিফান্ড নীতিমালা
            </p>
          </div>

          <div className="space-y-8">
            {/* Time Frame */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">রিটার্নের সময়সীমা</h2>
                  <p className="text-muted-foreground">
                    পণ্য গ্রহণের <strong>৭ দিনের</strong> মধ্যে রিটার্ন রিকোয়েস্ট করতে হবে। এই সময়ের পরে রিটার্ন গ্রহণ করা হবে না।
                  </p>
                </div>
              </div>
            </div>

            {/* Eligible */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">যে ক্ষেত্রে রিটার্ন হবে</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      পণ্য ক্ষতিগ্রস্ত বা ত্রুটিযুক্ত হলে
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      ভুল পণ্য ডেলিভারি হলে
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      পণ্যের মেয়াদ উত্তীর্ণ হলে
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      বর্ণনার সাথে পণ্য না মিললে
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      সিল ভাঙা বা খোলা অবস্থায় ডেলিভারি হলে
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Not Eligible */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <XCircle className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">যে ক্ষেত্রে রিটার্ন হবে না</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      ব্যবহৃত বা খোলা পণ্য
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      গ্রাহকের অসাবধানতায় ক্ষতিগ্রস্ত পণ্য
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      ৭ দিন পরে রিটার্ন রিকোয়েস্ট
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✗</span>
                      সেল বা ডিসকাউন্ট পণ্য (শর্ত প্রযোজ্য)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">রিটার্ন প্রক্রিয়া</h2>
              <div className="space-y-4">
                {[
                  "আমাদের হেল্পলাইনে কল করুন বা মেসেজ করুন",
                  "রিটার্নের কারণ ও পণ্যের ছবি পাঠান",
                  "আমাদের টিম যাচাই করে অনুমোদন দেবে",
                  "কুরিয়ারের মাধ্যমে পণ্য সংগ্রহ করা হবে",
                  "পণ্য গ্রহণের ৩-৫ দিনের মধ্যে রিফান্ড",
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-primary/5 p-6 rounded-xl text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">রিটার্নের জন্য যোগাযোগ</h3>
              <p className="text-muted-foreground mb-2">ফোন: +880 1XXX-XXXXXX</p>
              <p className="text-muted-foreground">ইমেইল: returns@organicstore.com</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;