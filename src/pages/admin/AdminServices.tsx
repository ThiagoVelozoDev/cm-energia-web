import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Star } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { generateId } from '../../utils/imageUtils';
import type { SiteService } from '../../types/site';

const EMOJI_OPTIONS = ['☀️','⚡','🔋','🔌','🔧','🏭','📐','📋','🛡️','🌿','💡','🔩','⚙️','🏗️','🏢','📊','🛠️','🔆','🌍','💎'];

const emptyService = (): SiteService => ({
  id: generateId(), emoji: '⚡', title: '', description: '', featured: false,
});

function ServiceForm({ service, onSave, onCancel }: { service: SiteService; onSave: (s: SiteService) => void; onCancel: () => void }) {
  const [form, setForm] = useState<SiteService>({ ...service });
  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <div style={{ background: '#F8FAFC', border: '1.5px solid #008ED3', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowEmojis(p => !p)}
              style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg,#008ED3,#00A971)', border: 'none', fontSize: '1.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Selecionar ícone"
            >
              {form.emoji}
            </button>
            {showEmojis && (
              <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 50, background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', width: 200, marginTop: 4 }}>
                {EMOJI_OPTIONS.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => { setForm(p => ({ ...p, emoji })); setShowEmojis(false); }}
                    style={{ width: 32, height: 32, borderRadius: 6, border: form.emoji === emoji ? '2px solid #008ED3' : '2px solid transparent', fontSize: '1.1rem', cursor: 'pointer', background: form.emoji === emoji ? '#EFF6FF' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 200 }}>
            <input
              placeholder="Título do serviço"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              required
              style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', fontFamily: 'var(--font-title)' }}
            />
            <textarea
              placeholder="Descrição do serviço..."
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              rows={3}
              required
              style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: '#475569', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} />
              <Star size={14} color="#FFB800" /> Serviço em destaque (card grande)
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            onClick={() => { if (form.title && form.description) onSave(form); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
          >
            <Save size={14} /> Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'white', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', cursor: 'pointer' }}
          >
            <X size={14} /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminServices() {
  const { data, addService, updateService, removeService } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newService, setNewService] = useState<SiteService>(emptyService);

  const handleAdd = (s: SiteService) => {
    addService(s);
    setAdding(false);
    setNewService(emptyService());
  };

  const handleUpdate = (s: SiteService) => {
    updateService(s.id, s);
    setEditingId(null);
  };

  const handleRemove = (id: string) => {
    if (confirm('Remover este serviço?')) removeService(id);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Serviços</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Gerencie os serviços exibidos na seção "O que fazemos".</p>
        </div>
        <button
          onClick={() => { setAdding(true); setNewService(emptyService()); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Adicionar Serviço
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {adding && (
          <ServiceForm
            service={newService}
            onSave={handleAdd}
            onCancel={() => setAdding(false)}
          />
        )}

        {data.services.map(service => (
          editingId === service.id ? (
            <ServiceForm
              key={service.id}
              service={service}
              onSave={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div key={service.id} className="admin-service-row">
              <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{service.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                  <p style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#0F172A', fontWeight: 700 }}>{service.title}</p>
                  {service.featured && <span style={{ fontSize: '0.65rem', padding: '2px 8px', background: '#FEF9C3', color: '#CA8A04', borderRadius: 999, fontWeight: 600 }}>DESTAQUE</span>}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748B', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{service.description}</p>
              </div>
              <div className="admin-service-actions">
                <button onClick={() => setEditingId(service.id)} style={{ padding: '7px 12px', background: '#EFF6FF', color: '#008ED3', border: 'none', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem' }}>
                  <Pencil size={13} /> Editar
                </button>
                <button onClick={() => handleRemove(service.id)} style={{ padding: '7px 12px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem' }}>
                  <Trash2 size={13} /> Remover
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
