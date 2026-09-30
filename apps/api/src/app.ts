import express from 'express';
import cors from 'cors';
import { db } from './lib/db.js';
import { authRoutes } from './routes/authRoutes.js';
import { featureRoutes } from './routes/featureRoutes.js';
import { reviewRoutes } from './routes/reviewRoutes.js';
import {
  errorMiddleware,
  notFoundMiddleware,
} from './middlewares/errorMiddleware.js';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/version', (_request, response) => {
  response.json({ name: 'campus-map-api', version: '0.1.0' });
});

app.get('/db-health', async (_request, response) => {
  const result = await db.raw('SELECT 1 AS connected');
  response.json({ database: result.rows[0].connected === 1 });
});

app.use('/auth', authRoutes);
app.use('/features', featureRoutes);
app.use('/admin/features', reviewRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
