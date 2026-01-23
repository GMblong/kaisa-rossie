
import React, { useState } from 'react';
import { 
  PlaneTakeoff, ListChecks, Ticket, ShieldCheck, Download, 
  Upload, Plane, CheckCircle2, AlertCircle, Loader2, 
  Search, UserCheck, MoreVertical, ChevronRight, X,
  History as HistoryIcon, Plus, Calendar, Star, MapPin, Type, Filter
} from 'lucide-react';
import { StatCard } from './Shared';

interface Passenger {
  id: string;
  name: string;
  pnr: string;
  status: 'In Review' | 'Verified' | 'Issue';
  group: string;
}

interface SeatBlock {
  id: string;
  airline: string;
  flight: string;
  used: number;
  total: number;
  expiry: string;
}

interface VisaStatus {
  id: string;
  name: string;
  pkg: string;
  step: number; // 1: Bio, 2: MOFA, 3: Issued
  status: string;
}

export const TicketingView: React.FC<{ activeTab: string, setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  // --- STATES ---
  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: 'P-001', name: "Abdullah Ahmad", pnr: "XQ992Y", status: "Verified", group: "Grup Mar-A" },
    { id: 'P-002', name: "Gunawan Pratama", pnr: "LPP02X", status: "In Review", group: "Grup Mar-A" },
    { id: 'P-003', name: "Siti Fatimah", pnr: "XQ992Y", status: "Verified", group: "Grup Mar-A" },
    { id: 'P-004', name: "Ratna Sari", pnr: "TBA", status: "In Review", group: "Grup Apr-B" },
  ]);

  const [blocks, setBlocks] = useState<SeatBlock[]>([
    { id: 'B-01', airline: "Saudi Arabian", flight: "SV-817", used: 45, total: 50, expiry: "48h" },
    { id: 'B-02', airline: "Qatar Airways", flight: "QR-957", used: 12, total: 45, expiry: "7d" },
  ]);

  const [visaList, setVisaList] = useState<VisaStatus[]>([
    { id: 'V-01', name: "Sulaiman Arifin", pkg: "Haji Furoda", step: 3, status: "Visa Issued" },
    { id: 'V-02', name: "Ratna Sari", pkg: "Umrah Signature", step: 1, status: "Biometric" },
    { id: 'V-03', name: "Budi Santoso", pkg: "Umrah Signature", step: 2, status: "MOFA Process" },
  ]);

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showAddBlock, setShowAddBlock] = useState(false);
  
  // New Block Form State
  const [newBlock, setNewBlock] = useState({
    airline: '',
    flight: '',
    total: '50',
    expiry: '72h'
  });

  // --- ACTIONS ---
  const handleVerifyPassenger = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setPassengers(prev => prev.map(p => 
        p.id === id ? { ...p, status: 'Verified' } : p
      ));
      setProcessingId(null);
    }, 1500);
  };

  const handleAddBlock = () => {
    if (!newBlock.airline || !newBlock.flight) return;
    const block: SeatBlock = {
      id: `B-0${blocks.length + 1}`,
      airline: newBlock.airline,
      flight: newBlock.flight,
      used: 0,
      total: parseInt(newBlock.total) || 50,
      expiry: newBlock.expiry
    };
    setBlocks([block, ...blocks]);
    setShowAddBlock(false);
    setNewBlock({ airline: '', flight: '', total: '50', expiry: '72h' });
  };

  const handleProgressVisa = (id: string) => {
    setVisaList(prev => prev.map(v => {
      if (v.id === id && v.step < 3) {
        const nextStep = v.step + 1;
        const statuses = ["", "Biometric", "MOFA Process", "Visa Issued"];
        return { ...v, step: nextStep, status: statuses[nextStep] };
      }
      return v;
    }));
  };

  const accuracy = Math.round((passengers.filter(p => p.status === 'Verified').length / passengers.length) * 100);

  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-6 md:space-y-10 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <StatCard label="Blok Kursi Aktif" value={`${blocks.reduce((a, b) => a + b.total, 0)} Pax`} icon={Ticket} trend="Ramadan" />
            <StatCard label="Visa Terbit" value={`${Math.round((visaList.filter(v => v.step === 3).length / visaList.length) * 100)}%`} icon={ShieldCheck} trend="Live Tracking" />
            <StatCard label="Akurasi Manifest" value={`${accuracy}%`} icon={ListChecks} trend="Verified" />
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-8 md:space-y-12 border border-emerald-950/5 relative overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
               <h3 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Alert Operasional</h3>
               <AlertCircle className="text-gold-500 animate-pulse" size={28} />
            </div>
            <div className="space-y-4 md:space-y-6 relative z-10">
              {blocks.map((b, i) => b.used / b.total > 0.8 && (
                <div key={i} className="p-6 md:p-8 bg-red-50 rounded-[30px] md:rounded-[45px] border border-red-200 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-emerald-950 transition-all duration-700 gap-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0"></div>
                    <p className="font-black text-sm md:text-base text-emerald-950 group-hover:text-white transition-colors">Blok {b.flight}: Sisa {b.total - b.used} kursi (Batas {b.expiry})</p>
                  </div>
                  <button onClick={() => setActiveTab('blocks')} className="w-full md:w-auto text-[9px] md:text-[10px] font-black text-red-600 group-hover:text-gold-500 uppercase tracking-widest bg-white group-hover:bg-white/10 px-6 py-2 rounded-full border border-red-100 group-hover:border-white/10 transition-all active:scale-95">Amankan Blok</button>
                </div>
              ))}
              <div className="p-6 md:p-8 bg-ivory rounded-[30px] md:rounded-[45px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-emerald-950 transition-all duration-700 gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-500 shrink-0"></div>
                  <p className="font-black text-sm md:text-base text-emerald-950 group-hover:text-white transition-colors">Manifest Mar-A: 2 Paspor perlu verifikasi.</p>
                </div>
                <span className="text-[9px] md:text-[10px] font-black text-emerald-950/30 group-hover:text-white/30 uppercase tracking-widest">Normal</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'manifest':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-8 md:space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-1 text-left">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Manifest</h3>
              <p className="text-emerald-950/30 text-[9px] md:text-[11px] font-black uppercase tracking-widest">Update: PNR & Verifikasi Data</p>
            </div>
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
               <div className="relative flex-grow lg:flex-grow-0 min-w-[200px]">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-950/20" size={16} />
                 <input type="text" placeholder="Cari Jamaah..." className="w-full bg-ivory border border-emerald-950/5 rounded-2xl py-3.5 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-gold-500 transition-all shadow-inner" />
               </div>
               <button className="bg-emerald-950 text-white p-4 rounded-xl hover:bg-gold-500 shadow-xl transition-all active:scale-95"><Download size={18}/></button>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-6 md:mx-0 px-6 md:px-0">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-emerald-950/5">
                  <th className="pb-6 text-[9px] md:text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.2em] pl-2">Nama Jamaah</th>
                  <th className="pb-6 text-[9px] md:text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.2em]">Grup</th>
                  <th className="pb-6 text-[9px] md:text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.2em]">PNR</th>
                  <th className="pb-6 text-[9px] md:text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.2em]">Status</th>
                  <th className="pb-6 text-right pr-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/5">
                {passengers.map((p) => (
                  <tr key={p.id} className="group hover:bg-ivory transition-all duration-500">
                    <td className="py-6 pl-2">
                      <p className="text-base font-black text-emerald-950 group-hover:text-gold-600 transition-colors leading-tight">{p.name}</p>
                      <p className="text-[8px] font-bold text-emerald-950/20 uppercase tracking-widest mt-1">{p.id}</p>
                    </td>
                    <td className="py-6 text-[9px] font-black text-emerald-950/40 uppercase tracking-widest">{p.group}</td>
                    <td className="py-6"><span className={`font-mono text-[10px] font-black px-2 py-1 rounded-lg ${p.pnr === 'TBA' ? 'bg-red-50 text-red-400' : 'bg-gold-50 text-gold-600'}`}>{p.pnr}</span></td>
                    <td className="py-6">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm transition-all duration-700 ${
                        p.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold-100 text-gold-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-6 text-right pr-2">
                      {p.status === 'In Review' ? (
                        <button 
                          onClick={() => handleVerifyPassenger(p.id)}
                          disabled={processingId === p.id}
                          className="bg-emerald-950 text-white p-3 rounded-xl hover:bg-emerald-600 transition-all shadow-md active:scale-95"
                        >
                          {processingId === p.id ? <Loader2 size={14} className="animate-spin"/> : <UserCheck size={14}/>}
                        </button>
                      ) : (
                        <div className="flex justify-end p-3"><CheckCircle2 size={18} className="text-emerald-500"/></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'blocks':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-8 md:space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Blok Kursi GSA</h3>
              <p className="text-emerald-950/30 text-[9px] font-black uppercase tracking-widest">Alokasi Seat Charter Musiman</p>
            </div>
            <button 
              onClick={() => setShowAddBlock(true)}
              className="w-full sm:w-auto bg-emerald-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-gold-500 transition-all shadow-xl active:scale-95"
            >
              <Plus size={18}/> Tambah Blok GSA
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {blocks.map((f) => (
              <div key={f.id} className="p-8 md:p-12 bg-ivory rounded-[40px] md:rounded-[50px] space-y-8 md:space-y-10 group hover:bg-emerald-950 transition-all duration-700 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-[24px] md:rounded-[30px] flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all shrink-0">
                    <Plane size={28} className="group-hover:rotate-45 transition-transform duration-700"/>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl md:text-4xl font-black text-emerald-950 group-hover:text-white tracking-tighter transition-colors">{f.flight}</p>
                    <p className="text-[9px] md:text-[10px] font-bold text-emerald-950/30 group-hover:text-gold-400 uppercase tracking-widest mt-1 transition-colors">{f.airline}</p>
                  </div>
                </div>
                
                <div className="space-y-4 md:space-y-6 relative z-10">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[8px] md:text-[9px] font-black uppercase text-emerald-950/30 group-hover:text-white/40 tracking-[0.2em] transition-colors">Utilization</p>
                      <p className="text-xl md:text-2xl font-black text-emerald-950 group-hover:text-white transition-colors">{Math.round((f.used/f.total)*100)}%</p>
                    </div>
                    <p className="text-[9px] md:text-[10px] font-black text-emerald-950 group-hover:text-white uppercase tracking-widest transition-colors">{f.used} / {f.total} PNR</p>
                  </div>
                  <div className="w-full h-3 md:h-4 bg-emerald-950/5 group-hover:bg-white/10 rounded-full overflow-hidden transition-colors">
                    <div className={`h-full transition-all duration-1000 ${f.used/f.total > 0.8 ? 'bg-red-500' : 'bg-gold-500'}`} style={{ width: `${(f.used/f.total)*100}%` }}></div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3 relative z-10">
                   <button className="flex-1 py-3.5 bg-white text-emerald-950 rounded-xl md:rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-md active:scale-95">Input Masal</button>
                   <button className="p-3.5 bg-emerald-950/5 group-hover:bg-white/10 text-emerald-950 group-hover:text-white rounded-xl md:rounded-2xl transition-all active:scale-95"><MoreVertical size={18}/></button>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 islamic-pattern scale-150 transition-opacity"></div>
              </div>
            ))}
          </div>

          {/* ATELIER BLOCK MODAL: Premium GSA Allocator */}
          {showAddBlock && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-4xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[90vh]">
                
                <div className="p-8 md:p-14 border-b border-emerald-950/5 flex justify-between items-center shrink-0 bg-white md:rounded-t-[60px] z-20">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md">K</div>
                      <span className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.6em]">GSA Block Allocation</span>
                    </div>
                    <h4 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter uppercase leading-none">New Seat Block</h4>
                  </div>
                  <button onClick={() => setShowAddBlock(false)} className="p-5 bg-ivory rounded-[20px] text-emerald-950/20 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all shadow-sm"><X size={32}/></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/20">
                  <div className="space-y-12 max-w-3xl mx-auto">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Nama Maskapai</label>
                        <div className="relative">
                          <Plane className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                          <input type="text" value={newBlock.airline} onChange={(e) => setNewBlock({...newBlock, airline: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Saudi Arabian / Qatar" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Nomor Penerbangan</label>
                        <div className="relative">
                          <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                          <input type="text" value={newBlock.flight} onChange={(e) => setNewBlock({...newBlock, flight: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="SV-817 / QR-957" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Kapasitas (Pax)</label>
                        <input type="number" value={newBlock.total} onChange={(e) => setNewBlock({...newBlock, total: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="50" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Time Limit (TL)</label>
                        <div className="relative">
                           <select value={newBlock.expiry} onChange={(e) => setNewBlock({...newBlock, expiry: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm appearance-none cursor-pointer">
                            <option>24h</option>
                            <option>48h</option>
                            <option>72h</option>
                            <option>7d</option>
                            <option>14d</option>
                          </select>
                          <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-emerald-950/5 rounded-3xl flex items-center gap-5 border border-emerald-950/5 shadow-inner">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-950 shadow-sm shrink-0"><AlertCircle size={24} className="text-gold-500" /></div>
                       <div>
                          <p className="text-[11px] font-black uppercase text-emerald-950 tracking-widest">Inventory Lock Protocol</p>
                          <p className="text-[9px] font-medium text-emerald-950/40 uppercase leading-relaxed mt-1">Sistem akan otomatis melepaskan alokasi kursi yang tidak terisi manifest melewati batas TL yang ditentukan.</p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-14 border-t border-emerald-950/5 flex flex-col md:flex-row items-center justify-between gap-8 shrink-0 bg-white md:rounded-b-[60px] z-20">
                   <div className="flex gap-4 w-full md:w-auto">
                      <button onClick={() => setShowAddBlock(false)} className="flex-1 md:px-14 py-6 bg-ivory text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all shadow-sm active:scale-95 border border-emerald-950/5">Cancel</button>
                      <button 
                        onClick={handleAddBlock}
                        className="flex-1 md:px-20 py-6 bg-emerald-950 text-gold-400 rounded-[25px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-5xl active:scale-95"
                      >
                        Authorize Block
                      </button>
                   </div>
                </div>

                <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] islamic-pattern scale-150 pointer-events-none rotate-12"></div>
              </div>
            </div>
          )}
        </div>
      );

    case 'visa':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-8 md:space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Visa Center</h3>
            <div className="flex items-center gap-3 p-3 bg-ivory rounded-xl border border-emerald-950/5 shadow-inner">
               <HistoryIcon size={14} className="text-emerald-950/20" />
               <p className="text-[8px] md:text-[9px] font-black uppercase text-emerald-950/40 tracking-widest">Real-time Saudi-GSA Sync Active</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {visaList.map((v) => (
              <div key={v.id} className="p-8 md:p-10 bg-ivory rounded-[40px] md:rounded-[55px] flex flex-col lg:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-6 md:gap-8 shadow-sm border border-emerald-950/5">
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[30px] flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all shrink-0 ${v.step === 3 ? 'bg-emerald-500 text-white' : 'bg-white'}`}>
                    {v.step === 3 ? <CheckCircle2 size={32}/> : <ShieldCheck size={32}/>}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl md:text-3xl font-black text-emerald-950 group-hover:text-white tracking-tighter leading-none truncate transition-colors">{v.name}</p>
                    <p className="text-[8px] md:text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.1em] md:tracking-[0.2em] group-hover:text-gold-400 mt-2 truncate transition-colors">{v.pkg} • ID: {v.id}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:items-end gap-4 md:gap-6 w-full lg:w-auto border-t lg:border-t-0 border-emerald-950/5 pt-4 lg:pt-0">
                  <div className="flex gap-2 md:gap-4 w-full justify-between lg:justify-end">
                    {[1, 2, 3].map(s => (
                      <div key={s} className="space-y-1.5 flex flex-col items-center flex-1 lg:flex-none">
                        <div className={`w-full lg:w-16 h-1.5 md:h-2 rounded-full transition-all duration-700 ${s <= v.step ? 'bg-gold-500' : 'bg-emerald-950/10 group-hover:bg-white/10'}`}></div>
                        <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest transition-opacity ${s === v.step ? 'opacity-100 text-gold-500' : 'opacity-0'}`}>
                          {s === 1 ? 'BIO' : s === 2 ? 'MOFA' : 'ISSUE'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 w-full justify-between lg:justify-end">
                    <span className="text-[9px] md:text-[10px] font-black text-emerald-950/30 group-hover:text-white/40 uppercase tracking-widest transition-colors">{v.status}</span>
                    {v.step < 3 && (
                      <button 
                        onClick={() => handleProgressVisa(v.id)}
                        className="bg-emerald-950 text-white p-4 md:p-5 rounded-xl md:rounded-2xl group-hover:bg-gold-500 transition-all shadow-xl active:scale-95"
                      >
                        <ChevronRight size={18}/>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default: return null;
  }
};
