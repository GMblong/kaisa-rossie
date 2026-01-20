
import React, { useState } from 'react';
import { 
  Calendar, CheckCircle, FileText, Clock, Sparkles, Users, TrendingUp, 
  ShieldAlert, CheckCircle2, CreditCard, Settings, LogOut,
  BarChart3, Plus, Search, Filter, ArrowRight, MapPin, 
  Activity, DollarSign, Briefcase, ChevronRight, AlertCircle,
  Smartphone, Plane, ShieldCheck, Compass, Info, Bus, Image as ImageIcon,
  MessageSquare, UserCog, Database, ClipboardCheck, LayoutDashboard, Truck
} from 'lucide-react';
import { User, UserRole } from '../types';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Define Menu Items based on Role
  const getMenuItems = () => {
    const common = [{ id: 'profile', icon: UserCog, label: 'Profile' }];
    
    switch (user.role) {
      case UserRole.SUPER_ADMIN:
        return [
          { id: 'overview', icon: LayoutDashboard, label: 'Command Center' },
          { id: 'users', icon: Users, label: 'Staff Management' },
          { id: 'analytics', icon: TrendingUp, label: 'Global Analytics' },
          { id: 'system', icon: Database, label: 'System Logs' },
          ...common
        ];
      case UserRole.FINANCE:
        return [
          { id: 'overview', icon: DollarSign, label: 'Finance Hub' },
          { id: 'payments', icon: CreditCard, label: 'Validasi Bayar' },
          { id: 'invoices', icon: FileText, label: 'Invoices' },
          { id: 'reports', icon: BarChart3, label: 'Revenue Report' },
          ...common
        ];
      case UserRole.CONTENT_MANAGEMENT:
        return [
          { id: 'overview', icon: Briefcase, label: 'Content Atelier' },
          { id: 'packages', icon: Plus, label: 'Edit Paket' },
          { id: 'media', icon: ImageIcon, label: 'Visual Library' },
          { id: 'marketing', icon: Sparkles, label: 'Ad Copy' },
          ...common
        ];
      case UserRole.PO_BUS:
        return [
          { id: 'overview', icon: Truck, label: 'Fleet Status' },
          { id: 'units', icon: Bus, label: 'Inventory Unit' },
          { id: 'drivers', icon: UserCog, label: 'Chauffeur List' },
          { id: 'schedule', icon: Calendar, label: 'Rental Schedule' },
          ...common
        ];
      case UserRole.SUPPORT_STAFF:
        return [
          { id: 'overview', icon: MessageSquare, label: 'Inquiry Desk' },
          { id: 'docs', icon: ClipboardCheck, label: 'Doc Verification' },
          { id: 'tasks', icon: Clock, label: 'Active Tasks' },
          ...common
        ];
      default:
        return [
          { id: 'overview', icon: BarChart3, label: 'My Journey' },
          { id: 'bookings', icon: Calendar, label: 'Bookings' },
          { id: 'documents', icon: FileText, label: 'My Docs' },
          { id: 'finance', icon: CreditCard, label: 'Settlement' },
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
                   {user.role.replace('_', ' ')} ATELIER
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
          {/* NAVIGATION SIDEBAR */}
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

          {/* DYNAMIC CONTENT AREA */}
          <div className="lg:col-span-9">
            <RoleBasedView user={user} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- RENDER LOGIC BASED ON ROLE ---
const RoleBasedView: React.FC<{ user: User, activeTab: string }> = ({ user, activeTab }) => {
  if (activeTab !== 'overview') {
    return (
      <div className="bg-white rounded-[50px] p-24 text-center border border-emerald-950/5 shadow-xl animate-fade-in">
        <div className="w-20 h-20 bg-emerald-950/5 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-950/20">
          <Settings size={32} />
        </div>
        <h3 className="text-2xl font-black text-emerald-950 tracking-tighter mb-2">Module: {activeTab.toUpperCase()}</h3>
        <p className="text-emerald-950/30 text-[10px] font-black uppercase tracking-[0.5em]">Dalam Tahap Sinkronisasi Data</p>
      </div>
    );
  }

  // Dashboard Overview Content based on Role
  switch (user.role) {
    case UserRole.SUPER_ADMIN:
      return (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Revenue" value="Rp 24.5B" icon={DollarSign} trend="+18%" />
            <StatCard label="Active Staff" value="48 People" icon={Users} trend="Direct Control" />
            <StatCard label="System Health" value="99.9%" icon={Activity} trend="Operational" />
          </div>
          <div className="bg-white p-10 rounded-[50px] border border-emerald-950/5 shadow-xl">
             <h3 className="text-2xl font-black text-emerald-950 tracking-tighter mb-8">Recent Staff Activity</h3>
             <div className="space-y-6">
                {[
                  { name: "Finance Dept", task: "Approved Payment #KR991", time: "2m ago" },
                  { name: "Fleet Manager", task: "Scheduled 3 Sprinters for Ramadan", time: "15m ago" },
                  { name: "Content Team", task: "Updated Europe Heritage Package", time: "1h ago" }
                ].map((log, i) => (
                  <div key={i} className="flex justify-between items-center p-6 bg-ivory rounded-3xl border border-emerald-950/5">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-emerald-950 text-white rounded-xl flex items-center justify-center font-black text-xs">{log.name.charAt(0)}</div>
                      <p className="font-black text-emerald-950 text-sm">{log.name} <span className="text-emerald-950/30 font-bold ml-2">— {log.task}</span></p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-950/20 uppercase">{log.time}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      );

    case UserRole.FINANCE:
      return (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard label="Pending Validasi" value="12 Transaksi" icon={Clock} trend="Action Required" />
            <StatCard label="Dana Masuk Hari Ini" value="Rp 125.0M" icon={DollarSign} trend="+5%" />
          </div>
          <div className="bg-emerald-950 text-white p-12 rounded-[50px] shadow-4xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10"><DollarSign size={120} /></div>
             <div className="relative z-10 space-y-6">
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.5em]">Outstanding Invoice</p>
                <p className="text-6xl font-black text-gold-400 tracking-tighter">Rp 4.2B</p>
                <div className="flex space-x-4">
                  <button className="bg-white text-emerald-950 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all">Lacak Piutang</button>
                  <button className="bg-white/10 border border-white/10 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">Cetak Rekap</button>
                </div>
             </div>
          </div>
        </div>
      );

    case UserRole.PO_BUS:
      return (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Ready to Roll" value="18 Unit" icon={Bus} trend="In Garage" />
            <StatCard label="On Service" value="2 Unit" icon={Settings} trend="Maintenance" />
            <StatCard label="Rental Active" value="12 Unit" icon={Calendar} trend="On Route" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="bg-white p-10 rounded-[50px] border border-emerald-950/5 shadow-xl space-y-6">
                <h3 className="text-xl font-black text-emerald-950">Active Dispatch</h3>
                <div className="space-y-4">
                   {[
                     { unit: "KR-SPR-01", route: "Jakarta - Bandung", status: "En Route", color: "text-emerald-600" },
                     { unit: "KR-BUS-09", route: "Airport Transfer", status: "Waiting Client", color: "text-gold-600" }
                   ].map((d, i) => (
                     <div key={i} className="flex justify-between items-center p-5 bg-ivory rounded-2xl">
                        <div>
                          <p className="font-black text-emerald-950">{d.unit}</p>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase">{d.route}</p>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${d.color}`}>{d.status}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="bg-emerald-950 p-10 rounded-[50px] text-white flex flex-col justify-center items-center text-center space-y-4">
                <Truck size={48} className="text-gold-400 mb-2" />
                <h3 className="text-2xl font-black tracking-tighter">Inventory Audit</h3>
                <p className="text-white/40 text-sm font-medium">Jadwalkan pemeriksaan unit Mercedes-Benz Sprinter minggu depan.</p>
                <button className="bg-gold-500 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest mt-4">Buka Checklist</button>
             </div>
          </div>
        </div>
      );

    case UserRole.SUPPORT_STAFF:
      return (
        <div className="space-y-8 animate-fade-in">
           <div className="bg-white p-10 rounded-[50px] border border-emerald-950/5 shadow-xl space-y-10">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-black text-emerald-950 tracking-tighter">Document Pipeline</h3>
                 <span className="bg-gold-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl animate-pulse">8 New Submissions</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { name: "H. Abdul Somad", type: "Paspor Baru", status: "Need Review", date: "Today" },
                   { name: "Ibu Fatimah", type: "Vaksin Meningitis", status: "Processing", date: "Yesterday" },
                   { name: "Bp. Gunawan", type: "Visa Umrah", status: "Need Review", date: "Today" },
                   { name: "Siti Zulaikha", type: "Pas Foto", status: "Verified", date: "2d ago" }
                 ].map((doc, i) => (
                   <div key={i} className="p-6 bg-ivory rounded-3xl border border-emerald-950/5 flex justify-between items-center group hover:bg-emerald-950 transition-all duration-700">
                      <div>
                         <p className="font-black text-emerald-950 group-hover:text-white">{doc.name}</p>
                         <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest mt-1 group-hover:text-gold-400">{doc.type}</p>
                      </div>
                      <div className="text-right">
                         <p className={`text-[9px] font-black uppercase tracking-widest ${doc.status === 'Verified' ? 'text-emerald-600' : 'text-gold-600'}`}>{doc.status}</p>
                         <p className="text-[8px] font-bold text-emerald-950/20 uppercase mt-1 group-hover:text-white/20">{doc.date}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      );

    default:
      return <div className="text-center p-20 text-emerald-950/20 font-black uppercase">Dashboard Non-Staf Belum Disesuaikan</div>;
  }
};

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
        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{trend}</p>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
       <Icon size={120} />
    </div>
  </div>
);
