import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tweets', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.text('content');
    table.bigInteger('user_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tweets');
}
