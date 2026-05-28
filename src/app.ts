import express from "express";
import cors from "cors";

import usersRoutes from "./routes/users.routes";
import authRoutes from "./auth/auth.routes";
import specialtyRoutes from "./routes/specialty.routes";
import barberRoutes from "./routes/barber.routes";
import serviceRoutes from "./routes/service.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/specialties", specialtyRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/services", serviceRoutes);

export default app;
