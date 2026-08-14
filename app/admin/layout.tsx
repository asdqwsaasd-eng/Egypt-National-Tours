import * as React from 'react';
import { getAdminSession } from '@/lib/auth/session';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getAdminSession();

  // If no session (e.g. login or setup page), render children directly without admin sidebar
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AdminLayoutClient displayName={session.displayName} email={session.email}>
      {children}
    </AdminLayoutClient>
  );
}
