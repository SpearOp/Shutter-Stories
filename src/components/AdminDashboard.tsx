import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, BookOpen, Image, Layers, FileText, BarChart2,
  LogOut, Plus, Trash2, Edit2, Check, X, ChevronRight, RefreshCw,
  Users, TrendingUp, DollarSign, Camera, Eye, Search, Filter,
  Calendar, Mail, Phone, MapPin, Sparkles, CheckCircle, Clock,
  XCircle, AlertCircle, Menu
} from "lucide-react";
import { Booking, PortfolioItem, BlogPost, MediaCategory, HeroSlide, ServiceItem } from "../types";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface AdminDashboardProps {
  token: string;
  bookings: Booking[];
  portfolio: PortfolioItem[];
  blogs: BlogPost[];
  heroSlides: HeroSlide[];
  servicesList: ServiceItem[];
  onRefreshAll: () => void;
  onLogout: () => void;
}

type Tab = "overview" | "bookings" | "hero" | "services" | "portfolio" | "blogs";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const PACKAGE_PRICE: Record<string, number> = { ROYAL: 9999, SIGNATURE: 5499, ESSENTIAL: 2999 };

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    PENDING:    { label: "Pending",    icon: <Clock size={11} />,       cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    ACCEPTED:   { label: "Accepted",   icon: <CheckCircle size={11} />, cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    TERMINATED: { label: "Cancelled",  icon: <XCircle size={11} />,    cls: "bg-red-500/10 text-red-400 border-red-500/20" },
  };
  const s = map[status] || { label: status, icon: null, cls: "bg-white/5 text-white/40 border-white/10" };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-medium font-sans ${s.cls}`}>
      {s.icon}{s.label}
    </span>
  );
};

const TierBadge: React.FC<{ tier: string }> = ({ tier }) => {
  const map: Record<string, string> = {
    ROYAL: "bg-[#B89058]/15 text-[#C9A66B] border-[#B89058]/30",
    SIGNATURE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ESSENTIAL: "bg-white/5 text-white/50 border-white/10",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-medium font-sans ${map[tier] || map.ESSENTIAL}`}>
      {tier}
    </span>
  );
};

/* Metric card */
const MetricCard: React.FC<{
  label: string; value: string; sub: string;
  icon: React.ReactNode; color: string; trend?: string;
}> = ({ label, value, sub, icon, color, trend }) => (
  <div className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3" style={{ background: "rgba(255,255,255,0.03)" }}>
    <div className="flex items-start justify-between">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
      {trend && <span className="text-[11px] text-emerald-400 font-medium font-sans">{trend}</span>}
    </div>
    <div>
      <div className="text-2xl font-bold text-white font-sans tracking-tight">{value}</div>
      <div className="text-xs text-white/40 font-sans mt-0.5">{label}</div>
      <div className="text-[11px] text-white/25 font-sans mt-1">{sub}</div>
    </div>
  </div>
);

/* Section header */
const SectionHeader: React.FC<{ title: string; sub: string; action?: React.ReactNode }> = ({ title, sub, action }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h2 className="text-lg font-bold text-white font-sans">{title}</h2>
      <p className="text-sm text-white/40 font-sans mt-0.5">{sub}</p>
    </div>
    {action}
  </div>
);

