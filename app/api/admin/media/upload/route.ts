import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';
import { registerMediaRecord } from '@/lib/db/media-repository';

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: HandleUploadBody;

  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json(
      { error: 'طلب غير صالح / Invalid JSON body' },
      { status: 400 }
    );
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // 1. Authenticate Admin Session
        const session = await getAdminSession();
        if (!session) {
          throw new Error('غير مصرح / Unauthorized');
        }

        // 2. Format safe pathname
        const date = new Date();
        const YYYY = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const sanitizedName = pathname
          .toLowerCase()
          .replace(/[^a-z0-9.-]/g, '-')
          .replace(/-+/g, '-');
        const uniqueSuffix = crypto.randomUUID().slice(0, 8);
        const safePathname = `egypt-national-tours/media/${YYYY}/${MM}/${uniqueSuffix}-${sanitizedName}`;

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 8 * 1024 * 1024, // 8 MB server-enforced
          pathname: safePathname,
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({
            adminId: session.userId,
            originalName: pathname,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // 3. Idempotent Database Registration on Upload Completion
        try {
          const payload = tokenPayload ? JSON.parse(tokenPayload) : {};
          await registerMediaRecord({
            fileName: payload.originalName || blob.pathname.split('/').pop() || 'upload.jpg',
            storageKey: blob.url,
            mimeType: blob.contentType || 'image/jpeg',
            fileSize: 0,
          });
        } catch (err) {
          console.error('[VercelBlob] onUploadCompleted DB error:', err);
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error('[VercelBlobUpload] handleUpload error:', error);
    return NextResponse.json(
      { error: error.message || 'حدث خطأ أثناء تفويض الرفع' },
      { status: 400 }
    );
  }
}
