import { Router } from "express";
import {
  createVehiculo,
  getVehiculos,
  updateVehiculo,
  deleteVehiculo,
} from "../controllers/vehiculos.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
  createVehiculoValidator,
  updateVehiculoValidator,
} from "../validators/vehiculos.validator.js";

const router = Router();

router.post(
  "/",
  [verifyToken, isAdmin, createVehiculoValidator, validateRequest],
  createVehiculo
);

router.get("/", verifyToken, getVehiculos);

router.put(
  "/:id",
  [verifyToken, isAdmin, updateVehiculoValidator, validateRequest],
  updateVehiculo
);

router.delete("/:id", [verifyToken, isAdmin], deleteVehiculo);

export default router;