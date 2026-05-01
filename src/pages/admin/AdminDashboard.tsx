import { useState } from 'react';
import { Eye, FolderOpen, Users, MessageSquare, Wrench, Lock } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { data } = useSiteData();
  const { changePassword } = useAuth();
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [pwdMsg, setPwdMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const summary = [
    { Icon: Wrench, label: 'Serviços', count: data.services.length, color: '#008ED3' },
    { Icon: FolderOpen, label: 'Projetos', count: data.projects.length, color: '#00A971' },
    { Icon: MessageSquare, label: 'Depoimentos', count: data.testimonials.length, color: '#0055A3' },
    { Icon: Users, label: 'Membros da Equipe', count: data.team.length, color: '#4E5F75' },
  ];

  const handleChangePwd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.next !== pwd.confirm) { setPwdMsg({ type: 'err', text: 'A nova senha e a confirmação não coincidem.' }); return; }
    if (pwd.next.length < 6) { setPwdMsg({ type: 'err', text: 'A senha deve ter no mínimo 6 caracteres.' }); return; }
    const ok = await changePassword(pwd.current, pwd.next);
    if (ok) { setPwdMsg({ type: 'ok', text: 'Senha alterada com sucesso!' }); setPwd({ current: '', next: '', confirm: '' }); }
    else setPwdMsg({ type: 'err', text: 'Senha atual incorreta.' });
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Dashboard</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Bem-vindo ao painel de administração da CM Energia.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {summary.map(({ Icon, label, count, color }) => (
          <div key={label} style={{ background: 'white', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: `4px solid ${color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: 4 }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-title)', fontSize: '1.75rem', color: '#0F172A' }}>{count}</p>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                <Icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'white', borderRadius: 14, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '0.95rem', color: '#0F172A', marginBottom: 4 }}>Acesso Rápido ao Site</h2>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: 16 }}>Visualize o site no ar após salvar suas alterações.</p>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            <Eye size={16} /> Ver site ao vivo
          </a>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Lock size={16} color="#475569" />
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '0.95rem', color: '#0F172A' }}>Alterar Senha</h2>
          </div>
          <form onSubmit={handleChangePwd} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['current', 'Senha Atual'], ['next', 'Nova Senha'], ['confirm', 'Confirmar Nova Senha']].map(([field, label]) => (
              <input
                key={field}
                type="password"
                placeholder={label}
                value={pwd[field as keyof typeof pwd]}
                onChange={e => setPwd(p => ({ ...p, [field]: e.target.value }))}
                required
                style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', outline: 'none' }}
              />
            ))}
            {pwdMsg && (
              <p style={{ fontSize: '0.8rem', color: pwdMsg.type === 'ok' ? '#00A971' : '#EF4444' }}>{pwdMsg.text}</p>
            )}
            <button type="submit" style={{ background: '#0F172A', color: 'white', border: 'none', borderRadius: 8, padding: '10px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
              Salvar Nova Senha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
