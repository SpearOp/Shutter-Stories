import React, { useState, useEffect } from "react";
import { Menu, X, MessageSquare, Instagram, Eye } from "lucide-react";
import { Booking, PortfolioItem, BlogPost, HeroSlide, ServiceItem } from "./types";

// Import modular children
import { GlitchHero } from "./components/GlitchHero";
import { GlitchServices } from "./components/GlitchServices";
import { GlitchStats } from "./components/GlitchStats";
import { GlitchAbout } from "./components/GlitchAbout";
import { GlitchFilms } from "./components/GlitchFilms";
import { GlitchPortfolio } from "./components/GlitchPortfolio";
import { GlitchTestimonials } from "./components/GlitchTestimonials";
import { GlitchPricing } from "./components/GlitchPricing";
import { GlitchBooking } from "./components/GlitchBooking";
import { GlitchBlogs } from "./components/GlitchBlogs";
import { GlitchFooter } from "./components/GlitchFooter";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminPage } from "./pages/AdminPage";

const BifurcationDivider: React.FC = () => (
  <div className="w-full overflow-hidden leading-none z-20 relative pointer-events-none select-none">
    <svg className="w-full h-8 block" viewBox="0 0 1440 32" preserveAspectRatio="none">
      <polygon points="0,12 1440,4 1440,20 0,28" fill="rgba(0, 0, 0, 0.95)" />
      <line x1="0" y1="12" x2="1440" y2="4" stroke="#C9A66B" strokeWidth="1.5" strokeOpacity="0.45" />
      <line x1="0" y1="28" x2="1440" y2="20" stroke="#C9A66B" strokeWidth="1.5" strokeOpacity="0.45" />
    </svg>
  </div>
);

