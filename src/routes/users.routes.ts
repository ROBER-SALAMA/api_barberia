import { Router } from "express";
import { getUsers, createUser } from "../controllers/users.controller";
import { validateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get("/", validateJWT, getUsers);

router.post("/", createUser);

export default router;
