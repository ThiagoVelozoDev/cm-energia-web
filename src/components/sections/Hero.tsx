
import { motion } from 'framer-motion';
import { MessageCircle, ChevronRight, Shield, Award } from 'lucide-react';
import { getWhatsAppLink, whatsappMessages } from '../../services/whatsapp';
import fachadaImg from '../../assets/fachada.png';
import solarImg from '../../assets/solar.png';

const stats = [
  { value: '+200', label: 'Projetos\nConcluídos' },
  { value: '+500', label: 'Clientes\nSatisfeitos' },
  { value: '+1 MW', label: 'Potência\nInstalada' },
];

export default function Hero() {
  return (
    <section className="hero" aria-label="Banner principal">
      <div className="hero-inner hero-cols">
        {/* Coluna da esquerda: textos */}
        <div className="hero-col-text">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Shield size={14} />
            Engenharia com Responsabilidade Técnica
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            Energia Solar que <em>Transforma</em> sua Conta de Luz
          </motion.h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            A CM Energia projeta e instala sistemas fotovoltaicos de alta performance para residências, comércios e indústrias. Economize até <strong style={{ color: 'var(--color-secondary)' }}>95% na conta de energia</strong> com tecnologia de ponta e garantia total.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
          >
            <a
              href={getWhatsAppLink(whatsappMessages.hero)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <MessageCircle size={20} />
              Orçamento Grátis no WhatsApp
            </a>
            <a href="/projetos" className="btn btn-outline btn-lg">
              Ver Projetos
              <ChevronRight size={18} />
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {stats.map((s, i) => (
              <div key={i}>
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        {/* Coluna da direita: imagem + selo */}
        <div className="hero-col-images">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: 'rgba(0,142,211,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,142,211,0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: 10,
              zIndex: 2,
              maxWidth: 320,
            }}
          >
            <Award size={20} color="var(--color-primary)" />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-white)' }}>Engenheiros Certificados</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>CREA / ABNT</div>
            </div>
          </motion.div>
          <motion.img
            src={fachadaImg}
            alt="Fachada da empresa"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              aspectRatio: '2/1',
              minHeight: 280,
              minWidth: 0,
              objectFit: 'cover',
              borderRadius: '1.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
              border: '4px solid var(--color-primary)',
              background: '#fff',
              marginTop: 0,
            }}
          />
          <motion.img
            src={solarImg}
            alt="Instalação de painel solar"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              aspectRatio: '2/1',
              minHeight: 280,
              minWidth: 0,
              objectFit: 'cover',
              borderRadius: '1.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
              border: '4px solid var(--color-primary)',
              background: '#fff',
            }}
          />
        </div>
      </div>
    </section>
  );
}
