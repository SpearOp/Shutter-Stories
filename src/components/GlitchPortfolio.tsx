import React, { useState } from "react";
import { PortfolioItem, MediaCategory } from "../types";
import { Camera, Calendar, MapPin, Eye, RefreshCw, X, ShieldCheck } from "lucide-react";

interface PortfolioProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  portfolioItems: PortfolioItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const GlitchPortfolio: React.FC<PortfolioProps> = ({
  selectedCategory,
  onSelectCategory,
  portfolioItems,
  isLoading,
  onRefresh
}) => {
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { key: "ALL", label: "ALL CELEBRATIONS" },
    { key: MediaCategory.WEDDINGS, label: "WEDDINGS" },
    { key: MediaCategory.ENGAGEMENTS, label: "ENGAGEMENTS" },
    { key: MediaCategory.DESTINATIONS, label: "DESTINATIONS" },
    { key: MediaCategory.FASHION, label: "EDITORIAL & FASHION" },
    { key: MediaCategory.EVENTS, label: "EVENTS" }
  ];

  const filteredItems = selectedCategory === "ALL" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="sector-portfolio" className="relative py-24 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Portfolio Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] font-semibold text-[#C9A66B] uppercase mb-3 block">
              SELECTED STORIES
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase leading-tight font-extrabold tracking-tight">
              OUR CELEBRATION PORTFOLIO
            </h2>
          </div>
          
          {/* Refresh trigger */}
          <button 
            onClick={onRefresh}
            className="px-5 py-2.5 bg-transparent text-[#C9A66B] border border-[#C9A66B] hover:bg-[#C9A66B]/15 font-sans text-xs tracking-[0.15em] font-semibold transition-all duration-300 flex items-center gap-2 uppercase cursor-pointer rounded"
          >
            <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
            <span>SYNC ARCHIVE</span>
          </button>
        </div>

        {/* Categories Menu */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-[rgba(201,166,107,0.15)] pb-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`px-4 py-2 font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer rounded ${
                selectedCategory === cat.key
                  ? "bg-[#C9A66B] text-white font-semibold shadow-md border border-[#C9A66B]"
                  : "bg-transparent text-neutral-300 hover:bg-[#1A1A1A] border border-[#C9A66B]/25 hover:border-[#C9A66B]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Canvas Zone */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-[#C9A66B] font-sans uppercase text-xs">
            <div className="w-10 h-10 border-2 border-[#C9A66B] border-t-transparent rounded-full animate-spin" />
            <span className="tracking-[0.2em] font-light">REFRESHING GALLERY ALBUMS...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-[rgba(201,166,107,0.15)] p-8 font-serif text-sm text-neutral-400 uppercase italic">
            No secure story logged in under {selectedCategory}.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="break-inside-avoid relative group overflow-hidden bg-[#1A1A1A] border border-[rgba(201,166,107,0.15)] hover:border-[#C9A66B] transition-all duration-500 shadow-md hover:shadow-[0_12px_24px_rgba(201,166,107,0.12)] cursor-pointer rounded"
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />

                {/* Soft natural vignette/shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Information overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 to-transparent flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="inline-flex items-center gap-1 text-[10px] font-sans text-[#C9A66B] uppercase tracking-[0.2em] mb-1">
                    <MapPin size={10} />
                    <span>{item.location}</span>
                  </div>
                  
                  <h3 className="font-serif text-base text-white font-normal uppercase tracking-wide">
                    {item.title}
                  </h3>

                  <div className="flex justify-between items-center text-[9px] font-sans text-white/60 uppercase tracking-widest mt-3 pt-2 border-t border-white/10">
                    <span>{item.resolution}</span>
                    <span>VIEW DETAILS</span>
                  </div>
                </div>

                {/* Visual Frame Markers */}
                <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#C9A66B] transition-colors" />
                <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#C9A66B] transition-colors" />
                <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/20 group-hover:border-[#C9A66B] transition-colors" />
                <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/20 group-hover:border-[#C9A66B] transition-colors" />
              </div>
            ))}
          </div>
        )}

        {/* PREMIUM LIGHTBOX MODAL */}
        {lightboxItem && (
          <div className="fixed inset-0 z-[6000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
            
            <div className="relative w-full max-w-5xl bg-[#1A1A1A] border border-[rgba(201,166,107,0.15)] flex flex-col md:grid md:grid-cols-12 shadow-2xl overflow-y-auto max-h-[90vh] md:max-h-none no-scrollbar rounded-lg">
              
              {/* Left side: Pure Photographic stream */}
              <div className="col-span-7 bg-[#111111] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-[rgba(201,166,107,0.1)] min-h-[300px] md:h-[550px]">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="w-full h-full object-contain pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right side: Editorial details */}
              <div className="col-span-5 p-8 flex flex-col justify-between h-auto md:h-[550px] bg-[#1A1A1A]">
                <div>
                  {/* Control bar */}
                  <div className="flex justify-between items-center mb-6 border-b border-[rgba(201,166,107,0.15)] pb-4">
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] font-semibold">
                      ARCHIVE PREVIEW
                    </span>
                    <button
                      onClick={() => setLightboxItem(null)}
                      className="p-1 hover:text-[#C9A66B] text-neutral-400 transition-colors cursor-pointer"
                      title="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <span className="font-sans text-[9px] tracking-[0.25em] text-[#C9A66B] uppercase bg-[#C9A66B]/5 border border-[#C9A66B]/20 px-2 py-1 rounded">
                    {lightboxItem.category}
                  </span>

                  <h3 className="text-2xl font-serif text-white uppercase mt-6 mb-4 font-bold tracking-wide">
                    {lightboxItem.title}
                  </h3>

                  <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed mb-6 border-l border-[#C9A66B] pl-3">
                    A cinematic capture representing the timeless union at {lightboxItem.location}. Documented to encapsulate spatial aesthetics, exquisite color tones, and pure emotion.
                  </p>

                  {/* Metadata values */}
                  <div className="font-sans text-[11px] text-neutral-200 space-y-3.5 border-y border-[rgba(201,166,107,0.15)] py-5 mb-6">
                    <div className="flex justify-between">
                      <span className="text-neutral-400 tracking-wider font-light">LOCATION:</span>
                      <span className="text-white font-semibold">{lightboxItem.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 tracking-wider font-light">EXPOSURE DATE:</span>
                      <span className="text-white font-semibold">{lightboxItem.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 tracking-wider font-light">DIRECTOR OF PHOTOGRAPHY:</span>
                      <span className="text-white font-semibold">{lightboxItem.director}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 tracking-wider font-light">RESOLUTION PROTOCOL:</span>
                      <span className="text-white font-semibold">{lightboxItem.resolution}</span>
                    </div>
                  </div>
                </div>

                {/* Secure verification block */}
                <div className="p-4 bg-[#C9A66B]/5 border border-[#C9A66B]/20 flex items-center gap-3 text-[11px] font-sans text-[#C9A66B] leading-relaxed rounded">
                  <ShieldCheck size={16} className="text-[#C9A66B] shrink-0" />
                  <span>This legacy media log is authenticated in state directories.</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};
