import { Router } from "express";

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller";

import { validateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", validateJWT, getServices);

router.get("/:id", validateJWT, getServiceById);

router.post("/", validateJWT, createService);

router.put("/:id", validateJWT, updateService);

router.delete("/:id", validateJWT, deleteService);

export default router;
