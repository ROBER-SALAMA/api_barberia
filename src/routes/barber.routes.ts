import { Router } from "express";

import {
  getBarbers,
  getBarberById,
  createBarber,
  updateBarber,
  deleteBarber,
} from "../controllers/barber.controller";

import { validateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getBarbers);

router.get("/:id", validateJWT, getBarberById);

router.post("/", validateJWT, createBarber);

router.put("/:id", validateJWT, updateBarber);

router.delete("/:id", validateJWT, deleteBarber);

export default router;
