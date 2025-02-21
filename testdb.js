const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function connect() {
  try {
    await client.connect();
    console.log("✅ Connected to Supabase!");
    const res = await client.query("SELECT NOW()");
    console.log(res.rows);
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.end();
  }
}

connect();
