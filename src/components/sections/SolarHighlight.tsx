import { TrendingDown, Leaf, Shield, DollarSign, MessageCircle } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionTitle from '../ui/SectionTitle';
import { getWhatsAppLink, whatsappMessages } from '../../services/whatsapp';

const benefits = [
  {
    Icon: TrendingDown,
    title: 'Até 95% de Economia',
    desc: 'Reduza drasticamente sua conta de energia elétrica desde o primeiro mês de operação do sistema.',
  },
  {
    Icon: DollarSign,
    title: 'Retorno em 3 a 5 Anos',
    desc: 'Com a queda no custo da energia solar, o payback do investimento acontece cada vez mais rápido.',
  },
  {
    Icon: Leaf,
    title: 'Energia Limpa e Renovável',
    desc: 'Reduza sua pegada de carbono e contribua para um futuro mais sustentável para as próximas gerações.',
  },
  {
    Icon: Shield,
    title: 'Garantia de 25 Anos',
    desc: 'Os módulos solares que utilizamos têm garantia de performance de 25 anos e vida útil de 30+ anos.',
  },
];

export default function SolarHighlight() {
  return (
    <section id="solar" className="solar-section">
      <div className="solar-inner">
        <div>
          <AnimatedSection direction="left">
            <SectionTitle
              label="Energia Solar"
              title="Liberdade Energética para Sua Casa ou Empresa"
              highlight="Liberdade Energética"
              description="O sol é abundante em Roraima. Aproveite essa vantagem natural e transforme luz solar em economia real na sua fatura de energia."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="solar-benefits">
              {benefits.map(({ Icon, title, desc }) => (
                <div key={title} className="solar-benefit">
                  <div className="solar-benefit-icon">
                    <Icon size={20} />
                  </div>
                  <div className="solar-benefit-content">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <div style={{ marginTop: 40 }}>
              <a
                href={getWhatsAppLink(whatsappMessages.solar)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <MessageCircle size={20} />
                Simule sua Economia Agora
              </a>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection direction="right" delay={0.15}>
          <div className="solar-visual">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85"
              alt="Painel solar instalado em residência"
              className="solar-visual-img"
              loading="lazy"
            />
            <div className="solar-visual-badge">
              <strong>-95%</strong>
              <span>na conta de energia</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
