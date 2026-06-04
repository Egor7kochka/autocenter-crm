import type {
  Request,
  Response,
} from "express";

import { pool } from "../config/db.js";

export const getParts = async (
  req: Request,
  res: Response
) => {
  const result = await pool.query(`
    SELECT *
    FROM parts
    ORDER BY id DESC
  `);

  res.json(result.rows);
};

export const createPart = async (
  req: Request,
  res: Response
) => {
  const {
    name,
    quantity,
    price,
    supplier,
  } = req.body;

  const result = await pool.query(
    `
    INSERT INTO parts
    (name, quantity, price, supplier)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      name,
      quantity,
      price,
      supplier,
    ]
  );

  res.json(result.rows[0]);
};
export const deletePart = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM parts WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete part",
    });
  }
};