import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { getWhatsAppLink, whatsappMessages } from '../../services/whatsapp';
import { useSiteData } from '../../context/SiteDataContext';

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Energia Solar', href: '/#solar' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Contato', href: '/#contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { data } = useSiteData();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleAnchorClick = (href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const waLink = data.contact.whatsapp
    ? `https://wa.me/${data.contact.whatsapp}?text=${encodeURIComponent(whatsappMessages.hero)}`
    : getWhatsAppLink(whatsappMessages.hero);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Navegação principal">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="CM Energia – Página inicial">
            {data.logo ? (
              <img src={data.logo} alt="CM Energia" style={{ height: 38, maxWidth: 160, objectFit: 'contain' }} />
            ) : (
              <>
                <Zap size={22} color="var(--color-secondary)" strokeWidth={2.5} />
                <div className="navbar-logo-text">
                  CM ENERGIA
                  <span>Engenharia Elétrica</span>
                </div>
              </>
            )}
          </Link>

          <nav className="navbar-nav">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={location.pathname === link.href ? 'active' : ''}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="navbar-actions">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Orçamento Grátis
            </a>
            <button className="navbar-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Abrir menu" aria-expanded={menuOpen}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
              <X size={22} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                {link.href.startsWith('/#') ? (
                  <a href={link.href} onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}>{link.label}</a>
                ) : (
                  <Link to={link.href}>{link.label}</Link>
                )}
              </motion.div>
            ))}
            <motion.a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ marginTop: 16 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
            >
              Orçamento Grátis
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
