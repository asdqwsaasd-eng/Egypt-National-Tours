'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createTourAction } from '@/lib/actions/tour-cms-actions';
import { SectionHeader, Card, CardHeader, CardContent, TextInput, Button, Alert } from '@/components/ui';
import { ArrowRight, Compass, Save } from 'lucide-react';

export default function AdminNewTourPage() {
  const router = useRouter();
  const [tourType, setTourType] = React.useState<'egypt' | 'international'>('egypt');
  const [titleAr, setTitleAr] = React.useState('');
  const [titleEn, setTitleEn] = React.useState('');
  const [shortDescriptionAr, setShortDescriptionAr] = React.useState('');
  const [shortDescriptionEn, setShortDescriptionEn] = React.useState('');
  const [descriptionAr, setDescriptionAr] = React.useState('');
  const [descriptionEn, setDescriptionEn] = React.useState('');
  const [durationTextAr, setDurationTextAr] = React.useState('');
  const [durationTextEn, setDurationTextEn] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [status, setStatus] = React.useState<'draft' | 'published'>('published');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleTitleArChange = (val: string) => {
    setTitleAr(val);
    if (!slug) {
      setSlug(
        val
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\u0621-\u064A-]/g, '')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await createTourAction({
      tourType,
      titleAr,
      titleEn,
      shortDescriptionAr,
      shortDescriptionEn,
      descriptionAr,
      descriptionEn,
      durationTextAr,
      durationTextEn,
      slug: slug || titleEn.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      isFeatured,
      status,
    });

    setIsLoading(false);

    if (res.success) {
      router.push('/admin/tours');
    } else {
      setError(res.error || 'حدث خطأ أثناء حفظ البرنامج');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Link
          href="/admin/tours"
          className="p-2 rounded-lg bg-white border border-border hover:bg-sand transition-colors text-text-primary"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
        <SectionHeader
          title="إضافة برنامج سياحي جديد"
          subtitle="إنشاء وتوثيق تفاصيل الرحلة السياحية الداخلية أو الخارجية"
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
              <Compass className="h-5 w-5 text-brand-red" />
              <span>بيانات التصنيف واللغات</span>
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  نوع السياحة / التصنيف
                </label>
                <select
                  value={tourType}
                  onChange={(e) => setTourType(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
                >
                  <option value="egypt">السياحة الداخلية (مصر / Domestic)</option>
                  <option value="international">السياحة الخارجية (International)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  حالة النشر (Status)
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
                >
                  <option value="published">منشور (Published)</option>
                  <option value="draft">مسودة (Draft)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="عنوان البرنامج (بالعربية)"
                placeholder="مثال: رحلة الأقصر وأسوان النيلية"
                value={titleAr}
                onChange={(e) => handleTitleArChange(e.target.value)}
                required
              />

              <TextInput
                label="English Title"
                placeholder="e.g. Luxor & Aswan Nile Cruise"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                required
                className="dir-ltr text-right"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="مدة الرحلة (بالعربية)"
                placeholder="مثال: 5 أيام / 4 ليالي"
                value={durationTextAr}
                onChange={(e) => setDurationTextAr(e.target.value)}
              />

              <TextInput
                label="Duration (English)"
                placeholder="e.g. 5 Days / 4 Nights"
                value={durationTextEn}
                onChange={(e) => setDurationTextEn(e.target.value)}
                className="dir-ltr text-right"
              />
            </div>

            <TextInput
              label="الرابط المختصر الفريد (URL Slug)"
              placeholder="luxor-aswan-nile-cruise"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="dir-ltr text-right font-mono"
            />

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                الوصف المختصر (بالعربية)
              </label>
              <textarea
                rows={2}
                value={shortDescriptionAr}
                onChange={(e) => setShortDescriptionAr(e.target.value)}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-text-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                Short Description (English)
              </label>
              <textarea
                rows={2}
                value={shortDescriptionEn}
                onChange={(e) => setShortDescriptionEn(e.target.value)}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden dir-ltr text-right text-text-primary"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-border text-brand-red focus:ring-brand-gold cursor-pointer"
              />
              <label htmlFor="isFeatured" className="text-xs font-bold text-text-primary cursor-pointer">
                عرض البرنامج ضمن الرحلات المميزة (Featured Tour)
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/admin/tours')}
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
            حفظ وإنشاء البرنامج
          </Button>
        </div>
      </form>
    </div>
  );
}
