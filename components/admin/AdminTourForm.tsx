'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createTourAction, updateTourAction, deleteTourAction } from '@/lib/actions/tour-cms-actions';
import { TextInput, Button, Alert, Card, CardHeader, CardContent, Badge, SectionHeader } from '@/components/ui';
import {
  ArrowRight,
  Compass,
  Save,
  Trash2,
  Plus,
  X,
  MapPin,
  Clock,
  ImageIcon,
  CheckCircle2,
  Image as ImageLucide,
} from 'lucide-react';

export interface TourFormData {
  id?: string;
  tourType: 'egypt' | 'international';
  titleAr: string;
  titleEn: string;
  shortDescriptionAr?: string;
  shortDescriptionEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  durationTextAr?: string;
  durationTextEn?: string;
  slug: string;
  isFeatured: boolean;
  status: 'draft' | 'published' | 'archived';
  mainMediaUrl?: string;
  destinations: Array<{ id?: string; nameAr: string; nameEn: string }>;
}

interface AdminTourFormProps {
  initialData?: Partial<TourFormData>;
  isEditMode?: boolean;
}

const REUSABLE_MEDIA_CATALOG = [
  { url: '/assets/references/cairo-classic.jpg', label: 'القاهرة الكلاسيكية (Cairo Classic)' },
  { url: '/assets/references/cairo-alexandria.jpg', label: 'القاهرة والإسكندرية (Cairo & Alexandria)' },
  { url: '/assets/references/nile-cruise.jpg', label: 'نايل كروز الأقصر وأسوان (Nile Cruise)' },
  { url: '/images/site-update/tours/egypt-tour-hurghada-sharm.webp', label: 'الغردقة وشرم الشيخ (Hurghada & Sharm)' },
  { url: '/assets/references/dubai-highlights.jpg', label: 'سحر دبي والإمارات (Dubai Highlights)' },
  { url: '/images/site-update/tours/international-tour-istanbul-week.webp', label: 'أسبوع في إسطنبول (Istanbul Week)' },
  { url: '/images/site-update/banners/egypt-national-tours-company-banner.webp', label: 'بنر الشركة الرئيسي (Company Banner)' },
  { url: '/images/site-update/umrah/umrah-program-banner.webp', label: 'بنر العمرة (Umrah Banner)' },
];

