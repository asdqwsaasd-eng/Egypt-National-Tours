import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { updateTourAction, deleteTourAction } from '@/lib/actions/tour-cms-actions';
import { SectionHeader, Card, CardHeader, CardContent, TextInput, Button } from '@/components/ui';
import { ArrowRight, Compass, Save, Trash2 } from 'lucide-react';
import { FEATURED_EGYPT_TOURS, INTERNATIONAL_TOURS } from '@/lib/data/tours';

interface EditTourPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditTourPage({ params }: EditTourPageProps) {
  const { id } = await params;
  const connected = await isDatabaseConnected();

  let tourData: any = null;

  if (connected) {
    tourData = await prisma.tour.findUnique({
      where: { id },
      include: { destinations: true, days: true },
    });
  }

  // Fallback to pre-configured static tour data if DB is unpopulated/offline
  if (!tourData) {
    const allStatic = [...FEATURED_EGYPT_TOURS, ...INTERNATIONAL_TOURS];
    const foundStatic = allStatic.find((t) => t.id === id || t.slug === id);
    if (foundStatic) {
      tourData = {
        id: foundStatic.id,
        tourType: foundStatic.type,
        titleAr: foundStatic.title.ar,
        titleEn: foundStatic.title.en,
        shortDescriptionAr: foundStatic.summary.ar,
        shortDescriptionEn: foundStatic.summary.en,
        descriptionAr: foundStatic.overview.ar,
        descriptionEn: foundStatic.overview.en,
        durationTextAr: foundStatic.duration.ar,
        durationTextEn: foundStatic.duration?.en || '',
        slug: foundStatic.slug,
        isFeatured: true,
        status: 'published',
      };
    }
  }

  if (!tourData) {
    notFound();
  }

  const handleUpdate = async (formData: FormData) => {
    'use server';
    const payload = {
      tourType: formData.get('tourType') as any,
      titleAr: formData.get('titleAr') as string,
      titleEn: formData.get('titleEn') as string,
      shortDescriptionAr: formData.get('shortDescriptionAr') as string,
      shortDescriptionEn: formData.get('shortDescriptionEn') as string,
      durationTextAr: formData.get('durationTextAr') as string,
      durationTextEn: formData.get('durationTextEn') as string,
      slug: formData.get('slug') as string,
      isFeatured: formData.get('isFeatured') === 'on',
      status: formData.get('status') as any,
    };

    await updateTourAction(id, payload);
  };

  const handleDelete = async () => {
    'use server';
    await deleteTourAction(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/tours"
            className="p-2 rounded-lg bg-white border border-border hover:bg-sand transition-colors text-text-primary"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <SectionHeader
            title={`تعديل البرنامج: ${tourData.titleAr}`}
            subtitle={`المعرف: ${tourData.id}`}
            align="start"
          />
        </div>

        <form action={handleDelete}>
          <Button type="submit" variant="ghost" size="sm" className="text-error border border-error/30 hover:bg-error/10">
            <Trash2 className="h-4 w-4 ml-1" />
            حذف البرنامج
          </Button>
        </form>
      </div>

      <form action={handleUpdate} className="space-y-6">
        <Card variant="default" padding="lg">
          <CardHeader className="border-b border-border pb-3 mb-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Compass className="h-5 w-5 text-brand-red" />
              <span>تحديث بيانات ومعلومات الرحلة</span>
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  نوع السياحة
                </label>
                <select
                  name="tourType"
                  defaultValue={tourData.tourType}
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
                  name="status"
                  defaultValue={tourData.status}
                  className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
                >
                  <option value="published">منشور (Published)</option>
                  <option value="draft">مسودة (Draft)</option>
                  <option value="archived">مؤرشف (Archived)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="عنوان البرنامج (بالعربية)"
                name="titleAr"
                defaultValue={tourData.titleAr}
                required
              />

              <TextInput
                label="English Title"
                name="titleEn"
                defaultValue={tourData.titleEn}
                required
                className="dir-ltr text-right"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="مدة الرحلة (بالعربية)"
                name="durationTextAr"
                defaultValue={tourData.durationTextAr || ''}
              />

              <TextInput
                label="Duration (English)"
                name="durationTextEn"
                defaultValue={tourData.durationTextEn || ''}
                className="dir-ltr text-right"
              />
            </div>

            <TextInput
              label="الرابط المختصر الفريد (URL Slug)"
              name="slug"
              defaultValue={tourData.slug}
              required
              className="dir-ltr text-right font-mono"
            />

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                الوصف المختصر (بالعربية)
              </label>
              <textarea
                name="shortDescriptionAr"
                rows={2}
                defaultValue={tourData.shortDescriptionAr || ''}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-text-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                Short Description (English)
              </label>
              <textarea
                name="shortDescriptionEn"
                rows={2}
                defaultValue={tourData.shortDescriptionEn || ''}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden dir-ltr text-right text-text-primary"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                name="isFeatured"
                id="isFeatured"
                defaultChecked={tourData.isFeatured}
                className="h-4 w-4 rounded border-border text-brand-red focus:ring-brand-gold cursor-pointer"
              />
              <label htmlFor="isFeatured" className="text-xs font-bold text-text-primary cursor-pointer">
                عرض البرنامج ضمن الرحلات المميزة (Featured Tour)
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/tours">
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
