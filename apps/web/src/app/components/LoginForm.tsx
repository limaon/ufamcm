'use client';

import { type FormEvent, useState } from 'react';
import type { AuthResponse } from '@campus-map/shared';
import { apiRequest, ApiClientError } from '../../lib/apiClient';
import { apiUrl } from '../session';

type LoginFormProps = {
  idPrefix: string;
  legend: string;
  disabled?: boolean;
  onAuthenticated: (authentication: AuthResponse) => void | Promise<void>;
};

export default function LoginForm({
  idPrefix,
  legend,
  disabled = false,
  onAuthenticated,
}: LoginFormProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setError('');
    try {
      const authentication = await apiRequest<AuthResponse>(
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
      await onAuthenticated(authentication);
      form.reset();
    } catch (cause) {
      setError(
        cause instanceof ApiClientError && cause.status === 401
          ? 'Credenciais inválidas.'
          : cause instanceof Error
            ? cause.message
            : 'Erro de conexão.',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {error && <p role="alert">{error}</p>}
      <form onSubmit={login}>
        <fieldset
          disabled={disabled || busy}
          style={{ display: 'grid', gap: 8 }}
        >
          <legend>{legend}</legend>
          <label htmlFor={`${idPrefix}-email`}>Email</label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="username"
            required
          />
          <label htmlFor={`${idPrefix}-password`}>Senha</label>
          <input
            id={`${idPrefix}-password`}
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <button type="submit">Entrar</button>
        </fieldset>
      </form>
    </>
  );
}
