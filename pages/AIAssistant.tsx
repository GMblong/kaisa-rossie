
import React, { useState, useRef, useEffect } from 'react';
import { getTravelAssistantResponse } from '../services/geminiService';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Assalamu alaikum! Saya Kaisa, asisten pribadi Anda. Ada yang bisa saya bantu terkait rencana ibadah, penjelajahan destinasi dunia, atau kebutuhan sewa armada premium?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    const response = await getTravelAssistantResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-ivory min-h-screen">
      <section className="bg-emerald-950 pt-32 pb-20 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 islamic-pattern"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-gold-400 shadow-2xl">
                <Sparkles size={28} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Kaisa Concierge</h2>
                <p className="text-[10px] text-gold-500 font-black uppercase tracking-[0.4em]">Global Travel Intelligence</p>
              </div>
            </div>
            <button 
              onClick={() => setMessages([messages[0]])}
              className="p-4 bg-white/5 text-white/40 hover:text-gold-400 transition-colors rounded-2xl"
            >
              <RefreshCw size={22} />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-10 pb-20 relative z-20">
        <div className="bg-white border border-emerald-950/5 rounded-[40px] shadow-[0_40px_100px_rgba(2,44,34,0.1)] overflow-hidden flex flex-col h-[65vh]">
          <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex items-end space-x-4 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${m.role === 'user' ? 'bg-gold-500' : 'bg-emerald-950'} text-white`}>
                    {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>
                  <div className={`p-5 rounded-[24px] text-sm font-bold leading-relaxed shadow-sm ${
                    m.role === 'user' ? 'bg-gold-500 text-white rounded-br-none' : 'bg-emerald-950/5 text-emerald-950 border border-gold-500/10 rounded-bl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex space-x-2 p-5 bg-emerald-950/5 rounded-2xl w-24">
                <span className="w-2 h-2 bg-gold-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gold-600 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gold-600 rounded-full animate-bounce delay-200"></span>
              </div>
            )}
          </div>

          <div className="p-8 bg-gray-50 border-t border-emerald-950/5">
            <div className="flex items-center space-x-4 bg-white rounded-2xl p-2 border border-emerald-950/10 focus-within:border-gold-500 shadow-sm transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya tour, rental bus, atau paket umrah..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-5 py-3 font-bold text-emerald-950 text-sm placeholder:text-emerald-950/30"
              />
              <button 
                onClick={handleSend}
                className="bg-emerald-950 text-white p-4 rounded-xl hover:bg-gold-500 transition-all shadow-lg active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
