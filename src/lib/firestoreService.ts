import {
  doc, getDoc, setDoc, deleteDoc,
  collection, getDocs, addDoc, updateDoc,
  query, orderBy, serverTimestamp, onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import type { SiteData, SiteTeamMember, SiteService, SiteProject, SiteTestimonial, SiteContact, SiteStats } from '../types/site';

/* ── Helpers ──────────────────────────────────────────────── */
function siteRef(docId: string) { return doc(db!, 'siteData', docId); }
function projectRef(id: string) { return doc(db!, 'projects', id); }
function projectsCol() { return collection(db!, 'projects'); }
function messagesCol() { return collection(db!, 'contactMessages'); }

/* ── Load all site data ────────────────────────────────────── */
export async function loadSiteDataFromFirestore(): Promise<Partial<SiteData> & { projects?: SiteProject[] }> {
  const [configSnap, teamSnap, servicesSnap, testimonialsSnap, projectsSnap] = await Promise.all([
    getDoc(siteRef('config')),
    getDoc(siteRef('team')),
    getDoc(siteRef('services')),
    getDoc(siteRef('testimonials')),
    getDocs(query(projectsCol())),
  ]);

  return {
    ...(configSnap.exists() ? configSnap.data() as { logo: string | null; stats: SiteStats; contact: SiteContact } : {}),
    team: teamSnap.exists() ? (teamSnap.data().members as SiteTeamMember[]) : undefined,
    services: servicesSnap.exists() ? (servicesSnap.data().items as SiteService[]) : undefined,
    testimonials: testimonialsSnap.exists() ? (testimonialsSnap.data().items as SiteTestimonial[]) : undefined,
    projects: projectsSnap.docs.map(d => ({ id: d.id, ...d.data() } as SiteProject)),
  };
}

/* ── Write helpers ─────────────────────────────────────────── */
export async function saveConfig(logo: string | null, stats: SiteStats, contact: SiteContact) {
  await setDoc(siteRef('config'), { logo, stats, contact }, { merge: true });
}

export async function saveTeam(members: SiteTeamMember[]) {
  await setDoc(siteRef('team'), { members });
}

export async function saveServices(items: SiteService[]) {
  await setDoc(siteRef('services'), { items });
}

export async function saveTestimonials(items: SiteTestimonial[]) {
  await setDoc(siteRef('testimonials'), { items });
}

export async function upsertProject(project: SiteProject) {
  const { id, ...data } = project;
  await setDoc(projectRef(id), data);
}

export async function removeProject(id: string) {
  await deleteDoc(projectRef(id));
}

/* ── Contact messages ──────────────────────────────────────── */
export interface ContactMessage {
  id?: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  createdAt?: unknown;
  read: boolean;
}

export async function saveContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) {
  await addDoc(messagesCol(), {
    ...msg,
    createdAt: serverTimestamp(),
    read: false,
  });
}

export function subscribeToMessages(callback: (msgs: ContactMessage[]) => void): Unsubscribe {
  const q = query(messagesCol(), orderBy('createdAt', 'desc'));
  return onSnapshot(q, snap => {
    const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
    callback(msgs);
  });
}

export async function markMessageRead(id: string) {
  await updateDoc(doc(db!, 'contactMessages', id), { read: true });
}

export async function deleteMessage(id: string) {
  await deleteDoc(doc(db!, 'contactMessages', id));
}
