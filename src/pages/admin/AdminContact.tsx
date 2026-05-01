import { useState } from 'react';
import { Save, MapPin, Phone, Mail, MessageCircle, Map } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import type { SiteContact } from '../../types/site';

export default function AdminContact() {
  const { data, updateContact } = useSiteData();
  const [form, setForm] = useState<SiteContact>({ ...data.contact });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fieldIcon = (Icon: React.ElementType, color: string) => (
    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={16} color={color} />
    </div>
  );

  const textField = (key: keyof SiteContact, label: string, placeholder: string, Icon?: React.ElementType, iconColor = '#008ED3', hint?: string) => (
    <div style={{ background: 'white', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        {Icon && fieldIcon(Icon, iconColor)}
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
      </div>
      <input
        type="text"
        value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        placeholder={placeholder}
        style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', outline: 'none' }}
        onFocus={e => (e.target.style.borderColor = '#008ED3')}
        onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
      />
      {hint && <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 6 }}>{hint}</p>}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Contato e Localização</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Atualize as informações de contato exibidas no site e configure o mapa.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {textField('phone', 'Telefone / WhatsApp (exibição)', '(95) 9 0000-0000', Phone, '#008ED3', 'Formato exibido no site, ex: (95) 9 8125-8346')}
          {textField('whatsapp', 'Número WhatsApp (link)', '5595981258346', MessageCircle, '#25D366', 'Apenas números, com DDI. Ex: 5595981258346')}
          {textField('email', 'E-mail', 'contato@cmenergia.com.br', Mail, '#00A971')}
          {textField('location', 'Endereço / Localização', 'Boa Vista – RR, Brasil', MapPin, '#0055A3')}
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            {fieldIcon(Map, '#0055A3')}
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Link "Abrir no Google Maps"</label>
          </div>
          <input
            type="text"
            value={form.mapLinkUrl}
            onChange={e => setForm(p => ({ ...p, mapLinkUrl: e.target.value }))}
            placeholder="https://maps.app.goo.gl/..."
            style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', outline: 'none' }}
          />
          <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 6 }}>Cole o link gerado pelo Google Maps para abrir no aplicativo.</p>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            {fieldIcon(Map, '#0055A3')}
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>URL de Incorporação do Mapa (iframe)</label>
          </div>
          <input
            type="text"
            value={form.mapEmbedUrl}
            onChange={e => setForm(p => ({ ...p, mapEmbedUrl: e.target.value }))}
            placeholder="https://www.google.com/maps/embed?pb=..."
            style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', outline: 'none' }}
          />
          <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 6 }}>
            Opcional. Para obter: no Google Maps → Compartilhar → Incorporar um mapa → copie o <code>src</code> do iframe.
            Se deixar em branco, aparecerá apenas o botão para abrir no mapa.
          </p>
          {form.mapEmbedUrl && (
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: 6, fontWeight: 600 }}>Pré-visualização:</p>
              <iframe
                src={form.mapEmbedUrl}
                width="100%"
                height="200"
                style={{ borderRadius: 8, border: 'none' }}
                loading="lazy"
                allowFullScreen
                title="Mapa pré-visualização"
              />
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: saved ? '#00A971' : 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.3s' }}
          >
            <Save size={16} /> {saved ? '✓ Salvo com sucesso!' : 'Salvar Informações de Contato'}
          </button>
        </div>
      </form>
    </div>
  );
}
