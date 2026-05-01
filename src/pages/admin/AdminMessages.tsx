import { useState, useEffect } from 'react';
import { MessageSquare, Trash2, CheckCheck, ExternalLink, Phone, Mail, Clock, Inbox } from 'lucide-react';
import { subscribeToMessages, markMessageRead, deleteMessage, type ContactMessage } from '../../lib/firestoreService';
import { isFirebaseReady } from '../../lib/firebase';

function formatDate(ts: unknown): string {
  if (!ts) return '—';
  try {
    const date = (ts as { toDate: () => Date }).toDate?.() ?? new Date(ts as string);
    return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return '—'; }
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    if (!isFirebaseReady) { setLoading(false); return; }
    const unsub = subscribeToMessages(msgs => {
      setMessages(msgs);
      setLoading(false);
    });
    return unsub;
  }, []);

  const unread = messages.filter(m => !m.read).length;

  const handleOpen = async (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.read && msg.id) await markMessageRead(msg.id).catch(() => {});
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir esta mensagem?')) return;
    await deleteMessage(id).catch(() => {});
    if (selected?.id === id) setSelected(null);
  };

  const handleWhatsApp = (msg: ContactMessage) => {
    const digits = msg.phone.replace(/\D/g, '');
    const phone = digits.startsWith('55') ? digits : `55${digits}`;
    const text = `Olá ${msg.name}! Recebemos sua mensagem sobre "${msg.service}". `;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isFirebaseReady) {
    return (
      <div>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
          Mensagens de Contato
        </h1>
        <div style={{ background: 'white', borderRadius: 12, padding: '48px 32px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
          <Inbox size={48} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.1rem', color: '#475569', marginBottom: 8 }}>Firebase não configurado</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Configure as variáveis de ambiente do Firebase para receber mensagens em tempo real.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', fontWeight: 700, color: '#0F172A' }}>
            Mensagens de Contato
          </h1>
          {unread > 0 && (
            <span style={{ background: '#008ED3', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: 999, padding: '2px 10px' }}>
              {unread} nova{unread > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: 4 }}>
          Mensagens enviadas pelo formulário do site — atualizadas em tempo real
        </p>
      </div>

      {loading ? (
        <div style={{ background: 'white', borderRadius: 12, padding: 48, textAlign: 'center', border: '1px solid #E2E8F0' }}>
          <p style={{ color: '#94A3B8' }}>Carregando mensagens...</p>
        </div>
      ) : messages.length === 0 ? (
        <div style={{ background: 'white', borderRadius: 12, padding: '48px 32px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
          <Inbox size={48} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.1rem', color: '#475569', marginBottom: 8 }}>Nenhuma mensagem ainda</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>As mensagens do formulário de contato aparecerão aqui.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 20 }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleOpen(msg)}
                style={{
                  background: 'white',
                  borderRadius: 10,
                  padding: '14px 16px',
                  border: `1px solid ${selected?.id === msg.id ? '#008ED3' : '#E2E8F0'}`,
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  boxShadow: selected?.id === msg.id ? '0 0 0 3px rgba(0,142,211,0.15)' : 'none',
                  position: 'relative',
                }}
              >
                {!msg.read && (
                  <span style={{
                    position: 'absolute', top: 14, right: 14,
                    width: 8, height: 8, borderRadius: '50%', background: '#008ED3',
                  }} />
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: msg.read ? '#F1F5F9' : 'linear-gradient(135deg,#008ED3,#00A971)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <MessageSquare size={16} color={msg.read ? '#94A3B8' : 'white'} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                      <p style={{ fontWeight: msg.read ? 500 : 700, fontSize: '0.9rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.name}
                      </p>
                      <span style={{ fontSize: '0.72rem', color: '#94A3B8', flexShrink: 0 }}>
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#008ED3', fontWeight: 600, margin: '2px 0' }}>{msg.service}</p>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.message || msg.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '24px', position: 'sticky', top: 24, alignSelf: 'start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>{selected.name}</h2>
                  <span style={{ display: 'inline-block', marginTop: 4, background: 'rgba(0,142,211,0.1)', color: '#008ED3', fontSize: '0.78rem', fontWeight: 600, borderRadius: 6, padding: '2px 10px' }}>
                    {selected.service}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1, padding: 4 }}
                >×</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: '#475569' }}>
                  <Phone size={14} color="#008ED3" /> {selected.phone}
                </div>
                {selected.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: '#475569' }}>
                    <Mail size={14} color="#008ED3" /> {selected.email}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: '#94A3B8' }}>
                  <Clock size={14} /> {formatDate(selected.createdAt)}
                </div>
              </div>

              {selected.message && (
                <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '14px 16px', marginBottom: 20 }}>
                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleWhatsApp(selected)}
                  style={{
                    flex: 1, minWidth: 120,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    background: '#25D366', color: 'white',
                    border: 'none', borderRadius: 8, padding: '10px 16px',
                    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  <ExternalLink size={14} /> Responder no WhatsApp
                </button>
                {!selected.read && (
                  <button
                    onClick={() => selected.id && markMessageRead(selected.id).catch(() => {})}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: '#F1F5F9', color: '#475569',
                      border: 'none', borderRadius: 8, padding: '10px 14px',
                      fontSize: '0.85rem', cursor: 'pointer',
                    }}
                  >
                    <CheckCheck size={14} /> Lida
                  </button>
                )}
                <button
                  onClick={() => selected.id && handleDelete(selected.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: '#FEF2F2', color: '#EF4444',
                    border: 'none', borderRadius: 8, padding: '10px 14px',
                    fontSize: '0.85rem', cursor: 'pointer',
                  }}
                >
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
