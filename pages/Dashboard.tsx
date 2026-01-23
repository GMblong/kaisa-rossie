
import React, { useState } from 'react';
import { 
  Users, TrendingUp, ShieldCheck, CreditCard, DollarSign, Target, PlaneTakeoff, Truck, Sparkles, MessageSquare, UserCog, Database, ClipboardCheck, LayoutDashboard, Ticket, ListChecks, Wallet, User as UserIcon, Layers, ArrowLeft, ImageIcon, Bus, Calendar, FileCheck, Compass
} from 'lucide-react';
import { User, UserRole } from '../types';

// Role-specific View Components
import { ProfileView } from '../components/dashboard/ProfileView';
import { CustomerView } from '../components/dashboard/CustomerView';
import { SuperAdminView } from '../components/dashboard/SuperAdminView';
import { FinanceView } from '../components/dashboard/FinanceView';
import { SalesAgentView } from '../components/dashboard/SalesAgentView';
import { TicketingView } from '../components/dashboard/TicketingView';
import { ContentManagementView } from '../components/dashboard/ContentManagementView';
import { POBusView } from '../components/dashboard/POBusView';
import { SupportStaffView } from '../components/dashboard/SupportStaffView';

interface DashboardProps {
  user: User;
  onSelectPackage?: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onSelectPackage }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewingRole, setViewingRole] = useState<UserRole | null>(null);

  const effectiveRole = user.role === UserRole.SUPER_ADMIN && viewingRole ? viewingRole : user.role;

  const getMenuItems = () => {
    const common = [{ id: 'profile', icon: UserCog, label: 'Profil' }];

    switch (effectiveRole) {
      case UserRole.SUPER_ADMIN:
        return [
          { id: 'overview', icon: LayoutDashboard, label: 'Command' },
          { id: 'users', icon: Users, label: 'Staf' },
          { id: 'analytics', icon: TrendingUp, label: 'Analitik' },
          { id: 'system', icon: Database, label: 'Log' },
          ...common
        ];
      case UserRole.FINANCE:
        return [
          { id: 'overview', icon: DollarSign, label: 'Kas' },
          { id: 'payments', icon: CreditCard, label: 'Validasi' },
          { id: 'invoices', icon: ListChecks, label: 'Tagihan' },
          { id: 'reports', icon: TrendingUp, label: 'Laporan' },
          ...common
        ];
      case UserRole.SALES_AGENT:
        return [
          { id: 'overview', icon: Target, label: 'Sales' },
          { id: 'leads', icon: Users, label: 'Leads' },
          { id: 'commissions', icon: Wallet, label: 'Komisi' },
          { id: 'marketing', icon: Sparkles, label: 'Kit' },
          ...common
        ];
      case UserRole.TICKETING:
        return [
          { id: 'overview', icon: PlaneTakeoff, label: 'Air Ops' },
          { id: 'manifest', icon: ListChecks, label: 'Manifest' },
          { id: 'blocks', icon: Ticket, label: 'GSA' },
          { id: 'visa', icon: ShieldCheck, label: 'Visa' },
          ...common
        ];
      case UserRole.CONTENT_MANAGEMENT:
        return [
          { id: 'overview', icon: LayoutDashboard, label: 'Ringkasan' },
          { id: 'packages', icon: Layers, label: 'Katalog' },
          { id: 'media', icon: ImageIcon, label: 'Media Hub' },
          { id: 'marketing', icon: Sparkles, label: 'AI Studio' },
          ...common
        ];
      case UserRole.PO_BUS:
        return [
          { id: 'overview', icon: Truck, label: 'Armada' },
          { id: 'units', icon: Bus, label: 'Unit' },
          { id: 'drivers', icon: UserIcon, label: 'Kru' },
          { id: 'schedule', icon: Calendar, label: 'Jadwal' },
          ...common
        ];
      case UserRole.SUPPORT_STAFF:
        return [
          { id: 'overview', icon: LayoutDashboard, label: 'Support' },
          { id: 'docs', icon: FileCheck, label: 'Berkas' },
          { id: 'tasks', icon: ListChecks, label: 'Tugas' },
          ...common
        ];
      default:
        return [
          { id: 'overview', icon: LayoutDashboard, label: 'Ringkasan' },
          { id: 'explore', icon: Sparkles, label: 'Eksplorasi' },
          { id: 'bookings', icon: Ticket, label: 'Reservasi' },
          { id: 'documents', icon: ListChecks, label: 'Berkas' },
          { id: 'finance', icon: Wallet, label: 'Keuangan' },
          ...common
        ];
    }
  };

  const menuItems = getMenuItems();

  const renderRoleView = () => {
    if (activeTab === 'profile') return <ProfileView user={user} role={effectiveRole} />;

    switch (effectiveRole) {
      case UserRole.SUPER_ADMIN:
        return <SuperAdminView activeTab={activeTab} setActiveTab={setActiveTab} setViewingRole={setViewingRole} />;
      case UserRole.CUSTOMER:
        return <CustomerView activeTab={activeTab} setActiveTab={setActiveTab} onSelectPackage={onSelectPackage} />;
      case UserRole.FINANCE:
        return <FinanceView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case UserRole.SALES_AGENT:
        return <SalesAgentView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case UserRole.TICKETING:
        return <TicketingView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case UserRole.CONTENT_MANAGEMENT:
        return <ContentManagementView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case UserRole.PO_BUS:
        return <POBusView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case UserRole.SUPPORT_STAFF:
        return <SupportStaffView activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-ivory min-h-screen pb-20 md:pb-32">
      {/* HEADER SECTION */}
      <section className="bg-emerald-950 pt-24 pb-16 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 islamic-pattern scale-110 pointer-events-none"></div>
        <div className="container-luxe relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center space-x-3 md:space-x-5 text-gold-400">
               <ShieldCheck size={18} />
               <div className="w-8 md:w-12 h-px bg-gold-500/30"></div>
               <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">
                 {viewingRole ? `${viewingRole.replace('_', ' ')} AUDIT` : `${effectiveRole.replace('_', ' ')} PORTAL`}
               </p>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black text-white tracking-tighter leading-[1] md:leading-[0.85]">
              Salaam, <br /> <span className="text-gold-500 italic font-serif font-light">{user.name.split(' ')[0]}.</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6 bg-white/5 backdrop-blur-3xl p-4 md:p-6 rounded-[30px] md:rounded-[40px] border border-white/10 shadow-4xl w-full lg:w-auto">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[28px] bg-gold-500 flex items-center justify-center text-white font-black text-xl md:text-3xl shadow-2xl shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 pr-2">
              <p className="text-base md:text-xl font-black text-white mb-0.5 truncate">{user.name}</p>
              <p className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] md:tracking-[0.4em] truncate">{viewingRole ? `Mode Audit` : user.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION & CONTENT GRID */}
      <div className="container-luxe -mt-8 md:-mt-16 relative z-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
             {user.role === UserRole.SUPER_ADMIN && viewingRole && (
               <button 
                onClick={() => { setViewingRole(null); setActiveTab('overview'); }}
                className="w-full bg-gold-500 text-white p-5 md:p-6 rounded-2xl md:rounded-[30px] font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center space-x-3 shadow-xl hover:bg-emerald-950 transition-all mb-2"
               >
                 <ArrowLeft size={16} />
                 <span>Kembali Admin</span>
               </button>
             )}
             
             <div className="bg-white p-3 md:p-6 rounded-[30px] md:rounded-[50px] border border-emerald-950/5 shadow-3xl lg:sticky lg:top-24 flex lg:flex-col items-center lg:items-stretch overflow-x-auto lg:overflow-visible no-scrollbar gap-2 md:gap-3">
                {menuItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex-shrink-0 flex items-center space-x-3 md:space-x-4 p-3.5 md:p-4 rounded-[18px] md:rounded-[22px] font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-500 ${
                      activeTab === item.id 
                        ? 'bg-emerald-950 text-gold-400 shadow-xl scale-105 px-6 lg:px-4' 
                        : 'text-emerald-950/30 hover:bg-ivory hover:text-emerald-950'
                    }`}
                  >
                    <item.icon size={16} className="md:w-[18px] md:h-[18px]" />
                    <span>{item.label}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9 min-h-[50vh]">
            {renderRoleView()}
          </div>
        </div>
      </div>
    </div>
  );
};
