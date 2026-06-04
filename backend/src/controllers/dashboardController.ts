import type { Request, Response } from "express";
import { pool } from "../config/db.js";

export const getStats = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM clients) AS total_clients,
        (SELECT COUNT(*) FROM orders) AS total_orders,
        (SELECT COUNT(*) FROM orders WHERE status <> 'done') AS active_orders,
        (SELECT COUNT(*) FROM orders WHERE status = 'done') AS completed_orders
    `);

    const row = result.rows[0];

    res.json({
      totalClients: Number(row.total_clients),
      totalOrders: Number(row.total_orders),
      activeOrders: Number(row.active_orders),
      completedOrders: Number(row.completed_orders),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch stats",
    });
  }
};