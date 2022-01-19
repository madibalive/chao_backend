import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('blocks', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('from').notNullable();
    table.string('to').notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('blocks');
};
