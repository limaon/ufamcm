import { Router } from 'express';
import { loginSchema } from '../schemas/userSchema.js';
import { authenticateUser } from '../services/authService.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

export const authRoutes = Router();

authRoutes.post('/login', async (request, response) => {
  const parsed = loginSchema.safeParse(request.body);
  if (!parsed.success) {
    response
      .status(400)
      .json({ error: 'Dados inválidos', details: parsed.error.issues });
    return;
  }
  const authentication = await authenticateUser(
    parsed.data.email,
    parsed.data.password,
  );
  if (!authentication) {
    response.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }
  response.json(authentication);
});

authRoutes.get('/me', requireAuth, (request, response) => {
  response.json({ user: request.auth! });
});
