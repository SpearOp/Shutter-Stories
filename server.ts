/**
 * SHUTTER STORIES // BACKEND ARCHIVE CONTROLLER
 * SYSTEM VERSION v9.7 // PORT: 3000
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { MediaCategory, Booking, BlogPost, PortfolioItem, HeroSlide, ServiceItem } from "./src/types.js";

// Load environment variables
const dotenvPath = path.join(process.cwd(), ".env");
if (fs.existsSync(dotenvPath)) {
  const dotenvContent = fs.readFileSync(dotenvPath, "utf-8");
  dotenvContent.split("\n").forEach(line => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length > 0) {
      const val = rest.join("=").replace(/^["']|["']$/g, "").trim();
      if (!process.env[key.trim()]) process.env[key.trim()] = val;
    }
  });
}

const app = express();
const PORT = 3000;

// Initialize JSON files as our secure regional data storage ledger
const DATA_DIR = path.join(process.cwd(), "db_archive");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");
const HERO_FILE = path.join(DATA_DIR, "hero.json");
const SERVICES_FILE = path.join(DATA_DIR, "services.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Preset Default Hero Slides
const defaultHeroSlides: HeroSlide[] = [
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

// Preset Default Services List
const defaultServices: ServiceItem[] = [
  {
    id: "srv-1",
    num: "01",
    title: "WEDDING STORIES",
    category: MediaCategory.WEDDINGS,
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "srv-2",
    num: "02",
    title: "PRE-WEDDING SHOOTS",
    category: MediaCategory.ENGAGEMENTS,
    imageUrl: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "srv-3",
    num: "03",
    title: "CINEMATIC FILMS",
    category: MediaCategory.FILMS,
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "srv-4",
    num: "04",
    title: "DESTINATION WEDDINGS",
    category: MediaCategory.DESTINATIONS,
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "srv-5",
    num: "05",
    title: "CORPORATE EVENTS",
    category: MediaCategory.EVENTS,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "srv-6",
    num: "06",
    title: "LUXURY ALBUMS",
    category: "ALBUMS",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"
  }
];

// Preset Default Analytics
interface AnalyticsData {
  pageViews: number;
  uniqueSessions: string[];
  recentHits: Array<{ sessionKey: string; timestamp: string }>;
}
const defaultAnalytics: AnalyticsData = {
  pageViews: 48,
  uniqueSessions: [],
  recentHits: []
};

// Preset Portfolio Indexes
const defaultPortfolio: PortfolioItem[] = [
  {
    id: "port-1",
    title: "THE NEON WEDDING COUPLING SYSTEM",
    category: MediaCategory.WEDDINGS,
    location: "NEO-TOKYO CORE SECTOR 7",
    date: "2026-02-14",
    director: "CYBER-OPTIC v3",
    resolution: "8K CHROMATIC",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    corruptionLevel: 14,
    isFeatured: true
  },
  {
    id: "port-2",
    title: "CARBON UNION DOME GIG-PIXEL",
    category: MediaCategory.WEDDINGS,
    location: "REYKJAVIK GEOTHERMAL SECTOR",
    date: "2026-04-18",
    director: "KINETIC FOCUS FLIGHT",
    resolution: "4K SPECTRAL",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    corruptionLevel: 8,
    isFeatured: true
  },
  {
    id: "port-3",
    title: "SYNTHETIC FOREST MEMORY BIND",
    category: MediaCategory.ENGAGEMENTS,
    location: "PACIFIC CHRONO-CANOPY ZONE",
    date: "2026-05-12",
    director: "BIOMETRIC SHUTTER",
    resolution: "12K ULTRA-RAW",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200",
    corruptionLevel: 31,
    isFeatured: false
  },
  {
    id: "port-4",
    title: "OFFWORLD LUXURY ORBIT SUITE",
    category: MediaCategory.DESTINATIONS,
    location: "SANTORINI CLOUD HORIZON SECTOR",
    date: "2026-06-01",
    director: "CYBER-OPTIC v3",
    resolution: "8K MULTI-SPECTRA",
    imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1200",
    corruptionLevel: 5,
    isFeatured: true
  },
  {
    id: "port-5",
    title: "MAG-LEV VELOCITY FASHION STREAM",
    category: MediaCategory.FASHION,
    location: "SINGAPORE FLUID-GRIDS",
    date: "2026-06-15",
    director: "QUANTUM CHRONO-LENS",
    resolution: "4K SPECTRAL",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
    corruptionLevel: 42,
    isFeatured: false
  },
  {
    id: "port-6",
    title: "CONGLOMERATE QUANTUM SYMPOSIUM",
    category: MediaCategory.EVENTS,
    location: "CYBERDYNE APEX TOWER 11",
    date: "2026-01-20",
    director: "THERMAL MATRIX FEED",
    resolution: "4K CHRONO",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200",
    corruptionLevel: 19,
    isFeatured: false
  }
];

const defaultBlogs: BlogPost[] = [
  {
    id: "blog-1",
    securityHash: "0x8F21CD",
    title: "SPECTRAL MEMORY CAPTURE: CHRONICLING RAW LIGHT ENGINES",
    category: "PHOTOGRAPHY THEORY",
    teaser: "A diagnostic lookup of how we freeze the high-end light spectrum in an increasingly decaying digital grid.",
    content: "The visual sensor array of standard carbon-lifeforms is inherently degraded by time. Our cyber-optic instruments freeze photons in physical diamond-carbide matrices. This blog-log inspects the calibration protocols for offworld wedding capture, securing high-contrast shadows, keeping luminance signals clean from extreme electromagnetic cloud tearing, and preserving the emotional data blocks.",
    authorHex: "ADMIN_A_E5",
    byteSize: 10421,
    timestamp: "2026-06-16T10:00:00Z",
    tags: ["LIGHT_CAPTURE", "SECTOR_CHRONOLOGY", "SPECTRA"]
  },
  {
    id: "blog-2",
    securityHash: "0x3A44F1",
    title: "CYBERNETIC WEDDING DECORUM: ARCHIVING HIGH-END CARBON AGREEMENTS",
    category: "Luxury Operations",
    teaser: "Securing luxury memory-ledger integration contracts under hostile holographic and static fields.",
    content: "When two high-net-worth carbon units merge in the offworld destination sectors, the visual documentation budget must scale dynamically. This log covers technical preparation. From operating multi-spectral drones inside geothermic dust clouds to bypassing security filters of major orbital conglomerates. We map the ultimate visual record.",
    authorHex: "CORRECTOR_O_88",
    byteSize: 8431,
    timestamp: "2026-06-17T12:00:00Z",
    tags: ["UNION_LOGS", "DESTINATION", "ELITE_CLASS"]
  }
];

const defaultBookings: Booking[] = [
  {
    id: "book-1",
    clientName: "Val-Yor & Sol-A",
    sectorEmail: "val_sol@apex.conglom",
    commLink: "+1-999-CYBER-99",
    eventDate: "2026-07-25",
    eventType: MediaCategory.WEDDINGS,
    coordinateVenue: "CLOUDS OF SANTORINI ORATOR LAYERS",
    packageTier: "ROYAL",
    ledgerHash: "0x7FBA113CE92",
    message: "WE DEMAND SPECTRAL TIME SENSORS AND THE FULL CHRONO ARRAY.",
    status: "ACCEPTED",
    timestamp: "2026-06-18T01:00:00Z"
  },
  {
    id: "book-2",
    clientName: "Nakamoto Corp Representative",
    sectorEmail: "satoshi@naka.digital",
    commLink: "+81-300-3001",
    eventDate: "2026-09-12",
    eventType: MediaCategory.EVENTS,
    coordinateVenue: "KYOTO BLACKOUT CORE DOME D",
    packageTier: "SIGNATURE",
    ledgerHash: "0x89CDE3204FA",
    message: "Sub-optimal ambient lightning predicted. Calibrate visual sensors for heavy neon scattering.",
    status: "PENDING",
    timestamp: "2026-06-18T05:22:00Z"
  }
];

// Read/Write helper macros
const loadledger = <T>(filePath: string, defaultData: T): T => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Ledger read warning: ${filePath}. Default fallback.`, err);
    return defaultData;
  }
};

const writeledger = <T>(filePath: string, data: T): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Ledger write error on ${filePath}:`, err);
  }
};

// Initialize LEDGER data
let bookingsCache = loadledger<Booking[]>(BOOKINGS_FILE, defaultBookings);
let portfolioCache = loadledger<PortfolioItem[]>(PORTFOLIO_FILE, defaultPortfolio);
let blogsCache = loadledger<BlogPost[]>(BLOGS_FILE, defaultBlogs);
let heroCache = loadledger<HeroSlide[]>(HERO_FILE, defaultHeroSlides);
let servicesCache = loadledger<ServiceItem[]>(SERVICES_FILE, defaultServices);
let analyticsCache = loadledger<AnalyticsData>(ANALYTICS_FILE, defaultAnalytics);

// Middleware
app.use(express.json());

// Active admin sessions (in-memory, resets on server restart)
const activeSessions = new Set<string>();

// ── AUTH endpoints ──────────────────────────────────────────────
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || "shutterAdmin@2025";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = "tok-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    activeSessions.add(token);
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, error: "Invalid credentials" });
});

app.post("/api/auth/verify", (req, res) => {
  const { token } = req.body;
  if (token && activeSessions.has(token)) {
    return res.json({ valid: true });
  }
  return res.status(401).json({ valid: false });
});

app.post("/api/auth/logout", (req, res) => {
  const { token } = req.body;
  if (token) activeSessions.delete(token);
  return res.json({ success: true });
});

// API Endpoints - Analytics hit
app.post("/api/analytics/hit", (req, res) => {
  const { sessionKey } = req.body;
  if (!sessionKey) return res.status(400).json({ error: "Session key required" });

  analyticsCache.pageViews += 1;
  if (!analyticsCache.uniqueSessions.includes(sessionKey)) {
    analyticsCache.uniqueSessions.push(sessionKey);
  }
  analyticsCache.recentHits.unshift({
    sessionKey,
    timestamp: new Date().toISOString()
  });
  
  if (analyticsCache.recentHits.length > 50) {
    analyticsCache.recentHits.pop();
  }

  writeledger(ANALYTICS_FILE, analyticsCache);
  res.json({ success: true, pageViews: analyticsCache.pageViews, uniqueCount: analyticsCache.uniqueSessions.length });
});

app.get("/api/analytics", (req, res) => {
  const acceptedBookings = bookingsCache.filter(b => b.status === "ACCEPTED");
  let revenue = 0;
  acceptedBookings.forEach(b => {
    if (b.packageTier === "ROYAL") revenue += 9999;
    else if (b.packageTier === "SIGNATURE") revenue += 5499;
    else revenue += 2999;
  });

  res.json({
    pageViews: analyticsCache.pageViews,
    uniqueVisitors: analyticsCache.uniqueSessions.length,
    bookingsCount: bookingsCache.length,
    acceptedBookings: acceptedBookings.length,
    totalRevenue: revenue,
    recentHits: analyticsCache.recentHits
  });
});

// CRUD API - Hero Slides
app.get("/api/hero", (req, res) => {
  res.json(heroCache);
});

app.post("/api/hero", (req, res) => {
  const { url, title, location } = req.body;
  if (!url || !title) return res.status(400).json({ error: "URL and title required" });

  const newSlide: HeroSlide = {
    id: `hero-${Date.now()}`,
    url,
    title,
    location: location || "DEFAULT GRID"
  };

  heroCache.push(newSlide);
  writeledger(HERO_FILE, heroCache);
  res.status(201).json(newSlide);
});

app.patch("/api/hero/:id", (req, res) => {
  const { id } = req.params;
  const { url, title, location } = req.body;
  
  const slide = heroCache.find(x => x.id === id);
  if (!slide) return res.status(404).json({ error: "Slide not found" });

  if (url !== undefined) slide.url = url;
  if (title !== undefined) slide.title = title;
  if (location !== undefined) slide.location = location;

  writeledger(HERO_FILE, heroCache);
  res.json(slide);
});

app.delete("/api/hero/:id", (req, res) => {
  const { id } = req.params;
  heroCache = heroCache.filter(x => x.id !== id);
  writeledger(HERO_FILE, heroCache);
  res.json({ success: true, target: id });
});

// CRUD API - Services List
app.get("/api/services", (req, res) => {
  res.json(servicesCache);
});

app.post("/api/services", (req, res) => {
  const { title, category, imageUrl, num } = req.body;
  if (!title || !category || !imageUrl) return res.status(400).json({ error: "Title, category and imageUrl required" });

  const newItem: ServiceItem = {
    id: `srv-${Date.now()}`,
    num: num || `0${servicesCache.length + 1}`,
    title,
    category,
    imageUrl
  };

  servicesCache.push(newItem);
  writeledger(SERVICES_FILE, servicesCache);
  res.status(201).json(newItem);
});

app.patch("/api/services/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, imageUrl, num } = req.body;

  const item = servicesCache.find(x => x.id === id);
  if (!item) return res.status(404).json({ error: "Service item not found" });

  if (title !== undefined) item.title = title;
  if (category !== undefined) item.category = category;
  if (imageUrl !== undefined) item.imageUrl = imageUrl;
  if (num !== undefined) item.num = num;

  writeledger(SERVICES_FILE, servicesCache);
  res.json(item);
});

app.delete("/api/services/:id", (req, res) => {
  const { id } = req.params;
  servicesCache = servicesCache.filter(x => x.id !== id);
  writeledger(SERVICES_FILE, servicesCache);
  res.json({ success: true, target: id });
});

// Edit API - Portfolio
app.patch("/api/portfolio/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, location, date, director, resolution, imageUrl } = req.body;

  const item = portfolioCache.find(x => x.id === id);
  if (!item) return res.status(404).json({ error: "Portfolio item not found" });

  if (title !== undefined) item.title = title;
  if (category !== undefined) item.category = category;
  if (location !== undefined) item.location = location;
  if (date !== undefined) item.date = date;
  if (director !== undefined) item.director = director;
  if (resolution !== undefined) item.resolution = resolution;
  if (imageUrl !== undefined) item.imageUrl = imageUrl;

  writeledger(PORTFOLIO_FILE, portfolioCache);
  res.json(item);
});

// Edit API - Blogs
app.patch("/api/blogs/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, teaser, content, authorHex, tags } = req.body;

  const post = blogsCache.find(x => x.id === id);
  if (!post) return res.status(404).json({ error: "Blog post not found" });

  if (title !== undefined) post.title = title.toUpperCase();
  if (category !== undefined) post.category = category;
  if (teaser !== undefined) post.teaser = teaser;
  if (content !== undefined) {
    post.content = content;
    post.byteSize = Buffer.byteLength(content, 'utf-8');
  }
  if (authorHex !== undefined) post.authorHex = authorHex;
  if (tags !== undefined) post.tags = tags;

  writeledger(BLOGS_FILE, blogsCache);
  res.json(post);
});

app.get("/api/bookings", (req, res) => {
  res.json(bookingsCache);
});

app.post("/api/bookings", (req, res) => {
  const { clientName, sectorEmail, commLink, eventDate, eventType, coordinateVenue, packageTier, message } = req.body;
  
  if (!clientName || !sectorEmail || !eventDate || !eventType) {
    return res.status(400).json({ error: "INPUT STATE INCOMPLETE. COMMENCE RE-ENTRY." });
  }

  const newBooking: Booking = {
    id: `book-${Date.now()}`,
    clientName,
    sectorEmail,
    commLink: commLink || "NONE",
    eventDate,
    eventType,
    coordinateVenue: coordinateVenue || "DEFAULT GRID",
    packageTier: packageTier || "ESSENTIAL",
    ledgerHash: "0x" + Math.floor(Math.random() * 0xFFFFFFFFFFFF).toString(16).toUpperCase(),
    message: message || "",
    status: "PENDING",
    timestamp: new Date().toISOString()
  };

  bookingsCache.push(newBooking);
  writeledger(BOOKINGS_FILE, bookingsCache);
  res.status(201).json({ progress: "SECURED", booking: newBooking });
});

// Update booking status
app.patch("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const b = bookingsCache.find(x => x.id === id);
  if (!b) return res.status(404).json({ error: "RECORD NOT FOUND IN SECTOR SYSTEMS." });

  b.status = status;
  writeledger(BOOKINGS_FILE, bookingsCache);
  res.json({ progress: "UPDATED", booking: b });
});

// Delete booking
app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  bookingsCache = bookingsCache.filter(x => x.id !== id);
  writeledger(BOOKINGS_FILE, bookingsCache);
  res.json({ progress: "TERMINATED", target: id });
});

app.get("/api/portfolio", (req, res) => {
  res.json(portfolioCache);
});

app.post("/api/portfolio", (req, res) => {
  const { title, category, location, date, director, resolution, imageUrl, corruptionLevel, isFeatured } = req.body;
  if (!title || !category || !imageUrl) {
    return res.status(400).json({ error: "MEDIA ATTRIBUTES INSUFFICIENT." });
  }

  const newItem: PortfolioItem = {
    id: `port-${Date.now()}`,
    title,
    category,
    location: location || "UNKNOWN SECTOR",
    date: date || "2026-06-18",
    director: director || "CYBERNETIC_AUTO",
    resolution: resolution || "8K HIGH-DENSITY",
    imageUrl,
    corruptionLevel: Number(corruptionLevel) || 0,
    isFeatured: !!isFeatured
  };

  portfolioCache.push(newItem);
  writeledger(PORTFOLIO_FILE, portfolioCache);
  res.status(201).json({ progress: "SECURED", item: newItem });
});

app.delete("/api/portfolio/:id", (req, res) => {
  const { id } = req.params;
  portfolioCache = portfolioCache.filter(x => x.id !== id);
  writeledger(PORTFOLIO_FILE, portfolioCache);
  res.json({ progress: "DELETED", target: id });
});

app.get("/api/blogs", (req, res) => {
  res.json(blogsCache);
});

app.post("/api/blogs", (req, res) => {
  const { title, category, teaser, content, authorHex, tags } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "TEXT BUFFER VOID." });
  }

  const newBlog: BlogPost = {
    id: `blog-${Date.now()}`,
    securityHash: "0x" + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase(),
    title: title.toUpperCase(),
    category: category || "GENERAL LOG",
    teaser: teaser || "No teaser saved.",
    content,
    authorHex: authorHex || "OPERATOR_X_01",
    byteSize: Buffer.byteLength(content, 'utf-8'),
    timestamp: new Date().toISOString(),
    tags: tags || ["ARCHIVE", "SYSTEM"]
  };

  blogsCache.push(newBlog);
  writeledger(BLOGS_FILE, blogsCache);
  res.status(201).json({ progress: "COMMITTED", blog: newBlog });
});

app.delete("/api/blogs/:id", (req, res) => {
  const { id } = req.params;
  blogsCache = blogsCache.filter(x => x.id !== id);
  writeledger(BLOGS_FILE, blogsCache);
  res.json({ progress: "DELETED", target: id });
});

// Gemini AI smart feature route: Co-processor photo log desc generator
app.post("/api/gemini/generate", async (req, res) => {
  const { prompt, type } = req.body;
  if (!prompt) return res.status(400).json({ error: "CO-PROCESSOR PROMPT VOID." });

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Offline fallback description generator if key is missing or not supplied
      return res.json({
        result: `[OFFLINE COMPILATION // LOCAL FALLBACK] // DESCRIPTION RETRACTED FROM LOCAL CACHE\nLOG: Preserving data index ${prompt}. Sensor coordinates confirmed. High contrast golden chromatic balance verified.`
      });
    }

    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    let systemInstruction = "You are a cybernetic terminal system from a dystopian cyber-future. Speak in cold, pixel-dense, highly professional technical vocabulary. Provide a premium luxury photo description or blog post expansion depending on context.";
    if (type === "blog") {
      systemInstruction = "You are the central core computer. Write a cold, cryptic, technical, blog paragraph explaining elite photography with harsh cyberpunk visual aesthetic.";
    }

    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85
      }
    });

    res.json({ result: aiResponse.text || "NO BYTE OUTPUT RECEIVED." });
  } catch (error: any) {
    console.error("Gemini coprocessor offline:", error);
    res.status(500).json({ error: `COPROCESSOR FAULT: ${error.message || error}` });
  }
});

// Vite server orchestration
async function assembleGrid() {
  if (process.env.VERCEL) {
    console.log("RUNNING IN VERCEL SERVERLESS ENVIRONMENT");
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("VITE CO-SYSTEMS ONLINE IN DEBUG MODE");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("STATIC SHUTTER NET SECURED IN PRODUCTION DISTRIBUTION");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`STATUS: UNSTABLE CRT CARRIER BEAM INTENSIFYING AT PORT ${PORT}`);
  });
}

assembleGrid();

export default app;
