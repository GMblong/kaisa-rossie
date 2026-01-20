
import React from 'react';
import { PACKAGES } from '../constants';
import { PackageCard } from '../components/PackageCard';
import { Compass, Globe2, Map, Sparkles, History, UtensilsCrossed, Camera } from 'lucide-react';

interface ToursProps {
  onSelectPackage: (id: string) => void;
}

export const Tours: React.FC<ToursProps> = ({ onSelectPackage }) => {
  const tourPackages = PACKAGES.filter(p => p.category === 'TOUR');

  return (
    <div className="bg-ivory min-h-screen">
      {/* 01. EXPLORER HERO - Normalized Spacing & Typography */}
      <section className="relative min-h-screen flex flex-col justify-center py-40 overflow-hidden bg-emerald-950 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=100&w=2400" 
            className="w-full h-full object-cover opacity-30 scale-105"
            alt="Global Heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-transparent to-emerald-950"></div>
          <div className="absolute inset-0 opacity-[0.05] islamic-pattern scale-[1.8] pointer-events-none"></div>
        </div>

        <div className="container-luxe relative z-10 text-center space-y-10 md:space-y-12">
           <div className="inline-flex items-center space-x-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md reveal-up mx-auto">
              <Globe2 size={16} className="text-gold-500" />
              <div className="w-6 h-px bg-white/20"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">World Heritage</span>
           </div>
           
           <div className="space-y-4 md:space-y-6 reveal-up">
             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] md:leading-[0.8]">
               Global <br />
               <span className="text-gold-500 italic font-serif font-light">Heritage.</span>
             </h1>
           </div>

           <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-2xl font-medium leading-relaxed reveal-up pt-4 md:pt-8">
             Menjelajahi peradaban dunia dengan kurasi perjalanan yang mengedepankan nilai sejarah dan kenyamanan premium.
           </p>

           <div className="flex justify-center reveal-up pt-8 md:pt-12">
              <div className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-4">
                 <Camera size={20} className="text-gold-500" />
                 <span className="text-white text-[10px] font-black uppercase tracking-widest">Documented Memories</span>
              </div>
           </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ivory to-transparent z-10"></div>
      </section>

      {/* 02. CURATED TOURS LISTING */}
      <section className="py-32 md:py-52 container-luxe relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-32 gap-10 reveal-up">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-gold-600">
               <div className="w-10 h-px bg-gold-600"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.6em]">The Explorer Series</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-emerald-950 tracking-tighter leading-none">
              Muslim Odysseys
            </h2>
          </div>
          <p className="max-w-xs text-emerald-950/40 text-sm font-bold uppercase tracking-widest border-l border-emerald-950/10 pl-8 hidden md:block">
            Curated historical routes with halal-certified standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-24 md:gap-y-32">
          {tourPackages.map((pkg, i) => (
            <div key={pkg.id} className="reveal-up" style={{ transitionDelay: `${i * 100}ms` }}>
              <PackageCard item={pkg} onClick={onSelectPackage} />
            </div>
          ))}
        </div>
      </section>

      {/* 03. TRAVEL WITH PURPOSE */}
      <section className="bg-emerald-950 py-40 md:py-60 lg:py-80 text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-[0.05] islamic-pattern scale-[3] pointer-events-none"></div>
        <div className="container-luxe relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="space-y-12 md:space-y-16 reveal-up">
            <div className="space-y-4 md:space-y-6">
              <p className="text-gold-500 font-black uppercase tracking-[0.7em] text-[10px] md:text-[11px]">The Philosophy</p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                Travel with <br /><span className="text-gold-500 italic font-serif font-light">Purpose.</span>
              </h2>
            </div>
            
            <div className="space-y-10">
              {[
                { icon: UtensilsCrossed, title: "Halal Culinary Focus", desc: "Setiap destinasi dikurasi untuk memastikan ketersediaan hidangan halal berkualitas tinggi." },
                { icon: History, title: "Expert Historians", desc: "Pendampingan oleh ahli sejarah untuk mendalami jejak peradaban Islam di setiap benua." }
              ].map((p, i) => (
                <div key={i} className="flex space-x-8 group">
                  <div className="shrink-0 w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                    <p.icon size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-black tracking-tight">{p.title}</h4>
                    <p className="text-white/40 leading-relaxed font-medium text-base md:text-lg">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative aspect-square rounded-[50px] md:rounded-[80px] overflow-hidden reveal-up hidden lg:block shadow-5xl border-[15px] border-white/5">
            <img src="https://images.unsplash.com/photo-1543783232-af9942f4a472?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Spain Heritage" />
            <div className="absolute inset-0 bg-emerald-950/20"></div>
          </div>
        </div>
      </section>

      {/* 04. FOOTER CTA */}
      <section className="py-40 md:py-60 bg-ivory text-center px-6 relative z-10">
         <div className="container-luxe space-y-12 md:space-y-16 reveal-up">
            <Sparkles size={48} className="text-gold-500 mx-auto opacity-40" />
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-emerald-950 tracking-tighter leading-[0.9]">
               Curate Your <br />
               <span className="text-gold-600 italic font-serif font-light">Next Adventure.</span>
            </h2>
            <button className="bg-emerald-950 text-white px-16 py-8 rounded-full font-black text-[11px] md:text-[12px] uppercase tracking-[0.5em] hover:bg-gold-500 transition-all shadow-4xl hover:-translate-y-2 duration-700">
               Hubungi Konsultan Kami
            </button>
         </div>
      </section>
    </div>
  );
};
