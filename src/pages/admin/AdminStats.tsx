import { useState } from 'react';
import { Save } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import type { SiteStats } from '../../types/site';

export default function AdminStats() {
  const { data, updateStats } = useSiteData();
  const [form, setForm] = useState<SiteStats>({ ...data.stats });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const numInput = (field: keyof SiteStats, label: string, suffix?: string) => (
    <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="number"
          min={0}
          value={form[field]}
          onChange={e => setForm(p => ({ ...p, [field]: Number(e.target.value) }))}
          style={{ flex: 1, padding: '12px 14px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', outline: 'none', fontFamily: 'var(--font-title)', textAlign: 'center' }}
        />
        {suffix && <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: 600 }}>{suffix}</span>}
      </div>
      <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: 6 }}>Exibido como: <strong>+{form[field]}{suffix || ''}</strong></p>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Estatísticas</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Atualize os números exibidos na seção de diferenciais da página inicial.</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="admin-stats-grid">
          {numInput('projects', 'Projetos Concluídos')}
          {numInput('clients', 'Clientes Atendidos')}
          {numInput('years', 'Anos de Experiência')}
          {numInput('power', 'Potência Instalada')}
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Unidade da Potência</label>
          <select
            value={form.powerUnit}
            onChange={e => setForm(p => ({ ...p, powerUnit: e.target.value }))}
            style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: 'white', width: 200 }}
          >
            {['kWp', 'MWp', 'kW', 'MW'].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <button
          type="submit"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: saved ? '#00A971' : 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.3s' }}
        >
          <Save size={16} /> {saved ? '✓ Salvo com sucesso!' : 'Salvar Estatísticas'}
        </button>
      </form>
    </div>
  );
}
