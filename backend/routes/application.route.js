import express from "express";
import { applyJob, getAppliedJobs, getapplicants, updateStatus } from "../controllers/application.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.route("/apply/:id").get(isAuth, applyJob);
router.route("/get").get(isAuth, getAppliedJobs);
router.route("/:id/applicants").get(isAuth, getapplicants);
router.route("/status/:id/update").post(isAuth, updateStatus);

export default router;