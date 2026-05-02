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
    <div style={{ background: 'white', borderRadius: 12, padding: '20px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 }}>
      <label style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', lineHeight: 1.3 }}>{label}</label>
      <input
        type="number"
        min={0}
        value={form[field]}
        onChange={e => setForm(p => ({ ...p, [field]: Number(e.target.value) }))}
        style={{ width: '100%', padding: '8px 4px', border: 'none', borderBottom: '2px solid #E2E8F0', borderRadius: 0, fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', outline: 'none', fontFamily: 'var(--font-title)', textAlign: 'center', background: 'transparent', transition: 'border-color 0.2s' }}
        onFocus={e => e.target.style.borderColor = '#008ED3'}
        onBlur={e => e.target.style.borderColor = '#E2E8F0'}
      />
      {suffix && <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>{suffix}</span>}
      <p style={{ fontSize: '0.72rem', color: '#CBD5E1', margin: 0 }}>exibido como <strong style={{ color: '#94A3B8' }}>+{form[field]}{suffix || ''}</strong></p>
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
            style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: 'white', width: 100 }}
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
