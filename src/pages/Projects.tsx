import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import ProjectModal from '../components/projects/ProjectModal';
import type { SiteProject } from '../types/site';
import { getWhatsAppLink, whatsappMessages } from '../services/whatsapp';

export default function Projects() {
  const { data } = useSiteData();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<SiteProject | null>(null);

  const filtered = activeCategory === 'Todos'
    ? data.projects
    : data.projects.filter(p => p.category === activeCategory);

  return (
    <div className="projects-page">
      <div className="projects-page-header">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <p className="section-label">Portfólio</p>
          <h1 className="section-title" style={{ marginBottom: 12 }}>
            Nossos <span className="gradient-text">Projetos Realizados</span>
          </h1>
          <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
            Cada projeto é a concretização do nosso compromisso com qualidade, segurança e eficiência energética.
          </p>
        </motion.div>
      </div>

      <div className="projects-page-content">
        <ProjectFilter active={activeCategory} onChange={setActiveCategory} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="projects-full-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project as any}
                index={i}
                onClick={(p) => setSelectedProject(p as unknown as SiteProject)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-text-muted)' }}>
            <p>Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 64, padding: '48px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}
        >
          <p className="section-label">Pronto para o próximo?</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16 }}>
            Seu Projeto Pode Ser o Próximo
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Entre em contato e solicite seu orçamento gratuito. Atendemos em toda a região de Boa Vista e interior de RR.
          </p>
          <a href={getWhatsAppLink(whatsappMessages.projects)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            <MessageCircle size={20} /> Solicitar Orçamento
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject as any}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
