
import React, { useState } from 'react';
import { Package } from '../types';
import { Check, User, FileText, CreditCard, ArrowLeft, ShieldCheck, Upload, Smartphone, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';

interface BookingFlowProps {
  pkg: Package;
  onComplete: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ pkg, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'FULL',
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, title: 'ID', icon: <User size={16} /> },
    { id: 2, title: 'Docs', icon: <FileText size={16} /> },
    { id: 3, title: 'Pay', icon: <CreditCard size={16} /> },
    { id: 4, title: 'Done', icon: <Check size={16} /> }
  ];

  const isBus = pkg.category === 'BUS';

  return (
    <div className="bg-ivory min-h-screen">
      {/* 01. LUXURY HEADER - RESPONSIVE */}
      <section className="bg-emerald-950 pt-32 pb-24 md:pt-48 md:pb-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 islamic-pattern scale-150"></div>
        <div className="container-luxe relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            <div className="inline-flex items-center space-x-4 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <ShieldCheck size={16} className="text-gold-400" />
              <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.4em]">Secured Reservation Atelier</span>
            </div>
            <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
              Confirm Your <br /> <span className="text-gold-500 italic font-serif font-light">Journey.</span>
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
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Est. Value</p>
              <p className="text-lg md:text-xl font-black text-white">Rp {pkg.price.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-luxe -mt-10 md:-mt-20 pb-32 relative z-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* STEP INDICATOR - COMPACT FOR MOBILE */}
          <div className="bg-white p-6 md:p-10 rounded-[35px] md:rounded-[50px] shadow-3xl mb-8 md:mb-12 border border-emerald-950/5 flex justify-between items-center relative overflow-hidden">
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-950/5 -translate-y-1/2"></div>
             {steps.map((s) => (
               <div key={s.id} className="relative z-10 flex flex-col items-center space-y-3">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-700 border-2 ${
                    step >= s.id ? 'bg-emerald-950 border-gold-500 text-gold-400 scale-110 shadow-xl' : 'bg-ivory border-emerald-950/5 text-emerald-950/20'
                  }`}>
                    {step > s.id ? <Check size={20} /> : s.icon}
                  </div>
                  <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] hidden sm:block ${step >= s.id ? 'text-emerald-950' : 'text-emerald-950/20'}`}>
                    {s.title}
                  </span>
               </div>
             ))}
          </div>

          <div className="bg-white rounded-[40px] md:rounded-[60px] border border-emerald-950/5 p-8 md:p-20 shadow-4xl min-h-[500px] flex flex-col relative overflow-hidden">
            {step === 1 && (
              <div className="space-y-10 md:space-y-16 animate-fade-in">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter">Identity Details</h2>
                  <p className="text-emerald-950/40 text-[11px] md:text-sm font-medium">Please provide accurate contact information for our concierge team.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-emerald-950 uppercase tracking-[0.4em] ml-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-ivory border border-emerald-950/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-emerald-950 focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-all" placeholder="As per ID/Passport" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-emerald-950 uppercase tracking-[0.4em] ml-2">WhatsApp Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-ivory border border-emerald-950/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-emerald-950 focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-all" placeholder="+62 8..." />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 md:space-y-16 animate-fade-in">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter">Document Vault</h2>
                  <p className="text-emerald-950/40 text-[11px] md:text-sm font-medium">Securely upload your legal documents for processing.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                  <div className="group bg-ivory border-2 border-dashed border-emerald-950/5 rounded-[30px] p-8 md:p-12 flex flex-col items-center justify-center space-y-4 hover:border-gold-500 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-emerald-950 text-gold-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-black text-emerald-950 uppercase tracking-tighter">{isBus ? 'Owner ID' : 'Passport Scan'}</h4>
                      <p className="text-[8px] font-bold text-emerald-950/30 uppercase mt-1">PDF / JPG (Max 5MB)</p>
                    </div>
                  </div>
                  <div className="group bg-ivory border-2 border-dashed border-emerald-950/5 rounded-[30px] p-8 md:p-12 flex flex-col items-center justify-center space-y-4 hover:border-gold-500 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-emerald-950 text-gold-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-black text-emerald-950 uppercase tracking-tighter">Proof of ID</h4>
                      <p className="text-[8px] font-bold text-emerald-950/30 uppercase mt-1">Government Official Card</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter">Settlement Plan</h2>
                  <p className="text-emerald-950/40 text-[11px] md:text-sm font-medium">Choose your preferred payment structure.</p>
                </div>
                <div className="space-y-4">
                   {[
                     { id: 'FULL', title: 'Full Settlement', desc: 'Secure entire booking with priority status' },
                     { id: 'DP', title: 'Commitment Deposit', desc: `Booking fee of ${isBus ? '30%' : 'Rp 5.000.000'}` }
                   ].map((opt) => (
                     <div 
                       key={opt.id}
                       onClick={() => setFormData({...formData, paymentMethod: opt.id})}
                       className={`p-6 md:p-10 rounded-[24px] md:rounded-[36px] border-2 flex items-center justify-between cursor-pointer transition-all ${
                         formData.paymentMethod === opt.id ? 'border-gold-500 bg-emerald-950/5' : 'border-emerald-950/5'
                       }`}
                     >
                       <div className="flex items-center space-x-6 md:space-x-8">
                         <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                           formData.paymentMethod === opt.id ? 'border-gold-500 bg-gold-500' : 'border-emerald-950/10'
                         }`}>
                           {formData.paymentMethod === opt.id && <Check size={16} className="text-white" />}
                         </div>
                         <div>
                           <h4 className="font-black text-emerald-950 text-lg md:text-2xl tracking-tighter">{opt.title}</h4>
                           <p className="text-[8px] md:text-[10px] font-bold text-emerald-950/40 uppercase tracking-[0.2em] mt-1">{opt.desc}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center justify-center space-y-10 py-12 text-center animate-scale-in">
                <div className="w-24 h-24 bg-emerald-950 text-gold-400 rounded-[30px] flex items-center justify-center shadow-4xl rotate-12">
                  <Check size={40} strokeWidth={3} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tighter leading-tight">Request Logged.</h2>
                  <p className="text-base md:text-lg text-emerald-950/50 font-medium max-w-sm mx-auto">
                    Your reservation is now in review. Check your email for next steps.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-auto pt-16 flex flex-col md:flex-row items-center justify-between gap-4">
              {step < 4 ? (
                <>
                  <button 
                    onClick={prevStep} 
                    disabled={step === 1} 
                    className="w-full md:w-auto p-5 rounded-2xl bg-emerald-950/5 text-emerald-950/40 hover:text-emerald-950 disabled:opacity-0"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <button 
                    onClick={nextStep} 
                    className="w-full flex-1 bg-emerald-950 text-white py-6 md:py-8 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-[12px] uppercase tracking-[0.4em] shadow-xl hover:bg-gold-500 transition-all duration-700"
                  >
                    {step === 3 ? 'Finalize Order' : 'Next Step'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={onComplete} 
                  className="w-full bg-emerald-950 text-white py-6 md:py-8 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-[12px] uppercase tracking-[0.4em] shadow-xl hover:bg-gold-500 transition-all"
                >
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
