import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppLink, whatsappMessages } from '../../services/whatsapp';

export default function CTASection() {
  return (
    <section className="cta-section" id="orcamento">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="cta-title">
            Pronto para Economizar na<br />Conta de Energia?
          </h2>
          <p className="cta-desc">
            Solicite seu orçamento gratuito agora e descubra quanto você pode economizar com energia solar. Nossa equipe responde em até <strong>2 horas</strong>.
          </p>

          <div className="cta-actions">
            <a
              href={getWhatsAppLink(whatsappMessages.cta)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white btn-lg"
            >
              <MessageCircle size={20} />
              Falar no WhatsApp Agora
            </a>
            <a
              href="tel:+5595981258346"
              className="btn btn-outline btn-lg"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
            >
              <Phone size={20} />
              (95) 9 8125-8346
            </a>
          </div>

          <div className="cta-urgency">
            <span className="cta-urgency-dot" aria-hidden="true" />
            Atendendo agora · Resposta em até 2 horas
          </div>
        </motion.div>
      </div>
    </section>
  );
}
