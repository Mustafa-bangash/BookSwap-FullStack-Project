import { Router } from "express";
import { registerUser, resetPassword, userLogin } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();



router.route("/register").post(registerUser)
<<<<<<< HEAD
router.route("/login").get(userLogin);

=======
router.route("/login").post(userLogin);
router.route("/reset-password").patch(verifyJWT,resetPassword);
>>>>>>> 45914b6 (fixed login get to ost)
export default router;