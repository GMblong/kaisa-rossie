
import React, { useState } from 'react';
import { 
  Calendar, FileText, Clock, Sparkles, Users, TrendingUp, 
  ShieldCheck, CreditCard, Settings, BarChart3, Plus, Search, Filter, 
  MapPin, Activity, DollarSign, Briefcase, ChevronRight, AlertCircle,
  Bus, Image as ImageIcon, MessageSquare, UserCog, Database, ClipboardCheck, 
  LayoutDashboard, Truck, Target, Ticket, Handshake, PlaneTakeoff, ListChecks, 
  ArrowUpRight, Timer, Download, Upload, History, Wallet, User as UserIcon, 
  Camera, Globe, PieChart, UserPlus, Eye, Share2, MoreVertical, Bell, Layers,
  Check, Hash, RefreshCw, Landmark, Receipt, ArrowDownLeft, X, Moon, Star, Layers3,
  Monitor, Edit, UserMinus, ArrowLeft, Trash2, FileCheck, Plane, BriefcaseBusiness,
  Heart, Map as MapIcon, HelpCircle, HardDrive, Smartphone, Luggage, Navigation,
  FileSearch, Users2, ShieldAlert, LineChart, Cpu
} from 'lucide-react';
import { User, UserRole } from '../types';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewingRole, setViewingRole] = useState<UserRole | null>(null);

  const getMenuItems = () => {
    const common = [{ id: 'profile', icon: UserCog, label: 'Profil Atelier' }];
    const effectiveRole = user.role === UserRole.SUPER_ADMIN && viewingRole ? viewingRole : user.role;

    switch (effectiveRole) {
      case UserRole.SUPER_ADMIN:
        return [
          { id: 'overview', icon: LayoutDashboard, label: 'Command Center' },
          { id: 'users', icon: Users, label: 'Direktori Staf' },
          { id: 'analytics', icon: TrendingUp, label: 'Analitik Global' },
          { id: 'system', icon: Database, label: 'Log Sistem' },
          ...common
        ];
      case UserRole.FINANCE:
        return [
          { id: 'overview', icon: DollarSign, label: 'Dashboard Keuangan' },
          { id: 'payments', icon: CreditCard, label: 'Antrean Validasi' },
          { id: 'invoices', icon: FileText, label: 'Billing & AR' },
          { id: 'reports', icon: BarChart3, label: 'Laporan Laba Rugi' },
          ...common
        ];
      case UserRole.SALES_AGENT:
        return [
          { id: 'overview', icon: Target, label: 'Dashboard Sales' },
          { id: 'leads', icon: Users, label: 'Database Leads' },
          { id: 'commissions', icon: Wallet, label: 'Komisi Saya' },
          { id: 'marketing', icon: Sparkles, label: 'Marketing Kit' },
          ...common
        ];
      case UserRole.TICKETING:
        return [
          { id: 'overview', icon: PlaneTakeoff, label: 'Operasional Udara' },
          { id: 'manifest', icon: ListChecks, label: 'Manifes Pax' },
          { id: 'blocks', icon: Ticket, label: 'Blok Kursi GSA' },
          { id: 'visa', icon: ShieldCheck, label: 'Progress Visa' },
          ...common
        ];
      case UserRole.CONTENT_MANAGEMENT:
        return [
          { id: 'overview', icon: BriefcaseBusiness, label: 'Studio Konten' },
          { id: 'packages', icon: Layers, label: 'Manajer Katalog' },
          { id: 'media', icon: ImageIcon, label: 'Bank Visual' },
          { id: 'marketing', icon: Sparkles, label: 'AI Copywriter' },
          ...common
        ];
      case UserRole.PO_BUS:
        return [
          { id: 'overview', icon: Truck, label: 'Ops Armada' },
          { id: 'units', icon: Bus, label: 'Inventori Unit' },
          { id: 'drivers', icon: UserIcon, label: 'Database Kru' },
          { id: 'schedule', icon: Calendar, label: 'Jadwal Sewa' },
          ...common
        ];
      case UserRole.SUPPORT_STAFF:
        return [
          { id: 'overview', icon: MessageSquare, label: 'Service Desk' },
          { id: 'docs', icon: ClipboardCheck, label: 'Verifikasi Berkas' },
          { id: 'tasks', icon: Clock, label: 'Tugas Harian' },
          ...common
        ];
      default:
        return [
          { id: 'overview', icon: BarChart3, label: 'Trip Saya' },
          { id: 'bookings', icon: Calendar, label: 'Reservasi' },
          { id: 'documents', icon: FileText, label: 'Brankas Dokumen' },
          { id: 'finance', icon: CreditCard, label: 'Pembayaran' },
          ...common
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-ivory min-h-screen pb-32">
      {/* HEADER DINAMIS */}
      <section className="bg-emerald-950 pt-32 pb-24 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 islamic-pattern scale-110"></div>
        <div className="container-luxe relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-5 text-gold-400">
               <ShieldCheck size={20} />
               <div className="w-12 h-px bg-gold-500/30"></div>
               <p className="text-[11px] font-black uppercase tracking-[0.6em]">
                 {viewingRole ? `${viewingRole.replace('_', ' ')} AUDIT VIEW` : `${user.role.replace('_', ' ')} PORTAL`}
               </p>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.85] reveal-up">
              Salaam, <br /> <span className="text-gold-500 italic font-serif font-light">{user.name.split(' ')[0]}.</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-3xl p-6 rounded-[40px] border border-white/10 shadow-4xl w-full lg:w-auto reveal-up">
            <div className="w-20 h-20 rounded-[28px] bg-gold-500 flex items-center justify-center text-white font-black text-3xl shadow-2xl">
              {user.name.charAt(0)}
            </div>
            <div className="pr-12">
              <p className="text-xl font-black text-white mb-1">{user.name}</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">{viewingRole ? `Mode Audit Aktif` : user.email}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-luxe -mt-16 relative z-20 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3 space-y-6">
             {user.role === UserRole.SUPER_ADMIN && viewingRole && (
               <button 
                onClick={() => { setViewingRole(null); setActiveTab('overview'); }}
                className="w-full bg-gold-500 text-white p-6 rounded-[30px] font-black text-[10px] uppercase tracking-widest flex items-center justify-center space-x-4 shadow-xl hover:bg-emerald-950 transition-all mb-4"
               >
                 <ArrowLeft size={18} />
                 <span>Kembali ke Admin Hub</span>
               </button>
             )}
             <div className="bg-white p-6 md:p-8 rounded-[40px] md:rounded-[50px] border border-emerald-950/5 shadow-3xl flex lg:flex-col overflow-x-auto no-scrollbar gap-2 sticky top-24">
                {menuItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex-shrink-0 lg:w-full flex items-center space-x-4 p-4 rounded-[22px] font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                      activeTab === item.id ? 'bg-emerald-950 text-gold-400 shadow-xl scale-105' : 'text-emerald-950/30 hover:bg-ivory hover:text-emerald-950'
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* DYNAMIC CONTENT ROUTER */}
          <div className="lg:col-span-9 min-h-[60vh]">
            <RoleContentRouter 
              user={user} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              viewingRole={viewingRole} 
              setViewingRole={setViewingRole} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RoleContentRouter: React.FC<{ 
  user: User, 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  viewingRole: UserRole | null,
  setViewingRole: (role: UserRole | null) => void
}> = ({ user, activeTab, setActiveTab, viewingRole, setViewingRole }) => {
  
  const effectiveRole = user.role === UserRole.SUPER_ADMIN && viewingRole ? viewingRole : user.role;

  // --- 00. PORTAL PROFIL (GLOBAL) ---
  if (activeTab === 'profile') {
    return (
      <div className="bg-white rounded-[50px] p-12 md:p-20 border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-12">
           <div className="relative group">
              <div className="w-48 h-48 bg-ivory rounded-[50px] border-4 border-emerald-950/5 flex items-center justify-center overflow-hidden shadow-2xl">
                 <UserIcon size={80} className="text-emerald-950/10" />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-gold-500 text-white p-4 rounded-2xl shadow-xl hover:bg-emerald-950 transition-all"><Camera size={20} /></button>
           </div>
           <div className="text-center md:text-left space-y-4">
              <h2 className="text-5xl font-black text-emerald-950 tracking-tighter">{user.name}</h2>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                 <span className="bg-emerald-950/5 text-emerald-950/40 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{effectiveRole} Portal</span>
                 <span className="bg-gold-500/10 text-gold-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">ID Staf: {user.id}</span>
              </div>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-t border-emerald-950/5">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-2">Nama Lengkap Sesuai ID</label>
            <input type="text" defaultValue={user.name} className="w-full bg-ivory p-6 rounded-3xl border border-emerald-950/10 font-bold focus:border-gold-500 outline-none transition-all shadow-sm" />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-2">Email Bisnis @kaisarossie.com</label>
            <input type="email" defaultValue={user.email} className="w-full bg-ivory p-6 rounded-3xl border border-emerald-950/10 font-bold focus:border-gold-500 outline-none transition-all shadow-sm" />
          </div>
        </div>
        <button className="bg-emerald-950 text-white px-12 py-6 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-xl">Simpan Identitas Atelier</button>
      </div>
    );
  }

  // --- 01. SUPER ADMIN (COMMAND CENTER) ---
  if (effectiveRole === UserRole.SUPER_ADMIN) {
    switch (activeTab) {
      case 'overview': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Total Omzet Q1" value="Rp 24.5M" icon={Briefcase} trend="+18%" />
              <StatCard label="Total Pax Aktif" value="842" icon={Users} trend="Musim Umrah" />
              <StatCard label="Integritas Sistem" value="99.9%" icon={ShieldCheck} trend="Aman" />
           </div>
           <div className="bg-white p-12 rounded-[60px] shadow-2xl border border-emerald-950/5 space-y-12">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Gerbang Divisi Operasional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   { role: UserRole.FINANCE, label: "Keuangan & AR", icon: DollarSign, color: "bg-emerald-100 text-emerald-700" },
                   { role: UserRole.SALES_AGENT, label: "Sales & CRM", icon: Target, color: "bg-blue-100 text-blue-700" },
                   { role: UserRole.TICKETING, label: "Ops Udara & GSA", icon: PlaneTakeoff, color: "bg-gold-100 text-gold-700" },
                   { role: UserRole.PO_BUS, label: "Logistik Armada", icon: Truck, color: "bg-purple-100 text-purple-700" },
                   { role: UserRole.CONTENT_MANAGEMENT, label: "Studio Kreatif", icon: Sparkles, color: "bg-orange-100 text-orange-700" },
                   { role: UserRole.SUPPORT_STAFF, label: "Laboratorium Berkas", icon: MessageSquare, color: "bg-gray-100 text-gray-700" },
                 ].map((p, i) => (
                   <button key={i} onClick={() => { setViewingRole(p.role); setActiveTab('overview'); }} className="group p-8 bg-ivory rounded-[50px] border border-emerald-950/5 text-left hover:bg-emerald-950 transition-all duration-700 shadow-sm hover:shadow-2xl">
                      <div className={`w-14 h-14 ${p.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}><p.icon size={28}/></div>
                      <h4 className="text-xl font-black text-emerald-950 group-hover:text-white tracking-tight">{p.label}</h4>
                      <p className="text-emerald-950/30 text-[9px] font-bold uppercase mt-2 group-hover:text-gold-500">Akses Simulasi Staf →</p>
                   </button>
                 ))}
              </div>
           </div>
        </div>
      );
      case 'users': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5">
           <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Manajemen Direktori Staf</h3>
              <button className="bg-emerald-950 text-white px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center gap-4 hover:bg-gold-500 transition-all shadow-xl"><UserPlus size={18}/> Tambah Staf Baru</button>
           </div>
           <div className="space-y-4">
              {[
                { name: "Ahmad Finance", role: "FINANCE", status: "Aktif", email: "ahmad@kaisarossie.com" },
                { name: "Siti Sales", role: "SALES_AGENT", status: "Aktif", email: "siti@kaisarossie.com" },
                { name: "Budi Driver", role: "PO_BUS", status: "Sedang Tugas", email: "budi@kaisarossie.com" }
              ].map((s, i) => (
                <div key={i} className="p-8 bg-ivory rounded-[45px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700">
                   <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-emerald-950 text-gold-400 rounded-3xl flex items-center justify-center font-black text-xl group-hover:bg-gold-500 group-hover:text-white transition-all shadow-lg">{s.name.charAt(0)}</div>
                      <div><p className="text-xl font-black text-emerald-950 group-hover:text-white leading-none">{s.name}</p><p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2">{s.role} • {s.email}</p></div>
                   </div>
                   <div className="flex gap-2">
                     <button className="p-4 bg-emerald-950/5 group-hover:bg-white/10 group-hover:text-white rounded-2xl transition-all"><Edit size={18}/></button>
                     <button className="p-4 bg-red-50 text-red-600 rounded-2xl"><Trash2 size={18}/></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case 'analytics': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12">
                 <h4 className="text-2xl font-black text-emerald-950 tracking-tighter">Distribusi Pasar Global</h4>
                 <div className="h-80 flex items-center justify-center relative">
                    <PieChart size={180} className="text-emerald-950 opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center font-black text-3xl text-emerald-950">65% <span className="text-sm font-bold ml-2">Umrah</span></div>
                 </div>
              </div>
              <div className="bg-emerald-950 p-12 rounded-[60px] shadow-2xl text-white space-y-12">
                 <h4 className="text-2xl font-black tracking-tighter">Pertumbuhan Finansial YoY</h4>
                 <div className="h-80 flex items-end justify-between px-4 pb-4">
                    {[40, 65, 55, 80, 70, 95].map((h, i) => (
                      <div key={i} className="w-12 bg-gold-500 rounded-t-xl hover:bg-white transition-all cursor-pointer" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      );
      case 'system': return (
        <div className="bg-emerald-950 text-white p-12 rounded-[60px] font-mono text-xs h-[600px] overflow-hidden relative shadow-5xl animate-fade-in border border-white/5">
           <div className="sticky top-0 bg-emerald-950 pb-8 flex justify-between items-center z-10 border-b border-white/10 mb-8">
              <div className="flex items-center gap-4 text-gold-500">
                <Database size={24}/> <span className="font-black uppercase tracking-[0.4em]">Master Log Monitor</span>
              </div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div> <span className="text-[10px] font-black uppercase">Live Monitoring</span></div>
           </div>
           <div className="space-y-4 opacity-40 overflow-y-auto h-full no-scrollbar pb-32">
              <p className="text-gold-400">[SYSTEM] Kaisa Core Engine Booted v4.2.0...</p>
              <p>[AUTH] User session validated via JWT Cluster-1.</p>
              <p>[DB] Postgres Sync complete: 100% latency 4ms.</p>
              <p>[LOG] Pembayaran baru #PAY-99120 divalidasi oleh Finance.</p>
              <p>[API] Ticketing API call: /v3/manifest (200 OK).</p>
              <p>[SECURITY] AES-256 Rotation complete. Sistem Aman.</p>
              <p>[LOG] Paket Umrah Signature Ramadan diperbarui oleh Content Staf.</p>
              <p>[BUS] Unit KR-BUS-01 terdeteksi di koordinat Makkah-Madinah Hwy.</p>
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent pointer-events-none h-40 bottom-0"></div>
        </div>
      );
    }
  }

  // --- 02. FINANCE (KEUANGAN & BILLING) ---
  if (effectiveRole === UserRole.FINANCE) {
    switch (activeTab) {
      case 'overview': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Aset Likuid" value="Rp 8.24M" icon={Wallet} trend="+12%" />
              <StatCard label="Antrean Persetujuan" value="18 Item" icon={Clock} trend="Review Manual" />
              <StatCard label="Piutang (AR)" value="Rp 1.1M" icon={Receipt} trend="7 Overdue" />
           </div>
           <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Distribusi Arus Kas Masuk</h3>
              <div className="h-64 flex items-end justify-between gap-3">
                 {[60, 45, 85, 55, 90, 70, 80, 40, 65, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-emerald-950/5 rounded-t-2xl relative group overflow-hidden">
                       <div className="absolute bottom-0 w-full bg-emerald-950 group-hover:bg-gold-500 transition-all duration-700" style={{ height: `${h}%` }}></div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      );
      case 'payments': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Antrean Validasi Pembayaran</h3>
           <div className="space-y-4">
              {[
                { ref: "PAY-99120", name: "Abdullah Ahmad", amt: "Rp 15.000.000", bank: "BCA Transfer", date: "Hari ini 14:20" },
                { ref: "PAY-99882", name: "Siti Fatimah", amt: "Rp 42.500.000", bank: "Mandiri VA", date: "Hari ini 09:15" }
              ].map((p, i) => (
                <div key={i} className="p-8 bg-ivory rounded-[40px] flex justify-between items-center border border-emerald-950/5 group hover:bg-emerald-950 transition-all duration-700">
                   <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-950 shadow-lg group-hover:scale-110 transition-transform"><Landmark size={28}/></div>
                      <div><p className="text-xl font-black text-emerald-950 group-hover:text-white leading-tight">{p.name}</p><p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2">{p.ref} • {p.bank}</p></div>
                   </div>
                   <div className="flex items-center gap-8">
                      <div className="text-right">
                         <p className="text-xl font-black text-emerald-950 group-hover:text-white leading-none">{p.amt}</p>
                         <p className="text-[9px] font-black uppercase text-emerald-950/20 group-hover:text-white/20 mt-2">{p.date}</p>
                      </div>
                      <button className="bg-emerald-950 text-white p-5 rounded-2xl group-hover:bg-emerald-600 transition-all shadow-lg border border-white/10"><Check size={20}/></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case 'invoices': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Manajemen Billing & Piutang</h3>
              <button className="bg-emerald-950 text-white px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center gap-4 hover:bg-gold-500 transition-all shadow-2xl"><Plus size={18}/> Buat Invoice Baru</button>
           </div>
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-emerald-950/5">
                    <th className="pb-8 text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">ID Invoice</th>
                    <th className="pb-8 text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Pelanggan</th>
                    <th className="pb-8 text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Jumlah</th>
                    <th className="pb-8 text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Status</th>
                    <th className="pb-8 text-right">Aksi</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/5">
                 {[
                   { id: "INV-2024-001", user: "Ratna Sari", amt: "Rp 42.5jt", status: "Lunas", color: "text-emerald-600" },
                   { id: "INV-2024-042", user: "Dr. Gunawan", amt: "Rp 350jt", status: "Overdue", color: "text-red-500" }
                 ].map((inv, i) => (
                   <tr key={i} className="group hover:bg-ivory transition-all">
                      <td className="py-10 text-sm font-black text-emerald-950">{inv.id}</td>
                      <td className="py-10 text-sm font-bold text-emerald-950/60">{inv.user}</td>
                      <td className="py-10 text-sm font-black text-emerald-950">{inv.amt}</td>
                      <td className="py-10"><span className={`text-[10px] font-black uppercase tracking-widest ${inv.color}`}>{inv.status}</span></td>
                      <td className="py-10 text-right"><button className="p-4 bg-emerald-950/5 rounded-2xl hover:bg-emerald-950 hover:text-white transition-all"><Download size={18}/></button></td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      );
      case 'reports': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
           <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
              <h3 className="text-2xl font-black text-emerald-950 tracking-tighter">Analitik Laba Bersih</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-center p-8 bg-ivory rounded-3xl border border-emerald-950/5">
                    <div><p className="text-[10px] font-black uppercase text-emerald-950/30">Gross Margin</p><p className="text-3xl font-black text-emerald-950">Rp 1.4B</p></div>
                    <ArrowUpRight className="text-emerald-600" size={32} />
                 </div>
                 <div className="flex justify-between items-center p-8 bg-ivory rounded-3xl border border-emerald-950/5">
                    <div><p className="text-[10px] font-black uppercase text-emerald-950/30">Biaya Operasional</p><p className="text-3xl font-black text-emerald-950">Rp 420M</p></div>
                    <ArrowDownLeft className="text-red-600" size={32} />
                 </div>
              </div>
           </div>
           <div className="bg-emerald-950 text-white p-12 rounded-[60px] shadow-5xl space-y-12">
              <h3 className="text-2xl font-black tracking-tighter text-gold-500">Rekonsiliasi Bank Otomatis</h3>
              <div className="p-10 bg-white/5 border border-white/10 rounded-3xl space-y-8">
                 <p className="text-sm font-medium leading-relaxed opacity-60 italic">Sinkronisasi terakhir: 2 menit lalu dengan BCA, Mandiri, dan SNB (Saudi National Bank).</p>
                 <button className="w-full py-6 bg-gold-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-emerald-950 transition-all shadow-xl">Paksa Sinkron Sekarang</button>
              </div>
              <div className="flex items-center gap-4 text-white/40"><Cpu size={20}/> <span className="text-[9px] font-black uppercase tracking-widest">Powered by Kaisa AI Finance v4</span></div>
           </div>
        </div>
      );
    }
  }

  // --- 03. SALES AGENT (PIPELINE & CRM) ---
  if (effectiveRole === UserRole.SALES_AGENT) {
    switch (activeTab) {
      case 'overview': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Pipeline Potensial" value="Rp 1.2B" icon={TrendingUp} trend="+5% MoM" />
              <StatCard label="Prospek Panas" value="12" icon={Smartphone} trend="Segera Hubungi" />
              <StatCard label="Komisi Estimasi" value="Rp 8.5M" icon={Wallet} trend="Target Maret" />
           </div>
           <div className="bg-emerald-950 text-white p-12 rounded-[60px] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 islamic-pattern scale-150 group-hover:scale-125 transition-all duration-[4s]"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                 <div className="space-y-8 max-w-xl">
                    <h3 className="text-4xl font-black tracking-tighter leading-tight">Misi Penjualan: <br /><span className="text-gold-500 italic font-serif font-light">Konversi Maksimal.</span></h3>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-[35px] backdrop-blur-md">
                       <p className="text-base font-medium leading-relaxed opacity-80 italic">"Bp. Gunawan (Lead #882) telah membuka itinerary Masyair Luxury 3 kali hari ini. Hubungi sekarang untuk mengunci kuota terakhir Maret-25."</p>
                    </div>
                 </div>
                 <button className="bg-white text-emerald-950 px-12 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-4xl flex items-center gap-4 group">Buka CRM Leads <ArrowUpRight size={20}/></button>
              </div>
           </div>
        </div>
      );
      case 'leads': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Database Prospek CRM</h3>
              <button className="bg-emerald-950 text-white p-4 rounded-2xl hover:bg-gold-500 transition-all shadow-xl"><Plus size={18}/></button>
           </div>
           <div className="space-y-4">
              {[
                { name: "Bp. Syamsul", pkg: "Haji Furoda Elite", status: "HOT", last: "3 jam lalu" },
                { name: "Ibu Maya", pkg: "Spain Heritage Tour", status: "COLD", last: "2 hari lalu" },
                { name: "Dr. Gunawan", pkg: "Umrah Signature", status: "HOT", last: "12 menit lalu" }
              ].map((l, i) => (
                <div key={i} className="p-8 bg-ivory rounded-[50px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700">
                   <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-white rounded-[20px] flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all font-black text-xl shadow-md">{l.name.charAt(0)}</div>
                      <div><p className="text-xl font-black text-emerald-950 group-hover:text-white leading-tight">{l.name}</p><p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2">{l.pkg} • Terakhir interaksi {l.last}</p></div>
                   </div>
                   <div className="flex items-center gap-8">
                      <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${l.status === 'HOT' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{l.status}</span>
                      <button className="p-5 bg-emerald-950 text-white rounded-3xl group-hover:bg-gold-500 transition-all shadow-xl"><MessageSquare size={20}/></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case 'commissions': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Pusat Komisi & Pendapatan</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-12 bg-emerald-950 text-white rounded-[50px] space-y-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                 <div className="relative z-10"><p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Total Komisi Cair Q1</p><p className="text-6xl font-black text-gold-500 tracking-tighter">Rp 24.5jt</p></div>
                 <button className="w-full py-6 bg-white text-emerald-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-gold-500 hover:text-white transition-all relative z-10 shadow-xl">Tarik ke Rekening Utama</button>
                 <div className="absolute inset-0 opacity-10 islamic-pattern scale-150"></div>
              </div>
              <div className="space-y-6">
                 <p className="text-[11px] font-black uppercase tracking-widest text-emerald-950/30">Riwayat Pencairan</p>
                 {[
                   { date: "Februari 2024", amt: "Rp 8.2M", status: "Tuntas" },
                   { date: "Januari 2024", amt: "Rp 5.5M", status: "Tuntas" }
                 ].map((h, i) => (
                   <div key={i} className="p-8 bg-ivory rounded-3xl flex justify-between items-center border border-emerald-950/5">
                      <div><p className="text-lg font-black text-emerald-950">{h.date}</p><p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{h.status}</p></div>
                      <p className="text-xl font-black text-emerald-950">{h.amt}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      );
      case 'marketing': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Marketing Kit Atelier</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Flyer Umrah", icon: ImageIcon },
                { label: "Brosur Haji", icon: FileText },
                { label: "Asset Story IG", icon: Share2 },
                { label: "Daftar Harga", icon: Receipt }
              ].map((k, i) => (
                <button key={i} className="p-10 bg-ivory rounded-[45px] border border-emerald-950/5 flex flex-col items-center justify-center gap-6 hover:bg-emerald-950 group transition-all duration-700 shadow-sm">
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-md"><k.icon size={32}/></div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 group-hover:text-white/40">{k.label}</p>
                </button>
              ))}
           </div>
        </div>
      );
    }
  }

  // --- 04. TICKETING (OPERASIONAL UDARA & VISA) ---
  if (effectiveRole === UserRole.TICKETING) {
    switch (activeTab) {
      case 'overview': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Blok Kursi Aktif" value="1,240 Pax" icon={Ticket} trend="Musim Ramadan" />
              <StatCard label="Visa Terbit" value="98.2%" icon={ShieldCheck} trend="982/1000" />
              <StatCard label="Akurasi Manifes" value="100%" icon={ListChecks} trend="Terverifikasi" />
           </div>
           <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 border border-emerald-950/5 relative overflow-hidden">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Alert Operasional GSA</h3>
              <div className="space-y-6">
                 {[
                   { msg: "SV-817: Berkas dikunci oleh Support Staff (Paspor Abdullah Ahmad)", status: "Kritis" },
                   { msg: "QR-957: Batas waktu blok kursi sisa 48 jam", status: "Peringatan" }
                 ].map((a, i) => (
                   <div key={i} className="p-8 bg-ivory rounded-[45px] border border-red-500/10 flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700">
                      <div className="flex items-center gap-6">
                         <div className={`w-3 h-3 rounded-full ${a.status === 'Kritis' ? 'bg-red-500' : 'bg-gold-500'}`}></div>
                         <p className="font-black text-emerald-950 group-hover:text-white leading-tight">{a.msg}</p>
                      </div>
                      <span className="text-[10px] font-black text-emerald-950/30 group-hover:text-white/30 uppercase tracking-widest">{a.status}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      );
      case 'manifest': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Pusat Manifes Penumpang</h3>
              <div className="flex gap-4">
                 <button className="bg-ivory border border-emerald-950/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-950 hover:text-white transition-all"><Download size={18}/> Ekspor CSV</button>
                 <button className="bg-emerald-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl hover:bg-gold-500 transition-all"><Upload size={18}/> Sinkron ke PO Bus</button>
              </div>
           </div>
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-emerald-950/5">
                    <th className="pb-8 text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Nama Jamaah</th>
                    <th className="pb-8 text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Kode PNR</th>
                    <th className="pb-8 text-[11px] font-black text-emerald-950/30 uppercase tracking-[0.3em]">Status Berkas</th>
                    <th className="pb-8 text-right">Aksi</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/5">
                 {[
                   { name: "Abdullah Ahmad", pnr: "XQ992Y", status: "Verified by Support", color: "text-emerald-600" },
                   { name: "Gunawan Pratama", pnr: "LPP02X", status: "Review Needed", color: "text-gold-600" }
                 ].map((p, i) => (
                   <tr key={i} className="group hover:bg-ivory transition-all">
                      <td className="py-10 text-sm font-black text-emerald-950 tracking-tight">{p.name}</td>
                      <td className="py-10 text-[11px] font-black text-gold-600 uppercase tracking-[0.3em]">{p.pnr}</td>
                      <td className="py-10"><span className={`text-[10px] font-black uppercase tracking-widest ${p.color}`}>{p.status}</span></td>
                      <td className="py-10 text-right"><button className="p-4 bg-emerald-950/5 rounded-2xl hover:bg-emerald-950 hover:text-white transition-all shadow-sm"><Edit size={16}/></button></td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      );
      case 'blocks': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Inventori Blok Kursi (Flight)</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { airline: "Saudi Arabian", flight: "SV-817", route: "CGK-JED", used: 45, total: 50 },
                { airline: "Qatar Airways", flight: "QR-957", route: "CGK-DOH", used: 12, total: 45 }
              ].map((f, i) => (
                <div key={i} className="p-10 bg-ivory rounded-[40px] border border-emerald-950/5 space-y-8 group hover:bg-emerald-950 transition-all duration-700 shadow-sm">
                   <div className="flex justify-between items-start">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-950 shadow-md group-hover:bg-gold-500 group-hover:text-white transition-all"><Plane size={28}/></div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-emerald-950 group-hover:text-white">{f.flight}</p>
                        <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-gold-400">{f.airline}</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest group-hover:text-white/40"><span>Penggunaan Kursi</span><span>{f.used}/{f.total}</span></div>
                      <div className="w-full h-3 bg-emerald-950/5 rounded-full overflow-hidden border border-emerald-950/5">
                         <div className="h-full bg-gold-500 transition-all duration-1000" style={{ width: `${(f.used/f.total)*100}%` }}></div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case 'visa': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Pelacak Progress Visa</h3>
           <div className="space-y-4">
              {[
                { name: "Sulaiman Arifin", pkg: "Haji Furoda", status: "Visa Terbit", step: 3 },
                { name: "Ratna Sari", pkg: "Umrah Signature", status: "Fase Biometrik", step: 2 },
                { name: "Gunawan Pratama", pkg: "Umrah Signature", status: "Review Berkas", step: 1 }
              ].map((v, i) => (
                <div key={i} className="p-10 bg-ivory rounded-[50px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700 shadow-sm">
                   <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-white rounded-[25px] flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all"><ShieldCheck size={28}/></div>
                      <div><p className="text-xl font-black text-emerald-950 group-hover:text-white leading-tight">{v.name}</p><p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2">{v.pkg} • {v.status}</p></div>
                   </div>
                   <div className="flex gap-3">
                      {[1,2,3].map(s => (
                        <div key={s} className={`w-12 h-2 rounded-full ${s <= v.step ? 'bg-gold-500' : 'bg-emerald-950/5 group-hover:bg-white/10'}`}></div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
    }
  }

  // --- 05. CONTENT MANAGEMENT (CREATIVE STUDIO) ---
  if (effectiveRole === UserRole.CONTENT_MANAGEMENT) {
    switch (activeTab) {
      case 'overview': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Katalog Aktif" value="14" icon={Layers} trend="Koleksi Live" />
              <StatCard label="Pustaka Visual" value="420 File" icon={ImageIcon} trend="+12 Baru" />
              <StatCard label="AI Task" value="Selesai" icon={Sparkles} trend="Copy Generated" />
           </div>
           <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-10 border border-emerald-950/5">
              <h3 className="text-2xl font-black text-emerald-950 tracking-tighter uppercase">Antrean Studio Kreatif</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-10 bg-ivory rounded-[45px] flex flex-col justify-between items-start space-y-6 group hover:bg-emerald-950 transition-all duration-700 shadow-sm">
                    <div><p className="text-[10px] font-black uppercase text-emerald-950/30 mb-2 group-hover:text-gold-500">Tugas Prioritas</p><p className="text-xl font-black text-emerald-950 group-hover:text-white leading-tight">Perbarui visual itinerary paket 'Spain Muslim Heritage' v2.</p></div>
                    <button className="bg-emerald-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 transition-all shadow-md">Buka Editor Studio</button>
                 </div>
                 <div className="p-10 bg-emerald-950 text-white rounded-[45px] flex items-center justify-between shadow-4xl relative overflow-hidden group shadow-xl">
                    <div className="relative z-10"><p className="text-3xl font-black tracking-tighter">Kaisa AI Studio</p><p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">Assistant Ready</p></div>
                    <Sparkles size={60} className="text-gold-500 animate-pulse-slow relative z-10 group-hover:scale-125 transition-transform" />
                    <div className="absolute inset-0 opacity-10 islamic-pattern scale-150 group-hover:rotate-12 transition-transform"></div>
                 </div>
              </div>
           </div>
        </div>
      );
      case 'packages': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Manajer Katalog Persediaan</h3>
              <button className="bg-emerald-950 text-white px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center gap-4 hover:bg-gold-500 transition-all shadow-xl"><Plus size={18}/> Buat Paket Baru</button>
           </div>
           <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Umrah Signature Ramadan", cat: "UMRAH", status: "Tayang", img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=200" },
                { title: "Europe Heritage Tour", cat: "TOUR", status: "Draf", img: "https://images.unsplash.com/photo-1543783232-af9942f4a472?w=200" }
              ].map((p, i) => (
                <div key={i} className="p-8 bg-ivory rounded-[50px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700 shadow-sm">
                   <div className="flex items-center gap-8">
                      <div className="w-20 h-20 bg-white rounded-3xl overflow-hidden shadow-md group-hover:scale-110 transition-transform"><img src={p.img} className="w-full h-full object-cover"/></div>
                      <div><p className="text-xl font-black text-emerald-950 group-hover:text-white leading-tight">{p.title}</p><p className="text-[9px] font-bold text-emerald-950/30 uppercase tracking-widest mt-1 group-hover:text-gold-400">{p.cat} Signature Collection</p></div>
                   </div>
                   <div className="flex gap-2">
                     <button className="p-4 bg-emerald-950/5 group-hover:bg-white/10 group-hover:text-white rounded-2xl transition-all"><Edit size={18}/></button>
                     <button className="p-4 bg-emerald-950/5 group-hover:bg-white/10 group-hover:text-white rounded-2xl transition-all"><Eye size={18}/></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case 'media': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Pustaka Aset Visual</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="aspect-square bg-ivory rounded-[35px] overflow-hidden group relative cursor-pointer shadow-sm border border-emerald-950/5">
                   <img src={`https://images.unsplash.com/photo-${1590000000000+i}?w=400`} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                   <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white text-emerald-950 p-4 rounded-2xl"><Download size={20}/></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case 'marketing': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Kaisa AI Copywriter Studio</h3>
           <div className="p-12 bg-ivory rounded-[50px] border border-emerald-950/5 space-y-12 shadow-sm">
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-950/30">Target Paket</label>
                 <select className="w-full bg-white p-6 rounded-2xl border border-emerald-950/5 font-bold outline-none">
                    <option>Umrah Signature Ramadan</option>
                    <option>Haji Furoda Elite</option>
                 </select>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-950/30">Tone Suara</label>
                 <div className="flex gap-4">
                    <button className="px-8 py-3 bg-emerald-950 text-white rounded-full text-[9px] font-black uppercase tracking-widest">Sangat Mewah</button>
                    <button className="px-8 py-3 bg-white border border-emerald-950/5 text-emerald-950/40 rounded-full text-[9px] font-black uppercase tracking-widest">Spiritual & Khidmat</button>
                 </div>
              </div>
              <button className="w-full py-8 bg-emerald-950 text-gold-500 rounded-3xl font-black text-[12px] uppercase tracking-[0.5em] shadow-xl hover:bg-gold-500 hover:text-white transition-all">Generate Iklan AI</button>
           </div>
        </div>
      );
    }
  }

  // --- 06. PO BUS (LOGISTIK & ARMADA) ---
  if (effectiveRole === UserRole.PO_BUS) {
    switch (activeTab) {
      case 'overview': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Unit Siap Pool" value="14" icon={Bus} trend="Optimal" />
              <StatCard label="Trip Berjalan" value="6" icon={Navigation} trend="Live Tracking" />
              <StatCard label="Servis Berikutnya" value="2" icon={Settings} trend="Maintenance" />
           </div>
           <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-10 border border-emerald-950/5">
              <h3 className="text-2xl font-black text-emerald-950 tracking-tighter uppercase">Telemetri Armada Global</h3>
              <div className="aspect-[21/9] bg-ivory rounded-[50px] border border-emerald-950/10 flex items-center justify-center relative overflow-hidden group">
                 <Globe size={100} className="text-emerald-950/5 group-hover:scale-125 transition-transform duration-[20s]"/>
                 <div className="absolute inset-0 opacity-10 islamic-pattern scale-150"></div>
                 <div className="absolute top-1/4 left-1/4 flex flex-col items-center animate-bounce">
                    <div className="px-4 py-2 bg-emerald-950 text-gold-400 rounded-xl shadow-2xl text-[8px] font-black border border-white/10">KR-BUS-01 (Makkah)</div>
                    <div className="w-px h-8 bg-emerald-950"></div>
                 </div>
                 <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center animate-bounce delay-1000">
                    <div className="px-4 py-2 bg-gold-500 text-white rounded-xl shadow-2xl text-[8px] font-black border border-white/10">KR-SPR-02 (Jeddah)</div>
                    <div className="w-px h-8 bg-gold-500"></div>
                 </div>
              </div>
           </div>
        </div>
      );
      case 'units': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Inventori Unit Armada</h3>
              <button className="bg-emerald-950 text-white px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center gap-4 hover:bg-gold-500 transition-all shadow-xl"><Plus size={18}/> Tambah Unit Baru</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { id: "KR-BUS-01", type: "Mercedes 1626 / Dreamer", cap: "45 Kursi Eksekutif", status: "Tersedia" },
                { id: "KR-SPR-02", type: "Sprinter / VVIP Private", cap: "11 Kursi VVIP", status: "Sedang Trip" }
              ].map((u, i) => (
                <div key={i} className="p-10 bg-ivory rounded-[50px] border border-emerald-950/5 space-y-8 group hover:bg-emerald-950 transition-all duration-700 shadow-sm">
                   <div className="flex justify-between items-start">
                      <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all"><Bus size={36}/></div>
                      <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${u.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold-100 text-gold-700'}`}>{u.status}</span>
                   </div>
                   <div><h4 className="text-4xl font-black text-emerald-950 group-hover:text-white tracking-tighter leading-none">{u.id}</h4><p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] mt-3 group-hover:text-gold-400">{u.type} • {u.cap}</p></div>
                </div>
              ))}
           </div>
        </div>
      );
      case 'drivers': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Database Kru & Pengemudi</h3>
           <div className="space-y-4">
              {[
                { name: "Pak Jajang", unit: "KR-BUS-01", phone: "0812...", status: "On-Duty" },
                { name: "Pak Ruslan", unit: "KR-SPR-02", phone: "0811...", status: "Standby" }
              ].map((d, i) => (
                <div key={i} className="p-8 bg-ivory rounded-[40px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700 shadow-sm border border-emerald-950/5">
                   <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-md font-black text-xl">{d.name.charAt(4)}</div>
                      <div><p className="text-xl font-black text-emerald-950 group-hover:text-white leading-tight">{d.name}</p><p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-gold-400 mt-2">{d.unit} • WhatsApp: {d.phone}</p></div>
                   </div>
                   <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${d.status === 'On-Duty' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold-100 text-gold-700'}`}>{d.status}</span>
                </div>
              ))}
           </div>
        </div>
      );
      case 'schedule': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Kalender Sewa & Penjemputan</h3>
           <div className="grid grid-cols-7 gap-4">
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} className={`aspect-square rounded-2xl border flex flex-col items-center justify-center relative group cursor-pointer transition-all ${[5,12,18].includes(i+1) ? 'bg-emerald-950 border-gold-500' : 'bg-ivory border-emerald-950/5'}`}>
                   <span className={`text-xs font-black ${[5,12,18].includes(i+1) ? 'text-gold-500' : 'text-emerald-950/20'}`}>{i+1}</span>
                   {[5,12,18].includes(i+1) && <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>}
                </div>
              ))}
           </div>
        </div>
      );
    }
  }

  // --- 07. SUPPORT STAFF (SERVICE DESK) ---
  if (effectiveRole === UserRole.SUPPORT_STAFF) {
    switch (activeTab) {
      case 'overview': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StatCard label="Inbox Verifikasi" value="28 Item" icon={ClipboardCheck} trend="Menunggu Review" />
              <StatCard label="Tiket Helpdesk" value="12 Open" icon={MessageSquare} trend="Respons Rata2: 4m" />
           </div>
           <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-10 border border-emerald-950/5">
              <h3 className="text-2xl font-black text-emerald-950 tracking-tighter uppercase">Inkuiri Jamaah Terbaru</h3>
              <div className="space-y-6">
                 {[
                   { user: "Hj. Ratna Sari", issue: "Pembaruan Paspor (Grup Ramadan)", status: "URGENT", time: "12m lalu" },
                   { user: "Bp. Syamsul Arifin", issue: "Tanya Jadwal Manasik", status: "NORMAL", time: "1j lalu" }
                 ].map((t, i) => (
                   <div key={i} className="p-8 bg-ivory rounded-[50px] flex flex-col md:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-6 shadow-sm">
                      <div className="flex items-center gap-8 w-full md:w-auto">
                         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-md"><MessageSquare size={28}/></div>
                         <div><p className="text-xl font-black text-emerald-950 group-hover:text-white leading-tight">{t.user}</p><p className="text-[10px] font-bold text-emerald-950/30 uppercase group-hover:text-gold-400 mt-2">{t.issue} • {t.time}</p></div>
                      </div>
                      <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${t.status === 'URGENT' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>{t.status}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      );
      case 'docs': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Laboratorium Verifikasi Dokumen</h3>
           <div className="space-y-4">
              {[
                { name: "Abdullah Ahmad", doc: "Scan Paspor Asli", date: "10 Mar", status: "Pending" },
                { name: "Siti Fatimah", doc: "KTP & Kartu Keluarga", date: "12 Mar", status: "Verified" }
              ].map((d, i) => (
                <div key={i} className="p-10 bg-ivory rounded-[50px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700 shadow-sm border border-emerald-950/5">
                   <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-white rounded-[20px] flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-xl"><FileCheck size={32}/></div>
                      <div><p className="text-2xl font-black text-emerald-950 group-hover:text-white tracking-tight leading-tight">{d.name}</p><p className="text-[10px] font-bold text-emerald-950/30 uppercase group-hover:text-gold-400 mt-2">{d.doc} • Diunggah {d.date}</p></div>
                   </div>
                   <div className="flex gap-4">
                      <button className="bg-white text-emerald-950 p-5 rounded-2xl hover:bg-gold-500 hover:text-white transition-all shadow-md"><Eye size={20}/></button>
                      <button className={`p-5 rounded-2xl transition-all shadow-lg border border-white/10 ${d.status === 'Verified' ? 'bg-emerald-600 text-white' : 'bg-emerald-950 text-white group-hover:bg-emerald-600'}`}>{d.status === 'Verified' ? <Check size={20}/> : <Plus size={20}/>}</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case 'tasks': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Tugas Harian Staf Support</h3>
           <div className="space-y-6">
              {[
                { task: "Validasi Manifes Grup Umrah Mar-25", done: true },
                { task: "Hubungi Provider Visa Saudi (Urgent)", done: false },
                { task: "Siapkan Berkas Manasik Besok", done: false }
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-6 p-8 bg-ivory rounded-[35px] shadow-sm border border-emerald-950/5">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${t.done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-emerald-950/10'}`}>
                      {t.done && <Check size={20}/>}
                   </div>
                   <p className={`text-lg font-black tracking-tight ${t.done ? 'text-emerald-950/20 line-through' : 'text-emerald-950'}`}>{t.task}</p>
                </div>
              ))}
           </div>
        </div>
      );
    }
  }

  // --- 08. CUSTOMER (PERSONAL PORTAL) ---
  if (effectiveRole === UserRole.CUSTOMER) {
    switch (activeTab) {
      case 'overview': return (
        <div className="space-y-10 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Hitung Mundur" value="18 Hari" icon={Timer} trend="Persiapan Akhir" />
              <StatCard label="Progress Berkas" value="5 / 6" icon={ClipboardCheck} trend="Satu Lagi" />
              <StatCard label="Sisa Pelunasan" value="Rp 25.0M" icon={Wallet} trend="Invoice #882" />
           </div>
           <div className="bg-emerald-950 rounded-[70px] p-12 md:p-20 text-white relative overflow-hidden group shadow-5xl border border-white/5">
              <div className="absolute inset-0 opacity-20 islamic-pattern scale-150 rotate-12"></div>
              <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800" className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20 group-hover:scale-110 transition-transform duration-[15s] hidden lg:block" />
              <div className="relative z-10 space-y-10 max-w-2xl">
                 <div className="inline-block px-8 py-3 bg-white/5 border border-white/20 rounded-full text-gold-400 text-[10px] font-black uppercase tracking-[0.5em]">Perjalanan Suci</div>
                 <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">Umrah <br /> <span className="text-gold-500 italic font-serif font-light">Signature.</span></h2>
                 <p className="text-white/40 font-medium text-lg italic">"Bersiaplah menyambut panggilan-Nya, biarkan kami menjaga kenyamanan ibadah Anda."</p>
                 <button onClick={() => setActiveTab('bookings')} className="bg-white text-emerald-950 px-16 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-4xl flex items-center gap-4 group">Lihat Itinerary Lengkap <ArrowUpRight size={18}/></button>
              </div>
           </div>
        </div>
      );
      case 'bookings': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Daftar Reservasi Saya</h3>
           <div className="p-12 bg-ivory rounded-[60px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 shadow-sm">
              <div className="space-y-6">
                 <h4 className="text-4xl font-black text-emerald-950 group-hover:text-white tracking-tighter leading-none">Umrah Signature Ramadan</h4>
                 <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-3 text-emerald-950/40 group-hover:text-white/40"><MapPin size={16}/> <span className="text-[10px] font-black uppercase tracking-widest">Makkah & Madinah Tier 1</span></div>
                    <div className="flex items-center gap-3 text-emerald-950/40 group-hover:text-white/40"><Calendar size={16}/> <span className="text-[10px] font-black uppercase tracking-widest">25 Mar - 05 Apr 2024</span></div>
                 </div>
              </div>
              <div className="mt-8 md:mt-0 flex flex-col items-center md:items-end gap-6">
                 <span className="px-8 py-3 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Status: Validasi Visa</span>
                 <button className="bg-emerald-950 text-white p-6 rounded-3xl group-hover:bg-gold-500 transition-all shadow-2xl"><ChevronRight size={32}/></button>
              </div>
           </div>
        </div>
      );
      case 'documents': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <div className="flex justify-between items-center">
              <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Brankas Dokumen Saya</h3>
              <p className="text-[11px] font-black text-emerald-950/20 uppercase tracking-[0.4em]">Enkripsi Aman Atelier</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { name: "Paspor Asli (Halaman Depan)", status: "Verified", icon: ShieldCheck },
                { name: "Kartu Vaksin Meningitis", status: "Perlu Upload", icon: Upload },
                { name: "Scan E-KTP & KK", status: "Verified", icon: ShieldCheck },
                { name: "Pasfoto 4x6 (BG Putih)", status: "Perlu Upload", icon: Upload }
              ].map((d, i) => (
                <div key={i} className="p-12 bg-ivory rounded-[50px] border border-emerald-950/5 space-y-8 group hover:border-gold-500 transition-all shadow-sm">
                   <div className="flex justify-between items-start">
                      <div className="w-18 h-18 bg-white rounded-[30px] flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-xl"><d.icon size={32}/></div>
                      <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${d.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold-100 text-gold-700'}`}>{d.status}</span>
                   </div>
                   <h4 className="text-2xl font-black text-emerald-950 tracking-tight leading-none">{d.name}</h4>
                   <button className="w-full py-6 bg-emerald-950 text-white rounded-[25px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 transition-all shadow-xl">{d.status === 'Verified' ? 'Lihat Dokumen' : 'Unggah Sekarang'}</button>
                </div>
              ))}
           </div>
        </div>
      );
      case 'finance': return (
        <div className="bg-white p-12 rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5">
           <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Status Settlement Perjalanan</h3>
           <div className="p-16 bg-ivory rounded-[70px] border border-emerald-950/5 space-y-16 relative overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
                 <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-950/30">Total Kontrak Perjalanan</p>
                    <p className="text-7xl font-black text-emerald-950 tracking-tighter leading-none">Rp 42.5jt</p>
                 </div>
                 <div className="text-center md:text-right space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-950/30">Telah Disetujui (Finance)</p>
                    <p className="text-4xl font-black text-emerald-600 tracking-tight leading-none">Rp 17.5jt</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.4em] text-emerald-950/40"><span>Progres Pelunasan</span><span>42% Tuntas</span></div>
                 <div className="w-full h-5 bg-emerald-950/5 rounded-full overflow-hidden border border-emerald-950/5 shadow-inner">
                    <div className="h-full bg-gold-500 transition-all duration-[3s] shadow-2xl" style={{ width: '42%' }}></div>
                 </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8 pt-6">
                 <button className="flex-1 bg-emerald-950 text-white py-8 rounded-[30px] font-black text-[12px] uppercase tracking-[0.5em] hover:bg-gold-500 transition-all shadow-5xl group">Konfirmasi Bayar <ArrowUpRight size={22} className="inline ml-3"/></button>
                 <button className="flex-1 bg-white border border-emerald-950/10 text-emerald-950 py-8 rounded-[30px] font-black text-[12px] uppercase tracking-[0.5em] hover:bg-ivory transition-all shadow-sm">Unduh E-Invoice</button>
              </div>
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none"><Receipt size={200} /></div>
           </div>
        </div>
      );
    }
  }

  // FALLBACK VIEW
  return (
    <div className="bg-white rounded-[70px] p-32 text-center border border-emerald-950/5 shadow-2xl animate-fade-in flex flex-col items-center justify-center space-y-8">
      <div className="w-32 h-32 bg-emerald-950/5 rounded-[45px] flex items-center justify-center text-emerald-950/10"><Layers3 size={64} strokeWidth={1} /></div>
      <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Workspace Divisi Atelier</h3>
      <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-[0.6em] max-w-sm mx-auto leading-relaxed">Modul ini sedang disinkronkan dengan Command Center. Silakan gunakan navigasi samping untuk mengakses data operasional.</p>
    </div>
  );
};