/* Labelled input */
const FormField: React.FC<{
  label: string; required?: boolean;
  children: React.ReactNode;
}> = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-white/50 font-sans tracking-wide uppercase">
      {label}{required && <span className="text-[#B89058] ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full px-3.5 py-2.5 rounded-xl text-sm text-white font-sans placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#B89058]/40 transition-all bg-white/5 border border-white/10";
const selectCls = inputCls + " cursor-pointer";

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  token, bookings, portfolio, blogs, heroSlides, servicesList, onRefreshAll, onLogout
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  /* Hash sync */
  useEffect(() => {
    const hash = window.location.hash.replace("#admin-", "") as Tab;
    const valid: Tab[] = ["overview", "bookings", "hero", "services", "portfolio", "blogs"];
    if (valid.includes(hash)) setActiveTab(hash);
  }, []);

  useEffect(() => {
    window.location.hash = `admin-${activeTab}`;
  }, [activeTab]);

  useEffect(() => {
    fetch("/api/analytics").then(r => r.ok ? r.json() : null).then(d => { if (d) setAnalytics(d); });
  }, [bookings]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const revenue = bookings.reduce((s, b) => b.status === "ACCEPTED" ? s + (PACKAGE_PRICE[b.packageTier] || 0) : s, 0);
  const convRate = analytics?.uniqueVisitors > 0 ? ((bookings.length / analytics.uniqueVisitors) * 100).toFixed(1) : "0.0";

  /* Nav items */
  const navItems: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "overview",  label: "Overview",       icon: <LayoutDashboard size={17} /> },
    { id: "bookings",  label: "Bookings",        icon: <Calendar size={17} />,     count: bookings.length },
    { id: "hero",      label: "Hero Slides",     icon: <Layers size={17} />,       count: heroSlides.length },
    { id: "services",  label: "Services",        icon: <Camera size={17} />,       count: servicesList.length },
    { id: "portfolio", label: "Portfolio",       icon: <Image size={17} />,        count: portfolio.length },
    { id: "blogs",     label: "Blog / Journal",  icon: <FileText size={17} />,     count: blogs.length },
  ];

  /* ── FORMS STATE ── */
  /* Hero */
  const [newHero, setNewHero] = useState({ url: "", title: "", location: "" });
  const [editHeroId, setEditHeroId] = useState<string | null>(null);
  const [editHero, setEditHero] = useState({ url: "", title: "", location: "" });

  /* Services */
  const [newSrv, setNewSrv] = useState({ num: "", title: "", category: MediaCategory.WEDDINGS as string, imageUrl: "" });
  const [editSrvId, setEditSrvId] = useState<string | null>(null);
  const [editSrv, setEditSrv] = useState({ num: "", title: "", category: "", imageUrl: "" });

  /* Portfolio */
  const [showPortForm, setShowPortForm] = useState(false);
  const [newPort, setNewPort] = useState({ title: "", category: MediaCategory.WEDDINGS as string, location: "", director: "Shutter Stories", resolution: "8K", imageUrl: "", corruptionLevel: 0, isFeatured: true });
  const [editPortId, setEditPortId] = useState<string | null>(null);
  const [editPort, setEditPort] = useState({ ...newPort });

  /* Blogs */
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", category: "CREATIVE NOTES", teaser: "", content: "", authorHex: "Admin", tagsString: "WEDDING, EDITORIAL" });
  const [editBlogId, setEditBlogId] = useState<string | null>(null);
  const [editBlog, setEditBlog] = useState({ ...newBlog });
  const [geminiPrompt, setGeminiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  /* ── API HELPERS ── */
  const api = async (method: string, url: string, body?: object) => {
    setIsLoading(true);
    try {
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      return data;
    } catch (e: any) {
      showToast(e.message || "Operation failed", "error");
      throw e;
    } finally {
      setIsLoading(false);
      onRefreshAll();
    }
  };

  /* Bookings */
  const acceptBooking  = (id: string) => api("PATCH", `/api/bookings/${id}`, { status: "ACCEPTED"   }).then(() => showToast("Booking accepted"));
  const rejectBooking  = (id: string) => api("PATCH", `/api/bookings/${id}`, { status: "TERMINATED" }).then(() => showToast("Booking declined"));
  const deleteBooking  = (id: string) => api("DELETE", `/api/bookings/${id}`).then(() => showToast("Booking removed"));

  /* Hero */
  const addHero    = async (e: React.FormEvent) => { e.preventDefault(); await api("POST", "/api/hero", newHero); setNewHero({ url: "", title: "", location: "" }); showToast("Slide added"); };
  const saveHero   = async (e: React.FormEvent) => { e.preventDefault(); await api("PATCH", `/api/hero/${editHeroId}`, editHero); setEditHeroId(null); showToast("Slide updated"); };
  const deleteHero = (id: string) => api("DELETE", `/api/hero/${id}`).then(() => showToast("Slide removed"));

  /* Services */
  const addSrv    = async (e: React.FormEvent) => { e.preventDefault(); await api("POST", "/api/services", newSrv); setNewSrv({ num: "", title: "", category: MediaCategory.WEDDINGS, imageUrl: "" }); showToast("Service added"); };
  const saveSrv   = async (e: React.FormEvent) => { e.preventDefault(); await api("PATCH", `/api/services/${editSrvId}`, editSrv); setEditSrvId(null); showToast("Service updated"); };
  const deleteSrv = (id: string) => api("DELETE", `/api/services/${id}`).then(() => showToast("Service removed"));

  /* Portfolio */
  const addPort    = async (e: React.FormEvent) => { e.preventDefault(); await api("POST", "/api/portfolio", newPort); setShowPortForm(false); setNewPort({ title: "", category: MediaCategory.WEDDINGS, location: "", director: "Shutter Stories", resolution: "8K", imageUrl: "", corruptionLevel: 0, isFeatured: true }); showToast("Portfolio item added"); };
  const savePort   = async (e: React.FormEvent) => { e.preventDefault(); await api("PATCH", `/api/portfolio/${editPortId}`, editPort); setEditPortId(null); showToast("Portfolio item updated"); };
  const deletePort = (id: string) => api("DELETE", `/api/portfolio/${id}`).then(() => showToast("Portfolio item removed"));

  /* Blogs */
  const addBlog    = async (e: React.FormEvent) => { e.preventDefault(); const tags = newBlog.tagsString.split(",").map(x => x.trim().toUpperCase()); await api("POST", "/api/blogs", { ...newBlog, tags }); setShowBlogForm(false); setNewBlog({ title: "", category: "CREATIVE NOTES", teaser: "", content: "", authorHex: "Admin", tagsString: "WEDDING, EDITORIAL" }); showToast("Blog post published"); };
  const saveBlog   = async (e: React.FormEvent) => { e.preventDefault(); const tags = editBlog.tagsString.split(",").map(x => x.trim().toUpperCase()); await api("PATCH", `/api/blogs/${editBlogId}`, { ...editBlog, tags }); setEditBlogId(null); showToast("Blog post updated"); };
  const deleteBlog = (id: string) => api("DELETE", `/api/blogs/${id}`).then(() => showToast("Blog post removed"));

  const generateAiDraft = async () => {
    if (!geminiPrompt) return;
    setIsAiLoading(true);
    try {
      const r = await fetch("/api/gemini/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: geminiPrompt, type: "blog" }) });
      const d = await r.json();
      if (d.result) {
        if (editBlogId) setEditBlog(prev => ({ ...prev, content: d.result }));
        else setNewBlog(prev => ({ ...prev, content: d.result }));
        showToast("AI draft generated");
      }
    } catch { showToast("AI generation failed", "error"); }
    finally { setIsAiLoading(false); }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
    sessionStorage.removeItem("adminToken");
    window.location.hash = "";
    onLogout();
  };

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <div className="fixed inset-0 z-[9000] flex font-sans" style={{ background: "#0D0D0D" }}>

      {/* ── TOAST ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[9999] flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl text-sm font-medium transition-all ${toast.type === "success" ? "bg-emerald-950 border-emerald-700/50 text-emerald-300" : "bg-red-950 border-red-700/50 text-red-300"}`}>
          {toast.type === "success" ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`shrink-0 flex flex-col border-r border-white/8 transition-all duration-300 ${sidebarOpen ? "w-60" : "w-16"}`} style={{ background: "rgba(255,255,255,0.02)" }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8">
          <div className="w-9 h-9 rounded-xl bg-[#B89058]/15 border border-[#B89058]/30 flex items-center justify-center shrink-0">
            <Camera size={17} className="text-[#B89058]" />
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-sm font-semibold text-white leading-tight">Shutter Stories</div>
              <div className="text-[10px] text-white/30 tracking-wider uppercase">Admin</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${active ? "bg-[#B89058]/15 text-[#C9A66B] border border-[#B89058]/20" : "text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent"}`}
              >
                <span className="shrink-0">{item.icon}</span>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 font-medium text-[13px]">{item.label}</span>
                    {item.count !== undefined && (
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${active ? "bg-[#B89058]/20 text-[#C9A66B]" : "bg-white/8 text-white/30"}`}>{item.count}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/8">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/8 transition-all">
            <LogOut size={17} className="shrink-0" />
            {sidebarOpen && <span className="font-medium text-[13px]">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/40 hover:text-white/70 transition-colors">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-base font-semibold text-white capitalize">{activeTab === "overview" ? "Dashboard Overview" : navItems.find(n => n.id === activeTab)?.label}</h1>
              <p className="text-xs text-white/30">Shutter Stories Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onRefreshAll} className={`flex items-center gap-2 text-xs text-white/40 hover:text-white/70 px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all ${isLoading ? "opacity-60 pointer-events-none" : ""}`}>
              <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>
            <div className="w-8 h-8 rounded-xl bg-[#B89058]/15 border border-[#B89058]/25 flex items-center justify-center">
              <span className="text-[11px] font-bold text-[#C9A66B]">A</span>
            </div>
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto px-6 py-7">

          {/* ══ OVERVIEW ══ */}
          {activeTab === "overview" && (
            <div className="space-y-8 max-w-6xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard label="Total Enquiries" value={String(bookings.length)} sub={`${bookings.filter(b => b.status === "ACCEPTED").length} confirmed`} icon={<Calendar size={18} className="text-[#C9A66B]" />} color="bg-[#B89058]/10" trend="+Active" />
                <MetricCard label="Page Views" value={String(analytics?.pageViews || 0)} sub={`${analytics?.uniqueVisitors || 0} unique visitors`} icon={<Eye size={18} className="text-blue-400" />} color="bg-blue-500/10" />
                <MetricCard label="Conversion Rate" value={`${convRate}%`} sub="Visitors to enquiries" icon={<TrendingUp size={18} className="text-emerald-400" />} color="bg-emerald-500/10" />
                <MetricCard label="Confirmed Revenue" value={`₹${revenue.toLocaleString()}`} sub="From accepted bookings" icon={<DollarSign size={18} className="text-purple-400" />} color="bg-purple-500/10" />
              </div>

              {/* Recent bookings */}
              <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                  <h3 className="text-sm font-semibold text-white">Recent Enquiries</h3>
                  <button onClick={() => setActiveTab("bookings")} className="flex items-center gap-1 text-xs text-[#C9A66B] hover:text-[#B89058]">View all <ChevronRight size={13} /></button>
                </div>
                <div className="divide-y divide-white/6">
                  {bookings.slice(0, 5).map(b => (
                    <div key={b.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/2 transition-colors">
                      <div>
                        <div className="text-sm font-medium text-white">{b.clientName}</div>
                        <div className="text-xs text-white/35 mt-0.5">{b.eventType.replace(/_/g," ")} · {b.eventDate}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TierBadge tier={b.packageTier} />
                        <StatusBadge status={b.status} />
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && <div className="px-5 py-8 text-center text-sm text-white/25">No enquiries yet</div>}
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Hero Slides",    val: heroSlides.length,   icon: <Layers size={16}/>,   action: () => setActiveTab("hero") },
                  { label: "Services",       val: servicesList.length, icon: <Camera size={16}/>,   action: () => setActiveTab("services") },
                  { label: "Portfolio Items",val: portfolio.length,    icon: <Image size={16}/>,    action: () => setActiveTab("portfolio") },
                  { label: "Blog Posts",     val: blogs.length,        icon: <FileText size={16}/>, action: () => setActiveTab("blogs") },
                ].map(s => (
                  <button key={s.label} onClick={s.action} className="rounded-2xl border border-white/8 p-4 text-left hover:border-[#B89058]/30 hover:bg-[#B89058]/5 transition-all group" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/40 group-hover:text-[#C9A66B] transition-colors">{s.icon}</span>
                      <ChevronRight size={14} className="text-white/20 group-hover:text-[#C9A66B] transition-colors" />
                    </div>
                    <div className="text-2xl font-bold text-white">{s.val}</div>
                    <div className="text-xs text-white/35 mt-1">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══ BOOKINGS ══ */}
          {activeTab === "bookings" && (
            <div className="max-w-5xl space-y-5">
              <SectionHeader title="Enquiries & Bookings" sub={`${bookings.length} total · ${bookings.filter(b=>b.status==="ACCEPTED").length} confirmed`} />
              {bookings.length === 0 && (
                <div className="rounded-2xl border border-white/8 py-16 text-center text-white/25 text-sm">No bookings yet</div>
              )}
              {bookings.map(b => (
                <div key={b.id} className="rounded-2xl border border-white/8 p-5 hover:border-white/15 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-white/8 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">{b.clientName}</h3>
                        <TierBadge tier={b.packageTier} />
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="text-xs text-white/35">{b.eventType.replace(/_/g," ")} · {new Date(b.timestamp).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</div>
                    </div>
                    <div className="flex gap-2">
                      {b.status === "PENDING" && <>
                        <button onClick={() => acceptBooking(b.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/20 transition-all"><Check size={12}/> Accept</button>
                        <button onClick={() => rejectBooking(b.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-all"><X size={12}/> Decline</button>
                      </>}
                      <button onClick={() => deleteBooking(b.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 text-xs hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/8 transition-all"><Trash2 size={12}/> Delete</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { icon: <Mail size={12}/>, label: "Email", val: b.sectorEmail },
                      { icon: <Phone size={12}/>, label: "Phone", val: b.commLink },
                      { icon: <Calendar size={12}/>, label: "Event Date", val: b.eventDate },
                      { icon: <MapPin size={12}/>, label: "Venue", val: b.coordinateVenue },
                    ].map(f => (
                      <div key={f.label} className="flex items-start gap-2">
                        <span className="text-white/25 mt-0.5 shrink-0">{f.icon}</span>
                        <div>
                          <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">{f.label}</div>
                          <div className="text-xs text-white/70 break-all">{f.val || "—"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {b.message && (
                    <div className="mt-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8 text-xs text-white/50 italic">
                      "{b.message}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ══ HERO SLIDES ══ */}
          {activeTab === "hero" && (
            <div className="max-w-4xl space-y-6">
              <SectionHeader title="Hero Slideshow" sub="Manage the images shown on the main hero section" />
              {/* Add / Edit form */}
              <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <h3 className="text-sm font-semibold text-white mb-4">{editHeroId ? "Edit Slide" : "Add New Slide"}</h3>
                <form onSubmit={editHeroId ? saveHero : addHero} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Title" required>
                    <input value={editHeroId ? editHero.title : newHero.title} onChange={e => editHeroId ? setEditHero({...editHero, title: e.target.value}) : setNewHero({...newHero, title: e.target.value})} required placeholder="e.g. Sunset Covenant" className={inputCls} />
                  </FormField>
                  <FormField label="Image URL" required>
                    <input value={editHeroId ? editHero.url : newHero.url} onChange={e => editHeroId ? setEditHero({...editHero, url: e.target.value}) : setNewHero({...newHero, url: e.target.value})} required placeholder="https:// or /src/assets/..." className={inputCls} />
                  </FormField>
                  <FormField label="Location">
                    <input value={editHeroId ? editHero.location : newHero.location} onChange={e => editHeroId ? setEditHero({...editHero, location: e.target.value}) : setNewHero({...newHero, location: e.target.value})} placeholder="e.g. Lake Como, Italy" className={inputCls} />
                  </FormField>
                  <div className="sm:col-span-3 flex gap-3 pt-1">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-black transition-all hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg,#C9A66B,#B89058)" }}>
                      {editHeroId ? <><Check size={14}/> Save Changes</> : <><Plus size={14}/> Add Slide</>}
                    </button>
                    {editHeroId && <button type="button" onClick={() => setEditHeroId(null)} className="px-4 py-2.5 rounded-xl text-sm border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all">Cancel</button>}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="space-y-3">
                {heroSlides.map(s => (
                  <div key={s.id} className="flex items-center gap-4 rounded-2xl border border-white/8 p-4 hover:border-white/15 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/8">
                      <img src={s.url} alt={s.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&h=100&fit=crop"; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{s.title}</div>
                      <div className="text-xs text-white/35 mt-0.5 truncate">{s.location}</div>
                      <div className="text-[11px] text-white/20 mt-1 truncate font-mono">{s.url}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setEditHeroId(s.id); setEditHero({ url: s.url, title: s.title, location: s.location }); }} className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-[#C9A66B] hover:border-[#B89058]/30 transition-all"><Edit2 size={14}/></button>
                      <button onClick={() => deleteHero(s.id)} className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/20 transition-all"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SERVICES ══ */}
          {activeTab === "services" && (
            <div className="max-w-4xl space-y-6">
              <SectionHeader title="Services Frames" sub="The 6 service cards displayed on the homepage" />
              {/* Add / Edit form */}
              <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <h3 className="text-sm font-semibold text-white mb-4">{editSrvId ? "Edit Service" : "Add New Service"}</h3>
                <form onSubmit={editSrvId ? saveSrv : addSrv} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Number" required>
                    <input value={editSrvId ? editSrv.num : newSrv.num} onChange={e => editSrvId ? setEditSrv({...editSrv, num: e.target.value}) : setNewSrv({...newSrv, num: e.target.value})} required placeholder="01" className={inputCls} />
                  </FormField>
                  <FormField label="Title" required>
                    <input value={editSrvId ? editSrv.title : newSrv.title} onChange={e => editSrvId ? setEditSrv({...editSrv, title: e.target.value}) : setNewSrv({...newSrv, title: e.target.value})} required placeholder="e.g. DESTINATION WEDDINGS" className={inputCls} />
                  </FormField>
                  <FormField label="Category" required>
                    <select value={editSrvId ? editSrv.category : newSrv.category} onChange={e => editSrvId ? setEditSrv({...editSrv, category: e.target.value}) : setNewSrv({...newSrv, category: e.target.value})} className={selectCls}>
                      {Object.entries(MediaCategory).map(([k,v]) => <option key={k} value={v}>{k.replace(/_/g," ")}</option>)}
                      <option value="ALBUMS">LUXURY ALBUMS</option>
                    </select>
                  </FormField>
                  <FormField label="Image URL" required>
                    <input value={editSrvId ? editSrv.imageUrl : newSrv.imageUrl} onChange={e => editSrvId ? setEditSrv({...editSrv, imageUrl: e.target.value}) : setNewSrv({...newSrv, imageUrl: e.target.value})} required placeholder="https://images.unsplash.com/..." className={inputCls} />
                  </FormField>
                  <div className="sm:col-span-2 flex gap-3 pt-1">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-black transition-all hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg,#C9A66B,#B89058)" }}>
                      {editSrvId ? <><Check size={14}/> Save Changes</> : <><Plus size={14}/> Add Service</>}
                    </button>
                    {editSrvId && <button type="button" onClick={() => setEditSrvId(null)} className="px-4 py-2.5 rounded-xl text-sm border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all">Cancel</button>}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="space-y-3">
                {servicesList.map(s => (
                  <div key={s.id} className="flex items-center gap-4 rounded-2xl border border-white/8 p-4 hover:border-white/15 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/8">
                      <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{s.num} · {s.title}</div>
                      <div className="text-xs text-white/35 mt-0.5">{s.category}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setEditSrvId(s.id); setEditSrv({ num: s.num, title: s.title, category: s.category, imageUrl: s.imageUrl }); }} className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-[#C9A66B] hover:border-[#B89058]/30 transition-all"><Edit2 size={14}/></button>
                      <button onClick={() => deleteSrv(s.id)} className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/20 transition-all"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ PORTFOLIO ══ */}
          {activeTab === "portfolio" && (
            <div className="max-w-5xl space-y-6">
              <SectionHeader
                title="Portfolio Gallery"
                sub={`${portfolio.length} items · ${portfolio.filter(p=>p.isFeatured).length} featured`}
                action={
                  !showPortForm && !editPortId &&
                  <button onClick={() => setShowPortForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-black transition-all hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg,#C9A66B,#B89058)" }}>
                    <Plus size={14}/> Add Item
                  </button>
                }
              />

              {(showPortForm || editPortId) && (
                <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <h3 className="text-sm font-semibold text-white mb-5">{editPortId ? "Edit Portfolio Item" : "New Portfolio Item"}</h3>
                  <form onSubmit={editPortId ? savePort : addPort} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Title", key: "title", req: true, ph: "e.g. Lake Como Ceremony" },
                      { label: "Image URL", key: "imageUrl", req: true, ph: "https://..." },
                      { label: "Location", key: "location", req: false, ph: "e.g. Lake Como, Italy" },
                      { label: "Director", key: "director", req: false, ph: "Photographer name" },
                      { label: "Resolution", key: "resolution", req: false, ph: "e.g. 4K, 8K" },
                    ].map(f => (
                      <FormField key={f.key} label={f.label} required={f.req}>
                        <input
                          value={editPortId ? (editPort as any)[f.key] : (newPort as any)[f.key]}
                          onChange={e => editPortId ? setEditPort({...editPort, [f.key]: e.target.value}) : setNewPort({...newPort, [f.key]: e.target.value})}
                          required={f.req} placeholder={f.ph} className={inputCls}
                        />
                      </FormField>
                    ))}
                    <FormField label="Category" required>
                      <select value={editPortId ? editPort.category : newPort.category} onChange={e => editPortId ? setEditPort({...editPort, category: e.target.value}) : setNewPort({...newPort, category: e.target.value})} className={selectCls}>
                        {Object.entries(MediaCategory).map(([k,v]) => <option key={k} value={v}>{k.replace(/_/g," ")}</option>)}
                      </select>
                    </FormField>
                    <div className="sm:col-span-2 flex gap-3 pt-1">
                      <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-black transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#C9A66B,#B89058)" }}>
                        {editPortId ? <><Check size={14}/> Save Changes</> : <><Plus size={14}/> Add Item</>}
                      </button>
                      <button type="button" onClick={() => { setShowPortForm(false); setEditPortId(null); }} className="px-4 py-2.5 rounded-xl text-sm border border-white/10 text-white/50 hover:text-white/80 transition-all">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolio.map(p => (
                  <div key={p.id} className="rounded-2xl border border-white/8 overflow-hidden hover:border-white/20 transition-all group" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="aspect-video overflow-hidden bg-white/5 relative">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      {p.isFeatured && <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium text-black" style={{ background: "linear-gradient(135deg,#C9A66B,#B89058)" }}>Featured</div>}
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-medium text-white mb-1 truncate">{p.title}</div>
                      <div className="text-xs text-white/35 mb-3">{p.category.replace(/_/g," ")} · {p.location}</div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditPortId(p.id); setEditPort({ title: p.title, category: p.category, location: p.location, director: p.director, resolution: p.resolution, imageUrl: p.imageUrl, corruptionLevel: p.corruptionLevel, isFeatured: !!p.isFeatured }); setShowPortForm(false); window.scrollTo({top:0,behavior:"smooth"}); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/10 text-white/40 hover:text-[#C9A66B] hover:border-[#B89058]/30 text-xs transition-all"><Edit2 size={12}/> Edit</button>
                        <button onClick={() => deletePort(p.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/20 text-xs transition-all"><Trash2 size={12}/> Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ BLOGS ══ */}
          {activeTab === "blogs" && (
            <div className="max-w-4xl space-y-6">
              <SectionHeader
                title="Blog & Journal"
                sub={`${blogs.length} posts published`}
                action={
                  !showBlogForm && !editBlogId &&
                  <button onClick={() => setShowBlogForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-black transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#C9A66B,#B89058)" }}>
                    <Plus size={14}/> New Post
                  </button>
                }
              />

              {(showBlogForm || editBlogId) && (
                <div className="rounded-2xl border border-white/8 p-6 space-y-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <h3 className="text-sm font-semibold text-white">{editBlogId ? "Edit Post" : "New Blog Post"}</h3>

                  {/* AI Assist */}
                  <div className="rounded-xl border border-[#B89058]/20 p-4 bg-[#B89058]/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-[#C9A66B]" />
                      <span className="text-xs font-medium text-[#C9A66B]">AI Content Assistant</span>
                    </div>
                    <div className="flex gap-3">
                      <input value={geminiPrompt} onChange={e => setGeminiPrompt(e.target.value)} placeholder="Describe the blog topic..." className={inputCls + " flex-1"} />
                      <button onClick={generateAiDraft} disabled={isAiLoading} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-black transition-all hover:opacity-90 disabled:opacity-50 shrink-0" style={{ background: "linear-gradient(135deg,#C9A66B,#B89058)" }}>
                        {isAiLoading ? "Generating..." : "Generate"}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={editBlogId ? saveBlog : addBlog} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Title", key: "title", req: true, ph: "Blog post title", col: 2 },
                      { label: "Category", key: "category", req: false, ph: "e.g. CREATIVE NOTES", col: 1 },
                      { label: "Author", key: "authorHex", req: false, ph: "Author name", col: 1 },
                      { label: "Teaser (short summary)", key: "teaser", req: false, ph: "One-line preview...", col: 2 },
                      { label: "Tags (comma separated)", key: "tagsString", req: false, ph: "WEDDING, EDITORIAL", col: 2 },
                    ].map(f => (
                      <div key={f.key} className={f.col === 2 ? "sm:col-span-2" : ""}>
                        <FormField label={f.label} required={f.req}>
                          <input
                            value={editBlogId ? (editBlog as any)[f.key] : (newBlog as any)[f.key]}
                            onChange={e => editBlogId ? setEditBlog({...editBlog, [f.key]: e.target.value}) : setNewBlog({...newBlog, [f.key]: e.target.value})}
                            required={f.req} placeholder={f.ph} className={inputCls}
                          />
                        </FormField>
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <FormField label="Content" required>
                        <textarea
                          value={editBlogId ? editBlog.content : newBlog.content}
                          onChange={e => editBlogId ? setEditBlog({...editBlog, content: e.target.value}) : setNewBlog({...newBlog, content: e.target.value})}
                          required rows={8} placeholder="Write your blog content here..."
                          className={inputCls + " resize-y min-h-[160px]"}
                        />
                      </FormField>
                    </div>
                    <div className="sm:col-span-2 flex gap-3 pt-1">
                      <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-black transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg,#C9A66B,#B89058)" }}>
                        {editBlogId ? <><Check size={14}/> Save Post</> : <><Plus size={14}/> Publish Post</>}
                      </button>
                      <button type="button" onClick={() => { setShowBlogForm(false); setEditBlogId(null); }} className="px-4 py-2.5 rounded-xl text-sm border border-white/10 text-white/50 hover:text-white/80 transition-all">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-3">
                {blogs.map(b => (
                  <div key={b.id} className="rounded-2xl border border-white/8 p-5 hover:border-white/15 transition-all" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white mb-1 truncate">{b.title}</div>
                        <div className="text-xs text-white/35 mb-2">{b.category} · {b.authorHex} · {(b.byteSize/1000).toFixed(1)}kb</div>
                        <div className="text-xs text-white/45 line-clamp-2">{b.teaser}</div>
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {b.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/35">{t}</span>)}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => { setEditBlogId(b.id); setEditBlog({ title: b.title, category: b.category, teaser: b.teaser, content: b.content, authorHex: b.authorHex, tagsString: b.tags.join(", ") }); setShowBlogForm(false); window.scrollTo({top:0,behavior:"smooth"}); }} className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-[#C9A66B] hover:border-[#B89058]/30 transition-all"><Edit2 size={14}/></button>
                        <button onClick={() => deleteBlog(b.id)} className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/20 transition-all"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  </div>
                ))}
                {blogs.length === 0 && <div className="rounded-2xl border border-white/8 py-16 text-center text-sm text-white/25">No blog posts yet</div>}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
