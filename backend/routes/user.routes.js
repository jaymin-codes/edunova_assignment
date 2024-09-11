import { Router } from "express";
import {
  getAllUsers,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/getAllUsers").get(getAllUsers);
// router.route("/login").post(loginUser);
// router.route("/logout").post(verifyJWT, logoutUser);

export default router;
