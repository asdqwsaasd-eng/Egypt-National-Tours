import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth/session';
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
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getAdminSession();

  // If no session (e.g. login page handles its own layout), render children directly
  if (!session) {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'الرئيسية والإحصائيات', href: '/admin', icon: LayoutDashboard },
    { label: 'طلبات العملاء', href: '/admin/requests', icon: Inbox },
    { label: 'إدارة الخدمات', href: '/admin/services', icon: Briefcase },
    { label: 'البرامج السياحية', href: '/admin/tours', icon: Compass },
    { label: 'الحج والعمرة', href: '/admin/hajj-umrah', icon: Moon },
    { label: 'آراء العملاء', href: '/admin/reviews', icon: MessageSquare },
    { label: 'مكتبة الوسائط', href: '/admin/media', icon: ImageIcon },
    { label: 'إعدادات الموقع', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-sand/30 dir-rtl text-text-primary flex flex-col">
      {/* ─── Top Admin Header ─── */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="relative h-10 w-36 block">
              <Image
                src="/assets/brand/logo-original.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-gold-light/60 text-brand-red text-xs font-bold border border-brand-gold/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>لوحة الإدارة</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-secondary hover:text-brand-red flex items-center gap-1 transition-colors"
            >
              <span>معاينة الموقع العام</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <div className="h-4 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="text-start hidden md:block text-xs">
                <p className="font-bold text-text-primary">{session.displayName}</p>
                <p className="text-text-muted dir-ltr">{session.email}</p>
              </div>

              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-error bg-error/10 hover:bg-error/20 transition-colors cursor-pointer"
                  title="تسجيل الخروج"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">خروج</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Admin Shell ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3">
          <nav className="bg-white p-3 rounded-[var(--radius-card)] border border-border space-y-1 sticky top-20 shadow-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-text-primary hover:bg-sand hover:text-brand-red transition-all"
                >
                  <Icon className="h-4 w-4 text-text-muted shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Page Body */}
        <main className="lg:col-span-9 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
