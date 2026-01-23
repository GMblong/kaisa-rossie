
import React, { useState } from 'react';
import { 
  Briefcase, Users, ShieldCheck, DollarSign, Target, PlaneTakeoff, 
  Truck, Sparkles, MessageSquare, Database, UserPlus, Edit, 
  Trash2, PieChart, Activity, Globe, Zap, AlertCircle, X, 
  Loader2, ChevronRight, CheckCircle2, Lock, Mail, UserCog,
  BarChart3, TrendingUp, Cpu, Server, ShieldAlert, Download
} from 'lucide-react';
import { StatCard } from './Shared';
import { UserRole } from '../../types';

interface StaffMember {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  status: 'ONLINE' | 'AWAY' | 'OFFLINE';
  lastActive: string;
}

export const SuperAdminView: React.FC<{ activeTab: string, setActiveTab: (t: string) => void, setViewingRole: (r: UserRole) => void }> = ({ activeTab, setActiveTab, setViewingRole }) => {
  // --- STATES ---
  const [staffList, setStaffList] = useState<StaffMember[]>([
    { id: "S-101", name: "Ahmad Finance", role: UserRole.FINANCE, email: "finance@kaisarossie.com", status: "ONLINE", lastActive: "Just now" },
    { id: "S-102", name: "Siti Sales", role: UserRole.SALES_AGENT, email: "siti.sales@kaisarossie.com", status: "AWAY", lastActive: "12m ago" },
    { id: "S-103", name: "Budi Ticketing", role: UserRole.TICKETING, email: "budi.t@kaisarossie.com", status: "OFFLINE", lastActive: "2h ago" },
    { id: "S-104", name: "Diana Content", role: UserRole.CONTENT_MANAGEMENT, email: "diana.c@kaisarossie.com", status: "ONLINE", lastActive: "5m ago" },
  ]);

  const [showAddStaff, setShowAddStaff] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: UserRole.SUPPORT_STAFF });

  // --- ACTIONS ---
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email) return;
    setIsProcessing(true);
    setTimeout(() => {
      const staff: StaffMember = {
        id: `S-${Date.now()}`,
        ...newStaff,
        status: 'OFFLINE',
        lastActive: 'Never'
      };
      setStaffList([staff, ...staffList]);
      setShowAddStaff(false);
      setIsProcessing(false);
      setNewStaff({ name: '', email: '', role: UserRole.SUPPORT_STAFF });
    }, 1500);
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

  const renderModalFooter = (onCancel: () => void, onSubmit: () => void, submitText: string, isSubmitting: boolean) => (
    <div className="p-8 md:p-14 border-t border-emerald-950/5 flex flex-col md:flex-row items-center justify-between gap-8 shrink-0 bg-white z-40 md:rounded-b-[60px]">
       <div className="flex items-center gap-5 text-emerald-950/40">
          <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center"><ShieldAlert size={22} className="text-gold-600" /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Otoritas Super Admin</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.1em]">Pemberian akses portal akan segera dikirimkan ke email staf.</p>
          </div>
       </div>
       <div className="flex gap-4 w-full md:w-auto">
          <button onClick={onCancel} className="flex-1 md:px-14 py-6 bg-ivory text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all border border-emerald-950/5 active:scale-95">Batal</button>
          <button 
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 md:px-20 py-6 bg-emerald-950 text-gold-400 rounded-[25px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-5xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin"/> : <Zap size={20} />}
            {isSubmitting ? 'Processing...' : submitText}
          </button>
       </div>
    </div>
  );

  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-10 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <StatCard label="Gross Revenue YTD" value="Rp 42.8B" icon={Briefcase} trend="+24.5%" />
            <StatCard label="Active User Base" value="1.2k" icon={Users} trend="Direct & B2B" />
            <StatCard label="System Integrity" value="High" icon={ShieldCheck} trend="Aman" />
          </div>

          <div className="bg-white p-8 sm:p-12 md:p-16 rounded-[60px] shadow-2xl border border-emerald-950/5 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-emerald-950/5 pb-10">
               <div className="space-y-2">
                 <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Divisional Portals</h3>
                 <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Akses Audit Operasional Per Divisi</p>
               </div>
               <div className="flex items-center gap-4 px-6 py-3 bg-ivory rounded-2xl border border-emerald-950/5 shadow-inner">
                  <Activity size={18} className="text-gold-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-950/50">Real-time Division Monitoring</span>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { role: UserRole.FINANCE, label: "Finance & Treasury", icon: DollarSign, color: "bg-emerald-100 text-emerald-700", desc: "Arus kas, invoice, & AR" },
                 { role: UserRole.SALES_AGENT, label: "Sales & CRM", icon: Target, color: "bg-blue-100 text-blue-700", desc: "Pipeline, leads, & komisi" },
                 { role: UserRole.TICKETING, label: "Air Operations", icon: PlaneTakeoff, color: "bg-gold-100 text-gold-700", desc: "Manifest, GSA, & Visa" },
                 { role: UserRole.PO_BUS, label: "Fleet Logistics", icon: Truck, color: "bg-purple-100 text-purple-700", desc: "Inventory bus & penjadwalan" },
                 { role: UserRole.CONTENT_MANAGEMENT, label: "Brand Studio", icon: Sparkles, color: "bg-orange-100 text-orange-700", desc: "Katalog & AI Copywriting" },
                 { role: UserRole.SUPPORT_STAFF, label: "Support Desk", icon: MessageSquare, color: "bg-gray-100 text-gray-700", desc: "Verifikasi berkas & inkuiri" },
               ].map((p, i) => (
                 <button 
                  key={i} 
                  onClick={() => { setViewingRole(p.role); setActiveTab('overview'); }} 
                  className="group p-10 bg-ivory rounded-[55px] border border-emerald-950/5 text-left hover:bg-emerald-950 transition-all duration-700 shadow-sm hover:shadow-4xl relative overflow-hidden"
                 >
                    <div className={`w-16 h-16 ${p.color} rounded-[22px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700 shadow-lg`}><p.icon size={32}/></div>
                    <div className="space-y-2 relative z-10">
                      <h4 className="text-2xl font-black text-emerald-950 group-hover:text-white tracking-tight transition-colors">{p.label}</h4>
                      <p className="text-emerald-950/40 text-[11px] font-medium leading-relaxed group-hover:text-white/40 transition-colors">{p.desc}</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-emerald-950/5 group-hover:border-white/10 flex items-center justify-between relative z-10">
                       <span className="text-[10px] font-black uppercase text-emerald-950/30 group-hover:text-gold-500 tracking-widest">Open Audit Portal</span>
                       <ChevronRight size={18} className="text-emerald-950/20 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 islamic-pattern scale-150 pointer-events-none transition-opacity"></div>
                 </button>
               ))}
            </div>
          </div>
        </div>
      );

    case 'users':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 border-b border-emerald-950/5 pb-10">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Access Control</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Manajemen Izin & Hak Akses Staf</p>
            </div>
            <button 
              onClick={() => setShowAddStaff(true)}
              className="w-full sm:w-auto bg-emerald-950 text-white px-10 py-5 rounded-3xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-gold-500 shadow-xl transition-all active:scale-95"
            >
              <UserPlus size={20}/> <span className="hidden sm:inline">Register Access</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {staffList.map((s) => (
              <div key={s.id} className="p-8 bg-ivory rounded-[50px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-8 shadow-sm">
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all font-black text-2xl shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-black text-emerald-950 group-hover:text-white leading-tight tracking-tight transition-colors">{s.name}</p>
                      <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm group-hover:bg-white/10 group-hover:text-white transition-all">
                        <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'ONLINE' ? 'bg-emerald-500' : s.status === 'AWAY' ? 'bg-gold-500' : 'bg-gray-400'}`}></div>
                        <span className="text-[8px] font-black uppercase tracking-widest">{s.status}</span>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2 transition-colors">{s.role} • {s.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto justify-end border-t md:border-t-0 border-emerald-950/5 pt-6 md:pt-0">
                   <div className="text-right hidden md:block">
                      <p className="text-[9px] font-black text-emerald-950/20 group-hover:text-white/20 uppercase tracking-widest">Last Activity</p>
                      <p className="text-xs font-bold text-emerald-950 group-hover:text-white transition-colors">{s.lastActive}</p>
                   </div>
                   <div className="flex gap-2">
                     <button className="p-4 bg-white rounded-[18px] group-hover:bg-white/10 group-hover:text-white transition-all shadow-md text-emerald-950 active:scale-90"><Edit size={20}/></button>
                     <button className="p-4 bg-white text-red-500 rounded-[18px] shadow-md hover:bg-red-500 hover:text-white transition-all active:scale-90"><Trash2 size={20}/></button>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* ATELIER REGISTER STAFF MODAL */}
          {showAddStaff && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-4xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[90vh]">
                {renderModalHeader("Grant Access", "Portal Permissions", () => setShowAddStaff(false))}
                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/30">
                  <div className="space-y-16 max-w-3xl mx-auto">
                    <div className="space-y-10">
                      <div className="flex items-center space-x-5 border-l-4 border-gold-500 pl-6">
                        <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><Lock size={24}/></div>
                        <div>
                          <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Security Identity</h5>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Identitas akun dan lingkup tanggung jawab</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Nama Lengkap Staf</label>
                          <div className="relative">
                            <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                            <input type="text" value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Contoh: Diana Atelier" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Email Bisnis Terverifikasi</label>
                          <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                            <input type="email" value={newStaff.email} onChange={(e) => setNewStaff({...newStaff, email: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="staff@kaisarossie.com" />
                          </div>
                        </div>
                        <div className="space-y-3 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Peran Divisi (Portal Scope)</label>
                          <div className="relative">
                            <UserCog className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                            <select value={newStaff.role} onChange={(e) => setNewStaff({...newStaff, role: e.target.value as UserRole})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 appearance-none shadow-sm cursor-pointer">
                              <option value={UserRole.FINANCE}>Finance Department</option>
                              <option value={UserRole.SALES_AGENT}>Sales & Marketing Agent</option>
                              <option value={UserRole.TICKETING}>Ticketing & Visa Ops</option>
                              <option value={UserRole.CONTENT_MANAGEMENT}>Content & Brand Manager</option>
                              <option value={UserRole.PO_BUS}>Fleet & Logistics</option>
                              <option value={UserRole.SUPPORT_STAFF}>Client Support Staff</option>
                            </select>
                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {renderModalFooter(() => setShowAddStaff(false), handleAddStaff, "Grant Access Now", isProcessing)}
              </div>
            </div>
          )}
        </div>
      );

    case 'analytics':
      return (
        <div className="space-y-10 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-xl space-y-12 border border-emerald-950/5">
               <div className="flex justify-between items-center">
                  <h4 className="text-3xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Revenue Split</h4>
                  <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center text-gold-600"><BarChart3 size={24}/></div>
               </div>
               <div className="h-80 flex items-center justify-center relative">
                  <PieChart size={240} className="text-emerald-950 opacity-[0.03]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-2">
                     <p className="text-5xl font-black text-emerald-950 tracking-tighter">65%</p>
                     <p className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Umrah Signature</p>
                  </div>
                  {/* Legend Bits */}
                  <div className="absolute bottom-0 w-full flex justify-between px-4">
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-950 rounded-full"></div><span className="text-[9px] font-black uppercase text-emerald-950/40">Umrah</span></div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gold-500 rounded-full"></div><span className="text-[9px] font-black uppercase text-emerald-950/40">Haji</span></div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-100 rounded-full"></div><span className="text-[9px] font-black uppercase text-emerald-950/40">Other</span></div>
                  </div>
               </div>
            </div>

            <div className="bg-emerald-950 p-12 md:p-16 rounded-[60px] shadow-2xl text-white space-y-12 relative overflow-hidden group">
               <div className="relative z-10 flex justify-between items-center">
                  <h4 className="text-3xl font-black tracking-tighter uppercase leading-none">Growth Curve</h4>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-gold-500"><TrendingUp size={24}/></div>
               </div>
               <div className="h-80 flex items-end justify-between px-4 pb-4 gap-4 relative z-10">
                  {[40, 65, 55, 80, 70, 95, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 group/bar relative">
                       <div className="w-full bg-white/10 rounded-t-2xl relative overflow-hidden h-full group-hover/bar:bg-white/20 transition-all duration-700" style={{ height: `${h}%` }}>
                          <div className="absolute bottom-0 w-full bg-gold-500 h-0 group-hover/bar:h-full transition-all duration-1000 delay-100"></div>
                       </div>
                       <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/30 uppercase">M-{i+1}</span>
                    </div>
                  ))}
               </div>
               <div className="absolute inset-0 opacity-10 islamic-pattern scale-[2.5] group-hover:rotate-12 transition-transform duration-[20s] pointer-events-none"></div>
            </div>
          </div>

          <div className="p-12 md:p-16 bg-ivory rounded-[60px] border border-emerald-950/5 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm">
             <div className="flex items-center gap-10">
                <div className="w-20 h-20 bg-emerald-950 text-gold-500 rounded-[35px] flex items-center justify-center shadow-3xl shrink-0"><Globe size={40} /></div>
                <div className="space-y-3">
                   <h4 className="text-2xl font-black text-emerald-950 tracking-tight leading-none uppercase">Global Reach Analytics</h4>
                   <p className="text-emerald-950/40 text-sm font-medium leading-relaxed max-w-lg">Pantau demografi jamaah dan tren destinasi dunia untuk kurasi paket musim depan yang lebih presisi.</p>
                </div>
             </div>
             <button className="w-full lg:w-auto px-16 py-6 bg-emerald-950 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-4xl active:scale-95">Open BI Dashboard</button>
          </div>
        </div>
      );

    case 'system':
      return (
        <div className="space-y-10 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { label: "Uptime", val: "99.98%", icon: Server },
               { label: "Latency", val: "42ms", icon: Zap },
               { label: "CPU Load", val: "12%", icon: Cpu },
               { label: "DB Health", val: "Optimal", icon: Database }
             ].map((s, i) => (
               <div key={i} className="p-8 bg-white rounded-[40px] border border-emerald-950/5 shadow-sm flex items-center gap-6">
                  <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center text-emerald-950"><s.icon size={22}/></div>
                  <div>
                     <p className="text-[8px] font-black uppercase text-emerald-950/30 tracking-widest">{s.label}</p>
                     <p className="text-xl font-black text-emerald-950 tracking-tighter">{s.val}</p>
                  </div>
               </div>
             ))}
          </div>

          <div className="bg-emerald-950 text-white p-12 md:p-16 rounded-[60px] font-mono text-[11px] min-h-[600px] overflow-hidden relative shadow-5xl group border border-white/5">
             <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] islamic-pattern scale-150 pointer-events-none group-hover:rotate-6 transition-transform duration-[15s]"></div>
             
             <div className="sticky top-0 bg-emerald-950/95 backdrop-blur-md pb-10 flex justify-between items-center z-10 border-b border-white/10 mb-10">
                <div className="flex items-center gap-5 text-gold-500">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center"><Database size={24}/></div>
                   <div>
                      <span className="font-black uppercase tracking-[0.4em] text-[10px]">Security Master Log</span>
                      <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-1">Atelier Enterprise Infrastructure</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                      <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gold-400">Live Infrastructure Feed</span>
                   </div>
                   <button className="p-3 bg-white/5 text-white/40 hover:text-white rounded-xl transition-all border border-white/10"><Download size={18}/></button>
                </div>
             </div>

             <div className="space-y-6 relative z-10">
                {[
                  { time: "14:20:01", tag: "SYSTEM", msg: "Kaisa Core Intelligence Engine v2.4.1 initialized..." },
                  { time: "14:21:45", tag: "AUTH", msg: "Privileged access granted for SuperAdmin session ID: AT-9901X" },
                  { time: "14:22:12", tag: "GATEWAY", msg: "BCA Virtual Account API handshake successful (latency: 14ms)" },
                  { time: "14:25:33", tag: "DB", msg: "Incremental sync of passenger_manifest completed (8.4k records)" },
                  { time: "14:30:10", tag: "SECURITY", msg: "End-to-end AES-256 key rotation cycle complete. Status: SECURE" },
                  { time: "14:32:05", tag: "AI", msg: "Generative AI Concierge processed 144 concurrent user queries." },
                  { time: "14:35:59", tag: "OPS", msg: "Bus Fleet Telemetry: Unit KR-SPR-02 reported arrival at Semarang HQ." }
                ].map((log, i) => (
                  <div key={i} className="flex gap-8 hover:bg-white/5 p-4 rounded-2xl transition-all border border-transparent hover:border-white/5 cursor-default group/log">
                     <span className="text-white/20 font-black shrink-0">{log.time}</span>
                     <span className={`font-black shrink-0 w-20 text-[9px] tracking-widest ${
                       log.tag === 'SECURITY' ? 'text-red-400' : log.tag === 'AUTH' ? 'text-gold-400' : 'text-emerald-400'
                     }`}>[{log.tag}]</span>
                     <span className="text-white/60 group-hover/log:text-white transition-colors">{log.msg}</span>
                  </div>
                ))}
             </div>

             <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-emerald-950 to-transparent pointer-events-none"></div>
          </div>
        </div>
      );

    default: return null;
  }
};
