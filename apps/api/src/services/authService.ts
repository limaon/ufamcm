import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/usersModel.js';
import { JWT_SECRET } from '../lib/authConfig.js';
import { verifyPassword } from './passwordService.js';

type AuthenticatedUser = {
  id: number;
  name: string;
  email: string;
  role: 'editor' | 'admin';
};

export async function authenticateUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user || !user.active) {
    return null;
  }

  const passwordIsValid = await verifyPassword(password, user.password_hash);

  if (!passwordIsValid) {
    return null;
  }

  const authenticatedUser: AuthenticatedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(
    {
      sub: String(authenticatedUser.id),
      role: authenticatedUser.role,
    },
    JWT_SECRET,
    { expiresIn: '8h' },
  );

  return {
    token,
    user: {
      name: authenticatedUser.name,
      email: authenticatedUser.email,
      role: authenticatedUser.role,
    },
  };
}
