/**
 * Adiciona os metadados de curadoria das features.
 *
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('campus_features', (table) => {
    table
      .integer('reviewed_by')
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.timestamp('reviewed_at').nullable();
    table.text('rejection_reason').nullable();
  });

  await knex.raw(`
    ALTER TABLE campus_features
    ADD CONSTRAINT campus_features_status_check
    CHECK (status IN ('pending', 'approved', 'rejected'))
  `);
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {
  await knex.raw(
    'ALTER TABLE campus_features DROP CONSTRAINT campus_features_status_check',
  );

  await knex.schema.alterTable('campus_features', (table) => {
    table.dropColumn('reviewed_by');
    table.dropColumn('reviewed_at');
    table.dropColumn('rejection_reason');
  });
};
