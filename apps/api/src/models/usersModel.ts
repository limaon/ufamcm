import { db } from '../lib/db.js';

import type { UserRole } from '@campus-map/shared';

type CreateUserRecord = {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};

const userColumns = [
  'id',
  'name',
  'email',
  'password_hash',
  'role',
  'active',
  'created_at',
  'updated_at',
];

export async function createUser(input: CreateUserRecord) {
  const [user] = await db('users')
    .insert({
      name: input.name,
      email: input.email,
      password_hash: input.passwordHash,
      role: input.role,
    })
    .returning(userColumns);

  return user;
}

export async function findUserByEmail(email: string) {
  return db('users').select(userColumns).where({ email }).first();
}
