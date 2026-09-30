/**
 * Relaciona features colaborativas ao usuário que as criou.
 *
 * A coluna permanece nullable para preservar features históricas.
 *
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('campus_features', (table) => {
    table
      .integer('created_by')
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('campus_features', (table) => {
    table.dropColumn('created_by');
  });
};
