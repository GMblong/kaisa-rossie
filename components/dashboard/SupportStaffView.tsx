import React, { useState } from 'react';
import { 
  ClipboardCheck, MessageSquare, Clock, FileCheck, Eye, Check, 
  X, AlertCircle, Loader2, Search, Filter, ChevronRight, 
  Plus, Trash2, ShieldCheck, User, Calendar, MessageCircle,
  MoreVertical, Sparkles, CheckCircle2, Minus, Info, Type
} from 'lucide-react';
import { StatCard } from './Shared';

interface StaffDoc {
  id: string;
  customerName: string;
  docType: string;
  uploadDate: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  priority: 'High' | 'Normal';
}

interface StaffTask {
  id: string;
  task: string;
  isDone: boolean;
  category: 'Legal' | 'Operational' | 'Client Care';
}

interface Inquiry {
  id: string;
  user: string;
  issue: string;
  status: 'URGENT' | 'NORMAL';
  time: string;
}

export const SupportStaffView: React.FC<{ activeTab: string, setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  // --- STATES ---
  const [docs, setDocs] = useState<StaffDoc[]>([
    { id: "DOC-001", customerName: "Abdullah Ahmad", docType: "Paspor RI", uploadDate: "10 Mar 2024", status: "Pending", priority: "High" },
    { id: "DOC-002", customerName: "Siti Fatimah", docType: "KTP & KK", uploadDate: "12 Mar 2024", status: "Verified", priority: "Normal" },
    { id: "DOC-003", customerName: "Ratna Sari", docType: "Vaksin Meningitis", uploadDate: "14 Mar 2024", status: "Pending", priority: "Normal" },
  ]);

  const [tasks, setTasks] = useState<StaffTask[]>([
    { id: "T-1", task: "Verifikasi Manifest Umrah Mar-25", isDone: true, category: "Operational" },
    { id: "T-2", task: "Call Provider Visa Saudi (Urgent)", isDone: false, category: "Legal" },
    { id: "T-3", task: "Siapkan Berkas Manasik Besok", isDone: false, category: "Client Care" },
  ]);

  const [inquiries] = useState<Inquiry[]>([
    { id: "INQ-99", user: "Hj. Ratna Sari", issue: "Update Paspor (Grup Mar)", status: "URGENT", time: "10m lalu" },
    { id: "INQ-98", user: "Bp. Syamsul Arifin", issue: "Tanya Jadwal Manasik", status: "NORMAL", time: "2j lalu" },
  ]);

  const [showReviewModal, setShowReviewModal] = useState<StaffDoc | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newTask, setNewTask] = useState("");

  // --- ACTIONS ---
  const handleVerifyDoc = (id: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setDocs(prev => prev.map(d => d.id === id ? { ...d, status: 'Verified' } : d));
      setShowReviewModal(null);
      setIsProcessing(false);
    }, 1500);
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task: StaffTask = {
      id: `T-${Date.now()}`,
      task: newTask,
      isDone: false,
      category: "Operational"
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setShowAddTask(false);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const renderModalHeader = (title: string, subtitle: string, onClose: () => void) => (
    <div className="p-8 md:p-14 border-b border-emerald-950/5 flex justify-between items-center shrink-0 bg-white md:rounded-t-[60px] z-30">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md">K</div>
          <span className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.6em]">{subtitle}</span>
        </div>
        <h4 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter uppercase leading-none">{title}</h4>
      </div>
      <button onClick={onClose} className="p-5 bg-ivory rounded-[20px] text-emerald-950/20 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all shadow-sm"><X size={32}/></button>
    </div>
  );

  const renderModalFooter = (onCancel: () => void, onSubmit: () => void, submitText: string, isSubmitting: boolean, icon: any) => {
    const SubmitIcon = icon;
    return (
      <div className="p-8 md:p-14 border-t border-emerald-950/5 flex flex-col md:flex-row items-center justify-between gap-8 shrink-0 bg-white z-40 md:rounded-b-[60px]">
         <div className="flex items-center gap-5 text-emerald-950/40">
            <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center"><AlertCircle size={22} className="text-gold-600" /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Verifikasi Otoritas</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.1em]">Tindakan ini akan tercatat dalam log sistem Kaisa Rossie.</p>
            </div>
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <button onClick={onCancel} className="flex-1 md:px-14 py-6 bg-ivory text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all border border-emerald-950/5 active:scale-95">Batal</button>
            <button 
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex-1 md:px-20 py-6 bg-emerald-950 text-gold-400 rounded-[25px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-5xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {isSubmitting ? <Loader2 size={20} className="animate-spin"/> : <SubmitIcon size={20} />}
              {isSubmitting ? 'Processing...' : submitText}
            </button>
         </div>
      </div>
    );
  };

  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-8 md:space-y-12 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <StatCard label="Inbox Verifikasi" value={`${docs.filter(d => d.status === 'Pending').length} Item`} icon={ClipboardCheck} trend="Waiting" />
            <StatCard label="Tiket Helpdesk" value={`${inquiries.length} Open`} icon={MessageSquare} trend="Avg: 4m" />
            <StatCard label="Tugas Tertunda" value={`${tasks.filter(t => !t.isDone).length} Task`} icon={Clock} trend="Priority" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
              <div className="flex justify-between items-center border-b border-emerald-950/5 pb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Inkuiri Terbaru</h3>
                  <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Helpdesk Queue Management</p>
                </div>
                <button className="p-4 bg-emerald-950 text-gold-500 rounded-2xl hover:bg-gold-500 hover:text-white transition-all shadow-lg active:scale-95"><Sparkles size={20}/></button>
              </div>
              <div className="space-y-6">
                {inquiries.map((t, i) => (
                  <div key={i} className="p-8 bg-ivory rounded-[50px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-6 shadow-sm">
                    <div className="flex items-center gap-8 w-full md:w-auto">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all font-black text-xl shrink-0">
                        {t.user.charAt(4)}
                      </div>
                      <div>
                        <div className="flex items-center gap-4">
                           <p className="text-xl md:text-2xl font-black text-emerald-950 group-hover:text-white transition-colors leading-tight">{t.user}</p>
                           <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${t.status === 'URGENT' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>{t.status}</span>
                        </div>
                        <p className="text-[10px] font-bold text-emerald-950/30 uppercase group-hover:text-gold-400 mt-2 transition-colors">{t.issue} • {t.time}</p>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-10 py-5 bg-white text-emerald-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all group-hover:bg-white/10 group-hover:text-white active:scale-95">Respond Ticket</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6 md:space-y-8">
               <div className="bg-emerald-950 p-10 md:p-12 rounded-[40px] md:rounded-[50px] text-white space-y-10 relative overflow-hidden shadow-2xl h-full flex flex-col justify-between group">
                  <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform duration-700 shadow-xl">
                      <ShieldCheck size={32} />
                    </div>
                    <h4 className="text-3xl font-black tracking-tighter leading-[0.9] uppercase">Client <br />Safety Desk</h4>
                    <p className="text-white/40 text-[11px] leading-relaxed">Pantau validitas dokumen dan kepuasan jamaah dalam satu alur kerja terpadu.</p>
                  </div>
                  <div className="relative z-10 space-y-4">
                    <button 
                      onClick={() => setActiveTab('docs')}
                      className="w-full py-6 bg-gold-500 text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
                    >
                      Process Pending Docs
                    </button>
                    <button 
                      onClick={() => setActiveTab('tasks')}
                      className="w-full py-6 bg-white/10 text-white border border-white/10 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                      Daily Workflow
                    </button>
                  </div>
                  <div className="absolute inset-0 opacity-10 islamic-pattern scale-[2.5] rotate-12 pointer-events-none group-hover:rotate-45 transition-transform duration-[20s]"></div>
               </div>
            </div>
          </div>
        </div>
      );

    case 'docs':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 border-b border-emerald-950/5 pb-10">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Verifikasi Berkas</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Audit Dokumen Jamaah & Legalitas</p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
               <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-950/20" size={16} />
                  <input type="text" placeholder="Cari Nama/ID..." className="w-full bg-ivory border border-emerald-950/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-gold-500" />
               </div>
               <button className="p-4 bg-emerald-950 text-white rounded-xl shadow-lg hover:bg-gold-500 transition-all active:scale-95"><Filter size={20}/></button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {docs.map((d) => (
              <div key={d.id} className="p-8 bg-ivory rounded-[50px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-8 shadow-sm">
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className={`w-18 h-18 rounded-[30px] flex items-center justify-center text-emerald-950 shadow-xl transition-all font-black text-2xl shrink-0 ${
                    d.status === 'Verified' ? 'bg-emerald-500 text-white' : 'bg-white'
                  }`}>
                    {d.status === 'Verified' ? <CheckCircle2 size={32}/> : <FileCheck size={32}/>}
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-black text-emerald-950 group-hover:text-white leading-tight tracking-tight transition-colors">{d.customerName}</p>
                      <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        d.priority === 'High' ? 'bg-red-500 text-white animate-pulse' : 'bg-gold-500 text-white'
                      }`}>
                        {d.priority}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2 transition-colors">{d.docType} • Upload: {d.uploadDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto justify-end border-t md:border-t-0 border-emerald-950/5 pt-6 md:pt-0">
                  <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    d.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold-100 text-gold-700'
                  }`}>{d.status}</span>
                  <button 
                    onClick={() => setShowReviewModal(d)}
                    className="p-5 bg-white rounded-3xl group-hover:bg-white/10 group-hover:text-white transition-all shadow-md text-emerald-950 active:scale-90"
                  >
                    <Eye size={20}/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ATELIER REVIEW DOC MODAL */}
          {showReviewModal && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-4xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[90vh]">
                {renderModalHeader("Audit Berkas", "Security & Legal Compliance", () => setShowReviewModal(null))}
                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/30">
                  <div className="space-y-16 max-w-3xl mx-auto">
                    <div className="space-y-12">
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black uppercase text-emerald-950/30 tracking-widest">Pemilik Berkas</p>
                             <p className="text-2xl font-black text-emerald-950">{showReviewModal.customerName}</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black uppercase text-emerald-950/30 tracking-widest">ID Dokumen</p>
                             <p className="text-2xl font-black text-emerald-950 uppercase">{showReviewModal.id}</p>
                          </div>
                       </div>
                       
                       <div className="p-12 bg-white rounded-[50px] border-4 border-emerald-950/5 shadow-inner flex flex-col items-center justify-center text-center space-y-6 group cursor-pointer hover:border-gold-500 transition-all">
                          <div className="w-24 h-24 bg-ivory rounded-[40px] flex items-center justify-center text-emerald-950/10 group-hover:text-gold-500 group-hover:scale-110 transition-all">
                             <FileCheck size={60} />
                          </div>
                          <div>
                            <h5 className="text-xl font-black text-emerald-950">KAISA_DOC_VAULT_{showReviewModal.id}.PDF</h5>
                            <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest mt-2">Klik untuk memperbesar visual berkas</p>
                          </div>
                       </div>

                       <div className="p-8 bg-gold-50 rounded-[35px] border border-gold-100 flex items-start gap-6">
                          <div className="w-12 h-12 bg-gold-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg"><Info size={24}/></div>
                          <div className="space-y-2">
                             <p className="text-[11px] font-black uppercase text-gold-800 tracking-widest">Verification Protocol</p>
                             <p className="text-[10px] font-medium text-gold-700/70 leading-relaxed uppercase">Pastikan nama jamaah sesuai dengan identitas manifest dan kualitas gambar tidak pecah (blur).</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
                {renderModalFooter(
                  () => setShowReviewModal(null), 
                  () => handleVerifyDoc(showReviewModal.id), 
                  "Authorize Document", 
                  isProcessing,
                  CheckCircle2
                )}
                <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] islamic-pattern scale-150 pointer-events-none rotate-12"></div>
              </div>
            </div>
          )}
        </div>
      );

    case 'tasks':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 border-b border-emerald-950/5 pb-10">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Workflow Staff</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Daftar Tugas Harian & Operasional</p>
            </div>
            <button 
              onClick={() => setShowAddTask(true)}
              className="w-full sm:w-auto bg-emerald-950 text-white px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-gold-500 shadow-xl transition-all active:scale-95"
            >
              <Plus size={20}/> <span className="hidden sm:inline">Tambah Tugas</span>
            </button>
          </div>

          <div className="space-y-6">
            {tasks.map((t) => (
              <div key={t.id} className="group relative flex items-center gap-8 p-8 bg-ivory rounded-[40px] md:rounded-[50px] border border-emerald-950/5 transition-all duration-700 hover:bg-emerald-950 shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleTask(t.id)}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center border-2 transition-all shrink-0 ${
                    t.isDone 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'bg-white border-emerald-950/10 text-emerald-950/20 group-hover:bg-white/10 group-hover:border-white/20'
                  }`}
                >
                  <Check size={t.isDone ? 32 : 24} strokeWidth={3} className={t.isDone ? 'scale-100' : 'scale-0'} />
                </button>
                
                <div className="flex-1 space-y-1">
                   <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-4 py-1 rounded-full text-[7px] font-black uppercase tracking-widest ${
                        t.category === 'Legal' ? 'bg-red-500 text-white' : 
                        t.category === 'Operational' ? 'bg-blue-500 text-white' : 'bg-gold-500 text-white'
                      }`}>{t.category}</span>
                   </div>
                   <p className={`text-xl md:text-2xl font-black transition-all ${
                     t.isDone 
                     ? 'text-emerald-950/20 line-through' 
                     : 'text-emerald-950 group-hover:text-white'
                   }`}>
                     {t.task}
                   </p>
                </div>

                <div className="flex gap-2">
                   <button onClick={() => removeTask(t.id)} className="p-5 text-emerald-950/10 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={24}/></button>
                </div>
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 islamic-pattern scale-150 pointer-events-none transition-opacity"></div>
              </div>
            ))}
          </div>

          <div className="p-10 md:p-14 bg-ivory rounded-[55px] border border-emerald-950/5 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-inner">
             <div className="flex items-center gap-8">
                <div className="w-18 h-18 bg-emerald-950 text-gold-400 rounded-[30px] flex items-center justify-center shadow-2xl shrink-0"><Sparkles size={40} /></div>
                <div>
                   <h4 className="text-2xl font-black text-emerald-950 tracking-tight leading-none uppercase">End-of-Day Check</h4>
                   <p className="text-emerald-950/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-3">Selesaikan semua tugas operasional sebelum log-off portal.</p>
                </div>
             </div>
             <button className="w-full lg:w-auto px-12 py-6 bg-emerald-950 text-white rounded-[25px] font-black text-[11px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-4xl active:scale-95">Finalize All Tasks</button>
          </div>

          {/* ATELIER ADD TASK MODAL */}
          {showAddTask && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-2xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[90vh]">
                {renderModalHeader("Create Task", "Internal Workflow Management", () => setShowAddTask(false))}
                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/30">
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Deskripsi Tugas</label>
                      <div className="relative">
                        {/* Fix: Use Type icon imported from lucide-react */}
                        <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                        <input 
                          type="text" 
                          value={newTask} 
                          onChange={(e) => setNewTask(e.target.value)}
                          className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" 
                          placeholder="Contoh: Follow up jamaah grup Mar-B..." 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {renderModalFooter(() => setShowAddTask(false), handleAddTask, "Confirm Task", false, Plus)}
              </div>
            </div>
          )}
        </div>
      );

    default: return null;
  }
};
