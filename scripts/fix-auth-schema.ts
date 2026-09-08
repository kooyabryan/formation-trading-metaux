import { Pool } from "pg";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified boolean NOT NULL DEFAULT false;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS image text;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at timestamp NOT NULL DEFAULT now();
      ALTER TABLE users DROP COLUMN IF EXISTS hashed_password;
    `);
    // name may be nullable from older schema
    await client.query(`
      UPDATE users SET name = COALESCE(name, split_part(email, '@', 1)) WHERE name IS NULL;
      ALTER TABLE users ALTER COLUMN name SET NOT NULL;
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS session (
        id serial PRIMARY KEY,
        expires_at timestamp NOT NULL,
        token text NOT NULL UNIQUE,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        ip_address text,
        user_agent text,
        user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS account (
        id serial PRIMARY KEY,
        account_id text NOT NULL,
        provider_id text NOT NULL,
        user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        access_token text,
        refresh_token text,
        id_token text,
        access_token_expires_at timestamp,
        refresh_token_expires_at timestamp,
        scope text,
        password text,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS verification (
        id serial PRIMARY KEY,
        identifier text NOT NULL,
        value text NOT NULL,
        expires_at timestamp NOT NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );
    `);
    await client.query("COMMIT");
    const cols = await client.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY 1`
    );
    console.log("users columns:", cols.rows.map((r) => r.column_name).join(", "));
    console.log("Auth schema fixed.");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
