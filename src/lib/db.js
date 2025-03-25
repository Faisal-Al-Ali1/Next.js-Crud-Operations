import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// دالة تنفيذ الاستعلامات العامة
export async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// دوال CRUD المخصصة
export async function getUsers() {
  const { rows } = await query('SELECT * FROM users WHERE is_deleted = false');
  return rows;
}

export async function getUserById(id) {
  const { rows } = await query('SELECT * FROM users WHERE id = $1 AND is_deleted = false', [id]);
  return rows[0];
}

export async function createUser(name, email) {
  const { rows } = await query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return rows[0];
}

export async function updateUser(id, name, email) {
  const { rows } = await query(
    'UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return rows[0];
}

export async function deleteUser(id) {
  const { rows } = await query(
    'UPDATE users SET is_deleted = true, updated_at = NOW() WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
}