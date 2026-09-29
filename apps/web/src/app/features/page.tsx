'use client';

import Link from 'next/link';
import { type FormEvent, useEffect, useState } from 'react';
import { apiUrl, getToken, saveToken, clearToken } from '../session';

type EditableFeature = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  status: string;
  geometry: { type: string; coordinates: unknown };
};

export default function FeaturesPage() {
  const [token, setToken] = useState<string | null>(null);
  const [features, setFeatures] = useState<EditableFeature[]>([]);
  const [selected, setSelected] = useState<EditableFeature | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  function logout() {
    clearToken();
    setToken(null);
    setFeatures([]);
    setSelected(null);
    setMessage('');
    setError('');
  }

  async function checkResponse(response: Response) {
    if (response.ok) return;
    if (response.status === 401) {
      logout();
      throw new Error('Sessão expirada ou inválida. Entre novamente.');
    }
    if (response.status === 403)
      throw new Error('Você não tem permissão para editar esta feature.');
    if (response.status === 404)
      throw new Error('Feature não encontrada. Atualize a lista.');
    if (response.status === 400)
      throw new Error(
        'Dados inválidos. Verifique os campos e a geometria GeoJSON.',
      );
    throw new Error('Não foi possível concluir a operação. Tente novamente.');
  }

  async function load(accessToken: string, signal?: AbortSignal) {
    const response = await fetch(`${apiUrl}/features/editable`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal,
    });
    if (signal?.aborted) return;
    await checkResponse(response);
    const data = await response.json();
    if (signal?.aborted) return;
    setFeatures(data.features);
    setToken(accessToken);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function restore() {
      try {
        const saved = getToken();
        if (saved) await load(saved, controller.signal);
      } catch {
        if (!controller.signal.aborted)
          setError('Não foi possível restaurar a sessão. Entre novamente.');
      } finally {
        if (!controller.signal.aborted) setBusy(false);
      }
    }
    void restore();
    return () => controller.abort();
  }, []);

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
      saveToken(authentication.token);
      form.reset();
      await load(authentication.token);
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
      await load(token);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro de conexão.');
    } finally {
      setBusy(false);
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !token || busy) return;
    const data = new FormData(event.currentTarget);
    let geometry: unknown;
    setError('');
    setMessage('');
    try {
      geometry = JSON.parse(String(data.get('geometry')));
    } catch {
      setError('Informe um JSON válido para a geometria.');
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`${apiUrl}/features/${selected.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.get('name'),
          category: data.get('category'),
          description: data.get('description') || null,
          geometry,
        }),
      });
      await checkResponse(response);
      const { feature } = await response.json();
      setFeatures((current) =>
        current.map((item) =>
          item.id === selected.id ? { ...item, ...feature, geometry } : item,
        ),
      );
      setSelected(null);
      setMessage(
        'Alterações salvas. A feature está pendente de nova aprovação.',
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
      <h1>Editar features</h1>
      <p>Editor: suas próprias features. Administrador: todas as features.</p>
      {error && <p role="alert">{error}</p>}
      <p role="status">{busy ? 'Processando...' : message}</p>
      {!token ? (
        <form onSubmit={login}>
          <fieldset disabled={busy} style={{ display: 'grid', gap: 8 }}>
            <legend>Entrar para editar</legend>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
            />
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <button>Entrar</button>
          </fieldset>
        </form>
      ) : (
        <>
          <button disabled={busy} onClick={refresh}>
            Atualizar lista
          </button>{' '}
          <button disabled={busy} onClick={logout}>
            Sair
          </button>
          {selected ? (
            <form key={selected.id} onSubmit={save}>
              <h2>Editar: {selected.name}</h2>
              <p>
                Salvar retorna a feature para pendente e remove a revisão
                anterior.
              </p>
              <fieldset disabled={busy} style={{ display: 'grid', gap: 8 }}>
                <legend>Dados da feature</legend>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  name="name"
                  defaultValue={selected.name}
                  required
                />
                <label htmlFor="category">Categoria</label>
                <input
                  id="category"
                  name="category"
                  defaultValue={selected.category}
                  required
                />
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={selected.description ?? ''}
                />
                <label htmlFor="geometry">Geometria (GeoJSON)</label>
                <textarea
                  id="geometry"
                  name="geometry"
                  rows={8}
                  defaultValue={JSON.stringify(selected.geometry, null, 2)}
                  required
                />
                <p>
                  Point, LineString ou Polygon; coordenadas em longitude e
                  latitude.
                </p>
                <button type="submit">Salvar alterações</button>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setError('');
                  }}
                >
                  Cancelar
                </button>
              </fieldset>
            </form>
          ) : (
            <section aria-label="Features editáveis">
              {!features.length && (
                <p>Nenhuma feature disponível para edição.</p>
              )}
              {features.map((feature) => (
                <article
                  key={feature.id}
                  aria-label={feature.name}
                  style={{
                    border: '1px solid #ccc',
                    padding: 16,
                    marginTop: 16,
                  }}
                >
                  <h2>{feature.name}</h2>
                  <p>
                    Categoria: {feature.category} — Status: {feature.status}
                  </p>
                  <p>{feature.description}</p>
                  <button
                    disabled={busy}
                    onClick={() => {
                      setSelected(feature);
                      setMessage('');
                      setError('');
                    }}
                  >
                    Editar
                  </button>
                </article>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}
