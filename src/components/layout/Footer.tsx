import { Link } from 'react-router-dom';
import { Zap, Phone, Mail, MapPin, Share2, MessageCircle, Globe } from 'lucide-react';
import { getWhatsAppLink } from '../../services/whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Zap size={20} color="var(--color-secondary)" strokeWidth={2.5} />
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              CM ENERGIA
            </span>
          </div>
          <p>
            Soluções em energia solar e engenharia elétrica em Boa Vista/RR. Comprometidos com a qualidade, segurança e economia dos nossos clientes.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            {[
              { Icon: MessageCircle, href: getWhatsAppLink(), label: 'WhatsApp' },
              { Icon: Globe, href: '#', label: 'Instagram' },
              { Icon: Share2, href: '#', label: 'Redes Sociais' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-text-muted)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-col-title">Serviços</p>
          <div className="footer-links">
            {['Energia Solar', 'Projetos Elétricos', 'Laudos Técnicos', 'Aterramento e SPDA', 'Geradores', 'Subestações', 'Redes MT'].map(s => (
              <a key={s} href="/#servicos">{s}</a>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-col-title">Empresa</p>
          <div className="footer-links">
            <a href="/#sobre">Quem Somos</a>
            <Link to="/projetos">Projetos</Link>
            <a href="/#depoimentos">Depoimentos</a>
            <a href="/#contato">Contato</a>
          </div>
        </div>

        <div>
          <p className="footer-col-title">Contato</p>
          <div className="footer-links">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={14} /> (95) 9 8125-8346
            </a>
            <a href="mailto:contato@cmenergia.com.br" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mail size={14} /> contato@cmenergia.com.br
            </a>
            <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              <MapPin size={14} style={{ marginTop: 3, flexShrink: 0 }} /> Boa Vista – RR, Brasil
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} CM Energia – Todos os direitos reservados
        </p>
        <p className="footer-crea">
          Responsável Técnico: Rodrigo Macedo – CREA/RR
        </p>
        <Link
          to="/admin/login"
          style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', opacity: 0.45, textDecoration: 'none', transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
        >
          Área Administrativa
        </Link>
      </div>
    </footer>
  );
}
