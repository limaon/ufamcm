'use client';

import Link from 'next/link';
import { type FormEvent, useEffect, useState } from 'react';
import { apiUrl, getToken, saveToken, clearToken } from '../session';
import FeatureEditor from './FeatureEditor';
import LoginForm from '../components/LoginForm';
import type {
  EditableCampusFeature,
  FeatureResponse,
} from '@campus-map/shared';

export default function FeaturesPage() {
  const [token, setToken] = useState<string | null>(null);
  const [features, setFeatures] = useState<EditableCampusFeature[]>([]);
  const [selected, setSelected] = useState<EditableCampusFeature | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [geometryDraft, setGeometryDraft] = useState('');

  function logout() {
    clearToken();
    setToken(null);
    setFeatures([]);
    setSelected(null);
    setGeometryDraft('');
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

  async function loadEditableFeatures(
    accessToken: string,
    signal?: AbortSignal,
  ) {
    const response = await fetch(`${apiUrl}/features/editable`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal,
    });
    if (signal?.aborted) return;
    await checkResponse(response);
    const data: { features: EditableCampusFeature[] } = await response.json();
    if (signal?.aborted) return;
    setFeatures(data.features);
    setToken(accessToken);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function restore() {
      try {
        const saved = getToken();
        if (saved) await loadEditableFeatures(saved, controller.signal);
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

  async function refresh() {
    if (!token) return;
    setBusy(true);
    setError('');
    try {
      await loadEditableFeatures(token);
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
      geometry = JSON.parse(geometryDraft);
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
      const { feature }: FeatureResponse = await response.json();
      setFeatures((current) =>
        current.map((item) => (item.id === selected.id ? feature : item)),
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
        <LoginForm
          idPrefix="edit"
          legend="Entrar para editar"
          disabled={busy}
          onAuthenticated={async ({ token }) => {
            setError('');
            saveToken(token);
            await loadEditableFeatures(token);
          }}
        />
      ) : (
        <>
          <button disabled={busy} onClick={refresh}>
            Atualizar lista
          </button>{' '}
          <button disabled={busy} onClick={logout}>
            Sair
          </button>
          {selected ? (
            <FeatureEditor
              key={selected.id}
              feature={selected}
              busy={busy}
              geometryDraft={geometryDraft}
              onGeometryDraftChange={setGeometryDraft}
              onSubmit={save}
              onCancel={() => {
                setSelected(null);
                setGeometryDraft('');
                setError('');
              }}
            />
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
                      setGeometryDraft(
                        JSON.stringify(feature.geometry, null, 2),
                      );
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
