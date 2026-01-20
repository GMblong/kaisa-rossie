
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Linkedin, Twitter, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  currentPage: string;
  isLoggedIn?: boolean;
}

const Navbar: React.FC<{ onNavigate: (page: string) => void, onLogout?: () => void, currentPage: string, isLoggedIn: boolean }> = ({ onNavigate, onLogout, currentPage, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'umrah', label: 'Umrah' },
    { id: 'haji', label: 'Haji' },
    { id: 'tours', label: 'Tours' },
    { id: 'bus', label: 'Bus Rental' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6 ${
      scrolled ? 'bg-emerald-950/95 shadow-xl py-4' : 'bg-transparent'
    }`}>
      <div className="container-luxe flex items-center justify-between">
        <div 
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center font-black text-white">K</div>
          <span className="font-black uppercase tracking-tighter text-lg text-white">KAISA <span className="text-gold-400">ROSSIE</span></span>
        </div>

        <div className="hidden lg:flex items-center space-x-10">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all relative group ${
                currentPage === item.id ? 'text-gold-400' : 'text-white/60 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold-400 transition-all ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="bg-white text-emerald-950 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-white transition-all shadow-md"
              >
                Dashboard
              </button>
              <button 
                onClick={onLogout}
                className="p-2.5 text-white/40 hover:text-red-400 transition-colors"
                title="Log Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('auth')}
              className="bg-white text-emerald-950 px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-white transition-all shadow-md"
            >
              Portal
            </button>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 bg-white/10 rounded-full text-white border border-white/10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[200] bg-emerald-950 flex flex-col p-12 space-y-8 animate-fade-in">
          <button onClick={() => setIsOpen(false)} className="self-end p-4 text-white"><X size={32}/></button>
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => { onNavigate(item.id); setIsOpen(false); }}
              className="text-4xl font-black text-white hover:text-gold-400 text-left transition-all"
            >
              {item.label.toUpperCase()}
            </button>
          ))}
          {isLoggedIn && (
            <button 
              onClick={() => { onLogout?.(); setIsOpen(false); }}
              className="text-4xl font-black text-red-400 text-left transition-all mt-auto"
            >
              LOGOUT
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate, onLogout, currentPage, isLoggedIn = false }) => {
  // Kondisi untuk menyembunyikan Navbar dan Footer di halaman Login/Auth
  const isAuthPage = currentPage === 'auth';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && (
        <Navbar onNavigate={onNavigate} onLogout={onLogout} currentPage={currentPage} isLoggedIn={isLoggedIn} />
      )}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && (
        <footer className="bg-emerald-950 pt-24 pb-12">
          <div className="container-luxe">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="md:col-span-2 space-y-6">
                   <h4 className="text-3xl font-black text-white tracking-tighter uppercase">KAISA <span className="text-gold-400">ROSSIE</span></h4>
                   <p className="text-white/40 font-medium leading-relaxed text-sm max-w-sm">
                     Boutique Travel Atelier yang mengkhususkan diri dalam kurasi perjalanan ibadah dan petualangan muslim premium di seluruh dunia.
                   </p>
                </div>
                <div className="space-y-6">
                   <p className="text-gold-400 font-black uppercase tracking-widest text-xs">Categories</p>
                   <ul className="space-y-4 text-white/60 font-black text-[10px] uppercase tracking-widest">
                      <li className="hover:text-gold-400 cursor-pointer transition-colors" onClick={() => onNavigate('umrah')}>Umrah Signature</li>
                      <li className="hover:text-gold-400 cursor-pointer transition-colors" onClick={() => onNavigate('haji')}>Haji Furoda</li>
                      <li className="hover:text-gold-400 cursor-pointer transition-colors" onClick={() => onNavigate('tours')}>Heritage Tours</li>
                   </ul>
                </div>
                <div className="space-y-6">
                   <p className="text-gold-400 font-black uppercase tracking-widest text-xs">Headquarters</p>
                   <p className="text-white/60 text-sm font-medium leading-relaxed">
                     Jl. Madukoro Raya No.8<br />
                     Tawangsari, Kec. Semarang Barat<br />
                     Kota Semarang, Jawa Tengah 50144
                   </p>
                </div>
             </div>
             
             <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">© 2024 KAISA ROSSIE ATELIER.</span>
                <div className="flex space-x-8">
                   {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                      <Icon key={i} size={18} className="text-white/20 hover:text-gold-400 cursor-pointer transition-all" />
                   ))}
                </div>
             </div>
          </div>
        </footer>
      )}
    </div>
  );
};
