import { NextRequest, NextResponse } from 'next/server';

const reviews: any[] = [];

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get('productId');
  const filtered = productId ? reviews.filter(r => r.productId === productId) : reviews;
  
  return NextResponse.json({ success: true, reviews: filtered });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productId, rating, title, comment, author } = body;

  if (!productId || !rating || !author) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const review = {
    id: Date.now().toString(),
    productId,
    rating: Math.min(5, Math.max(1, rating)),
    title: title || 'No title',
    comment: comment || '',
    author,
    createdAt: new Date().toISOString(),
  };

  reviews.push(review);
  return NextResponse.json({ success: true, review }, { status: 201 });
}
