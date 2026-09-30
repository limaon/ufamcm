/**
 * Cria a tabela de elementos geograficos do campus.
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable('campus_features', (table) => {
    table.increments('id').primary();

    table.string('name').notNullable();

    table.string('category').notNullable();

    table.text('description');

    table.string('status').notNullable().defaultTo('pending');

    table.specificType('geometry', 'geometry(Geometry, 4326)').notNullable();

    // Mantido por compatibilidade com bancos migrados; corrigido pela migration 003.
    table.timestamp(true, true);
  });

  await knex.raw(
    `CREATE INDEX campus_features_geometry_gist ON campus_features USING GIST (geometry)`,
  );
};

/**
 * Desfaz a criacao da tabela.
 * @param { import ('knex').Knex } knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('campus_features');
};
