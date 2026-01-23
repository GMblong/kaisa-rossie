
import React, { useState } from 'react';
import { 
  Truck, Bus, User as UserIcon, Calendar, Navigation, 
  Globe, Settings, Plus, Star, X, MapPin, Wrench, 
  ShieldCheck, ArrowUpRight, CheckCircle2, Loader2, 
  Search, Filter, ChevronRight, AlertCircle, Info,
  Fuel, Activity, MoreVertical, Type, Trash2, Edit,
  Clock, Map, UserPlus, Phone, Briefcase, Minus
} from 'lucide-react';
import { StatCard } from './Shared';

interface FleetUnit {
  id: string;
  plate: string;
  type: string;
  brand: string;
  cap: string;
  status: 'Available' | 'On Trip' | 'Maintenance';
  lastService: string;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  unit: string;
  status: 'On-Duty' | 'Standby' | 'Off';
  role: 'Main Driver' | 'Co-Driver' | 'Crew';
  rating: number;
}

interface TripAssignment {
  id: string;
  unitId: string;
  driverId: string;
  route: string;
  customer: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Pending' | 'Completed';
}

export const POBusView: React.FC<{ activeTab: string, setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  // --- STATES ---
  const [units, setUnits] = useState<FleetUnit[]>([
    { id: "KR-BUS-01", plate: "H 1234 KA", type: "Big Bus", brand: "Mercedes-Benz 1626", cap: "45 Seats", status: "Available", lastService: "20 Feb 2024" },
    { id: "KR-SPR-02", plate: "H 5678 RS", type: "Sprinter", brand: "Mercedes-Benz Sprinter", cap: "11 Seats", status: "On Trip", lastService: "05 Mar 2024" },
    { id: "KR-BUS-03", plate: "H 9012 AA", type: "Medium Bus", brand: "Hino FB 130", cap: "31 Seats", status: "Maintenance", lastService: "10 Mar 2024" },
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    { id: "D-01", name: "Pak Jajang", phone: "0812-3456-7890", unit: "KR-BUS-01", status: "On-Duty", role: "Main Driver", rating: 4.9 },
    { id: "D-02", name: "Pak Ruslan", phone: "0812-9876-5432", unit: "KR-SPR-02", status: "Standby", role: "Main Driver", rating: 4.8 },
    { id: "D-03", name: "Pak Bambang", phone: "0813-1122-3344", unit: "None", status: "Off", role: "Co-Driver", rating: 4.7 },
  ]);

  const [assignments, setAssignments] = useState<TripAssignment[]>([
    { id: "TR-001", unitId: "KR-SPR-02", driverId: "D-02", route: "Semarang - Solo", customer: "Grup Umrah Mar-A", startDate: "2024-03-15", endDate: "2024-03-16", status: "Active" }
  ]);

  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showAddCrew, setShowAddCrew] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form States
  const [newUnit, setNewUnit] = useState({ id: '', plate: '', brand: 'Mercedes-Benz 1626', cap: '45 Seats', type: 'Big Bus' });
  const [newCrew, setNewCrew] = useState({ name: '', phone: '', role: 'Main Driver' as Driver['role'], unit: 'None' });
  const [newAssign, setNewAssign] = useState({ unitId: '', driverId: '', route: '', customer: '', startDate: '', endDate: '' });

  // --- ACTIONS ---
  const handleAddUnit = () => {
    if (!newUnit.id || !newUnit.plate) return;
    setIsProcessing(true);
    setTimeout(() => {
      const unit: FleetUnit = {
        ...newUnit,
        status: 'Available',
        lastService: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      setUnits([unit, ...units]);
      setShowAddUnit(false);
      setIsProcessing(false);
      setNewUnit({ id: '', plate: '', brand: 'Mercedes-Benz 1626', cap: '45 Seats', type: 'Big Bus' });
    }, 1500);
  };

  const handleAddCrew = () => {
    if (!newCrew.name || !newCrew.phone) return;
    setIsProcessing(true);
    setTimeout(() => {
      const crew: Driver = {
        id: `D-0${drivers.length + 1}`,
        ...newCrew,
        status: 'Standby',
        rating: 5.0
      };
      setDrivers([crew, ...drivers]);
      setShowAddCrew(false);
      setIsProcessing(false);
      setNewCrew({ name: '', phone: '', role: 'Main Driver', unit: 'None' });
    }, 1500);
  };

  const handleCreateAssignment = () => {
    if (!newAssign.unitId || !newAssign.driverId || !newAssign.route) return;
    setIsProcessing(true);
    setTimeout(() => {
      const assignment: TripAssignment = {
        id: `TR-00${assignments.length + 1}`,
        ...newAssign,
        status: 'Pending'
      };
      setAssignments([assignment, ...assignments]);
      setUnits(prev => prev.map(u => u.id === newAssign.unitId ? { ...u, status: 'On Trip' } : u));
      setShowAssignment(false);
      setIsProcessing(false);
      setNewAssign({ unitId: '', driverId: '', route: '', customer: '', startDate: '', endDate: '' });
    }, 2000);
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
          <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center"><AlertCircle size={22} className="text-gold-600" /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Operasional Terverifikasi</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.1em]">Input data akan segera sinkron ke sistem monitoring GSA.</p>
          </div>
       </div>
       <div className="flex gap-4 w-full md:w-auto">
          <button onClick={onCancel} className="flex-1 md:px-14 py-6 bg-ivory text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all border border-emerald-950/5 active:scale-95">Batal</button>
          <button 
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 md:px-20 py-6 bg-emerald-950 text-gold-400 rounded-[25px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-5xl active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin mx-auto"/> : submitText}
          </button>
       </div>
    </div>
  );

  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-8 md:space-y-12 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <StatCard label="Unit Siap" value={units.filter(u => u.status === 'Available').length.toString()} icon={Bus} trend="Optimal" />
            <StatCard label="Trip Berjalan" value={units.filter(u => u.status === 'On Trip').length.toString()} icon={Navigation} trend="Live Tracking" />
            <StatCard label="Dalam Perawatan" value={units.filter(u => u.status === 'Maintenance').length.toString()} icon={Settings} trend="Penting" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10 relative overflow-hidden">
               <div className="flex justify-between items-center relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Fleet Telemetry</h3>
                    <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Real-time GPS Monitoring</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[8px] font-black uppercase text-emerald-700 tracking-widest">Systems Active</span>
                  </div>
               </div>
               
               <div className="aspect-[21/9] bg-ivory rounded-[40px] flex items-center justify-center relative overflow-hidden group shadow-inner border border-emerald-950/5">
                  <Globe size={180} className="text-emerald-950/[0.03] group-hover:scale-125 transition-transform duration-[30s]"/>
                  {assignments.filter(a => a.status === 'Active').map((a, i) => (
                    <div key={i} className="absolute top-1/3 left-1/3 flex flex-col items-center animate-bounce-slow">
                      <div className="px-4 py-2 bg-emerald-950 text-gold-400 rounded-xl shadow-2xl text-[8px] font-black border border-white/10 whitespace-nowrap uppercase tracking-widest">
                        {a.unitId} ({a.route})
                      </div>
                      <div className="w-px h-10 bg-gradient-to-b from-emerald-950 to-transparent"></div>
                    </div>
                  ))}
                  <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none scale-150"></div>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  {[
                    { label: 'Avg Fuel', val: '92%', icon: Fuel },
                    { label: 'Idle Units', val: units.filter(u => u.status === 'Available').length.toString(), icon: Activity },
                    { label: 'Safety Score', val: '9.8', icon: ShieldCheck },
                    { label: 'Maintenance', val: 'Ready', icon: Wrench }
                  ].map((stat, i) => (
                    <div key={i} className="p-5 bg-ivory rounded-[30px] border border-emerald-950/5 text-center group hover:bg-emerald-950 transition-all duration-500">
                       <stat.icon size={18} className="mx-auto mb-3 text-emerald-950/20 group-hover:text-gold-500 transition-colors" />
                       <p className="text-[8px] font-black uppercase text-emerald-950/30 group-hover:text-white/30 tracking-widest">{stat.label}</p>
                       <p className="text-lg font-black text-emerald-950 group-hover:text-white tracking-tight">{stat.val}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-4 space-y-6 md:space-y-8">
               <div className="bg-emerald-950 p-10 md:p-12 rounded-[40px] md:rounded-[50px] text-white space-y-10 relative overflow-hidden shadow-2xl h-full flex flex-col justify-between group">
                  <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform duration-700 shadow-xl">
                      <Plus size={32} />
                    </div>
                    <h4 className="text-3xl font-black tracking-tighter leading-[0.9] uppercase">Mobility <br />Command</h4>
                    <p className="text-white/40 text-[11px] leading-relaxed">Kelola penugasan trip dan penjadwalan armada dalam satu dasbor terpusat.</p>
                  </div>
                  <div className="relative z-10 space-y-4">
                    <button 
                      onClick={() => setShowAssignment(true)}
                      className="w-full py-6 bg-gold-500 text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
                    >
                      Assign New Trip
                    </button>
                    <button 
                      onClick={() => setActiveTab('units')}
                      className="w-full py-6 bg-white/10 text-white border border-white/10 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                      View Full Inventory
                    </button>
                  </div>
                  <div className="absolute inset-0 opacity-10 islamic-pattern scale-[2] group-hover:rotate-12 transition-transform duration-[15s] pointer-events-none"></div>
               </div>
            </div>
          </div>
        </div>
      );

    case 'units':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 border-b border-emerald-950/5 pb-10">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Inventori Unit</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Koleksi Bus & Sprinter Premium</p>
            </div>
            <button 
              onClick={() => setShowAddUnit(true)}
              className="w-full sm:w-auto bg-emerald-950 text-white px-10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-gold-500 shadow-xl transition-all active:scale-95"
            >
              <Plus size={20}/> <span className="hidden sm:inline">Daftarkan Unit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {units.map((u) => (
              <div key={u.id} className="p-8 md:p-12 bg-ivory rounded-[45px] md:rounded-[55px] space-y-8 md:space-y-10 group hover:bg-emerald-950 transition-all duration-700 shadow-sm relative overflow-hidden border border-emerald-950/5">
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-18 h-18 md:w-24 md:h-24 bg-white rounded-[30px] md:rounded-[35px] flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all shrink-0">
                    <Bus size={32} />
                  </div>
                  <div className="text-right space-y-2">
                    <span className={`px-5 py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      u.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
                      u.status === 'Maintenance' ? 'bg-red-100 text-red-700' : 'bg-gold-100 text-gold-700'
                    }`}>{u.status}</span>
                    <p className="text-base font-black text-emerald-950 group-hover:text-white/40 tracking-widest transition-colors">{u.plate}</p>
                  </div>
                </div>
                
                <div className="space-y-2 relative z-10">
                  <h4 className="text-3xl md:text-5xl font-black text-emerald-950 group-hover:text-white tracking-tighter leading-none transition-colors">{u.id}</h4>
                  <p className="text-[10px] md:text-[12px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-4 transition-colors">
                    {u.brand} • {u.cap}
                  </p>
                </div>

                <div className="pt-6 border-t border-emerald-950/5 group-hover:border-white/10 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-3">
                    <Settings size={14} className="text-emerald-950/20 group-hover:text-gold-500" />
                    <p className="text-[9px] font-black uppercase text-emerald-950/30 group-hover:text-white/20 tracking-widest">Service: {u.lastService}</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-3 bg-white rounded-xl shadow-md text-emerald-950 hover:bg-gold-500 transition-all"><Edit size={16}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ATELIER REGISTER UNIT MODAL */}
          {showAddUnit && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-4xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[90vh]">
                {renderModalHeader("Register Unit", "Fleet Inventory Management", () => setShowAddUnit(false))}
                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/30">
                  <div className="space-y-16 max-w-3xl mx-auto">
                    <div className="space-y-10">
                      <div className="flex items-center space-x-5 border-l-4 border-gold-500 pl-6">
                        <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><Bus size={24}/></div>
                        <div>
                          <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Identity & Type</h5>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Data legalitas dan spesifikasi armada</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Unit Call Sign / ID</label>
                          <div className="relative">
                            <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                            <input type="text" value={newUnit.id} onChange={(e) => setNewUnit({...newUnit, id: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Contoh: KR-BUS-05" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Nomor Polisi</label>
                          <div className="relative">
                            <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                            <input type="text" value={newUnit.plate} onChange={(e) => setNewUnit({...newUnit, plate: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="H 1234 RS" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Kategori Unit</label>
                          <div className="relative">
                            <select value={newUnit.type} onChange={(e) => setNewUnit({...newUnit, type: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 appearance-none shadow-sm cursor-pointer">
                              <option>Big Bus</option>
                              <option>Medium Bus</option>
                              <option>Sprinter</option>
                              <option>Hiace VIP</option>
                            </select>
                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={20} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Chassis / Brand</label>
                          <input type="text" value={newUnit.brand} onChange={(e) => setNewUnit({...newUnit, brand: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Mercedes-Benz 1626 / Scania" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {renderModalFooter(() => setShowAddUnit(false), handleAddUnit, "Authorize Unit", isProcessing)}
              </div>
            </div>
          )}
        </div>
      );

    case 'drivers':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Database Kru</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Manajemen Sumber Daya Manusia Armada</p>
            </div>
            <button onClick={() => setShowAddCrew(true)} className="bg-emerald-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 shadow-xl transition-all active:scale-95">Register Crew</button>
          </div>
          
          <div className="space-y-4">
            {drivers.map((d) => (
              <div key={d.id} className="p-8 bg-ivory rounded-[50px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-6 shadow-sm">
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center text-emerald-950 shadow-xl group-hover:bg-gold-500 group-hover:text-white transition-all font-black text-2xl">
                    {d.name.charAt(4)}
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-black text-emerald-950 group-hover:text-white transition-colors leading-tight">{d.name}</p>
                      <div className="flex items-center gap-1.5 text-gold-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-black">{d.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] group-hover:text-gold-400 mt-2 transition-colors">{d.role} • Unit: {d.unit} • {d.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                  <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    d.status === 'On-Duty' ? 'bg-emerald-100 text-emerald-700' : 
                    d.status === 'Standby' ? 'bg-gold-100 text-gold-700' : 'bg-gray-100 text-gray-500'
                  }`}>{d.status}</span>
                  <button className="p-4 bg-white rounded-2xl shadow-md text-emerald-950 group-hover:bg-white/10 group-hover:text-white transition-all active:scale-90"><MoreVertical size={20}/></button>
                </div>
              </div>
            ))}
          </div>

          {/* ATELIER REGISTER CREW MODAL */}
          {showAddCrew && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-4xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[90vh]">
                {renderModalHeader("Register Crew", "Human Resources Development", () => setShowAddCrew(false))}
                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/30">
                  <div className="space-y-16 max-w-3xl mx-auto">
                    <div className="space-y-10">
                      <div className="flex items-center space-x-5 border-l-4 border-gold-500 pl-6">
                        <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><UserPlus size={24}/></div>
                        <div>
                          <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Personal Details</h5>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Informasi kru dan penugasan utama</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Nama Lengkap Sesuai KTP</label>
                          <div className="relative">
                            <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                            <input type="text" value={newCrew.name} onChange={(e) => setNewCrew({...newCrew, name: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Contoh: Pak Suwandi" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Nomor WhatsApp Aktif</label>
                          <div className="relative">
                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                            <input type="tel" value={newCrew.phone} onChange={(e) => setNewCrew({...newCrew, phone: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="08123456789" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Peran Utama (Role)</label>
                          <div className="relative">
                            <select value={newCrew.role} onChange={(e) => setNewCrew({...newCrew, role: e.target.value as Driver['role']})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 appearance-none shadow-sm cursor-pointer">
                              <option>Main Driver</option>
                              <option>Co-Driver</option>
                              <option>Crew</option>
                            </select>
                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={20} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Default Unit Assignment</label>
                          <div className="relative">
                            <select value={newCrew.unit} onChange={(e) => setNewCrew({...newCrew, unit: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 appearance-none shadow-sm cursor-pointer">
                              <option value="None">Pilih Unit (Opsional)</option>
                              {units.map(u => <option key={u.id} value={u.id}>{u.id} - {u.plate}</option>)}
                            </select>
                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {renderModalFooter(() => setShowAddCrew(false), handleAddCrew, "Onboard Crew", isProcessing)}
              </div>
            </div>
          )}
        </div>
      );

    case 'schedule':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-1">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Jadwal Sewa</h3>
              <p className="text-emerald-950/30 text-[11px] font-black uppercase tracking-widest">Assignment Kalender Operasional Armada</p>
            </div>
            <div className="flex gap-3">
              <button className="p-4 bg-ivory rounded-xl border border-emerald-950/5 text-emerald-950"><Filter size={20}/></button>
              <button onClick={() => setShowAssignment(true)} className="bg-emerald-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 shadow-xl transition-all active:scale-95 flex items-center gap-3"><Plus size={18}/> New Assignment</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
             {assignments.map((a, i) => (
               <div key={i} className="p-8 bg-ivory rounded-[30px] border border-emerald-950/5 flex flex-col md:flex-row justify-between items-center gap-8 group hover:bg-emerald-950 transition-all duration-700">
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-950 shadow-md group-hover:bg-gold-500 group-hover:text-white transition-all"><Clock size={24}/></div>
                    <div className="space-y-1">
                       <h4 className="text-xl font-black text-emerald-950 group-hover:text-white transition-colors">{a.route}</h4>
                       <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-gold-400">{a.startDate} • {a.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 w-full md:w-auto justify-end">
                    <div className="text-right hidden md:block">
                       <p className="text-xs font-black text-emerald-950 group-hover:text-white uppercase tracking-widest">{a.unitId}</p>
                       <p className="text-[9px] font-bold text-emerald-950/30 uppercase group-hover:text-white/40">{drivers.find(d => d.id === a.driverId)?.name}</p>
                    </div>
                    <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${a.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gold-100 text-gold-700'}`}>{a.status}</span>
                  </div>
               </div>
             ))}
          </div>

          <div className="p-10 bg-ivory rounded-[50px] border border-emerald-950/5 flex flex-col lg:flex-row items-center justify-between gap-10">
             <div className="flex items-center gap-8">
                <div className="w-16 h-16 bg-emerald-950 text-gold-400 rounded-2xl flex items-center justify-center shadow-xl shrink-0"><Info size={28}/></div>
                <div className="space-y-2">
                   <h4 className="text-xl font-black text-emerald-950 uppercase tracking-tight">Assignment Insights</h4>
                   <p className="text-emerald-950/40 text-sm font-medium leading-relaxed">Terdapat slot kosong pada akhir pekan ke-4. Gunakan unit KR-BUS-01 untuk maintenance rutin.</p>
                </div>
             </div>
             <button onClick={() => setShowAssignment(true)} className="w-full lg:w-auto px-12 py-5 bg-emerald-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-xl active:scale-95">Deploy Trip</button>
          </div>

          {/* ATELIER CREATE ASSIGNMENT MODAL */}
          {showAssignment && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-4xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[95vh]">
                {renderModalHeader("Deploy Trip", "Mobility Command & Control", () => setShowAssignment(false))}
                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/30">
                  <div className="space-y-16 max-w-3xl mx-auto">
                    <div className="space-y-10">
                      <div className="flex items-center space-x-5 border-l-4 border-gold-500 pl-6">
                        <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><Navigation size={24}/></div>
                        <div>
                          <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Logistics Pairing</h5>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Penugasan armada dan pengemudi terpilih</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Unit Armada</label>
                          <div className="relative">
                            <select value={newAssign.unitId} onChange={(e) => setNewAssign({...newAssign, unitId: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 appearance-none shadow-sm cursor-pointer">
                              <option value="">Pilih Unit Armada</option>
                              {units.filter(u => u.status === 'Available').map(u => <option key={u.id} value={u.id}>{u.id} - {u.plate}</option>)}
                            </select>
                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={20} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Pengemudi Utama</label>
                          <div className="relative">
                            <select value={newAssign.driverId} onChange={(e) => setNewAssign({...newAssign, driverId: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 appearance-none shadow-sm cursor-pointer">
                              <option value="">Pilih Pengemudi</option>
                              {drivers.filter(d => d.status === 'Standby').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={20} />
                          </div>
                        </div>
                        <div className="space-y-3 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Rute Perjalanan</label>
                          <div className="relative">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/20" size={18} />
                            <input type="text" value={newAssign.route} onChange={(e) => setNewAssign({...newAssign, route: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Contoh: Semarang - Makkah (Local Transfer)" />
                          </div>
                        </div>
                        <div className="space-y-3 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Klien / Nama Grup</label>
                          <input type="text" value={newAssign.customer} onChange={(e) => setNewAssign({...newAssign, customer: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Contoh: Grup Haji Mujamalah 2024" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Awal Penugasan</label>
                          <input type="date" value={newAssign.startDate} onChange={(e) => setNewAssign({...newAssign, startDate: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Akhir Penugasan</label>
                          <input type="date" value={newAssign.endDate} onChange={(e) => setNewAssign({...newAssign, endDate: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {renderModalFooter(() => setShowAssignment(false), handleCreateAssignment, "Authorize Trip", isProcessing)}
              </div>
            </div>
          )}
        </div>
      );

    default: return null;
  }
};
