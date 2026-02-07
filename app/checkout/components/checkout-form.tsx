'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart/cart-context';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export function CheckoutForm() {
  const { cart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (!formData.email || !formData.firstName || !formData.address || !formData.city || !formData.cardNumber) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store order in localStorage
      const orders = JSON.parse(localStorage.getItem('acme_orders') || '[]');
      const newOrder = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        items: cart?.lines || [],
        total: cart?.cost.totalAmount.amount || '0',
        status: 'confirmed',
        shipping: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
      };

      orders.push(newOrder);
      localStorage.setItem('acme_orders', JSON.stringify(orders));

      setOrderPlaced(true);

      // Redirect to order confirmation after 2 seconds
      setTimeout(() => {
        router.push(`/checkout/confirmation?orderId=${newOrder.id}`);
      }, 2000);
    } catch (err) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <Button onClick={() => router.push('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-2">Order Placed Successfully!</h2>
        <p className="text-green-700 mb-4">Redirecting to confirmation page...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Shipping Information */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-background"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-background"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-background"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State/Province</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ZIP/Postal Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-background"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
            <p className="text-xs text-foreground/50 mt-1">Test card: 4242 4242 4242 4242</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date *</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-background"
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV *</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-background"
                placeholder="123"
                maxLength="4"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

      <Button onClick={handleSubmit} disabled={loading} size="lg" className="w-full">
        {loading ? 'Processing...' : 'Complete Purchase'}
      </Button>
    </div>
  );
}
