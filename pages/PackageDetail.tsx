
import React from 'react';
import { Package } from '../types';
import { Calendar, Star, Plane, Hotel, Check, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="bg-ivory min-h-screen pb-32">
      {/* HEADER SECTION - EMERALD BG */}
      <section className="bg-emerald-950 pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden px-4">
        <div className="container-luxe relative z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-3 text-white/70 hover:text-gold-400 transition-all text-[10px] font-black uppercase tracking-widest mb-12"
          >
            <ArrowLeft size={16} />
            <span>Koleksi Utama</span>
          </button>

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-gold-400 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
               <Sparkles size={12} />
               <span className="text-[8px] font-black uppercase tracking-[0.3em]">{item.category} Signature Collection</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              {item.title}
            </h1>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-10 islamic-pattern scale-150 pointer-events-none"></div>
      </section>

      {/* CONTENT GRID - IVORY BG */}
      <div className="container-luxe -mt-12 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          <div className="lg:col-span-8 space-y-12">
            {/* Visuals */}
            <div className="aspect-video rounded-[30px] md:rounded-[60px] overflow-hidden shadow-2xl border-4 md:border-[12px] border-white bg-emerald-950">
              <img src={item.image} className="w-full h-full object-cover opacity-95" alt={item.title} />
            </div>

            <div className="space-y-6 px-2">
              <h3 className="text-2xl font-black text-emerald-950 uppercase tracking-widest flex items-center space-x-4">
                <span className="w-8 h-1 bg-gold-600"></span>
                <span>The Experience</span>
              </h3>
              <p className="text-lg md:text-xl text-emerald-950/80 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Calendar, label: "Duration", value: item.duration },
                { icon: Plane, label: "Airline", value: item.airline || 'Chartered' },
                { icon: Hotel, label: "Stay", value: `${item.hotel?.stars || 5} Star Elite` },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] border border-emerald-950/5 shadow-xl">
                  <stat.icon className="text-gold-600 mb-6" size={24} />
                  <p className="text-[8px] font-black text-emerald-950/50 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-base font-black text-emerald-950">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Itinerary */}
            <div className="space-y-12 pt-12 px-2">
              <h3 className="text-2xl font-black text-emerald-950 uppercase tracking-widest flex items-center space-x-4">
                <span className="w-8 h-1 bg-gold-600"></span>
                <span>The Journey</span>
              </h3>
              <div className="space-y-10">
                {item.itinerary.map((step) => (
                  <div key={step.day} className="flex space-x-6 md:space-x-10 group">
                    <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl border border-emerald-950/10 shadow-lg flex items-center justify-center font-black text-emerald-950 group-hover:bg-emerald-950 group-hover:text-gold-400 transition-all duration-500">
                      {step.day}
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xl font-black text-emerald-950 mb-2">Day {step.day}</h4>
                      <p className="text-base text-emerald-950/70 font-medium leading-relaxed">{step.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR BOOKING - EMERALD BG */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 bg-emerald-950 text-white p-10 md:p-12 rounded-[40px] md:rounded-[60px] shadow-2xl space-y-10 border border-white/5">
              <div className="space-y-2">
                <p className="text-gold-400 text-[10px] font-black uppercase tracking-[0.4em]">All-Inclusive Package</p>
                <p className="text-4xl md:text-5xl font-black tracking-tighter">{formatPrice(item.price)}</p>
                <div className="flex items-center space-x-2 pt-2 text-white/50">
                   <Star size={14} fill="#fbbf24" className="text-gold-400" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Kaisa Signature Standard</span>
                </div>
              </div>

              <div className="space-y-6">
                 <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 border-b border-white/5 pb-4">Exclusive Benefits</p>
                 <ul className="space-y-4">
                   {item.facilities.map((fac, idx) => (
                     <li key={idx} className="flex items-center space-x-4 text-sm font-bold text-white/80">
                       <Check size={16} className="text-gold-400 shrink-0" />
                       <span>{fac}</span>
                     </li>
                   ))}
                 </ul>
              </div>

              <button 
                onClick={() => onBook(item.id)}
                className="w-full bg-gold-500 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-emerald-950 transition-all shadow-xl active:scale-95"
              >
                Pesan Perjalanan
              </button>

              <div className="flex items-start space-x-4 opacity-50">
                 <ShieldCheck size={20} className="shrink-0 text-gold-400" />
                 <p className="text-[9px] font-bold leading-relaxed">Secured with end-to-end booking verification and 100% money back guarantee.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
