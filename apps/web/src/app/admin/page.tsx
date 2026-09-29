'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';

type PendingFeature = {
  id: number;
  name: string;
  category: string;
  description: string | null;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [features, setFeatures] = useState<PendingFeature[]>([]);
  const [reasons, setReasons] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function checkResponse(response: Response) {
    if (response.ok) return;
    if (response.status === 401) {
      setToken(null);
      setFeatures([]);
      setLoaded(false);
      throw new Error('Sessão inválida ou expirada. Entre novamente.');
    }
    if (response.status === 403)
      throw new Error('Acesso restrito a administradores.');
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

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      });
      if (response.status === 401) throw new Error('Credenciais inválidas.');
      await checkResponse(response);
      const authentication = await response.json();
      if (authentication.user.role !== 'admin') {
        throw new Error('Acesso restrito a administradores.');
      }
      form.reset();
      setToken(authentication.token);
      await loadPending(authentication.token);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro de conexão.');
    } finally {
      setBusy(false);
    }
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
      <h1>Curadoria administrativa</h1>
      {error && <p role="alert">{error}</p>}
      <p role="status">{busy ? 'Processando...' : message}</p>
      {!token ? (
        <form onSubmit={login}>
          <fieldset disabled={busy} style={{ display: 'grid', gap: 12 }}>
            <legend>Login de administrador</legend>
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
            />
            <label htmlFor="admin-password">Senha</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <button type="submit">Entrar</button>
          </fieldset>
        </form>
      ) : (
        <section aria-label="Features pendentes">
          <h2>Features pendentes</h2>
          <button disabled={busy} onClick={refresh}>
            Atualizar lista
          </button>
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
