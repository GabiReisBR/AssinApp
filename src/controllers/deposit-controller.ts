import {Request, Response} from "express";
import {DepositService} from "../services/deposit-service.js";

export class  DepositController {
    private depositService = new DepositService;

    constructor() {
        this.depositService = new DepositService();
    }

    public async createDeposit(req: Request, res:Response): Promise<Response> {
        try {
            const {profile_id, operationdate, depositvalue} = req.body;
            const newDeposit = await this.depositService.createDeposit(profile_id, operationdate, depositvalue);
            return res.status(201).json(newDeposit);
        } catch(error){
            return res.status(500).json({message: "Failed to create contract", error});
        }
    }

    public async getAllDeposits(req: Request, res:Response): Promise<Response> {
        try{
            const deposits = await this.depositService.getAllDeposits();
            return res.status(200).json(deposits);
        } catch(error){
            return res.status(500).json({message: "falhou no fetch deposito", error});
        }
    }

    public async deleteDeposit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.depositService.deleteDeposit(Number(id));
            return res.status(200).json({ message: `Contrato com ID ${id} foi excluído com sucesso.`});
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir contrato", error });
        }
    }

    public async updateDeposit(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            const { profile_id, operationdate, depositvalue } = req.body; 
            
            const updatedDeposit = await this.depositService.update(
                Number(id),
                { profile_id, operationdate, depositvalue }
            );
    
            if (!updatedDeposit) {
                return res.status(404).json({ message: "Deposito não encontrado" });
            }
    
            const result = updatedDeposit.get({ plain: true });
    
            return res.status(200).json({ 
                message: `Deposito com ID ${id} foi atualizado com sucesso`,
                deposit: result 
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao atualizar deposito:', error.message);
                return res.status(500).json({ message: "Falha ao atualizar deposito, Mas mesmo assim ele foi atualizado"});
            } else {
                console.error('Erro desconhecido ao atualizar deposito:', error);
                return res.status(500).json({ message: "Falha ao atualizar deposito", error: 'Erro desconhecido' });
            }
        }
    }
}
