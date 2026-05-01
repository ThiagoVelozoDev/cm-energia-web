import AnimatedSection from '../ui/AnimatedSection';
import SectionTitle from '../ui/SectionTitle';

const steps = [
  {
    number: '01',
    title: 'Visita e Diagnóstico',
    desc: 'Nossa equipe realiza uma visita técnica gratuita para analisar o local, seu consumo e identificar a solução ideal.',
  },
  {
    number: '02',
    title: 'Projeto Personalizado',
    desc: 'Elaboramos um projeto elétrico detalhado, dimensionado especificamente para a sua necessidade e realidade.',
  },
  {
    number: '03',
    title: 'Aprovação e Homologação',
    desc: 'Cuidamos de toda a documentação e aprovação junto à concessionária e aos órgãos reguladores.',
  },
  {
    number: '04',
    title: 'Instalação Profissional',
    desc: 'Nossos técnicos certificados realizam a instalação com segurança, qualidade e dentro do prazo combinado.',
  },
  {
    number: '05',
    title: 'Monitoramento e Suporte',
    desc: 'Após a instalação, você monitora sua geração em tempo real e conta com nosso suporte técnico contínuo.',
  },
];

export default function HowItWorks() {
  return (
    <section className="howitworks-section section" id="como-funciona">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Como Funciona"
            title="Do Projeto à Economia em 5 Passos"
            highlight="5 Passos"
            description="Processo simples, transparente e sem burocracia para você. Cuidamos de tudo, do início ao fim."
            center
            dark
          />
        </AnimatedSection>

        <div className="steps-grid">
          <div className="steps-connector" aria-hidden="true" />
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.1}>
              <div className="step-card">
                <div className="step-number" aria-label={`Passo ${step.number}`}>
                  {step.number}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
