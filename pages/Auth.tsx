
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, UserCheck, Briefcase, DollarSign, Bus, BadgeCheck, ArrowLeft } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole) => void;
  onNavigate?: (page: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);

  const roleOptions = [
    { role: UserRole.CUSTOMER, label: 'Jemaah', icon: UserCheck, desc: 'Akses Perjalanan Saya' },
    { role: UserRole.SUPER_ADMIN, label: 'Super Admin', icon: ShieldCheck, desc: 'Kontrol Sistem Penuh' },
    { role: UserRole.FINANCE, label: 'Finance', icon: DollarSign, desc: 'Kas & Pembayaran' },
    { role: UserRole.CONTENT_MANAGEMENT, label: 'Content', icon: Briefcase, desc: 'Manajemen Paket' },
    { role: UserRole.PO_BUS, label: 'PO Bus', icon: Bus, desc: 'Manajemen Armada' },
    { role: UserRole.SUPPORT_STAFF, label: 'Staff', icon: BadgeCheck, desc: 'Verifikasi Dokumen' },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Tombol Back to Home karena Navbar disembunyikan */}
      <button 
        onClick={() => onNavigate?.('home')}
        className="absolute top-10 left-10 z-[110] flex items-center space-x-4 px-6 py-3 bg-emerald-950/20 backdrop-blur-xl border border-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 hover:border-gold-500 transition-all shadow-2xl"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </button>

      <div className="hidden lg:flex relative bg-emerald-950 items-center justify-center p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564767609342-620cb19b2357?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover opacity-20"
            alt="Islamic Architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-transparent to-emerald-950/80"></div>
        </div>
        <div className="relative z-10 space-y-12 text-center max-w-sm">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-3xl">K</div>
          </div>
          <div className="inline-block px-8 py-3 bg-white/5 border border-white/10 rounded-full text-gold-400 text-[10px] font-black uppercase tracking-[0.6em] backdrop-blur-md">
            Elite Access
          </div>
          <h2 className="text-6xl font-black text-white leading-[0.9] tracking-tighter">
            Join the <br /> <span className="text-gold-500 italic font-serif font-light">Kaisa Family.</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 md:p-20 bg-white relative">
        <div className="w-full max-w-2xl space-y-12">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-5xl font-black text-emerald-950 tracking-tighter">Private Portal</h1>
            <p className="text-emerald-950/40 font-bold uppercase text-[11px] tracking-[0.3em]">Pilih gerbang akses masuk Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roleOptions.map((opt) => (
              <button 
                key={opt.role}
                onClick={() => onLogin(opt.role)}
                className={`group flex items-center space-x-4 p-5 rounded-3xl transition-all text-left border ${
                  opt.role === UserRole.SUPER_ADMIN ? 'bg-emerald-950 text-white border-emerald-950' : 'bg-ivory border-emerald-950/5 hover:border-gold-500 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  opt.role === UserRole.SUPER_ADMIN ? 'bg-white/10 text-gold-400' : 'bg-emerald-950/5 text-emerald-950 group-hover:bg-gold-500 group-hover:text-white'
                }`}>
                  <opt.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-black">{opt.label}</p>
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${opt.role === UserRole.SUPER_ADMIN ? 'text-white/40' : 'text-emerald-950/30'}`}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-emerald-950/5"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="px-6 bg-white text-emerald-950/20">Atau login manual</span></div>
          </div>

          <div className="space-y-4">
             <input type="email" className="w-full bg-emerald-950/5 border border-emerald-950/10 rounded-2xl py-5 px-8 font-bold text-emerald-950 outline-none focus:border-gold-500 transition-all" placeholder="Email Address" />
             <input type="password" className="w-full bg-emerald-950/5 border border-emerald-950/10 rounded-2xl py-5 px-8 font-bold text-emerald-950 outline-none focus:border-gold-500 transition-all" placeholder="Password" />
             <button className="w-full bg-emerald-950 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-gold-500 transition-all shadow-xl">Submit Access</button>
          </div>
        </div>
      </div>
    </div>
  );
};
