import "dotenv/config";
import { pool } from "./config/db.js";

async function createOrdersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,

      client_id INTEGER NOT NULL REFERENCES clients(id),

      title VARCHAR(255) NOT NULL,

      description TEXT,

      status VARCHAR(50) DEFAULT 'new',

      price DECIMAL(10,2) DEFAULT 0,

      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("Orders table created 🚀");
  process.exit();
}

createOrdersTable();