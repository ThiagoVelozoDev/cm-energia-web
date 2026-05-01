import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.45 }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
      aria-label={`Ver projeto: ${project.title}`}
    >
      <img src={project.image} alt={project.title} loading="lazy" />
      <div className="project-card-overlay">
        <span className="project-card-tag">{project.category}</span>
        <p className="project-card-title">{project.title}</p>
        {project.location && (
          <p className="project-card-location">
            <MapPin size={12} />
            {project.location}
          </p>
        )}
      </div>
    </motion.div>
  );
}
