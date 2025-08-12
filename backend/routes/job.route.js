import express from "express";
import { postJob, getAllJobs, getJobById, getAdminJobs } from "../controllers/job.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.route("/post").post(isAuth, postJob);
router.route("/get").get(isAuth, getAllJobs);
router.route("/get/:id").get(isAuth, getJobById);
router.route("/getadminjobs").get(isAuth, getAdminJobs);


export default router;