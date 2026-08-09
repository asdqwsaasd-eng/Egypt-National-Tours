import { prisma, isDatabaseConnected } from './prisma';
import { RequestStatus, RequestType } from '@prisma/client';

export interface AdminRequestFilter {
  search?: string;
  status?: RequestStatus | 'all';
  requestType?: RequestType | 'all';
  page?: number;
  limit?: number;
}

export interface AdminRequestItem {
  id: string;
  reference: string;
  requestType: RequestType;
  status: RequestStatus;
  preferredLanguage: string;
  source: string;
  createdAt: Date;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerWhatsapp?: string | null;
  serviceTitle: string;
  detailsJson?: any;
}

/**
 * Sample fallback requests for admin UI testing when PostgreSQL is disconnected in local dev.
 */
const SAMPLE_ADMIN_REQUESTS: AdminRequestItem[] = [
  {
    id: 'req-sample-001',
    reference: 'ENT-2026-849201',
    requestType: 'flight',
    status: 'new_request',
    preferredLanguage: 'ar',
    source: 'website',
    createdAt: new Date(),
    customerName: 'أحمد محمود',
    customerEmail: 'ahmed@example.com',
    customerPhone: '+201012345678',
    customerWhatsapp: '+201012345678',
    serviceTitle: 'حجز طيران (Multi-City)',
    detailsJson: {
      requestType: 'flight',
      tripType: 'multi_city',
      segments: [
        { from: 'Cairo', to: 'Dubai', departureDate: '2026-09-01' },
        { from: 'Dubai', to: 'London', departureDate: '2026-09-08' },
      ],
      adults: 2,
      children: 1,
      customer: { fullName: 'أحمد محمود', email: 'ahmed@example.com', phone: '+201012345678' },
      notes: 'يفضل الطيران المباشر إن أمكن',
    },
  },
  {
    id: 'req-sample-002',
    reference: 'ENT-2026-392019',
    requestType: 'hotel',
    status: 'contacted',
    preferredLanguage: 'ar',
    source: 'website',
    createdAt: new Date(Date.now() - 86400000),
    customerName: 'سارة خالد',
    customerEmail: 'sara@example.com',
    customerPhone: '+201098765432',
    customerWhatsapp: '+201098765432',
    serviceTitle: 'حجز فندق (5 نجوم)',
    detailsJson: {
      requestType: 'hotel',
      destination: 'شرم الشيخ',
      starRating: 5,
      mealPlan: 'soft_all_inclusive',
      checkIn: '2026-10-10',
      checkOut: '2026-10-15',
      rooms: 1,
      adults: 2,
      customer: { fullName: 'سارة خالد', email: 'sara@example.com', phone: '+201098765432' },
      notes: 'غرفة مطلة على البحر',
    },
  },
  {
    id: 'req-sample-003',
    reference: 'ENT-2026-102938',
    requestType: 'egypt_tour',
    status: 'in_progress',
    preferredLanguage: 'en',
    source: 'website',
    createdAt: new Date(Date.now() - 172800000),
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    customerPhone: '+14155552671',
    customerWhatsapp: '+14155552671',
    serviceTitle: 'Cairo & Nile Cruise Tour',
    detailsJson: {
      requestType: 'egypt_tour',
      tourTitle: 'Cairo & Nile Cruise Explorer',
      travelDate: '2026-11-01',
      adults: 2,
      customer: { fullName: 'John Smith', email: 'john@example.com', phone: '+14155552671' },
      notes: 'Interested in private guided tours at Pyramids',
    },
  },
];

/**
 * Query admin requests list with filtering and search.
 */
export async function getAdminRequests(filter: AdminRequestFilter = {}) {
  const connected = await isDatabaseConnected();

  if (!connected) {
    let list = [...SAMPLE_ADMIN_REQUESTS];

    if (filter.status && filter.status !== 'all') {
      list = list.filter((r) => r.status === filter.status);
    }
    if (filter.requestType && filter.requestType !== 'all') {
      list = list.filter((r) => r.requestType === filter.requestType);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (r) =>
          r.reference.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.customerEmail.toLowerCase().includes(q) ||
          r.customerPhone.includes(q)
      );
    }

    return {
      items: list,
      totalCount: list.length,
      isDbConnected: false,
    };
  }

  try {
    const where: any = {};

    if (filter.status && filter.status !== 'all') {
      where.status = filter.status;
    }
    if (filter.requestType && filter.requestType !== 'all') {
      where.requestType = filter.requestType;
    }
    if (filter.search) {
      where.OR = [
        { reference: { contains: filter.search, mode: 'insensitive' } },
        { customer: { fullName: { contains: filter.search, mode: 'insensitive' } } },
        { customer: { email: { contains: filter.search, mode: 'insensitive' } } },
        { customer: { phone: { contains: filter.search } } },
      ];
    }

    const page = filter.page || 1;
    const limit = filter.limit || 20;

    const [requests, totalCount] = await Promise.all([
      prisma.request.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          customer: true,
          service: true,
        },
      }),
      prisma.request.count({ where }),
    ]);

    const items: AdminRequestItem[] = requests.map((r) => ({
      id: r.id,
      reference: r.reference,
      requestType: r.requestType,
      status: r.status,
      preferredLanguage: r.preferredLanguage,
      source: r.source,
      createdAt: r.createdAt,
      customerName: r.customer.fullName,
      customerEmail: r.customer.email,
      customerPhone: r.customer.phone,
      customerWhatsapp: r.customer.whatsapp,
      serviceTitle: r.service.titleAr || r.requestType,
      detailsJson: r.detailsJson,
    }));

    return {
      items,
      totalCount,
      isDbConnected: true,
    };
  } catch (err) {
    console.error('[AdminRepository] Failed to fetch requests:', err);
    return {
      items: SAMPLE_ADMIN_REQUESTS,
      totalCount: SAMPLE_ADMIN_REQUESTS.length,
      isDbConnected: false,
    };
  }
}

/**
 * Fetch detailed request object by ID with Customer, Service, Notes, and Events.
 */
export async function getAdminRequestById(id: string) {
  const connected = await isDatabaseConnected();

  if (!connected) {
    const sample = SAMPLE_ADMIN_REQUESTS.find((r) => r.id === id || r.reference === id) || SAMPLE_ADMIN_REQUESTS[0];
    return {
      request: {
        ...sample,
        notes: [
          {
            id: 'note-1',
            note: 'تم التواصل هاتفياً وتأكيد الخيارات المتاحة',
            createdAt: new Date(Date.now() - 43200000),
            adminUser: { displayName: 'مدير النظام' },
          },
        ],
        events: [
          {
            id: 'evt-1',
            eventType: 'status_changed',
            oldValue: 'new_request',
            newValue: 'contacted',
            createdAt: new Date(Date.now() - 43200000),
            adminUser: { displayName: 'مدير النظام' },
          },
        ],
      },
      isDbConnected: false,
    };
  }

  try {
    const request = await prisma.request.findUnique({
      where: { id },
      include: {
        customer: true,
        service: true,
        notes: {
          orderBy: { createdAt: 'desc' },
          include: { adminUser: true },
        },
        events: {
          orderBy: { createdAt: 'desc' },
          include: { adminUser: true },
        },
      },
    });

    return {
      request,
      isDbConnected: true,
    };
  } catch (err) {
    console.error('[AdminRepository] Failed to fetch request by ID:', err);
    return {
      request: null,
      isDbConnected: false,
    };
  }
}
