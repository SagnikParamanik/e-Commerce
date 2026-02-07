import { NextRequest, NextResponse } from 'next/server';

const orders: any[] = [];

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const orderId = request.nextUrl.searchParams.get('orderId');

  if (orderId) {
    const order = orders.find(o => o.id === orderId);
    return NextResponse.json({
      success: !!order,
      order: order || null,
    });
  }

  const userOrders = userId ? orders.filter(o => o.userId === userId) : orders;
  return NextResponse.json({ success: true, orders: userOrders });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    userId,
    items,
    total,
    shippingAddress,
    billingAddress,
    customerEmail,
  } = body;

  if (!items || !total || !customerEmail) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const order = {
    id: `ORD-${Date.now()}`,
    userId: userId || null,
    items,
    total,
    status: 'completed',
    shippingAddress,
    billingAddress,
    customerEmail,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  return NextResponse.json({ success: true, order }, { status: 201 });
}
