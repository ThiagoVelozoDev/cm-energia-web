import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Star } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { generateId } from '../../utils/imageUtils';
import type { SiteTestimonial } from '../../types/site';

const emptyTestimonial = (): SiteTestimonial => ({
  id: generateId(), name: '', city: '', text: '', rating: 5, initials: '', service: 'Energia Solar',
});

const serviceOptions = ['Energia Solar','Projetos Elétricos','Laudos Técnicos','Aterramento e SPDA','Geradores','Subestações','Redes MT','Outros'];

function TestimonialForm({ t, onSave, onCancel }: { t: SiteTestimonial; onSave: (t: SiteTestimonial) => void; onCancel: () => void }) {
  const [form, setForm] = useState<SiteTestimonial>({ ...t });

  const handleNameChange = (name: string) => {
    const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
    setForm(p => ({ ...p, name, initials }));
  };

  return (
    <div style={{ background: '#F8FAFC', border: '1.5px solid #008ED3', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nome do Cliente</label>
          <input value={form.name} onChange={e => handleNameChange(e.target.value)} style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', outline: 'none' }} placeholder="Ex: Carlos Eduardo" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cidade</label>
          <input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', outline: 'none' }} placeholder="Ex: Boa Vista – RR" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Serviço Contratado</label>
          <select value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', outline: 'none', background: 'white' }}>
            {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avaliação</label>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 8 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setForm(p => ({ ...p, rating: n }))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                <Star size={22} fill={n <= form.rating ? '#FFB800' : 'none'} color={n <= form.rating ? '#FFB800' : '#CBD5E1'} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Depoimento</label>
        <textarea value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} rows={4} placeholder="Escreva o depoimento do cliente..." style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="button" onClick={() => { if (form.name && form.text) onSave(form); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
          <Save size={14} /> Salvar
        </button>
        <button type="button" onClick={onCancel} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'white', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', cursor: 'pointer' }}>
          <X size={14} /> Cancelar
        </button>
      </div>
    </div>
  );
}

export default function AdminTestimonials() {
  const { data, addTestimonial, updateTestimonial, removeTestimonial } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newT, setNewT] = useState<SiteTestimonial>(emptyTestimonial);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Depoimentos</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Gerencie os depoimentos de clientes exibidos no site.</p>
        </div>
        <button onClick={() => { setAdding(true); setNewT(emptyTestimonial()); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
          <Plus size={16} /> Adicionar Depoimento
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {adding && <TestimonialForm t={newT} onSave={(t) => { addTestimonial(t); setAdding(false); }} onCancel={() => setAdding(false)} />}

        {data.testimonials.map(t => (
          editingId === t.id ? (
            <TestimonialForm key={t.id} t={t} onSave={(updated) => { updateTestimonial(updated.id, updated); setEditingId(null); }} onCancel={() => setEditingId(null)} />
          ) : (
            <div key={t.id} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#008ED3,#00A971)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--font-title)', fontSize: '0.875rem', flexShrink: 0 }}>
                {t.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 2 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{t.name}</p>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{t.city}</span>
                  <span style={{ color: '#FFB800', fontSize: '0.75rem' }}>{'★'.repeat(t.rating)}</span>
                </div>
                <p style={{ fontSize: '0.825rem', color: '#64748B', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>"{t.text}"</p>
                <span style={{ fontSize: '0.7rem', color: '#008ED3', fontWeight: 600 }}>{t.service}</span>
              </div>
              <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                <button onClick={() => setEditingId(t.id)} style={{ padding: '6px 11px', background: '#EFF6FF', color: '#008ED3', border: 'none', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem' }}>
                  <Pencil size={12} /> Editar
                </button>
                <button onClick={() => { if (confirm('Remover depoimento?')) removeTestimonial(t.id); }} style={{ padding: '6px 11px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem' }}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
