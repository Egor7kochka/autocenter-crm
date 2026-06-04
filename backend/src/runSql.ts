import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import { pool } from "./config/db.js";

async function run() {
  try {
    const sql = fs.readFileSync("./src/database.sql", "utf8");

    await pool.query(sql);

    console.log("Tables created successfully 🚀");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

run();