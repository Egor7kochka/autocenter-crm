import express from "express";

import {
  getOrders,
  createOrder,
  updateOrderStatus,
  getLatestOrders,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();


router.get("/", getOrders);

router.post("/", createOrder);

router.get("/latest", getLatestOrders);

router.patch("/:id/status", updateOrderStatus);

router.delete("/:id", deleteOrder);

router.patch(
  "/:id/status",
  updateOrderStatus
);

export default router;
