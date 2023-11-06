import client from 'pg';

const pool = new client.Pool({
  user: '',
  host: 'localhost',
  database: 'twitter',
  password: '',
  port: 5432,
});

export default pool;
