import { useState, useRef } from 'react';
import { Upload, Save } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { resizeImage } from '../../utils/imageUtils';
import type { SiteTeamMember } from '../../types/site';

function TeamMemberForm({ member, onSave }: { member: SiteTeamMember; onSave: (patch: Partial<SiteTeamMember>) => void }) {
  const [form, setForm] = useState({ name: member.name, role: member.role, bio: member.bio, badge: member.badge });
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await resizeImage(file, 700, 0.85);
    onSave({ photo: base64 });
    e.target.value = '';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inp = (field: string, label: string, multiline = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {multiline ? (
        <textarea
          value={form[field as keyof typeof form]}
          onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
          rows={4}
          style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
        />
      ) : (
        <input
          type="text"
          value={form[field as keyof typeof form]}
          onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
          style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.9rem', outline: 'none' }}
        />
      )}
    </div>
  );

  return (
    <div style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <img
            src={member.photo}
            alt={member.name}
            style={{ width: 120, height: 120, borderRadius: 12, objectFit: 'cover', objectPosition: 'top', background: '#E6F4FC', display: 'block' }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: '0.8rem', color: '#475569', cursor: 'pointer', background: 'white', width: '100%', justifyContent: 'center' }}
          >
            <Upload size={13} /> Trocar foto
          </button>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.05rem', color: '#0F172A', marginBottom: 4 }}>{member.name}</h3>
          <p style={{ fontSize: '0.8rem', color: '#008ED3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{member.role}</p>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {inp('name', 'Nome')}
        {inp('role', 'Cargo / Função')}
        {inp('bio', 'Biografia', true)}
        {inp('badge', 'Badge (ex: CREA/RR Nº 000000-D)')}
        <button
          type="submit"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: saved ? '#00A971' : 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.3s', alignSelf: 'flex-start' }}
        >
          <Save size={15} /> {saved ? 'Salvo!' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
}

export default function AdminTeam() {
  const { data, updateTeamMember } = useSiteData();

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Equipe</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Edite as fotos, informações e bios dos membros da equipe exibidos na seção "Quem Somos".</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {data.team.map(member => (
          <TeamMemberForm
            key={member.id}
            member={member}
            onSave={(patch) => updateTeamMember(member.id, patch)}
          />
        ))}
      </div>
    </div>
  );
}
