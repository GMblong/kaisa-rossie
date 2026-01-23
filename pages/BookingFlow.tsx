
import React, { useState } from 'react';
import { Package, Participant } from '../types';
import { 
  Check, User, FileText, CreditCard, ArrowLeft, ShieldCheck, 
  Upload, Smartphone, Sparkles, Plus, Minus, UserPlus, 
  Users, Mail, Link as LinkIcon, Search, Loader2, X
} from 'lucide-react';

interface BookingFlowProps {
  pkg: Package;
  onComplete: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ pkg, onComplete }) => {
  const [step, setStep] = useState(1);
  const [paxCount, setPaxCount] = useState(1);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'p1', name: 'Abdullah Ahmad', type: 'DEWASA', isAccountHolder: true, syncStatus: 'LINKED' }
  ]);
  
  const [searchingEmail, setSearchingEmail] = useState<{idx: number, email: string} | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handlePaxChange = (num: number) => {
    const newCount = Math.max(1, num);
    setPaxCount(newCount);
    
    const newParticipants = [...participants];
    if (newCount > participants.length) {
      for (let i = participants.length; i < newCount; i++) {
        newParticipants.push({ 
          id: `p${Date.now()}-${i}`, 
          name: '', 
          type: 'DEWASA', 
          isAccountHolder: false, 
          syncStatus: 'UNLINKED' 
        });
      }
    } else {
      newParticipants.splice(newCount);
    }
    setParticipants(newParticipants);
  };

  const updateParticipant = (idx: number, field: keyof Participant, value: any) => {
    const updated = [...participants];
    updated[idx] = { ...updated[idx], [field]: value };
    setParticipants(updated);
  };

  const simulateAccountSync = (idx: number) => {
    setIsSearching(true);
    setTimeout(() => {
      const updated = [...participants];
      if (searchingEmail?.email.includes('keluarga')) {
        updated[idx] = { 
          ...updated[idx], 
          name: 'Anggota Terhubung (Linked)', 
          linkedEmail: searchingEmail.email, 
          syncStatus: 'LINKED' 
        };
      } else {
        updated[idx] = { ...updated[idx], syncStatus: 'PENDING' };
      }
      setParticipants(updated);
      setIsSearching(false);
      setSearchingEmail(null);
    }, 1500);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, title: 'Travelers', icon: <Users size={16} /> },
    { id: 2, title: 'Manifest', icon: <UserPlus size={16} /> },
    { id: 3, title: 'Docs', icon: <FileText size={16} /> },
    { id: 4, title: 'Pay', icon: <CreditCard size={16} /> },
    { id: 5, title: 'Done', icon: <Check size={16} /> }
  ];

  const totalPrice = pkg.price * paxCount;

  return (
    <div className="bg-ivory min-h-screen">
      {/* LUXURY HEADER */}
      <section className="bg-emerald-950 pt-32 pb-24 md:pt-48 md:pb-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 islamic-pattern scale-150"></div>
        <div className="container-luxe relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            <div className="inline-flex items-center space-x-4 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <ShieldCheck size={16} className="text-gold-400" />
              <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.4em]">Family Group Reservation</span>
            </div>
            <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
              Group <br /> <span className="text-gold-500 italic font-serif font-light">Atelier.</span>
            </h1>
          </div>
          
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-6 md:p-8 rounded-[30px] md:rounded-[40px] w-full md:w-96 shadow-2xl">
            <div className="flex items-center space-x-4 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden bg-emerald-900/50 border border-white/10">
                <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.title} />
              </div>
              <div className="flex-1">
                <p className="text-[8px] md:text-[9px] font-black text-gold-400 uppercase tracking-widest">{pkg.category}</p>
                <h4 className="text-xs md:text-sm font-black text-white leading-tight">{pkg.title}</h4>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between items-center text-white/40">
                <p className="text-[9px] font-black uppercase tracking-widest">Base Price</p>
                <p className="text-xs font-bold">Rp {pkg.price.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex justify-between items-center text-white">
                <p className="text-[9px] font-black uppercase tracking-widest text-gold-400">Total for {paxCount} Penumpang</p>
                <p className="text-xl font-black">Rp {totalPrice.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-luxe -mt-10 md:-mt-20 pb-32 relative z-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* STEP INDICATOR */}
          <div className="bg-white p-6 md:p-10 rounded-[35px] md:rounded-[50px] shadow-3xl mb-8 border border-emerald-950/5 flex justify-between items-center relative">
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-950/5 -translate-y-1/2"></div>
             {steps.map((s) => (
               <div key={s.id} className="relative z-10 flex flex-col items-center space-y-3">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-700 border-2 ${
                    step >= s.id ? 'bg-emerald-950 border-gold-500 text-gold-400 scale-110 shadow-xl' : 'bg-ivory border-emerald-950/5 text-emerald-950/20'
                  }`}>
                    {step > s.id ? <Check size={20} /> : s.icon}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest hidden sm:block ${step >= s.id ? 'text-emerald-950' : 'text-emerald-950/20'}`}>
                    {s.title}
                  </span>
               </div>
             ))}
          </div>

          <div className="bg-white rounded-[40px] md:rounded-[60px] border border-emerald-950/5 p-8 md:p-16 shadow-4xl min-h-[550px] flex flex-col relative overflow-hidden">
            
            {step === 1 && (
              <div className="space-y-12 animate-fade-in text-center py-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter">Berapa anggota grup yang ikut?</h2>
                  <p className="text-emerald-950/40 text-sm font-medium">Lengkapi manifest grup untuk memastikan akomodasi terbaik.</p>
                </div>
                <div className="flex items-center justify-center gap-10">
                  <button onClick={() => handlePaxChange(paxCount - 1)} className="w-20 h-20 bg-ivory rounded-[30px] flex items-center justify-center text-emerald-950 hover:bg-gold-500 hover:text-white transition-all shadow-md active:scale-90">
                    <Minus size={32} />
                  </button>
                  <span className="text-8xl md:text-9xl font-black text-emerald-950 tracking-tighter">{paxCount}</span>
                  <button onClick={() => handlePaxChange(paxCount + 1)} className="w-20 h-20 bg-ivory rounded-[30px] flex items-center justify-center text-emerald-950 hover:bg-gold-500 hover:text-white transition-all shadow-md active:scale-90">
                    <Plus size={32} />
                  </button>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-600">Traveler dalam Grup</p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase">Data Manifest Traveler</h2>
                  <p className="text-emerald-950/40 text-sm font-medium">Identifikasi anggota grup yang akan berangkat.</p>
                </div>
                <div className="space-y-8">
                  {participants.map((p, i) => (
                    <div key={p.id} className="p-8 bg-ivory rounded-[40px] border border-emerald-950/5 space-y-6 relative overflow-hidden group">
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${p.syncStatus === 'LINKED' ? 'bg-emerald-950 text-gold-500' : 'bg-white text-emerald-950'}`}>
                               {p.syncStatus === 'LINKED' ? <LinkIcon size={20}/> : (i + 1)}
                             </div>
                             <div>
                                <p className="text-sm font-black uppercase tracking-widest text-emerald-950">
                                  {p.isAccountHolder ? 'Pemilik Akun (Lead)' : `Anggota Grup ${i + 1}`}
                                </p>
                                {p.syncStatus === 'LINKED' && (
                                  <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1"><Check size={8}/> Akun Sinkron</span>
                                )}
                             </div>
                          </div>
                          <div className="flex gap-2 self-start sm:self-auto">
                             {['DEWASA', 'ANAK'].map(type => (
                               <button 
                                 key={type}
                                 onClick={() => updateParticipant(i, 'type', type)}
                                 className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                                   p.type === type ? 'bg-emerald-950 text-white' : 'bg-white text-emerald-950/20'
                                 }`}
                               >
                                 {type}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                          <div className="md:col-span-7 space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-emerald-950/40 ml-2">Nama Lengkap Traveler (Sesuai ID)</label>
                             <input 
                               type="text" 
                               disabled={p.syncStatus === 'LINKED'}
                               value={p.name}
                               onChange={(e) => updateParticipant(i, 'name', e.target.value)}
                               className={`w-full bg-white p-5 rounded-2xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 transition-opacity ${p.syncStatus === 'LINKED' ? 'opacity-50' : 'opacity-100'}`} 
                               placeholder="Contoh: Siti Rahma"
                             />
                          </div>
                          
                          <div className="md:col-span-5 space-y-2">
                             {!p.isAccountHolder && p.syncStatus === 'UNLINKED' && (
                               <button 
                                onClick={() => setSearchingEmail({idx: i, email: ''})}
                                className="w-full p-5 bg-white border border-emerald-950/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-emerald-950/40 hover:text-gold-600 hover:border-gold-500 transition-all flex items-center justify-center gap-3 shadow-sm"
                               >
                                 <LinkIcon size={14}/> Hubungkan Akun Anggota
                               </button>
                             )}
                             
                             {searchingEmail?.idx === i && (
                               <div className="flex gap-2 animate-fade-in">
                                  <input 
                                    type="email" 
                                    autoFocus
                                    placeholder="Email Anggota..."
                                    className="flex-1 bg-white p-5 rounded-2xl border border-gold-500 font-bold outline-none text-xs"
                                    onChange={(e) => setSearchingEmail({...searchingEmail, email: e.target.value})}
                                  />
                                  <button 
                                    onClick={() => simulateAccountSync(i)}
                                    className="p-5 bg-emerald-950 text-white rounded-2xl hover:bg-gold-500 transition-all shadow-md"
                                  >
                                    {isSearching ? <Loader2 size={16} className="animate-spin"/> : <Search size={16}/>}
                                  </button>
                               </div>
                             )}

                             {p.syncStatus === 'LINKED' && !p.isAccountHolder && (
                               <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between shadow-sm">
                                  <p className="text-[10px] font-bold text-emerald-800">{p.linkedEmail}</p>
                                  <button onClick={() => updateParticipant(i, 'syncStatus', 'UNLINKED')} className="text-red-400 hover:text-red-600 transition-colors"><X size={14}/></button>
                                </div>
                             )}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase">Brankas Berkas</h2>
                  <p className="text-emerald-950/40 text-sm font-medium">Unggah identitas untuk tiap anggota grup.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   {participants.map((p, i) => (
                     <div key={p.id} className="p-10 bg-ivory rounded-[50px] border border-emerald-950/5 flex flex-col items-center justify-center text-center space-y-6 group hover:border-gold-500 transition-all cursor-pointer relative overflow-hidden shadow-sm">
                        <div className={`w-16 h-16 rounded-[28px] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${p.syncStatus === 'LINKED' ? 'bg-gold-500 text-white' : 'bg-emerald-950 text-gold-400'}`}>
                           {p.syncStatus === 'LINKED' ? <Smartphone size={28} /> : <Upload size={28} />}
                        </div>
                        <div>
                           <p className="text-lg font-black text-emerald-950 uppercase">{p.name || `Traveler ${i+1}`}</p>
                           <p className="text-[9px] font-bold text-emerald-950/30 uppercase mt-2">
                             {p.syncStatus === 'LINKED' ? 'Akses Mandiri Tersedia' : 'Unggah Paspor / KTP Sekarang'}
                           </p>
                        </div>
                        {p.syncStatus === 'LINKED' && <div className="absolute top-4 right-4"><LinkIcon size={14} className="text-emerald-950/10"/></div>}
                     </div>
                   ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-3 text-center">
                  <h2 className="text-3xl md:text-6xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Total Settlement</h2>
                  <p className="text-emerald-950/40 text-sm font-medium uppercase tracking-[0.3em]">Satu gerbang pembayaran untuk seluruh grup</p>
                </div>
                
                <div className="p-12 bg-emerald-950 rounded-[60px] text-white space-y-10 shadow-6xl relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                      <div className="space-y-2">
                         <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Tagihan Konsolidasi</p>
                         <p className="text-5xl md:text-7xl font-black text-gold-400 tracking-tighter leading-none">Rp {totalPrice.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Metode</p>
                         <p className="text-sm font-bold uppercase tracking-widest">Kaisa Pay-Family</p>
                      </div>
                   </div>
                   <div className="relative z-10 pt-10 border-t border-white/10 flex justify-between items-center text-white/60">
                      <div className="flex gap-10">
                        <div>
                          <p className="text-[8px] font-black uppercase">Total Penumpang</p>
                          <p className="text-xl font-black text-white">{paxCount} Anggota</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase">Tipe Koleksi</p>
                          <p className="text-xl font-black text-white uppercase">{pkg.category}</p>
                        </div>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.05] islamic-pattern scale-150 rotate-45 pointer-events-none group-hover:rotate-[60deg] transition-transform duration-[20s]"></div>
                </div>

                <div className="p-10 bg-ivory rounded-[45px] border border-emerald-950/5 flex items-center gap-8 shadow-sm">
                   <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-emerald-950 shadow-md shrink-0"><Mail size={24}/></div>
                   <p className="text-[11px] font-bold text-emerald-950/50 uppercase leading-relaxed">
                      Dokumen pelunasan akan dikirimkan ke email <span className="text-emerald-950 font-black">Lead Passenger dan anggota yang akunnya terhubung.</span>
                   </p>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col items-center justify-center space-y-16 py-16 text-center animate-scale-in">
                <div className="relative">
                   <div className="w-28 h-28 bg-emerald-950 text-gold-400 rounded-[45px] flex items-center justify-center shadow-7xl rotate-12 relative z-10">
                     <Check size={54} strokeWidth={3} />
                   </div>
                   <div className="absolute -top-6 -right-6 w-14 h-14 bg-gold-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse z-20">
                     <Sparkles size={28} className="text-white"/>
                   </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-5xl md:text-8xl font-black text-emerald-950 tracking-tighter leading-none uppercase">Confirmed.</h2>
                  <p className="text-xl md:text-2xl text-emerald-950/50 font-medium max-w-xl mx-auto leading-relaxed">
                    Reservasi grup Anda telah masuk ke sistem Kaisa Rossie. Selamat memulai perjalanan eksklusif bersama kami.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-auto pt-16 flex flex-col md:flex-row items-center justify-between gap-6">
              {step < 5 ? (
                <>
                  <button 
                    onClick={prevStep} 
                    disabled={step === 1} 
                    className="w-full md:w-auto p-7 rounded-2xl bg-ivory text-emerald-950/20 hover:text-emerald-950 disabled:opacity-0 transition-all active:scale-90"
                  >
                    <ArrowLeft size={28} />
                  </button>
                  <button 
                    onClick={nextStep} 
                    className="w-full flex-1 bg-emerald-950 text-white py-7 md:py-9 rounded-[35px] font-black text-[13px] uppercase tracking-[0.5em] shadow-6xl hover:bg-gold-500 transition-all duration-700 active:scale-95"
                  >
                    {step === 4 ? 'Authorize Group Booking' : 'Prosedur Selanjutnya'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={onComplete} 
                  className="w-full bg-emerald-950 text-white py-7 md:py-9 rounded-[35px] font-black text-[13px] uppercase tracking-[0.5em] shadow-6xl hover:bg-gold-500 transition-all active:scale-95"
                >
                  Masuk ke Portal Keluarga
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
