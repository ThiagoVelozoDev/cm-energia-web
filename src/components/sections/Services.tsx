import { useState, useRef, useEffect } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../context/SiteDataContext';
import type { SiteService } from '../../types/site';

function ServiceCard({ service }: { service: SiteService }) {
  const [expanded, setExpanded] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = descRef.current;
    if (el) setClamped(el.scrollHeight > el.clientHeight + 2);
  }, [service.description]);

  const isFeatured = service.featured;

  return (
    <div className={`card service-card-fixed${isFeatured ? ' service-card-featured' : ''}`}>
      <div
        className="card-icon"
        style={{
          fontSize: '1.4rem',
          background: isFeatured ? 'rgba(255,255,255,0.2)' : 'var(--gradient-brand)',
        }}
      >
        {service.emoji}
      </div>
      <h3 className="card-title" style={isFeatured ? { color: 'white' } : undefined}>
        {service.title}
      </h3>
      <p
        ref={descRef}
        className="card-desc"
        style={{
          ...(isFeatured ? { color: 'rgba(255,255,255,0.82)' } : {}),
          ...(!expanded ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}),
        }}
      >
        {service.description}
      </p>
      {(clamped || expanded) && (
        <button
          onClick={() => setExpanded(p => !p)}
          className={`btn btn-sm${isFeatured ? ' btn-white' : ' btn-ghost'}`}
          style={{ marginTop: 10, padding: '4px 0' }}
        >
          {expanded ? '← Fechar' : 'Saiba mais →'}
        </button>
      )}
    </div>
  );
}

export default function Services() {
  const { data } = useSiteData();

  return (
    <section id="servicos" className="services-section section">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="O que fazemos"
            title="Soluções Completas em Engenharia Elétrica"
            highlight="Engenharia Elétrica"
            description="Da energia solar a subestações, a CM Energia tem a solução certa para cada necessidade elétrica."
          />
        </AnimatedSection>

        <div className="services-grid">
          {data.services.map((service, i) => (
            <AnimatedSection key={service.id} delay={(i % 3) * 0.1}>
              <ServiceCard service={service} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
