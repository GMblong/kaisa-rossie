
import React from 'react';
import { PACKAGES } from '../constants';
import { PackageCard } from '../components/PackageCard';
import { Star, ShieldCheck, UserCheck, Home, Sparkles, Trophy, Award, Crown, CheckCircle } from 'lucide-react';

interface HajiProps {
  onSelectPackage: (id: string) => void;
}

export const Haji: React.FC<HajiProps> = ({ onSelectPackage }) => {
  const hajiPackages = PACKAGES.filter(p => p.category === 'HAJJ');

  return (
    <div className="bg-ivory min-h-screen">
      {/* 01. ROYAL HERO - Fixed height/spacing clash */}
      <section className="relative min-h-screen flex flex-col justify-center py-40 overflow-hidden bg-emerald-950 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=100&w=2400" 
            className="w-full h-full object-cover opacity-20 scale-105"
            alt="Royal Hajj"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-950/40 to-emerald-950"></div>
          <div className="absolute inset-0 opacity-[0.05] islamic-pattern scale-[2.5] pointer-events-none"></div>
        </div>

        <div className="container-luxe relative z-10 text-center space-y-12 md:space-y-16">
           <div className="flex flex-col items-center space-y-6 md:space-y-8 reveal-up">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gold-500/10 border border-gold-500/20 rounded-[24px] md:rounded-[30px] flex items-center justify-center text-gold-400 backdrop-blur-md shadow-2xl">
                 <Crown size={28} md:size={32} />
              </div>
              <div className="inline-flex items-center space-x-6 text-white/40">
                <div className="w-10 md:w-12 h-px bg-white/10"></div>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.8em]">The Royal Ascent</p>
                <div className="w-10 md:w-12 h-px bg-white/10"></div>
              </div>
           </div>
           
           <div className="space-y-4 md:space-y-6 reveal-up">
             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] md:leading-[0.8]">
               Haji <br />
               <span className="text-gold-500 italic font-serif font-light">Furoda.</span>
             </h1>
           </div>

           <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-2xl font-medium leading-relaxed reveal-up pt-4 md:pt-8">
             Solusi keberangkatan tanpa antre dengan Visa Mujamalah resmi Kerajaan Saudi Arabia, menghadirkan kemudahan ibadah tertinggi.
           </p>

           <div className="flex justify-center reveal-up pt-8 md:pt-12">
              <div className="px-8 md:px-12 py-4 md:py-5 bg-gold-500 text-white rounded-xl md:rounded-2xl shadow-4xl transform hover:scale-105 transition-all cursor-default">
                 <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em]">Direct Departure 1445H Guaranteed</p>
              </div>
           </div>
        </div>
      </section>

      {/* 02. TRUST & TRANSPARENCY */}
      <section className="py-24 md:py-48 bg-white border-b border-emerald-950/5 relative z-10">
         <div className="container-luxe grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: ShieldCheck, label: "Official Visa", value: "Verified Mujamalah" },
              { icon: Award, label: "Maktab Tier", value: "Maktab 111-112 VIP" },
              { icon: UserCheck, label: "Scholars", value: "Senior Bimbingan" },
              { icon: Star, label: "Success Rate", value: "100% Visa Issued" }
            ].map((stat, i) => (
              <div key={i} className="space-y-3 md:space-y-4 reveal-up">
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-950/5 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-950 mx-auto mb-4 md:mb-6">
                    <stat.icon size={20} md:size={24} />
                 </div>
                 <p className="text-[8px] md:text-[9px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">{stat.label}</p>
                 <p className="text-lg md:text-xl font-black text-emerald-950 tracking-tight">{stat.value}</p>
              </div>
            ))}
         </div>
      </section>

      {/* 03. EXCLUSIVE LISTING */}
      <section className="py-32 md:py-60 lg:py-80 container-luxe relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-40 gap-10 md:gap-16 reveal-up">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-emerald-950 tracking-tighter leading-[0.9]">
              Elite <br /><span className="text-gold-600 italic font-serif font-light">Tiering.</span>
            </h2>
            <p className="text-emerald-950/40 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
              Setiap pilihan paket dirancang untuk memberikan fokus ibadah yang jernih dengan fasilitas pendukung kelas utama.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-24 md:gap-y-32">
          {hajiPackages.map((pkg, i) => (
            <div key={pkg.id} className="reveal-up" style={{ transitionDelay: `${i * 150}ms` }}>
              <PackageCard item={pkg} onClick={onSelectPackage} />
            </div>
          ))}
        </div>
      </section>

      {/* 04. MASYAIR EXPERIENCE - Corrected overlay and z-index */}
      <section className="bg-emerald-950 py-40 md:py-60 lg:py-80 text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-[0.05] islamic-pattern scale-[3] pointer-events-none"></div>
        <div className="container-luxe relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="space-y-12 md:space-y-16 reveal-up">
            <div className="space-y-4 md:space-y-6">
              <p className="text-gold-500 font-black uppercase tracking-[0.7em] text-[10px] md:text-[11px]">VVIP Sanctuary</p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                Masyair <br /><span className="text-gold-500 italic font-serif font-light">Comfort.</span>
              </h2>
            </div>
            
            <p className="text-white/40 text-xl md:text-2xl font-medium leading-relaxed">
              Tenda Arafah dan Mina adalah jantung ibadah Haji. Kami menyediakan fasilitas Maktab VIP dengan katering gourmet dan sanitasi premium yang terjaga.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {[
                "Apartemen Transit Dekat Jamarat",
                "Tenda Ber-AC (Full Cooler)",
                "Full-Board Indonesian Catering",
                "Dokter Pendamping 24 Jam"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 p-5 md:p-6 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl group hover:bg-white/10 transition-all">
                   <CheckCircle className="text-gold-500 shrink-0" size={16} md:size={18} />
                   <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square rounded-[50px] md:rounded-[80px] overflow-hidden reveal-up shadow-5xl hidden lg:block border-[12px] md:border-[20px] border-white/5">
             <img src="https://images.unsplash.com/photo-1565153205370-98446c641f9d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Mecca Tent" />
             <div className="absolute inset-0 bg-emerald-950/20"></div>
          </div>
        </div>
      </section>

      {/* 05. CALL TO ACTION */}
      <section className="py-40 md:py-60 lg:py-80 bg-ivory text-center px-6 relative z-10">
        <div className="container-luxe space-y-16 md:space-y-24 reveal-up">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <Trophy size={48} md:size={60} className="text-gold-500 mx-auto animate-bounce-slow" />
            <h2 className="text-5xl md:text-7xl lg:text-[9.5rem] font-black text-emerald-950 tracking-tighter leading-[0.9] md:leading-[0.8]">
              Amankan <br />
              <span className="text-gold-600 italic font-serif font-light">Panggilan-Nya.</span>
            </h2>
            <p className="text-emerald-950/40 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              Kuota Haji Furoda diatur secara ketat oleh Kerajaan Saudi Arabia. Segera validasi rencana keberangkatan Anda hari ini.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
            <button className="w-full sm:w-auto bg-emerald-950 text-white px-12 md:px-20 py-6 md:py-8 rounded-full font-black text-[12px] md:text-[13px] uppercase tracking-[0.6em] hover:bg-gold-500 transition-all shadow-[0_40px_80px_rgba(2,44,34,0.2)] hover:-translate-y-2 duration-700">
              Konsultasi Furoda
            </button>
            <button className="w-full sm:w-auto text-emerald-950 font-black text-[11px] md:text-[12px] uppercase tracking-[0.4em] border-2 border-emerald-950/5 px-12 md:px-16 py-6 md:py-8 rounded-full hover:bg-emerald-950 hover:text-white transition-all">
              Detail Fasilitas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