export default function App() {
  // Data state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);

  // UI states
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedPackage, setSelectedPackage] = useState<string>("ESSENTIAL");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Admin auth states
  const [adminAuthed, setAdminAuthed] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string>("");

  // Loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchTrigger, setFetchTrigger] = useState<number>(0);

  // Routing state
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  useEffect(() => {
    const onPop = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const isAdminRoute = currentPath === "/admin";

  // Navigation helper
  const navigateToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
    }
  };

  // Load all data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        const [resP, resB, resLog, resH, resS] = await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/blogs"),
          fetch("/api/bookings"),
          fetch("/api/hero"),
          fetch("/api/services")
        ]);
        if (resP.ok && resB.ok && resLog.ok && resH.ok && resS.ok) {
          setPortfolio(await resP.json());
          setBlogs(await resB.json());
          setBookings(await resLog.json());
          setHeroSlides(await resH.json());
          setServicesList(await resS.json());
        }
      } catch (e) {
        console.error("Archive connection fault:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, [fetchTrigger]);

  // Visitor analytics
  useEffect(() => {
    let sessionKey = sessionStorage.getItem("visitorSession");
    if (!sessionKey) {
      sessionKey = "session-" + Math.floor(Math.random() * 0xffffff).toString(16);
      sessionStorage.setItem("visitorSession", sessionKey);
    }
    fetch("/api/analytics/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionKey })
    }).catch(console.error);
  }, []);

  // Restore admin session on load
  useEffect(() => {
    const saved = sessionStorage.getItem("adminToken");
    if (saved) {
      fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: saved })
      })
        .then(r => r.json())
        .then(d => {
          if (d.valid) {
            setAdminToken(saved);
            setAdminAuthed(true);
          } else {
            sessionStorage.removeItem("adminToken");
          }
        })
        .catch(() => {});
    }
  }, []);

  const openAdmin = () => {
    window.history.pushState(null, "", "/admin");
    const ev = new PopStateEvent('popstate');
    dispatchEvent(ev);
  };

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    setAdminAuthed(true);
    sessionStorage.setItem("adminToken", token);
    window.history.pushState(null, "", "/admin");
    const ev = new PopStateEvent('popstate');
    dispatchEvent(ev);
  };

  const handleLogout = () => {
    setAdminAuthed(false);
    setAdminToken("");
    sessionStorage.removeItem("adminToken");
    window.history.pushState(null, "", "/");
    const ev = new PopStateEvent('popstate');
    dispatchEvent(ev);
  };

  const handleRefreshArchives = () => setFetchTrigger(prev => prev + 1);

  return (
    <div className="relative min-h-screen bg-black text-luxury-ivory selection:bg-luxury-gold selection:text-black transition-colors duration-500">
      <nav className="fixed top-0 inset-x-0 bg-black/85 backdrop-blur-md border-b border-white/10 z-[4000] px-6 py-4.5 uppercase font-sans text-xs">
        <div className="max-w-[1500px] mx-auto flex justify-between items-center">
          <button onClick={() => navigateToSection("sector-home")} className="flex items-center gap-2 text-white font-serif text-sm tracking-[0.25em] font-normal cursor-pointer">
            SHUTTER STORIES
          </button>
          <div className="hidden lg:flex items-center gap-7 text-white/70 text-[11px]">
            <button onClick={() => navigateToSection("sector-home")} className="hover:text-luxury-gold">HOME</button>
            <button onClick={() => navigateToSection("sector-about")} className="hover:text-luxury-gold">ABOUT</button>
            <button onClick={() => navigateToSection("sector-services")} className="hover:text-luxury-gold">SERVICES</button>
            <button onClick={() => navigateToSection("sector-portfolio")} className="hover:text-luxury-gold">PORTFOLIO</button>
            <button onClick={() => navigateToSection("sector-films")} className="hover:text-luxury-gold">FILMS</button>
            <button onClick={() => navigateToSection("sector-pricing")} className="hover:text-luxury-gold">PRICING</button>
            <button onClick={() => navigateToSection("sector-testimonials")} className="hover:text-luxury-gold">REVIEWS</button>
            <button onClick={() => navigateToSection("sector-blog")} className="hover:text-luxury-gold">JOURNAL</button>
            <button onClick={() => navigateToSection("sector-booking")} className="hover:text-luxury-gold text-luxury-gold font-semibold">BOOK NOW</button>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={openAdmin} className="px-5 py-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black text-[10px] tracking-widest font-medium">
              ADMIN PORTAL
            </button>
          </div>
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 border border-white/20 text-white hover:border-luxury-gold">
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 flex flex-col p-6 gap-4 border-t lg:hidden font-sans uppercase text-xs">
            <button onClick={() => navigateToSection("sector-home")} className="w-full text-left py-1.5 text-white/80 hover:text-luxury-gold">HOME</button>
            <button onClick={() => navigateToSection("sector-about")} className="w-full text-left py-1.5 text-white/80 hover:text-luxury-gold">ABOUT</button>
            <button onClick={() => navigateToSection("sector-services")} className="w-full text-left py-1.5 text-white/80 hover:text-luxury-gold">SERVICES</button>
            <button onClick={() => navigateToSection("sector-portfolio")} className="w-full text-left py-1.5 text-white/80 hover:text-luxury-gold">PORTFOLIO</button>
            <button onClick={() => navigateToSection("sector-films")} className="w-full text-left py-1.5 text-white/80 hover:text-luxury-gold">FILMS</button>
            <button onClick={() => navigateToSection("sector-pricing")} className="w-full text-left py-1.5 text-white/80 hover:text-luxury-gold">PRICING</button>
            <button onClick={() => navigateToSection("sector-testimonials")} className="w-full text-left py-1.5 text-white/80 hover:text-luxury-gold">REVIEWS</button>
            <button onClick={() => navigateToSection("sector-blog")} className="w-full text-left py-1.5 text-luxury-gold font-medium">JOURNAL</button>
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2">
              <button onClick={() => { setMobileMenuOpen(false); openAdmin(); }} className="py-2.5 border border-white/20 text-white text-center text-[10px]">ADMIN PORTAL</button>
              <button onClick={() => navigateToSection("sector-booking")} className="py-2.5 bg-luxury-gold text-black text-center text-[10px] font-semibold">BOOK NOW</button>
            </div>
          </div>
        )}
      </nav>

      <GlitchHero onNavigate={navigateToSection} onOpenAdmin={openAdmin} onOpenBook={() => navigateToSection("sector-booking")} heroSlides={heroSlides} />

      <div className="relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "linear-gradient(rgba(10,10,10,0.9), rgba(10,10,10,0.9)), url('/src/assets/images/aurora_background.jpg')" }}>
        <GlitchServices onSelectCategory={setSelectedCategory} onNavigate={navigateToSection} servicesList={servicesList} />
        <GlitchStats />
        <GlitchAbout onOpenBook={() => navigateToSection("sector-booking")} />
        <BifurcationDivider />
        <GlitchFilms />
        <BifurcationDivider />
        <GlitchPortfolio selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} portfolioItems={portfolio} isLoading={isLoading} onRefresh={handleRefreshArchives} />
        <BifurcationDivider />
        <section className="relative py-20 bg-transparent px-6">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex items-center gap-2.5 text-xs font-sans text-luxury-gold uppercase mb-10">
              <Instagram size={14} className="text-luxury-gold" />
              <span>INSTAGRAM JOURNAL @SHUTTER_STORIES</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400"].map((url, i) => (
                <div key={i} className="relative group aspect-square border border-white/5 overflow-hidden bg-neutral-900 cursor-pointer shadow-md">
                  <img src={url} alt="Social journal feed" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <Eye size={16} className="text-luxury-gold" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <BifurcationDivider />
        <GlitchTestimonials />
        <BifurcationDivider />
        <GlitchPricing onSelectPackage={setSelectedPackage} onNavigate={navigateToSection} />
        <BifurcationDivider />
        <GlitchBlogs blogs={blogs} isLoading={isLoading} />
        <BifurcationDivider />
        <GlitchBooking selectedPackage={selectedPackage} onBookingSuccess={handleRefreshArchives} />
        <BifurcationDivider />
        <GlitchFooter onNavigate={navigateToSection} />
      </div>

      <a href="https://wa.me/155502201" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-[3900] p-4 bg-luxury-gold hover:bg-white text-black rounded-full shadow-2xl flex items-center justify-center animate-bounce hover:scale-105 duration-300" title="Connect via WhatsApp">
        <MessageSquare size={22} />
      </a>

      {isAdminRoute && (
        adminAuthed ? (
          <AdminDashboard token={adminToken} bookings={bookings} portfolio={portfolio} blogs={blogs} heroSlides={heroSlides} servicesList={servicesList} onRefreshAll={handleRefreshArchives} onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )
      )}
    </div>
  );
}
