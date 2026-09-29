import { createUser, findUserByEmail } from '../models/usersModel.js';
import { createUserSchema } from '../schemas/userSchema.js';
import { hashPassword } from './passwordService.js';

export async function bootstrapAdmin(input: {
  name: string;
  email: string;
  password: string;
}) {
  const parsed = createUserSchema.safeParse({ ...input, role: 'admin' });
  if (!parsed.success || Buffer.byteLength(input.password, 'utf8') > 72) {
    throw new Error(
      'Informe nome, email válido e senha com pelo menos 8 caracteres e no máximo 72 bytes.',
    );
  }
  if (await findUserByEmail(parsed.data.email)) {
    throw new Error('Email já cadastrado. Nenhuma conta foi alterada.');
  }
  try {
    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
      role: 'admin',
    });
    return {
      id: user.id as number,
      name: user.name as string,
      email: user.email as string,
    };
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23505'
    ) {
      throw new Error('Email já cadastrado. Nenhuma conta foi alterada.');
    }
    throw error;
  }
}
