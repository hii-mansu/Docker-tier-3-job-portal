import express from "express";
import { register, login, updateProfile, logout } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(singleUpload,register);
router.route("/logout").get(logout);
router.route("/profile/updateProfile").post(isAuth, singleUpload, updateProfile);

export default router;