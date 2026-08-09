'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createReviewAction } from '@/lib/actions/review-cms-actions';
import { SectionHeader, Card, CardHeader, CardContent, TextInput, Button, Alert } from '@/components/ui';
import { ArrowRight, MessageSquare, Save, Star } from 'lucide-react';

export default function AdminNewReviewPage() {
  const router = useRouter();
  const [customerName, setCustomerName] = React.useState('');
  const [countryName, setCountryName] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [reviewAr, setReviewAr] = React.useState('');
  const [reviewEn, setReviewEn] = React.useState('');
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [isDemo, setIsDemo] = React.useState(false);
  const [status, setStatus] = React.useState<'draft' | 'published'>('published');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await createReviewAction({
      customerName,
      countryName,
      rating,
      reviewAr,
      reviewEn,
      isFeatured,
      isDemo,
      status,
    });

    setIsLoading(false);

    if (res.success) {
      router.push('/admin/reviews');
    } else {
      setError(res.error || 'حدث خطأ أثناء إدخال التقييم');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Link
          href="/admin/reviews"
          className="p-2 rounded-lg bg-white border border-border hover:bg-sand transition-colors text-text-primary"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
        <SectionHeader
          title="إضافة رأي / تقييم جديد"
          subtitle="تسجيل تقييم العميل المعتمد مع الالتزام بضوابط المصداقية"
          align="start"
        />
      </div>

      {error && (
        <Alert variant="error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card variant="default" padding="lg">
          <CardHeader className="border-b border-border pb-3 mb-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-brand-red" />
              <span>بيانات العميل ورأيه</span>
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="اسم العميل"
                placeholder="مثال: محمد علي"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />

              <TextInput
                label="الدولة (Country)"
                placeholder="مثال: مصر / المملكة المتحدة"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  التقييم بالنجوم (1 إلى 5)
                </label>
                <div className="flex items-center gap-2 h-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 transition-colors cursor-pointer ${
                        rating >= star ? 'text-amber-500' : 'text-text-muted'
                      }`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  حالة النشر
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
                >
                  <option value="published">منشور ومعتمد (Published)</option>
                  <option value="draft">مسودة (Draft)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                نص التقييم (بالعربية)
              </label>
              <textarea
                rows={3}
                value={reviewAr}
                onChange={(e) => setReviewAr(e.target.value)}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-text-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                Review Text (English)
              </label>
              <textarea
                rows={3}
                value={reviewEn}
                onChange={(e) => setReviewEn(e.target.value)}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden dir-ltr text-right text-text-primary"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-brand-red focus:ring-brand-gold cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-text-primary cursor-pointer">
                  تمييز التقييم في الصفحة الرئيسية (Featured)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDemo"
                  checked={isDemo}
                  onChange={(e) => setIsDemo(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="isDemo" className="text-xs font-bold text-amber-700 cursor-pointer">
                  علامة تقييم توضيحي (isDemo Flag - محجوب عن الجمهور العام)
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/admin/reviews')}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="shadow-md"
          >
            <Save className="h-4 w-4 ml-1" />
            حفظ التقييم
          </Button>
        </div>
      </form>
    </div>
  );
}
