import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Save, X, Upload, MapPin } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { generateId, resizeImage } from '../../utils/imageUtils';
import { projectCategories } from '../../data/projects';
import type { SiteProject } from '../../types/site';

const emptyProject = (): SiteProject => ({
  id: generateId(), title: '', category: 'Energia Solar', description: '', location: '', image: '', power: '',
});

function ProjectForm({ project, onSave, onCancel }: { project: SiteProject; onSave: (p: SiteProject) => void; onCancel: () => void }) {
  const [form, setForm] = useState<SiteProject>({ ...project });
  const [urlMode, setUrlMode] = useState(!project.image.startsWith('data:'));
  const imgRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await resizeImage(file, 900, 0.82);
    setForm(p => ({ ...p, image: base64 }));
    e.target.value = '';
  };

  const field = (key: keyof SiteProject, label: string, multiline = false, type = 'text') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {multiline ? (
        <textarea value={form[key] as string} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} rows={3} style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
      ) : (
        <input type={type} value={form[key] as string} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', outline: 'none' }} />
      )}
    </div>
  );

  return (
    <div style={{ background: '#F8FAFC', border: '1.5px solid #008ED3', borderRadius: 14, padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {field('title', 'Título do Projeto')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categoria</label>
          <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', outline: 'none', background: 'white' }}>
            {projectCategories.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {field('location', 'Localização (ex: Boa Vista – RR)')}
        {field('power', 'Potência (ex: 8,4 kWp) – opcional')}
      </div>
      <div style={{ marginTop: 14 }}>{field('description', 'Descrição', true)}</div>

      <div style={{ marginTop: 14 }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>Imagem do Projeto</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <button type="button" onClick={() => setUrlMode(true)} style={{ padding: '6px 14px', borderRadius: 6, border: `1.5px solid ${urlMode ? '#008ED3' : '#E2E8F0'}`, background: urlMode ? '#EFF6FF' : 'white', color: urlMode ? '#008ED3' : '#64748B', fontSize: '0.8rem', cursor: 'pointer', fontWeight: urlMode ? 700 : 400 }}>URL</button>
          <button type="button" onClick={() => setUrlMode(false)} style={{ padding: '6px 14px', borderRadius: 6, border: `1.5px solid ${!urlMode ? '#008ED3' : '#E2E8F0'}`, background: !urlMode ? '#EFF6FF' : 'white', color: !urlMode ? '#008ED3' : '#64748B', fontSize: '0.8rem', cursor: 'pointer', fontWeight: !urlMode ? 700 : 400 }}>Upload</button>
        </div>
        {urlMode ? (
          <input type="url" placeholder="https://exemplo.com/imagem.jpg" value={form.image.startsWith('data:') ? '' : form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', outline: 'none' }} />
        ) : (
          <div>
            <button type="button" onClick={() => imgRef.current?.click()} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', border: '1.5px dashed #CBD5E1', borderRadius: 8, background: 'white', color: '#475569', fontSize: '0.875rem', cursor: 'pointer' }}>
              <Upload size={15} /> Selecionar imagem
            </button>
            <input ref={imgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
          </div>
        )}
        {form.image && (
          <img src={form.image} alt="preview" style={{ marginTop: 12, width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8 }} />
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button type="button" onClick={() => { if (form.title && form.description && form.image) onSave(form); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
          <Save size={14} /> Salvar Projeto
        </button>
        <button type="button" onClick={onCancel} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: 'white', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: '0.875rem', cursor: 'pointer' }}>
          <X size={14} /> Cancelar
        </button>
      </div>
    </div>
  );
}

export default function AdminProjects() {
  const { data, addProject, updateProject, removeProject } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newProject, setNewProject] = useState<SiteProject>(emptyProject);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Projetos</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Gerencie o portfólio de projetos exibidos no site.</p>
        </div>
        <button onClick={() => { setAdding(true); setNewProject(emptyProject()); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg,#008ED3,#00A971)', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
          <Plus size={16} /> Adicionar Projeto
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {adding && (
          <ProjectForm project={newProject} onSave={(p) => { addProject(p); setAdding(false); }} onCancel={() => setAdding(false)} />
        )}

        {data.projects.map(project => (
          editingId === project.id ? (
            <ProjectForm key={project.id} project={project} onSave={(p) => { updateProject(p.id, p); setEditingId(null); }} onCancel={() => setEditingId(null)} />
          ) : (
            <div key={project.id} style={{ background: 'white', borderRadius: 12, padding: '14px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src={project.image} alt={project.title} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, flexShrink: 0, background: '#E6F4FC' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-title)', fontSize: '0.875rem', color: '#0F172A', marginBottom: 2 }}>{project.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', padding: '2px 8px', background: '#EFF6FF', color: '#008ED3', borderRadius: 999, fontWeight: 600 }}>{project.category}</span>
                  {project.location && <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.75rem', color: '#94A3B8' }}><MapPin size={11} />{project.location}</span>}
                  {project.power && <span style={{ fontSize: '0.72rem', color: '#00A971', fontWeight: 600 }}>{project.power}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => setEditingId(project.id)} style={{ padding: '7px 12px', background: '#EFF6FF', color: '#008ED3', border: 'none', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem' }}>
                  <Pencil size={13} /> Editar
                </button>
                <button onClick={() => { if (confirm('Remover este projeto?')) removeProject(project.id); }} style={{ padding: '7px 12px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem' }}>
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
