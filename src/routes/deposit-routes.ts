import { Router } from "express";
import { DepositController } from "../controllers/deposit-controller.js";

const router = Router();
const depositController = new DepositController();

router.post("/", (req, res) => depositController.createDeposit(req, res)); 
router.get("/", (req, res) => depositController.getAllDeposits(req, res)); 
router.put("/:id", (req, res) => depositController.updateDeposit(req, res)); 
router.delete("/:id", (req, res) => depositController.deleteDeposit(req, res)); 

export default router;
