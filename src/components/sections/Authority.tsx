import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ShieldCheck, Clock, Award, Zap } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../context/SiteDataContext';

const differentials = [
  { Icon: ShieldCheck, title: 'Responsabilidade Técnica', desc: 'Todos os projetos são assinados por engenheiro eletricista registrado no CREA/RR, garantindo conformidade com as normas ABNT e regulamentações da ANEEL.' },
  { Icon: Clock, title: 'Prazos Cumpridos', desc: 'Do projeto à instalação, respeitamos cada etapa do cronograma acordado. Nossa gestão eficiente garante que sua obra finalize no prazo prometido.' },
  { Icon: Award, title: 'Equipamentos Premium', desc: 'Trabalhamos exclusivamente com fabricantes certificados e módulos de Tier 1. Qualidade que se traduz em maior geração e maior vida útil do sistema.' },
  { Icon: Zap, title: 'Suporte Completo', desc: 'Acompanhamos desde a aprovação na concessionária até o monitoramento pós-instalação. Você tem suporte técnico em todas as fases do projeto.' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Authority() {
  const { data } = useSiteData();
  const { stats } = data;

  const statsItems = [
    { value: stats.projects, suffix: '+', label: 'Projetos Concluídos' },
    { value: stats.clients, suffix: '+', label: 'Clientes Atendidos' },
    { value: stats.years, suffix: ' anos', label: 'de Experiência' },
    { value: stats.power, suffix: ` ${stats.powerUnit}`, label: 'Potência Instalada' },
  ];

  return (
    <section className="authority-section section" id="autoridade">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Por que a CM Energia?"
            title="Diferenciais que Fazem a Diferença"
            highlight="Fazem a Diferença"
            description="Mais de 8 anos entregando soluções elétricas de excelência em Roraima. Nossa trajetória fala por si."
          />
        </AnimatedSection>

        <div className="stats-grid">
          {statsItems.map((s, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="stat-value"><CountUp target={s.value} suffix={s.suffix} /></span>
              <p className="stat-label">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="differentials-grid">
          {differentials.map(({ Icon, title, desc }, i) => (
            <AnimatedSection key={title} delay={i * 0.1}>
              <div className="card">
                <div className="card-icon"><Icon size={24} /></div>
                <h3 className="card-title">{title}</h3>
                <p className="card-desc">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
