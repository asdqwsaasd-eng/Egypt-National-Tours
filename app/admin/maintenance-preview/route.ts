import { NextResponse } from 'next/server';
import { getMaintenanceHtml } from '@/lib/maintenance/template';

/**
 * Route for Admin to preview the maintenance page.
 * Protected under /admin by middleware session check.
 */
export async function GET() {
  return new NextResponse(getMaintenanceHtml(), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
