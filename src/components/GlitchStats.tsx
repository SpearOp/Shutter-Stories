import React, { useState, useEffect } from "react";
import { Users, Award, Camera, Globe, Trophy } from "lucide-react";

export const GlitchStats: React.FC = () => {
  const [counts, setCounts] = useState<Record<string, number>>({
    clients: 0,
    weddings: 0,
    films: 0,
    destinations: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => {
        const next = { ...prev };
        let done = true;
        
        if (next.clients < 1000) { next.clients += 20; done = false; }
        if (next.weddings < 500) { next.weddings += 10; done = false; }
        if (next.films < 150) { next.films += 3; done = false; }
        if (next.destinations < 50) { next.destinations += 1; done = false; }

        if (done) clearInterval(interval);
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-12 bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A66B]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Count item 1 */}
        <div className="flex flex-col items-center text-center p-5 border border-[#C9A66B]/15 bg-[#1A1A1A] transition-all duration-300 hover:border-[#C9A66B] rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(201,166,107,0.2)]">
          <Users size={20} className="text-[#C9A66B] mb-2" />
          <div className="text-2xl md:text-3xl font-serif text-white font-bold">
            {counts.clients}+
          </div>
          <div className="font-sans text-[10px] text-neutral-400 mt-1 tracking-[0.2em] uppercase font-medium">
            Happy Clients
          </div>
        </div>

        {/* Count item 2 */}
        <div className="flex flex-col items-center text-center p-5 border border-[#C9A66B]/15 bg-[#1A1A1A] transition-all duration-300 hover:border-[#C9A66B] rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(201,166,107,0.2)]">
          <Award size={20} className="text-[#C9A66B] mb-2" />
          <div className="text-2xl md:text-3xl font-serif text-white font-bold">
            {counts.weddings}+
          </div>
          <div className="font-sans text-[10px] text-neutral-400 mt-1 tracking-[0.2em] uppercase font-medium">
            Weddings Covered
          </div>
        </div>

        {/* Count item 3 */}
        <div className="flex flex-col items-center text-center p-5 border border-[#C9A66B]/15 bg-[#1A1A1A] transition-all duration-300 hover:border-[#C9A66B] rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(201,166,107,0.2)]">
          <Camera size={20} className="text-[#C9A66B] mb-2" />
          <div className="text-2xl md:text-3xl font-serif text-white font-bold">
            {counts.films}+
          </div>
          <div className="font-sans text-[10px] text-neutral-400 mt-1 tracking-[0.2em] uppercase font-medium">
            Cinematic Films
          </div>
        </div>

        {/* Count item 4 */}
        <div className="flex flex-col items-center text-center p-5 border border-[#C9A66B]/15 bg-[#1A1A1A] transition-all duration-300 hover:border-[#C9A66B] rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(201,166,107,0.2)]">
          <Globe size={20} className="text-[#C9A66B] mb-2" />
          <div className="text-2xl md:text-3xl font-serif text-white font-bold">
            {counts.destinations}+
          </div>
          <div className="font-sans text-[10px] text-neutral-400 mt-1 tracking-[0.2em] uppercase font-medium">
            Destination Weddings
          </div>
        </div>

        {/* Column 5: Premium Badge (as seen on the mockup image) */}
        <div className="col-span-2 lg:col-span-1 flex flex-col items-center text-center p-5 border border-[#C9A66B]/15 bg-[#1A1A1A] transition-all duration-300 hover:border-[#C9A66B] rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(201,166,107,0.2)]">
          <Trophy size={20} className="text-[#C9A66B] mb-2" />
          <div className="text-center font-serif text-xs text-white uppercase tracking-wider font-semibold leading-relaxed pt-1">
            Award Winning Team
          </div>
          <div className="font-sans text-[8px] text-neutral-400 mt-1 tracking-wider uppercase font-medium">
            Internationally Recognized
          </div>
        </div>

      </div>
    </section>
  );
};
