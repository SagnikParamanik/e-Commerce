import { NextRequest, NextResponse } from 'next/server';

const wishlists: Record<string, any[]> = {};

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'User ID required' },
      { status: 400 }
    );
  }

  const userWishlist = wishlists[userId] || [];
  return NextResponse.json({ success: true, wishlist: userWishlist });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, productId, action } = body;

  if (!userId || !productId) {
    return NextResponse.json(
      { success: false, error: 'User ID and Product ID required' },
      { status: 400 }
    );
  }

  if (!wishlists[userId]) {
    wishlists[userId] = [];
  }

  const index = wishlists[userId].findIndex(item => item.id === productId);

  if (action === 'add' && index === -1) {
    wishlists[userId].push({ id: productId, addedAt: new Date().toISOString() });
  } else if (action === 'remove' && index !== -1) {
    wishlists[userId].splice(index, 1);
  }

  return NextResponse.json({ success: true, wishlist: wishlists[userId] });
}
