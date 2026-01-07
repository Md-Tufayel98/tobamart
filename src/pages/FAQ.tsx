import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";

const FAQ = () => {
  const { getItemCount } = useCart();

  const faqs = [
    {
      question: "আপনাদের পণ্য কি ১০০% অর্গানিক?",
      answer: "হ্যাঁ, আমাদের সব পণ্য ১০০% অর্গানিক ও প্রাকৃতিক। কোনো রাসায়নিক বা ভেজাল নেই। আমরা সরাসরি কৃষকদের কাছ থেকে সংগ্রহ করি।",
    },
    {
      question: "ডেলিভারি চার্জ কত?",
      answer: "ঢাকার ভেতরে ডেলিভারি চার্জ ৬০ টাকা এবং ঢাকার বাইরে ১২০ টাকা। নির্দিষ্ট পরিমাণ কেনাকাটায় ফ্রি ডেলিভারি পাবেন।",
    },
    {
      question: "ডেলিভারি পেতে কত দিন লাগে?",
      answer: "ঢাকার ভেতরে ১-২ দিন এবং ঢাকার বাইরে ২-৪ দিনের মধ্যে ডেলিভারি পাবেন। অর্ডার কনফার্ম হওয়ার পর থেকে সময় গণনা হবে।",
    },
    {
      question: "পেমেন্ট কিভাবে করতে পারি?",
      answer: "আমরা ক্যাশ অন ডেলিভারি (COD), bKash এবং Nagad এর মাধ্যমে পেমেন্ট গ্রহণ করি। অনলাইন পেমেন্টে অতিরিক্ত সুবিধা পাবেন।",
    },
    {
      question: "পণ্য রিটার্ন করা যায়?",
      answer: "হ্যাঁ, পণ্যে কোনো সমস্যা থাকলে ৭ দিনের মধ্যে রিটার্ন করতে পারবেন। তবে পণ্য অব্যবহৃত ও সিল অক্ষত থাকতে হবে।",
    },
    {
      question: "অর্ডার ট্র্যাক করতে পারি?",
      answer: "হ্যাঁ, অর্ডার নম্বর দিয়ে আমাদের ওয়েবসাইটে ট্র্যাক করতে পারবেন। এছাড়া SMS এর মাধ্যমেও আপডেট পাবেন।",
    },
    {
      question: "বাল্ক অর্ডার করা যায়?",
      answer: "হ্যাঁ, বাল্ক অর্ডারের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন। বিশেষ ছাড় ও সুবিধা পাবেন।",
    },
    {
      question: "মানি ব্যাক গ্যারান্টি কি?",
      answer: "পণ্যে কোনো সমস্যা থাকলে বা সন্তুষ্ট না হলে সম্পূর্ণ টাকা ফেরত দেওয়া হবে। এটি আমাদের মানের প্রতি প্রতিশ্রুতি।",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={getItemCount()} />

      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              সাধারণ জিজ্ঞাসা
            </h1>
            <p className="text-muted-foreground">
              প্রায়শই জিজ্ঞাসিত প্রশ্ন ও উত্তর
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-xl text-center">
            <p className="text-muted-foreground mb-4">
              আপনার প্রশ্নের উত্তর পাননি?
            </p>
            <a href="/contact" className="text-primary hover:underline font-medium">
              আমাদের সাথে যোগাযোগ করুন →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;