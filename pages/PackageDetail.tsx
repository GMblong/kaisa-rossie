
import React from 'react';
import { Package } from '../types';
import { Calendar, Star, Plane, Hotel, Check, ArrowLeft, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface PackageDetailProps {
  item: Package;
  onBack: () => void;
  onBook: (id: string) => void;
}

export const PackageDetail: React.FC<PackageDetailProps> = ({ item, onBack, onBook }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-ivory min-h-screen pb-20 md:pb-32">
      {/* 01. DYNAMIC HEADER SECTION */}
      <section className="bg-emerald-950 pt-32 pb-24 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="container-luxe relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-3 text-white/50 hover:text-gold-400 transition-all text-[10px] font-black uppercase tracking-widest mb-10 md:mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            <span>Kembali ke Koleksi</span>
          </button>

          <div className="max-w-4xl space-y-6 md:space-y-8">
            <div className="inline-flex items-center space-x-3 text-gold-400 bg-white/5 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md">
               <Sparkles size={14} />
               <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">{item.category} Signature Atelier</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black text-white leading-[1.1] md:leading-[0.85] tracking-tighter">
              {item.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-gold-500 italic font-serif font-light' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.08] islamic-pattern scale-150 pointer-events-none"></div>
      </section>

      {/* 02. MAIN CONTENT GRID */}
      <div className="container-luxe -mt-10 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Visuals & Info */}
          <div className="lg:col-span-8 space-y-12 md:space-y-20">
            {/* Hero Visual */}
            <div className="aspect-[4/3] md:aspect-video rounded-[40px] md:rounded-[60px] overflow-hidden shadow-4xl border-[6px] md:border-[16px] border-white bg-emerald-950">
              <img src={item.image} className="w-full h-full object-cover opacity-90 transition-transform duration-[10s] hover:scale-110" alt={item.title} />
            </div>

            {/* Description Block */}
            <div className="space-y-6 md:space-y-8 px-2 md:px-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-gold-600"></div>
                <h3 className="text-[11px] md:text-[12px] font-black text-emerald-950 uppercase tracking-[0.5em]">The Narrative</h3>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl text-emerald-950 font-medium leading-relaxed md:leading-tight tracking-tight">
                {item.description}
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 px-2 md:px-0">
              {[
                { icon: Calendar, label: "Perjalanan", value: item.duration },
                { icon: Plane, label: "Maskapai", value: item.airline || 'Charter VVIP' },
                { icon: MapPin, label: "Akomodasi", value: `${item.hotel?.stars || 5} Star Collection` },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 md:p-10 rounded-[40px] border border-emerald-950/5 shadow-xl hover:shadow-2xl transition-all group">
                  <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center text-gold-600 mb-8 group-hover:bg-emerald-950 group-hover:text-gold-400 transition-all">
                    <stat.icon size={22} />
                  </div>
                  <p className="text-[9px] font-black text-emerald-950/30 uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className="text-lg font-black text-emerald-950 tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Full Itinerary */}
            <div className="space-y-12 md:space-y-16 px-2 md:px-4 pt-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-gold-600"></div>
                <h3 className="text-[11px] md:text-[12px] font-black text-emerald-950 uppercase tracking-[0.5em]">The Journey</h3>
              </div>
              <div className="space-y-12 border-l-2 border-emerald-950/5 ml-4 md:ml-8 pl-8 md:pl-16">
                {item.itinerary.map((step) => (
                  <div key={step.day} className="relative group">
                    <div className="absolute -left-[45px] md:-left-[81px] top-0 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full border-4 border-ivory shadow-lg flex items-center justify-center z-10 group-hover:bg-gold-500 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-emerald-950 group-hover:bg-white transition-colors"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gold-600 font-black text-[10px] md:text-[11px] uppercase tracking-widest">
                        <span>Hari {step.day}</span>
                        <div className="w-4 h-px bg-gold-600/30"></div>
                        <span>Operasional</span>
                      </div>
                      <h4 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tight leading-none">{step.activity}</h4>
                      <p className="text-sm md:text-base text-emerald-950/50 font-medium max-w-xl leading-relaxed">
                        Kurasi aktivitas harian yang dirancang untuk menjaga keseimbangan antara ibadah/eksplorasi dan waktu istirahat yang berkualitas.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Sidebar - Optimized Price */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="bg-emerald-950 text-white p-8 sm:p-10 md:p-14 rounded-[45px] md:rounded-[60px] shadow-5xl border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 islamic-pattern scale-150 pointer-events-none"></div>
                
                <div className="relative z-10 space-y-10">
                  <div className="space-y-3">
                    <p className="text-gold-400 text-[10px] font-black uppercase tracking-[0.4em]">Investment for Journey</p>
                    <div className="min-w-0">
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter break-all leading-tight">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 pt-3 text-white/40">
                       <Star size={16} fill="#fbbf24" className="text-gold-400" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Atelier Luxury Tier</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                     <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 border-b border-white/5 pb-4">Inclusive Signature Amenities</p>
                     <ul className="space-y-5">
                       {item.facilities.map((fac, idx) => (
                         <li key={idx} className="flex items-start space-x-4 text-sm font-bold text-white/90 leading-tight">
                           <div className="mt-1 w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                             <Check size={12} className="text-gold-400" strokeWidth={4} />
                           </div>
                           <span>{fac}</span>
                         </li>
                       ))}
                     </ul>
                  </div>

                  <div className="pt-6 space-y-6">
                    <button 
                      onClick={() => onBook(item.id)}
                      className="w-full bg-gold-500 text-white py-6 md:py-8 rounded-[30px] font-black text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-emerald-950 transition-all shadow-4xl active:scale-95 group flex items-center justify-center space-x-4"
                    >
                      <span>Mulai Reservasi</span>
                      <Sparkles size={16} className="animate-pulse" />
                    </button>
                    
                    <div className="flex items-start space-x-4 text-white/30">
                       <ShieldCheck size={20} className="shrink-0 text-gold-400/40" />
                       <p className="text-[9px] font-bold leading-relaxed uppercase tracking-widest">End-to-End Encryption Secured Booking.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-white p-8 rounded-[40px] border border-emerald-950/5 shadow-xl flex items-center justify-between group cursor-pointer hover:bg-emerald-950 transition-all duration-500">
                <div className="space-y-1">
                  <p className="text-emerald-950/30 group-hover:text-gold-500/50 text-[9px] font-black uppercase tracking-widest transition-colors">Butuh Bantuan?</p>
                  <p className="text-emerald-950 group-hover:text-white font-black text-sm transition-colors">WhatsApp Konsultan</p>
                </div>
                <div className="w-12 h-12 bg-emerald-950/5 group-hover:bg-white/10 rounded-2xl flex items-center justify-center text-emerald-950 group-hover:text-gold-500 transition-all">
                  <ArrowLeft size={20} className="rotate-180" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
