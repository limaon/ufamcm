import { z } from 'zod';

const emailSchema = z.string().trim().email();

export const createUserSchema = z.object({
  name: z.string().trim().min(1),
  email: emailSchema,
  password: z.string().min(8),
  role: z.enum(['editor', 'admin']).default('editor'),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
