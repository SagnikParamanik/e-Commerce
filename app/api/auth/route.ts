import { NextRequest, NextResponse } from 'next/server';

const users: Map<string, any> = new Map();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, email, password, name } = body;

  if (action === 'signup') {
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (users.has(email)) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      );
    }

    const user = {
      id: Date.now().toString(),
      email,
      name,
      password: password,
      createdAt: new Date().toISOString(),
    };

    users.set(email, user);

    return NextResponse.json(
      {
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
        token: Buffer.from(`${email}:${Date.now()}`).toString('base64'),
      },
      { status: 201 }
    );
  }

  if (action === 'login') {
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password required' },
        { status: 400 }
      );
    }

    const user = users.get(email);
    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
      token: Buffer.from(`${email}:${Date.now()}`).toString('base64'),
    });
  }

  return NextResponse.json(
    { success: false, error: 'Invalid action' },
    { status: 400 }
  );
}
