import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    return NextResponse.json({ error: 'Server is missing Firebase credentials' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const createdAt = new Date().toISOString();

    await adminDb.collection('homecare_intake').add({ ...body, createdAt });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('homecare-intake POST failed', error);
    return NextResponse.json({ error: 'Failed to save intake' }, { status: 500 });
  }
}
