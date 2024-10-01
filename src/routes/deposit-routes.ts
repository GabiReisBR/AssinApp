import { Router } from "express";
import { DepositController } from "../controllers/deposit-controller.js";

const router = Router();
const depositController = new DepositController();

router.post("/deposit", (req, res) => depositController.createDeposit(req, res)); 
router.get("/deposit", (req, res) => depositController.getAllDeposits(req, res)); 
router.put("/deposit/:id", (req, res) => depositController.updateDeposit(req, res)); 
router.delete("/deposit/:id", (req, res) => depositController.deleteDeposit(req, res)); 

export default router;
