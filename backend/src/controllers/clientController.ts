import type { Request, Response } from "express";
import { pool } from "../config/db.js";

export const getClients = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(
      "SELECT * FROM clients ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch clients",
    });
  }
};

export const createClient = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      full_name,
      phone,
      email,
      car_brand,
      car_model,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO clients
      (full_name, phone, email, car_brand, car_model)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        full_name,
        phone,
        email,
        car_brand,
        car_model,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create client",
    });
  }
};
export const deleteClient = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM clients WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
      message: "Client deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete client",
    });
  }
};