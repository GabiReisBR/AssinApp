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

    public async deleteProfile(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.profileService.deleteProfile(Number(id));
            return res.status(200).json({ message: `perfil com ID ${id} foi excluído com sucesso.`});
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir perfil", error });
        }
    }

    public async updateProfile(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            const { firstname, lastname, profession, balance, type } = req.body; 
            
            const updatedProfile = await this.profileService.update(
                Number(id),
                { firstname, lastname, profession, balance, type }
            );
    
            if (!updatedProfile) {
                return res.status(404).json({ message: "Perfil não encontrado" });
            }
    
            const result = updatedProfile.get({ plain: true });
    
            return res.status(200).json({ 
                message: `Perfil com ID ${id} foi atualizado com sucesso`,
                profile: result 
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao atualizar perfil:', error.message);
                return res.status(500).json({ message: "Falha ao atualizar perfil, Mas mesmo assim ele foi atualizado"});
            } else {
                console.error('Erro desconhecido ao atualizar perfil:', error);
                return res.status(500).json({ message: "Falha ao atualizar perfil", error: 'Erro desconhecido' });
            }
        }
    }
}
