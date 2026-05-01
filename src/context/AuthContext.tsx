import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode,
} from 'react';
import {
  signInWithEmailAndPassword, signOut as fbSignOut,
  onAuthStateChanged, reauthenticateWithCredential,
  EmailAuthProvider, updatePassword,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseReady } from '../lib/firebase';

/* ── Fallback localStorage auth (when Firebase not configured) */
const LS_AUTH = 'cm_energia_auth_session';
const LS_CREDS = 'cm_energia_admin_creds';
const DEFAULT_CREDS = { username: 'admin', password: 'cmenergia@2024' };
function lsGetCreds() {
  try { return JSON.parse(localStorage.getItem(LS_CREDS) || '') || DEFAULT_CREDS; } catch { return DEFAULT_CREDS; }
}

/* ── Types ─────────────────────────────────────────────────── */
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  usingFirebase: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (current: string, next: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lsAuth, setLsAuth] = useState(() => {
    if (isFirebaseReady) return false;
    return !!localStorage.getItem(LS_AUTH);
  });

  /* Firebase auth state listener */
  useEffect(() => {
    if (!isFirebaseReady || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const isAuthenticated = isFirebaseReady ? !!user : lsAuth;

  /* Login */
  const login = useCallback(async (identifier: string, password: string): Promise<boolean> => {
    if (isFirebaseReady && auth) {
      try {
        await signInWithEmailAndPassword(auth, identifier, password);
        return true;
      } catch { return false; }
    }
    /* Fallback */
    const creds = lsGetCreds();
    if (identifier === creds.username && password === creds.password) {
      localStorage.setItem(LS_AUTH, '1');
      setLsAuth(true);
      return true;
    }
    return false;
  }, []);

  /* Logout */
  const logout = useCallback(async () => {
    if (isFirebaseReady && auth) { await fbSignOut(auth); return; }
    localStorage.removeItem(LS_AUTH);
    setLsAuth(false);
  }, []);

  /* Change password */
  const changePassword = useCallback(async (current: string, next: string): Promise<boolean> => {
    if (isFirebaseReady && auth?.currentUser) {
      try {
        const cred = EmailAuthProvider.credential(auth.currentUser.email!, current);
        await reauthenticateWithCredential(auth.currentUser, cred);
        await updatePassword(auth.currentUser, next);
        return true;
      } catch { return false; }
    }
    /* Fallback */
    const creds = lsGetCreds();
    if (current !== creds.password) return false;
    localStorage.setItem(LS_CREDS, JSON.stringify({ ...creds, password: next }));
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, usingFirebase: isFirebaseReady, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
