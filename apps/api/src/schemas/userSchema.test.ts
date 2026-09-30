import { createUserSchema, loginSchema } from './userSchema.js';

describe('createUserSchema', () => {
  it('aceita um usuário editor válido', () => {
    const result = createUserSchema.safeParse({
      name: 'Editor do Campus',
      email: 'editor@example.com',
      password: 'senha-segura-123',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.role).toBe('editor');
    }
  });

  it('rejeita email inválido e senha curta', () => {
    const result = createUserSchema.safeParse({
      name: 'Editor',
      email: 'email-invalido',
      password: '123',
    });

    expect(result.success).toBe(false);
  });
});

describe('loginSchema', () => {
  it('aceita credenciais válidas', () => {
    const result = loginSchema.safeParse({
      email: 'editor@example.com',
      password: 'senha-segura-123',
    });

    expect(result.success).toBe(true);
  });
});