export const AdminTourForm: React.FC<AdminTourFormProps> = ({ initialData, isEditMode = false }) => {
  const router = useRouter();

  const [tourType, setTourType] = React.useState<'egypt' | 'international'>(initialData?.tourType || 'egypt');
  const [titleAr, setTitleAr] = React.useState(initialData?.titleAr || '');
  const [titleEn, setTitleEn] = React.useState(initialData?.titleEn || '');
  const [shortDescriptionAr, setShortDescriptionAr] = React.useState(initialData?.shortDescriptionAr || '');
  const [shortDescriptionEn, setShortDescriptionEn] = React.useState(initialData?.shortDescriptionEn || '');
  const [descriptionAr, setDescriptionAr] = React.useState(initialData?.descriptionAr || '');
  const [descriptionEn, setDescriptionEn] = React.useState(initialData?.descriptionEn || '');
  const [durationTextAr, setDurationTextAr] = React.useState(initialData?.durationTextAr || '');
  const [durationTextEn, setDurationTextEn] = React.useState(initialData?.durationTextEn || '');
  const [slug, setSlug] = React.useState(initialData?.slug || '');
  const [isFeatured, setIsFeatured] = React.useState(initialData?.isFeatured || false);
  const [status, setStatus] = React.useState<'draft' | 'published' | 'archived'>(
    initialData?.status || 'draft'
  );
  const [mainMediaUrl, setMainMediaUrl] = React.useState(initialData?.mainMediaUrl || '');

  const [destinations, setDestinations] = React.useState<Array<{ nameAr: string; nameEn: string }>>(
    initialData?.destinations && initialData.destinations.length > 0
      ? initialData.destinations.map((d) => ({ nameAr: d.nameAr, nameEn: d.nameEn }))
      : [{ nameAr: '', nameEn: '' }]
  );

  const [showMediaModal, setShowMediaModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleTitleArChange = (val: string) => {
    setTitleAr(val);
    if (!slug && !isEditMode) {
      setSlug(
        val
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\u0621-\u064A-]/g, '')
      );
    }
  };

  const handleAddDestination = () => {
    setDestinations((prev) => [...prev, { nameAr: '', nameEn: '' }]);
  };

  const handleRemoveDestination = (index: number) => {
    setDestinations((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDestinationChange = (index: number, field: 'nameAr' | 'nameEn', val: string) => {
    setDestinations((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setErrorMessage(null);

    const payload = {
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
      mainMediaUrl,
      destinations: destinations.filter((d) => d.nameAr.trim() || d.nameEn.trim()),
    };

    let res;
    if (isEditMode && initialData?.id) {
      res = await updateTourAction(initialData.id, payload);
    } else {
      res = await createTourAction(payload);
    }

    setIsSubmitting(false);

    if (res.success) {
      setStatusMessage(res.message || 'تم حفظ بيانات البرنامج بنجاح');
      if (!isEditMode && res.tourId) {
        router.push('/admin/tours');
      }
    } else {
      setErrorMessage(res.error || 'حدث خطأ أثناء حفظ البيانات');
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذا البرنامج السياحي نهائياً؟')) return;

    setIsSubmitting(true);
    const res = await deleteTourAction(initialData.id);
    setIsSubmitting(false);

    if (res.success) {
      router.push('/admin/tours');
    } else {
      setErrorMessage(res.error || 'فشل حذف البرنامج');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/tours"
            className="p-2 rounded-lg bg-white border border-border hover:bg-sand transition-colors text-text-primary"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <SectionHeader
            title={isEditMode ? `تعديل البرنامج: ${titleAr}` : 'إضافة برنامج سياحي جديد'}
            subtitle={isEditMode ? `المعرف: ${initialData?.id}` : 'إنشاء وتوثيق رحلة سياحية داخلية أو خارجية'}
            align="start"
          />
        </div>

        {isEditMode && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleDelete}
            className="text-error border border-error/30 hover:bg-error/10 text-xs gap-1"
          >
            <Trash2 className="h-4 w-4" />
            <span>حذف البرنامج</span>
          </Button>
        )}
      </div>

      {statusMessage && (
        <Alert variant="success" dismissible onDismiss={() => setStatusMessage(null)}>
          {statusMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="error" dismissible onDismiss={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      {/* ─── SECTION 1: CATEGORY & TYPE ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Compass className="h-5 w-5 text-brand-red" />
            <span>1. بيانات التصنيف ونوع السياحة</span>
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
                className="w-full h-12 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
              >
                <option value="egypt">السياحة الداخلية (مصر / Domestic Tours)</option>
                <option value="international">السياحة الخارجية (International Tours)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-1">
                حالة النشر (Publication Status)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full h-12 px-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden font-bold text-text-primary"
              >
                <option value="draft">مسودة (Draft - افتراضي لسلامة النشر)</option>
                <option value="published">منشور (Published)</option>
                <option value="archived">مؤرشف (Archived)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── SECTION 2: TITLES & DURATION ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand-gold" />
            <span>2. عناوين ومدة الرحلة (عربي / English)</span>
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="عنوان البرنامج (بالعربية)"
              placeholder="مثال: برنامج سحر القاهرة الكلاسيكي"
              value={titleAr}
              onChange={(e) => handleTitleArChange(e.target.value)}
              required
            />

            <TextInput
              label="English Title"
              placeholder="e.g. Classic Cairo Discovery"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
              dir="ltr"
              className="text-left font-sans font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="مدة الرحلة (بالعربية)"
              placeholder="مثال: 4 أيام / 3 ليالي"
              value={durationTextAr}
              onChange={(e) => setDurationTextAr(e.target.value)}
            />

            <TextInput
              label="Duration in English"
              placeholder="e.g. 4 Days / 3 Nights"
              value={durationTextEn}
              onChange={(e) => setDurationTextEn(e.target.value)}
              dir="ltr"
              className="text-left font-sans font-medium"
            />
          </div>

          <TextInput
            label="الرابط المختصر الفريد (URL Slug)"
            placeholder="cairo-classic-discovery"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            dir="ltr"
            className="text-left font-mono font-medium"
            hint="الرابط المستخدم في المتصفح مثل: /egypt-tours/cairo-classic"
          />
        </CardContent>
      </Card>

      {/* ─── SECTION 3: DESTINATIONS EDITOR ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-red" />
            <span>3. الوجهات الرئيسية للرحلة (Destinations)</span>
          </h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddDestination}
            className="gap-1 text-xs"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة وجهة جديدة</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {destinations.map((dest, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-sand/30 border border-border relative space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-xs font-bold text-text-primary flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-brand-red" />
                  <span>الوجهة رقم {idx + 1}</span>
                </span>
                {destinations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDestination(idx)}
                    className="text-error hover:bg-error/10 p-1 rounded-md transition-colors text-xs flex items-center gap-1 font-bold"
                  >
                    <X className="h-4 w-4" />
                    <span>حذف الوجهة</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label={`اسم الوجهة بالعربية (${idx + 1})`}
                  placeholder="مثال: القاهرة، الجيزة، الأقصر"
                  value={dest.nameAr}
                  onChange={(e) => handleDestinationChange(idx, 'nameAr', e.target.value)}
                />
                <TextInput
                  label={`Destination Name in English (${idx + 1})`}
                  placeholder="e.g. Cairo, Giza, Luxor"
                  value={dest.nameEn}
                  onChange={(e) => handleDestinationChange(idx, 'nameEn', e.target.value)}
                  dir="ltr"
                  className="text-left font-sans font-medium"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ─── SECTION 4: DESCRIPTIONS ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Compass className="h-5 w-5 text-brand-red" />
            <span>4. وصف وتفاصيل البرنامج السياحي</span>
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              الوصف المختصر (Short Summary - Arabic)
            </label>
            <textarea
              rows={2}
              value={shortDescriptionAr}
              onChange={(e) => setShortDescriptionAr(e.target.value)}
              placeholder="الملخص السريع الظاهر على كروت الرحلات بالصفحة الرئيسية"
              className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-text-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              Short Description (English Summary)
            </label>
            <textarea
              rows={2}
              value={shortDescriptionEn}
              onChange={(e) => setShortDescriptionEn(e.target.value)}
              placeholder="Short summary displayed on tour cards in English"
              dir="ltr"
              className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-left font-sans text-text-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              الوصف الشامل والتفاصيل (Full Overview - Arabic)
            </label>
            <textarea
              rows={4}
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              placeholder="تفاصيل الرحلة الشاملة المعروضة داخل صفحة تفاصيل البرنامج"
              className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-text-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary mb-1">
              Full Tour Overview (English)
            </label>
            <textarea
              rows={4}
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              placeholder="Full tour overview displayed on tour details page"
              dir="ltr"
              className="w-full p-3 text-xs bg-sand/30 border border-border rounded-lg focus:outline-hidden text-left font-sans text-text-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* ─── SECTION 5: COVER IMAGE ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <ImageLucide className="h-5 w-5 text-brand-gold-dark" />
            <span>5. الصورة الرئيسية للبرنامج (Tour Cover Image)</span>
          </h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setShowMediaModal(true)}
            className="gap-1 text-xs"
          >
            <ImageIcon className="h-4 w-4 text-brand-red" />
            <span>اختيار صورة من المكتبة</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {mainMediaUrl ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-sand/40 p-4 rounded-xl border border-border">
              <div className="relative aspect-[16/9] w-full sm:w-48 overflow-hidden rounded-lg border border-border shadow-xs bg-white">
                <Image
                  src={mainMediaUrl}
                  alt="Tour Cover Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-xs flex-1 w-full">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">مسار الصورة المعتمد</Badge>
                  <span className="font-mono text-text-muted dir-ltr text-right text-[11px] truncate">
                    {mainMediaUrl}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowMediaModal(true)}
                    className="text-xs"
                  >
                    تغيير الصورة
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setMainMediaUrl('')}
                    className="text-xs text-error hover:bg-error/10"
                  >
                    إزالة الصورة
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-sand/20 border-2 border-dashed border-border rounded-xl space-y-3">
              <ImageIcon className="h-8 w-8 text-text-muted mx-auto" />
              <p className="text-xs font-bold text-text-secondary">
                لم يتم اختيار صورة رئيسية للبرنامج حتى الآن
              </p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowMediaModal(true)}
                className="text-xs gap-1"
              >
                <Plus className="h-4 w-4" />
                <span>اختر صورة من الأصول المتاحة</span>
              </Button>
            </div>
          )}

          <div className="pt-2">
            <TextInput
              label="أو أدخل مسار الصورة مباشرة (Direct Image Path)"
              placeholder="/assets/references/cairo-classic.jpg"
              value={mainMediaUrl}
              onChange={(e) => setMainMediaUrl(e.target.value)}
              dir="ltr"
              className="text-left font-mono text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* ─── MEDIA SELECTION MODAL ─── */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-border shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between bg-sand/30">
              <h4 className="text-base font-extrabold text-text-primary flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-brand-red" />
                <span>اختيار صورة رئيسية للرحلة من مكتبة وسائط الموقع</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-sand transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {REUSABLE_MEDIA_CATALOG.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setMainMediaUrl(item.url);
                    setShowMediaModal(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2 hover:shadow-md ${
                    mainMediaUrl === item.url
                      ? 'border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20'
                      : 'border-border bg-white hover:border-brand-gold'
                  }`}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-sand/30 border border-border">
                    <Image
                      src={item.url}
                      alt={item.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <p className="font-bold text-text-primary truncate">{item.label}</p>
                    {mainMediaUrl === item.url && (
                      <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-sand/20 flex justify-end">
              <Button type="button" variant="ghost" onClick={() => setShowMediaModal(false)}>
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── SECTION 6: PUBLICATION & FEATURED ─── */}
      <Card variant="default" padding="lg">
        <CardHeader className="border-b border-border pb-3 mb-4">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand-red" />
            <span>6. خيارات العرض والتميز</span>
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-border text-brand-red focus:ring-brand-gold cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs font-bold text-text-primary cursor-pointer">
              عرض هذا البرنامج ضمن الرحلات المميزة على الصفحة الرئيسية (Featured Tour)
            </label>
          </div>
        </CardContent>
      </Card>

      {/* ─── SECTION 7: SAVE BAR ─── */}
      <div className="flex justify-end gap-3 pt-2">
        <Link href="/admin/tours">
          <Button type="button" variant="ghost">
            إلغاء
          </Button>
        </Link>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="shadow-lg px-8 gap-2 font-extrabold"
        >
          <Save className="h-5 w-5" />
          <span>{isEditMode ? 'حفظ التغييرات' : 'حفظ وإنشاء البرنامج'}</span>
        </Button>
      </div>
    </form>
  );
};
