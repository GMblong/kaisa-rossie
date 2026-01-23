
import React, { useState } from 'react';
import { 
  TrendingUp, Smartphone, Wallet, Target, MessageSquare, Plus, 
  ImageIcon, FileText, Share2, Receipt, ArrowUpRight, 
  UserPlus, MoreVertical, CheckCircle2, Loader2, X,
  Download, ExternalLink, Filter, History as HistoryIcon,
  ChevronRight, AlertCircle, Phone, Mail, MapPin, Star
} from 'lucide-react';
import { StatCard } from './Shared';

interface Lead {
  id: string;
  name: string;
  pkg: string;
  status: 'HOT' | 'COLD' | 'CONVERTED';
  phone: string;
}

interface CommissionHistory {
  id: string;
  date: string;
  amount: number;
  status: 'Tuntas' | 'Proses';
}

export const SalesAgentView: React.FC<{ activeTab: string, setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  // --- STATES ---
  const [leads, setLeads] = useState<Lead[]>([
    { id: 'L-001', name: "Bp. Syamsul Arifin", pkg: "Haji Furoda Elite", status: "HOT", phone: "08123456789" },
    { id: 'L-002', name: "Ibu Maya", pkg: "Spain Heritage Tour", status: "COLD", phone: "08198765432" },
    { id: 'L-003', name: "Dr. Gunawan", pkg: "Umrah Signature", status: "HOT", phone: "08112233445" },
    { id: 'L-004', name: "Siti Rahma", pkg: "Umrah Signature", status: "CONVERTED", phone: "08155667788" },
  ]);

  const [withdrawHistory, setWithdrawHistory] = useState<CommissionHistory[]>([
    { id: 'WD-102', date: "Februari 2024", amount: 8200000, status: "Tuntas" },
    { id: 'WD-101', date: "Januari 2024", amount: 5500000, status: "Tuntas" },
  ]);

  const [availableComm, setAvailableComm] = useState(24500000);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  
  // Form State
  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    email: '',
    package: 'Umrah Signature',
    notes: '',
    priority: 'HOT' as Lead['status']
  });

  // --- ACTIONS ---
  const handleAddLead = () => {
    if (!newLead.name || !newLead.phone) return;
    const lead: Lead = {
      id: `L-00${leads.length + 1}`,
      name: newLead.name,
      pkg: newLead.package,
      status: newLead.priority,
      phone: newLead.phone
    };
    setLeads([lead, ...leads]);
    setShowAddLead(false);
    setNewLead({ name: '', phone: '', email: '', package: 'Umrah Signature', notes: '', priority: 'HOT' });
  };

  const toggleLeadStatus = (id: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        const nextStatus: Record<string, Lead['status']> = { 'HOT': 'COLD', 'COLD': 'CONVERTED', 'CONVERTED': 'HOT' };
        return { ...l, status: nextStatus[l.status] };
      }
      return l;
    }));
  };

  const handleWithdraw = () => {
    if (availableComm <= 0) return;
    setIsWithdrawing(true);
    setTimeout(() => {
      const newWD: CommissionHistory = {
        id: `WD-${Math.floor(Math.random() * 900) + 100}`,
        date: "Maret 2024",
        amount: availableComm,
        status: "Proses"
      };
      setWithdrawHistory([newWD, ...withdrawHistory]);
      setAvailableComm(0);
      setIsWithdrawing(false);
    }, 2000);
  };

  const hotLeadsCount = leads.filter(l => l.status === 'HOT').length;

  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-10 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard label="Pipeline Potensial" value="Rp 1.2B" icon={TrendingUp} trend="+5%" />
            <StatCard label="HOT Leads" value={hotLeadsCount.toString()} icon={Smartphone} trend="Segera Follow Up" />
            <StatCard label="Komisi Tersedia" value={`Rp ${(availableComm / 1000000).toFixed(1)}jt`} icon={Wallet} trend="Target Q1" />
          </div>
          
          <div className="bg-emerald-950 text-white p-12 rounded-[60px] shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute inset-0 opacity-10 islamic-pattern scale-150 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="space-y-8 max-w-xl">
                <div className="inline-block px-8 py-2 bg-white/5 border border-white/10 rounded-full text-gold-500 text-[10px] font-black uppercase tracking-[0.4em]">Sales Performance</div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">Misi Sales: <br /><span className="text-gold-500 italic font-serif font-light">Konversi Maksimal.</span></h3>
                <p className="text-white/40 font-medium text-lg leading-relaxed italic">"Gunakan Marketing Kit terbaru untuk paket Umrah Syawal Privé. Database mencatat minat tinggi di segmen ini."</p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <button onClick={() => setActiveTab('leads')} className="bg-white text-emerald-950 px-12 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-4xl flex items-center justify-center gap-4 group active:scale-95">
                  Buka CRM Leads <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform"/>
                </button>
                <button onClick={() => setActiveTab('marketing')} className="bg-white/10 text-white px-12 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white/20 transition-all border border-white/10 active:scale-95">
                  Ambil Visual Kit
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'leads':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in relative border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Database CRM</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Manajemen calon jamaah potensial</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none p-5 bg-ivory rounded-3xl border border-emerald-950/5 text-emerald-950 hover:bg-emerald-950 hover:text-white transition-all shadow-sm"><Filter size={20}/></button>
              <button onClick={() => setShowAddLead(true)} className="flex-[3] md:flex-none bg-emerald-950 text-white px-10 py-5 rounded-3xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-gold-500 shadow-xl transition-all active:scale-95">
                <Plus size={20}/> <span className="hidden sm:inline">Tambah Lead Baru</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {leads.map((l) => (
              <div key={l.id} className="p-8 bg-ivory rounded-[50px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-6 shadow-sm">
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className={`w-18 h-18 rounded-[30px] flex items-center justify-center text-emerald-950 shadow-xl transition-all font-black text-2xl ${
                    l.status === 'CONVERTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-white'
                  }`}>
                    {l.status === 'CONVERTED' ? <CheckCircle2 size={32}/> : l.name.charAt(4)}
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-black text-emerald-950 group-hover:text-white leading-tight tracking-tight transition-colors">{l.name}</p>
                      <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        l.status === 'HOT' ? 'bg-red-500 text-white' : 
                        l.status === 'CONVERTED' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        {l.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2 transition-colors">{l.pkg}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                  <p className="hidden md:block text-[11px] font-black text-emerald-950/30 group-hover:text-white/20 tracking-widest transition-colors">{l.phone}</p>
                  <button onClick={() => toggleLeadStatus(l.id)} className="p-5 bg-white rounded-3xl group-hover:bg-white/10 group-hover:text-white transition-all shadow-md text-emerald-950 active:scale-90">
                    <Target size={20}/>
                  </button>
                  <a href={`https://wa.me/${l.phone}`} target="_blank" rel="noreferrer" className="p-5 bg-emerald-950 text-white rounded-3xl group-hover:bg-gold-500 transition-all shadow-xl active:scale-90">
                    <MessageSquare size={20}/>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* ATELIER LEAD MODAL */}
          {showAddLead && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-4xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[90vh]">
                
                <div className="p-8 md:p-14 border-b border-emerald-950/5 flex justify-between items-center shrink-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md">K</div>
                      <span className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.6em]">Sales CRM Pipeline</span>
                    </div>
                    <h4 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter uppercase leading-none">New Prospect</h4>
                  </div>
                  <button onClick={() => setShowAddLead(false)} className="p-5 bg-ivory rounded-[20px] text-emerald-950/20 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all shadow-sm"><X size={32}/></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/20">
                  <div className="space-y-12 max-w-3xl mx-auto">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Nama Lengkap</label>
                        <div className="relative">
                          <UserPlus className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                          <input type="text" value={newLead.name} onChange={(e) => setNewLead({...newLead, name: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Contoh: Bp. Syamsul" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">WhatsApp / Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                          <input type="tel" value={newLead.phone} onChange={(e) => setNewLead({...newLead, phone: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="+62 8..." />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Email Address (Opt)</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                          <input type="email" value={newLead.email} onChange={(e) => setNewLead({...newLead, email: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="email@address.com" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Target Paket</label>
                        <div className="relative">
                          <select value={newLead.package} onChange={(e) => setNewLead({...newLead, package: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm appearance-none cursor-pointer">
                            <option>Umrah Signature</option>
                            <option>Haji Furoda Royal</option>
                            <option>Global Heritage Tour</option>
                            <option>Bus VIP Rental</option>
                          </select>
                          <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Prioritas Lead</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['HOT', 'COLD', 'CONVERTED'].map(s => (
                          <button 
                            key={s}
                            onClick={() => setNewLead({...newLead, priority: s as Lead['status']})}
                            className={`p-6 rounded-[25px] font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                              newLead.priority === s 
                                ? 'bg-emerald-950 border-gold-500 text-gold-500 shadow-xl' 
                                : 'bg-white border-emerald-950/5 text-emerald-950/30'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Catatan Khusus</label>
                      <textarea 
                        value={newLead.notes}
                        onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                        className="w-full bg-white p-8 rounded-[40px] border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-inner min-h-[140px] resize-none leading-relaxed text-emerald-950" 
                        placeholder="Detail preferensi jamaah (misal: perlu kursi roda, dsb)..."
                      ></textarea>
                    </div>

                  </div>
                </div>

                <div className="p-8 md:p-14 border-t border-emerald-950/5 flex flex-col md:flex-row items-center justify-between gap-8 shrink-0 bg-white md:rounded-b-[60px]">
                   <div className="flex items-center gap-4 text-emerald-950/30">
                      <AlertCircle size={20} className="text-gold-500" />
                      <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">Lead akan diprioritaskan di ringkasan dashboard.</p>
                   </div>
                   <div className="flex gap-4 w-full md:w-auto">
                      <button onClick={() => setShowAddLead(false)} className="flex-1 md:px-14 py-6 bg-ivory text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all shadow-sm active:scale-95">Batal</button>
                      <button 
                        onClick={handleAddLead}
                        className="flex-1 md:px-20 py-6 bg-emerald-950 text-gold-400 rounded-[25px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-5xl active:scale-95"
                      >
                        Register Prospect
                      </button>
                   </div>
                </div>

                <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] islamic-pattern scale-150 pointer-events-none rotate-12"></div>
              </div>
            </div>
          )}
        </div>
      );

    case 'commissions':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Wallet & Komisi</h3>
            <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Penarikan dan histori insentif peniagaan</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-12 bg-emerald-950 text-white rounded-[60px] space-y-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center shadow-lg"><Wallet size={20} className="text-emerald-950"/></div>
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gold-500">Dana Tersedia</p>
                </div>
                <p className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none break-all">Rp {(availableComm / 1000000).toFixed(1)}jt</p>
              </div>
              <button 
                onClick={handleWithdraw}
                disabled={isWithdrawing || availableComm === 0}
                className="w-full py-8 bg-white text-emerald-950 rounded-[30px] font-black text-[12px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all relative z-10 shadow-5xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
              >
                {isWithdrawing ? <Loader2 size={24} className="animate-spin"/> : <Download size={24}/>}
                {isWithdrawing ? 'MEMPROSES...' : 'TARIK KE REKENING'}
              </button>
              <div className="absolute inset-0 opacity-10 islamic-pattern scale-150 group-hover:rotate-12 transition-transform duration-[10s]"></div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-emerald-950/5 pb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-950/30">Histori Pencairan</p>
                <HistoryIcon size={16} className="text-emerald-950/20" />
              </div>
              <div className="space-y-4 h-[350px] overflow-y-auto no-scrollbar pr-2">
                {withdrawHistory.map((h) => (
                  <div key={h.id} className="p-8 bg-ivory rounded-[35px] flex justify-between items-center border border-emerald-950/5 group hover:bg-emerald-950 transition-all duration-500 shadow-sm">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-md"><Receipt size={20}/></div>
                       <div>
                         <p className="text-lg font-black text-emerald-950 group-hover:text-white leading-none tracking-tight transition-colors">{h.date}</p>
                         <p className="text-[9px] font-bold text-emerald-950/30 uppercase tracking-widest mt-2 group-hover:text-white/40 transition-colors">{h.id} • {h.status}</p>
                       </div>
                    </div>
                    <p className="text-xl font-black text-emerald-950 group-hover:text-gold-500 tracking-tighter transition-colors">Rp {(h.amount / 1000000).toFixed(1)}jt</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'marketing':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Marketing Kit</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Aset visual premium untuk promosi eksklusif</p>
            </div>
            <button className="bg-emerald-950 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 transition-all shadow-xl active:scale-95">Update Kit All</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: "Flyer Umrah Ramadan", icon: ImageIcon, size: "12.4 MB" },
              { label: "Brosur Haji Furoda", icon: FileText, size: "45.0 MB" },
              { label: "Asset IG Story Pack", icon: Share2, size: "8.1 MB" },
              { label: "Price List Q1 2024", icon: Receipt, size: "2.2 MB" }
            ].map((k, i) => (
              <div key={i} className="p-10 bg-ivory rounded-[50px] flex flex-col items-center justify-center gap-6 hover:bg-emerald-950 group transition-all duration-700 shadow-sm border border-emerald-950/5 text-center relative overflow-hidden">
                <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-xl"><k.icon size={32}/></div>
                <div className="space-y-2 relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-950 group-hover:text-white leading-tight transition-colors">{k.label}</p>
                   <p className="text-[8px] font-bold text-emerald-950/30 group-hover:text-white/30 uppercase transition-colors">{k.size}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 absolute bottom-6 flex items-center gap-2 text-gold-500 font-black text-[9px] uppercase tracking-widest transition-all hover:translate-x-2">
                   Download <Download size={12}/>
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-ivory p-12 rounded-[50px] flex flex-col md:flex-row items-center justify-between gap-12 border border-emerald-950/5 shadow-inner">
             <div className="space-y-4">
                <h4 className="text-2xl font-black text-emerald-950 tracking-tighter">Perlu Katalog Kustom?</h4>
                <p className="text-emerald-950/40 font-medium text-sm">Hubungi tim Content Management untuk desain flyer khusus agen.</p>
             </div>
             <button onClick={() => setActiveTab('overview')} className="w-full md:w-auto px-10 py-5 bg-emerald-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-gold-500 transition-all shadow-xl active:scale-95">Hubungi Divisi Konten <ExternalLink size={18}/></button>
          </div>
        </div>
      );

    default: return null;
  }
};
