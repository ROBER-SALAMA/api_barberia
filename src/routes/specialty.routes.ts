import { Router } from "express";

import {
  getSpecialties,
  getSpecialtyById,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from "../controllers/specialty.controller";

import { validateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", validateJWT, getSpecialties);

router.get("/:id", validateJWT, getSpecialtyById);

router.post("/", validateJWT, createSpecialty);

router.put("/:id", validateJWT, updateSpecialty);

router.delete("/:id", validateJWT, deleteSpecialty);

export default router;
