import React, { useState } from "react";
import { ArrowLeft, ArrowRight, MessageSquare, Star, MapPin } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  review: string;
  rating: number;
  imageUrl: string;
  date: string;
}

export const GlitchTestimonials: React.FC = () => {
  const reviews: Testimonial[] = [
    {
      id: "rev-1",
      name: "Victoria & Alexander Vance",
      location: "Santorini Caldera Cliffs, Greece",
      review: "THE ARTISTRY AND CINEMATIC DEPTH DISCOVERED IN OUR WEDDING ALBUM EXCEEDED EVERY EXPECTATION. THEY CALIBRATED EVERY ANGLE PRECISELY FOR SCENIC TONAL WARMTH. EVERY PHOTO IS A BREATHTAKING MASTERPIECE.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      date: "May 2026"
    },
    {
      id: "rev-2",
      name: "Lady Maya & Commander Drake",
      location: "Gion Pavilions, Kyoto",
      review: "OUR WEDDING RECORDINGS AND GOLDEN PRINTS ARE TIMELess STORYTELLING VECTORS. THEY CAPTURED OUTSTANDING EMOTIONAL DEPTH OF OUR DEPARTING AND GATHERED FAMILIES WITH LUXURIOUS SENSORY POISE.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      date: "April 2026"
    },
    {
      id: "rev-3",
      name: "Xavier & Kira Chen",
      location: "Val d'Orcia, Tuscany",
      review: "EXCEPTIONAL ARCHITECTURAL VISION AND COMPOSITION. SHUTTER STORIES EXCEEDED OUR DREAMS FOR A COHESIVE, HIGH-END RECORD. THE PHOTOBOOKS AND KEEPSAKES ARE INCREDIBLY HEIRLOOM-GRADE.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      date: "October 2025"
    }
  ];

  const [index, setIndex] = useState<number>(0);

  const nextReview = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[index];

  return (
    <section id="sector-testimonials" className="relative py-24 bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-900/40 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] font-semibold text-[#C9A66B] uppercase mb-3 block">
            KIND WORDS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white uppercase leading-tight font-extrabold tracking-tight">
            OUR COUPLES' EXPERIENCES
          </h2>
        </div>

        {/* Carousel Content Box */}
        <div className="relative bg-[#1A1A1A] backdrop-blur-sm border border-[rgba(201,166,107,0.15)] p-8 sm:p-14 shadow-md rounded-lg flex flex-col items-center text-center">
          
          {/* Gold Stars */}
          <div className="flex gap-1 mb-8">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star 
                key={i} 
                size={16}
                className="fill-[#C9A66B] text-[#C9A66B]"
              />
            ))}
          </div>

          {/* Testimonial Statement */}
          <blockquote className="font-serif text-base sm:text-lg text-neutral-200 italic tracking-wide leading-relaxed mb-10 font-bold select-none">
            "{current.review}"
          </blockquote>

          {/* Client profile */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-[rgba(201,166,107,0.15)] pt-8 w-full justify-center">
            <div className="relative w-14 h-14 rounded-full border border-[#C9A66B] p-0.5 overflow-hidden shadow-md select-none">
              <img 
                src={current.imageUrl} 
                alt={current.name} 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="text-center sm:text-left font-sans">
              <div className="text-sm font-bold text-white uppercase tracking-wider">{current.name}</div>
              <div className="text-[10px] text-[#C9A66B] tracking-[0.15em] uppercase mt-1 flex items-center justify-center sm:justify-start gap-1 font-semibold">
                <MapPin size={10} />
                <span>{current.location}</span>
              </div>
            </div>
          </div>

          {/* Carousel Buttons left/right */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 hidden sm:block select-none">
            <button 
              onClick={prevReview}
              className="p-2.5 border border-[#C9A66B]/40 hover:border-[#C9A66B] rounded-full text-[#C9A66B] hover:bg-[#C9A66B]/15 transition-all duration-300 cursor-pointer"
              title="Previous"
            >
              <ArrowLeft size={16} />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-3 hidden sm:block select-none">
            <button 
              onClick={nextReview}
              className="p-2.5 border border-[#C9A66B]/40 hover:border-[#C9A66B] rounded-full text-[#C9A66B] hover:bg-[#C9A66B]/15 transition-all duration-300 cursor-pointer"
              title="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* Mobile controls */}
        <div className="flex justify-center items-center gap-6 mt-8 sm:hidden select-none">
          <button 
            onClick={prevReview}
            className="p-2.5 border border-[#C9A66B]/40 hover:border-[#C9A66B] rounded-full text-[#C9A66B] hover:bg-[#C9A66B]/15 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-sans text-xs text-[#C9A66B] font-bold tracking-widest">
            {index + 1} <span className="text-[#C9A66B]/30">/</span> {reviews.length}
          </span>
          <button 
            onClick={nextReview}
            className="p-2.5 border border-[#C9A66B]/40 hover:border-[#C9A66B] rounded-full text-[#C9A66B] hover:bg-[#C9A66B]/15 transition-all duration-300 cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
