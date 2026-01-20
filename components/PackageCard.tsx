
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
      className="group relative cursor-pointer flex flex-col bg-white rounded-[40px] p-4 transition-all duration-700 hover:shadow-2xl border border-emerald-950/5"
      onClick={() => onClick(item.id)}
    >
      {/* Thumbnail Frame */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-emerald-900">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        
        {/* Simple Badge */}
        <div className="absolute top-6 left-6">
           <div className="bg-emerald-950/70 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-lg">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">{item.category}</span>
           </div>
        </div>

        {/* Price Tag Overlay - Simplified */}
        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent flex items-end justify-between">
            <div className="space-y-1">
               <p className="text-gold-400 text-[10px] font-black uppercase tracking-widest">Mulai Dari</p>
               <p className="text-3xl font-black text-white tracking-tighter">{formatPrice(item.price)}</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all">
              <ArrowUpRight size={20} />
            </div>
        </div>
      </div>

      {/* Content Frame */}
      <div className="py-8 px-4 space-y-6">
        <h3 className="text-2xl font-black text-emerald-950 leading-tight tracking-tight group-hover:text-gold-600 transition-colors">
          {item.title}
        </h3>
        
        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950/40 uppercase tracking-widest border-t border-emerald-950/5 pt-6">
           <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gold-600" />
              <span>{item.duration}</span>
           </div>
           <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-gold-600" />
              <span>Selected Tier</span>
           </div>
        </div>
      </div>
    </div>
  );
};
