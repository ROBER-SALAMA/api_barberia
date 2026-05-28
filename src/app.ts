import express from "express";
import cors from "cors";

import usersRoutes from "./routes/users.routes";
import authRoutes from "./auth/auth.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use('/api/auth', authRoutes);

export default app;
    