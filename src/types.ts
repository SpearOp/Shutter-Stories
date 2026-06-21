/**
 * SHUTTER STORIES // SYSTEM DATA TYPES
 * CORRUPTED_UI_PROTOCOL_v9.7
 */

export enum MediaCategory {
  WEDDINGS = "CARBON_UNION_RE_BONDING",
  ENGAGEMENTS = "MUTUAL_MERGE_CHRONO",
  DESTINATIONS = "OFFWORLD_EXPEDITIONS",
  FASHION = "BIOMASS_CLOTH_SIM",
  EVENTS = "CONGLOMERATE_SECTOR_LOGS",
  FILMS = "SPECTRAL_TIME_SENSORS"
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: MediaCategory;
  location: string;
  date: string;
  director: string;
  resolution: string;
  imageUrl: string;
  videoUrl?: string; // Optional playback capture
  corruptionLevel: number; // For glitch visualization
  isFeatured?: boolean;
}

export interface Booking {
  id: string;
  clientName: string;
  sectorEmail: string;
  commLink: string;
  eventDate: string;
  eventType: MediaCategory;
  coordinateVenue: string;
  packageTier: "ESSENTIAL" | "SIGNATURE" | "ROYAL";
  ledgerHash: string; // Auto-generated secure token
  message: string;
  status: "PENDING" | "ACCEPTED" | "TERMINATED";
  timestamp: string;
}

export interface BlogPost {
  id: string;
  securityHash: string;
  title: string;
  category: string;
  teaser: string;
  content: string;
  authorHex: string;
  byteSize: number;
  timestamp: string;
  tags: string[];
}

export interface ArchiveStats {
  happyClients: number;
  weddingsCovered: number;
  cinematicFilms: number;
  destinationsCaptured: number;
  hardwareFails: number; // Cyberpunk metrics
}

export interface HeroSlide {
  id: string;
  url: string;
  title: string;
  location: string;
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  category: string;
  imageUrl: string;
}
