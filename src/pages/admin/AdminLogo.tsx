import { useRef } from 'react';
import { Upload, Trash2, Zap } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { resizeImage } from '../../utils/imageUtils';

export default function AdminLogo() {
  const { data, updateLogo } = useSiteData();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await resizeImage(file, 600, 0.92);
    updateLogo(base64);
    e.target.value = '';
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Logotipo</h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Altere o logo exibido na navbar e no footer do site.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '0.95rem', color: '#0F172A', marginBottom: 16 }}>Logo Atual</h2>
          <div style={{ background: '#0A0E13', borderRadius: 12, padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120, marginBottom: 16 }}>
            {data.logo ? (
              <img src={data.logo} alt="Logo atual" style={{ maxHeight: 80, maxWidth: '100%', objectFit: 'contain' }} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Zap size={22} color="#00A971" />
                <div style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', fontWeight: 700, color: 'white', letterSpacing: '0.05em' }}>CM ENERGIA</div>
              </div>
            )}
          </div>
          {data.logo && (
            <button
              onClick={() => updateLogo(null)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 8, fontSize: '0.875rem', cursor: 'pointer' }}
            >
              <Trash2 size={14} /> Remover logo (usar padrão)
            </button>
          )}
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '0.95rem', color: '#0F172A', marginBottom: 8 }}>Enviar Novo Logo</h2>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: 20 }}>Formatos: PNG, JPG, SVG, WebP. Recomendado: fundo transparente (PNG/SVG).</p>

          <div
            onClick={() => inputRef.current?.click()}
            style={{ border: '2px dashed #CBD5E1', borderRadius: 12, padding: '40px 20px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#008ED3')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#CBD5E1')}
          >
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={22} color="#008ED3" />
            </div>
            <div>
              <p style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.9rem' }}>Clique para selecionar</p>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: 4 }}>ou arraste o arquivo aqui</p>
            </div>
          </div>

          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

          <button
            onClick={() => inputRef.current?.click()}
            style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', width: '100%', justifyContent: 'center' }}
          >
            <Upload size={16} /> Selecionar Arquivo
          </button>
        </div>
      </div>
    </div>
  );
}
