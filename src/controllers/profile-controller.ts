import {Request, Response} from "express";
import {ProfileService} from "../services/profile-service.js";

export class  ProfileController {
    private profileService = new ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    public async createProfile(req: Request, res:Response): Promise<Response> {
        try {
            const {firstname, lastname, profession, balance, type} = req.body;
            const newProfile = await this.profileService.createProfile(firstname, lastname, profession, balance, type);
            return res.status(201).json(newProfile);
        } catch(error){
            return res.status(500).json({message: "Failed to create contract", error});
        }
    }

    public async getAllProfiles(req: Request, res:Response): Promise<Response> {
        try{
            const profiles = await this.profileService.getAllProfiles();
            return res.status(200).json(profiles);
        } catch(error){
            return res.status(500).json({message: "falhou no fetch job", error});
        }
    }
    

    public async getBalance(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const balance = await this.profileService.getBalance(Number(id));
            return res.status(200).json({ balance });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get profile balance', error });
        }
    }

    public async deposit(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { amount } = req.body;

            if (amount < 0) {
                return res.status(400).json({ message: 'Cannot deposit negative amount' });
            }

            const updatedProfile = await this.profileService.deposit(Number(id), amount);
            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            return res.status(200).json(updatedProfile);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to deposit', error });
        }
    }
}
