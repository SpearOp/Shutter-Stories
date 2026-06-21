import React from "react";
import { Compass, ShieldCheck, Award, Heart } from "lucide-react";

interface AboutProps {
  onOpenBook: () => void;
}

export const GlitchAbout: React.FC<AboutProps> = ({ onOpenBook }) => {
  return (
    <section id="sector-about" className="relative py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Core Narrative & Philosophy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs tracking-[0.3em] font-semibold text-[#C9A66B] uppercase mb-3">
              ABOUT US
            </span>
            
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 uppercase leading-tight font-normal">
              EVERY FRAME TELLS A STORY
            </h2>
            
            <p className="font-serif text-lg text-neutral-300 leading-relaxed mb-6 font-light">
              We are a team of storytellers, photographers, filmmakers & dreamers. We believe in capturing raw emotions, genuine moments and turning them into timeless visual stories.
            </p>
 
            <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed mb-8">
              Every detail is meticulously planned to reflect your unique union. Our team uses premium Phase One camera systems, ambient gold-plated color grading, and beautiful natural lighting to capture your day with absolute visual clarity.
            </p>
 
            {/* Achievement List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
              <div className="p-5 bg-[#1A1A1A] backdrop-blur-sm border border-[rgba(201,166,107,0.15)] rounded flex items-start gap-4 transition-all hover:border-[#C9A66B] hover:shadow-[0_4px_16px_rgba(201,166,107,0.08)]">
                <Award className="text-[#C9A66B] shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">Award Winning Team</h4>
                  <p className="font-sans text-[11px] text-neutral-400 uppercase mt-1 tracking-wider leading-relaxed">Recognized globally by top-tier wedding associations</p>
                </div>
              </div>
 
              <div className="p-5 bg-[#1A1A1A] backdrop-blur-sm border border-[rgba(201,166,107,0.15)] rounded flex items-start gap-4 transition-all hover:border-[#C9A66B] hover:shadow-[0_4px_16px_rgba(201,166,107,0.08)] font-light">
                <ShieldCheck className="text-[#C9A66B] shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">5+ Years Of Experience</h4>
                  <p className="font-sans text-[11px] text-neutral-400 uppercase mt-1 tracking-wider leading-relaxed">Preserving high-profile destination weddings seamlessly</p>
                </div>
              </div>
 
              <div className="p-5 bg-[#1A1A1A] backdrop-blur-sm border border-[rgba(201,166,107,0.15)] rounded flex items-start gap-4 transition-all hover:border-[#C9A66B] hover:shadow-[0_4px_16px_rgba(201,166,107,0.08)]">
                <Compass className="text-[#C9A66B] shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">Available Worldwide</h4>
                  <p className="font-sans text-[11px] text-neutral-400 uppercase mt-1 tracking-wider leading-relaxed">Expert destination photographers fluent in various cultures</p>
                </div>
              </div>
 
              <div className="p-5 bg-[#1A1A1A] backdrop-blur-sm border border-[rgba(201,166,107,0.15)] rounded flex items-start gap-4 transition-all hover:border-[#C9A66B] hover:shadow-[0_4px_16px_rgba(201,166,107,0.08)]">
                <Heart className="text-[#C9A66B] shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">1000+ Happy Couples</h4>
                  <p className="font-sans text-[11px] text-neutral-400 uppercase mt-1 tracking-wider leading-relaxed">Bespoke luxury albums and high-end video catalogs</p>
                </div>
              </div>
            </div>
 
            {/* CTA Action button */}
            <button
              onClick={onOpenBook}
              className="px-8 py-3.5 bg-[#C9A66B] text-white hover:bg-[#B89058] transition-colors duration-300 font-sans text-xs tracking-[0.15em] font-semibold uppercase cursor-pointer rounded shadow-md"
            >
              KNOW OUR STORY
            </button>
          </div>
 
          {/* Right Column: Photographer image */}
          <div className="lg:col-span-5 relative w-full h-[500px]">
            <div className="absolute inset-4 border border-[#C9A66B]/20 pointer-events-none z-10 rounded" />
            
            <div className="relative w-full h-full overflow-hidden border border-[rgba(201,166,107,0.15)] bg-neutral-900 rounded shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=805" 
                alt="Editorial photographer" 
                className="w-full h-full object-cover transition-transform duration-[8s] hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
};
