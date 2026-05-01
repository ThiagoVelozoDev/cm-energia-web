import AnimatedSection from '../ui/AnimatedSection';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../context/SiteDataContext';

export default function About() {
  const { data } = useSiteData();

  return (
    <section id="sobre" className="about-section">
      <div className="about-inner">
        <AnimatedSection>
          <SectionTitle
            label="Quem Somos"
            title="Engenharia com Propósito e Excelência"
            highlight="Propósito e Excelência"
            description="A CM Energia nasceu da combinação de expertise técnica e visão empreendedora. Somos um time de profissionais apaixonados por transformar a forma como as pessoas consomem energia."
            dark
          />
        </AnimatedSection>

        <div className="team-grid">
          {data.team.map((member, i) => (
            <AnimatedSection key={member.id} delay={i * 0.15}>
              <div className="team-card">
                <img
                  src={member.photo}
                  alt={`Foto de ${member.name}`}
                  className="team-card-photo"
                  loading="lazy"
                />
                <div className="team-card-body">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-role">{member.role}</p>
                  <p className="team-card-bio">{member.bio}</p>
                  <span className="team-card-badge">{member.badge}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
