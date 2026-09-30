module.exports = {
  development: {
    client: 'pg',
    connection:
      process.env.DATABASE_URL ??
      'postgres://campus:campus@localhost:5432/campus_map',
    migrations: {
      directory: './src/migrations',
    },
  },
};
