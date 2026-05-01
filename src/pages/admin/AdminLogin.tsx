import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Lock, User, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isFirebaseReady } from '../../lib/firebase';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(form.username, form.password);
    setLoading(false);
    if (ok) navigate('/admin/dashboard');
    else setError(isFirebaseReady ? 'E-mail ou senha incorretos.' : 'Usuário ou senha incorretos.');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A0E13 0%, #0E457F 60%, #0055A3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'white', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 420, boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #008ED3, #00A971)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Zap size={28} color="white" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', color: '#0A0E13', marginBottom: 6 }}>CM ENERGIA</h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Painel Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isFirebaseReady ? 'E-mail' : 'Usuário'}
            </label>
            <div style={{ position: 'relative' }}>
              {isFirebaseReady
                ? <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                : <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              }
              <input
                type={isFirebaseReady ? 'email' : 'text'}
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px 12px 40px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.9375rem', outline: 'none', background: '#F8FAFC', color: '#0F172A', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#008ED3'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                placeholder={isFirebaseReady ? 'admin@cmenergia.com.br' : 'admin'}
                required
                autoComplete={isFirebaseReady ? 'email' : 'username'}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                style={{ width: '100%', padding: '12px 44px 12px 40px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: '0.9375rem', outline: 'none', background: '#F8FAFC', color: '#0F172A', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#008ED3'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', padding: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ background: 'linear-gradient(135deg, #008ED3, #00A971)', color: 'white', border: 'none', borderRadius: 10, padding: '14px', fontSize: '0.9375rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s', marginTop: 4 }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {!isFirebaseReady && (
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.8rem', color: '#94A3B8' }}>
            Credenciais padrão: admin / cmenergia@2024
          </p>
        )}
      </div>
    </div>
  );
}
