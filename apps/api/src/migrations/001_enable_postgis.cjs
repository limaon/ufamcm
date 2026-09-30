/**
 * @param { import ('knex').Knex } knex
 */
exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS postgis');
};

/**
 * @param { import ('knex').Knex } knex
 */
// A extensao pode existir antes da aplicacao e ser usada por outras extensoes
// (como postgis_topology na imagem Docker). O rollback remove as tabelas da
// aplicacao, mas nao assume propriedade sobre essa infraestrutura compartilhada.
exports.down = async function () {};
