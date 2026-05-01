import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Zap, LayoutDashboard, Image, Users, BarChart3, Wrench, FolderOpen, MessageSquare, Phone, LogOut, Menu, X, ExternalLink, Inbox } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isFirebaseReady } from '../../lib/firebase';
import { subscribeToMessages } from '../../lib/firestoreService';

const staticNavItems = [
  { to: '/admin/dashboard', Icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/logo', Icon: Image, label: 'Logotipo' },
  { to: '/admin/team', Icon: Users, label: 'Equipe' },
  { to: '/admin/stats', Icon: BarChart3, label: 'Estatísticas' },
  { to: '/admin/services', Icon: Wrench, label: 'Serviços' },
  { to: '/admin/projects', Icon: FolderOpen, label: 'Projetos' },
  { to: '/admin/testimonials', Icon: MessageSquare, label: 'Depoimentos' },
  { to: '/admin/contact', Icon: Phone, label: 'Contato' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isFirebaseReady) return;
    const unsub = subscribeToMessages(msgs => {
      setUnreadCount(msgs.filter(m => !m.read).length);
    });
    return unsub;
  }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const sidebarContent = (
    <>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg,#008ED3,#00A971)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="white" />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: '0.85rem', fontWeight: 700, color: 'white', letterSpacing: '0.05em' }}>CM ENERGIA</p>
            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Admin</p>
          </div>
        </div>
      </div>

      <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        {staticNavItems.map(({ to, Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, marginBottom: 2,
              color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
              background: isActive ? 'rgba(0,142,211,0.25)' : 'transparent',
              fontSize: '0.875rem', fontWeight: isActive ? 600 : 400,
              transition: 'all 0.2s',
              textDecoration: 'none',
              borderLeft: isActive ? '2px solid #008ED3' : '2px solid transparent',
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}

        <NavLink
          to="/admin/messages"
          onClick={() => setMobileOpen(false)}
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 8, marginBottom: 2,
            color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
            background: isActive ? 'rgba(0,142,211,0.25)' : 'transparent',
            fontSize: '0.875rem', fontWeight: isActive ? 600 : 400,
            transition: 'all 0.2s',
            textDecoration: 'none',
            borderLeft: isActive ? '2px solid #008ED3' : '2px solid transparent',
          })}
        >
          <Inbox size={16} />
          Mensagens
          {unreadCount > 0 && (
            <span style={{
              marginLeft: 'auto', background: '#008ED3', color: 'white',
              fontSize: '0.65rem', fontWeight: 700, borderRadius: 999,
              padding: '1px 7px', lineHeight: 1.6,
            }}>
              {unreadCount}
            </span>
          )}
        </NavLink>
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 8, color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
        >
          <ExternalLink size={14} /> Ver Site
        </a>
        <button
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 8, color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', width: '100%', transition: 'color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EF4444'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
        >
          <LogOut size={14} /> Sair
        </button>
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>
      {/* Desktop sidebar */}
      <aside style={{ width: 220, background: '#0A0E13', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }} className="admin-sidebar-desktop">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)} />
          <aside style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 240, background: '#0A0E13', display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 220, minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Mobile topbar */}
        <div style={{ display: 'none', padding: '14px 20px', background: 'white', borderBottom: '1px solid #E2E8F0', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }} className="admin-topbar">
          <button onClick={() => setMobileOpen(true)} style={{ color: '#475569', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Menu size={22} />
          </button>
          <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#0F172A' }}>CM Energia Admin</span>
        </div>

        <div style={{ padding: 'clamp(20px, 3vw, 36px)', flex: 1 }}>
          <Outlet />
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-main { margin-left: 0 !important; }
          .admin-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
