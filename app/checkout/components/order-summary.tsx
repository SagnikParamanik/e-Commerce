'use client';

import { useCart } from '@/components/cart/cart-context';
import { formatPrice } from '@/lib/shopify/utils';
import Link from 'next/link';
import Image from 'next/image';

export function OrderSummary() {
  const { cart } = useCart();

  if (!cart || cart.lines.length === 0) {
    return null;
  }

  const subtotal = cart.cost.subtotalAmount.amount;
  const tax = '0.00';
  const shipping = '0.00';
  const total = cart.cost.totalAmount.amount;

  return (
    <div className="border rounded-lg p-6 sticky top-24 h-fit">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cart.lines.map(item => (
          <div key={item.id} className="flex gap-4 pb-4 border-b">
            <div className="relative w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
              {item.merchandise.product.featuredImage ? (
                <Image
                  src={item.merchandise.product.featuredImage.url || "/placeholder.svg"}
                  alt={item.merchandise.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-foreground/50">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{item.merchandise.product.title}</p>
              <p className="text-xs text-foreground/60 mb-2">{item.merchandise.title}</p>
              <div className="flex justify-between items-end">
                <span className="text-xs text-foreground/60">Qty: {item.quantity}</span>
                <span className="font-semibold text-sm">
                  {formatPrice(item.cost.totalAmount.amount, item.cost.totalAmount.currencyCode)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 text-sm border-t pt-6">
        <div className="flex justify-between">
          <span className="text-foreground/60">Subtotal</span>
          <span>{formatPrice(subtotal, cart.cost.subtotalAmount.currencyCode)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/60">Tax</span>
          <span>{formatPrice(tax, cart.cost.totalAmount.currencyCode)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/60">Shipping</span>
          <span>{formatPrice(shipping, cart.cost.totalAmount.currencyCode)}</span>
        </div>
        <div className="flex justify-between pt-4 border-t text-base font-semibold">
          <span>Total</span>
          <span>{formatPrice(total, cart.cost.totalAmount.currencyCode)}</span>
        </div>
      </div>

      {/* Continue Shopping Link */}
      <Link
        href="/shop"
        className="text-sm text-foreground/60 hover:text-foreground mt-6 inline-block underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
