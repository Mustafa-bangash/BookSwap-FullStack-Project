import { Router } from "express";
import { registerUser, resetPassword, userLogin,userLogOut } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();



router.route("/register").post(registerUser)
router.route("/login").get(userLogin);

router.route("/reset-password").patch(verifyJWT,resetPassword);

router.route("/logout").delete(verifyJWT,userLogOut)
export default router;