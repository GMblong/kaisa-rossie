
import React from 'react';
import { Package } from '../types';
import { ArrowUpRight, Calendar, Star, MapPin } from 'lucide-react';

interface PackageCardProps {
  item: Package;
  onClick: (id: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ item, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div 
      className="group relative cursor-pointer flex flex-col bg-white rounded-[40px] p-4 transition-all duration-700 hover:shadow-2xl border border-emerald-950/5 h-full"
      onClick={() => onClick(item.id)}
    >
      {/* Thumbnail Frame */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-emerald-900 shrink-0">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        
        {/* Simple Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
           <div className="bg-emerald-950/70 backdrop-blur-md px-4 py-1.5 sm:px-6 sm:py-2 rounded-full border border-white/10 shadow-lg">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-white">{item.category}</span>
           </div>
        </div>

        {/* Price Tag Overlay - Fixed Overflow */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent flex items-end justify-between gap-2">
            <div className="space-y-1 min-w-0 flex-1">
               <p className="text-gold-400 text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Mulai Dari</p>
               <p className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tighter break-words leading-none">
                 {formatPrice(item.price)}
               </p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all shrink-0">
              <ArrowUpRight size={20} />
            </div>
        </div>
      </div>

      {/* Content Frame */}
      <div className="py-6 sm:py-8 px-2 sm:px-4 space-y-4 sm:space-y-6 flex-grow flex flex-col justify-between">
        <h3 className="text-xl sm:text-2xl font-black text-emerald-950 leading-tight tracking-tight group-hover:text-gold-600 transition-colors line-clamp-2">
          {item.title}
        </h3>
        
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-emerald-950/40 uppercase tracking-widest border-t border-emerald-950/5 pt-4 sm:pt-6">
           <div className="flex items-center space-x-2">
              <Calendar size={14} className="text-gold-600" />
              <span>{item.duration}</span>
           </div>
           <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-gold-600" />
              <span>Elite Tier</span>
           </div>
        </div>
      </div>
    </div>
  );
};
