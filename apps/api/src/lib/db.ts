import knex from 'knex';

export const db = knex({
  client: 'pg',
  connection:
    process.env.DATABASE_URL ??
    'postgres://campus:campus@localhost:5432/campus_map',
});
