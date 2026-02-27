import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

/**
 * DB Service
 * Thin wrapper around pg pool
 */
export const db = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};

export default db;
