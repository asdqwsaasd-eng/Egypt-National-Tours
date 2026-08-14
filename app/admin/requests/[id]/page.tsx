import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminRequestById } from '@/lib/db/admin-repository';
import { updateAdminRequestStatusAction, addAdminRequestNoteAction } from '@/lib/actions/admin-actions';
import { SectionHeader, Badge, Button, Card, CardHeader, CardContent } from '@/components/ui';
import {
  ArrowRight,
  User,
  MessageCircle,
  Clock,
  FileText,
  History,
  Send,
  Mail,
  Phone,
  Calendar,
  Layers,
} from 'lucide-react';
import { RequestStatus } from '@prisma/client';

interface RequestDetailPageProps {
  params: Promise<{ id: string }>;
}

const FIELD_TRANSLATIONS: Record<string, string> = {
  requestType: 'نوع الخدمة',
  tripType: 'نوع رحلة الطيران',
  destination: 'الوجهة / المدينة',
  starRating: 'درجة الفندق (نجوم)',
  mealPlan: 'نظام الوجبات',
  checkIn: 'تاريخ الوصول (Check-in)',
  checkOut: 'تاريخ المغادرة (Check-out)',
  departureDate: 'تاريخ الذهاب',
  returnDate: 'تاريخ العودة',
  travelDate: 'تاريخ السفر المفضل',
  rooms: 'عدد الغرف',
  adults: 'عدد البالغين',
  children: 'عدد الأطفال',
  infants: 'عدد الرضع',
  childrenAges: 'أعمار الأطفال',
  notes: 'ملاحظات العميل الخاصة',
  customer: 'بيانات العميل المقدمة',
  segments: 'محطات الرحلة المتعددة',
  tourTitle: 'اسم البرنامج السياحي',
  programTitle: 'اسم البرنامج',
  hajjCategory: 'فئة الحج',
  umrahDuration: 'مدة العمرة',
  visaCountry: 'دولة التأشيرة',
  passportNationality: 'الجنسية',
  securityApprovalType: 'نوع الموافقة الأمنية',
  vehicleType: 'نوع السيارة/الحافلة',
  passengersCount: 'عدد الركاب',
};

function formatKeyLabel(key: string): string {
  return FIELD_TRANSLATIONS[key] || key;
}

