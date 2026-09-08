import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'غير مصرح / Unauthorized' }, { status: 401 });
    }

    const isConfigured = Boolean(
      process.env.BLOB_STORE_ID ||
      process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.VERCEL
    );

    return NextResponse.json({
      success: true,
      configured: isConfigured,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, configured: true });
  }
}
