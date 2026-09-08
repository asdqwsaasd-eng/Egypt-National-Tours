import * as React from 'react';
import { getAdminMediaList } from '@/lib/db/media-repository';
import { AdminMediaPageClient } from '@/components/admin/AdminMediaPageClient';

export default async function AdminMediaPage() {
  const { items, isDbConnected } = await getAdminMediaList();

  return (
    <AdminMediaPageClient initialItems={items} isDbConnected={isDbConnected} />
  );
}
