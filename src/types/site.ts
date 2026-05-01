export interface SiteStats {
  projects: number;
  clients: number;
  years: number;
  power: number;
  powerUnit: string;
}

export interface SiteContact {
  phone: string;
  email: string;
  location: string;
  whatsapp: string;
  mapLinkUrl: string;
  mapEmbedUrl: string;
}

export interface SiteService {
  id: string;
  emoji: string;
  title: string;
  description: string;
  featured: boolean;
}

export interface SiteProject {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  image: string;
  power?: string;
}

export interface SiteTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  badge: string;
  photo: string;
}

export interface SiteTestimonial {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
  initials: string;
  service: string;
}

export interface SiteData {
  logo: string | null;
  stats: SiteStats;
  team: SiteTeamMember[];
  services: SiteService[];
  projects: SiteProject[];
  testimonials: SiteTestimonial[];
  contact: SiteContact;
}
