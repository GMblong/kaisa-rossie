
import React from 'react';

export const StatCard: React.FC<{ label: string, value: string, icon: any, trend: string }> = ({ label, value, icon: Icon, trend }) => (
  <div className="bg-white p-8 sm:p-10 md:p-12 rounded-[55px] border border-emerald-950/5 shadow-xl group hover:border-gold-500 transition-all duration-1000 overflow-hidden relative">
    <div className="relative z-10 flex flex-col justify-between h-full space-y-6 md:space-y-8">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-950/5 rounded-[22px] flex items-center justify-center text-emerald-950 group-hover:bg-emerald-950 group-hover:text-gold-400 transition-all duration-700 shrink-0">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter mb-2 break-all">{value}</p>
        <p className="text-[9px] sm:text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.4em] mb-4 sm:mb-6">{label}</p>
        <div className="h-px w-full bg-emerald-950/5 mb-4 sm:mb-6 group-hover:bg-gold-500/20 transition-colors"></div>
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${trend.includes('+') || trend.includes('Aman') || trend.includes('Siap') || trend.includes('Optimal') || trend.includes('Verified') || trend.includes('Live') || trend.includes('Published') || trend.includes('Tuntas') ? 'bg-emerald-500' : 'bg-gold-500'}`}></div>
          <p className={`text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] ${trend.includes('+') || trend.includes('Aman') || trend.includes('Siap') || trend.includes('Optimal') || trend.includes('Verified') || trend.includes('Live') || trend.includes('Published') || trend.includes('Tuntas') ? 'text-emerald-700' : 'text-gold-600'}`}>{trend}</p>
        </div>
      </div>
    </div>
  </div>
);
