import { useState, useEffect } from "react";
import { ShoppingCart, Phone, MapPin, Clock, Eye, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";

interface CartItem {
  productId: string;
  name_bn: string;
  quantity: number;
  price: number;
  variant_name_bn?: string;
}

interface IncompleteOrder {
  id: string;
  session_id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_area: string | null;
  cart_data: CartItem[] | null;
  last_updated_at: string;
  created_at: string;
  is_converted: boolean;
}

const AdminIncompleteOrders = () => {
  const [orders, setOrders] = useState<IncompleteOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<IncompleteOrder | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("incomplete_orders")
      .select("*")
      .eq("is_converted", false)
      .order("last_updated_at", { ascending: false });

    if (error) {
      toast({ title: "ডাটা লোড করতে সমস্যা হয়েছে", variant: "destructive" });
    } else {
      setOrders((data as unknown as IncompleteOrder[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("incomplete-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "incomplete_orders" },
        () => fetchOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteOrder = async (id: string) => {
    const { error } = await supabase.from("incomplete_orders").delete().eq("id", id);
    if (error) {
      toast({ title: "ডিলিট করতে সমস্যা হয়েছে", variant: "destructive" });
    } else {
      toast({ title: "সফলভাবে ডিলিট হয়েছে" });
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  const formatPrice = (price: number) => `৳${price.toLocaleString("bn-BD")}`;

  const getCartTotal = (cartData: CartItem[] | null) => {
    if (!cartData || cartData.length === 0) return 0;
    return cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCompletionPercentage = (order: IncompleteOrder) => {
    const fields = [
      order.customer_name,
      order.customer_phone,
      order.shipping_address,
      order.shipping_city,
      order.cart_data && order.cart_data.length > 0,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">অসম্পূর্ণ অর্ডার</h1>
          <p className="text-muted-foreground">
            রিয়েল-টাইম চেকআউট ট্র্যাকিং ({orders.length} টি)
          </p>
        </div>
        <Button variant="outline" onClick={fetchOrders} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          রিফ্রেশ
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <ShoppingCart className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-sm text-muted-foreground">মোট অসম্পূর্ণ</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.customer_phone).length}
                </p>
                <p className="text-sm text-muted-foreground">ফোন নম্বর আছে</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatPrice(orders.reduce((sum, o) => sum + getCartTotal(o.cart_data), 0))}
                </p>
                <p className="text-sm text-muted-foreground">সম্ভাব্য বিক্রি</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>অসম্পূর্ণ চেকআউট লিস্ট</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">লোড হচ্ছে...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              কোনো অসম্পূর্ণ অর্ডার নেই
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>কাস্টমার</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead>ঠিকানা</TableHead>
                    <TableHead>কার্ট মূল্য</TableHead>
                    <TableHead>সম্পূর্ণতা</TableHead>
                    <TableHead>সময়</TableHead>
                    <TableHead className="text-right">অ্যাকশন</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <span className="font-medium">
                          {order.customer_name || "—"}
                        </span>
                        {order.customer_email && (
                          <p className="text-xs text-muted-foreground">
                            {order.customer_email}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {order.customer_phone ? (
                          <a
                            href={`tel:${order.customer_phone}`}
                            className="text-primary hover:underline"
                          >
                            {order.customer_phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[150px] truncate">
                          {order.shipping_address || order.shipping_city || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.cart_data && order.cart_data.length > 0 ? (
                          <div>
                            <span className="font-medium">
                              {formatPrice(getCartTotal(order.cart_data))}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {order.cart_data.length} টি পণ্য
                            </p>
                          </div>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            getCompletionPercentage(order) > 60
                              ? "default"
                              : "secondary"
                          }
                        >
                          {getCompletionPercentage(order)}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(order.last_updated_at), {
                            addSuffix: true,
                            locale: bn,
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>ডিলিট করতে চান?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  এই অসম্পূর্ণ অর্ডার ডিলিট করা হবে।
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>না</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteOrder(order.id)}>
                                  হ্যাঁ, ডিলিট করুন
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>অসম্পূর্ণ অর্ডার বিস্তারিত</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">নাম</p>
                  <p className="font-medium">{selectedOrder.customer_name || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ফোন</p>
                  <p className="font-medium">{selectedOrder.customer_phone || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ইমেইল</p>
                  <p className="font-medium">{selectedOrder.customer_email || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">শহর</p>
                  <p className="font-medium">{selectedOrder.shipping_city || "—"}</p>
                </div>
              </div>

              {selectedOrder.shipping_address && (
                <div>
                  <p className="text-sm text-muted-foreground">ঠিকানা</p>
                  <p className="font-medium">{selectedOrder.shipping_address}</p>
                </div>
              )}

              {selectedOrder.cart_data && selectedOrder.cart_data.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">কার্টের পণ্য</p>
                  <div className="space-y-2">
                    {selectedOrder.cart_data.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{item.name_bn}</p>
                          {item.variant_name_bn && (
                            <p className="text-xs text-muted-foreground">
                              {item.variant_name_bn}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} x {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-bold">মোট:</span>
                      <span className="font-bold text-primary">
                        {formatPrice(getCartTotal(selectedOrder.cart_data))}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                সর্বশেষ আপডেট:{" "}
                {format(new Date(selectedOrder.last_updated_at), "dd MMM yyyy, hh:mm a", {
                  locale: bn,
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminIncompleteOrders;
