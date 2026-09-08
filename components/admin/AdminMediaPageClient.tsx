'use client';

import * as React from 'react';
import Image from 'next/image';
import { SectionHeader, Card, Badge, CardContent, Button, TextInput } from '@/components/ui';
import { AdminMediaPicker } from '@/components/admin/AdminMediaPicker';
import { deleteMediaAction } from '@/lib/actions/media-actions';
import {
  UploadCloud,
  Search,
  ExternalLink,
  Trash2,
  Copy,
  Check,
  Info,
  ShieldCheck,
  ImageIcon,
} from 'lucide-react';

interface AdminMediaPageClientProps {
  initialItems: any[];
  isDbConnected: boolean;
}

export const AdminMediaPageClient: React.FC<AdminMediaPageClientProps> = ({
  initialItems,
  isDbConnected,
}) => {
  const [items, setItems] = React.useState(initialItems);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState<'all' | 'blob' | 'static'>('all');
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/media/list');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error('Failed to fetch media list:', err);
    }
  };

  const handleCopyPath = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذه الصورة من الوسائط نهائياً؟')) return;

    const res = await deleteMediaAction(id);
    if (res.success) {
      setStatusMessage(res.message || 'تم حذف الصورة بنجاح');
      await fetchItems();
    } else {
      alert(res.error || 'تعذر حذف الصورة');
    }
  };

  const filteredItems = items.filter((item) => {
    if (filterType === 'blob' && !item.isBlob) return false;
    if (filterType === 'static' && item.isBlob) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      item.fileName.toLowerCase().includes(q) ||
      item.storageKey.toLowerCase().includes(q) ||
      (item.altTextAr && item.altTextAr.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Upload Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="مكتبة الصور والبنرات البصرية"
          subtitle={`إجمالي الصور المسجلة بمكتبة الوسائط: ${items.length} صورة`}
          align="start"
        />
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowUploadModal(true)}
          className="shadow-md gap-1.5 font-bold"
        >
          <UploadCloud className="h-5 w-5" />
          <span>رفع صورة جديدة (Vercel Blob)</span>
        </Button>
      </div>

      {!isDbConnected && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
          ملاحظة: يتم عرض وضع المعايرة المحلية (Offline Mode).
        </div>
      )}

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold">
          {statusMessage}
        </div>
      )}

      {/* Info Status Banner */}
      <Card variant="default" padding="md" className="bg-sand/30">
        <CardContent className="flex items-start gap-3 text-xs text-text-secondary">
          <Info className="h-5 w-5 text-brand-gold-dark shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-text-primary">نظام إدارة وسائط الموقع (Vercel Blob + Database):</p>
            <p>
              تُحفظ الصور المرفوعة جديدة مباشرة على السحابة المستدامة (<code className="font-mono bg-sand/60 px-1 py-0.5 rounded">Vercel Blob Storage</code>) وتسجل بجدول الوسائط برقم معرف وتاريخ رفع. كما تتاح الأصول الثابتة المعتمدة بالموقع للاستخدام وإعادة الربط برحلات وتفاصيل الخدمات دون الحاجة لإعادة نشر الكود.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filter & Search Bar */}
      <Card variant="default" padding="md" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Button
              type="button"
              variant={filterType === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterType('all')}
              className="text-xs"
            >
              جميع الصور ({items.length})
            </Button>
            <Button
              type="button"
              variant={filterType === 'blob' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterType('blob')}
              className="text-xs"
            >
              المرفوعة سحابياً ({items.filter((i) => i.isBlob).length})
            </Button>
            <Button
              type="button"
              variant={filterType === 'static' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterType('static')}
              className="text-xs"
            >
              الصور الثابتة ({items.filter((i) => !i.isBlob).length})
            </Button>
          </div>

          <div className="w-full sm:w-72">
            <TextInput
              placeholder="بحث بالاسم أو المسار..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-text-muted" />}
              className="h-10 text-xs"
            />
          </div>
        </div>
      </Card>

      {/* Media Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-text-muted bg-white rounded-2xl border border-border">
            لا توجد صور مطابقة لمحددات البحث والتصفية.
          </div>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} variant="default" padding="md" className="space-y-4 hover:shadow-md transition-shadow group bg-white">
              <div className="relative aspect-[16/9] w-full bg-sand/30 rounded-xl overflow-hidden border border-border flex items-center justify-center">
                <Image
                  src={item.storageKey}
                  alt={item.fileName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-text-primary text-sm truncate max-w-[180px]" title={item.fileName}>
                    {item.fileName}
                  </p>
                  {item.isBlob ? (
                    <Badge variant="gold" className="inline-flex items-center gap-1 text-[10px]">
                      <span>مرفوعة سحابياً</span>
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="inline-flex items-center gap-1 text-[10px]">
                      <ShieldCheck className="h-3 w-3" />
                      <span>صورة ثابتة</span>
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between font-mono text-[11px] bg-sand/40 p-1.5 rounded border border-border">
                  <span className="truncate dir-ltr text-right flex-1" title={item.storageKey}>
                    {item.storageKey}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyPath(item.storageKey)}
                    className="ms-2 text-text-muted hover:text-brand-red p-1 transition-colors"
                    title="نسخ المسار"
                  >
                    {copiedKey === item.storageKey ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-text-secondary pt-2 border-t border-border">
                  <span className="text-[11px]">
                    {item.width && item.height ? `${item.width}×${item.height} px | ` : ''}
                    {(item.fileSize / 1024).toFixed(0)} KB
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={item.storageKey}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-brand-red hover:underline text-[11px]"
                    >
                      <span>معاينة</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    {item.isDeletable && (
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1 rounded-md text-error hover:bg-error/10 transition-colors"
                        title="حذف الصورة"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <AdminMediaPicker
          onSelect={async (url) => {
            setShowUploadModal(false);
            await fetchItems();
          }}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};
