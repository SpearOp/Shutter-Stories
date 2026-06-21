import React, { useState, useEffect } from "react";
import { Camera, ChevronDown, Instagram, Youtube, Facebook, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { HeroSlide } from "../types";

interface HeroProps {
  onNavigate: (section: string) => void;
  onOpenAdmin: () => void;
  onOpenBook: () => void;
  heroSlides?: HeroSlide[];
}

const BACKGROUND_IMAGES = [
  {
    id: "hero-1",
    url: "/src/assets/images/indian_wedding_hero_1781807634242.jpg",
    title: "INDIAN WEDDING COVENANT",
    location: "VILLA D'ESTE, LAKE COMO"
  },
  {
    id: "hero-2",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=2200",
    title: "ROMANTIC RECONCILIATION CANOPY",
    location: "POSITANO WATERFRONT"
  },
  {
    id: "hero-3",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=2200",
    title: "AMALFI EMERALD SHORE SHUTTER",
    location: "RAVELLO CLIFFSIDE"
  },
  {
    id: "hero-4",
    url: "https://images.unsplash.com/photo-1507504038482-76210f5c2758?auto=format&fit=crop&q=85&w=2200",
    title: "CELEBRATION DECK LIGHTFIELDS",
    location: "VILLA BALBIANELLO"
  },
  {
    id: "hero-5",
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=85&w=2200",
    title: "EDITORIAL APPARATUS ROYALTY",
    location: "GRAND HOTEL TREMEZZO"
  }
];

export const GlitchHero: React.FC<HeroProps> = ({ onNavigate, onOpenAdmin, onOpenBook, heroSlides }) => {
  const { scrollY } = useScroll();
  
  // Parallax scroll transforms for high-end cinematic feel
  const yBg = useTransform(scrollY, [0, 800], [0, 240]);
  const opacityBg = useTransform(scrollY, [0, 600], [1, 0.35]);
  const scaleBg = useTransform(scrollY, [0, 800], [1, 1.08]);
  const yContent = useTransform(scrollY, [0, 800], [0, -60]);

  // Handle video loading failure gracefully to guarantee beautiful custom image render
  const [videoFailed, setVideoFailed] = useState<boolean>(false);

  // Background carousel variables
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = prev

  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : BACKGROUND_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 0.55
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  const traverse = (step: number) => {
    setDirection(step);
    if (step > 0) {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <section id="sector-home" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black pb-8">
      
      {/* Background Layer with Parallax, Subtle Zoom & Fallback Handling */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        {!videoFailed ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoFailed(true)}
            onStalled={() => setVideoFailed(true)}
            className="w-full h-full object-cover opacity-15 scale-105"
            poster={slides[0]?.url}
          >
            <source 
              src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05414f2ce8a1c313264b162232924fa&profile_id=165" 
              type="video/mp4" 
            />
          </video>
        ) : null}

        {/* Guaranteed Panoramic Slideshow with Continuous Lateral Scrolling Animation */}
        <div className="absolute inset-0 overflow-hidden w-full h-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div 
              key={currentIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 220, damping: 26 },
                opacity: { duration: 0.8 }
              }}
              style={{ scale: scaleBg }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 w-[112%] h-full animate-panoramic">
                <img 
                  src={slides[currentIdx]?.url}
                  alt={slides[currentIdx]?.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Luxury Overlays: Dark gradient (60-70%) & Gold Accent Highlights */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(rgba(15,15,15,0.78), rgba(15,15,15,0.58))" }} />
        
        {/* Soft Gold Ambient Glow Highlight Blobs for visual intrigue & text contrast */}
        <div className="absolute top-[25%] left-[15%] w-[45vw] h-[45vw] bg-[#C9A66B]/5 blur-[120px] rounded-full pointer-events-none z-10" />
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-[#C9A66B]/8 blur-[160px] rounded-full pointer-events-none z-10" />
      </motion.div>

      {/* Hero Visual Contents (Parallax Adjusted) */}
      <motion.div 
        style={{ y: yContent }}
        className="relative z-20 flex-grow flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto pt-26"
      >
        
        {/* Gold editorial label */}
        <span className="text-xs tracking-[0.3em] font-bold text-[#C9A66B] uppercase mb-3 animate-fade-in-up">
          EDITORIAL WEDDING & CINEMATIC FILMS
        </span>
 
        {/* Major heading - Luxurious Typography Pairing */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-widest mb-3 uppercase leading-tight font-normal select-none">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="block tracking-[0.1em]"
          >
            CAPTURING MOMENTS.
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="block text-[#C9A66B] font-light italic capitalize tracking-normal mt-2"
          >
            creating legacies.
          </motion.span>
        </h1>
 
        {/* Decorative Camera Graphic Link */}
        <div className="flex items-center gap-4 my-2 w-full max-w-xs justify-center text-[#C9A66B]/40">
          <div className="h-[1px] bg-[#C9A66B]/25 flex-grow" />
          <Camera size={18} className="text-[#C9A66B]" />
          <div className="h-[1px] bg-[#C9A66B]/25 flex-grow" />
        </div>
 
        {/* Subheadline describing the service */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="font-sans text-sm sm:text-base md:text-lg text-luxury-ivory/90 max-w-2xl mb-4 tracking-wide font-light leading-relaxed select-none"
        >
          Luxury wedding photography and cinematic films for destination celebrations.
        </motion.p>
 
        {/* ACTION PANEL */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
          <button
            onClick={() => onNavigate("sector-portfolio")}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A66B] text-white hover:bg-[#B89058] font-sans text-xs tracking-[0.15em] font-medium uppercase transition-all duration-300 shadow-xl cursor-pointer rounded"
          >
            View Portfolio
          </button>
          
          <button
            onClick={onOpenBook}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[#C9A66B] border border-[#C9A66B] hover:bg-[#C9A66B]/10 font-sans text-xs tracking-[0.15em] font-medium uppercase transition-all duration-300 cursor-pointer rounded"
          >
            Book Consultation
          </button>
        </div>
      </motion.div>
 
      {/* Floating vertical social media bar */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-6 text-white/70">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A66B] transition-colors" title="Instagram">
          <Instagram size={18} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A66B] transition-colors" title="Youtube">
          <Youtube size={18} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A66B] transition-colors" title="Facebook">
          <Facebook size={18} />
        </a>
        
        {/* Vertical text layout */}
        <div className="flex items-center gap-3 [writing-mode:vertical-rl] mt-4 font-sans text-[9px] tracking-[0.3em] uppercase text-white/50 font-light select-none">
          <div className="w-[1px] h-12 bg-white/30 mb-2 self-center rotate-180" />
          <span>FOLLOW US</span>
        </div>
      </div>
 

      {/* Animated scroll down controller */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-2 text-white/60 mb-2 select-none">
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-light">SCROLL TO EXPLORE</span>
        <button 
          onClick={() => onNavigate("sector-services")} 
          className="hover:text-[#C9A66B] transition-colors animate-bounce cursor-pointer flex items-center justify-center border border-white/20 hover:border-[#C9A66B] rounded-full p-1"
        >
          <ChevronDown size={14} />
        </button>
      </div>
    </section>
  );
};


