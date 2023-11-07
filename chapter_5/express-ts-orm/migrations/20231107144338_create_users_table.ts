import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.string('email', 30).notNullable();
    table.string('name', 30).notNullable();
    table.text('profile_picture_url');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
