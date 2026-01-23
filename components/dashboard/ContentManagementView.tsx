
import React, { useState } from 'react';
import { 
  Layers, ImageIcon, Sparkles, Plus, Edit, Eye, Download, 
  Search, Filter, MoreVertical, Trash2, Copy, Globe, 
  Clock, CheckCircle2, Loader2, X, FileText, Type, 
  MessageSquare, Send, Upload, Star, Plane, Hotel, Layout,
  ChevronRight, Target, Image as ImageSimple, Check, AlertCircle, Calendar, MapPin, Minus
} from 'lucide-react';
import { StatCard } from './Shared';
import { PACKAGES } from '../../constants';
import { Package, PackageCategory } from '../../types';
import { getTravelAssistantResponse } from '../../services/geminiService';

export const ContentManagementView: React.FC<{ activeTab: string, setActiveTab: (t: string) => void }> = ({ activeTab, setActiveTab }) => {
  // --- STATES ---
  const [localPackages, setLocalPackages] = useState<Package[]>(PACKAGES);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMediaCategory, setSelectedMediaCategory] = useState('ALL');
  
  // Modal States
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [showUploadMedia, setShowUploadMedia] = useState(false);
  
  // Rich Form State for New Package (Synchronized with PackageDetail view)
  const [newPkg, setNewPkg] = useState({
    title: '',
    category: 'UMRAH' as PackageCategory,
    price: '',
    description: '',
    duration: '',
    departureDate: '',
    quota: '30',
    airline: '',
    hotelName: '',
    hotelStars: '5',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200'
  });

  const [facilities, setFacilities] = useState<string[]>(['Lounge VIP Airport', 'Hotel Bintang 5', 'Handling Bagasi', 'Mutawwif Berpengalaman']);
  const [itinerary, setItinerary] = useState<{day: number, activity: string}[]>([
    { day: 1, activity: 'Kumpul di Bandara Soetta & Check-in' },
    { day: 2, activity: 'Tiba di Madinah & Ziarah Raudhah' }
  ]);

  // --- ACTIONS ---
  const handleAddFacility = () => setFacilities([...facilities, '']);
  const handleUpdateFacility = (idx: number, val: string) => {
    const updated = [...facilities];
    updated[idx] = val;
    setFacilities(updated);
  };
  const handleRemoveFacility = (idx: number) => setFacilities(facilities.filter((_, i) => i !== idx));

  const handleAddItinerary = () => setItinerary([...itinerary, { day: itinerary.length + 1, activity: '' }]);
  const handleUpdateItinerary = (idx: number, val: string) => {
    const updated = [...itinerary];
    updated[idx].activity = val;
    setItinerary(updated);
  };
  const handleRemoveItinerary = (idx: number) => {
    const filtered = itinerary.filter((_, i) => i !== idx).map((item, i) => ({ ...item, day: i + 1 }));
    setItinerary(filtered);
  };

  const handleAddPackage = () => {
    if (!newPkg.title || !newPkg.price) return;
    
    const pkg: Package = {
      id: `u-${Date.now()}`,
      title: newPkg.title,
      category: newPkg.category,
      price: parseInt(newPkg.price) || 0,
      description: newPkg.description || 'Eksklusivitas dalam setiap langkah ibadah dan perjalanan Anda.',
      image: newPkg.image,
      duration: newPkg.duration || '12 Hari',
      departureDate: newPkg.departureDate || '2024-12-01',
      quota: parseInt(newPkg.quota) || 30,
      remaining: parseInt(newPkg.quota) || 30,
      facilities: facilities.filter(f => f.trim() !== ''),
      itinerary: itinerary.filter(i => i.activity.trim() !== ''),
      airline: newPkg.airline,
      hotel: {
        name: newPkg.hotelName || 'Kaisa Selected Hotel',
        stars: parseInt(newPkg.hotelStars) || 5
      }
    };

    setLocalPackages([pkg, ...localPackages]);
    setShowAddPackage(false);
    // Reset
    setNewPkg({ title: '', category: 'UMRAH', price: '', description: '', duration: '', departureDate: '', quota: '30', airline: '', hotelName: '', hotelStars: '5', image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200' });
    setFacilities(['Lounge VIP Airport', 'Hotel Bintang 5', 'Handling Bagasi', 'Mutawwif Berpengalaman']);
    setItinerary([{ day: 1, activity: 'Kumpul di Bandara Soetta & Check-in' }, { day: 2, activity: 'Tiba di Madinah & Ziarah Raudhah' }]);
  };

  const handleGenerateAIForForm = async () => {
    if (!newPkg.title) {
        alert("Mohon isi judul paket terlebih dahulu agar AI dapat merancang narasi yang sesuai.");
        return;
    }
    setIsGeneratingAI(true);
    setAiResult(null);
    const prompt = `Buatkan deskripsi filosofis, puitis, dan mewah untuk paket travel ${newPkg.category} bernama "${newPkg.title}". Gunakan gaya bahasa Boutique Travel Atelier yang eksklusif dalam bahasa Indonesia. Fokus pada kenyamanan spiritual dan fasilitas VVIP. Max 150 kata.`;
    const response = await getTravelAssistantResponse(prompt);
    setAiResult(response);
    setIsGeneratingAI(false);
  };

  const filteredPackages = localPackages.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mediaAssets = [
    { id: 1, cat: 'MECCA', img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600' },
    { id: 2, cat: 'MADINAH', img: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?w=600' },
    { id: 3, cat: 'EUROPE', img: 'https://images.unsplash.com/photo-1543783232-af9942f4a472?w=600' },
    { id: 4, cat: 'FLEET', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600' },
  ];

  const filteredMedia = selectedMediaCategory === 'ALL' ? mediaAssets : mediaAssets.filter(m => m.cat === selectedMediaCategory);

  switch (activeTab) {
    case 'overview':
      return (
        <div className="space-y-8 md:space-y-12 animate-fade-in px-2 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <StatCard label="Produk Live" value={`${localPackages.length} Paket`} icon={Layers} trend="Published" />
            <StatCard label="Aset Kreatif" value="840 File" icon={ImageIcon} trend="+24 Baru" />
            <StatCard label="AI Task" value="Ready" icon={Sparkles} trend="Optimized" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-emerald-950/5 shadow-xl space-y-10">
              <div className="flex justify-between items-center border-b border-emerald-950/5 pb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tighter uppercase">Creative Roadmap</h3>
                  <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest mt-1">Antrean Produksi Konten</p>
                </div>
                <button className="p-4 bg-ivory rounded-2xl text-emerald-950 hover:bg-gold-500 hover:text-white transition-all shadow-sm"><Plus size={20}/></button>
              </div>
              <div className="space-y-4">
                {[
                  { task: "Visual Itinerary: Spain Heritage", category: "Design", due: "Besok", priority: "High" },
                  { task: "Copywriting: Haji Furoda 1446H", category: "AI Content", due: "15 Mar", priority: "Medium" },
                  { task: "Video Teaser: Sprinter VIP Unit", category: "Production", due: "Tuntas", priority: "Low", done: true }
                ].map((t, i) => (
                  <div key={i} className={`p-6 md:p-8 bg-ivory rounded-[35px] flex justify-between items-center group transition-all duration-700 border border-emerald-950/5 cursor-pointer ${t.done ? 'opacity-40 grayscale' : 'hover:bg-emerald-950 shadow-sm'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`w-3 h-3 rounded-full ${t.priority === 'High' ? 'bg-red-500' : t.priority === 'Medium' ? 'bg-gold-500' : 'bg-emerald-500'}`}></div>
                      <div>
                         <p className={`font-black text-emerald-950 group-hover:text-white text-sm md:text-base leading-tight ${t.done ? 'line-through' : ''}`}>{t.task}</p>
                         <p className="text-[9px] font-bold text-emerald-950/30 group-hover:text-gold-500 uppercase mt-1 tracking-widest">{t.category} • {t.due}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-emerald-950/10 group-hover:text-white transition-all" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-emerald-950 p-10 rounded-[50px] text-white space-y-10 relative overflow-hidden shadow-2xl h-full flex flex-col justify-between group">
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform duration-700">
                    <Sparkles size={32} />
                  </div>
                  <h4 className="text-3xl font-black tracking-tighter leading-tight uppercase">AI Marketing <br />Concierge</h4>
                  <p className="text-white/40 text-[11px] leading-relaxed">Gunakan kecerdasan buatan untuk merancang narasi perjalanan yang memikat hati jamaah.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('marketing')}
                  className="relative z-10 w-full py-6 bg-gold-500 text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
                >
                  Mulai Menulis Narasi
                </button>
                <div className="absolute inset-0 opacity-10 islamic-pattern scale-150 rotate-45 pointer-events-none group-hover:rotate-[60deg] transition-transform duration-[20s]"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'packages':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-8 md:space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-emerald-950/5 pb-10">
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase">Curated Catalog</h3>
              <p className="text-emerald-950/30 text-[9px] md:text-[11px] font-black uppercase tracking-widest">Katalog Perjalanan Premium Kaisa Rossie</p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
               <div className="relative flex-1 lg:w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-950/20" size={16} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari Paket..." 
                    className="w-full bg-ivory border border-emerald-950/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-gold-500 shadow-inner" 
                  />
               </div>
               <button 
                onClick={() => setShowAddPackage(true)}
                className="bg-emerald-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
               >
                 <Plus size={18}/> <span className="hidden sm:inline">Paket Baru</span>
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredPackages.map((p) => (
              <div key={p.id} className="p-8 md:p-10 bg-ivory rounded-[40px] md:rounded-[55px] flex flex-col lg:flex-row justify-between items-center group hover:bg-emerald-950 transition-all duration-700 gap-8 border border-emerald-950/5 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12 w-full lg:w-auto">
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-[40px] md:rounded-[55px] overflow-hidden bg-white shadow-2xl group-hover:scale-105 transition-transform shrink-0 border-[6px] border-white relative">
                    <img src={p.image} className="w-full h-full object-cover" alt={p.title}/>
                    <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="text-center sm:text-left space-y-4">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      <p className="text-2xl md:text-4xl font-black text-emerald-950 group-hover:text-white leading-tight tracking-tighter transition-colors">{p.title}</p>
                      <span className="bg-emerald-950 text-gold-500 px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-gold-500/20">LIVE</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest group-hover:text-gold-500/50 transition-colors">
                       <span className="flex items-center gap-2"><Plane size={14}/> {p.airline || 'Charter'}</span>
                       <span className="flex items-center gap-2"><Clock size={14}/> {p.duration}</span>
                       <span className="flex items-center gap-2"><Hotel size={14}/> {p.hotel?.stars || 5} Stars</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between lg:justify-end gap-6 w-full lg:w-auto border-t lg:border-t-0 border-emerald-950/5 pt-8 lg:pt-0">
                  <div className="text-center lg:text-right space-y-1">
                    <p className="text-[9px] font-black text-emerald-950/30 group-hover:text-white/30 uppercase tracking-[0.3em] transition-colors">Price per Pax</p>
                    <p className="text-2xl md:text-3xl font-black text-emerald-950 group-hover:text-white tracking-tighter transition-colors">Rp {(p.price / 1000000).toFixed(1)}jt</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-5 bg-white rounded-2xl group-hover:bg-white/10 group-hover:text-white transition-all shadow-md text-emerald-950 hover:bg-gold-500"><Edit size={22}/></button>
                    <button className="p-5 bg-white text-red-500 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-all shadow-md"><Trash2 size={22}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ATELIER RICH MODAL: Konfigurasi Paket Komprehensif (Sesuai Tampilan Customer) */}
          {showAddPackage && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
              <div className="bg-white w-full max-w-6xl md:rounded-[60px] shadow-6xl animate-scale-in relative flex flex-col h-full md:h-auto md:max-h-[95vh]">
                
                {/* Modal Header */}
                <div className="p-8 md:p-14 border-b border-emerald-950/5 flex justify-between items-center shrink-0 bg-white md:rounded-t-[60px] z-30">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md">K</div>
                      <span className="text-[10px] font-black text-emerald-950/30 uppercase tracking-[0.6em]">Kaisa Atelier Platform</span>
                    </div>
                    <h4 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Create Collection</h4>
                  </div>
                  <button onClick={() => setShowAddPackage(false)} className="p-5 bg-ivory rounded-[20px] text-emerald-950/20 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all shadow-sm"><X size={32}/></button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-ivory/30">
                  <div className="space-y-16 max-w-5xl mx-auto">
                    
                    {/* Section 1: Identity & Value */}
                    <div className="space-y-10">
                      <div className="flex items-center space-x-5 border-l-4 border-gold-500 pl-6">
                        <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><Type size={24}/></div>
                        <div>
                          <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Identity & Pricing</h5>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Detail utama dan klasifikasi paket</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Nama Paket Perjalanan</label>
                          <input type="text" value={newPkg.title} onChange={(e) => setNewPkg({...newPkg, title: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm text-emerald-950" placeholder="Contoh: Umrah Signature Ramadan" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Kategori Koleksi</label>
                          <div className="relative">
                            <select value={newPkg.category} onChange={(e) => setNewPkg({...newPkg, category: e.target.value as PackageCategory})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 appearance-none shadow-sm cursor-pointer">
                              <option value="UMRAH">UMRAH SIGNATURE</option>
                              <option value="HAJJ">ROYAL HAJI</option>
                              <option value="TOUR">HERITAGE TOUR</option>
                              <option value="BUS">VIP MOBILITY</option>
                            </select>
                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20 pointer-events-none" size={20} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Investasi per Pax (IDR)</label>
                          <div className="relative">
                             <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-emerald-950/20">Rp</span>
                             <input type="number" value={newPkg.price} onChange={(e) => setNewPkg({...newPkg, price: e.target.value})} className="w-full bg-white p-6 pl-14 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="42500000" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Logistics & Stay */}
                    <div className="space-y-10">
                      <div className="flex items-center space-x-5 border-l-4 border-gold-500 pl-6">
                        <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><Plane size={24}/></div>
                        <div>
                          <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Accommodation & Fleet</h5>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Detail maskapai dan hotel bintang lima</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Maskapai Penerbangan</label>
                          <input type="text" value={newPkg.airline} onChange={(e) => setNewPkg({...newPkg, airline: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Saudi Arabian / Qatar" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Durasi Perjalanan</label>
                          <input type="text" value={newPkg.duration} onChange={(e) => setNewPkg({...newPkg, duration: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="12 Hari" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Tanggal Keberangkatan</label>
                          <input type="date" value={newPkg.departureDate} onChange={(e) => setNewPkg({...newPkg, departureDate: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm cursor-pointer" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Hotel Utama</label>
                          <input type="text" value={newPkg.hotelName} onChange={(e) => setNewPkg({...newPkg, hotelName: e.target.value})} className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm" placeholder="Fairmont Makkah" />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: The Narrative (AI Augmented) */}
                    <div className="space-y-10">
                      <div className="flex items-center space-x-5 border-l-4 border-gold-500 pl-6">
                        <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><FileText size={24}/></div>
                        <div>
                          <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">The Narrative</h5>
                          <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Filosofi dan deskripsi puitis perjalanan</p>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40 ml-4">Copywriting Deskripsi</label>
                          <textarea 
                            value={newPkg.description} 
                            onChange={(e) => setNewPkg({...newPkg, description: e.target.value})} 
                            className="w-full bg-white p-8 rounded-[40px] border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-inner min-h-[180px] resize-none leading-relaxed text-emerald-950" 
                            placeholder="Tuliskan esensi dari perjalanan ini..."
                          ></textarea>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                           <div className="flex items-center gap-3 text-emerald-950/30">
                              <Sparkles size={16} />
                              <p className="text-[9px] font-black uppercase tracking-widest">Gunakan AI Studio untuk merangkai narasi Atelier.</p>
                           </div>
                           <button 
                            onClick={handleGenerateAIForForm}
                            disabled={isGeneratingAI}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-emerald-950 text-gold-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-xl disabled:opacity-50 active:scale-95"
                           >
                             {isGeneratingAI ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                             {isGeneratingAI ? 'Synthesizing...' : 'Generate with AI Studio'}
                           </button>
                        </div>
                        {aiResult && (
                          <div className="p-10 bg-emerald-50 rounded-[40px] border border-emerald-100 animate-fade-in relative shadow-sm overflow-hidden group">
                             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-[5s]"><Sparkles size={80} /></div>
                             <p className="text-emerald-950 font-serif italic text-xl md:text-2xl leading-relaxed relative z-10">"{aiResult}"</p>
                             <div className="mt-8 flex justify-end">
                                <button onClick={() => { setNewPkg({...newPkg, description: aiResult}); setAiResult(null); }} className="bg-emerald-950 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gold-500 transition-all active:scale-95">Adopsi Narasi AI</button>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 4: Facilities (Amenities) */}
                    <div className="space-y-10">
                      <div className="flex items-center justify-between border-l-4 border-gold-500 pl-6">
                        <div className="flex items-center space-x-5">
                          <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><Star size={24}/></div>
                          <div>
                            <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Atelier Amenities</h5>
                            <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Fasilitas eksklusif pendukung trip</p>
                          </div>
                        </div>
                        <button onClick={handleAddFacility} className="p-4 bg-emerald-950 text-white rounded-2xl hover:bg-gold-500 transition-all shadow-lg active:scale-90"><Plus size={20}/></button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {facilities.map((fac, idx) => (
                          <div key={idx} className="flex items-center gap-4 animate-fade-in group">
                            <div className="flex-1 relative">
                              <input 
                                type="text" 
                                value={fac} 
                                onChange={(e) => handleUpdateFacility(idx, e.target.value)}
                                className="w-full bg-white p-5 rounded-2xl border border-emerald-950/5 font-bold text-sm outline-none focus:border-gold-500 shadow-sm pr-12" 
                                placeholder={`Fasilitas ${idx + 1}`}
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500/30"><CheckCircle2 size={16}/></div>
                            </div>
                            <button onClick={() => handleRemoveFacility(idx)} className="p-3 text-emerald-950/10 hover:text-red-500 transition-colors"><Minus size={20}/></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 5: Itinerary (Journey) */}
                    <div className="space-y-10">
                      <div className="flex items-center justify-between border-l-4 border-gold-500 pl-6">
                        <div className="flex items-center space-x-5">
                          <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl"><MapPin size={24}/></div>
                          <div>
                            <h5 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">The Journey</h5>
                            <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest">Update rencana perjalanan harian</p>
                          </div>
                        </div>
                        <button onClick={handleAddItinerary} className="p-4 bg-emerald-950 text-white rounded-2xl hover:bg-gold-500 transition-all shadow-lg active:scale-90"><Plus size={20}/></button>
                      </div>
                      <div className="space-y-5">
                        {itinerary.map((item, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 bg-white rounded-[40px] border border-emerald-950/5 animate-fade-in group hover:shadow-xl transition-all duration-500">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-ivory rounded-3xl flex items-center justify-center text-emerald-950 font-black text-xl md:text-2xl shadow-sm shrink-0 border border-emerald-950/5 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                              {item.day}
                            </div>
                            <div className="flex-1 w-full space-y-2">
                               <p className="text-[9px] font-black uppercase text-gold-600 tracking-widest ml-1">Hari Ke-{item.day}</p>
                               <input 
                                type="text" 
                                value={item.activity} 
                                onChange={(e) => handleUpdateItinerary(idx, e.target.value)}
                                className="w-full bg-transparent border-none font-black text-emerald-950 focus:ring-0 text-base md:text-xl p-0 placeholder:text-emerald-950/10" 
                                placeholder="Tuliskan aktivitas utama hari ini..."
                              />
                            </div>
                            <button onClick={() => handleRemoveItinerary(idx)} className="p-5 text-emerald-950/10 hover:text-red-500 transition-colors shrink-0"><Trash2 size={24}/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="p-8 md:p-14 border-t border-emerald-950/5 flex flex-col md:flex-row items-center justify-between gap-8 shrink-0 bg-white z-40 md:rounded-b-[60px]">
                   <div className="flex items-center gap-5 text-emerald-950/40">
                      <div className="w-12 h-12 bg-ivory rounded-2xl flex items-center justify-center"><AlertCircle size={22} className="text-gold-600" /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Penyimpanan Terenkripsi</p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.1em]">Pastikan data visual dan harga sudah tervalidasi tim kurasi.</p>
                      </div>
                   </div>
                   <div className="flex gap-4 w-full md:w-auto">
                      <button onClick={() => setShowAddPackage(false)} className="flex-1 md:px-14 py-6 bg-ivory text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all border border-emerald-950/5 active:scale-95">Batalkan</button>
                      <button 
                        onClick={handleAddPackage}
                        className="flex-1 md:px-20 py-6 bg-emerald-950 text-gold-400 rounded-[25px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-white transition-all shadow-5xl active:scale-95"
                      >
                        Simpan & Publikasikan
                      </button>
                   </div>
                </div>

                <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.02] islamic-pattern scale-150 pointer-events-none rotate-45"></div>
              </div>
            </div>
          )}
        </div>
      );

    case 'media':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-10 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border-b border-emerald-950/5 pb-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Media Library</h3>
              <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-widest mt-1">Aset Visual High-Resolution</p>
            </div>
            <button 
              onClick={() => setShowUploadMedia(true)}
              className="w-full sm:w-auto bg-emerald-950 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-gold-500 transition-all shadow-xl active:scale-95"
            >
              <Upload size={20}/> Bulk Asset Intake
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {['ALL', 'MECCA', 'MADINAH', 'EUROPE', 'FLEET'].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedMediaCategory(cat)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedMediaCategory === cat ? 'bg-emerald-950 text-gold-500 shadow-lg' : 'bg-ivory text-emerald-950/40 hover:bg-emerald-950/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMedia.map(m => (
              <div key={m.id} className="aspect-[4/5] bg-ivory rounded-[40px] overflow-hidden group relative cursor-pointer shadow-sm border border-emerald-950/5">
                <img src={m.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={`Asset ${m.id}`} />
                <div className="absolute inset-0 bg-emerald-950/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md p-8 text-center">
                  <div className="flex gap-4">
                    <button className="bg-white text-emerald-950 p-4 rounded-xl hover:bg-gold-500 transition-all shadow-lg active:scale-90"><Eye size={20}/></button>
                    <button className="bg-white text-emerald-950 p-4 rounded-xl hover:bg-gold-500 transition-all shadow-lg active:scale-90"><Download size={20}/></button>
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white mt-8 truncate w-full">KAISA_ASSET_{m.id}.JPG</p>
                  <p className="text-[7px] font-bold text-gold-500 uppercase tracking-widest mt-2">{m.cat} COLLECTION</p>
                </div>
              </div>
            ))}
          </div>

          {/* ATELIER MEDIA UPLOAD MODAL */}
          {showUploadMedia && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-emerald-950/95 backdrop-blur-2xl animate-fade-in">
              <div className="bg-white w-full max-w-2xl rounded-[50px] md:rounded-[70px] p-8 md:p-16 shadow-6xl animate-scale-in relative overflow-hidden">
                <button onClick={() => setShowUploadMedia(false)} className="absolute top-10 right-10 text-emerald-950/20 hover:text-emerald-950 p-4 bg-ivory rounded-2xl transition-all shadow-sm"><X size={32}/></button>
                
                <div className="space-y-12 text-center relative z-10">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center text-white font-black text-xs mx-auto mb-4 shadow-xl">K</div>
                    <h4 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter uppercase leading-none">Media Intake</h4>
                    <p className="text-emerald-950/30 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Kurasi Aset Visual Boutique Travel</p>
                  </div>
                  
                  <div className="border-4 border-dashed border-emerald-950/5 rounded-[50px] p-16 md:p-28 flex flex-col items-center justify-center space-y-8 hover:border-gold-500 transition-all cursor-pointer group bg-ivory shadow-inner overflow-hidden relative">
                    <div className="w-24 h-24 bg-emerald-950 text-gold-400 rounded-[35px] flex items-center justify-center shadow-3xl group-hover:scale-110 transition-transform duration-700 relative z-10">
                      <Upload size={40} strokeWidth={2} />
                    </div>
                    <div className="space-y-3 relative z-10">
                       <p className="text-2xl font-black text-emerald-950 tracking-tight">Drop Collective Visuals</p>
                       <p className="text-[10px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] leading-relaxed">
                         Drag high-res imagery or browse library<br />
                         <span className="text-gold-600 mt-2 block">Supported: JPG, RAW, PNG (Up to 100MB)</span>
                       </p>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 islamic-pattern scale-150 transition-opacity"></div>
                  </div>

                  <div className="flex gap-4">
                     <button onClick={() => setShowUploadMedia(false)} className="flex-1 py-6 bg-ivory text-emerald-950 rounded-[25px] font-black text-[10px] uppercase tracking-widest border border-emerald-950/5">Cancel</button>
                     <button className="flex-1 py-6 bg-emerald-950 text-white rounded-[25px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gold-500 transition-all active:scale-95">Execute Upload</button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-gold-500 via-emerald-950 to-gold-500"></div>
                <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] islamic-pattern scale-150 pointer-events-none rotate-12"></div>
              </div>
            </div>
          )}
        </div>
      );

    case 'marketing':
      return (
        <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-xl space-y-12 animate-fade-in border border-emerald-950/5 mx-2 md:mx-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-b border-emerald-950/5 pb-12">
             <div className="space-y-2 text-center md:text-left">
               <h3 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter uppercase leading-none">AI Studio Engine</h3>
               <p className="text-emerald-950/30 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em]">Crafting Premium Narratives for Elite Clients</p>
             </div>
             <div className="w-24 h-24 bg-emerald-950 rounded-[40px] flex items-center justify-center text-gold-500 shadow-2xl animate-pulse-slow relative shrink-0">
               <Sparkles size={45} />
               <div className="absolute -top-3 -right-3 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-emerald-950 font-black text-[11px] shadow-lg border-4 border-white">v2</div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5 space-y-10">
              <div className="p-10 bg-ivory rounded-[55px] space-y-10 border border-emerald-950/5 shadow-inner">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-950/40 ml-4">Target Paket Perjalanan</label>
                    <div className="relative">
                      <select className="w-full bg-white p-6 rounded-3xl border border-emerald-950/5 font-bold outline-none focus:border-gold-500 shadow-sm appearance-none cursor-pointer text-sm">
                        {localPackages.map(p => <option key={p.id}>{p.title}</option>)}
                      </select>
                      <ChevronRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-emerald-950/20" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-950/40 ml-4">Gaya Penulisan (Tone)</label>
                    <div className="grid grid-cols-2 gap-4">
                       {['Sophisticated', 'Spiritual', 'Persuasive', 'Emotional'].map(tone => (
                         <button key={tone} className="p-6 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-950/5 hover:border-gold-500 transition-all focus:bg-emerald-950 focus:text-gold-500 flex items-center justify-center gap-3 shadow-sm group">
                           <div className="w-2 h-2 rounded-full bg-emerald-950/10 group-focus:bg-gold-500"></div>
                           {tone}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleGenerateAIForForm}
                  disabled={isGeneratingAI}
                  className="w-full py-8 bg-emerald-950 text-gold-500 rounded-[35px] font-black text-[12px] uppercase tracking-[0.5em] shadow-5xl hover:bg-gold-500 hover:text-white transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50"
                >
                  {isGeneratingAI ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} className="group-hover:scale-125 transition-transform duration-700" />}
                  {isGeneratingAI ? 'SYNTHESIZING...' : 'GENERATE ATELIER COPY'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col h-full">
              <div className={`flex-1 p-10 md:p-16 rounded-[70px] border-4 border-dashed transition-all duration-1000 flex flex-col justify-center items-center text-center space-y-12 min-h-[550px] relative overflow-hidden ${
                aiResult ? 'bg-emerald-50 border-emerald-100 shadow-inner' : 'bg-ivory border-emerald-950/5 shadow-inner'
              }`}>
                {isGeneratingAI ? (
                  <div className="space-y-10 relative z-10 animate-pulse">
                     <div className="relative">
                        <div className="w-36 h-36 bg-emerald-950/5 rounded-full animate-ping absolute inset-0"></div>
                        <div className="w-36 h-36 bg-white rounded-[50px] flex items-center justify-center text-gold-500 shadow-4xl relative z-10 border border-emerald-950/5"><MessageSquare size={60}/></div>
                     </div>
                     <div className="space-y-3">
                        <p className="text-[13px] font-black uppercase tracking-[0.8em] text-emerald-950">AI is composing...</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-950/30">Analyzing premium travel semantic patterns</p>
                     </div>
                  </div>
                ) : aiResult ? (
                  <div className="w-full space-y-14 animate-scale-in relative z-10">
                    <div className="space-y-5">
                       <p className="text-[11px] font-black uppercase tracking-[0.8em] text-gold-600">Generated Narrative</p>
                       <div className="w-24 h-[2px] bg-gold-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto no-scrollbar px-6 md:px-16">
                      <p className="text-2xl md:text-3xl font-serif italic text-emerald-950 leading-relaxed">
                        "{aiResult}"
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto w-full">
                       <button 
                        onClick={() => {
                          navigator.clipboard.writeText(aiResult || '');
                          alert("Narasi disalin ke clipboard.");
                        }}
                        className="flex-1 py-6 bg-emerald-950 text-white rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-gold-500 transition-all shadow-4xl flex items-center justify-center gap-4 active:scale-95 group"
                       >
                         Copy to Clipboard <Copy size={20} className="group-hover:rotate-12 transition-transform" />
                       </button>
                       <button className="flex-1 py-6 bg-white text-emerald-950 border border-emerald-950/10 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-950 hover:text-white transition-all shadow-md active:scale-95">
                         Save to Library
                       </button>
                    </div>
                  </div>
                ) : (
                  <div className="opacity-20 space-y-10 relative z-10 group">
                    <Sparkles size={100} className="mx-auto text-emerald-950 group-hover:scale-110 transition-transform duration-[3s]" />
                    <div className="space-y-4">
                       <h4 className="text-3xl font-black uppercase tracking-tighter text-emerald-950 leading-none">AI Output Workspace</h4>
                       <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-950 max-w-md mx-auto leading-relaxed">Tentukan parameter di panel kiri untuk menghasilkan narasi pemasaran eksklusif Kaisa Rossie.</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 opacity-[0.03] islamic-pattern scale-[2] pointer-events-none group-hover:rotate-12 transition-transform duration-[20s]"></div>
              </div>
            </div>
          </div>
        </div>
      );

    default: return null;
  }
};
