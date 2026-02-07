'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/page-layout';
import { CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/shopify/utils';

interface Order {
  id: string;
  date: string;
  customerEmail: string;
  customerName: string;
  items: any[];
  total: string;
  status: string;
  shipping: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (!orderId) {
      router.push('/shop');
      return;
    }

    // Fetch order from localStorage
    const orders = JSON.parse(localStorage.getItem('acme_orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [searchParams, router]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center py-20">
          <p>Loading order details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!order) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Button onClick={() => router.push('/shop')}>Back to Shop</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto px-sides py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-foreground/60 text-lg">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-muted rounded-lg p-8 space-y-6 mb-8">
          {/* Order Header */}
          <div className="border-b pb-6">
            <p className="text-sm text-foreground/60 mb-2">Order Number</p>
            <p className="text-2xl font-bold">{order.id}</p>
            <p className="text-sm text-foreground/60 mt-2">
              {new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold text-foreground/60 uppercase mb-2">Ship To</p>
              <p className="font-medium">{order.customerName}</p>
              <p className="text-sm text-foreground/60">{order.shipping.address}</p>
              <p className="text-sm text-foreground/60">
                {order.shipping.city}
                {order.shipping.state && `, ${order.shipping.state}`}
              </p>
              <p className="text-sm text-foreground/60">{order.shipping.zip}</p>
              <p className="text-sm text-foreground/60">{order.shipping.country}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground/60 uppercase mb-2">Contact</p>
              <p className="text-sm text-foreground/60">{order.customerEmail}</p>
              <p className="text-sm font-semibold text-foreground mt-4 uppercase mb-2">Status</p>
              <p className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {order.status}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t pt-6">
            <p className="text-sm font-semibold text-foreground/60 uppercase mb-4">Items Ordered</p>
            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium">{item.merchandise.product.title}</p>
                    <p className="text-foreground/60 text-xs">{item.merchandise.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Qty: {item.quantity}</p>
                    <p className="font-medium">{formatPrice(item.cost.totalAmount.amount, item.cost.totalAmount.currencyCode)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-6 flex justify-end">
            <div className="w-48">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-foreground/60">Subtotal</span>
                <span>{formatPrice(order.total, 'USD')}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-foreground/60">Tax</span>
                <span>{formatPrice('0', 'USD')}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-foreground/60">Shipping</span>
                <span>{formatPrice('0', 'USD')}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatPrice(order.total, 'USD')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push('/shop')} variant="outline">
            Continue Shopping
          </Button>
          <Button onClick={() => window.print()}>Print Invoice</Button>
        </div>
      </div>
    </PageLayout>
  );
}
