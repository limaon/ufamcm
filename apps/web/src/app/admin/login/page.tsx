'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiUrl, sessionStorageKey } from '../session';

export default function AdminLoginPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

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

      if (response.status === 401) {
        throw new Error('Credenciais inválidas.');
      }

      if (!response.ok) {
        throw new Error('Não foi possível entrar. Tente novamente.');
      }

      const authentication = await response.json();
      if (authentication.user.role !== 'admin') {
        throw new Error('Acesso restrito a administradores.');
      }

      window.localStorage.setItem(sessionStorageKey, authentication.token);
      router.replace('/admin');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Erro de conexão.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 800, margin: '24px auto', padding: 16 }}>
      <Link href="/">Voltar ao mapa</Link>
      <h1>Login administrativo</h1>
      {error && <p role="alert">{error}</p>}
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
    </main>
  );
}
