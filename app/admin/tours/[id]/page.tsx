import * as React from 'react';
import { notFound } from 'next/navigation';
import { getAdminTourById } from '@/lib/db/tours-repository';
import { AdminTourForm } from '@/components/admin/AdminTourForm';

interface EditTourPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditTourPage({ params }: EditTourPageProps) {
  const { id } = await params;
  const { tour } = await getAdminTourById(id);

  if (!tour) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminTourForm initialData={tour} isEditMode />
    </div>
  );
}
