import express from 'express';
import { db } from './lib/db.js';

export const app = express();

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/version', (_request, response) => {
  response.json({
    name: 'campus-map-api',
    version: '0.1.0',
  });
});

app.get('/db-health', async (_request, response) => {
  const result = await db.raw('SELECT 1 AS connected');

  response.json({
    database: result.rows[0].connected === 1,
  });
});
