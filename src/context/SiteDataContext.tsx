import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { SiteData, SiteStats, SiteContact, SiteService, SiteProject, SiteTeamMember, SiteTestimonial } from '../types/site';
import { services as defServices } from '../data/services';
import { projects as defProjects } from '../data/projects';
import { testimonials as defTestimonials } from '../data/testimonials';
import { team as defTeam } from '../data/team';
import { isFirebaseReady } from '../lib/firebase';
import {
  loadSiteDataFromFirestore,
  saveConfig,
  saveTeam,
  saveServices as fsSaveServices,
  saveTestimonials as fsSaveTestimonials,
  upsertProject,
  removeProject as fsDeleteProject,
} from '../lib/firestoreService';

const STORAGE_KEY = 'cm_energia_site_data';

const defaultData: SiteData = {
  logo: null,
  stats: { projects: 200, clients: 500, years: 8, power: 1500, powerUnit: 'kWp' },
  team: defTeam.map(m => ({ id: m.id, name: m.name, role: m.role, bio: m.bio, badge: m.badge, photo: m.photo })),
  services: defServices.map(s => ({ id: s.id, emoji: s.emoji, title: s.title, description: s.description, featured: s.featured })),
  projects: defProjects.map(p => ({ id: p.id, title: p.title, category: p.category, description: p.description, location: p.location, image: p.image, power: p.power })),
  testimonials: defTestimonials.map(t => ({ id: t.id, name: t.name, city: t.city, text: t.text, rating: t.rating, initials: t.initials, service: t.service })),
  contact: {
    phone: '(95) 9 8125-8346',
    email: 'contato@cmenergia.com.br',
    location: 'Boa Vista – RR, Brasil',
    whatsapp: '5595981258346',
    mapLinkUrl: 'https://maps.app.goo.gl/yTnDui2DVJUL79YWA',
    mapEmbedUrl: '',
  },
};

function loadData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const saved = JSON.parse(raw) as Partial<SiteData>;
    return {
      logo: saved.logo ?? defaultData.logo,
      stats: { ...defaultData.stats, ...(saved.stats ?? {}) },
      team: saved.team?.length ? saved.team : defaultData.team,
      services: saved.services?.length ? saved.services : defaultData.services,
      projects: saved.projects?.length ? saved.projects : defaultData.projects,
      testimonials: saved.testimonials?.length ? saved.testimonials : defaultData.testimonials,
      contact: { ...defaultData.contact, ...(saved.contact ?? {}) },
    };
  } catch {
    return defaultData;
  }
}

interface SiteDataContextType {
  data: SiteData;
  updateLogo: (logo: string | null) => void;
  updateStats: (stats: SiteStats) => void;
  updateTeamMember: (id: string, patch: Partial<SiteTeamMember>) => void;
  setServices: (services: SiteService[]) => void;
  addService: (s: SiteService) => void;
  updateService: (id: string, patch: Partial<SiteService>) => void;
  removeService: (id: string) => void;
  setProjects: (projects: SiteProject[]) => void;
  addProject: (p: SiteProject) => void;
  updateProject: (id: string, patch: Partial<SiteProject>) => void;
  removeProject: (id: string) => void;
  setTestimonials: (testimonials: SiteTestimonial[]) => void;
  addTestimonial: (t: SiteTestimonial) => void;
  updateTestimonial: (id: string, patch: Partial<SiteTestimonial>) => void;
  removeTestimonial: (id: string) => void;
  updateContact: (contact: SiteContact) => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(loadData);

  /* On mount: pull from Firestore and override local cache */
  useEffect(() => {
    if (!isFirebaseReady) return;
    loadSiteDataFromFirestore().then(remote => {
      setData(prev => {
        const merged: SiteData = {
          logo: remote.logo !== undefined ? remote.logo : prev.logo,
          stats: remote.stats ? { ...prev.stats, ...remote.stats } : prev.stats,
          team: remote.team?.length ? remote.team : prev.team,
          services: remote.services?.length ? remote.services : prev.services,
          projects: remote.projects?.length ? remote.projects : prev.projects,
          testimonials: remote.testimonials?.length ? remote.testimonials : prev.testimonials,
          contact: remote.contact ? { ...prev.contact, ...remote.contact } : prev.contact,
        };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch {}
        return merged;
      });
    }).catch(() => {});
  }, []);