// --- REUSABLE STAT CARD ---
const StatCard: React.FC<{ label: string, value: string, icon: any, trend: string }> = ({ label, value, icon: Icon, trend }) => (
  <div className="bg-white p-12 rounded-[55px] border border-emerald-950/5 shadow-xl group hover:border-gold-500 transition-all duration-1000 overflow-hidden relative">
    <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
      <div className="w-14 h-14 bg-emerald-950/5 rounded-[22px] flex items-center justify-center text-emerald-950 group-hover:bg-emerald-950 group-hover:text-gold-400 transition-all duration-700">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-4xl font-black text-emerald-950 tracking-tighter mb-2 group-hover:translate-x-1 transition-transform">{value}</p>
        <p className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.4em] mb-6">{label}</p>
        <div className="h-px w-full bg-emerald-950/5 mb-6 group-hover:bg-gold-500/20 transition-colors"></div>
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${trend.includes('+') || trend.includes('Optimal') || trend.includes('Verified') || trend.includes('Aktif') || trend.includes('Tuntas') || trend.includes('Musim') || trend.includes('Aman') || trend.includes('Terverifikasi') ? 'bg-emerald-500' : 'bg-gold-500'}`}></div>
          <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${trend.includes('+') || trend.includes('Optimal') || trend.includes('Verified') || trend.includes('Aktif') || trend.includes('Tuntas') || trend.includes('Musim') || trend.includes('Aman') || trend.includes('Terverifikasi') ? 'text-emerald-700' : 'text-gold-600'}`}>{trend}</p>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-6 -right-6 opacity-[0.02] group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000 text-emerald-950 pointer-events-none">
       <Icon size={180} strokeWidth={1} />
    </div>
  </div>
);
