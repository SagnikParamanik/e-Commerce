import { Metadata } from 'next';
import { CheckoutForm } from './components/checkout-form';
import { OrderSummary } from './components/order-summary';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'ACME Store | Checkout',
  description: 'Complete your purchase at ACME Store',
};

export default function CheckoutPage() {
  return (
    <PageLayout>
      <div className="w-full max-w-6xl mx-auto px-sides py-sides">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
