import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';
import { getAdminMediaList } from '@/lib/db/media-repository';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'غير مصرح / Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q') || undefined;

    const { items, isDbConnected } = await getAdminMediaList(search);

    return NextResponse.json({
      success: true,
      items,
      isDbConnected,
    });
  } catch (err: any) {
    console.error('[MediaListRoute] Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
