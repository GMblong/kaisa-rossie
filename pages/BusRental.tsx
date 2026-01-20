
import React from 'react';
import { PACKAGES } from '../constants';
import { PackageCard } from '../components/PackageCard';
import { ShieldCheck, Zap, Bus, Sparkles, Trophy, CheckCircle2, MapPin, Clock } from 'lucide-react';

interface BusRentalProps {
  onSelectPackage: (id: string) => void;
}

export const BusRental: React.FC<BusRentalProps> = ({ onSelectPackage }) => {
  const busPackages = PACKAGES.filter(p => p.category === 'BUS');

  return (
    <div className="bg-ivory min-h-screen">
      {/* 01. FLEET HERO - Responsive Typography & Spacing */}
      <section className="relative min-h-screen flex flex-col justify-center py-40 overflow-hidden bg-emerald-950 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=100&w=2400" 
            className="w-full h-full object-cover opacity-20 scale-110"
            alt="Luxury Fleet"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-transparent to-emerald-950"></div>
          <div className="absolute inset-0 opacity-[0.05] islamic-pattern scale-[1.8] pointer-events-none"></div>
        </div>

        <div className="container-luxe relative z-10 text-center space-y-10 md:space-y-12">
           <div className="inline-flex items-center space-x-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md reveal-up mx-auto">
              <Bus size={16} className="text-gold-500" />
              <div className="w-6 h-px bg-white/20"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">First Class Ground</span>
           </div>
           
           <div className="space-y-4 md:space-y-6 reveal-up">
             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] md:leading-[0.8]">
               Luxury <br />
               <span className="text-gold-500 italic font-serif font-light">Fleet.</span>
             </h1>
           </div>

           <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-2xl font-medium leading-relaxed reveal-up pt-4 md:pt-8">
             Armada eksklusif Mercedes-Benz dan Scania dengan konfigurasi VIP untuk kenyamanan perjalanan grup Anda.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 reveal-up pt-8 md:pt-12">
              <div className="flex items-center space-x-3 text-white/40">
                <Clock size={16} className="text-gold-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">24/7 Availability</span>
              </div>
              <div className="flex items-center space-x-3 text-white/40">
                <MapPin size={16} className="text-gold-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Across Indonesia</span>
              </div>
           </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ivory to-transparent z-10"></div>
      </section>

      {/* 02. FLEET LISTING */}
      <section className="py-32 md:py-52 container-luxe relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-32 gap-10 reveal-up">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-gold-600">
               <div className="w-10 h-px bg-gold-600"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.6em]">Executive Charters</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-emerald-950 tracking-tighter leading-none">
              The Collection
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-24 md:gap-y-32">
          {busPackages.map((pkg, i) => (
            <div key={pkg.id} className="reveal-up" style={{ transitionDelay: `${i * 100}ms` }}>
              <PackageCard item={pkg} onClick={onSelectPackage} />
            </div>
          ))}
        </div>
      </section>

      {/* 03. SERVICE STANDARDS */}
      <section className="bg-white py-40 md:py-60 border-t border-emerald-950/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] islamic-pattern scale-[3] pointer-events-none"></div>
        <div className="container-luxe relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-32">
            {[
              { 
                icon: ShieldCheck, 
                title: "Safety Protocol", 
                desc: "Setiap armada melalui pengecekan teknis berkala dan pembersihan menyeluruh sebelum keberangkatan.",
                features: ["Daily Technical Check", "Deep Sanitation", "Insurance Cover"]
              },
              { 
                icon: Zap, 
                title: "Professional Chauffeur", 
                desc: "Pengemudi bersertifikat dengan standar pelayanan VVIP dan pengetahuan rute yang mendalam.",
                features: ["Certified Experts", "VVIP Manners", "Bilingual Basic"]
              },
              { 
                icon: Sparkles, 
                title: "On-Board Luxury", 
                desc: "Fasilitas leg rest, coffee maker, dan premium audio system untuk kenyamanan tanpa batas.",
                features: ["Premium Seats", "Entertainment Hub", "Refreshment Bar"]
              }
            ].map((std, i) => (
              <div key={i} className="space-y-8 md:space-y-12 reveal-up group">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-950 text-gold-400 rounded-[30px] md:rounded-[35px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                  <std.icon size={30} md:size={36} strokeWidth={1.5} />
                </div>
                
                <div className="space-y-6 md:space-y-8">
                  <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter">{std.title}</h3>
                  <p className="text-emerald-950/50 font-medium leading-relaxed text-base md:text-lg">
                    {std.desc}
                  </p>
                  <ul className="space-y-4 pt-4 md:pt-6">
                    {std.features.map((f, idx) => (
                      <li key={idx} className="flex items-center space-x-4">
                        <CheckCircle2 className="text-gold-500 shrink-0" size={16} />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-950/60">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. CORPORATE PARTNERSHIP CTA */}
      <section className="py-40 md:py-60 bg-ivory text-center px-6 relative z-10">
         <div className="container-luxe space-y-16 reveal-up">
            <Trophy size={48} className="text-gold-500 mx-auto" />
            <div className="space-y-8">
               <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-emerald-950 tracking-tighter leading-[0.9]">
                  Corporate <br />
                  <span className="text-gold-600 italic font-serif font-light">Solutions.</span>
               </h2>
               <p className="max-w-2xl mx-auto text-emerald-950/40 text-lg md:text-xl font-medium leading-relaxed">
                  Membutuhkan armada reguler untuk kebutuhan staf atau delegasi bisnis? Konsultasikan kontrak korporat Anda dengan kami.
               </p>
            </div>
            <button className="bg-emerald-950 text-white px-16 py-8 rounded-full font-black text-[11px] md:text-[12px] uppercase tracking-[0.5em] hover:bg-gold-500 transition-all shadow-4xl hover:-translate-y-2 duration-700">
               Book Exclusive Fleet
            </button>
         </div>
      </section>
    </div>
  );
};
