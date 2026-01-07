import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

interface OrderData {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  order_status: string;
  payment_status: string;
  total_amount: number;
  delivery_charge: number;
  subtotal: number;
  created_at: string;
  steadfast_tracking_code: string | null;
  steadfast_status: string | null;
  order_items: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
  }>;
}

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get("order") || "");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getStatusStep = (status: string) => {
    const steps = ["pending", "confirmed", "processing", "shipped", "delivered"];
    return steps.indexOf(status);
  };

  const statusLabels: Record<string, string> = {
    pending: "অর্ডার করা হয়েছে",
    confirmed: "কনফার্ম হয়েছে",
    processing: "প্রসেসিং",
    shipped: "শিপ করা হয়েছে",
    delivered: "ডেলিভারি সম্পন্ন",
    cancelled: "বাতিল",
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("অর্ডার নম্বর লিখুন");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      // Search by order number or phone number
      const { data, error: fetchError } = await supabase
        .from("orders")
        .select(`
          id, order_number, customer_name, customer_phone, 
          shipping_address, shipping_city, order_status, payment_status,
          total_amount, delivery_charge, subtotal, created_at,
          steadfast_tracking_code, steadfast_status,
          order_items (product_name, quantity, unit_price)
        `)
        .or(`order_number.eq.${trackingNumber},customer_phone.eq.${trackingNumber}`)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (fetchError || !data) {
        setError("অর্ডার পাওয়া যায়নি। সঠিক অর্ডার নম্বর বা ফোন নম্বর দিন।");
        return;
      }

      setOrder(data as OrderData);
    } catch (err) {
      setError("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => `৳${price.toLocaleString("bn-BD")}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={0} />

      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              অর্ডার ট্র্যাকিং
            </h1>
            <p className="text-muted-foreground">
              আপনার অর্ডার নম্বর বা ফোন নম্বর দিয়ে অর্ডারের অবস্থা দেখুন
            </p>
          </div>

          {/* Search Box */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="অর্ডার নম্বর বা ফোন নম্বর (যেমন: #10001 বা 01712345678)"
                    className="pl-10"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  />
                </div>
                <Button onClick={handleTrack} disabled={loading}>
                  {loading ? "খোঁজা হচ্ছে..." : "ট্র্যাক করুন"}
                </Button>
              </div>
              {error && (
                <p className="text-destructive text-sm mt-3">{error}</p>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          {order && (
            <div className="space-y-6">
              {/* Order Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>অর্ডার স্ট্যাটাস</span>
                    <Badge className={
                      order.order_status === "delivered" ? "bg-green-100 text-green-700" :
                      order.order_status === "cancelled" ? "bg-red-100 text-red-700" :
                      order.order_status === "shipped" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }>
                      {statusLabels[order.order_status] || order.order_status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {order.order_status === "cancelled" ? (
                    <div className="text-center py-4 text-destructive">
                      এই অর্ডার বাতিল করা হয়েছে
                    </div>
                  ) : (
                    <div className="flex items-center justify-between max-w-md mx-auto">
                      {["pending", "confirmed", "processing", "shipped", "delivered"].map((step, idx) => {
                        const currentStep = getStatusStep(order.order_status);
                        const isCompleted = idx <= currentStep;
                        const isCurrent = idx === currentStep;

                        return (
                          <div key={step} className="flex flex-col items-center relative">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isCompleted
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                            >
                              {step === "pending" && <Clock className="h-5 w-5" />}
                              {step === "confirmed" && <CheckCircle className="h-5 w-5" />}
                              {step === "processing" && <Package className="h-5 w-5" />}
                              {step === "shipped" && <Truck className="h-5 w-5" />}
                              {step === "delivered" && <CheckCircle className="h-5 w-5" />}
                            </div>
                            <span className="text-xs mt-2 text-center max-w-[60px]">
                              {statusLabels[step]}
                            </span>
                            {idx < 4 && (
                              <div
                                className={`absolute top-5 left-10 w-[calc(100%-40px)] h-0.5 ${
                                  idx < currentStep ? "bg-primary" : "bg-muted"
                                }`}
                                style={{ width: "80px" }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Steadfast Tracking */}
                  {order.steadfast_tracking_code && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">কুরিয়ার ট্র্যাকিং</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Steadfast Courier</p>
                          <p className="text-sm text-muted-foreground">
                            ট্র্যাকিং কোড: {order.steadfast_tracking_code}
                          </p>
                        </div>
                        <a
                          href={`https://steadfast.com.bd/t/${order.steadfast_tracking_code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            ট্র্যাক করুন
                          </Button>
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle>অর্ডার তথ্য</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">অর্ডার নম্বর</p>
                      <p className="font-medium font-mono">{order.order_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">তারিখ</p>
                      <p className="font-medium">
                        {format(new Date(order.created_at), "dd MMMM, yyyy", { locale: bn })}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.shipping_address}, {order.shipping_city}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <p className="text-sm">{order.customer_phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>অর্ডারের পণ্য</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.order_items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} x {formatPrice(item.unit_price)}
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.quantity * item.unit_price)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">সাবটোটাল</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
                      <span>{formatPrice(order.delivery_charge || 0)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>মোট</span>
                      <span className="text-primary">{formatPrice(order.total_amount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTracking;