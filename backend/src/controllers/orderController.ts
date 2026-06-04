import type { Request, Response } from "express";
import { pool } from "../config/db.js";

export const getOrders = async (
  req: Request,
  res: Response
) => {
  const result = await pool.query(`
    SELECT
      o.*,
      c.full_name
    FROM orders o
    JOIN clients c
      ON c.id = o.client_id
    ORDER BY o.id DESC
  `);
  res.json(result.rows);
};

export const createOrder = async (
  req: Request,
  res: Response
) => {
  const {
    client_id,
    title,
    description,
    price,
  } = req.body;

  const result = await pool.query(
    `
      INSERT INTO orders
      (
        client_id,
        title,
        description,
        price
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
    `,
    [
      client_id,
      title,
      description,
      price,
    ]
  );

  res.json(result.rows[0]);
};
export const updateOrderStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update status",
    });
  }
};
export const getLatestOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(`
      SELECT
        o.*,
        c.full_name
      FROM orders o
      JOIN clients c ON c.id = o.client_id
      ORDER BY o.id DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch latest orders",
    });
  }
};
export const deleteOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM orders WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete order",
    });
  }
};