import AnimatedSection from '../ui/AnimatedSection';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../context/SiteDataContext';

export default function Testimonials() {
  const { data } = useSiteData();

  return (
    <section id="depoimentos" className="testimonials-section section">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Depoimentos"
            title="O que Nossos Clientes Dizem"
            highlight="Nossos Clientes"
            description="Mais de 500 clientes satisfeitos em todo Roraima. Veja o que eles têm a dizer sobre a CM Energia."
            center
          />
        </AnimatedSection>

        <div className="testimonials-grid">
          {data.testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <div className="testimonial-card">
                <div className="testimonial-stars" aria-label={`${t.rating} estrelas`}>
                  {'★'.repeat(t.rating)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" aria-hidden="true">
                    {t.initials}
                  </div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-city">{t.city} · {t.service}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
