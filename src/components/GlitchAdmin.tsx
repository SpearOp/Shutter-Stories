import React, { useState, useEffect } from "react";
import { Booking, PortfolioItem, BlogPost, MediaCategory, HeroSlide, ServiceItem } from "../types";
import { 
  Trash2, Check, RefreshCw, Radio, Image, BookOpen, BarChart, Plus, Sparkles, X, Lock, Sliders, Layout, Edit3, Undo
} from "lucide-react";

interface AdminProps {
  onRefreshAll: () => void;
  bookings: Booking[];
  portfolio: PortfolioItem[];
  blogs: BlogPost[];
  heroSlides: HeroSlide[];
  servicesList: ServiceItem[];
  adminHash: string;
  onClose: () => void;
}

export const GlitchAdmin: React.FC<AdminProps> = ({ 
  onRefreshAll, 
  bookings, 
  portfolio, 
  blogs,
  heroSlides,
  servicesList,
  adminHash,
  onClose 
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectionError, setConnectionError] = useState<boolean>(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [logText, setLogText] = useState<string>(
    "SYSTEM BOOT :: CORRUPTED_UI_PROTOCOL_v9.7\n" +
    "AUTHENTICATED ACCESS GRANTED // BYPASSING SECURITY COGNITION\n" +
    "CYBER_GRID_SECTOR: LAKE_COMO_9 // OPERATOR SESSION: ACTIVE\n" +
    "-------------------------------------------------------"
  );

  // Helper to resolve active tab from URL hash
  const getTabFromHash = (hash: string): "bookings" | "hero" | "services" | "portfolio" | "blogs" | "analytics" => {
    const match = hash.match(/^#admin-([a-z]+)$/);
    if (match) {
      const tab = match[1];
      if (["bookings", "hero", "services", "portfolio", "blogs", "analytics"].includes(tab)) {
        return tab as any;
      }
    }
    return "bookings";
  };

  const activeTab = getTabFromHash(adminHash);

  // Gemini generator inputs
  const [draftPrompt, setDraftPrompt] = useState<string>("");
  const [draftOutput, setDraftOutput] = useState<string>("");
  const [isDrafting, setIsDrafting] = useState<boolean>(false);

  // Create forms state
  const [newHero, setNewHero] = useState({ url: "", title: "", location: "" });
  const [newService, setNewService] = useState({ num: "", title: "", category: "", imageUrl: "" });
  const [newPort, setNewPort] = useState({
    title: "",
    category: MediaCategory.WEDDINGS,
    location: "",
    director: "Shutter Stories Director",
    resolution: "Phase One IQ4 Trinity",
    imageUrl: "",
    corruptionLevel: 10,
    isFeatured: true
  });
  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "CREATIVE NOTES",
    teaser: "",
    content: "",
    authorHex: "CREATIVE DIRECTOR",
    tagsString: "WEDDING, FINE ART, EDITORIAL"
  });

  // Edit forms state
  const [editingHeroId, setEditingHeroId] = useState<string | null>(null);
  const [editingHero, setEditingHero] = useState({ url: "", title: "", location: "" });

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingService, setEditingService] = useState({ num: "", title: "", category: "", imageUrl: "" });

  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [editingPort, setEditingPort] = useState({
    title: "",
    category: MediaCategory.WEDDINGS,
    location: "",
    director: "Shutter Stories Director",
    resolution: "Phase One IQ4 Trinity",
    imageUrl: "",
    corruptionLevel: 10,
    isFeatured: true
  });

  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState({
    title: "",
    category: "CREATIVE NOTES",
    teaser: "",
    content: "",
    authorHex: "CREATIVE DIRECTOR",
    tagsString: "WEDDING, FINE ART, EDITORIAL"
  });

  const appendLog = (msg: string) => {
    setLogText(prev => `[${new Date().toLocaleTimeString()}] ${msg}\n${prev}`);
  };

  // Switch tab helper
  const handleTabClick = (tab: "bookings" | "hero" | "services" | "portfolio" | "blogs" | "analytics") => {
    window.location.hash = `admin-${tab}`;
    appendLog(`SWAPPED TAB CONTEXT: ${tab.toUpperCase()} // #admin-${tab}`);
  };

  // Fetch Analytics data
  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error("Failed to load analytics:", err);
      appendLog("ANALYTICS READ FAULT: UNABLE TO CONNECT TO PROBE GATE.");
    }
  };

  useEffect(() => {
    if (activeTab === "analytics") {
      fetchAnalytics();
    }
  }, [activeTab, bookings]);

  // Bookings Handlers
  const handleUpdateBooking = async (id: string, status: "ACCEPTED" | "TERMINATED") => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        appendLog(`SIGNAL ACCEPTED: BOOKING_ID ${id} SET TO State: ${status}`);
        onRefreshAll();
      } else {
        appendLog(`INPUT BUFFER OVERRUN: SERVER COGNITION FAILED STATUS UPDATE.`);
      }
    } catch (err) {
      console.error(err);
      appendLog("NETWORK TIMEOUT: CONNECTION FAULT REFUSED PACKETS.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        appendLog(`MEMORY PURGED: BOOKING_ID ${id} ERASES Timelines.`);
        onRefreshAll();
      }
    } catch (err) {
      console.error(err);
      appendLog("CRITICAL ERROR: CANNOT DELETE BOOKING REGISTER.");
    } finally {
      setIsLoading(false);
    }
  };

  // Hero Slides Handlers
  const handleAddHero = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHero.url || !newHero.title) {
      return appendLog("WARNING: SLIDE PATH AND TITLE DETAILS REQUIRED.");
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHero)
      });
      if (res.ok) {
        const added = await res.json();
        appendLog(`HERO_SLIDE_EMITTED: '${added.title.toUpperCase()}' ADDED TO STACK.`);
        onRefreshAll();
        setNewHero({ url: "", title: "", location: "" });
      }
    } catch (err) {
      console.error(err);
      appendLog("TRANSPILER ERROR: HERO COGNITION MUTATION FAILED.");
    } finally {
      setIsLoading(false);
    }
  };

  const startEditingHero = (slide: HeroSlide) => {
    setEditingHeroId(slide.id);
    setEditingHero({ url: slide.url, title: slide.title, location: slide.location });
    appendLog(`STAGED HERO SLIDE EDIT: ID ${slide.id}`);
  };

  const handleEditHero = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHeroId || !editingHero.url || !editingHero.title) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/hero/${editingHeroId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingHero)
      });
      if (res.ok) {
        appendLog(`HERO_SLIDE_STABILIZED: Node ID ${editingHeroId} updated.`);
        onRefreshAll();
        setEditingHeroId(null);
      }
    } catch (err) {
      console.error(err);
      appendLog("CRITICAL ERROR: HERO SLIDE UPDATE FAULT.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHero = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/hero/${id}`, { method: "DELETE" });
      if (res.ok) {
        appendLog(`HERO_NODE_DELETED: Destroyed slide node ${id}`);
        onRefreshAll();
      }
    } catch (err) {
      console.error(err);
      appendLog("CRITICAL ERROR: CANNOT DELETE HERO SLIDE REGISTER.");
    } finally {
      setIsLoading(false);
    }
  };

  // Services Handlers
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title || !newService.imageUrl || !newService.category) {
      return appendLog("WARNING: FRAME ATTRIBUTES INCOMPLETE.");
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService)
      });
      if (res.ok) {
        const added = await res.json();
        appendLog(`SERVICE_FRAME_EMITTED: '${added.title.toUpperCase()}' ADDED TO SECTOR.`);
        onRefreshAll();
        setNewService({ num: "", title: "", category: "", imageUrl: "" });
      }
    } catch (err) {
      console.error(err);
      appendLog("TRANSPILER ERROR: SERVICE FRAME COMPILATION REJECTED.");
    } finally {
      setIsLoading(false);
    }
  };

  const startEditingService = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setEditingService({ num: srv.num, title: srv.title, category: srv.category, imageUrl: srv.imageUrl });
    appendLog(`STAGED SERVICE FRAME EDIT: ID ${srv.id}`);
  };

  const handleEditService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingServiceId || !editingService.title || !editingService.imageUrl) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/services/${editingServiceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService)
      });
      if (res.ok) {
        appendLog(`SERVICE_FRAME_STABILIZED: Node ID ${editingServiceId} updated.`);
        onRefreshAll();
        setEditingServiceId(null);
      }
    } catch (err) {
      console.error(err);
      appendLog("CRITICAL ERROR: SERVICE FRAME UPDATE FAULT.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        appendLog(`SERVICE_NODE_DELETED: Destroyed service frame node ${id}`);
        onRefreshAll();
      }
    } catch (err) {
      console.error(err);
      appendLog("CRITICAL ERROR: CANNOT DELETE SERVICE FRAME REGISTER.");
    } finally {
      setIsLoading(false);
    }
  };

  // Portfolio Handlers
  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPort.title || !newPort.imageUrl) {
      return appendLog("WARNING: TITLE AND CDN IMAGE PATH REQUIRED.");
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPort)
      });
      if (res.ok) {
        appendLog(`PORT_SPECTRAL_EMITTED: '${newPort.title.toUpperCase()}' WRITTEN TO CLOUD.`);
        onRefreshAll();
        setNewPort({
          title: "",
          category: MediaCategory.WEDDINGS,
          location: "",
          director: "Shutter Stories Director",
          resolution: "Phase One IQ4 Trinity",
          imageUrl: "",
          corruptionLevel: 10,
          isFeatured: true
        });
      }
    } catch (err) {
      console.error(err);
      appendLog("TRANSPILER ERROR: PORTFOLIO COMPILATION REJECTED.");
    } finally {
      setIsLoading(false);
    }
  };

  const startEditingPortfolio = (p: PortfolioItem) => {
    setEditingPortfolioId(p.id);
    setEditingPort({
      title: p.title,
      category: p.category,
      location: p.location,
      director: p.director,
      resolution: p.resolution,
      imageUrl: p.imageUrl,
      corruptionLevel: p.corruptionLevel,
      isFeatured: p.isFeatured !== undefined ? p.isFeatured : true
    });
    appendLog(`STAGED PORTFOLIO NODE EDIT: ID ${p.id}`);
  };

  const handleEditPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolioId || !editingPort.title || !editingPort.imageUrl) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/portfolio/${editingPortfolioId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPort)
      });
      if (res.ok) {
        appendLog(`PORTFOLIO_NODE_STABILIZED: Node ID ${editingPortfolioId} updated.`);
        onRefreshAll();
        setEditingPortfolioId(null);
      }
    } catch (err) {
      console.error(err);
      appendLog("CRITICAL ERROR: PORTFOLIO NODE UPDATE FAULT.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    try {
      setIsLoading(true);
      await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      appendLog(`HARD SHUTDOWN: DESTROYED PORTFOLIO NODE ${id}`);
      onRefreshAll();
    } catch (err) {
      console.error(err);
      appendLog("CORRUPTION: DELETION EXCEPTION AT DISK INTERFACE.");
    } finally {
      setIsLoading(false);
    }
  };

  // Blogs Handlers
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) {
      return appendLog("WARNING: ARTICLE HEAD AND BODY MUST BE LOADED.");
    }
    try {
      setIsLoading(true);
      const tags = newBlog.tagsString.split(",").map(x => x.trim().toUpperCase());
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newBlog.title,
          category: newBlog.category,
          teaser: newBlog.teaser || newBlog.content.slice(0, 95) + "...",
          content: newBlog.content,
          authorHex: newBlog.authorHex,
          tags
        })
      });
      if (res.ok) {
        appendLog(`JOURNAL_CELL_STORED: Article '${newBlog.title.toUpperCase()}' published.`);
        onRefreshAll();
        setNewBlog({
          title: "",
          category: "CREATIVE NOTES",
          teaser: "",
          content: "",
          authorHex: "CREATIVE DIRECTOR",
          tagsString: "WEDDING, FINE ART, EDITORIAL"
        });
      }
    } catch (err) {
      console.error(err);
      appendLog("CRITICAL: BLOG BUFFER INJECTION TERMINATED BY COMPILER.");
    } finally {
      setIsLoading(false);
    }
  };

  const startEditingBlog = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setEditingBlog({
      title: b.title,
      category: b.category,
      teaser: b.teaser,
      content: b.content,
      authorHex: b.authorHex,
      tagsString: b.tags.join(", ")
    });
    appendLog(`STAGED JOURNAL BLOG EDIT: ID ${b.id}`);
  };

  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogId || !editingBlog.title || !editingBlog.content) return;
    try {
      setIsLoading(true);
      const tags = editingBlog.tagsString.split(",").map(x => x.trim().toUpperCase());
      const res = await fetch(`/api/blogs/${editingBlogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingBlog.title,
          category: editingBlog.category,
          teaser: editingBlog.teaser || editingBlog.content.slice(0, 95) + "...",
          content: editingBlog.content,
          authorHex: editingBlog.authorHex,
          tags
        })
      });
      if (res.ok) {
        appendLog(`JOURNAL_CELL_STABILIZED: Node ID ${editingBlogId} updated.`);
        onRefreshAll();
        setEditingBlogId(null);
      }
    } catch (err) {
      console.error(err);
      appendLog("CRITICAL ERROR: JOURNAL BLOG UPDATE FAULT.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      setIsLoading(true);
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      appendLog(`HARD SHUTDOWN: TERMINATED JOURNAL BLOG NODE ${id}`);
      onRefreshAll();
    } catch (err) {
      console.error(err);
      appendLog("DISK BOUND EXCEPTION: REJECTING SECTOR DELETE COMMAND.");
    } finally {
      setIsLoading(false);
    }
  };

  // Gemini write drafts helper
  const triggerGeminiCoprocessor = async () => {
    if (!draftPrompt) return appendLog("CRITICAL ERROR: COPROCESSOR INPUT BUFFER SHORTAGE.");
    setIsDrafting(true);
    setDraftOutput("ESTABLISHING HIGH-FREQUENCY LINK TO COGNITIVE MODEL...");
    appendLog("TRANSMITTING INTENT CELLS to Gemini models...");

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: draftPrompt, type: "blog" })
      });
      const data = await response.json();
      if (data.result) {
        setDraftOutput(data.result);
        if (editingBlogId) {
          setEditingBlog(prev => ({ ...prev, content: data.result }));
        } else {
          setNewBlog(prev => ({ ...prev, content: data.result }));
        }
        appendLog("COGNITIVE COPROCESSOR COMPLETED: REPLICANT STORY DRAFT STAGED OUT.");
      } else {
        setDraftOutput("AI DECRYPTION YIELDED NULL BYTES.");
        appendLog("WARNING: ZERO CONTENT INTENSITY RETURNED.");
      }
    } catch (err: any) {
      console.error(err);
      setDraftOutput(`COGNITION_LINK_BROKEN: ${err.message || err}`);
      appendLog("WARNING: PACKET FAILURE OVER COPROCESSOR TRANSMISSION SHELL.");
    } finally {
      setIsDrafting(false);
    }
  };

  const calculateTotalRevenue = () => {
    let sum = 0;
    bookings.forEach(b => {
      if (b.status === "ACCEPTED") {
        if (b.packageTier === "ROYAL") sum += 9999;
        else if (b.packageTier === "SIGNATURE") sum += 5499;
        else sum += 2999;
      }
    });
    return sum;
  };

  return (
    <div className="fixed inset-0 z-[8000] bg-[#000000] text-[#00FFFF] font-mono noise-overlay flex flex-col overflow-hidden border-4 border-[#FF00FF] select-none text-xs">
      
      {/* SCANLINE SCANNER LINE */}


      {/* HEADER BAR */}
      <header className="flex flex-col sm:flex-row justify-between items-center bg-[#000000] p-4.5 border-b-2 border-[#00FFFF] gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FF00FF] border border-[#00FFFF] animate-pulse shrink-0" />
          <h1 className="text-sm font-black tracking-[0.2em] text-[#00FFFF] uppercase">
            [CORRUPTED_UI_PROTOCOL_v9.7] // COGNITIVE CONTROL TERMINAL
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const errors = [
                "MEMORY_CORRUPTION_DETECTED // Segment 0xCAFEBABE compromised.",
                "INPUT_BUFFER_OVERRUN // Thread #72 stack dump initialized.",
                "SIGNAL ACCEPTED // Subsector bypass fully synchronized.",
                "COGNITIVE INTENT FAILURE // Neural synapses firing with high jitter.",
                "UNSTABLE VOLTAGE // Laser sensor temperature exceeds 1040K."
              ];
              const randomErr = errors[Math.floor(Math.random() * errors.length)];
              appendLog(randomErr);
            }}
            className="px-3 py-1.5 border border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-colors text-[9px] font-bold tracking-widest cursor-pointer uppercase"
          >
            INJECT_GLITCH
          </button>
          
          <button 
            onClick={onRefreshAll}
            className="p-1.5 text-[#00FFFF] border border-[#00FFFF] hover:bg-[#00FFFF] hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
            title="POLL DATABASE STACKS"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
            <span className="text-[9px] hidden sm:inline">POLL_ARCHIVES</span>
          </button>

          <button 
            onClick={() => {
              window.location.hash = "";
              onClose();
            }}
            className="px-4 py-1.5 bg-[#FF00FF] text-[#000000] font-black uppercase hover:bg-[#00FFFF] transition-all cursor-pointer text-[10px] tracking-widest hover:text-black scale-100 hover:scale-95"
          >
            DISCONNECT_CORE
          </button>
        </div>
      </header>

      {/* SUB-HEADER STATUS TICKER */}
      <div className="bg-[#000000] px-4 py-1.5 border-b border-[#FF00FF]/50 text-[10px] tracking-widest text-[#FF00FF] flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-bold animate-pulse">
          <span>● BYPASS ACTIVE</span>
          <span className="text-[#00FFFF]">// SYSTEM SHIELD STATE: STABLE-COMPROMISED</span>
        </div>
        <div className="text-[9px] text-[#00FFFF]/80">
          ADDR_GRID_9: Positano-Waterfront // LINK_INTEGRITY: 89.2%
        </div>
      </div>

      {/* CORE BODY GRID */}
      <div className="flex-grow flex flex-col lg:grid lg:grid-cols-12 overflow-hidden">
        
        {/* Left Sidebar Pane */}
        <aside className="col-span-3 lg:col-span-2.5 xl:col-span-2 bg-[#000000] border-r-2 border-[#00FFFF] p-4 flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible no-scrollbar shrink-0 text-[10px] tracking-wider">
          <button
            onClick={() => handleTabClick("bookings")}
            className={`w-full text-left px-3.5 py-4 flex items-center gap-2.5 transition-all cursor-pointer font-extrabold ${
              activeTab === "bookings" 
                ? "bg-[#00FFFF] text-[#000000] shadow-[0_0_12px_#00FFFF] border border-transparent" 
                : "text-[#00FFFF] border border-[#00FFFF]/45 hover:bg-[#00FFFF]/10"
            }`}
          >
            <Radio size={14} />
            <span>BOOKINGS_DB ({bookings.length})</span>
          </button>

          <button
            onClick={() => handleTabClick("hero")}
            className={`w-full text-left px-3.5 py-4 flex items-center gap-2.5 transition-all cursor-pointer font-extrabold ${
              activeTab === "hero" 
                ? "bg-[#00FFFF] text-[#000000] shadow-[0_0_12px_#00FFFF] border border-transparent" 
                : "text-[#00FFFF] border border-[#00FFFF]/45 hover:bg-[#00FFFF]/10"
            }`}
          >
            <Sliders size={14} />
            <span>HERO_SLIDES ({heroSlides.length})</span>
          </button>

          <button
            onClick={() => handleTabClick("services")}
            className={`w-full text-left px-3.5 py-4 flex items-center gap-2.5 transition-all cursor-pointer font-extrabold ${
              activeTab === "services" 
                ? "bg-[#00FFFF] text-[#000000] shadow-[0_0_12px_#00FFFF] border border-transparent" 
                : "text-[#00FFFF] border border-[#00FFFF]/45 hover:bg-[#00FFFF]/10"
            }`}
          >
            <Layout size={14} />
            <span>SERVICES_FRM ({servicesList.length})</span>
          </button>

          <button
            onClick={() => handleTabClick("portfolio")}
            className={`w-full text-left px-3.5 py-4 flex items-center gap-2.5 transition-all cursor-pointer font-extrabold ${
              activeTab === "portfolio" 
                ? "bg-[#00FFFF] text-[#000000] shadow-[0_0_12px_#00FFFF] border border-transparent" 
                : "text-[#00FFFF] border border-[#00FFFF]/45 hover:bg-[#00FFFF]/10"
            }`}
          >
            <Image size={14} />
            <span>PORT_SPEC_GRID ({portfolio.length})</span>
          </button>

          <button
            onClick={() => handleTabClick("blogs")}
            className={`w-full text-left px-3.5 py-4 flex items-center gap-2.5 transition-all cursor-pointer font-extrabold ${
              activeTab === "blogs" 
                ? "bg-[#00FFFF] text-[#000000] shadow-[0_0_12px_#00FFFF] border border-transparent" 
                : "text-[#00FFFF] border border-[#00FFFF]/45 hover:bg-[#00FFFF]/10"
            }`}
          >
            <BookOpen size={14} />
            <span>EMISSIONS_CMS ({blogs.length})</span>
          </button>

          <button
            onClick={() => handleTabClick("analytics")}
            className={`w-full text-left px-3.5 py-4 flex items-center gap-2.5 transition-all cursor-pointer font-extrabold ${
              activeTab === "analytics" 
                ? "bg-[#00FFFF] text-[#000000] shadow-[0_0_12px_#00FFFF] border border-transparent" 
                : "text-[#00FFFF] border border-[#00FFFF]/45 hover:bg-[#00FFFF]/10"
            }`}
          >
            <BarChart size={14} />
            <span>METRICS_LOGS</span>
          </button>
        </aside>

        {/* Right Workspace Board */}
        <main className="col-span-9 lg:col-span-6.5 xl:col-span-7 bg-[#000000] p-6 overflow-y-auto no-scrollbar border-r-2 border-[#00FFFF] flex-grow">
          
          {/* TAB 1: BOOKING SYSTEM */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#00FFFF] pb-2">
                <h3 className="text-[#FF00FF] font-bold text-sm tracking-widest uppercase">
                  &gt; TIMELINE_REGISTRATIONS_BUFFER
                </h3>
              </div>
              
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-[#FF00FF]/40 text-xs text-[#FF00FF] font-extrabold animate-pulse">
                    NO REGISTRY PACKETS DETECTED. CORE BUFFER WAITING FOR ENQUIRIES.
                  </div>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className="bg-[#000000] border-2 border-[#FF00FF] p-5 space-y-4 shadow-[4px_4px_0px_#FF00FF]">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-[#FF00FF]/50 pb-2.5">
                        <div>
                          <span className="text-[9px] text-[#00FFFF] font-extrabold tracking-widest">COUPLE ARCH_ID LOGGED:</span>
                          <h4 className="text-sm font-black text-[#FF00FF] tracking-wide mt-0.5 uppercase">{b.clientName}</h4>
                        </div>
                        
                        <div className="flex gap-2">
                          <span className={`px-2 py-0.5 text-[9px] border font-black tracking-widest uppercase ${
                            b.status === "ACCEPTED" 
                              ? "border-[#00FFFF] text-[#00FFFF] bg-black"
                              : b.status === "TERMINATED"
                              ? "border-[#FF00FF] text-[#FF00FF] bg-black"
                              : "border-[#FF00FF] text-[#FF00FF] bg-black animate-pulse"
                          }`}>
                            {b.status}
                          </span>
                          
                          <span className="px-2 py-0.5 border border-[#00FFFF]/50 text-[#00FFFF] text-[9px] font-black tracking-wider uppercase">
                            {b.packageTier}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] text-[#00FFFF] tracking-widest font-bold">
                        <div>EMAIL_CORR: <span className="text-white select-all lowercase">{b.sectorEmail}</span></div>
                        <div>COMM_LINK: <span className="text-white select-all">{b.commLink}</span></div>
                        <div>TIMELINE_DATE: <span className="text-[#FF00FF]">{b.eventDate}</span></div>
                        <div>COORD_VENUE: <span className="text-white">{b.coordinateVenue}</span></div>
                      </div>

                      <div className="bg-[#000000] border border-[#00FFFF]/40 p-3.5 text-[10px] text-[#00FFFF]/80 leading-relaxed font-bold">
                        COURIER CELL CONTENT: <span className="text-[#FF00FF]">"{b.message || "No custom instructions submitted."}"</span>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-wrap gap-2 justify-end">
                        {b.status === "PENDING" && (
                          <button
                            onClick={() => handleUpdateBooking(b.id, "ACCEPTED")}
                            className="px-4 py-2 cyber-button-cyan transition-colors text-[10px] uppercase font-bold"
                          >
                            &gt; STABILIZE_COV_DATE
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="px-4 py-2 cyber-button-magenta transition-colors text-[10px] uppercase font-bold"
                        >
                          &gt; EXTERMINATE_LOG_CELL
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HERO SLIDES CMS */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#00FFFF] pb-2">
                <h3 className="text-[#FF00FF] font-bold text-sm tracking-widest uppercase">
                  &gt; HERO_SLIDESHOW_CONTRIBUTION_UNIT
                </h3>
              </div>

              {/* Form container: Create or Edit */}
              {editingHeroId ? (
                <form onSubmit={handleEditHero} className="bg-[#000000] border-2 border-[#FF00FF] p-6 space-y-4 shadow-[4px_4px_0px_#FF00FF]">
                  <div className="flex justify-between items-center border-b border-[#FF00FF]/30 pb-2">
                    <span className="text-[10px] text-[#FF00FF] tracking-widest font-bold block">// EDIT HERO SLIDE NODE: {editingHeroId}</span>
                    <button
                      type="button"
                      onClick={() => { setEditingHeroId(null); appendLog("EDIT HERO SLIDE CANCELLED"); }}
                      className="text-[#FF00FF] hover:text-[#00FFFF] flex items-center gap-1 text-[9px] font-bold"
                    >
                      <Undo size={11} /> CANCEL
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">SLIDE TITLE</label>
                      <input 
                        type="text" 
                        required
                        value={editingHero.title}
                        onChange={(e) => setEditingHero({...editingHero, title: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-extrabold focus:outline-none"
                        placeholder="e.g. BALCONY OF PROTOCOLS"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">IMAGE URL PATH</label>
                      <input 
                        type="text" 
                        required
                        value={editingHero.url}
                        onChange={(e) => setEditingHero({...editingHero, url: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#FF00FF] focus:border-[#00FFFF] text-xs font-bold focus:outline-none"
                        placeholder="/src/assets/images/... or https://"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">VENUE LOCATION</label>
                      <input 
                        type="text" 
                        value={editingHero.location}
                        onChange={(e) => setEditingHero({...editingHero, location: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-bold focus:outline-none"
                        placeholder="e.g. LAKE COMO CLIFFS"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cyber-button-magenta transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest font-extrabold"
                  >
                    <Check size={14} />
                    <span>UPDATE_HERO_SLIDE_NODE</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAddHero} className="bg-[#000000] border-2 border-[#00FFFF] p-6 space-y-4 shadow-[4px_4px_0px_#00FFFF]">
                  <span className="text-[10px] text-[#FF00FF] tracking-widest font-bold block">// CREATE NEW HERO SLIDE INDEX</span>
                  
                  <div className="grid grid-cols-1 gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">SLIDE TITLE *</label>
                      <input 
                        type="text" 
                        required
                        value={newHero.title}
                        onChange={(e) => setNewHero({...newHero, title: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-extrabold focus:outline-none"
                        placeholder="e.g. CELEBRATION COVENANT PROTOCOL"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">IMAGE URL PATH *</label>
                      <input 
                        type="text" 
                        required
                        value={newHero.url}
                        onChange={(e) => setNewHero({...newHero, url: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#FF00FF] focus:border-[#FF00FF] text-xs font-bold focus:outline-none"
                        placeholder="/src/assets/images/... or https://"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">VENUE LOCATION</label>
                      <input 
                        type="text" 
                        value={newHero.location}
                        onChange={(e) => setNewHero({...newHero, location: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-bold focus:outline-none"
                        placeholder="e.g. RAVELLO CLIFFSIDE"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cyber-button-cyan transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest font-extrabold"
                  >
                    <Plus size={14} />
                    <span>EMIT_NEW_HERO_SLIDE</span>
                  </button>
                </form>
              )}

              {/* Showcase items list */}
              <div className="space-y-3 mt-4">
                <span className="text-[#FF00FF] text-[10px] tracking-widest font-bold">// HERO INDEX LAYERS:</span>
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="bg-black border-2 border-[#00FFFF]/40 p-3.5 flex justify-between items-center shadow-md gap-4">
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <div className="w-16 h-12 shrink-0 border border-[#FF00FF] overflow-hidden bg-neutral-950">
                        <img 
                          src={slide.url} 
                          className="w-full h-full object-cover" 
                          alt="Preview" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Local asset fallback preview helpers
                            (e.target as any).src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=150";
                          }}
                        />
                      </div>
                      <div className="truncate">
                        <div className="text-xs text-[#00FFFF] font-bold tracking-wide uppercase truncate">{slide.title}</div>
                        <div className="text-[9px] text-[#FF00FF] tracking-widest font-bold uppercase truncate">{slide.location}</div>
                        <div className="text-[8px] text-white/50 truncate font-sans">{slide.url}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEditingHero(slide)}
                        className="p-2 border border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black transition-colors"
                        title="EDIT NODE"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteHero(slide.id)}
                        className="p-2 border border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-colors"
                        title="TERMINATE NODE"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES FRAMES CMS */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#00FFFF] pb-2">
                <h3 className="text-[#FF00FF] font-bold text-sm tracking-widest uppercase">
                  &gt; SERVICES_FRAMES_CONTRIBUTION_UNIT
                </h3>
              </div>

              {/* Form container: Create or Edit */}
              {editingServiceId ? (
                <form onSubmit={handleEditService} className="bg-[#000000] border-2 border-[#FF00FF] p-6 space-y-4 shadow-[4px_4px_0px_#FF00FF]">
                  <div className="flex justify-between items-center border-b border-[#FF00FF]/30 pb-2">
                    <span className="text-[10px] text-[#FF00FF] tracking-widest font-bold block">// EDIT SERVICE FRAME NODE: {editingServiceId}</span>
                    <button
                      type="button"
                      onClick={() => { setEditingServiceId(null); appendLog("EDIT SERVICE FRAME CANCELLED"); }}
                      className="text-[#FF00FF] hover:text-[#00FFFF] flex items-center gap-1 text-[9px] font-bold"
                    >
                      <Undo size={11} /> CANCEL
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">FRAME NO (E.G. 01)</label>
                      <input 
                        type="text" 
                        required
                        value={editingService.num}
                        onChange={(e) => setEditingService({...editingService, num: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-extrabold focus:outline-none"
                        placeholder="01"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">FRAME HEADER TITLE</label>
                      <input 
                        type="text" 
                        required
                        value={editingService.title}
                        onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-extrabold focus:outline-none"
                        placeholder="e.g. DESTINATION BANDS"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">IMAGE URL PATH</label>
                      <input 
                        type="text" 
                        required
                        value={editingService.imageUrl}
                        onChange={(e) => setEditingService({...editingService, imageUrl: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#FF00FF] focus:border-[#00FFFF] text-xs font-bold focus:outline-none"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">MEDIA CATEGORY (GRID FILTER)</label>
                      <input 
                        type="text" 
                        required
                        value={editingService.category}
                        onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-bold focus:outline-none"
                        placeholder="e.g. FILMS"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cyber-button-magenta transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest font-extrabold"
                  >
                    <Check size={14} />
                    <span>UPDATE_SERVICE_FRAME_NODE</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAddService} className="bg-[#000000] border-2 border-[#00FFFF] p-6 space-y-4 shadow-[4px_4px_0px_#00FFFF]">
                  <span className="text-[10px] text-[#FF00FF] tracking-widest font-bold block">// CREATE NEW SERVICE FRAME</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">FRAME NO (E.G. 07)</label>
                      <input 
                        type="text" 
                        required
                        value={newService.num}
                        onChange={(e) => setNewService({...newService, num: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-extrabold focus:outline-none"
                        placeholder="e.g. 07"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">FRAME HEADER TITLE *</label>
                      <input 
                        type="text" 
                        required
                        value={newService.title}
                        onChange={(e) => setNewService({...newService, title: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-extrabold focus:outline-none"
                        placeholder="e.g. ELITE CINEMA"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">IMAGE URL PATH *</label>
                      <input 
                        type="text" 
                        required
                        value={newService.imageUrl}
                        onChange={(e) => setNewService({...newService, imageUrl: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#FF00FF] focus:border-[#FF00FF] text-xs font-bold focus:outline-none"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">MEDIA CATEGORY (LINKED FILTER) *</label>
                      <select
                        value={newService.category}
                        onChange={(e) => setNewService({...newService, category: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-bold focus:outline-none"
                      >
                        <option value="">-- SELECT TARIFF FIELD --</option>
                        <option value={MediaCategory.WEDDINGS}>WEDDINGS</option>
                        <option value={MediaCategory.ENGAGEMENTS}>ENGAGEMENTS</option>
                        <option value={MediaCategory.DESTINATIONS}>DESTINATIONS</option>
                        <option value={MediaCategory.FASHION}>FASHION</option>
                        <option value={MediaCategory.EVENTS}>EVENTS</option>
                        <option value={MediaCategory.FILMS}>FILMS</option>
                        <option value="ALBUMS">LUXURY ALBUMS</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cyber-button-cyan transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest font-extrabold"
                  >
                    <Plus size={14} />
                    <span>EMIT_NEW_SERVICE_FRAME</span>
                  </button>
                </form>
              )}

              {/* Showcase items list */}
              <div className="space-y-3 mt-4">
                <span className="text-[#FF00FF] text-[10px] tracking-widest font-bold">// SERVICE GRID FRAMES LOGGED:</span>
                {servicesList.map((srv) => (
                  <div key={srv.id} className="bg-black border-2 border-[#00FFFF]/40 p-3.5 flex justify-between items-center shadow-md gap-4">
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <div className="w-16 h-12 shrink-0 border border-[#FF00FF] overflow-hidden bg-neutral-950">
                        <img 
                          src={srv.imageUrl} 
                          className="w-full h-full object-cover" 
                          alt="Preview" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="truncate">
                        <div className="text-xs text-[#00FFFF] font-bold tracking-wide uppercase truncate">{srv.num} // {srv.title}</div>
                        <div className="text-[9px] text-[#FF00FF] tracking-widest font-bold uppercase truncate">FILTER CATEGORY: {srv.category}</div>
                        <div className="text-[8px] text-white/50 truncate font-sans">{srv.imageUrl}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEditingService(srv)}
                        className="p-2 border border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black transition-colors"
                        title="EDIT FRAME"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="p-2 border border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-colors"
                        title="TERMINATE FRAME"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PORTFOLIO CMS */}
          {activeTab === "portfolio" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#00FFFF] pb-2">
                <h3 className="text-[#FF00FF] font-bold text-sm tracking-widest uppercase">
                  &gt; PORTFOLIO_IMAGE_INJECTION_UNIT
                </h3>
              </div>
              
              {editingPortfolioId ? (
                <form onSubmit={handleEditPortfolio} className="bg-[#000000] border-2 border-[#FF00FF] p-6 space-y-4 shadow-[4px_4px_0px_#FF00FF]">
                  <div className="flex justify-between items-center border-b border-[#FF00FF]/30 pb-2">
                    <span className="text-[10px] text-[#FF00FF] tracking-widest font-bold block">// EDIT PORTFOLIO NODE: {editingPortfolioId}</span>
                    <button
                      type="button"
                      onClick={() => { setEditingPortfolioId(null); appendLog("EDIT PORTFOLIO CANCELLED"); }}
                      className="text-[#FF00FF] hover:text-[#00FFFF] flex items-center gap-1 text-[9px] font-bold"
                    >
                      <Undo size={11} /> CANCEL
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                      <label className="text-[#00FFFF] tracking-widest font-bold">VECTOR LABEL HEADER *</label>
                      <input 
                        type="text" 
                        required
                        value={editingPort.title}
                        onChange={(e) => setEditingPort({...editingPort, title: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-extrabold focus:outline-none"
                        placeholder="e.g. POSITANO EVENING SPECTRAL"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                      <label className="text-[#00FFFF] tracking-widest font-bold">IMAGE CDN_URL *</label>
                      <input 
                        type="url" 
                        required
                        value={editingPort.imageUrl}
                        onChange={(e) => setEditingPort({...editingPort, imageUrl: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#FF00FF] focus:border-[#00FFFF] text-xs font-bold focus:outline-none"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">GRID TARGET GROUPING *</label>
                      <select
                        value={editingPort.category}
                        onChange={(e) => setEditingPort({...editingPort, category: e.target.value as MediaCategory})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-bold focus:outline-none"
                      >
                        <option value={MediaCategory.WEDDINGS}>STRIKING WEDDINGS</option>
                        <option value={MediaCategory.ENGAGEMENTS}>EDITORIAL ENGAGEMENTS</option>
                        <option value={MediaCategory.DESTINATIONS}>ELITE DESTINATION SPECIALS</option>
                        <option value={MediaCategory.FASHION}>FINE ART FASHION COOP</option>
                        <option value={MediaCategory.EVENTS}>EXCLUSIVE CELEBRATION EVENTS</option>
                        <option value={MediaCategory.FILMS}>SPECTRAL TIME FILMS</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">COORD_VENUE LOCATION</label>
                      <input 
                        type="text" 
                        value={editingPort.location}
                        onChange={(e) => setEditingPort({...editingPort, location: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-bold focus:outline-none"
                        placeholder="e.g. AMALFI SHORE, ITALY"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">SYSTEM DIRECTOR</label>
                      <input 
                        type="text" 
                        value={editingPort.director}
                        onChange={(e) => setEditingPort({...editingPort, director: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-bold focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">CAPTURE RESOLUTION</label>
                      <input 
                        type="text" 
                        value={editingPort.resolution}
                        onChange={(e) => setEditingPort({...editingPort, resolution: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-bold focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cyber-button-magenta transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest font-extrabold"
                  >
                    <Check size={14} />
                    <span>UPDATE_PORTFOLIO_NODE</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAddPortfolio} className="bg-[#000000] border-2 border-[#00FFFF] p-6 space-y-4 shadow-[4px_4px_0px_#00FFFF]">
                  <span className="text-[10px] text-[#FF00FF] tracking-widest font-bold block">// INPUT LENS DATA INTO DURATION CORE</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                      <label className="text-[#00FFFF] tracking-widest font-bold">VECTOR LABEL HEADER *</label>
                      <input 
                        type="text" 
                        required
                        value={newPort.title}
                        onChange={(e) => setNewPort({...newPort, title: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-extrabold focus:outline-none"
                        placeholder="e.g. LAKE COMO DUSK RUST"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                      <label className="text-[#00FFFF] tracking-widest font-bold">IMAGE GRAPH_CDN_URL *</label>
                      <input 
                        type="url" 
                        required
                        value={newPort.imageUrl}
                        onChange={(e) => setNewPort({...newPort, imageUrl: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#FF00FF] focus:border-[#FF00FF] text-xs font-bold focus:outline-none"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">GRID TARGET GROUPING *</label>
                      <select
                        value={newPort.category}
                        onChange={(e) => setNewPort({...newPort, category: e.target.value as MediaCategory})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-bold focus:outline-none"
                      >
                        <option value={MediaCategory.WEDDINGS}>STRIKING WEDDINGS</option>
                        <option value={MediaCategory.ENGAGEMENTS}>EDITORIAL ENGAGEMENTS</option>
                        <option value={MediaCategory.DESTINATIONS}>ELITE DESTINATION SPECIALS</option>
                        <option value={MediaCategory.FASHION}>FINE ART FASHION COOP</option>
                        <option value={MediaCategory.EVENTS}>EXCLUSIVE CELEBRATION EVENTS</option>
                        <option value={MediaCategory.FILMS}>SPECTRAL TIME FILMS</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] tracking-widest font-bold">COORD_VENUE LOCATION</label>
                      <input 
                        type="text" 
                        value={newPort.location}
                        onChange={(e) => setNewPort({...newPort, location: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-bold focus:outline-none"
                        placeholder="e.g. LAKE COMO, ITALY"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cyber-button-cyan transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest font-extrabold"
                  >
                    <Plus size={14} />
                    <span>EMIT_NEW_PORTFOLIO_NODE</span>
                  </button>
                </form>
              )}

              {/* Showcase items list */}
              <div className="space-y-2.5 mt-4">
                <span className="text-[#FF00FF] text-[10px] tracking-widest font-bold">// STORAGE NODES LOGGED:</span>
                {portfolio.map(p => (
                  <div key={p.id} className="bg-black border-2 border-[#FF00FF]/50 p-3.5 flex justify-between items-center shadow-md gap-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-14 h-14 shrink-0 border border-[#00FFFF] overflow-hidden bg-neutral-900">
                        <img 
                          src={p.imageUrl} 
                          className="w-full h-full object-cover transition-colors" 
                          alt="Preview" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="truncate">
                        <div className="text-xs text-[#00FFFF] font-bold tracking-wide uppercase truncate">{p.title}</div>
                        <div className="text-[9px] text-[#FF00FF] tracking-widest font-bold uppercase truncate">{p.category} // MAP: {p.location}</div>
                        <div className="text-[8px] text-white/50 truncate font-sans">{p.imageUrl}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEditingPortfolio(p)}
                        className="p-2 border border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black transition-colors"
                        title="EDIT NODE"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeletePortfolio(p.id)}
                        className="p-2 border border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-colors"
                        title="TERMINATE PORTFOLIO NODE"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: JOURNAL CMS */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#00FFFF] pb-2">
                <h3 className="text-[#FF00FF] font-bold text-sm tracking-widest uppercase">
                  &gt; JOURNAL_STORY_EMISSION_DESK
                </h3>
              </div>

              {/* Gemini block */}
              <div className="bg-[#000000] border-2 border-[#FF00FF] p-5 space-y-4 shadow-[4px_4px_0px_#FF00FF]">
                <div className="flex items-center gap-2 text-[#00FFFF] text-xs font-extrabold leading-none tracking-widest animate-pulse">
                  <Sparkles size={16} className="text-[#FF00FF]" />
                  <span>CYBER_COPROCESSOR_AI // GEMINI ACTIVE</span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-[#00FFFF]">
                  <label className="tracking-widest font-bold">COMPILE TEXT_PROMPT OR CREATIVE INSTRUCTIONS</label>
                  <textarea
                    rows={2}
                    value={draftPrompt}
                    onChange={(e) => setDraftPrompt(e.target.value)}
                    className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs focus:outline-none font-bold"
                    placeholder="e.g. Generate high-yield creative review analyzing medium format sensors on coastal Positano light bands."
                  />
                </div>

                <button
                  type="button"
                  onClick={triggerGeminiCoprocessor}
                  disabled={isDrafting}
                  className="w-full py-3 cyber-button-magenta transition-all flex items-center justify-center gap-1.5 cursor-pointer font-bold text-[10px] tracking-widest"
                >
                  {isDrafting ? "COMPILING COGNITION PACKETS..." : "GENERATE_CYBERNETIC_DRAFT"}
                </button>

                {draftOutput && (
                  <div className="bg-black p-4 text-[10px] border-2 border-[#00FFFF] text-[#00FFFF]/80 max-h-40 overflow-y-auto leading-relaxed select-all">
                    {draftOutput}
                  </div>
                )}
              </div>

              {/* Insert or Edit Form */}
              {editingBlogId ? (
                <form onSubmit={handleEditBlog} className="bg-[#000000] border-2 border-[#FF00FF] p-6 space-y-4 shadow-[4px_4px_0px_#FF00FF]">
                  <div className="flex justify-between items-center border-b border-[#FF00FF]/30 pb-2">
                    <span className="text-[10px] text-[#FF00FF] tracking-widest font-bold block">// EDIT JOURNAL ENTRY: {editingBlogId}</span>
                    <button
                      type="button"
                      onClick={() => { setEditingBlogId(null); appendLog("EDIT JOURNAL POST CANCELLED"); }}
                      className="text-[#FF00FF] hover:text-[#00FFFF] flex items-center gap-1 text-[9px] font-bold"
                    >
                      <Undo size={11} /> CANCEL
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                      <label className="text-[#00FFFF] font-mono tracking-widest font-bold">ARTICLE HEADER SPEC *</label>
                      <input 
                        type="text" 
                        required
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-mono focus:outline-none font-bold"
                        placeholder="e.g. LIGHT COVENANT LOGS"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] font-mono tracking-widest font-bold">CATEGORY ARCHIVE</label>
                      <input 
                        type="text" 
                        value={editingBlog.category}
                        onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-mono focus:outline-none font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] font-mono tracking-widest font-bold">CODENAME TAGS (COMMA SEPARATED)</label>
                      <input 
                        type="text" 
                        value={editingBlog.tagsString}
                        onChange={(e) => setEditingBlog({...editingBlog, tagsString: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#00FFFF] focus:border-[#00FFFF] text-xs uppercase font-mono focus:outline-none font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                      <label className="text-[#00FFFF] font-mono tracking-widest font-bold">STORY BUFFER STRUCT *</label>
                      <textarea 
                        required
                        rows={5}
                        value={editingBlog.content}
                        onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                        className="bg-black border-2 border-[#FF00FF] p-2.5 text-[#FF00FF] text-xs h-40 focus:outline-none font-mono font-bold"
                        placeholder="Input core narrative segments..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cyber-button-magenta transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest font-extrabold"
                  >
                    <Check size={14} />
                    <span>UPDATE_JOURNAL_SEGMENT</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAddBlog} className="bg-[#000000] border-2 border-[#00FFFF] p-6 space-y-4 shadow-[4px_4px_0px_#00FFFF]">
                  <span className="text-[10px] text-[#FF00FF] tracking-widest font-bold block">// CREATE NEW JOURNAL SEGMENT</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                      <label className="text-[#00FFFF] font-mono tracking-widest font-bold">ARTICLE HEADER SPEC *</label>
                      <input 
                        type="text" 
                        required
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-mono focus:outline-none font-bold"
                        placeholder="e.g. PHOTORESIST COATING PHENOMENON"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] font-mono tracking-widest font-bold">CATEGORY ARCHIVE</label>
                      <input 
                        type="text" 
                        value={newBlog.category}
                        onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-mono focus:outline-none font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#00FFFF] font-mono tracking-widest font-bold">CODENAME TAGS (COMMA SEPARATED)</label>
                      <input 
                        type="text" 
                        value={newBlog.tagsString}
                        onChange={(e) => setNewBlog({...newBlog, tagsString: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#00FFFF] focus:border-[#FF00FF] text-xs uppercase font-mono focus:outline-none font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                      <label className="text-[#00FFFF] font-mono tracking-widest font-bold">STORY BUFFER STRUCT *</label>
                      <textarea 
                        required
                        rows={5}
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                        className="bg-black border-2 border-[#00FFFF] p-2.5 text-[#FF00FF] text-xs h-40 focus:outline-none font-mono font-bold"
                        placeholder="Input core narrative segments..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cyber-button-cyan transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs tracking-widest font-extrabold"
                  >
                    <Plus size={14} />
                    <span>PUBLISH_JOURNAL_SEGMENT</span>
                  </button>
                </form>
              )}

              {/* Node logs */}
              <div className="space-y-3">
                <span className="text-[#FF00FF] text-[10px] tracking-widest font-bold">// EMITTED LOG ARTICLES:</span>
                {blogs.map(b => (
                  <div key={b.id} className="bg-black border-2 border-[#FF00FF]/50 p-3.5 flex justify-between items-center shadow-md gap-4">
                    <div className="truncate">
                      <div className="text-xs text-[#00FFFF] font-bold tracking-wide uppercase truncate">{b.title}</div>
                      <div className="text-[9px] text-[#FF00FF] tracking-widest font-bold uppercase truncate">{b.category} &bull; BYTES: {b.byteSize}</div>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEditingBlog(b)}
                        className="p-2 border border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-black transition-colors"
                        title="EDIT BLOG"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-2 border border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-colors"
                        title="DESTRUCT BLOG"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: METRICS & TRAFFIC ANALYSIS */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#00FFFF] pb-2">
                <h3 className="text-[#FF00FF] font-bold text-sm tracking-widest uppercase">
                  &gt; VISITOR_TRAFFIC_AND_VALUATION_DASHBOARD
                </h3>
              </div>

              {/* Top Row Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Total views */}
                <div className="bg-[#000000] border-2 border-[#00FFFF] p-5 flex flex-col justify-between shadow-[3px_3px_0px_#00FFFF]">
                  <span className="text-[9px] text-[#FF00FF] tracking-widest font-bold uppercase">TOTAL PAGE VIEWS:</span>
                  <div className="text-2xl md:text-3xl font-mono text-[#00FFFF] mt-2 font-extrabold tracking-widest select-all">
                    {analyticsData?.pageViews || 0}
                  </div>
                  <span className="text-[8px] text-[#00FFFF]/60 mt-1 uppercase tracking-widest font-bold">RAW VISITOR HITS REGISTERED</span>
                </div>

                {/* Unique sessions */}
                <div className="bg-[#000000] border-2 border-[#00FFFF] p-5 flex flex-col justify-between shadow-[3px_3px_0px_#00FFFF]">
                  <span className="text-[9px] text-[#FF00FF] tracking-widest font-bold uppercase">UNIQUE VISITOR SESSIONS:</span>
                  <div className="text-2xl md:text-3xl font-mono text-[#00FFFF] mt-2 font-extrabold tracking-widest select-all">
                    {analyticsData?.uniqueVisitors || 0}
                  </div>
                  <span className="text-[8px] text-[#00FFFF]/60 mt-1 uppercase tracking-widest font-bold">DEDUPLICATED TRAFFIC COUNT</span>
                </div>

                {/* Conversion Rate */}
                <div className="bg-[#000000] border-2 border-[#FF00FF] p-5 flex flex-col justify-between shadow-[3px_3px_0px_#FF00FF]">
                  <span className="text-[9px] text-[#00FFFF] tracking-widest font-bold uppercase">CONVERSION METRIC RATIO:</span>
                  <div className="text-2xl md:text-3xl font-mono text-[#FF00FF] mt-2 font-extrabold tracking-widest">
                    {((bookings.length / Math.max(1, analyticsData?.uniqueVisitors || 1)) * 100).toFixed(1)}%
                  </div>
                  <span className="text-[8px] text-[#FF00FF]/60 mt-1 uppercase tracking-widest font-bold">VISITORS TO ENQUIRIES RATE</span>
                </div>
              </div>

              {/* Second Row Financial Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Total revenue */}
                <div className="bg-[#000000] border-2 border-[#00FFFF] p-6 flex flex-col justify-center shadow-[3px_3px_0px_#00FFFF]">
                  <span className="text-[9px] text-[#FF00FF] tracking-widest font-bold uppercase font-mono">CONFIRMED COV_REVENUE VALUE:</span>
                  <div className="text-3xl md:text-4xl font-mono text-[#00FFFF] mt-2 font-extrabold tracking-widest select-all">
                    ${calculateTotalRevenue().toLocaleString()}
                  </div>
                  <span className="text-[8px] text-[#00FFFF]/60 mt-1 uppercase tracking-widest font-bold font-mono">FROM VERIFIED WEDDING CONTRACTS</span>
                </div>

                {/* Diagnostic breakdown stats */}
                <div className="bg-[#000000] border-2 border-[#FF00FF] p-6 flex flex-col justify-center text-[10px] text-[#00FFFF] leading-normal space-y-2.5 shadow-[3px_3px_0px_#FF00FF] font-mono">
                  <div className="font-extrabold flex items-center gap-1 text-[#FF00FF] mb-1 uppercase tracking-widest">
                    <span>SYSTEM ARCHIVE SUMMARY</span>
                  </div>
                  <div>BOOKING REGISTER_SIZE: <span className="text-white font-bold">{bookings.length} CORES</span></div>
                  <div>STABILIZED_DATES: <span className="text-[#FF00FF] font-bold">{bookings.filter(x => x.status === "ACCEPTED").length}</span></div>
                  <div>PORT_VECTOR_GRID_NODES: <span className="text-white font-bold">{portfolio.length} NODES</span></div>
                  <div>JOURNAL_POST_EMISSIONS: <span className="text-white font-bold">{blogs.length} ARTICLES</span></div>
                </div>

              </div>

              {/* Audit Booking Checkpoint Table */}
              <div className="bg-[#000000] border-2 border-[#00FFFF] p-4 text-[#00FFFF]">
                <span className="text-[#FF00FF] text-[10px] tracking-widest font-extrabold block mb-3 font-mono">// ENQUIRY LEDGER VALUE SEGMENTS</span>
                
                <div className="overflow-x-auto text-[10px] tracking-widest uppercase font-mono">
                  <table className="w-full text-left divide-y divide-[#00FFFF]/30">
                    <thead>
                      <tr className="text-[#00FFFF]/60 font-bold">
                        <th className="p-3">COGNITIVE UNION NAMES</th>
                        <th className="p-3">TIER</th>
                        <th className="p-3 text-right">VALUATION</th>
                        <th className="p-3 text-right">METRIC_STATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#00FFFF]/20 text-[#00FFFF] font-medium">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-3 text-center text-[#FF00FF]/80 italic font-bold">EMPTY REGISTRY TABLE BUFFER.</td>
                        </tr>
                      ) : (
                        bookings.map(b => {
                          const price = b.packageTier === "ROYAL" ? 9999 : b.packageTier === "SIGNATURE" ? 5499 : 2999;
                          return (
                            <tr key={b.id} className="hover:bg-[#00FFFF]/10 transition-colors">
                              <td className="p-3 font-bold">{b.clientName}</td>
                              <td className="p-3">{b.packageTier}</td>
                              <td className="p-3 text-right text-[#FF00FF] font-extrabold">${price}</td>
                              <td className="p-3 text-right font-bold">{b.status}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Traffic Hits Log Table */}
              <div className="bg-[#000000] border-2 border-[#FF00FF] p-4 text-[#FF00FF]">
                <span className="text-[#00FFFF] text-[10px] tracking-widest font-extrabold block mb-3 font-mono">// RECENT TRAFFIC HITS TIMELINE (MAX 25)</span>
                
                <div className="max-h-56 overflow-y-auto border border-[#FF00FF]/35 p-2 font-mono text-[9px] leading-relaxed text-[#FF00FF] select-all">
                  {analyticsData?.recentHits && analyticsData.recentHits.length > 0 ? (
                    analyticsData.recentHits.slice(0, 25).map((hit: any, index: number) => (
                      <div key={index} className="flex justify-between border-b border-[#FF00FF]/15 py-1">
                        <span>SESSION: {hit.sessionKey}</span>
                        <span className="text-[#00FFFF]">{new Date(hit.timestamp).toLocaleString()}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-[#FF00FF]/50 italic">NO ACTIVE HITS RECORDED IN CURRENT CORE CYCLE.</div>
                  )}
                </div>
              </div>

            </div>
          )}

        </main>

        {/* Right logs panel */}
        <aside className="col-span-12 lg:col-span-3 bg-[#000000] p-4.5 flex flex-col justify-between overflow-hidden text-[9px] tracking-widest shrink-0 border-t-2 lg:border-t-0 border-[#00FFFF]">
          
          <div className="flex flex-col gap-4 overflow-hidden h-full">
            <div className="flex items-center gap-1.5 text-[#FF00FF]/80 font-bold">
              <Radio size={12} className="animate-pulse text-[#FF00FF] shrink-0" />
              <span>&gt; DIAGNOSTIC_OVERRUN_FEED</span>
            </div>
            
            <div className="flex-grow bg-[#000000] p-3 text-[#00FFFF] border-2 border-[#00FFFF] overflow-y-auto whitespace-pre-wrap leading-relaxed select-all font-bold font-mono text-[9px] selection:bg-[#FF00FF] selection:text-black min-h-[120px] lg:min-h-0">
              {logText}
            </div>
          </div>

          <div className="border-t-2 border-[#00FFFF] pt-4 flex flex-col text-[#00FFFF]/70 gap-1.5 mt-4 font-bold">
            <div>SIGNAL: ACCEP_BYPASS</div>
            <div>SECTOR_GRID: AMALFI CORE SECTOR 9</div>
            <div>DIAGNOSTICS STATE: COMPROMISED // MEM_CORRUPT</div>
          </div>

        </aside>

      </div>
    </div>
  );
};
