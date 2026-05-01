import { motion } from 'framer-motion';
import { X, MapPin, MessageCircle } from 'lucide-react';
import type { Project } from '../../data/projects';
import { getWhatsAppLink, whatsappMessages } from '../../services/whatsapp';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>

        <img
          src={project.image}
          alt={project.title}
          className="modal-img"
        />

        <div className="modal-body">
          <span className="modal-tag">{project.category}</span>
          {project.power && (
            <span
              className="modal-tag"
              style={{
                marginLeft: 8,
                background: 'rgba(0,142,211,0.15)',
                border: '1px solid rgba(0,142,211,0.3)',
                color: 'var(--color-primary)',
              }}
            >
              {project.power}
            </span>
          )}
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-desc">{project.description}</p>
          {project.location && (
            <p className="modal-location">
              <MapPin size={14} />
              {project.location}
            </p>
          )}
          <div style={{ marginTop: 24 }}>
            <a
              href={getWhatsAppLink(whatsappMessages.projects)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={18} />
              Quero um projeto como este
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
