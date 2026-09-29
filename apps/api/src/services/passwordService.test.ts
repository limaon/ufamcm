import { hashPassword, verifyPassword } from './passwordService.js';

describe('serviço de senha', () => {
  it('gera um hash diferente da senha original', async () => {
    const password = 'senha-segura-123';
    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(hash).toMatch(/^\$2[aby]\$/);
  });

  it('verifica uma senha correta', async () => {
    const hash = await hashPassword('senha-segura-123');

    await expect(verifyPassword('senha-segura-123', hash)).resolves.toBe(true);
  });

  it('rejeita uma senha incorreta', async () => {
    const hash = await hashPassword('senha-segura-123');

    await expect(verifyPassword('senha-errada', hash)).resolves.toBe(false);
  });
});
