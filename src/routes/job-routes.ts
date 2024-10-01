import  Router from "express";
import { JobController } from "../controllers/job-controller.js";

const router = Router();
const jobController = new JobController();

router.post("/job", (req, res) => jobController.createJob(req, res)); 
router.get("/job", (req, res) => jobController.getAllJobs(req, res)); 
router.get("/job/unpaidSum", (req, res) => jobController.getUnpaidJobsSum(req, res)); 
router.put("/job/:id", (req, res) => jobController.updateJob(req, res)); 
router.delete("/job/:id", (req, res) => jobController.deleteJob(req, res)); 

export default router;
