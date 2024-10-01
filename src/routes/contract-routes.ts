import { Router } from "express";
import { ContractController } from "../controllers/contract-controller.js";

const router = Router();
const contractController = new ContractController();

router.post("/contract", (req, res) => contractController.createContract(req, res));
router.get("/contract", (req, res) => contractController.getAllContracts(req, res)); 
router.get("/contract/:id/jobs", (req, res) => contractController.getContractJobs(req, res)); 
router.put("/contract/:id", (req, res) => contractController.updateContract(req, res)); 
router.delete("/contract/:id", (req, res) => contractController.deleteContratante(req, res)); 

export default router;