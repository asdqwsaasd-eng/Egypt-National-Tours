import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { updateReviewAction, deleteReviewAction } from '@/lib/actions/review-cms-actions';
import { SectionHeader, Card, CardHeader, CardContent, TextInput, Button } from '@/components/ui';
import { ArrowRight, MessageSquare, Save, Trash2 } from 'lucide-react';

interface EditReviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditReviewPage({ params }: EditReviewPageProps) {
  const { id } = await params;
  const connected = await isDatabaseConnected();

  let reviewData: any = null;

  if (connected) {
    reviewData = await prisma.review.findUnique({
      where: { id },
      include: { country: true },
    });
  }

  // Pre-configured static reviews catalog fallback
  if (!reviewData) {
    const reviewsCatalog = [
      {
        id: 'rev-001',
        customerName: 'محمد أحمد',
        reviewAr: 'تجربة حجز طيران ممتازة وسريعة جداً. الخدمة والمتابعة تفوق التوقعات.',
        reviewEn: 'Excellent flight booking experience, fast and professional service.',
        rating: 5,
        isFeatured: true,
        isDemo: false,
        status: 'published',
      },
      {
        id: 'rev-002',
        customerName: 'David Miller',
        reviewAr: 'تجربة رحلة نيلية ساحرة من إيجيبت ناشيونال تورز!',
        reviewEn: 'Wonderful Nile Cruise experience arranged by Egypt National Tours!',
        rating: 5,
        isFeatured: true,
        isDemo: false,
        status: 'published',
      },
    ];
    reviewData = reviewsCatalog.find((r) => r.id === id);
  }

  if (!reviewData) {
    notFound();
  }

  const handleUpdate = async (formData: FormData) => {
    'use server';
    const payload = {
      customerName: formData.get('customerName') as string,
      rating: Number(formData.get('rating')) || 5,
      reviewAr: formData.get('reviewAr') as string,
      reviewEn: formData.get('reviewEn') as string,
      isFeatured: formData.get('isFeatured') === 'on',
      isDemo: formData.get('isDemo') === 'on',
      status: formData.get('status') as any,
    };

    await updateReviewAction(id, payload);
  };

  const handleDelete = async () => {
    'use server';
    await deleteReviewAction(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reviews"
            className="p-2 rounded-lg bg-white border border-border hover:bg-sand transition-colors text-text-primary"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <SectionHeader
            title={`تعديل تقييم: ${reviewData.customerName}`}
            subtitle={`المعرف: ${reviewData.id}`}
            align="start"
          />
        </div>

        <form action={handleDelete}>
          <Button type="submit" variant="ghost" size="sm" className="text-error border border-error/30 hover:bg-error/10">
            <Trash2 className="h-4 w-4 ml-1" />
            حذف التقييم
          </Button>
        </form>
      </div>

      <form action={handleUpdate} className="space-y-6">
        <Card variant="default" padding="lg">
          <CardHeader className="border-b border-border pb-3 mb-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-brand-red" />
              <span>تحديث بيانات رأي العميل</span>
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="اسم العميل"
                name="customerName"
                defaultValue={reviewData.customerName}
                required
              />

              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  التقييم بالنجوم
                </label>
                <select
                  name="rating"
                  defaultValue={reviewData.rating}
                  className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
                >
                  <option value={5}>5 نجوم (ممتاز)</option>
                  <option value={4}>4 نجوم (جيد جداً)</option>
                  <option value={3}>3 نجوم (جيد)</option>
                  <option value={2}>2 نجوم (مقبول)</option>
                  <option value={1}>1 نجمة (ضعيف)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                نص التقييم (بالعربية)
              </label>
              <textarea
                name="reviewAr"
                rows={3}
                defaultValue={reviewData.reviewAr || ''}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-text-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                Review Text (English)
              </label>
              <textarea
                name="reviewEn"
                rows={3}
                defaultValue={reviewData.reviewEn || ''}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden dir-ltr text-right text-text-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  حالة الاعتماد والنشر
                </label>
                <select
                  name="status"
                  defaultValue={reviewData.status || 'published'}
                  className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
                >
                  <option value="published">معتمد ومنشور (Published)</option>
                  <option value="draft">مسودة / قيد المراجعة (Draft)</option>
                  <option value="archived">مرفوض / مؤرشف (Archived)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  defaultChecked={reviewData.isFeatured}
                  className="h-4 w-4 rounded border-border text-brand-red focus:ring-brand-gold cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-text-primary cursor-pointer">
                  تمييز التقييم (Featured)
                </label>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  name="isDemo"
                  id="isDemo"
                  defaultChecked={reviewData.isDemo}
                  className="h-4 w-4 rounded border-border text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="isDemo" className="text-xs font-bold text-amber-700 cursor-pointer">
                  تقييم توضيحي (isDemo)
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/reviews">
            <Button type="button" variant="ghost">
              إلغاء
            </Button>
          </Link>
          <Button type="submit" variant="primary" className="shadow-md">
            <Save className="h-4 w-4 ml-1" />
            حفظ التعديلات
          </Button>
        </div>
      </form>
    </div>
  );
}
