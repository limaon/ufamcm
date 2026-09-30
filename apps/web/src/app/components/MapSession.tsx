'use client';

import { clearToken, saveToken, useSessionToken } from '../session';
import LoginForm from './LoginForm';

export default function MapSession() {
  const token = useSessionToken();
  return (
    <section aria-label="Sessão do mapa">
      {token ? (
        <>
          <p>Sessão ativa para contribuir.</p>
          <button onClick={clearToken}>Sair</button>
        </>
      ) : (
        <LoginForm
          idPrefix="map"
          legend="Entre para salvar contribuições"
          onAuthenticated={({ token }) => saveToken(token)}
        />
      )}
    </section>
  );
}