  const saveLS = useCallback((next: SiteData) => {
    setData(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, []);

  const updateLogo = useCallback((logo: string | null) => {
    const next = { ...data, logo };
    saveLS(next);
    if (isFirebaseReady) saveConfig(logo, data.stats, data.contact).catch(() => {});
  }, [data, saveLS]);

  const updateStats = useCallback((stats: SiteStats) => {
    const next = { ...data, stats };
    saveLS(next);
    if (isFirebaseReady) saveConfig(data.logo, stats, data.contact).catch(() => {});
  }, [data, saveLS]);

  const updateTeamMember = useCallback((id: string, patch: Partial<SiteTeamMember>) => {
    const team = data.team.map(m => m.id === id ? { ...m, ...patch } : m);
    saveLS({ ...data, team });
    if (isFirebaseReady) saveTeam(team).catch(() => {});
  }, [data, saveLS]);

  const setServices = useCallback((services: SiteService[]) => {
    saveLS({ ...data, services });
    if (isFirebaseReady) fsSaveServices(services).catch(() => {});
  }, [data, saveLS]);

  const addService = useCallback((s: SiteService) => {
    const services = [...data.services, s];
    saveLS({ ...data, services });
    if (isFirebaseReady) fsSaveServices(services).catch(() => {});
  }, [data, saveLS]);

  const updateService = useCallback((id: string, patch: Partial<SiteService>) => {
    const services = data.services.map(s => s.id === id ? { ...s, ...patch } : s);
    saveLS({ ...data, services });
    if (isFirebaseReady) fsSaveServices(services).catch(() => {});
  }, [data, saveLS]);

  const removeService = useCallback((id: string) => {
    const services = data.services.filter(s => s.id !== id);
    saveLS({ ...data, services });
    if (isFirebaseReady) fsSaveServices(services).catch(() => {});
  }, [data, saveLS]);

  const setProjects = useCallback((projects: SiteProject[]) => {
    saveLS({ ...data, projects });
    if (isFirebaseReady) projects.forEach(p => upsertProject(p).catch(() => {}));
  }, [data, saveLS]);

  const addProject = useCallback((p: SiteProject) => {
    const projects = [...data.projects, p];
    saveLS({ ...data, projects });
    if (isFirebaseReady) upsertProject(p).catch(() => {});
  }, [data, saveLS]);

  const updateProject = useCallback((id: string, patch: Partial<SiteProject>) => {
    const projects = data.projects.map(p => p.id === id ? { ...p, ...patch } : p);
    saveLS({ ...data, projects });
    if (isFirebaseReady) {
      const updated = projects.find(p => p.id === id);
      if (updated) upsertProject(updated).catch(() => {});
    }
  }, [data, saveLS]);

  const removeProject = useCallback((id: string) => {
    saveLS({ ...data, projects: data.projects.filter(p => p.id !== id) });
    if (isFirebaseReady) fsDeleteProject(id).catch(() => {});
  }, [data, saveLS]);

  const setTestimonials = useCallback((testimonials: SiteTestimonial[]) => {
    saveLS({ ...data, testimonials });
    if (isFirebaseReady) fsSaveTestimonials(testimonials).catch(() => {});
  }, [data, saveLS]);

  const addTestimonial = useCallback((t: SiteTestimonial) => {
    const testimonials = [...data.testimonials, t];
    saveLS({ ...data, testimonials });
    if (isFirebaseReady) fsSaveTestimonials(testimonials).catch(() => {});
  }, [data, saveLS]);

  const updateTestimonial = useCallback((id: string, patch: Partial<SiteTestimonial>) => {
    const testimonials = data.testimonials.map(t => t.id === id ? { ...t, ...patch } : t);
    saveLS({ ...data, testimonials });
    if (isFirebaseReady) fsSaveTestimonials(testimonials).catch(() => {});
  }, [data, saveLS]);

  const removeTestimonial = useCallback((id: string) => {
    const testimonials = data.testimonials.filter(t => t.id !== id);
    saveLS({ ...data, testimonials });
    if (isFirebaseReady) fsSaveTestimonials(testimonials).catch(() => {});
  }, [data, saveLS]);

  const updateContact = useCallback((contact: SiteContact) => {
    const next = { ...data, contact };
    saveLS(next);
    if (isFirebaseReady) saveConfig(data.logo, data.stats, contact).catch(() => {});
  }, [data, saveLS]);

  return (
    <SiteDataContext.Provider value={{
      data,
      updateLogo, updateStats, updateTeamMember,
      setServices, addService, updateService, removeService,
      setProjects, addProject, updateProject, removeProject,
      setTestimonials, addTestimonial, updateTestimonial, removeTestimonial,
      updateContact,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider');
  return ctx;
}
