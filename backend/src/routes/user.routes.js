import { Router } from "express";
import {
  createUser,
  getUsers,
  updatePassword,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
  createUserValidator,
  updateUserValidator,
  updatePasswordValidator,
} from "../validators/user.validator.js";

const router = Router();

router.post(
  "/",
  [verifyToken, isAdmin, createUserValidator, validateRequest],
  createUser
);

router.get("/", verifyToken, getUsers);

router.put(
  "/:cedula",
  [verifyToken, isAdmin, updateUserValidator, validateRequest],
  updateUser
);

router.patch(
  "/:cedula/password",
  [verifyToken, isAdmin, updatePasswordValidator, validateRequest],
  updatePassword
);

router.delete("/:cedula", [verifyToken, isAdmin], deleteUser);

export default router;
