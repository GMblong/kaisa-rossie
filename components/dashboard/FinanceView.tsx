
import React, { useState } from 'react';
import { 
  Wallet, Clock, Receipt, Landmark, Check, Download, 
  ArrowUpRight, ArrowDownLeft, FileText, BarChart3, 
  CreditCard, Search, Filter, Loader2, CheckCircle2,
  AlertCircle, RefreshCw, ChevronRight, FileSpreadsheet, X,
  ShieldCheck, Sparkles, Printer, FileDown, Image as ImageIcon
} from 'lucide-react';
import { StatCard } from './Shared';

interface PaymentValidation {
  id: string;
  ref: string;
  name: string;
  amt: number;
  date: string;
  status: 'PENDING' | 'VERIFIED';
}

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: 'LUNAS' | 'OVERDUE' | 'WAITING';
}

export const FinanceView: React.FC<{ activeTab: string, setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  // --- MOCK DATA STATES ---
  const [payments, setPayments] = useState<PaymentValidation[]>([
    { id: 'v1', ref: "PAY-99120", name: "Abdullah Ahmad", amt: 15000000, date: "Hari ini 14:20", status: 'PENDING' },
    { id: 'v2', ref: "PAY-99882", name: "Siti Fatimah", amt: 42500000, date: "Hari ini 09:15", status: 'PENDING' },
    { id: 'v3', ref: "PAY-99885", name: "Gunawan Pratama", amt: 5000000, date: "Kemarin 18:00", status: 'VERIFIED' },
  ]);

  const [invoices] = useState<Invoice[]>([
    { id: "INV-2024-001", customer: "Ratna Sari", amount: 42500000, dueDate: "2024-03-15", status: "LUNAS" },
    { id: "INV-2024-042", customer: "Gunawan Pratama", amount: 12500000, dueDate: "2024-03-01", status: "OVERDUE" },
    { id: "INV-2024-055", customer: "Budi Santoso", amount: 35000000, dueDate: "2024-03-20", status: "WAITING" },
  ]);

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<PaymentValidation | null>(null);
  const [showExport, setShowExport] = useState(false);

  // --- ACTIONS ---
  const handleApprovePayment = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setPayments(prev => prev.map(p => 
        p.id === id ? { ...p, status: 'VERIFIED' } : p
      ));
      setProcessingId(null);
      setSelectedAudit(null);
    }, 1500);
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-8 md:space-y-10 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <StatCard label="Aset Likuid" value="Rp 8.24M" icon={Wallet} trend="+12% MoM" />
            <StatCard label="Antrean Approval" value={`${payments.filter(p => p.status === 'PENDING').length} Item`} icon={Clock} trend="Urgent" />
            <StatCard label="Overdue AR" value="Rp 1.1M" icon={Receipt} trend="7 Invoice" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Financial Velocity</h3>
                <div className="flex gap-2">
                   <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-[8px] font-black uppercase text-emerald-700">In</span>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-[8px] font-black uppercase text-red-700">Out</span>
                   </div>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                {[60, 45, 85, 55, 90, 70, 80, 40, 65, 95, 75, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-emerald-950/5 rounded-t-xl relative overflow-hidden h-full transition-all">
                      <div className="absolute bottom-0 w-full bg-emerald-950 group-hover:bg-gold-500 transition-all duration-700" style={{ height: `${h}%` }}></div>
                    </div>
                    <span className="text-[7px] font-bold text-emerald-950/20 uppercase tracking-tighter transition-colors group-hover:text-emerald-950">M-{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6 md:space-y-8">
               <div className="bg-emerald-950 p-10 md:p-12 rounded-[40px] md:rounded-[50px] text-white space-y-8 relative overflow-hidden shadow-2xl h-full flex flex-col justify-between group">
                  <div className="relative z-10 space-y-4">
                     <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform duration-700">
                        <RefreshCw size={28} />
                     </div>
                     <h4 className="text-3xl font-black tracking-tighter leading-[0.9] uppercase">Bank <br />Sync Gateway</h4>
                     <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Terakhir Sinkron: 2m lalu</p>
                  </div>
                  <div className="relative z-10 space-y-4">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                        <span>API Health</span>
                        <span className="text-emerald-400">Stable</span>
                     </div>
                     <button onClick={() => setShowExport(true)} className="w-full py-6 bg-gold-500 text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95">Open Export Center</button>
                  </div>
                  <div className="absolute inset-0 opacity-10 islamic-pattern scale-[2] group-hover:rotate-45 transition-transform duration-[15s] pointer-events-none"></div>
               </div>
            </div>
          </div>
        </div>
      );

    case 'payments':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-8 md:space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Validasi Pelunasan</h3>
              <p className="text-emerald-950/30 text-[9px] md:text-[11px] font-black uppercase tracking-widest">Konfirmasi bukti transfer masuk jamaah</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
               <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-950/20" size={16} />
                  <input type="text" placeholder="Cari Ref / Nama..." className="w-full bg-ivory border border-emerald-950/5 rounded-2xl py-3.5 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-gold-500 transition-all" />
               </div>
               <button className="bg-emerald-950 text-white p-4 rounded-xl hover:bg-gold-500 transition-all shadow-md active:scale-95"><Filter size={18}/></button>
            </div>
          </div>

          <div className="space-y-4">
            {payments.map((p) => (
              <div key={p.id} onClick={() => setSelectedAudit(p)} className="p-6 md:p-8 bg-ivory rounded-[35px] md:rounded-[45px] flex flex-col lg:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-6 border border-emerald-950/5 cursor-pointer shadow-sm">
                <div className="flex items-center gap-6 md:gap-8 w-full lg:w-auto">
                  <div className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-[28px] flex items-center justify-center text-emerald-950 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {p.status === 'VERIFIED' ? <CheckCircle2 className="text-emerald-500" size={28}/> : <Landmark size={28}/>}
                  </div>
                  <div>
                    <p className="text-lg md:text-2xl font-black text-emerald-950 group-hover:text-white leading-tight transition-colors">{p.name}</p>
                    <p className="text-[9px] md:text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2 transition-colors">{p.ref} • {p.date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-6 md:gap-10 w-full lg:w-auto border-t lg:border-t-0 border-emerald-950/5 pt-4 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <p className="text-xl md:text-3xl font-black text-emerald-950 group-hover:text-white tracking-tighter transition-colors">{formatIDR(p.amt)}</p>
                    <div className="flex items-center gap-2 lg:justify-end mt-1">
                      <div className={`w-2 h-2 rounded-full ${p.status === 'VERIFIED' ? 'bg-emerald-500' : 'bg-gold-500'}`}></div>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${p.status === 'VERIFIED' ? 'text-emerald-500' : 'text-gold-600'}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-emerald-950/10 group-hover:text-white transition-all"/>
                </div>
              </div>
            ))}
          </div>

          {/* ATELIER AUDIT MODAL */}
          {selectedAudit && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
               <div className="bg-white w-full max-w-2xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[90vh]">
                  
                  <div className="p-8 md:p-14 border-b border-emerald-950/5 flex justify-between items-center shrink-0">
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white font-black text-xs">K</div>
                          <span className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.6em]">Financial Audit Desk</span>
                       </div>
                       <h4 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Validate Ref</h4>
                    </div>
                    <button onClick={() => setSelectedAudit(null)} className="p-5 bg-ivory rounded-[20px] text-emerald-950/20 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all shadow-sm"><X size={32}/></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/30">
                    <div className="space-y-12">
                      <div className="p-10 bg-white rounded-[45px] shadow-sm space-y-10 border border-emerald-950/5">
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase text-emerald-950/30 tracking-widest">Customer</p>
                              <p className="text-xl font-black text-emerald-950">{selectedAudit.name}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase text-emerald-950/30 tracking-widest">Ref Code</p>
                              <p className="text-xl font-black text-emerald-950 uppercase">{selectedAudit.ref}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase text-emerald-950/30 tracking-widest">Net Amount</p>
                              <p className="text-2xl font-black text-gold-600">{formatIDR(selectedAudit.amt)}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase text-emerald-950/30 tracking-widest">Received at</p>
                              <p className="text-lg font-black text-emerald-950">{selectedAudit.date}</p>
                           </div>
                        </div>
                        
                        <div className="pt-8 border-t border-emerald-950/5 space-y-4">
                           <p className="text-[10px] font-black uppercase text-emerald-950/30 tracking-widest">Attached Proof of Transfer</p>
                           <div className="aspect-[4/3] bg-ivory rounded-[35px] flex items-center justify-center border-2 border-dashed border-emerald-950/10 group cursor-pointer hover:border-gold-500 transition-all">
                              <ImageIcon size={48} className="text-emerald-950/5 group-hover:text-gold-500 transition-colors" />
                           </div>
                        </div>
                      </div>

                      <div className="p-8 bg-white rounded-[40px] flex items-start gap-6 border border-emerald-950/5 shadow-sm">
                         <div className="w-12 h-12 bg-emerald-950 text-gold-400 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"><ShieldCheck size={24}/></div>
                         <div className="space-y-2">
                           <p className="text-[11px] font-black uppercase text-emerald-950 tracking-widest leading-none">Security Protocol</p>
                           <p className="text-[10px] font-medium text-emerald-950/40 leading-relaxed uppercase">Validasi dana ini akan otomatis memperbarui saldo jamaah dan memicu notifikasi invoice lunas.</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-14 border-t border-emerald-950/5 flex flex-col md:flex-row items-center justify-between gap-6 shrink-0 bg-white md:rounded-b-[60px]">
                     <div className="flex gap-4 w-full md:w-auto">
                        <button onClick={() => setSelectedAudit(null)} className="flex-1 md:px-14 py-6 bg-ivory text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all shadow-sm">Close Audit</button>
                        {selectedAudit.status === 'PENDING' && (
                          <button 
                            onClick={() => handleApprovePayment(selectedAudit.id)}
                            disabled={processingId === selectedAudit.id}
                            className="flex-1 md:px-20 py-6 bg-emerald-950 text-gold-400 rounded-[25px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-5xl active:scale-95 flex items-center justify-center gap-4"
                          >
                            {processingId === selectedAudit.id ? <Loader2 size={20} className="animate-spin"/> : <CheckCircle2 size={20}/>}
                            {processingId === selectedAudit.id ? 'Processing...' : 'Authorize Funds'}
                          </button>
                        )}
                     </div>
                  </div>

                  <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] islamic-pattern scale-150 pointer-events-none rotate-12"></div>
               </div>
            </div>
          )}
        </div>
      );

    case 'invoices':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-8 md:space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Piutang & Billing</h3>
            <button 
              onClick={() => setShowExport(true)}
              className="bg-emerald-950 text-white p-4 rounded-xl hover:bg-gold-500 transition-all shadow-lg active:scale-95"
            >
              <FileSpreadsheet size={20}/>
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-6 md:mx-0 px-6 md:px-0">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-emerald-950/5">
                  <th className="pb-8 text-[9px] md:text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em] pl-4">ID Invoice</th>
                  <th className="pb-8 text-[9px] md:text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Pelanggan</th>
                  <th className="pb-8 text-[9px] md:text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Nominal</th>
                  <th className="pb-8 text-[9px] md:text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Status</th>
                  <th className="pb-8 text-right pr-4">Opsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/5">
                {invoices.map((inv, i) => (
                  <tr key={i} className="group hover:bg-ivory transition-all duration-500">
                    <td className="py-8 pl-4">
                      <p className="text-base font-black text-emerald-950 transition-colors group-hover:text-gold-600 leading-tight">{inv.id}</p>
                      <p className="text-[8px] font-bold text-emerald-950/20 uppercase mt-1 tracking-widest transition-colors group-hover:text-emerald-950/40">Due: {inv.dueDate}</p>
                    </td>
                    <td className="py-8 text-base font-bold text-emerald-950/60 group-hover:text-emerald-950 transition-colors">{inv.customer}</td>
                    <td className="py-8 font-black text-emerald-950 text-base transition-colors group-hover:text-emerald-950">{formatIDR(inv.amount)}</td>
                    <td className="py-8">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm transition-all duration-700 ${
                        inv.status === 'LUNAS' ? 'bg-emerald-100 text-emerald-700' : 
                        inv.status === 'OVERDUE' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gold-100 text-gold-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-8 text-right pr-4">
                      <button className="p-4 bg-emerald-950/5 text-emerald-950/20 rounded-[18px] hover:bg-emerald-950 hover:text-white transition-all shadow-sm active:scale-90">
                        <Download size={18}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'reports':
      return (
        <div className="space-y-8 md:space-y-12 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Net Profit Q1</h3>
                 <BarChart3 size={24} className="text-emerald-950/10" />
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-8 bg-ivory rounded-[35px] border border-emerald-950/5 group hover:bg-emerald-950 transition-all duration-700">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-emerald-950/30 group-hover:text-white/40 tracking-widest transition-colors">Gross Margin</p>
                     <p className="text-2xl md:text-3xl font-black text-emerald-950 group-hover:text-white transition-colors">Rp 1.4B</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-600/10 text-emerald-600 rounded-2xl flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:text-white">
                     <ArrowUpRight size={24} />
                  </div>
                </div>
                <div className="flex justify-between items-center p-8 bg-ivory rounded-[35px] border border-emerald-950/5 group hover:bg-red-600 transition-all duration-700">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-emerald-950/30 group-hover:text-white/40 tracking-widest transition-colors">OpEx</p>
                     <p className="text-2xl md:text-3xl font-black text-emerald-950 group-hover:text-white transition-colors">Rp 420M</p>
                  </div>
                  <div className="w-12 h-12 bg-red-600/10 text-red-600 rounded-2xl flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:text-white">
                     <ArrowDownLeft size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-950 p-10 md:p-12 rounded-[40px] md:rounded-[60px] shadow-2xl text-white flex flex-col justify-between space-y-12 relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <Sparkles size={32} className="text-gold-500 animate-pulse" />
                    <h3 className="text-3xl font-black tracking-tighter text-gold-500 uppercase leading-none">Sustainability <br />Analysis</h3>
                  </div>
                  <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                    Analisis risiko piutang menunjukkan tren positif dengan penurunan angka <i>Bad Debt</i> sebesar 4% di musim ini. Efisiensi operasional mencapai titik tertinggi di Q1.
                  </p>
               </div>
               <div className="relative z-10 grid grid-cols-2 gap-6">
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[35px] backdrop-blur-md shadow-sm">
                     <p className="text-[9px] font-black uppercase text-white/30 tracking-widest mb-2">Risk Score</p>
                     <p className="text-2xl md:text-3xl font-black text-gold-500 transition-all">Low</p>
                  </div>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[35px] backdrop-blur-md shadow-sm">
                     <p className="text-[9px] font-black uppercase text-white/30 tracking-widest mb-2">Efficiency</p>
                     <p className="text-2xl md:text-3xl font-black text-gold-500 transition-all">92%</p>
                  </div>
               </div>
               <div className="absolute inset-0 opacity-10 islamic-pattern scale-[2.5] group-hover:rotate-12 transition-transform duration-[15s] pointer-events-none"></div>
            </div>
          </div>
          
          <div className="p-10 md:p-14 bg-ivory rounded-[55px] border border-emerald-950/5 flex flex-col lg:flex-row justify-between items-center gap-10 shadow-sm">
             <div className="flex items-center gap-8">
                <div className="w-18 h-18 bg-emerald-950 text-gold-400 rounded-[30px] flex items-center justify-center shadow-2xl shrink-0">
                   <FileText size={40} />
                </div>
                <div>
                   <h4 className="text-2xl font-black text-emerald-950 tracking-tight leading-none uppercase">Finance Export Center</h4>
                   <p className="text-emerald-950/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-3">Hasilkan berkas komprehensif untuk keperluan audit, pajak, & investor.</p>
                </div>
             </div>
             <button 
              onClick={() => setShowExport(true)}
              className="w-full lg:w-auto px-12 py-6 bg-emerald-950 text-white rounded-[25px] font-black text-[11px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-4xl active:scale-95"
             >
               Initialize Export Hub
             </button>
          </div>
        </div>
      );
    default: return null;
  }
};
