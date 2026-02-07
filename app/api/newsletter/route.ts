import { NextRequest, NextResponse } from 'next/server';

const subscribers: Set<string> = new Set();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return NextResponse.json(
      { success: false, error: 'Valid email required' },
      { status: 400 }
    );
  }

  if (subscribers.has(email)) {
    return NextResponse.json(
      { success: false, message: 'Already subscribed' },
      { status: 409 }
    );
  }

  subscribers.add(email);

  return NextResponse.json(
    { 
      success: true, 
      message: 'Successfully subscribed to newsletter',
      email 
    },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    subscriberCount: subscribers.size,
  });
}
