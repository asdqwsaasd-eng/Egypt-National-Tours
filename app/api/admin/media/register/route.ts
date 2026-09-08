import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';
import { registerMediaRecord } from '@/lib/db/media-repository';

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'غير مصرح / Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { fileName, storageKey, mimeType, fileSize } = body;

    if (!storageKey || !fileName) {
      return NextResponse.json({ success: false, error: 'بيانات غير كافية' }, { status: 400 });
    }

    const record = await registerMediaRecord({
      fileName,
      storageKey,
      mimeType: mimeType || 'image/jpeg',
      fileSize: fileSize || 0,
    });

    return NextResponse.json({
      success: true,
      media: record,
    });
  } catch (err: any) {
    console.error('[MediaRegisterRoute] Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
