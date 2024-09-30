import  Router from "express";
import { JobController } from "../controllers/job-controller.js";

const router = Router();
const jobController = new JobController();

router.post("/", (req, res) => jobController.createJob(req, res)); 
router.get("/", (req, res) => jobController.getAllJobs(req, res)); 
router.get("/unpaidSum", (req, res) => jobController.getUnpaidJobsSum(req, res)); 
router.put("/:id", (req, res) => jobController.updateJob(req, res)); 
router.delete("/:id", (req, res) => jobController.deleteJob(req, res)); 

export default router;
