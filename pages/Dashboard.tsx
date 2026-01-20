
import React, { useState } from 'react';
import { 
  Calendar, CheckCircle, FileText, Clock, Sparkles, Users, TrendingUp, 
  ShieldAlert, CheckCircle2, CreditCard, Settings, LogOut,
  BarChart3, Plus, Search, Filter, ArrowRight, MapPin, 
  Activity, DollarSign, Briefcase, ChevronRight, AlertCircle,
  Smartphone, Plane, ShieldCheck, Compass, Info, Bus, Image as ImageIcon,
  MessageSquare, UserCog, Database, ClipboardCheck, LayoutDashboard, Truck,
  Target, Ticket, Handshake, PlaneTakeoff, ListChecks, ArrowUpRight, Timer,
  Download, Upload, History, Wallet, User as UserIcon, Camera, Map, Globe,
  PieChart, Filter as FilterIcon, UserPlus, FileDown, ExternalLink, Briefcase as BriefcaseIcon,
  Trash2, Edit, Eye, Share2, MoreVertical, Bell, PlayCircle, Layers,
  Check, Hash, UserMinus, HardDrive, RefreshCw, Landmark, Receipt,
  ArrowDownLeft, X, Moon, Star
} from 'lucide-react';
import { User, UserRole } from '../types';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getMenuItems = () => {
    const common = [{ id: 'profile', icon: UserCog, label: 'Profil Atelier' }];
    
    switch (user.role) {
      case UserRole.SUPER_ADMIN:
        return [
          { id: 'overview', icon: LayoutDashboard, label: 'Pusat Komando' },
          { id: 'users', icon: Users, label: 'Manajemen Staf' },
          { id: 'analytics', icon: TrendingUp, label: 'Analitik Global' },
          { id: 'system', icon: Database, label: 'Log Sistem' },
          ...common
        ];
      case UserRole.FINANCE:
        return [
          { id: 'overview', icon: DollarSign, label: 'Dashboard Keuangan' },
          { id: 'payments', icon: CreditCard, label: 'Validasi Bayar' },
          { id: 'invoices', icon: FileText, label: 'Manajemen Invoice' },
          { id: 'reports', icon: BarChart3, label: 'Laporan Laba' },
          ...common
        ];
      case UserRole.SALES_AGENT:
        return [
          { id: 'overview', icon: Target, label: 'Pipeline Sales' },
          { id: 'leads', icon: Users, label: 'Prospek Jamaah' },
          { id: 'commissions', icon: DollarSign, label: 'Komisi Saya' },
          { id: 'marketing', icon: Sparkles, label: 'Kit Pemasaran' },
          ...common
        ];
      case UserRole.TICKETING:
        return [
          { id: 'overview', icon: PlaneTakeoff, label: 'Kontrol Udara' },
          { id: 'manifest', icon: ListChecks, label: 'Manifes Pax' },
          { id: 'blocks', icon: Ticket, label: 'Blok Kursi' },
          { id: 'visa', icon: ShieldCheck, label: 'Tracking Visa' },
          ...common
        ];
      case UserRole.CONTENT_MANAGEMENT:
        return [
          { id: 'overview', icon: Briefcase, label: 'Studio Konten' },
          { id: 'packages', icon: Plus, label: 'Manajemen Paket' },
          { id: 'media', icon: ImageIcon, label: 'Pustaka Visual' },
          { id: 'marketing', icon: Sparkles, label: 'AI Ad Copy' },
          ...common
        ];
      case UserRole.PO_BUS:
        return [
          { id: 'overview', icon: Truck, label: 'Status Armada' },
          { id: 'units', icon: Bus, label: 'Inventori Unit' },
          { id: 'drivers', icon: UserCog, label: 'Manajemen Kru' },
          { id: 'schedule', icon: Calendar, label: 'Jadwal Sewa' },
          ...common
        ];
      case UserRole.SUPPORT_STAFF:
        return [
          { id: 'overview', icon: MessageSquare, label: 'Meja Bantuan' },
          { id: 'docs', icon: ClipboardCheck, label: 'Validasi Berkas' },
          { id: 'tasks', icon: Clock, label: 'Daftar Tugas' },
          ...common
        ];
      case UserRole.CUSTOMER:
      default:
        return [
          { id: 'overview', icon: BarChart3, label: 'Perjalanan Saya' },
          { id: 'bookings', icon: Calendar, label: 'Pemesanan' },
          { id: 'documents', icon: FileText, label: 'Brankas Dokumen' },
          { id: 'finance', icon: CreditCard, label: 'Pembayaran' },
          ...common
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-ivory min-h-screen pb-32">
      <section className="bg-emerald-950 pt-32 pb-24 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 islamic-pattern scale-110"></div>
        <div className="container-luxe relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-5 text-gold-400">
                 <ShieldCheck size={20} />
                 <div className="w-12 h-px bg-gold-500/30"></div>
                 <p className="text-[11px] font-black uppercase tracking-[0.6em]">
                   {user.role.replace('_', ' ')} PORTAL
                 </p>
              </div>
              <h1 className="text-5xl md:text-[7rem] font-black text-white tracking-tighter leading-[0.8]">
                Salaam, <br /> <span className="text-gold-500 italic font-serif font-light">{user.name.split(' ')[0]}.</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-6 bg-white/5 backdrop-blur-3xl p-6 rounded-[40px] border border-white/10 shadow-4xl w-full lg:w-auto">
              <div className="w-20 h-20 rounded-[28px] bg-gold-500 flex items-center justify-center text-white font-black text-3xl shadow-2xl">
                {user.name.charAt(0)}
              </div>
              <div className="pr-12">
                <p className="text-xl font-black text-white mb-1">{user.name}</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-luxe -mt-16 relative z-20 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-3 space-y-6">
             <div className="bg-white p-6 md:p-8 rounded-[40px] md:rounded-[50px] border border-emerald-950/5 shadow-3xl flex lg:flex-col overflow-x-auto no-scrollbar gap-2">
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

          <div className="lg:col-span-9">
            <RoleBasedView user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RoleBasedView: React.FC<{ user: User, activeTab: string, setActiveTab: (tab: string) => void }> = ({ user, activeTab, setActiveTab }) => {
  
  // SHARED PROFILE
  if (activeTab === 'profile') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="bg-white rounded-[50px] p-12 md:p-20 border border-emerald-950/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 text-emerald-950/5 pointer-events-none"><UserCog size={200} /></div>
          <div className="relative z-10 space-y-16">
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
                     <span className="bg-gold-500/10 text-gold-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{user.role.replace('_', ' ')} Member</span>
                     <span className="bg-emerald-950/5 text-emerald-950/40 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">ID: {user.id.toUpperCase()}</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.4em] ml-2">Nama Lengkap</label>
                  <input type="text" defaultValue={user.name} className="w-full bg-ivory border border-emerald-950/10 rounded-2xl py-5 px-8 font-bold text-emerald-950 text-sm focus:border-gold-500 outline-none transition-all" />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.4em] ml-2">Email Bisnis</label>
                  <input type="email" defaultValue={user.email} className="w-full bg-ivory border border-emerald-950/10 rounded-2xl py-5 px-8 font-bold text-emerald-950 text-sm focus:border-gold-500 outline-none transition-all" />
               </div>
            </div>
            
            <button className="bg-emerald-950 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 transition-all shadow-xl">
               Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- ROLE: SUPER ADMIN ---
  if (user.role === UserRole.SUPER_ADMIN) {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Pendapatan Q1" value="Rp 24.5M" icon={DollarSign} trend="+18.4%" />
              <StatCard label="Staf Aktif" value="48 Orang" icon={Users} trend="Semua On-Duty" />
              <StatCard label="Kesehatan Sistem" value="99.9%" icon={Activity} trend="Optimal" />
            </div>
            <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
               <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Aktivitas Staf Terkini</h3>
               <div className="space-y-6">
                  {[
                    { name: "Divisi Finance", task: "Memvalidasi Pembayaran #PAY-99120", time: "2 menit yang lalu" },
                    { name: "Manajer Armada", task: "Menjadwalkan 3 Sprinter untuk Ramadan", time: "15 menit yang lalu" },
                    { name: "Tim Konten", task: "Memperbarui Paket European Heritage", time: "1 jam yang lalu" }
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-ivory rounded-3xl border border-emerald-950/5 hover:bg-emerald-950 group transition-all duration-500">
                      <div className="flex items-center space-x-5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-md"><Activity size={20} /></div>
                        <p className="font-black text-emerald-950 group-hover:text-white text-sm">{log.name} <span className="text-emerald-950/30 group-hover:text-white/20 font-bold ml-2">— {log.task}</span></p>
                      </div>
                      <span className="text-[10px] font-black text-emerald-950/20 group-hover:text-gold-400 uppercase">{log.time}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Direktori Staf</h3>
                <button className="bg-emerald-950 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-3 shadow-xl hover:bg-gold-500 transition-all">
                  <UserPlus size={18} />
                  <span>Tambah Staf</span>
                </button>
             </div>
             <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "Ahmad Finance", role: "FINANCE", status: "Aktif", email: "ahmad@kaisarossie.com" },
                  { name: "Siti Sales", role: "SALES_AGENT", status: "Aktif", email: "siti@kaisarossie.com" },
                  { name: "Budi Ticketing", role: "TICKETING", status: "Cuti", email: "budi@kaisarossie.com" }
                ].map((u, i) => (
                  <div key={i} className="p-8 bg-ivory rounded-[40px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-500">
                     <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-emerald-950 text-gold-400 rounded-2xl flex items-center justify-center font-black text-xl group-hover:bg-gold-500 group-hover:text-white transition-all shadow-lg">{u.name.charAt(0)}</div>
                        <div>
                           <p className="font-black text-emerald-950 group-hover:text-white text-lg">{u.name}</p>
                           <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400">{u.role} • {u.email}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${u.status === 'Aktif' ? 'text-emerald-600' : 'text-gold-600'}`}>{u.status}</span>
                        <button className="p-4 bg-emerald-950/5 rounded-2xl group-hover:bg-white/10 group-hover:text-white transition-all"><Edit size={18}/></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
             <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl aspect-square flex flex-col justify-center items-center text-center space-y-8">
                <PieChart size={120} className="text-emerald-950/5" />
                <h4 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">Distribusi Penjualan</h4>
                <p className="text-emerald-950/40 text-sm max-w-xs">Visualisasi perbandingan performa antar kategori (Umrah vs Tour).</p>
             </div>
             <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl aspect-square flex flex-col justify-center items-center text-center space-y-8">
                <TrendingUp size={120} className="text-emerald-950/5" />
                <h4 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">Pertumbuhan Tahunan</h4>
                <p className="text-emerald-950/40 text-sm max-w-xs">Data kumulatif revenue dibandingkan dengan tahun fiskal sebelumnya.</p>
             </div>
          </div>
        );
      case 'system':
        return (
          <div className="bg-emerald-950 text-white p-12 rounded-[60px] font-mono text-xs overflow-hidden h-[600px] relative shadow-4xl border border-white/5">
             <div className="opacity-40 space-y-3">
                <p className="text-gold-400">[SYSTEM] Menginisiasi sinkronisasi modul inti...</p>
                <p>[AUTH] User ID 0x882 divalidasi melalui JWT.</p>
                <p>[DB] Koneksi pool berhasil dibangun ke Master-Cluster-Java-1.</p>
                <p>[LOG] Validasi pembayaran #991 disetujui oleh user_id:882 (Finance).</p>
                <p>[API] Endpoint /v3/itinerary/generate diakses dari Client IP 102.x.x.x</p>
                <p>[SYSTEM] Backup terjadwal berhasil dieksekusi pada 02:00 UTC.</p>
                <p className="text-gold-400">[SECURITY] SSL Handshake diperbarui untuk kaisarossie.com</p>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent pointer-events-none"></div>
          </div>
        );
    }
  }

  // --- ROLE: FINANCE ---
  if (user.role === UserRole.FINANCE) {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard label="Saldo Kas" value="Rp 8.42M" icon={Wallet} trend="+5.4% bln lalu" />
                <StatCard label="Perlu Validasi" value="18 Pembayaran" icon={Clock} trend="Action required" />
                <StatCard label="Tagihan Unpaid" value="Rp 1.15M" icon={Receipt} trend="7 Melewati Batas" />
             </div>
             <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-2xl space-y-10">
                <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Arus Kas Atelier</h3>
                <div className="h-64 flex items-end justify-between gap-4 px-4">
                   {[60, 45, 80, 55, 90, 70, 85, 40, 65, 95, 50, 75].map((h, i) => (
                     <div key={i} className="flex-1 group relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-950 text-white text-[8px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Rp {h}jt</div>
                        <div className="w-full bg-emerald-950/5 rounded-t-xl h-64 relative overflow-hidden">
                           <div className="absolute bottom-0 w-full bg-emerald-950 group-hover:bg-gold-500 transition-all duration-700 rounded-t-xl" style={{ height: `${h}%` }}></div>
                        </div>
                     </div>
                   ))}
                </div>
                <p className="text-center text-[10px] font-black text-emerald-950/20 uppercase tracking-[0.5em]">Laporan Bulanan Berjalan</p>
             </div>
          </div>
        );
      case 'payments':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-2">
                   <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Antrean Verifikasi</h3>
                   <p className="text-emerald-950/40 text-[10px] font-bold uppercase tracking-widest">Bukti bayar masuk dari jamaah & agen.</p>
                </div>
                <div className="flex gap-4">
                   <div className="relative">
                      <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" />
                      <input type="text" placeholder="Cari Ref / Nama" className="bg-ivory border border-emerald-950/5 rounded-2xl py-4 pl-14 pr-6 text-xs font-bold text-emerald-950 focus:ring-1 focus:ring-gold-500 outline-none" />
                   </div>
                   <button className="p-4 bg-emerald-950 text-gold-400 rounded-2xl hover:scale-105 transition-all shadow-lg"><Filter size={20}/></button>
                </div>
             </div>
             <div className="space-y-6">
                {[
                  { ref: "KR-PAY-99120", client: "Abdullah Ahmad", pkg: "Umrah Signature", amt: "Rp 15.000.000", bank: "BCA Transfer", date: "Hari ini, 14:20" },
                  { ref: "KR-PAY-99882", client: "Siti Fatimah", pkg: "Europe Heritage", amt: "Rp 42.500.000", bank: "Mandiri VA", date: "Kemarin, 09:15" }
                ].map((p, i) => (
                  <div key={i} className="group flex flex-col md:flex-row items-center justify-between p-8 bg-ivory rounded-[40px] border border-emerald-950/5 hover:bg-emerald-950 transition-all duration-700 gap-8">
                     <div className="flex items-center gap-8 w-full md:w-auto">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-950 shadow-lg group-hover:scale-110 transition-transform"><Landmark size={28} /></div>
                        <div>
                           <p className="text-lg font-black text-emerald-950 group-hover:text-white">{p.client}</p>
                           <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-gold-400">{p.pkg} — {p.ref}</p>
                        </div>
                     </div>
                     <div className="flex-1 text-center">
                        <p className="text-2xl font-black text-emerald-950 group-hover:text-gold-400 tracking-tighter">{p.amt}</p>
                        <p className="text-[9px] font-black uppercase text-emerald-950/40 group-hover:text-white/20">{p.bank} • {p.date}</p>
                     </div>
                     <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-4 bg-white text-emerald-950 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-md">Lihat Bukti</button>
                        <button className="p-4 bg-emerald-950 text-white rounded-2xl group-hover:bg-emerald-600 transition-all shadow-lg border border-white/10"><Check size={20}/></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'invoices':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Penerbitan Invoice</h3>
                <button className="bg-emerald-950 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-4 shadow-xl hover:bg-gold-500 transition-all">
                   <Plus size={18} />
                   <span>Invoice Baru</span>
                </button>
             </div>
             <table className="w-full text-left">
                <thead>
                   <tr className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.2em] border-b border-emerald-950/5">
                      <th className="pb-8">ID Tagihan</th>
                      <th className="pb-8">Penerima</th>
                      <th className="pb-8">Jumlah</th>
                      <th className="pb-8">Status</th>
                      <th className="pb-8 text-right">Aksi</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/5">
                   {[
                     { id: "INV-2024-001", user: "Ratna Sari", amt: "Rp 42.5jt", status: "Lunas", color: "text-emerald-600" },
                     { id: "INV-2024-042", user: "Dr. Gunawan", amt: "Rp 350jt", status: "Overdue", color: "text-red-500" }
                   ].map((inv, i) => (
                     <tr key={i} className="group hover:bg-ivory transition-colors">
                        <td className="py-8 text-sm font-black text-emerald-950">{inv.id}</td>
                        <td className="py-8 text-sm font-bold text-emerald-950/60">{inv.user}</td>
                        <td className="py-8 text-sm font-black text-emerald-950">{inv.amt}</td>
                        <td className="py-8">
                           <span className={`text-[9px] font-black uppercase tracking-widest ${inv.color}`}>{inv.status}</span>
                        </td>
                        <td className="py-8 text-right">
                           <button className="p-3 bg-emerald-950/5 rounded-xl hover:bg-emerald-950 hover:text-white transition-all"><Download size={16}/></button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        );
      case 'reports':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
             <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12">
                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter">Laporan P&L Bulanan</h3>
                <div className="space-y-6">
                   {[
                     { label: 'Revenue', val: 'Rp 4.82M', trend: '+12%', up: true },
                     { label: 'Direct COGS', val: 'Rp 2.15M', trend: '+8%', up: false },
                     { label: 'Net Profit', val: 'Rp 2.25B', trend: '+15%', up: true }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-ivory rounded-3xl">
                        <div>
                           <p className="text-[9px] font-black text-emerald-950/30 uppercase tracking-widest">{item.label}</p>
                           <p className="text-xl font-black text-emerald-950">{item.val}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-[10px] font-black flex items-center gap-2 ${item.up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                           {item.trend}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="bg-emerald-950 text-white p-12 rounded-[60px] shadow-4xl space-y-12 flex flex-col justify-between">
                <h3 className="text-2xl font-black tracking-tighter">Neraca Aset Cair</h3>
                <div className="space-y-8">
                   <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                         <span>Likuiditas Kas</span>
                         <span>Rp 12.4M</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-gold-500 w-[65%]"></div>
                      </div>
                   </div>
                   <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 space-y-4">
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Sinkronisasi Terakhir</p>
                      <p className="text-sm font-black">March 01, 2024 — 02:00 WIB</p>
                      <button className="w-full py-4 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Ekspor untuk Audit</button>
                   </div>
                </div>
             </div>
          </div>
        );
    }
  }

  // --- ROLE: SALES AGENT ---
  if (user.role === UserRole.SALES_AGENT) {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Pipeline Value" value="Rp 1.2M" icon={TrendingUp} trend="+12% bln ini" />
              <StatCard label="Prospek Aktif" value="42 Orang" icon={Users} trend="Need Follow-up" />
              <StatCard label="Komisi Unpaid" value="Rp 8.5jt" icon={DollarSign} trend="Pending Finance" />
            </div>
            <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
               <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Konversi Terakhir</h3>
               <div className="space-y-4">
                  {[
                    { client: "Hj. Ratna Sari", pkg: "Umrah Ramadan", comm: "Rp 1.500.000", status: "Sudah Cair" },
                    { client: "Dr. Gunawan", pkg: "Haji Furoda Royal", comm: "Rp 5.000.000", status: "Proses" }
                  ].map((sale, i) => (
                    <div key={i} className="flex justify-between items-center p-8 bg-ivory rounded-[40px] border border-emerald-950/5 hover:bg-emerald-950 group transition-all duration-700">
                       <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-950 shadow-md group-hover:bg-gold-500 group-hover:text-white transition-all"><Handshake size={24} /></div>
                          <div>
                             <p className="font-black text-emerald-950 group-hover:text-white text-lg">{sale.client}</p>
                             <p className="text-[10px] font-bold text-emerald-950/30 uppercase group-hover:text-gold-400">{sale.pkg}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="font-black text-emerald-950 group-hover:text-white text-xl">{sale.comm}</p>
                          <p className={`text-[9px] font-black uppercase tracking-widest ${sale.status === 'Sudah Cair' ? 'text-emerald-600' : 'text-gold-600'}`}>{sale.status}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'leads':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Pipeline Prospek</h3>
                <button className="bg-emerald-950 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-xl hover:bg-gold-500 transition-all">
                  <Plus size={16}/> <span>Leads Baru</span>
                </button>
             </div>
             <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "Bp. Syamsul", pkg: "Haji Furoda", stage: "Dingin", last: "3 hari lalu" },
                  { name: "Ibu Maya", pkg: "Umrah Keluarga", stage: "Hot", last: "Hari ini" }
                ].map((l, i) => (
                  <div key={i} className="p-8 bg-ivory rounded-[40px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-500 shadow-sm hover:shadow-xl">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-md"><UserIcon size={24}/></div>
                        <div>
                           <p className="font-black text-emerald-950 group-hover:text-white text-lg">{l.name}</p>
                           <p className="text-[9px] font-bold text-emerald-950/40 uppercase tracking-widest group-hover:text-gold-400">{l.pkg}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${l.stage === 'Hot' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>{l.stage}</span>
                        <p className="text-[9px] font-black text-emerald-950/20 group-hover:text-white/20 mt-2 uppercase">Kontak: {l.last}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'commissions':
        return (
          <div className="bg-emerald-950 text-white p-12 rounded-[60px] shadow-4xl relative overflow-hidden group animate-fade-in">
             <div className="absolute inset-0 opacity-5 islamic-pattern scale-150"></div>
             <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-center">
                   <div className="flex items-center space-x-4">
                      <Wallet size={24} className="text-gold-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">Akumulasi Penghasilan</span>
                   </div>
                   <span className="bg-white/10 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-gold-400">Agent Tier: Platinum</span>
                </div>
                <div className="space-y-3">
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Saldo Tersedia</p>
                   <p className="text-7xl font-black text-gold-400 tracking-tighter">Rp 24.8M</p>
                </div>
                <button className="w-full bg-white text-emerald-950 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-3xl">Request Pencairan</button>
             </div>
          </div>
        );
      case 'marketing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
             {[
               { title: "Umrah Signature 2024", type: "Brochure", items: 8, color: "text-emerald-600" },
               { title: "Haji Furoda Royal", type: "Presentasi", items: 4, color: "text-gold-500" },
               { title: "Katalog Media Sosial", type: "Visual", items: 45, color: "text-gold-600" }
             ].map((kit, i) => (
               <div key={i} className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl group hover:border-gold-500 transition-all duration-700">
                  <div className="space-y-8">
                     <div className={`w-16 h-16 rounded-2xl bg-ivory flex items-center justify-center ${kit.color} shadow-sm group-hover:scale-110 transition-transform`}>
                        <Sparkles size={28} />
                     </div>
                     <h4 className="text-xl font-black text-emerald-950 tracking-tight">{kit.title}</h4>
                     <button className="w-full flex items-center justify-between p-5 bg-ivory rounded-2xl group-hover:bg-emerald-950 group-hover:text-white transition-all">
                        <span className="text-[10px] font-black uppercase tracking-widest">Unduh Aset</span>
                        <Download size={18} />
                     </button>
                  </div>
               </div>
             ))}
          </div>
        );
    }
  }

  // --- ROLE: TICKETING ---
  if (user.role === UserRole.TICKETING) {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard label="Total Blok Kursi" value="1,240 Kursi" icon={Ticket} trend="Ramadan Season" />
                <StatCard label="Tingkat Approval Visa" value="98.2%" icon={ShieldCheck} trend="Akurasi Tinggi" />
                <StatCard label="Akurasi Manifes" value="100%" icon={ClipboardCheck} trend="Zero Errors" />
             </div>
             <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-2xl space-y-10">
                <div className="flex justify-between items-center">
                   <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Alert Penerbangan Urgent</h3>
                   <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center animate-pulse"><Bell size={18} /></div>
                </div>
                <div className="space-y-4">
                   {[
                     { msg: "SV-817: Paspor belum diunggah (3 Pax)", deadline: "Exp dalam 4 jam", status: "Critical" },
                     { msg: "QR-957: PNR belum digenerate (Keluarga Arifin)", deadline: "Exp dalam 12 jam", status: "Warning" }
                   ].map((alert, i) => (
                     <div key={i} className="flex justify-between items-center p-6 bg-ivory rounded-3xl border border-emerald-950/5 group hover:bg-emerald-950 transition-all duration-500">
                        <div className="flex items-center gap-6">
                           <div className={`w-3 h-3 rounded-full ${alert.status === 'Critical' ? 'bg-red-500' : 'bg-gold-500'}`}></div>
                           <p className="font-black text-emerald-950 group-hover:text-white text-sm">{alert.msg}</p>
                        </div>
                        <span className="text-[10px] font-black text-emerald-950/20 group-hover:text-gold-400 uppercase">{alert.deadline}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
      case 'manifest':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Matrix Penumpang</h3>
                <div className="flex gap-4">
                   <button className="bg-ivory border border-emerald-950/10 text-emerald-950 px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-3 hover:bg-emerald-950 hover:text-white transition-all">
                      <Upload size={18} />
                      <span>Impor Bulk</span>
                   </button>
                   <button className="bg-emerald-950 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-4 shadow-xl hover:bg-gold-500 transition-all">
                      <Plus size={18} />
                      <span>Tambah Pax</span>
                   </button>
                </div>
             </div>
             <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-emerald-950/5">
                         <th className="pb-8 text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.2em]">Group / Nama</th>
                         <th className="pb-8 text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.2em]">Flight / PNR</th>
                         <th className="pb-8 text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.2em]">Status Dokumen</th>
                         <th className="pb-8 text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.2em] text-right">Aksi</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-emerald-950/5">
                      {[
                        { group: "Umrah Mar 25", name: "Abdullah Ahmad", flight: "SV-817", pnr: "XQ992Y", status: "Terverifikasi", color: "text-emerald-600" },
                        { group: "Haji Royal", name: "Gunawan Pratama", flight: "QR-957", pnr: "LPP02X", status: "Pending", color: "text-gold-600" }
                      ].map((p, i) => (
                        <tr key={i} className="group hover:bg-ivory transition-colors">
                           <td className="py-8">
                              <p className="text-sm font-black text-emerald-950">{p.name}</p>
                              <p className="text-[9px] font-bold text-emerald-950/30 uppercase tracking-widest">{p.group}</p>
                           </td>
                           <td className="py-8">
                              <p className="text-sm font-black text-emerald-950 flex items-center gap-2"><Plane size={12} className="text-emerald-950/20" /> {p.flight}</p>
                              <p className="text-[10px] font-black text-gold-600 uppercase flex items-center gap-2"><Hash size={10} /> {p.pnr}</p>
                           </td>
                           <td className="py-8">
                              <span className={`text-[9px] font-black uppercase tracking-widest ${p.color}`}>{p.status}</span>
                           </td>
                           <td className="py-8 text-right">
                              <button className="p-3 bg-emerald-950/5 rounded-xl hover:bg-emerald-950 hover:text-white transition-all"><Edit size={16}/></button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
             {[
               { airline: "Saudi Arabian", code: "SV-817", date: "25 Mar 2024", seats: "50", used: "42", progress: "84%" },
               { airline: "Qatar Airways", code: "QR-957", date: "10 Apr 2024", seats: "30", used: "12", progress: "40%" }
             ].map((b, i) => (
               <div key={i} className="bg-white p-10 rounded-[50px] border border-emerald-950/5 shadow-xl group hover:border-gold-500 transition-all duration-700 space-y-8">
                  <div className="flex justify-between items-start">
                     <div className="w-16 h-16 bg-ivory border border-emerald-950/5 rounded-3xl flex items-center justify-center text-emerald-950 group-hover:bg-emerald-950 group-hover:text-gold-400 transition-all duration-500">
                        <Plane size={32} />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Aktif</span>
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-2xl font-black text-emerald-950 tracking-tighter">{b.airline} — {b.code}</h4>
                     <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">{b.date}</p>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-emerald-950/30">Alokasi</span>
                        <span className="text-emerald-950">{b.used} / {b.seats} Kursi</span>
                     </div>
                     <div className="w-full h-2 bg-emerald-950/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-950 transition-all duration-1000" style={{ width: b.progress }}></div>
                     </div>
                  </div>
                  <button className="w-full bg-ivory text-emerald-950 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all">Detail Blok</button>
               </div>
             ))}
          </div>
        );
      case 'visa':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Tracking E-Visa</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-950/30">Koneksi API Saudi Portal Aktif</p>
             </div>
             <div className="space-y-6">
                {[
                  { name: "Hj. Ratna Sari", group: "Umrah Mar", status: "Issued", color: "bg-emerald-600" },
                  { name: "H. Abdullah", group: "Umrah Mar", status: "Biometrics", color: "bg-blue-500" },
                  { name: "Siti Fatimah", group: "Umrah Mar", status: "Submitted", color: "bg-gold-500" }
                ].map((v, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 bg-ivory rounded-[40px] border border-emerald-950/5 group hover:bg-emerald-950 transition-all duration-700 gap-8">
                     <div className="flex items-center gap-8 w-full md:w-auto">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-950 shadow-lg group-hover:scale-110 transition-transform"><ShieldCheck size={28} /></div>
                        <div>
                           <p className="text-lg font-black text-emerald-950 group-hover:text-white">{v.name}</p>
                           <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-gold-400">{v.group}</p>
                        </div>
                     </div>
                     <div className="flex-1 flex items-center gap-4 w-full px-8">
                        <div className="flex-1 h-1 bg-emerald-950/5 group-hover:bg-white/10 rounded-full relative">
                           <div className={`h-full ${v.color} rounded-full transition-all duration-1000`} style={{ width: v.status === 'Issued' ? '100%' : v.status === 'Biometrics' ? '66%' : '33%' }}></div>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-950/40 group-hover:text-white/40 whitespace-nowrap">{v.status}</span>
                     </div>
                     <button className="p-4 bg-white/50 border border-emerald-950/10 rounded-2xl group-hover:bg-white group-hover:text-emerald-950 transition-all"><ExternalLink size={20}/></button>
                  </div>
                ))}
             </div>
          </div>
        );
    }
  }

  // --- ROLE: CONTENT MANAGEMENT ---
  if (user.role === UserRole.CONTENT_MANAGEMENT) {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
             <div className="bg-white p-12 rounded-[60px] shadow-xl border border-emerald-950/5 flex flex-col justify-between aspect-video">
                <div className="w-16 h-16 bg-emerald-950 rounded-2xl flex items-center justify-center text-white shadow-2xl"><Layers size={32}/></div>
                <div className="space-y-2">
                   <p className="text-[9px] font-black text-emerald-950/30 uppercase tracking-[0.4em]">Penawaran Aktif</p>
                   <h3 className="text-5xl font-black text-emerald-950 tracking-tighter">18 <span className="text-2xl text-emerald-950/20">Live Packages</span></h3>
                </div>
             </div>
             <div className="bg-emerald-950 p-12 rounded-[60px] shadow-xl text-white flex flex-col justify-between aspect-video relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 islamic-pattern scale-150"></div>
                <h3 className="text-3xl font-black tracking-tighter relative z-10">Pustaka Aset <br/><span className="text-gold-500 italic font-serif font-light">Cloud.</span></h3>
                <div className="flex justify-between items-end relative z-10">
                   <div>
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Penyimpanan Terpakai</p>
                      <p className="text-2xl font-black text-gold-400">4.2 GB / 100 GB</p>
                   </div>
                   <button onClick={() => setActiveTab('media')} className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all"><ArrowUpRight size={20}/></button>
                </div>
             </div>
          </div>
        );
      case 'packages':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Katalog Perjalanan</h3>
                <button className="bg-emerald-950 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-4 shadow-xl hover:bg-gold-500 transition-all">
                   <Plus size={18} />
                   <span>Paket Baru</span>
                </button>
             </div>
             <div className="space-y-4">
                {[
                  { name: "Umrah Signature Ramadan", cat: "UMRAH", price: "Rp 42.5jt", status: "Tayang" },
                  { name: "Muslim Heritage Spain", cat: "TOUR", price: "Rp 48jt", status: "Tayang" },
                  { name: "Haji Furoda Royal Elite", cat: "HAJI", price: "Rp 350jt", status: "Arsip" }
                ].map((p, i) => (
                  <div key={i} className="p-8 bg-ivory rounded-[40px] border border-emerald-950/5 flex justify-between items-center group hover:bg-emerald-950 transition-all duration-500">
                     <div>
                        <p className="font-black text-emerald-950 group-hover:text-white text-lg">{p.name}</p>
                        <p className="text-[9px] font-bold text-emerald-950/30 uppercase group-hover:text-gold-400">{p.cat} — {p.price}</p>
                     </div>
                     <div className="flex items-center gap-6">
                        <span className={`text-[9px] font-black uppercase tracking-widest ${p.status === 'Tayang' ? 'text-emerald-600' : 'text-emerald-950/20'}`}>{p.status}</span>
                        <div className="flex gap-2">
                           <button className="p-3 bg-emerald-950/5 rounded-xl group-hover:bg-white/10 group-hover:text-white"><Edit size={16}/></button>
                           <button className="p-3 bg-emerald-950/5 rounded-xl group-hover:bg-white/10 group-hover:text-white"><Trash2 size={16}/></button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'media':
        return (
          <div className="space-y-10 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Pustaka Visual</h3>
                <button className="bg-emerald-950 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3"><Upload size={16}/> Bulk Upload</button>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <div key={i} className="aspect-square bg-white border border-emerald-950/5 rounded-3xl overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-all">
                     <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                        <Share2 size={24} className="text-white" />
                     </div>
                     <img src={`https://picsum.photos/seed/${i + 50}/400/400`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Asset" />
                  </div>
                ))}
             </div>
          </div>
        );
      case 'marketing':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Generator Salinan Iklan</h3>
             <div className="p-10 bg-ivory rounded-[40px] border border-gold-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-gold-500/10"><Sparkles size={100} /></div>
                <div className="relative z-10 space-y-6">
                   <p className="text-[9px] font-black text-emerald-950/30 uppercase tracking-[0.4em]">Draft AI #1: Umrah Signature</p>
                   <p className="text-2xl font-medium italic text-emerald-950 leading-relaxed max-w-2xl">"Wujudkan impian spiritual di pelataran Masjidil Haram dengan kurasi Kaisa Signature Ramadan Collection. Hotel VVIP, bimbingan mendalam, ketenangan mutlak."</p>
                   <div className="flex gap-4">
                      <button className="bg-emerald-950 text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-500 transition-all">Salin Teks</button>
                      <button className="bg-emerald-950/5 text-emerald-950 px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2"><RefreshCw size={14}/> Regenerate</button>
                   </div>
                </div>
             </div>
          </div>
        );
    }
  }

  // --- ROLE: PO BUS ---
  if (user.role === UserRole.PO_BUS) {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard label="Siap Operasi" value="14 Unit" icon={Truck} trend="Status Pool" />
                <StatCard label="Sedang Jalan" value="6 Unit" icon={MapPin} trend="Rute Aktif" />
                <StatCard label="Masa Servis" value="2 Unit" icon={Settings} trend="Maintenance" />
             </div>
             <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
                <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Pelepasan Armada Hari Ini</h3>
                <div className="space-y-4">
                   {[
                     { unit: "KR-SPR-01", type: "Mercedes Sprinter", route: "Semarang - Jakarta", driver: "Agus S.", status: "Siap Lepas" },
                     { unit: "KR-BUS-08", type: "Jetbus 5 Voyager", route: "Airport Transfer", driver: "Budi T.", status: "Dalam Perjalanan" }
                   ].map((u, i) => (
                     <div key={i} className="flex justify-between items-center p-8 bg-ivory rounded-[40px] border border-emerald-950/5">
                        <div className="flex items-center gap-8">
                           <div className="w-16 h-16 bg-emerald-950 text-gold-400 rounded-2xl flex items-center justify-center shadow-lg"><Bus size={28}/></div>
                           <div>
                              <p className="font-black text-emerald-950 text-lg">{u.unit} <span className="text-emerald-950/30 text-xs font-bold ml-2">— {u.type}</span></p>
                              <p className="text-[10px] font-bold text-emerald-950/40 uppercase tracking-widest">{u.route} • Supir: {u.driver}</p>
                           </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${u.status.includes('Siap') ? 'text-emerald-600' : 'text-gold-600'}`}>{u.status}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
      case 'units':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
             {[
               { id: "KR-SPR-01", type: "Sprinter VIP", status: "Ready", seats: "15" },
               { id: "KR-BUS-01", type: "Jetbus 5 Voyager", status: "In Use", seats: "45" },
               { id: "KR-BUS-05", type: "Legacy SR3 Suites", status: "Ready", seats: "22" }
             ].map((u, i) => (
               <div key={i} className="bg-white p-12 rounded-[60px] shadow-xl border border-emerald-950/5 space-y-8 group hover:border-gold-500 transition-all">
                  <div className="flex justify-between items-start">
                     <div className="w-20 h-20 bg-emerald-950 text-gold-400 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl"><Truck size={32}/></div>
                     <span className={`text-[10px] font-black uppercase tracking-widest ${u.status === 'Ready' ? 'text-emerald-600' : 'text-gold-600'}`}>{u.status}</span>
                  </div>
                  <div>
                     <h4 className="text-2xl font-black text-emerald-950 tracking-tighter">{u.id}</h4>
                     <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest mt-1">{u.type} • {u.seats} Kursi</p>
                  </div>
                  <button className="w-full p-5 bg-ivory rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all shadow-sm">Detail & Log Servis</button>
               </div>
             ))}
          </div>
        );
      case 'drivers':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Direktori Kru & Supir</h3>
                <button className="bg-emerald-950 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Assign Tugas</button>
             </div>
             <div className="space-y-4">
                {[
                  { name: "Agus Santoso", license: "B1 Umum", duty: "KR-SPR-01", status: "Tugas Aktif" },
                  { name: "Budi Triyanto", license: "B2 Umum", duty: "-", status: "Siaga Pool" }
                ].map((dr, i) => (
                  <div key={i} className="p-8 bg-ivory rounded-[40px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-500">
                     <div className="flex items-center gap-8">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-950 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-md"><UserIcon size={24}/></div>
                        <div>
                           <p className="font-black text-emerald-950 group-hover:text-white text-lg">{dr.name}</p>
                           <p className="text-[10px] font-bold text-emerald-950/30 uppercase group-hover:text-white/20">SIM: {dr.license}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${dr.status.includes('Aktif') ? 'text-emerald-600' : 'text-gold-600'}`}>{dr.status}</p>
                        <p className="text-[10px] font-black text-emerald-950/30 group-hover:text-gold-400">Unit: {dr.duty}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black text-emerald-950">Kalender Penugasan</h3>
                <div className="flex gap-4">
                   <button className="p-3 bg-emerald-950/5 rounded-xl"><ChevronRight className="rotate-180" size={18}/></button>
                   <span className="text-[10px] font-black uppercase tracking-widest flex items-center">Maret 2024</span>
                   <button className="p-3 bg-emerald-950/5 rounded-xl"><ChevronRight size={18}/></button>
                </div>
             </div>
             <div className="grid grid-cols-7 gap-4">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={`aspect-square rounded-[24px] border border-emerald-950/5 flex items-center justify-center relative group cursor-pointer ${[10, 11, 15, 25, 26].includes(i+1) ? 'bg-emerald-950 text-gold-400 shadow-2xl' : 'bg-ivory text-emerald-950/20'}`}>
                     <span className="font-black text-sm">{i + 1}</span>
                     {[10, 11, 15, 25, 26].includes(i+1) && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold-500"></div>}
                  </div>
                ))}
             </div>
          </div>
        );
    }
  }

  // --- ROLE: SUPPORT STAFF ---
  if (user.role === UserRole.SUPPORT_STAFF) {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StatCard label="Berkas Masuk" value="28 Berkas" icon={ClipboardCheck} trend="Butuh Validasi" />
                <StatCard label="Task Aktif" value="12 Tugas" icon={Clock} trend="Prioritas Hari Ini" />
             </div>
             <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
                <div className="flex justify-between items-center">
                   <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Inquiry Jamaah Terbaru</h3>
                   <span className="bg-gold-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">8 Pesan Baru</span>
                </div>
                <div className="space-y-4">
                   {[
                     { name: "Hj. Ratna Sari", type: "Update Paspor", status: "Urgent" },
                     { name: "Bp. Gunawan", type: "Info Manasik", status: "Normal" }
                   ].map((item, i) => (
                     <div key={i} className="flex justify-between items-center p-8 bg-ivory rounded-[40px] border border-emerald-950/5 group hover:bg-emerald-950 transition-all duration-700">
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-950 shadow-md group-hover:bg-gold-500 group-hover:text-white transition-all"><MessageSquare size={24} /></div>
                           <div>
                              <p className="font-black text-emerald-950 group-hover:text-white text-lg">{item.name}</p>
                              <p className="text-[10px] font-bold text-emerald-950/30 uppercase group-hover:text-gold-400">{item.type}</p>
                           </div>
                        </div>
                        <button className="bg-emerald-950 text-white p-4 rounded-2xl group-hover:bg-gold-500 transition-all shadow-xl"><ChevronRight size={20}/></button>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
      case 'docs':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Verifikasi Dokumen Legal</h3>
             <div className="space-y-6">
                {[
                  { name: "Abdullah Ahmad", doc: "Paspor", file: "scan_abdullah.pdf", status: "Sudah Valid" },
                  { name: "Siti Fatimah", doc: "Vaksin Meningitis", file: "vaksin_siti.jpg", status: "Perlu Review" }
                ].map((d, i) => (
                  <div key={i} className="p-8 bg-ivory rounded-[40px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-500">
                     <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-950 shadow-lg group-hover:bg-gold-500 group-hover:text-white transition-all"><FileText size={28}/></div>
                        <div>
                           <p className="font-black text-emerald-950 group-hover:text-white text-lg">{d.name}</p>
                           <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-white/40">{d.doc} — {d.file}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${d.status.includes('Valid') ? 'text-emerald-600' : 'text-gold-600'}`}>{d.status}</span>
                        <div className="flex gap-2">
                           <button className="bg-emerald-600 text-white p-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg"><Check size={18}/></button>
                           <button className="bg-red-500 text-white p-4 rounded-xl hover:bg-red-600 transition-all shadow-lg"><X size={18}/></button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Penugasan Hari Ini</h3>
             <div className="space-y-4">
                {[
                  { task: "Cetak Manifes Grup SV-817", priority: "Tinggi", due: "16:00" },
                  { task: "Hubungi Vendor Katering Makkah", priority: "Normal", due: "17:30" }
                ].map((t, i) => (
                  <div key={i} className="p-8 bg-ivory rounded-[40px] flex justify-between items-center border border-emerald-950/5">
                     <div className="flex items-center gap-6">
                        <div className={`w-3 h-3 rounded-full ${t.priority === 'Tinggi' ? 'bg-red-500 animate-pulse' : 'bg-gold-500'}`}></div>
                        <p className="font-black text-emerald-950 text-lg">{t.task}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] font-black text-emerald-950/30 uppercase tracking-widest mb-1">Batas Waktu</p>
                        <p className="text-sm font-black text-emerald-950">{t.due} WIB</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
    }
  }

  // --- ROLE: CUSTOMER ---
  if (user.role === UserRole.CUSTOMER) {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Hitung Mundur" value="18 Hari" icon={Timer} trend="Grup Mar-25" />
              <StatCard label="Checklist Berkas" value="5 / 6 Dok" icon={ClipboardCheck} trend="Status: Kurang 1" />
              <StatCard label="Total Settlement" value="Rp 25.0jt" icon={Wallet} trend="Sisa Pelunasan" />
            </div>
            <div className="relative overflow-hidden bg-emerald-950 rounded-[60px] shadow-5xl aspect-video md:aspect-[21/7] group">
               <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-all duration-[5s]" alt="Mecca" />
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/60 to-transparent"></div>
               <div className="absolute inset-0 p-16 flex flex-col justify-center space-y-4">
                  <p className="text-gold-400 text-[10px] font-black uppercase tracking-[0.6em]">Trip Aktif Mendatang</p>
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">Umrah Signature <br /> <span className="text-gold-500 italic font-serif font-light">Ramadan.</span></h2>
               </div>
               <button onClick={() => setActiveTab('bookings')} className="absolute bottom-12 right-12 bg-white text-emerald-950 px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-4xl flex items-center space-x-4">
                  <span>Atur Keberangkatan</span>
                  <ArrowUpRight size={18} />
               </button>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div className="space-y-10 animate-fade-in">
             {[
               { id: "BK-99120", pkg: "Umrah Signature Ramadan", status: "Validasi Visa", date: "25 Mar 2024" }
             ].map((b, i) => (
               <div key={i} className="bg-white rounded-[60px] border border-emerald-950/5 shadow-2xl p-12 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="space-y-6 flex-1 text-center md:text-left">
                     <p className="text-gold-600 text-[10px] font-black uppercase tracking-widest">Booking ID #{b.id}</p>
                     <h3 className="text-4xl font-black text-emerald-950 tracking-tighter leading-tight">{b.pkg}</h3>
                     <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="px-6 py-2 bg-ivory rounded-full text-[9px] font-black uppercase text-emerald-950/40">Tgl Keluar: {b.date}</div>
                        <div className="px-6 py-2 bg-emerald-50 rounded-full text-[9px] font-black uppercase text-emerald-700">Status: {b.status}</div>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <button className="bg-emerald-950 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-xl">Itinerary PDF</button>
                     <button className="p-5 bg-ivory rounded-2xl text-emerald-950 hover:bg-emerald-950 hover:text-white transition-all shadow-sm"><Info size={20}/></button>
                  </div>
               </div>
             ))}
          </div>
        );
      case 'documents':
        return (
          <div className="bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl space-y-12 animate-fade-in">
             <div className="flex justify-between items-center">
                <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Brankas Berkas</h3>
                <button className="bg-emerald-950 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-3 shadow-xl">
                   <Upload size={18} />
                   <span>Unggah Baru</span>
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "Paspor - Abdullah", type: "Identitas", status: "Verified", color: "text-emerald-600" },
                  { name: "Vaksin Meningitis", type: "Kesehatan", status: "Review", color: "text-gold-600" }
                ].map((doc, i) => (
                  <div key={i} className="p-8 bg-ivory rounded-[40px] flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-950 shadow-lg"><FileText size={28}/></div>
                        <div>
                           <p className="font-black text-emerald-950 group-hover:text-white">{doc.name}</p>
                           <p className="text-[9px] font-bold text-emerald-950/30 uppercase group-hover:text-gold-400">{doc.type}</p>
                        </div>
                     </div>
                     <span className={`text-[9px] font-black uppercase tracking-widest ${doc.color}`}>{doc.status}</span>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'finance':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 animate-fade-in">
             <div className="md:col-span-7 bg-emerald-950 text-white p-12 rounded-[60px] shadow-4xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 islamic-pattern scale-150"></div>
                <div className="relative z-10 space-y-12">
                   <div className="flex items-center space-x-4">
                      <Wallet size={24} className="text-gold-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">Status Pembayaran</span>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Sisa Pelunasan</p>
                      <p className="text-7xl font-black text-gold-400 tracking-tighter">Rp 25.0M</p>
                   </div>
                   <button className="w-full bg-white text-emerald-950 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all">Bayar Sekarang</button>
                </div>
             </div>
             <div className="md:col-span-5 bg-white p-12 rounded-[60px] border border-emerald-950/5 shadow-xl h-full flex flex-col justify-between">
                <h3 className="text-2xl font-black text-emerald-950 tracking-tighter">Riwayat Transaksi</h3>
                <div className="space-y-6">
                   {[
                     { label: "Deposit (Lunas)", amt: "Rp 15M", date: "Feb 10" },
                     { label: "Cicilan 1 (Lunas)", amt: "Rp 10M", date: "Feb 28" }
                   ].map((t, i) => (
                     <div key={i} className="flex justify-between items-center border-b border-emerald-950/5 pb-4">
                        <div>
                           <p className="text-xs font-black text-emerald-950">{t.label}</p>
                           <p className="text-[9px] font-bold text-emerald-950/30 uppercase">{t.date}</p>
                        </div>
                        <p className="font-black text-emerald-950">{t.amt}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
    }
  }

  return (
    <div className="bg-white rounded-[50px] p-24 text-center border border-emerald-950/5 shadow-xl animate-fade-in">
      <div className="w-20 h-20 bg-emerald-950/5 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-950/20"><Settings size={32} /></div>
      <h3 className="text-2xl font-black text-emerald-950 tracking-tighter mb-2">Modul {activeTab.toUpperCase()}</h3>
      <p className="text-emerald-950/30 text-[10px] font-black uppercase tracking-[0.5em]">Dalam Tahap Sinkronisasi Data</p>
    </div>
  );
};

// HELPER StatCard
const StatCard: React.FC<{ label: string, value: string, icon: any, trend: string }> = ({ label, value, icon: Icon, trend }) => (
  <div className="bg-white p-10 rounded-[45px] border border-emerald-950/5 shadow-xl group hover:border-gold-500 transition-all duration-700 overflow-hidden relative">
    <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
      <div className="w-12 h-12 bg-emerald-950/5 rounded-2xl flex items-center justify-center text-emerald-950 group-hover:bg-emerald-950 group-hover:text-gold-400 transition-all duration-500">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-3xl font-black text-emerald-950 tracking-tighter mb-2">{value}</p>
        <p className="text-[9px] font-black text-emerald-950/30 uppercase tracking-[0.4em] mb-4">{label}</p>
        <div className="h-px w-full bg-emerald-950/5 mb-4"></div>
        <p className={`text-[10px] font-black uppercase tracking-widest ${trend.includes('+') || trend.includes('Optimal') ? 'text-emerald-600' : 'text-gold-600'}`}>{trend}</p>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
       <Icon size={120} />
    </div>
  </div>
);
