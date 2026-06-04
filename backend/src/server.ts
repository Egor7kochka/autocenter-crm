import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { pool } from "./config/db.js";
import clientRoutes from "./routes/clientRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import partRoutes from "./routes/partRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/parts", partRoutes);

app.use("/api/clients", clientRoutes);


app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected 🚀",
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Database error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend works 🚀",
  });
});
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/orders", orderRoutes);