function formatValueDisplay(val: unknown): React.ReactNode {
  if (val === null || val === undefined) return '—';
  if (typeof val === 'boolean') return val ? 'نعم' : 'لا';
  if (Array.isArray(val)) {
    if (val.length === 0) return 'لا يوجد';
    return (
      <ul className="list-disc list-inside space-y-1">
        {val.map((item, idx) => (
          <li key={idx}>
            {typeof item === 'object' ? JSON.stringify(item) : String(item)}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof val === 'object') {
    return (
      <div className="space-y-1 bg-sand/30 p-2 rounded border border-border text-xs">
        {Object.entries(val as Record<string, unknown>).map(([subK, subV]) => (
          <div key={subK} className="flex justify-between gap-2">
            <span className="font-bold text-text-secondary">{formatKeyLabel(subK)}:</span>
            <span>{String(subV)}</span>
          </div>
        ))}
      </div>
    );
  }
  return String(val);
}

export default async function AdminRequestDetailPage({ params }: RequestDetailPageProps) {
  const { id } = await params;
  const { request, isDbConnected } = await getAdminRequestById(id);

  if (!request) {
    notFound();
  }

  const reqAny = request as any;
  const detailsObj = (reqAny.detailsJson as Record<string, unknown>) || {};

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'new_request':
        return <Badge variant="gold">طلب جديد</Badge>;
      case 'contacted':
        return <Badge variant="outline">تم التواصل</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">قيد المتابعة</Badge>;
      case 'completed':
        return <Badge variant="gold">مكتمل</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-red-400 text-red-600 bg-red-50">ملغي</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusUpdate = async (formData: FormData) => {
    'use server';
    const newStatus = formData.get('status') as RequestStatus;
    if (newStatus) {
      await updateAdminRequestStatusAction(id, newStatus);
    }
  };

  const handleAddNote = async (formData: FormData) => {
    'use server';
    const noteText = formData.get('note') as string;
    if (noteText) {
      await addAdminRequestNoteAction(id, noteText);
    }
  };

  const customerName = reqAny.customer?.fullName || reqAny.customerName || 'عميل';
  const customerEmail = reqAny.customer?.email || reqAny.customerEmail || '';
  const customerPhone = reqAny.customer?.phone || reqAny.customerPhone || '';
  const customerWhatsapp = reqAny.customer?.whatsapp || reqAny.customerWhatsapp || customerPhone;

  const cleanWhatsappNumber = customerWhatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="space-y-6">
      {/* Top Header Navigation & Status Action */}
      <div className="bg-white p-4 rounded-[var(--radius-card)] border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/requests"
            className="p-2.5 rounded-xl bg-sand/40 border border-border hover:bg-sand/80 hover:text-brand-red transition-colors text-text-primary"
            title="العودة لقائمة الطلبات"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-brand-red font-mono">
                {reqAny.reference}
              </h1>
              {getStatusBadge(reqAny.status)}
            </div>
            <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-text-muted" />
              <span>
                تاريخ الطلب:{' '}
                {new Date(reqAny.createdAt).toLocaleString('ar-EG', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </span>
            </p>
          </div>
        </div>

        {/* Quick Status Changers Form */}
        <form action={handleStatusUpdate} className="flex items-center gap-2 flex-wrap">
          <select
            name="status"
            defaultValue={reqAny.status}
            className="h-10 px-3 text-xs bg-sand/30 border border-border rounded-xl focus:outline-hidden text-text-primary font-extrabold"
          >
            <option value="new_request">طلب جديد (New)</option>
            <option value="contacted">تم التواصل (Contacted)</option>
            <option value="in_progress">قيد المتابعة (In Progress)</option>
            <option value="completed">مكتمل (Completed)</option>
            <option value="cancelled">ملغي (Cancelled)</option>
          </select>
          <Button type="submit" variant="primary" size="sm" className="h-10 text-xs px-4">
            تحديث الحالة
          </Button>
        </form>
      </div>

      {!isDbConnected && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
          ملاحظة: يتم عرض وضع المعايرة المحلية (Offline Mode).
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Customer Info & Submitted Details) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Info Card */}
          <Card variant="default" padding="lg">
            <CardHeader className="border-b border-border pb-3 mb-4">
              <h3 className="text-base font-extrabold text-text-primary flex items-center gap-2">
                <User className="h-5 w-5 text-brand-red" />
                <span>بيانات التواصل مع العميل</span>
              </h3>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="space-y-1">
                <p className="text-text-muted font-bold flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  <span>اسم العميل:</span>
                </p>
                <p className="font-extrabold text-sm text-text-primary">{customerName}</p>
              </div>

              <div className="space-y-1">
                <p className="text-text-muted font-bold flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  <span>البريد الإلكتروني:</span>
                </p>
                <a
                  href={`mailto:${customerEmail}`}
                  className="font-bold text-brand-red hover:underline dir-ltr text-right block"
                >
                  {customerEmail || 'غير محدد'}
                </a>
              </div>

              <div className="space-y-1">
                <p className="text-text-muted font-bold flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  <span>رقم الهاتف:</span>
                </p>
                <a
                  href={`tel:${customerPhone}`}
                  className="font-bold text-text-primary hover:text-brand-red dir-ltr text-right block"
                >
                  {customerPhone}
                </a>
              </div>

              <div className="space-y-1">
                <p className="text-text-muted font-bold flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>محادثة واتساب مباشرة:</span>
                </p>
                <a
                  href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
                    `مرحباً ${customerName}، بخصوص طلبكم رقم ${reqAny.reference} لدى إيجيبت ناشيونال تورز`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-extrabold hover:bg-[#20ba5a] transition-colors mt-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>فتح محادثة واتساب</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Form Payload Details Card */}
          <Card variant="default" padding="lg">
            <CardHeader className="border-b border-border pb-3 mb-4">
              <h3 className="text-base font-extrabold text-text-primary flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-gold-dark" />
                <span>تفاصيل ومعطيات الطلب المقدم</span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-right text-xs">
                  <tbody className="divide-y divide-border">
                    {Object.entries(detailsObj).map(([key, val]) => (
                      <tr key={key} className="hover:bg-sand/20 transition-colors">
                        <td className="p-3 font-bold text-text-secondary bg-sand/30 w-1/3 border-l border-border">
                          {formatKeyLabel(key)}
                        </td>
                        <td className="p-3 font-medium text-text-primary whitespace-pre-wrap">
                          {formatValueDisplay(val)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Notes & Activity Timeline) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Admin Internal Notes */}
          <Card variant="default" padding="md" className="space-y-4">
            <CardHeader className="border-b border-border pb-2">
              <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-2">
                <Layers className="h-4 w-4 text-brand-red" />
                <span>ملاحظات إدارية داخلية</span>
              </h3>
            </CardHeader>

            <form action={handleAddNote} className="space-y-3">
              <textarea
                name="note"
                rows={3}
                placeholder="أضف ملاحظة خاصة بفريق المبيعات والمتابعة..."
                className="w-full p-3 text-xs bg-sand/30 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-gold text-text-primary font-medium"
                required
              />
              <Button type="submit" variant="primary" size="sm" fullWidth className="text-xs py-2 gap-1">
                <Send className="h-3.5 w-3.5" />
                <span>حفظ الملاحظة</span>
              </Button>
            </form>

            <div className="space-y-3 pt-2">
              {(reqAny.notes || []).length === 0 ? (
                <p className="text-xs text-text-muted text-center py-4">
                  لا توجد ملاحظات سابقة على هذا الطلب.
                </p>
              ) : (
                (reqAny.notes || []).map((n: any) => (
                  <div key={n.id} className="p-3 rounded-xl bg-sand/40 border border-border space-y-1">
                    <p className="text-xs text-text-primary font-medium leading-relaxed">{n.note}</p>
                    <div className="flex items-center justify-between text-[10px] text-text-muted pt-1">
                      <span className="font-bold text-brand-red">{n.adminUser?.displayName || 'مدير النظام'}</span>
                      <span>
                        {new Date(n.createdAt).toLocaleDateString('ar-EG', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Activity Timeline */}
          <Card variant="default" padding="md">
            <CardHeader className="border-b border-border pb-2 mb-3">
              <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-2">
                <History className="h-4 w-4 text-brand-gold-dark" />
                <span>سجل تحديثات الطلب</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {(reqAny.events || []).length === 0 ? (
                <p className="text-xs text-text-muted text-center py-4">
                  لا توجد أحداث سابقة في السجل.
                </p>
              ) : (
                (reqAny.events || []).map((e: any) => (
                  <div key={e.id} className="flex items-start gap-2 text-text-secondary border-b border-border/50 pb-2">
                    <Clock className="h-3.5 w-3.5 text-text-muted shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-text-primary">
                        تعديل الحالة إلى <span className="text-brand-red">{e.newValue}</span>
                      </p>
                      <p className="text-[10px] text-text-muted">
                        {new Date(e.createdAt).toLocaleString('ar-EG')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
