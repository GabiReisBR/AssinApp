import { Router } from "express";
import { ProfileController } from "../controllers/profile-controller.js";

const router = Router();
const profileController = new ProfileController();

router.post("/profile", (req, res) => profileController.createProfile(req, res));
router.get("/profile", (req, res) => profileController.getAllProfiles(req, res)); 
router.get("/profile/:id/balance", (req, res) => profileController.getBalance(req, res)); 
router.put("/profile/:id/deposit", (req, res) => profileController.deposit(req, res)); 
router.put("/profile/:id", (req, res) => profileController.updateProfile(req, res)); 
router.delete("/profile/:id", (req, res) => profileController.deleteProfile(req, res)); 

export default router;
