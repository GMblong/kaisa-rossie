
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CONTENT_MANAGEMENT = 'CONTENT_MANAGEMENT',
  FINANCE = 'FINANCE',
  PO_BUS = 'PO_BUS',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
  CUSTOMER = 'CUSTOMER'
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
}
