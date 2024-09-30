import { Router } from "express";
import { ContractController } from "../controllers/contract-controller.js";

const router = Router();
const contractController = new ContractController();

router.post("/", (req, res) => contractController.createContract(req, res));
router.get("/", (req, res) => contractController.getAllContracts(req, res)); 
router.get("/:id/jobs", (req, res) => contractController.getContractJobs(req, res)); 
router.put("/:id", (req, res) => contractController.updateContract(req, res)); 
router.delete("/:id", (req, res) => contractController.deleteContratante(req, res)); 

export default router;