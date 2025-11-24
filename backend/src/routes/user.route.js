import { Router } from "express";
import { registerUser, resetPassword, userLogin } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();



router.route("/register").post(registerUser)
router.route("/login").get(userLogin);

export default router;