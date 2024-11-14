import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import vehiculoRoutes from "./routes/vehiculos.routes.js";
import huellasRouetes from "./routes/huellasDactilares.routes.js";
import configSistemRoutes from "./routes/configuracionesSistema.routes.js";
import registroAccesoRoutes from "./routes/registrosAcceso.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // URL del frontend
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vehiculos", vehiculoRoutes);
app.use("/api/huellas-dactilares", huellasRouetes);
app.use("/api/configuraciones-sistema", configSistemRoutes);
app.use("/api/registros-acceso", registroAccesoRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
