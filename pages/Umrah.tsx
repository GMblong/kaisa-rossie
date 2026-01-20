
import React from 'react';
import { PACKAGES } from '../constants';
import { PackageCard } from '../components/PackageCard';
import { Landmark, FileText, ShieldCheck, Sparkles, CheckCircle2, Moon, Star, Compass } from 'lucide-react';

interface UmrahProps {
  onSelectPackage: (id: string) => void;
}

export const Umrah: React.FC<UmrahProps> = ({ onSelectPackage }) => {
  const umrahPackages = PACKAGES.filter(p => p.category === 'UMRAH');

  return (
    <div className="bg-ivory min-h-screen">
      {/* 01. MAGNIFICENT HERO - Adjusted centering and padding */}
      <section className="relative min-h-screen flex flex-col justify-center py-40 overflow-hidden bg-emerald-950 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=100&w=2400" 
            className="w-full h-full object-cover opacity-30 scale-110 animate-pulse-slow"
            alt="Mecca Sanctuary"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-transparent to-emerald-950"></div>
          <div className="absolute inset-0 opacity-[0.05] islamic-pattern scale-[2] pointer-events-none"></div>
        </div>

        <div className="container-luxe relative z-10 text-center space-y-10 md:space-y-12">
           <div className="inline-flex items-center space-x-5 bg-white/5 px-8 py-2.5 rounded-full border border-white/10 backdrop-blur-xl reveal-up mx-auto">
              <Moon size={14} className="text-gold-400" />
              <div className="w-6 h-px bg-white/20"></div>
              <span className="text-[9px] font-black text-white/90 uppercase tracking-[0.7em]">Sacred Sanctuary</span>
           </div>
           
           <div className="space-y-4 md:space-y-6 reveal-up">
             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] md:leading-[0.8]">
               Umrah <br />
               <span className="text-gold-500 italic font-serif font-light">Signature.</span>
             </h1>
           </div>

           <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-2xl font-medium leading-relaxed reveal-up pt-4 md:pt-8">
             Menyuguhkan ketenangan spiritual dalam balutan kemewahan akomodasi pelataran Masjidil Haram.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal-up pt-8 md:pt-12">
              <div className="flex items-center space-x-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl">
                <Compass size={20} className="text-gold-500" />
                <div className="text-left">
                  <p className="text-white font-black text-[9px] uppercase tracking-widest">Guaranteed Departure</p>
                  <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">Summer & Ramadan 1445H</p>
                </div>
              </div>
           </div>
        </div>
        
        {/* Floating Scroll Indicator - Adjusted Z and position */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 text-white/20 pointer-events-none hidden md:flex">
           <p className="text-[7px] font-black uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">Scroll Exploration</p>
           <div className="w-px h-16 bg-gradient-to-t from-gold-500/50 to-transparent"></div>
        </div>
      </section>

      {/* 02. CURATED COLLECTIONS */}
      <section className="py-32 md:py-52 container-luxe relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 md:mb-32 gap-12 reveal-up">
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            <div className="flex items-center space-x-6 text-gold-600">
               <div className="w-12 h-[2px] bg-gold-500"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.6em]">Department of Faith</p>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-emerald-950 tracking-tighter leading-[0.9]">
              The <span className="text-gold-600 italic font-serif font-light">Atelier</span> <br /> Collection.
            </h2>
            <p className="text-emerald-950/50 text-lg md:text-xl font-medium leading-relaxed">
              Setiap paket dirancang secara personal, memastikan setiap rukun ibadah terlaksana dengan sempurna tanpa gangguan logistik.
            </p>
          </div>
          
          <div className="bg-emerald-950 p-10 md:p-12 rounded-[40px] md:rounded-[50px] text-white flex flex-col justify-center items-center text-center space-y-4 shadow-4xl lg:rotate-3 self-start lg:self-auto">
             <Star size={24} className="text-gold-500 mb-1" />
             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Available Spots</p>
             <p className="text-4xl md:text-5xl font-black text-gold-400 tracking-tighter">Only 12</p>
             <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Ramadan Series Left</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-24 md:gap-y-32">
          {umrahPackages.map((pkg, i) => (
            <div key={pkg.id} className="reveal-up" style={{ transitionDelay: `${i * 100}ms` }}>
              <PackageCard item={pkg} onClick={onSelectPackage} />
            </div>
          ))}
        </div>
      </section>

      {/* 03. SERVICE PILLARS */}
      <section className="bg-white py-40 md:py-60 border-y border-emerald-950/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] islamic-pattern scale-[3] pointer-events-none"></div>
        <div className="container-luxe relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-32">
            {[
              { 
                idx: "01",
                icon: Landmark, 
                title: "Ritual Excellence", 
                desc: "Manasik intensif dengan bimbingan fiqih yang dalam untuk kemaslahatan ibadah Anda.",
                points: ["Senior Mutawwif", "Audio Receiver System", "Private Briefing"]
              },
              { 
                idx: "02",
                icon: FileText, 
                title: "Legal Sanctuary", 
                desc: "Administrasi transparan dengan jaminan validitas visa dan asuransi penuh.",
                points: ["Official E-Visa", "Saudi Medical Cover", "Digital Doc Vault"]
              },
              { 
                idx: "03",
                icon: ShieldCheck, 
                title: "Elite Concierge", 
                desc: "Layanan penanganan bagasi dan bantuan 24 jam di Tanah Suci untuk kenyamanan mutlak.",
                points: ["VVIP Airport Lounge", "Baggage Porterage", "24/7 Ground Team"]
              }
            ].map((pillar, index) => (
              <div key={index} className="space-y-8 md:space-y-12 reveal-up group">
                <div className="relative">
                  <span className="absolute -top-10 -left-6 text-[8rem] md:text-[10rem] font-black text-emerald-950/[0.03] select-none italic font-serif leading-none">{pillar.idx}</span>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-950 text-gold-400 rounded-[30px] md:rounded-[35px] flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700">
                    <pillar.icon size={30} md:size={36} strokeWidth={1.5} />
                  </div>
                </div>
                
                <div className="space-y-6 md:space-y-8">
                  <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter">{pillar.title}</h3>
                  <p className="text-emerald-950/50 font-medium leading-relaxed text-base md:text-lg">
                    {pillar.desc}
                  </p>
                  <ul className="space-y-4 pt-4 md:pt-6">
                    {pillar.points.map((p, i) => (
                      <li key={i} className="flex items-center space-x-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-950/60">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. CALL TO ACTION */}
      <section className="py-40 md:py-60 bg-ivory text-center px-6 relative z-10">
        <div className="container-luxe space-y-16 md:space-y-24 reveal-up">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <Sparkles size={48} className="text-gold-500 mx-auto opacity-40 animate-pulse" />
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-emerald-950 tracking-tighter leading-[0.9] md:leading-[0.8]">
              Wujudkan <br />
              <span className="text-gold-600 italic font-serif font-light">Niat Suci.</span>
            </h2>
            <p className="text-emerald-950/40 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              Konsultasikan rencana ibadah keluarga Anda dengan advisor berpengalaman kami hari ini.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
            <button className="w-full sm:w-auto bg-emerald-950 text-white px-12 md:px-16 py-6 md:py-8 rounded-full font-black text-[11px] md:text-[12px] uppercase tracking-[0.5em] hover:bg-gold-500 transition-all shadow-4xl hover:-translate-y-2 duration-700">
              Mulai Konsultasi
            </button>
            <button className="text-emerald-950 font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] border-b-2 border-gold-500/30 pb-2 hover:border-gold-500 transition-all">
              Brosur Digital
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
