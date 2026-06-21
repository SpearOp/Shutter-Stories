import React, { useState } from "react";
import { Play, ArrowLeft, ArrowRight, X, Film, Clock, MapPin } from "lucide-react";

interface CinematicFilm {
  id: string;
  title: string;
  location: string;
  duration: string;
  year: string;
  imageUrl: string;
  videoUrl: string;
}

export const GlitchFilms: React.FC = () => {
  const films: CinematicFilm[] = [
    {
      id: "film-1",
      title: "AMALFI COAST EDITORIAL STORY",
      location: "Positano & Amalfi Shores, Italy",
      duration: "04:22 MINS",
      year: "2026",
      imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05414f2ce8a1c313264b162232924fa&profile_id=165"
    },
    {
      id: "film-2",
      title: "TUSCAN CHRONICLES & COVENANTS",
      location: "Val d'Orcia, Tuscany",
      duration: "03:45 MINS",
      year: "2026",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://player.vimeo.com/external/435674703.sd.mp4?s=7dbb1ae67db4957e62ef3ff646e7f8a9ee07936a&profile_id=165"
    },
    {
      id: "film-3",
      title: "LAKE COMO HISTORIC WEDDING",
      location: "Villa d'Este, Lake Como",
      duration: "05:12 MINS",
      year: "2025",
      imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://player.vimeo.com/external/435674703.sd.mp4?s=7dbb1ae67db4957e62ef3ff646e7f8a9ee07936a&profile_id=165"
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const nextFilm = () => {
    setActiveIndex((prev) => (prev + 1) % films.length);
  };

  const prevFilm = () => {
    setActiveIndex((prev) => (prev - 1 + films.length) % films.length);
  };

  const activeFilm = films[activeIndex];

  return (
    <section id="sector-films" className="relative py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] font-semibold text-[#C9A66B] uppercase mb-3 block">
              FEATURED CINEMATOGRAPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase leading-tight font-extrabold tracking-tight">
              TIMELess WEDDING HIGHLIGHTS
            </h2>
          </div>
          
          <div className="flex items-center gap-4 select-none">
            <button 
              onClick={prevFilm}
              className="p-3 border border-[#C9A66B]/40 hover:border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B]/15 transition-all cursor-pointer rounded-full"
              title="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="font-sans text-xs text-[#C9A66B] px-2 font-bold tracking-widest">
              {(activeIndex + 1).toString().padStart(2, "0")} <span className="text-[#C9A66B]/30">/</span> {films.length.toString().padStart(2, "0")}
            </span>
            <button 
              onClick={nextFilm}
              className="p-3 border border-[#C9A66B]/40 hover:border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B]/15 transition-all cursor-pointer rounded-full"
              title="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Featured Video Frame Slider */}
        <div className="relative group w-full h-[320px] sm:h-[520px] bg-[#1A1A1A] border border-[rgba(201,166,107,0.15)] overflow-hidden rounded shadow-xl flex flex-col justify-end">
          
          <img 
            src={activeFilm.imageUrl} 
            alt={activeFilm.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-65 transition-transform duration-[12s] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />

          {/* Golden Elegant Play Button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={() => setIsPlaying(true)}
              className="relative w-24 h-24 bg-[#C9A66B] hover:bg-[#B89058] text-white rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl border-2 border-white/25"
              title="Play Video"
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-[-8px] rounded-full border border-[#C9A66B]/30 animate-pulse" />
              <Play size={24} className="translate-x-1 text-white fill-current" />
            </button>
          </div>

          {/* Film Specifications Overlays */}
          <div className="relative p-8 sm:p-12 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="flex-grow">
              <div className="flex items-center gap-2 text-xs font-sans text-[#FCFAF8] mb-2 tracking-widest uppercase font-semibold">
                <MapPin size={12} className="text-[#C9A66B]" />
                <span>{activeFilm.location}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-serif text-white uppercase tracking-wide font-bold">
                {activeFilm.title}
              </h3>
            </div>

            <div className="flex gap-6 items-center text-xs font-sans text-white/90 uppercase tracking-widest font-light shrink-0">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#C9A66B]" />
                <span>LENGTH: {activeFilm.duration}</span>
              </div>
              <div className="px-2.5 py-1 border border-white/20 bg-white/10 rounded text-[10px] font-semibold tracking-widest text-[#C4A166]">
                {activeFilm.year}
              </div>
            </div>
          </div>

          {/* Corner frame visual indicators */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25 pointer-events-none" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25 pointer-events-none" />
        </div>

        {/* Video Slider Bar Dots indicator */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {films.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveIndex(i)}
              className={`h-1 cursor-pointer transition-all duration-300 ${activeIndex === i ? "w-12 bg-[#C9A66B]" : "w-3 bg-[#C9A66B]/25 hover:bg-[#C9A66B]/50"}`}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>

      </div>

      {/* PREMIUM CHRONO VIDEO LIGHTBOX MODAL */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black/98 z-[6000] flex items-center justify-center p-4 backdrop-blur-md">
          
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-white/10 flex flex-col shadow-2xl">
            {/* Modal Control Bar */}
            <div className="flex justify-between items-center bg-black p-4 border-b border-white/10 text-xs font-sans text-white/50 tracking-wider">
              <div className="flex items-center gap-2">
                <Film size={14} className="text-luxury-gold" />
                <span>CINEMATIC ARCHIVE: {activeFilm.title}</span>
              </div>
              
              <button 
                onClick={() => setIsPlaying(false)}
                className="p-1 hover:text-luxury-gold text-white/50 transition-colors cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video 
                src={activeFilm.videoUrl} 
                className="w-full h-full object-contain"
                controls 
                autoPlay 
              />
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
};
