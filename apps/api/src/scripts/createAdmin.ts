import { db } from '../lib/db.js';
import { bootstrapAdmin } from '../services/bootstrapAdminService.js';

async function main() {
  try {
    const user = await bootstrapAdmin({
      name: process.env.ADMIN_NAME ?? '',
      email: process.env.ADMIN_EMAIL ?? '',
      password: process.env.ADMIN_PASSWORD ?? '',
    });
    console.log(`Administrador criado: ${user.email} (id ${user.id}).`);
  } catch (error) {
    // Não imprimir erros SQL, pois podem conter parâmetros sensíveis.
    const message =
      error instanceof Error &&
      (error.message.startsWith('Informe nome') ||
        error.message.startsWith('Email já cadastrado'))
        ? error.message
        : 'Não foi possível criar o administrador. Verifique a conexão e as migrations.';
    console.error(message);
    process.exitCode = 1;
  } finally {
    delete process.env.ADMIN_PASSWORD;
    await db.destroy();
  }
}

void main();
