import knex from 'knex';

const knexInstance = knex({
  client: 'postgresql',
  connection: {
    database: 'twitter_orm',
    user: '',
    password: '',
  },
});

export default knexInstance;
