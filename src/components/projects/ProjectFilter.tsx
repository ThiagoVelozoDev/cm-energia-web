import { projectCategories } from '../../data/projects';

interface ProjectFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="filters-bar" role="group" aria-label="Filtrar projetos por categoria">
      {projectCategories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn${active === cat ? ' active' : ''}`}
          onClick={() => onChange(cat)}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
