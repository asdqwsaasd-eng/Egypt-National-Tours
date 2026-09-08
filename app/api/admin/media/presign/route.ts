import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';
import { issueSignedToken, presignUrl } from '@vercel/blob';

export async function POST(req: NextRequest) {
  try {
    // 1. Require Admin Session
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح / Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { fileName, fileType, fileSize } = body;

    if (!fileName || !fileType) {
      return NextResponse.json(
        { success: false, error: 'بيانات الصورة غير كافية' },
        { status: 400 }
      );
    }

    // 2. Validate MIME
    const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
    if (!ALLOWED_MIME.includes(fileType)) {
      return NextResponse.json(
        { success: false, error: 'نوع الملف غير مسموح. الأنواع المسموحة: JPG, PNG, WEBP.' },
        { status: 400 }
      );
    }

    // 3. Validate 8 MB maximum size
    const MAX_SIZE = 8 * 1024 * 1024;
    if (fileSize && fileSize > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'حجم الصورة أكبر من الحد المسموح وهو 8 ميجابايت.' },
        { status: 400 }
      );
    }

    // 4. Format safe unique pathname
    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const sanitizedName = fileName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-');
    const uniqueSuffix = crypto.randomUUID().slice(0, 8);
    const safePathname = `egypt-national-tours/media/${YYYY}/${MM}/${uniqueSuffix}-${sanitizedName}`;

    const validUntil = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // 5. Generate OIDC signed token and presigned PUT URL
    const signedToken = await issueSignedToken({
      pathname: safePathname,
      operations: ['put'],
      allowedContentTypes: ALLOWED_MIME,
      maximumSizeInBytes: MAX_SIZE,
      validUntil,
    });

    const { presignedUrl } = await presignUrl(signedToken, {
      access: 'public',
      operation: 'put',
      pathname: safePathname,
      allowedContentTypes: ALLOWED_MIME,
      maximumSizeInBytes: MAX_SIZE,
      validUntil,
    });

    return NextResponse.json({
      success: true,
      presignedUrl,
      pathname: safePathname,
      validUntil,
    });
  } catch (err: any) {
    console.error('[MediaPresign] Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'فشل إنشاء رابط الرفع المشفر' },
      { status: 500 }
    );
  }
}
