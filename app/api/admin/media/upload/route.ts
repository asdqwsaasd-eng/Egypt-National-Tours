import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';
import { put } from '@vercel/blob';
import { registerMediaRecord } from '@/lib/db/media-repository';

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح / Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'لم يتم اختيار أي ملف للرفع' },
        { status: 400 }
      );
    }

    // 1. File size check (8 MB)
    const MAX_SIZE = 8 * 1024 * 1024; // 8 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'حجم الصورة أكبر من الحد المسموح وهو 8 ميجابايت.' },
        { status: 400 }
      );
    }

    // 2. MIME type check
    const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'نوع الملف غير مسموح. الأنواع المسموحة فقط هي: JPG, PNG, WEBP.' },
        { status: 400 }
      );
    }

    // 3. Extension check
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { success: false, error: 'امتداد الملف غير مسموح. الامتدادات المتاحة: .jpg, .jpeg, .png, .webp' },
        { status: 400 }
      );
    }

    // 4. Generate safe unique pathname
    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const sanitizedName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-');
    const uniqueSuffix = crypto.randomUUID().slice(0, 8);
    const blobPath = `egypt-national-tours/media/${YYYY}/${MM}/${uniqueSuffix}-${sanitizedName}`;

    let blobResult;
    try {
      blobResult = await put(blobPath, file, {
        access: 'public',
        addRandomSuffix: false,
      });
    } catch (blobErr: any) {
      console.error('[VercelBlobUpload] Put error:', blobErr);
      if (blobErr.message?.includes('token') || blobErr.message?.includes('BLOB_READ_WRITE_TOKEN') || blobErr.message?.includes('No token')) {
        return NextResponse.json(
          {
            success: false,
            errorCode: 'BLOB_STORE_NOT_CONNECTED',
            error: 'BLOB STORE CONNECTION REQUIRED: يتطلب رفع الصور ربط متجر Vercel Blob في لوحة التحكم (Vercel Dashboard → Storage → Create Blob Store).',
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, error: `فشل رفع الملف إلى Vercel Blob: ${blobErr.message}` },
        { status: 500 }
      );
    }

    // 5. Register Media record in Neon PostgreSQL
    const mediaRecord = await registerMediaRecord({
      fileName: file.name,
      storageKey: blobResult.url,
      mimeType: file.type,
      fileSize: file.size,
    });

    return NextResponse.json({
      success: true,
      mediaId: mediaRecord?.id || 'blob-' + Date.now(),
      url: blobResult.url,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      message: 'تم رفع الصورة بنجاح وإضافتها إلى مكتبة الصور.',
    });
  } catch (err: any) {
    console.error('[MediaUploadRoute] Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'حدث خطأ غير متوقع أثناء الرفع' },
      { status: 500 }
    );
  }
}
