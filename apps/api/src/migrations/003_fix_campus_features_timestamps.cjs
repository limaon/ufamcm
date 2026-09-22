/**
 * Corrige as colunas de data da tabela campus_features.
 *
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('campus_features', (table) => {
    table.dropColumn('true');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('campus_features', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.timestamp('true');
  });
};
