import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { addNewBook, deleteBook } from "../controllers/book.controller";

const router=Router();


router.route("/add-book").post(verifyJWT,upload.single("coverImage"),addNewBook)
router.route("/delete-book/:bookId").post(verifyJWT,deleteBook)