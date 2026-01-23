
import React from 'react';
import { User as UserIcon, Camera } from 'lucide-react';
import { User, UserRole } from '../../types';

export const ProfileView: React.FC<{ user: User, role: UserRole }> = ({ user, role }) => (
  <div className="bg-white rounded-[50px] p-8 sm:p-12 md:p-20 border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
    <div className="flex flex-col md:flex-row items-center gap-12">
       <div className="relative group shrink-0">
          <div className="w-40 h-40 sm:w-48 sm:h-48 bg-ivory rounded-[50px] border-4 border-emerald-950/5 flex items-center justify-center overflow-hidden shadow-2xl">
             <UserIcon size={80} className="text-emerald-950/10" />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-gold-500 text-white p-4 rounded-2xl shadow-xl hover:bg-emerald-950 transition-all"><Camera size={20} /></button>
       </div>
       <div className="text-center md:text-left space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-emerald-950 tracking-tighter">{user.name}</h2>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
             <span className="bg-emerald-950/5 text-emerald-950/40 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{role} Portal</span>
             <span className="bg-gold-500/10 text-gold-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">ID: {user.id}</span>
          </div>
       </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-12 border-t border-emerald-950/5">
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-2">Nama Lengkap</label>
        <input type="text" defaultValue={user.name} className="w-full bg-ivory p-5 sm:p-6 rounded-3xl border border-emerald-950/10 font-bold focus:border-gold-500 outline-none transition-all shadow-sm" />
      </div>
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-2">Email Bisnis</label>
        <input type="email" defaultValue={user.email} className="w-full bg-ivory p-5 sm:p-6 rounded-3xl border border-emerald-950/10 font-bold focus:border-gold-500 outline-none transition-all shadow-sm" />
      </div>
    </div>
    <button className="w-full sm:w-auto bg-emerald-950 text-white px-12 py-6 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-xl">Simpan Identitas Atelier</button>
  </div>
);
