'use client';

import { type FormEvent, useState } from 'react';
import { apiUrl, clearToken, saveToken, useSessionToken } from '../session';
import { apiRequest } from '../../lib/apiClient';

export default function MapSession() {
  const token = useSessionToken();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setError('');
    try {
      const authentication = await apiRequest<{ token: string }>(
        `${apiUrl}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
          }),
        },
      );
      form.reset();
      saveToken(authentication.token);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro de conexão.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-label="Sessão do mapa">
      {error && <p role="alert">{error}</p>}
      {token ? (
        <>
          <p>Sessão ativa para contribuir.</p>
          <button
            onClick={() => {
              clearToken();
              setError('');
            }}
          >
            Sair
          </button>
        </>
      ) : (
        <form onSubmit={login}>
          <fieldset disabled={busy}>
            <legend>Entre para salvar contribuições</legend>
            <label htmlFor="map-email">Email</label>
            <input
              id="map-email"
              name="email"
              type="email"
              autoComplete="username"
              required
            />
            <label htmlFor="map-password">Senha</label>
            <input
              id="map-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <button>Entrar</button>
          </fieldset>
        </form>
      )}
    </section>
  );
}
