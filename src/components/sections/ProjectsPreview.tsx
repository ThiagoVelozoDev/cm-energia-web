import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../context/SiteDataContext';

export default function ProjectsPreview() {
  const { data } = useSiteData();
  const preview = data.projects.slice(0, 6);

  return (
    <section id="projetos-preview" className="projects-preview-section section">
      <div className="container">
        <AnimatedSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(40px, 6vw, 64px)' }}>
            <SectionTitle
              label="Portfólio"
              title="Projetos que Falam por Si"
              highlight="Falam por Si"
              description="Cada obra entregue é resultado de planejamento, técnica e dedicação."
            />
            <Link to="/projetos" className="btn btn-outline" style={{ flexShrink: 0 }}>
              Ver todos os projetos <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="projects-grid">
          {preview.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
            >
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="project-card-overlay">
                <span className="project-card-tag">{project.category}</span>
                <p className="project-card-title">{project.title}</p>
                {project.location && (
                  <p className="project-card-location">
                    <MapPin size={12} /> {project.location}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedSection delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/projetos" className="btn btn-primary btn-lg">
              Ver Todos os Projetos <ArrowRight size={18} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
