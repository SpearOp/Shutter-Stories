import React, { useState } from "react";
import { Send, MapPin, Phone, Mail, Instagram, Youtube, Facebook } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const GlitchFooter: React.FC<FooterProps> = ({ onNavigate }) => {
  const [subEmail, setSubEmail] = useState<string>("");
  const [isSubbed, setIsSubbed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail) {
      setIsSubbed(true);
      setSubEmail("");
    }
  };

  return (
    <footer 
      className="relative bg-transparent pb-12 pt-20 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-neutral-900/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 text-xs font-sans text-white/70 uppercase">
        
        {/* Col 1: Brand & identity */}
        <div className="md:col-span-4 flex flex-col items-start gap-4 uppercase font-sans">
          <span className="font-serif text-white text-lg tracking-widest font-bold">
            SHUTTER STORIES
          </span>
          
          <p className="normal-case leading-relaxed text-[11px] text-white/50 font-light max-w-sm">
            A premium fine-art photography and cinematic film agency documenting high-end destination wedding celebrations, emotional covenants, and timeless legacies worldwide.
          </p>

          <div className="text-[10px] text-[#C9A66B] tracking-[0.25em] font-bold p-1 px-3 border border-[rgba(201,166,107,0.25)] bg-[rgba(201,166,107,0.05)] flex items-center justify-center gap-1">
            <span>ESTABLISHED 2018</span>
          </div>
        </div>

        {/* Col 2: Navigation quick links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-white text-xs font-serif font-bold tracking-wider uppercase">NAVIGATION</h4>
          <ul className="space-y-2.5 text-white/50 lowercase tracking-[0.15em] font-light text-[11px]">
            <li><button onClick={() => onNavigate("sector-home")} className="hover:text-[#C9A66B] hover:underline transition-all cursor-pointer capitalize">Home</button></li>
            <li><button onClick={() => onNavigate("sector-about")} className="hover:text-[#C9A66B] hover:underline transition-all cursor-pointer capitalize">About</button></li>
            <li><button onClick={() => onNavigate("sector-services")} className="hover:text-[#C9A66B] hover:underline transition-all cursor-pointer capitalize">Services</button></li>
            <li><button onClick={() => onNavigate("sector-portfolio")} className="hover:text-[#C9A66B] hover:underline transition-all cursor-pointer capitalize">Portfolio</button></li>
            <li><button onClick={() => onNavigate("sector-pricing")} className="hover:text-[#C9A66B] hover:underline transition-all cursor-pointer capitalize">Investments</button></li>
          </ul>
        </div>

        {/* Col 3: Coordinates */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white text-xs font-serif font-bold tracking-wider uppercase">COORDINATES</h4>
          <p className="normal-case leading-relaxed text-[11px] text-white/50 font-light space-y-1.5 flex flex-col">
            <span className="flex items-center gap-1.5 uppercase"><MapPin size={12} className="text-[#C9A66B] shrink-0" /> Positano, Italy & Lake Como Studio</span>
            <span className="flex items-center gap-1.5"><Phone size={12} className="text-[#C9A66B] shrink-0" /> +1 (555) 798-2026 // +39 02 812345</span>
            <span className="flex items-center gap-1.5 font-sans uppercase"><Mail size={12} className="text-[#C9A66B] shrink-0" /> booking@shutterstories.co</span>
          </p>
        </div>

        {/* Col 4: Newsletter */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white text-xs font-serif font-bold tracking-wider uppercase">TRANSMIT UPDATES</h4>
          <p className="normal-case text-[11px] text-white/50 leading-relaxed max-w-xs font-light">
            Subscribe to our seasonal creative journals for wedding tips, destination guides, and private portfolio releases.
          </p>

          {isSubbed ? (
            <div className="p-3 bg-[rgba(201,166,107,0.05)] border border-[rgba(201,166,107,0.3)] text-[#C9A66B] font-bold tracking-[0.15em] text-[10px] animate-pulse">
              COMM_EMAIL SECURED FOR UPDATES
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border border-white/10 bg-black rounded overflow-hidden">
              <input
                type="email"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="bg-black p-2.5 text-white/80 focus:outline-none flex-grow font-sans text-[10px] tracking-wider uppercase"
              />
              <button 
                type="submit" 
                className="bg-[#C9A66B] text-white px-4 hover:bg-[#B89058] transition-colors duration-300 cursor-pointer flex items-center justify-center"
                title="SUBMIT"
              >
                <Send size={12} />
              </button>
            </form>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-sans text-white/30 font-light select-none">
        <div>&copy; {new Date().getFullYear()} SHUTTER STORIES FINE ART PHOTOGRAPHY & CINEMA</div>
        <div className="flex gap-6 items-center">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A66B] transition-colors" title="Instagram">
            <Instagram size={14} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A66B] transition-colors" title="Youtube">
            <Youtube size={14} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A66B] transition-colors" title="Facebook">
            <Facebook size={14} />
          </a>
          <span className="text-[#C9A66B] font-bold tracking-wider">PRESTIGIOUS LEGACIES TIMELINE</span>
        </div>
      </div>
    </footer>
  );
};
