'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { AlertCircle, Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    avgRating: 0,
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();
      
      if (ordersData.success) {
        setOrders(ordersData.orders);
        const totalRevenue = ordersData.orders.reduce((sum: number, order: any) => sum + order.total, 0);
        setStats({
          totalOrders: ordersData.orders.length,
          totalRevenue,
          totalCustomers: new Set(ordersData.orders.map((o: any) => o.customerEmail)).size,
          avgRating: 4.8,
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-sides">
        <Card className="w-full max-w-md p-6">
          <div className="flex items-center gap-3 mb-4 text-destructive">
            <AlertCircle className="w-5 h-5" />
            <p className="font-semibold">Admin Access Required</p>
          </div>
          <p className="text-foreground/70">Please log in with admin credentials to access this page.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-sides py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-foreground/60">Welcome back, {user.name}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Total Orders</p>
                  <p className="text-2xl font-semibold text-foreground">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Total Revenue</p>
                  <p className="text-2xl font-semibold text-foreground">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Customers</p>
                  <p className="text-2xl font-semibold text-foreground">{stats.totalCustomers}</p>
                </div>
                <Users className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Avg Rating</p>
                  <p className="text-2xl font-semibold text-foreground">{stats.avgRating}★</p>
                </div>
                <Package className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Items</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.slice(0, 10).map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-foreground/70">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{order.customerEmail}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{order.items.length}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/60">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-foreground/60">
                        No orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
