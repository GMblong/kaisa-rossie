
import React from 'react';
import { ArrowRight, Star, Map, Landmark, Bus, Sparkles, Globe, Award } from 'lucide-react';

interface HomeProps {
  onNavigate: (p: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const gateways = [
    { id: 'umrah', title: 'Sacred Umrah', desc: 'Perjalanan suci dengan kenyamanan mutlak.', icon: Landmark, img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200' },
    { id: 'haji', title: 'Royal Hajj', desc: 'Layanan Furoda eksklusif tanpa antrean tahunan.', icon: Star, img: 'https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=1200' },
    { id: 'tours', title: 'Global Tours', desc: 'Penjelajahan warisan dunia & destinasi eksotis.', icon: Map, img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=1200' },
    { id: 'bus', title: 'Bus Rental', desc: 'Mobilitas premium untuk korporat & grup.', icon: Bus, img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200' },
  ];

  return (
    <div className="w-full bg-ivory">
      {/* 01. HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-emerald-950 py-20 px-4 md:py-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=100&w=2400" 
            className="w-full h-full object-cover opacity-20 scale-105 animate-pulse-slow"
            alt="Global Travel"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-transparent to-emerald-950"></div>
          <div className="absolute inset-0 opacity-[0.05] islamic-pattern scale-[1.5]"></div>
        </div>

        <div className="container-luxe relative z-10 w-full">
          <div className="max-w-5xl space-y-6 md:space-y-16">
            <div className="flex items-center space-x-3 md:space-x-6 reveal-up">
              <span className="w-8 md:w-12 h-[1px] bg-gold-500"></span>
              <span className="text-gold-500 font-black uppercase tracking-[0.4em] md:tracking-[0.7em] text-[8px] md:text-[10px]">Boutique Travel Atelier</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black text-white leading-[0.9] tracking-tighter reveal-up">
              Journeys <br />
              <span className="text-gold-500 italic font-serif font-light">Refined.</span>
            </h1>

            <p className="text-white/60 text-base md:text-2xl font-medium max-w-2xl reveal-up leading-relaxed">
              Mulai dari perjalanan spiritual hingga eksplorasi warisan dunia. Kaisa Rossie mengkurasi setiap detail untuk menghadirkan kenyamanan mutlak dalam setiap langkah Anda.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-12 reveal-up pt-4 md:pt-12">
               <button 
                onClick={() => onNavigate('tours')}
                className="w-full sm:w-auto bg-gold-500 px-10 md:px-14 py-5 md:py-7 rounded-full text-white text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] hover:bg-white hover:text-emerald-950 transition-all duration-700 shadow-3xl transform hover:-translate-y-2"
              >
                Eksplorasi Destinasi
              </button>
              
              <div className="flex items-center space-x-4 md:space-x-6 bg-white/5 border border-white/10 px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-3xl backdrop-blur-md">
                <Globe size={18} className="text-gold-500" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest">Global Experience</span>
                  <span className="text-white/30 text-[7px] md:text-[8px] font-bold uppercase tracking-widest">Licensed Operator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. MANIFESTO */}
      <section className="py-24 md:py-60 bg-ivory relative overflow-hidden">
        <div className="container-luxe grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="relative reveal-up order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-[40px] md:rounded-[80px] overflow-hidden shadow-3xl">
              <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Luxury Travel" />
            </div>
            <div className="absolute -bottom-6 -right-4 md:-bottom-16 md:-right-16 w-40 md:w-64 h-40 md:h-64 bg-emerald-950 rounded-[30px] md:rounded-[60px] p-6 md:p-12 flex flex-col justify-center text-gold-400 shadow-4xl border border-white/10">
               <Sparkles size={24} className="mb-3 md:mb-6" />
               <p className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed text-center">
                 "Bukan sekadar berpindah tempat, tapi merajut narasi baru."
               </p>
            </div>
          </div>
          
          <div className="space-y-10 md:space-y-16 reveal-up order-1 lg:order-2">
            <div className="space-y-4 md:space-y-6">
              <p className="text-gold-600 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[11px]">Filosofi Perjalanan</p>
              <h2 className="text-4xl md:text-8xl font-black text-emerald-950 tracking-tighter leading-[0.95] md:leading-[0.9]">
                Tailored <br /> <span className="text-gold-600 italic font-serif font-light">Adventures.</span>
              </h2>
            </div>
            
            <p className="text-emerald-950/60 text-base md:text-xl font-medium leading-relaxed">
              Sebagai boutique travel atelier, kami melampaui batasan paket standar. Kami merancang perjalanan yang personal, baik untuk ibadah maupun liburan keluarga, dengan standar VVIP yang konsisten.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-950 rounded-xl md:rounded-2xl flex items-center justify-center text-gold-400">
                  <Award size={20} />
                </div>
                <h4 className="text-lg md:text-xl font-black text-emerald-950">Luxury Curation</h4>
                <p className="text-sm font-medium text-emerald-950/40">Hotel terpilih dan pengalaman gastronomi yang dikurasi khusus.</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-950 rounded-xl md:rounded-2xl flex items-center justify-center text-gold-400">
                  <Bus size={20} />
                </div>
                <h4 className="text-lg md:text-xl font-black text-emerald-950">Seamless Mobility</h4>
                <p className="text-sm font-medium text-emerald-950/40">Armada darat premium untuk mobilitas grup yang efisien.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. SERVICE GRID */}
      <section className="py-24 md:py-60 bg-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] islamic-pattern scale-[2.5]"></div>
        <div className="container-luxe relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-40 gap-8 md:gap-12 reveal-up">
             <div className="space-y-4 md:space-y-6">
                <p className="text-gold-400 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[11px]">The Collection</p>
                <h2 className="text-4xl md:text-9xl font-black text-white tracking-tighter leading-none">Global <br /><span className="text-gold-500 italic font-serif font-light">Portals.</span></h2>
             </div>
             <p className="max-w-md text-white/40 font-medium text-sm md:text-lg pb-4 border-b border-white/10">
               Empat pilar layanan kami dirancang untuk melayani gaya hidup dinamis yang menghargai kualitas, keamanan, dan eksklusivitas.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {gateways.map((gate) => (
              <div 
                key={gate.id}
                onClick={() => onNavigate(gate.id)}
                className="group relative h-[450px] sm:h-[600px] md:h-[750px] overflow-hidden rounded-[40px] md:rounded-[60px] cursor-pointer shadow-4xl reveal-up border border-white/5"
              >
                <img 
                  src={gate.img} 
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                  alt={gate.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent"></div>
                
                <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-3xl rounded-xl md:rounded-3xl flex items-center justify-center text-white border border-white/10 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-700">
                        <gate.icon size={24} />
                      </div>
                      <span className="text-white/20 font-black text-4xl md:text-6xl tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-1000">0{gateways.indexOf(gate) + 1}</span>
                   </div>
                   <div className="space-y-4 md:space-y-8 transform group-hover:-translate-y-4 transition-transform duration-700">
                      <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{gate.title}</h3>
                      <p className="text-white/50 text-xs md:text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100">{gate.desc}</p>
                      <div className="pt-2 md:pt-6 flex items-center space-x-4 text-gold-400 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em]">
                         <span>Lihat Koleksi</span>
                         <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform duration-500" />
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
