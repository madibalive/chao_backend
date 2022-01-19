import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('messages', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('localKey').notNullable();
    table.string('from').notNullable();
    table.string('to').notNullable();
    table.string('content').nullable().defaultTo('');
    table.boolean('confirmed').defaultTo(false);
    table.string('localDate').nullable();
    table.timestamps(true, true);
    // table.foreign('role').references('name').inTable('roles');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('messages');
};
