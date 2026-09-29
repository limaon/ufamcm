'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiUrl, getToken, clearToken } from '../session';
import GeometryPreview from '../components/GeometryPreview';
import type { EditableCampusFeature } from '@campus-map/shared';

type PendingFeature = EditableCampusFeature;

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [features, setFeatures] = useState<PendingFeature[]>([]);
  const [reasons, setReasons] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [restoringSession, setRestoringSession] = useState(true);

  async function checkResponse(response: Response) {
    if (response.ok) return;
    if (response.status === 401) {
      clearToken();
      setToken(null);
      setFeatures([]);
      setLoaded(false);
      router.replace('/admin/login');
      throw new Error('Sessão inválida ou expirada. Entre novamente.');
    }
    if (response.status === 403) {
      setToken(null);
      setFeatures([]);
      throw new Error('Acesso restrito a administradores.');
    }
    throw new Error('Não foi possível concluir a operação. Tente novamente.');
  }

  async function loadPending(accessToken: string) {
    const response = await fetch(`${apiUrl}/admin/features/pending`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    await checkResponse(response);
    const data = await response.json();
    setFeatures(data.features);
    setLoaded(true);
  }

  useEffect(() => {
    const savedToken = getToken();

    if (!savedToken) {
      setRestoringSession(false);
      router.replace('/admin/login');
      return;
    }

    setToken(savedToken);
    loadPending(savedToken)
      .catch((cause) => {
        setError(cause instanceof Error ? cause.message : 'Erro de conexão.');
      })
      .finally(() => {
        setRestoringSession(false);
      });
  }, [router]);

  function logout() {
    clearToken();
    setToken(null);
    setFeatures([]);
    setLoaded(false);
    setReasons({});
    setError('');
    setMessage('');
    router.replace('/admin/login');
  }

  async function refresh() {
    if (!token) return;
    setBusy(true);
    setError('');
    try {
      await loadPending(token);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro de conexão.');
    } finally {
      setBusy(false);
    }
  }

  async function review(id: number, decision: 'approve' | 'reject') {
    if (!token || busy) return;
    const reason = (reasons[id] ?? '').trim();
    if (decision === 'reject' && !reason) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch(
        `${apiUrl}/admin/features/${id}/${decision}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: decision === 'reject' ? JSON.stringify({ reason }) : undefined,
        },
      );
      await checkResponse(response);
      setFeatures((current) => current.filter((feature) => feature.id !== id));
      setMessage(
        decision === 'approve' ? 'Feature aprovada.' : 'Feature rejeitada.',
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro de conexão.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 800, margin: '24px auto', padding: 16 }}>
      <Link href="/">Voltar ao mapa</Link>
      {' · '}
      <Link href="/features">Editar features</Link>
      <h1>Curadoria administrativa</h1>
      {error && <p role="alert">{error}</p>}
      <p role="status">{busy ? 'Processando...' : message}</p>
      {restoringSession ? (
        <p>Restaurando sessão...</p>
      ) : !token ? (
        <p>
          <Link href="/admin/login">Entrar como administrador</Link>
        </p>
      ) : (
        <section aria-label="Features pendentes">
          <h2>Features pendentes</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button disabled={busy} onClick={refresh}>
              Atualizar lista
            </button>
            <button disabled={busy} onClick={logout}>
              Sair
            </button>
          </div>
          {loaded && !features.length && <p>Nenhuma feature pendente.</p>}
          {features.map((feature) => (
            <article
              key={feature.id}
              aria-label={feature.name}
              style={{ border: '1px solid #ccc', padding: 16, marginTop: 16 }}
            >
              <h3>{feature.name}</h3>
              <p>Categoria: {feature.category}</p>
              {feature.description && <p>{feature.description}</p>}
              <GeometryPreview
                geometry={feature.geometry}
                category={feature.category}
              />
              <fieldset disabled={busy} style={{ display: 'grid', gap: 8 }}>
                <legend>Decisão da revisão</legend>
                <button onClick={() => review(feature.id, 'approve')}>
                  Aprovar
                </button>
                <label htmlFor={`reason-${feature.id}`}>Justificativa</label>
                <textarea
                  id={`reason-${feature.id}`}
                  value={reasons[feature.id] ?? ''}
                  onChange={(event) =>
                    setReasons({ ...reasons, [feature.id]: event.target.value })
                  }
                />
                <button
                  disabled={!(reasons[feature.id] ?? '').trim()}
                  onClick={() => review(feature.id, 'reject')}
                >
                  Rejeitar
                </button>
              </fieldset>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
