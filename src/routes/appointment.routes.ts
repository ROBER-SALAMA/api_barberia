import { Router } from "express";

import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";

import { validateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", validateJWT, getAppointments);

router.get("/:id", validateJWT, getAppointmentById);

router.post("/", createAppointment);

router.put("/:id", validateJWT, updateAppointment);

router.delete("/:id", validateJWT, deleteAppointment);

export default router;
