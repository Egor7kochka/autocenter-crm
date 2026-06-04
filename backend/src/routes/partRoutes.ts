import express from "express";

import {
  getParts,
  createPart,
  deletePart,
} from "../controllers/partController.js";

const router = express.Router();

router.get("/", getParts);

router.post("/", createPart);

router.delete("/:id", deletePart);

export default router;