import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, ExternalLink, Map } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../context/SiteDataContext';
import { isFirebaseReady } from '../../lib/firebase';
import { saveContactMessage } from '../../lib/firestoreService';

const serviceOptions = ['Energia Solar','Projetos Elétricos','Laudos Técnicos','Aterramento e SPDA','Geradores','Subestações','Redes de Média Tensão','Outros'];

export default function ContactSection() {
  const { data } = useSiteData();
  const { contact } = data;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });

  const waLink = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : '#';

  const MAP_LAT = 2.8273781618150866;
  const MAP_LNG = -60.71246658955431;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`;
  const mapLinkUrl = contact.mapLinkUrl || `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFirebaseReady) {
      await saveContactMessage({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: form.service,
        message: form.message,
      }).catch(() => {});
    }
    const msg = `Olá! Meu nome é ${form.name}. Tenho interesse em: ${form.service}. ${form.message ? `Mensagem: ${form.message}` : ''} Meu contato: ${form.phone}`;
    window.open(`${waLink}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  const contactItems = [
    { Icon: Phone, label: 'Telefone / WhatsApp', value: contact.phone, href: `tel:${contact.phone.replace(/\D/g,'')}` },
    { Icon: Mail, label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
    { Icon: MapPin, label: 'Localização', value: contact.location, href: undefined },
  ];

  return (
    <section id="contato" className="contact-section section">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Entre em Contato"
            title="Vamos Conversar sobre seu Projeto"
            highlight="seu Projeto"
            description="Preencha o formulário e nossa equipe entrará em contato em até 2 horas. O orçamento é sempre gratuito."
          />
        </AnimatedSection>

        <div className="contact-grid">
          <AnimatedSection direction="left" delay={0.1}>
            <div>
              <div className="contact-info-items">
                {contactItems.map(({ Icon, label, value, href }) => (
                  <div key={label} className="contact-info-item">
                    <div className="contact-info-icon"><Icon size={20} /></div>
                    <div>
                      <p className="contact-info-label">{label}</p>
                      {href ? (
                        <a href={href} className="contact-info-value">{value}</a>
                      ) : (
                        <p className="contact-info-value">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`${waLink}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageCircle size={18} /> WhatsApp Direto
                </a>
                <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  <Map size={18} /> Ver no Google Maps
                  <ExternalLink size={14} />
                </a>
              </div>

              <div style={{ marginTop: 28, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="260"
                  style={{ display: 'block', border: 'none' }}
                  loading="lazy"
                  allowFullScreen
                  title="Localização CM Energia"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            {submitted ? (
              <div className="form-success">
                <CheckCircle size={48} color="var(--color-secondary)" style={{ margin: '0 auto 16px' }} />
                <h3>Mensagem enviada!</h3>
                <p>Você será redirecionado ao WhatsApp. Responderemos em breve.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Nome</label>
                    <input id="name" name="name" type="text" className="form-input" placeholder="Seu nome completo" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Telefone</label>
                    <input id="phone" name="phone" type="tel" className="form-input" placeholder="(92) 9 0000-0000" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" className="form-input" placeholder="seu@email.com" value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="service">Serviço de Interesse</label>
                  <select id="service" name="service" className="form-select" value={form.service} onChange={handleChange} required>
                    <option value="">Selecione um serviço</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Mensagem (opcional)</label>
                  <textarea id="message" name="message" className="form-textarea" placeholder="Conte um pouco sobre seu projeto..." value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <MessageCircle size={20} /> Enviar via WhatsApp
                </button>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                  Ao enviar, você será redirecionado para o WhatsApp · Orçamento 100% gratuito
                </p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
