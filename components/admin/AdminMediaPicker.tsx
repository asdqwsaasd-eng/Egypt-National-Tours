'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button, Alert, Badge, TextInput } from '@/components/ui';
import {
  ImageIcon,
  UploadCloud,
  X,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Trash2,
} from 'lucide-react';
import { deleteMediaAction } from '@/lib/actions/media-actions';

interface AdminMediaPickerProps {
  selectedUrl?: string;
  onSelect: (url: string) => void;
  onClose: () => void;
  isTourCoverMode?: boolean;
}

export const AdminMediaPicker: React.FC<AdminMediaPickerProps> = ({
  selectedUrl,
  onSelect,
  onClose,
  isTourCoverMode = false,
}) => {
  const [activeTab, setActiveTab] = React.useState<'library' | 'upload'>('library');
  const [mediaItems, setMediaItems] = React.useState<any[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Upload states
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [fileDimensions, setFileDimensions] = React.useState<{ width: number; height: number } | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [uploadWarning, setUploadWarning] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  const fetchLibrary = React.useCallback(async () => {
    setIsLoadingLibrary(true);
    try {
      const res = await fetch('/api/admin/media/list');
      if (res.ok) {
        const data = await res.json();
        setMediaItems(data.items || []);
      }
    } catch (err) {
      console.error('Failed to load media library:', err);
    } finally {
      setIsLoadingLibrary(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  const handleFileSelect = (file: File) => {
    setUploadError(null);
    setUploadWarning(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileDimensions(null);

    // 1. File size check (8 MB)
    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError('حجم الصورة أكبر من الحد المسموح وهو 8 ميجابايت.');
      return;
    }

    // 2. MIME & Extension check
    const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'webp'];

    if (!ALLOWED_MIME.includes(file.type) || !ALLOWED_EXT.includes(ext)) {
      setUploadError('نوع الملف غير مسموح. الأنواع المسموحة فقط هي: JPG, PNG, WEBP.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFile(file);

    // 3. Dimension & Aspect ratio checks
    const img = new window.Image();
    img.src = objectUrl;
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setFileDimensions({ width: w, height: h });

      if (w < 800 || h < 450) {
        setUploadWarning('تنبيه: أبعاد الصورة صغيرة قد تظهر بجودة منخفضة (المقترح الأدنى 800×450).');
      } else if (w > 6000 || h > 6000) {
        setUploadError('أبعاد الصورة كبيرة جداً وتتجاوز 6000×6000 بكسل.');
        setSelectedFile(null);
        return;
      }

      if (isTourCoverMode) {
        const ratio = w / h;
        if (ratio < 1.4 || ratio > 2.0) {
          setUploadWarning('يفضل استخدام صورة أفقية بنسبة 16:9، والمقاس المقترح 1600×900.');
        }
      }
    };
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(20);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploadProgress(50);
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(90);
      const data = await res.json();
      setIsUploading(false);

      if (res.ok && data.success) {
        setUploadProgress(100);
        setStatusMessage('تم رفع الصورة بنجاح وإضافتها إلى مكتبة الصور.');
        onSelect(data.url);
        await fetchLibrary();
        setTimeout(() => {
          onClose();
        }, 600);
      } else {
        setUploadError(data.error || 'فشل رفع الملف.');
      }
    } catch (err: any) {
      setIsUploading(false);
      setUploadError(err.message || 'حدث خطأ شبكي أثناء رفع الصورة');
    }
  };

  const handleDeleteMedia = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذه الصورة من المكتبة؟')) return;

    const res = await deleteMediaAction(id);
    if (res.success) {
      setStatusMessage(res.message || 'تم الحذف بنجاح');
      await fetchLibrary();
    } else {
      alert(res.error || 'تعذر حذف الصورة');
    }
  };

  const filteredItems = mediaItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      item.fileName.toLowerCase().includes(q) ||
      item.storageKey.toLowerCase().includes(q) ||
      (item.altTextAr && item.altTextAr.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-border shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-sand/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-text-primary">
                مكتبة صور وسائط الموقع
              </h3>
              <p className="text-xs text-text-secondary">
                {isTourCoverMode
                  ? 'اختر أو ارفع صورة غلاف أفقية عالية الجودة (16:9 / 1600×900)'
                  : 'معاينة واختيار الصور المرفوعة عبر Vercel Blob أو الأصول الثابتة'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-sand transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-border bg-sand/20 px-4 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'library'
                ? 'border-brand-red text-brand-red bg-white rounded-t-lg'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>مكتبة الصور ({mediaItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-brand-red text-brand-red bg-white rounded-t-lg'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <UploadCloud className="h-4 w-4" />
            <span>رفع صورة جديدة (Vercel Blob)</span>
          </button>
        </div>

        {/* Notifications */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold border-b border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab 1: Library */}
        {activeTab === 'library' && (
          <div className="flex-1 flex flex-col overflow-hidden p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <TextInput
                  placeholder="بحث باسم الصورة أو المسار..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4 text-text-muted" />}
                  className="h-10 text-xs"
                />
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('upload')}
                className="gap-1 text-xs shrink-0"
              >
                <UploadCloud className="h-4 w-4" />
                <span>رفع صورة جديدة</span>
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pr-1">
              {isLoadingLibrary ? (
                <div className="col-span-full py-12 text-center text-xs text-text-muted">
                  جاري تحميل مكتبة الصور...
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="col-span-full py-12 text-center text-xs text-text-muted">
                  لا توجد صور مطابقة لمحددات البحث.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const isSelected = selectedUrl === item.storageKey;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelect(item.storageKey)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2 group relative bg-white hover:shadow-md ${
                        isSelected
                          ? 'border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20'
                          : 'border-border hover:border-brand-gold'
                      }`}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-sand/30 border border-border">
                        <Image
                          src={item.storageKey}
                          alt={item.fileName}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-extrabold text-text-primary truncate max-w-[160px]" title={item.fileName}>
                            {item.fileName}
                          </p>
                          {item.isBlob ? (
                            <Badge variant="gold" className="text-[10px]">مرفوعة (Blob)</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px]">صورة ثابتة</Badge>
                          )}
                        </div>

                        <p className="font-mono text-text-muted dir-ltr text-right text-[10px] truncate" title={item.storageKey}>
                          {item.storageKey}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-text-secondary pt-1 border-t border-border/60">
                          <span>{(item.fileSize / 1024).toFixed(0)} KB</span>
                          {item.isDeletable && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteMedia(e, item.id)}
                              className="text-error hover:bg-error/10 p-1 rounded-md transition-colors"
                              title="حذف من المكتبة"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Upload */}
        {activeTab === 'upload' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {uploadError && (
              <Alert variant="error" dismissible onDismiss={() => setUploadError(null)}>
                {uploadError}
              </Alert>
            )}

            {uploadWarning && (
              <div className="p-3 bg-amber-50 text-amber-800 border border-amber-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                <span>{uploadWarning}</span>
              </div>
            )}

            {/* Dropzone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) {
                  handleFileSelect(e.dataTransfer.files[0]);
                }
              }}
              className="p-8 border-2 border-dashed border-border hover:border-brand-red rounded-2xl bg-sand/20 text-center space-y-4 transition-colors cursor-pointer"
              onClick={() => {
                const el = document.getElementById('media-file-input');
                if (el) el.click();
              }}
            >
              <input
                id="media-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />
              <div className="h-14 w-14 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto">
                <UploadCloud className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold text-text-primary">
                  انقر هنا لاختيار صورة من جهازك أو اسحب الملف إلى هنا
                </p>
                <p className="text-xs text-text-secondary">
                  الأنواع المتاحة: JPG, PNG, WEBP (الحد الأقصى: 8 ميجابايت)
                </p>
              </div>
            </div>

            {/* Selected File Preview */}
            {selectedFile && previewUrl && (
              <div className="p-4 rounded-2xl bg-sand/40 border border-border flex flex-col sm:flex-row items-center gap-4">
                <div className="relative aspect-[16/9] w-full sm:w-48 overflow-hidden rounded-xl border border-border shadow-xs bg-white">
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                </div>

                <div className="space-y-2 text-xs flex-1 w-full">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-emerald-600" />
                    <span className="font-bold text-text-primary dir-ltr text-right">
                      {selectedFile.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-text-secondary font-mono text-[11px]">
                    <span>الحجم: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                    {fileDimensions && (
                      <span>الأبعاد: {fileDimensions.width} × {fileDimensions.height} px</span>
                    )}
                  </div>

                  {isUploading && (
                    <div className="space-y-1 pt-2">
                      <div className="w-full h-2 bg-sand rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-red transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-bold text-brand-red">جاري الرفع إلى Vercel Blob...</p>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      isLoading={isUploading}
                      onClick={handleUploadSubmit}
                      className="px-6 font-bold"
                    >
                      بدء الرفع والربط بالمكتبة
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-border bg-sand/20 flex justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            إغلاق
          </Button>
        </div>
      </div>
    </div>
  );
};
