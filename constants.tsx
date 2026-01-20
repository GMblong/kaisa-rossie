
import { Package } from './types';

export const PACKAGES: Package[] = [
  // --- UMRAH CATEGORY ---
  {
    id: 'u1',
    title: 'Umrah Signature Ramadan',
    category: 'UMRAH',
    price: 42500000,
    description: 'Menikmati sepuluh malam terakhir di Makkah dengan layanan hotel pelataran bintang 5.',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200',
    duration: '12 Hari',
    departureDate: '2024-03-25',
    quota: 30,
    remaining: 5,
    facilities: ['Hotel Bintang 5', 'Business Class Flight', 'Mutawwif Khusus'],
    hotel: { name: 'Fairmont Makkah', stars: 5 },
    airline: 'Saudi Arabian Airlines',
    itinerary: [
      { day: 1, activity: 'Keberangkatan Jakarta - Jeddah' },
      { day: 2, activity: 'Ibadah Umrah Pertama' }
    ]
  },
  {
    id: 'u2',
    title: 'Umrah Syawal Family Privé',
    category: 'UMRAH',
    price: 32000000,
    description: 'Paket Umrah pasca Ramadan dengan suasana yang lebih tenang dan personal untuk keluarga.',
    image: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?auto=format&fit=crop&q=80&w=1200',
    duration: '9 Hari',
    departureDate: '2024-04-15',
    quota: 20,
    remaining: 10,
    facilities: ['Executive Coach', 'Full Board Hotel', 'Visa Umrah'],
    itinerary: [{ day: 1, activity: 'Check-in Madinah' }]
  },

  // --- HAJI CATEGORY ---
  {
    id: 'h1',
    title: 'Haji Furoda Royal Elite',
    category: 'HAJJ',
    price: 350000000,
    description: 'Keberangkatan tanpa antre dengan Visa Furoda resmi. Layanan tenda AC di Arafah dan Mina.',
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=1200',
    duration: '25 Hari',
    departureDate: '2024-06-01',
    quota: 15,
    remaining: 2,
    facilities: ['Visa Furoda', 'Tenda Maktab VIP', 'Apartemen Transit'],
    hotel: { name: 'Intercontinental Dar Al Tawhid', stars: 5 },
    itinerary: [
      { day: 1, activity: 'Manasik Haji Intensif' },
      { day: 8, activity: 'Wukuf di Arafah' }
    ]
  },

  // --- TOUR CATEGORY ---
  {
    id: 't1',
    title: 'European Muslim Heritage',
    category: 'TOUR',
    price: 48000000,
    description: 'Menelusuri jejak peradaban Islam di Spanyol dan Portugal dengan kuliner halal premium.',
    image: 'https://images.unsplash.com/photo-1543783232-af9942f4a472?auto=format&fit=crop&q=80&w=1200',
    duration: '14 Hari',
    departureDate: '2024-10-10',
    quota: 25,
    remaining: 12,
    facilities: ['Halal Meals Only', 'Professional Historian', 'Central Hotels'],
    itinerary: [{ day: 1, activity: 'Arrival in Madrid' }]
  },

  // --- BUS CATEGORY ---
  {
    id: 'b1',
    title: 'Mercedes-Benz Sprinter VIP',
    category: 'BUS',
    price: 3500000,
    description: 'Unit eksklusif 11-15 seats untuk perjalanan korporat atau delegasi penting.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    duration: 'Per Hari',
    departureDate: 'Flexible',
    quota: 5,
    remaining: 5,
    facilities: ['Leg Rest', 'Coffee Maker', 'Premium Audio'],
    itinerary: [{ day: 1, activity: 'Rental Service Area Jabodetabek' }]
  }
];

export const APP_THEME = {
  primary: '#022c22',
  secondary: '#d4af37',
  background: '#fdfbf7',
  text: '#022c22'
};
