import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';
import { head } from '@vercel/blob';
import { registerMediaRecord } from '@/lib/db/media-repository';

export async function POST(req: NextRequest) {
  try {
    // 1. Require getAdminSession()
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح / Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { pathname, fileName, fileType, fileSize } = body;

    if (!pathname) {
      return NextResponse.json(
        { success: false, error: 'مسار الملف مطلوب' },
        { status: 400 }
      );
    }

    // 2. Verify Blob ACTUALLY EXISTS using head() from @vercel/blob SDK via OIDC
    let blobMetadata;
    try {
      blobMetadata = await head(pathname);
    } catch (headErr: any) {
      console.error('[MediaComplete] Blob head check failed:', headErr);
      return NextResponse.json(
        { success: false, error: 'تعذر التحقق من وجود الصورة في Vercel Blob' },
        { status: 404 }
      );
    }

    if (!blobMetadata || !blobMetadata.url) {
      return NextResponse.json(
        { success: false, error: 'الصورة غير موجودة على السحابة' },
        { status: 404 }
      );
    }

    // 3. Register/Update Media record in Neon PostgreSQL idempotently
    const mediaRecord = await registerMediaRecord({
      fileName: fileName || blobMetadata.pathname.split('/').pop() || 'upload.jpg',
      storageKey: blobMetadata.url,
      mimeType: blobMetadata.contentType || fileType || 'image/jpeg',
      fileSize: blobMetadata.size || fileSize || 0,
    });

    return NextResponse.json({
      success: true,
      media: mediaRecord,
    });
  } catch (err: any) {
    console.error('[MediaComplete] Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'حدث خطأ أثناء تأكيد وتوثيق الرفع' },
      { status: 500 }
    );
  }
}
