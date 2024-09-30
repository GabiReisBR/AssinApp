import { Router } from "express";
import { ProfileController } from "../controllers/profile-controller.js";

const router = Router();
const profileController = new ProfileController();

router.post("/", (req, res) => profileController.createProfile(req, res));
router.get("/", (req, res) => profileController.getAllProfiles(req, res)); 
router.get("/:id/balance", (req, res) => profileController.getBalance(req, res)); 
router.put("/:id/deposit", (req, res) => profileController.deposit(req, res)); 
router.put("/:id", (req, res) => profileController.updateProfile(req, res)); 
router.delete("/:id", (req, res) => profileController.deleteProfile(req, res)); 

export default router;
