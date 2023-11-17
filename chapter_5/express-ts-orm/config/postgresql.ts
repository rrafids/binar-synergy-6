import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const knexInstance = knex({
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

export default knexInstance;
