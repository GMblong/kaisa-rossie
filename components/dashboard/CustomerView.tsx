
import React, { useState } from 'react';
import { 
  Timer, ClipboardCheck, Wallet, ArrowUpRight, ChevronRight, 
  ShieldCheck, Upload, FileCheck, CreditCard, History as HistoryIcon, 
  AlertCircle, CheckCircle2, Download, Search, X, Loader2, MessageSquare,
  Sparkles, Landmark, Smartphone, Zap, Filter, Users, User, Link as LinkIcon,
  UserPlus, Mail, ShieldAlert, FolderOpen, Plus, Calendar, MapPin
} from 'lucide-react';
import { StatCard } from './Shared';
import { CustomerDocument, Transaction, PackageCategory, Participant } from '../../types';
import { PACKAGES } from '../../constants';
import { PackageCard } from '../PackageCard';

export const CustomerView: React.FC<{ 
  activeTab: string, 
  setActiveTab: (t: string) => void,
  onSelectPackage?: (id: string) => void 
}> = ({ activeTab, setActiveTab, onSelectPackage }) => {
  // --- DATA MOCK FAMILY SUITE ---
  const [familyManifest] = useState<Participant[]>([
    { id: 'p1', name: "Abdullah Ahmad", type: "DEWASA", isAccountHolder: true, syncStatus: 'LINKED' },
    { id: 'p2', name: "Siti Fatimah", type: "DEWASA", isAccountHolder: false, linkedEmail: 'siti.f@email.com', syncStatus: 'LINKED' },
    { id: 'p3', name: "Zaid Ahmad", type: "ANAK", isAccountHolder: false, syncStatus: 'UNLINKED' },
  ]);

  const [documents] = useState([
    { 
      ownerId: 'p1', 
      ownerName: "Abdullah Ahmad", 
      role: "Lead",
      docs: [
        { id: 'd1', name: 'Paspor RI', type: 'PASSPORT', status: 'VERIFIED' },
        { id: 'd2', name: 'Sertifikat Vaksin', type: 'VACCINE', status: 'VERIFIED' }
      ]
    },
    { 
      ownerId: 'p2', 
      ownerName: "Siti Fatimah", 
      role: "Anggota",
      docs: [
        { id: 'd3', name: 'Paspor RI', type: 'PASSPORT', status: 'VERIFIED' },
        { id: 'd4', name: 'Sertifikat Vaksin', type: 'VACCINE', status: 'PENDING' }
      ]
    },
    { 
      ownerId: 'p3', 
      ownerName: "Zaid Ahmad", 
      role: "Anggota",
      docs: [
        { id: 'd5', name: 'Paspor RI', type: 'PASSPORT', status: 'MISSING' },
        { id: 'd6', name: 'Akta Kelahiran', type: 'ID_CARD', status: 'MISSING' }
      ]
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    { id: 'TRX-9901', amount: 127500000, method: 'Kaisa Pay-Family', date: '2024-02-01', status: 'COMPLETED' },
  ]);

  // --- LOGIC & FILTER ---
  const [exploreFilter, setExploreFilter] = useState<PackageCategory | 'ALL'>('ALL');
  const [exploreSearch, setExploreSearch] = useState('');

  const totalPaid = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCost = 42500000 * familyManifest.length; 
  const remainingBalance = totalCost - totalPaid;
  const groupReadiness = Math.round((documents.flatMap(g => g.docs).filter(d => d.status === 'VERIFIED').length / documents.flatMap(g => g.docs).length) * 100);

  const filteredExplore = PACKAGES.filter(p => {
    const matchesCat = exploreFilter === 'ALL' || p.category === exploreFilter;
    const matchesSearch = p.title.toLowerCase().includes(exploreSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  switch (activeTab) {
    case 'overview': return (
      <div className="space-y-8 md:space-y-12 animate-fade-in px-2 md:px-0">
         {/* DASHBOARD STATS */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <StatCard 
              label="Keberangkatan" 
              value="18 Hari" 
              icon={Timer} 
              trend="25 Mar 2024" 
            />
            <StatCard 
              label="Kesiapan Dokumen" 
              value={`${groupReadiness}%`} 
              icon={ShieldCheck} 
              trend={groupReadiness < 100 ? "Lengkapi Berkas" : "Siap Berangkat"} 
            />
            <StatCard 
              label="Saldo Keluarga" 
              value={remainingBalance === 0 ? "LUNAS" : `Rp ${(remainingBalance / 1000000).toFixed(0)}jt`} 
              icon={Wallet} 
              trend="Terpadu" 
            />
         </div>

         {/* FAMILY TRAVELERS CARDS */}
         <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
               <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tighter">Family Manifest</h3>
                  <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Traveler terdaftar dalam grup Anda</p>
               </div>
               <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-950 text-gold-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-lg active:scale-95">
                  <UserPlus size={14}/> Tambah Traveler
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {familyManifest.map((member) => (
                 <div key={member.id} className="bg-white p-8 rounded-[45px] border border-emerald-950/5 shadow-xl group hover:border-gold-500 transition-all duration-500 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center text-center space-y-5">
                       <div className="relative">
                          <div className={`w-20 h-20 rounded-[30px] flex items-center justify-center shadow-2xl transition-all ${member.syncStatus === 'LINKED' ? 'bg-emerald-950 text-gold-400' : 'bg-ivory text-emerald-950/20'}`}>
                             {member.type === 'ANAK' ? <Sparkles size={32}/> : <User size={32}/>}
                          </div>
                          {member.syncStatus === 'LINKED' && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg text-white">
                               <LinkIcon size={12}/>
                            </div>
                          )}
                       </div>
                       <div>
                          <p className="text-lg font-black text-emerald-950 leading-tight truncate w-full px-2">{member.name}</p>
                          <p className="text-[9px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] mt-1">
                            {member.type} • {member.syncStatus === 'LINKED' ? 'Akun Terhubung' : 'Profil Tamu'}
                          </p>
                       </div>
                       
                       <div className="w-full pt-5 border-t border-emerald-950/5 flex justify-between items-center">
                          <div className="text-left">
                             <p className="text-[7px] font-black uppercase text-emerald-950/20">Berkas</p>
                             <p className={`text-[10px] font-bold ${documents.find(d => d.ownerId === member.id)?.docs.every(doc => doc.status === 'VERIFIED') ? 'text-emerald-600' : 'text-gold-600'}`}>
                                {documents.find(d => d.ownerId === member.id)?.docs.filter(doc => doc.status === 'VERIFIED').length} / {documents.find(d => d.ownerId === member.id)?.docs.length} Valid
                             </p>
                          </div>
                          <button onClick={() => setActiveTab('documents')} className="p-3 bg-ivory rounded-xl text-emerald-950/20 group-hover:text-emerald-950 group-hover:bg-gold-500/10 transition-all">
                             <ChevronRight size={16}/>
                          </button>
                       </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] islamic-pattern scale-150 transition-opacity"></div>
                 </div>
               ))}
               
               <div className="border-4 border-dashed border-emerald-950/5 rounded-[45px] flex flex-col items-center justify-center p-8 space-y-4 opacity-40 hover:opacity-100 hover:border-gold-500 transition-all cursor-pointer group bg-ivory/30">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-md">
                     <Plus size={24}/>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-950/60">Invite Member</p>
               </div>
            </div>
         </div>

         {/* TRIP HIGHLIGHT */}
         <div className="bg-emerald-950 rounded-[50px] md:rounded-[70px] p-10 md:p-24 text-white relative overflow-hidden shadow-6xl border border-white/5 group">
            <div className="absolute inset-0 opacity-20 islamic-pattern scale-150 rotate-12 pointer-events-none group-hover:rotate-[20deg] transition-transform duration-[20s]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
               <div className="space-y-8 max-w-2xl">
                  <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-gold-400 text-[9px] font-black uppercase tracking-[0.5em] backdrop-blur-md">
                    <ShieldCheck size={14} /> Reservasi Keluarga Aktif
                  </div>
                  <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.85]">Eksplorasi <br /> <span className="text-gold-500 italic font-serif font-light">Heritage.</span></h2>
                  <div className="flex flex-wrap gap-10 pt-6 border-l-2 border-white/10 pl-10">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Departure</p>
                      <p className="text-base md:text-xl font-bold text-white">25 Mar 2024</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Layanan</p>
                      <p className="text-base md:text-xl font-bold text-white">VVIP Suite</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Group ID</p>
                      <p className="text-base md:text-xl font-bold text-white">#KR-FAM-9921</p>
                    </div>
                  </div>
               </div>
               <button onClick={() => setActiveTab('bookings')} className="w-full lg:w-auto bg-white text-emerald-950 px-12 py-7 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-5xl flex items-center justify-center gap-4 active:scale-95">
                  Buka Detail Perjalanan <ArrowUpRight size={20}/>
               </button>
            </div>
         </div>
      </div>
    );

    case 'explore': return (
      <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-emerald-950/5 pb-12">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase">Rencanakan Safar</h3>
            <p className="text-emerald-950/30 text-[9px] md:text-[11px] font-black uppercase tracking-widest">Koleksi Perjalanan Kurasi Kaisa Rossie</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
             <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                <input 
                  type="text" 
                  value={exploreSearch}
                  onChange={(e) => setExploreSearch(e.target.value)}
                  placeholder="Cari Destinasi..." 
                  className="w-full bg-ivory border border-emerald-950/5 rounded-2xl py-5 pl-14 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-gold-500 shadow-inner transition-all" 
                />
             </div>
             <button className="bg-emerald-950 text-white p-5 rounded-2xl hover:bg-gold-500 transition-all shadow-lg active:scale-95"><Filter size={20}/></button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {['ALL', 'UMRAH', 'HAJJ', 'TOUR', 'BUS'].map(cat => (
            <button 
              key={cat}
              onClick={() => setExploreFilter(cat as any)}
              className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                exploreFilter === cat 
                  ? 'bg-emerald-950 border-emerald-950 text-gold-400 shadow-xl scale-105' 
                  : 'bg-white border-emerald-950/5 text-emerald-950/40 hover:border-emerald-950/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           {filteredExplore.length > 0 ? filteredExplore.map((p) => (
             <div key={p.id} className="animate-scale-in">
                <PackageCard item={p} onClick={(id) => onSelectPackage?.(id)} />
             </div>
           )) : (
             <div className="col-span-full py-24 text-center opacity-30 space-y-8">
                <div className="w-24 h-24 bg-ivory rounded-full flex items-center justify-center mx-auto shadow-inner"><Sparkles size={60} /></div>
                <p className="text-xs font-black uppercase tracking-widest">Maaf, paket belum tersedia untuk kategori ini.</p>
             </div>
           )}
        </div>
      </div>
    );

    case 'bookings': return (
      <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-emerald-950/5 pb-10">
            <div className="space-y-1">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Reservasi Keluarga</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Manajemen manifest dan logistik grup perjalanan</p>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-emerald-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gold-500 transition-all active:scale-95">
              <Download size={18}/> Download Manifest
            </button>
         </div>
         
         <div className="space-y-20">
            {/* MANIFEST LIST */}
            <div className="space-y-10">
               <div className="flex items-center gap-5 text-emerald-950/40">
                  <div className="w-10 h-[2px] bg-gold-500"></div>
                  <p className="text-[11px] font-black uppercase tracking-[0.5em]">Anggota Grup Terdaftar</p>
               </div>
               <div className="grid grid-cols-1 gap-6">
                  {familyManifest.map((m, i) => (
                    <div key={m.id} className="p-8 bg-ivory rounded-[50px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-10 shadow-sm relative overflow-hidden">
                       <div className="flex items-center gap-8 w-full md:w-auto relative z-10">
                          <div className={`w-20 h-20 rounded-[35px] flex items-center justify-center shadow-xl transition-all ${m.syncStatus === 'LINKED' ? 'bg-white text-emerald-950' : 'bg-emerald-950 text-gold-500'}`}>
                             {m.type === 'ANAK' ? <Sparkles size={32}/> : <User size={32}/>}
                          </div>
                          <div>
                            <div className="flex items-center gap-4">
                               <p className="text-2xl font-black text-emerald-950 group-hover:text-white leading-tight tracking-tight transition-colors">{m.name}</p>
                               {m.isAccountHolder && <span className="px-3 py-1 bg-gold-500 text-white text-[8px] font-black uppercase rounded-full shadow-md">Lead</span>}
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                               <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-gold-500/50 transition-colors">{m.type}</p>
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-950/10 group-hover:bg-white/10"></div>
                               <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-white/40 transition-colors">
                                 {m.syncStatus === 'LINKED' ? 'Portal Active' : 'Managed Profile'}
                               </p>
                            </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-5 w-full md:w-auto justify-end border-t md:border-t-0 border-emerald-950/5 pt-8 md:pt-0 relative z-10">
                          {m.syncStatus === 'UNLINKED' && m.type === 'DEWASA' && (
                             <button className="flex items-center gap-3 px-8 py-4 bg-white border border-emerald-950/10 text-emerald-950 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-md">
                                <LinkIcon size={14}/> Hubungkan Akun
                             </button>
                          )}
                          <button className="p-5 bg-white rounded-2xl group-hover:bg-white/10 group-hover:text-white transition-all shadow-md text-emerald-950 active:scale-95 border border-emerald-950/5">
                             <FileCheck size={24}/>
                          </button>
                       </div>
                       <div className="absolute top-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-[0.03] islamic-pattern scale-150 transition-opacity"></div>
                    </div>
                  ))}
               </div>
            </div>

            {/* ITINERARY BOX */}
            <div className="p-12 md:p-16 bg-ivory rounded-[70px] border border-emerald-950/5 relative overflow-hidden group shadow-inner">
               <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 relative z-10">
                  <div className="space-y-6">
                     <span className="bg-emerald-950 text-gold-500 px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">Jadwal Perjalanan Grup</span>
                     <h4 className="text-4xl md:text-6xl font-black text-emerald-950 tracking-tighter leading-tight group-hover:text-gold-600 transition-colors">Muslim Heritage Tour <br />Spain & Portugal</h4>
                     <div className="flex flex-wrap items-center gap-10 pt-4">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-950/40 shadow-sm"><Calendar size={20}/></div>
                           <div>
                              <p className="text-[8px] font-black uppercase text-emerald-950/30">Durasi</p>
                              <p className="text-sm font-bold text-emerald-950">25 Mar - 05 Apr 2024</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-950/40 shadow-sm"><MapPin size={20}/></div>
                           <div>
                              <p className="text-[8px] font-black uppercase text-emerald-950/30">Destinasi</p>
                              <p className="text-sm font-bold text-emerald-950">Madrid, Cordoba, Sevilla</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="w-full lg:w-auto">
                    <button className="w-full lg:w-auto px-16 py-7 bg-emerald-950 text-white rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 transition-all shadow-5xl active:scale-95 flex items-center justify-center gap-4">
                      Eksplorasi Harian <ChevronRight size={20}/>
                    </button>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.01] islamic-pattern scale-150 rotate-45 pointer-events-none"></div>
            </div>
         </div>
      </div>
    );

    case 'documents': return (
      <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border-b border-emerald-950/5 pb-12">
            <div>
               <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Brankas Dokumen</h3>
               <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest mt-2">Penyimpanan aman seluruh berkas grup keluarga</p>
            </div>
            {groupReadiness < 100 && (
               <div className="flex items-center gap-5 p-5 bg-gold-50 rounded-[35px] border border-gold-100 shadow-sm animate-pulse">
                  <AlertCircle size={28} className="text-gold-500" />
                  <div>
                     <p className="text-[10px] font-black uppercase text-gold-800 tracking-wider">Tindakan Diperlukan</p>
                     <p className="text-[9px] font-bold text-gold-700/60 uppercase">Unggah Paspor Penumpang (Zaid Ahmad)</p>
                  </div>
               </div>
            )}
         </div>

         <div className="space-y-24">
            {documents.map((group, idx) => (
              <div key={idx} className="space-y-10 animate-fade-in">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 px-4 border-l-4 border-emerald-950 pl-8">
                    <div className="flex items-center gap-8">
                       <div className="w-16 h-16 bg-ivory rounded-[30px] flex items-center justify-center text-emerald-950 shadow-inner border border-emerald-950/5 font-black text-2xl">
                          {group.ownerName.charAt(0)}
                       </div>
                       <div>
                          <div className="flex items-center gap-4">
                             <h5 className="text-3xl font-black text-emerald-950 tracking-tight">{group.ownerName}</h5>
                             <span className="px-4 py-1.5 bg-emerald-950/5 text-emerald-950/40 text-[9px] font-black uppercase rounded-full">{group.role}</span>
                          </div>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest mt-2">
                            {familyManifest.find(m => m.id === group.ownerId)?.syncStatus === 'LINKED' ? 'Otoritas Akun Mandiri' : 'Dikelola oleh Lead Passenger'}
                          </p>
                       </div>
                    </div>
                    <button className="flex items-center gap-3 px-8 py-4 bg-ivory rounded-2xl text-emerald-950/30 font-black text-[10px] uppercase tracking-widest hover:text-emerald-950 transition-all border border-emerald-950/5">
                       <FolderOpen size={16}/> Buka Vault
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {group.docs.map((d) => (
                      <div key={d.id} className={`p-10 rounded-[55px] border transition-all duration-700 relative overflow-hidden group ${
                        d.status === 'VERIFIED' ? 'bg-emerald-50/50 border-emerald-100 shadow-sm' : 
                        d.status === 'PENDING' ? 'bg-ivory border-gold-200' : 
                        d.status === 'MISSING' ? 'bg-red-50/30 border-red-100' : 'bg-ivory border-emerald-950/5'
                      }`}>
                         <div className="flex justify-between items-start relative z-10 mb-12">
                            <div className={`w-16 h-16 rounded-[28px] flex items-center justify-center shadow-2xl transition-all ${
                              d.status === 'VERIFIED' ? 'bg-emerald-950 text-gold-400' : 'bg-white text-emerald-950/20'
                            }`}>
                               {d.status === 'VERIFIED' ? <CheckCircle2 size={32}/> : <Upload size={32}/>}
                            </div>
                            <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                              d.status === 'VERIFIED' ? 'bg-emerald-200 text-emerald-800' : 
                              d.status === 'PENDING' ? 'bg-gold-100 text-gold-700' : 
                              d.status === 'MISSING' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                            }`}>
                               {d.status}
                            </span>
                         </div>
                         <h4 className="text-2xl font-black text-emerald-950 mb-10 leading-tight tracking-tight">{d.name}</h4>
                         
                         <div className="relative z-10">
                            {d.status === 'MISSING' || d.status === 'REJECTED' ? (
                              <button className="w-full py-6 bg-emerald-950 text-white rounded-[25px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-gold-500 transition-all shadow-5xl active:scale-95 flex items-center justify-center gap-4">
                                 <Upload size={18}/> Unggah Berkas
                              </button>
                            ) : (
                              <button className="w-full py-6 bg-white border border-emerald-950/10 text-emerald-950 rounded-[25px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-950 hover:text-white transition-all shadow-md active:scale-95">
                                 Lihat Dokumen
                              </button>
                            )}
                         </div>
                         <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] islamic-pattern scale-150 pointer-events-none transition-opacity duration-1000"></div>
                      </div>
                    ))}
                 </div>
              </div>
            ))}
         </div>
      </div>
    );

    case 'finance': return (
      <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 border-b border-emerald-950/5 pb-12">
            <div className="space-y-1">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Status Settlement</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Satu tagihan terpadu untuk efisiensi seluruh traveler grup</p>
            </div>
            <button className="w-full sm:w-auto bg-emerald-950 text-white px-12 py-6 rounded-[28px] font-black text-[11px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-5xl active:scale-95 flex items-center justify-center gap-5">
               <CreditCard size={22}/> Bayar Tagihan Grup
            </button>
         </div>

         <div className="p-12 md:p-20 bg-ivory rounded-[70px] border border-emerald-950/5 space-y-16 relative overflow-hidden shadow-inner">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
               <div className="space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-950/30">Total Investasi {familyManifest.length} Penumpang</p>
                  <p className="text-5xl md:text-9xl font-black text-emerald-950 tracking-tighter leading-none transition-colors">Rp {(totalCost/1000000).toFixed(0)}jt</p>
               </div>
               <div className="text-left md:text-right space-y-4">
                  <div className="flex items-center gap-4 md:justify-end">
                     <ShieldCheck size={24} className="text-emerald-600" />
                     <p className="text-[12px] font-black uppercase text-emerald-600 tracking-widest">Full Settlement Confirmed</p>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-emerald-950/10 uppercase tracking-tighter">Verified by Kaisa Treasury</p>
               </div>
            </div>
            <div className="w-full h-5 bg-emerald-950/5 rounded-full overflow-hidden relative z-10 shadow-inner">
               <div className="h-full bg-gold-500 w-full transition-all duration-[4s]"></div>
            </div>
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.015] islamic-pattern scale-125 rotate-12 pointer-events-none"></div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
            <div className="p-12 md:p-16 bg-emerald-950 rounded-[65px] text-white flex flex-col justify-between space-y-16 shadow-6xl group relative overflow-hidden">
               <div className="relative z-10 space-y-8">
                  <div className="w-20 h-20 bg-white/10 rounded-[35px] flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform duration-700 shadow-2xl border border-white/5"><Smartphone size={40}/></div>
                  <h4 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-tight">Unified <br />Kaisa Pay-Family</h4>
                  <p className="text-white/40 text-base font-medium leading-relaxed max-w-sm">Konsolidasi seluruh transaksi dalam satu gerbang aman. Lebih efisien, tanpa duplikasi biaya administrasi.</p>
               </div>
               <button className="relative z-10 w-full py-7 bg-gold-500 text-emerald-950 rounded-[28px] font-black text-[12px] uppercase tracking-[0.4em] hover:bg-white transition-all shadow-6xl active:scale-95">Open Payment Hub</button>
               <div className="absolute inset-0 opacity-10 islamic-pattern scale-[2.5] rotate-45 pointer-events-none group-hover:rotate-[60deg] transition-transform duration-[30s]"></div>
            </div>
            
            <div className="p-12 md:p-16 border border-emerald-950/5 rounded-[65px] space-y-12 shadow-xl bg-white relative overflow-hidden">
               <div className="flex items-center justify-between border-b border-emerald-950/5 pb-10">
                  <div className="flex items-center gap-5 text-emerald-950/30">
                    <HistoryIcon size={24} />
                    <p className="text-[12px] font-black uppercase tracking-[0.3em]">Histori Billing</p>
                  </div>
                  <button className="text-[11px] font-black text-gold-600 uppercase tracking-widest hover:text-emerald-950 transition-all border-b-2 border-gold-500/20 pb-1">Download All</button>
               </div>
               <div className="space-y-8 h-[320px] overflow-y-auto no-scrollbar pr-6">
                  {transactions.map(t => (
                    <div key={t.id} className="flex justify-between items-center py-8 border-b border-emerald-950/5 group hover:bg-ivory transition-all px-6 rounded-[35px]">
                       <div className="space-y-2">
                          <p className="text-xl font-black text-emerald-950 group-hover:text-gold-600 transition-colors">{t.id}</p>
                          <p className="text-[11px] font-bold text-emerald-950/30 uppercase mt-1 tracking-widest">{t.date} • {t.method}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-2xl font-black text-emerald-950 tracking-tighter">Rp {(t.amount/1000000).toFixed(1)}jt</p>
                          <div className="flex items-center justify-end gap-2 mt-1">
                             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                             <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Settle</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    );

    default: return (
       <div className="bg-white p-12 rounded-[60px] shadow-xl flex flex-col items-center justify-center text-center space-y-12 animate-fade-in min-h-[550px] border border-emerald-950/5 mx-2 md:mx-0">
          <div className="relative">
             <div className="w-32 h-32 bg-ivory rounded-[50px] flex items-center justify-center text-emerald-950/10 shadow-inner">
                <MessageSquare size={64}/>
             </div>
             <div className="absolute -top-5 -right-5 w-14 h-14 bg-gold-500 rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce">
                <Sparkles size={28}/>
             </div>
          </div>
          <div className="space-y-5">
             <h3 className="text-4xl font-black text-emerald-950 uppercase tracking-tighter leading-none">Module Portofolio</h3>
             <p className="text-emerald-950/30 text-sm font-black uppercase tracking-widest max-w-sm mx-auto leading-relaxed">Sistem Kaisa Atelier sedang menyinkronkan data profil seluruh grup Anda.</p>
          </div>
          <button onClick={() => setActiveTab('overview')} className="bg-emerald-950 text-white px-14 py-7 rounded-full font-black text-[12px] uppercase tracking-[0.4em] hover:bg-gold-500 transition-all shadow-6xl active:scale-95">Kembali ke Ringkasan</button>
       </div>
    );
  }
};
