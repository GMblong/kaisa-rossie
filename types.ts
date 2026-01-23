
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CONTENT_MANAGEMENT = 'CONTENT_MANAGEMENT',
  FINANCE = 'FINANCE',
  PO_BUS = 'PO_BUS',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
  CUSTOMER = 'CUSTOMER',
  SALES_AGENT = 'SALES_AGENT',
  TICKETING = 'TICKETING'
}

export type PackageCategory = 'UMRAH' | 'HAJJ' | 'TOUR' | 'BUS';

export interface Package {
  id: string;
  title: string;
  category: PackageCategory;
  price: number;
  description: string;
  image: string;
  duration: string;
  departureDate: string;
  quota: number;
  remaining: number;
  facilities: string[];
  itinerary: { day: number; activity: string }[];
  hotel?: { name: string; stars: number };
  airline?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  familyId?: string; // ID untuk mengelompokkan akun keluarga
}

export interface Participant {
  id: string;
  name: string;
  type: 'DEWASA' | 'ANAK';
  isAccountHolder: boolean;
  linkedEmail?: string; // Jika jamaah ini sudah punya akun sendiri
  syncStatus: 'LINKED' | 'UNLINKED' | 'PENDING';
}

export interface CustomerDocument {
  id: string;
  name: string;
  type: 'PASSPORT' | 'VACCINE' | 'ID_CARD' | 'FAMILY_CARD';
  status: 'MISSING' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  uploadDate?: string;
  fileUrl?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  method: string;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}
