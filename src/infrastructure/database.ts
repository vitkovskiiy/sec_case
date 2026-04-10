import { Pool } from "pg";
import 'dotenv/config';

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  max: 30,
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Error while creating Pool [database]', err);
  process.exit(-1);
});

