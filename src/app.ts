import express from "express";
import cors from "cors";

import usersRoutes from "./routes/users.routes";
import authRoutes from "./auth/auth.routes";
import barberRoutes from "./routes/barber.routes";
import serviceRoutes from "./routes/service.routes";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/services", serviceRoutes);
app.use('/api/appointments', appointmentRoutes);

export default app;
