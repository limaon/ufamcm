'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { saveToken } from '../../session';
import LoginForm from '../../components/LoginForm';

export default function AdminLoginPage() {
  const router = useRouter();
  return (
    <main style={{ maxWidth: 800, margin: '24px auto', padding: 16 }}>
      <Link href="/">Voltar ao mapa</Link>
      <h1>Login administrativo</h1>
      <LoginForm
        idPrefix="admin"
        legend="Login de administrador"
        onAuthenticated={(authentication) => {
          if (authentication.user.role !== 'admin') {
            throw new Error('Acesso restrito a administradores.');
          }
          saveToken(authentication.token);
          router.replace('/admin');
        }}
      />
    </main>
  );
}
