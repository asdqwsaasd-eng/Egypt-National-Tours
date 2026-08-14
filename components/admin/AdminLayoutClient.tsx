'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { logoutAdminAction } from '@/lib/auth/actions';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Compass,
  Moon,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
  User,
} from 'lucide-react';

interface AdminLayoutClientProps {
  displayName: string;
  email: string;
  children: React.ReactNode;
}

const navItems = [
  { label: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
  { label: 'الطلبات', href: '/admin/requests', icon: Inbox },
  { label: 'البرامج السياحية', href: '/admin/tours', icon: Compass },
  { label: 'الحج والعمرة', href: '/admin/hajj-umrah', icon: Moon },
  { label: 'الخدمات', href: '/admin/services', icon: Briefcase },
  { label: 'آراء العملاء', href: '/admin/reviews', icon: MessageSquare },
  { label: 'مكتبة الصور', href: '/admin/media', icon: ImageIcon },
  { label: 'إعدادات الموقع', href: '/admin/settings', icon: Settings },
];

export const AdminLayoutClient: React.FC<AdminLayoutClientProps> = ({
  displayName,
  email,
  children,
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile drawer on route navigation
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActiveRoute = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const renderNavLinks = (onItemClick?: () => void) => (
    <div className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActiveRoute(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              active
                ? 'bg-brand-red text-white shadow-md'
                : 'text-text-secondary hover:bg-sand/60 hover:text-brand-red'
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-text-muted'}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-sand/30 dir-rtl text-text-primary flex flex-col font-sans">
      {/* ─── Top Admin Navigation Bar ─── */}
      <header className="bg-white border-b border-border sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Right: Brand & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-sand/60 transition-colors"
              aria-label="فتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="relative h-10 w-36 block">
                <Image
                  src="/assets/brand/logo-original.png"
                  alt="Egypt National Tours"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-gold-light/60 text-brand-red text-xs font-bold border border-brand-gold/30">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>لوحة التحكم</span>
              </span>
            </Link>
          </div>

          {/* Left: User Profile & Public Site Preview */}
          <div className="flex items-center gap-3">
            <Link
              href="/ar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-brand-red bg-brand-gold-light/50 border border-brand-gold/40 hover:bg-brand-gold-light transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">معاينة الموقع العام</span>
              <span className="sm:hidden">الموقع</span>
            </Link>

            <div className="h-4 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xs">
                <User className="h-4 w-4" />
              </div>
              <div className="text-right hidden md:block text-xs">
                <p className="font-bold text-text-primary leading-tight">{displayName}</p>
                <p className="text-[11px] text-text-muted dir-ltr text-right">{email}</p>
              </div>

              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                  title="تسجيل الخروج"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">خروج</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Admin Desktop Layout ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Fixed Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white p-4 rounded-[var(--radius-card)] border border-border shadow-xs sticky top-22 space-y-4">
            <div className="pb-3 border-b border-border text-xs">
              <p className="text-text-muted font-medium">مرحباً بك،</p>
              <p className="text-sm font-extrabold text-brand-red">{displayName}</p>
            </div>

            {renderNavLinks()}

            <div className="pt-3 border-t border-border">
              <Link
                href="/ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-sand/40 border border-border text-xs font-bold text-text-secondary hover:text-brand-red transition-colors"
              >
                <span>معاينة الموقع العام</span>
                <ExternalLink className="h-4 w-4 text-text-muted" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Dynamic Page Content */}
        <main className="lg:col-span-9 space-y-6">
          {children}
        </main>
      </div>

      {/* ─── Responsive Mobile Drawer via Portal ─── */}
      {isMounted &&
        isMobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden dir-rtl">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide Drawer Panel */}
            <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50">
              <div className="p-4 border-b border-border flex items-center justify-between bg-sand/20">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-28 block">
                    <Image
                      src="/assets/brand/logo-original.png"
                      alt="Egypt National Tours"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-text-secondary hover:bg-sand/60 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 border-b border-border text-xs bg-sand/10">
                <p className="font-bold text-text-primary">{displayName}</p>
                <p className="text-text-muted dir-ltr text-right">{email}</p>
              </div>

              <div className="p-4 flex-1 overflow-y-auto">
                {renderNavLinks(() => setIsMobileMenuOpen(false))}
              </div>

              <div className="p-4 border-t border-border space-y-2 bg-sand/10">
                <Link
                  href="/ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-border text-xs font-bold text-brand-red"
                >
                  <span>معاينة الموقع العام</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>

                <form action={logoutAdminAction}>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
