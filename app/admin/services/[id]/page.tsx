import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma, isDatabaseConnected } from '@/lib/db/prisma';
import { updateServiceAction } from '@/lib/actions/service-cms-actions';
import { SectionHeader, Card, CardHeader, CardContent, TextInput, Button } from '@/components/ui';
import { ArrowRight, Briefcase, Save } from 'lucide-react';

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const connected = await isDatabaseConnected();

  let serviceData: any = null;

  if (connected) {
    serviceData = await prisma.service.findUnique({
      where: { id },
    });
  }

  // Pre-configured static services catalog fallback
  if (!serviceData) {
    const servicesCatalog = [
      { id: 'flight', serviceKey: 'flight', titleAr: 'حجز الطيران', titleEn: 'Flight Booking', slug: 'flights', status: 'published', displayOrder: 1 },
      { id: 'hotel', serviceKey: 'hotel', titleAr: 'حجز الفنادق', titleEn: 'Hotel Booking', slug: 'hotels', status: 'published', displayOrder: 2 },
      { id: 'custom_tour', serviceKey: 'custom_tour', titleAr: 'تصميم رحلة خاصة', titleEn: 'Custom Tour Design', slug: 'custom-tours', status: 'published', displayOrder: 3 },
      { id: 'visa', serviceKey: 'visa', titleAr: 'خدمات التأشيرات', titleEn: 'Visa Services', slug: 'visas', status: 'published', displayOrder: 4 },
      { id: 'security_approval', serviceKey: 'security_approval', titleAr: 'الموافقات الأمنية', titleEn: 'Security Approvals', slug: 'security-approvals', status: 'published', displayOrder: 5 },
      { id: 'transportation', serviceKey: 'transportation', titleAr: 'النقل والمواصلات', titleEn: 'Transportation', slug: 'transportation', status: 'published', displayOrder: 6 },
      { id: 'egypt_tour', serviceKey: 'egypt_tour', titleAr: 'السياحة الداخلية (مصر)', titleEn: 'Egypt Domestic Tours', slug: 'egypt-tours', status: 'published', displayOrder: 7 },
      { id: 'international_tour', serviceKey: 'international_tour', titleAr: 'السياحة الخارجية', titleEn: 'International Tours', slug: 'international-tours', status: 'published', displayOrder: 8 },
      { id: 'hajj', serviceKey: 'hajj', titleAr: 'برامج الحج', titleEn: 'Hajj Packages', slug: 'hajj-umrah/hajj', status: 'published', displayOrder: 9 },
      { id: 'umrah', serviceKey: 'umrah', titleAr: 'برامج العمرة', titleEn: 'Umrah Packages', slug: 'hajj-umrah/umrah', status: 'published', displayOrder: 10 },
    ];
    serviceData = servicesCatalog.find((s) => s.id === id || s.serviceKey === id || s.slug === id);
  }

  if (!serviceData) {
    notFound();
  }

  const handleUpdate = async (formData: FormData) => {
    'use server';
    const payload = {
      titleAr: formData.get('titleAr') as string,
      titleEn: formData.get('titleEn') as string,
      descriptionAr: formData.get('descriptionAr') as string,
      descriptionEn: formData.get('descriptionEn') as string,
      slug: formData.get('slug') as string,
      displayOrder: Number(formData.get('displayOrder')) || 0,
      isFeatured: formData.get('isFeatured') === 'on',
      status: formData.get('status') as any,
    };

    await updateServiceAction(id, payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Link
          href="/admin/services"
          className="p-2 rounded-lg bg-white border border-border hover:bg-sand transition-colors text-text-primary"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
        <SectionHeader
          title={`تعديل خدمة: ${serviceData.titleAr}`}
          subtitle={`المفتاح البرمجي: ${serviceData.serviceKey || serviceData.id}`}
          align="start"
        />
      </div>

      <form action={handleUpdate} className="space-y-6">
        <Card variant="default" padding="lg">
          <CardHeader className="border-b border-border pb-3 mb-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-brand-red" />
              <span>بيانات الخدمة والعناوين المتعددة اللغات</span>
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="عنوان الخدمة (بالعربية)"
                name="titleAr"
                defaultValue={serviceData.titleAr}
                required
              />

              <TextInput
                label="English Service Title"
                name="titleEn"
                defaultValue={serviceData.titleEn}
                required
                className="dir-ltr text-right"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="الرابط الفريد (Slug)"
                name="slug"
                defaultValue={serviceData.slug}
                required
                className="dir-ltr text-right font-mono"
              />

              <TextInput
                label="ترتيب العرض (Display Order)"
                name="displayOrder"
                type="number"
                defaultValue={serviceData.displayOrder || 0}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                الوصف الشامل للخدمة (بالعربية)
              </label>
              <textarea
                name="descriptionAr"
                rows={3}
                defaultValue={serviceData.descriptionAr || ''}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-text-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                Full Service Description (English)
              </label>
              <textarea
                name="descriptionEn"
                rows={3}
                defaultValue={serviceData.descriptionEn || ''}
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden dir-ltr text-right text-text-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  حالة النشر (Publication Status)
                </label>
                <select
                  name="status"
                  defaultValue={serviceData.status || 'published'}
                  className="w-full h-10 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
                >
                  <option value="published">منشور (Published)</option>
                  <option value="draft">مسودة (Draft)</option>
                  <option value="archived">مؤرشف (Archived)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  defaultChecked={serviceData.isFeatured}
                  className="h-4 w-4 rounded border-border text-brand-red focus:ring-brand-gold cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-text-primary cursor-pointer">
                  عرض الخدمة كخدمة مميزة على الواجهة (Featured Service)
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/services">
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
