import {Request, Response} from "express";
import {ContractService} from "../services/contract-service.js";
import { Job } from "../models/job-model.js";
import { Contract } from "../models/contract-model.js";

export class  ContractController {
    private contractService = new ContractService;

    constructor() {
        this.contractService = new ContractService();
    }

    public async createContract(req: Request, res:Response): Promise<Response> {
        try {
            const {terms, clientid, contractorid, operationdate, status} = req.body;
            const newContract = await this.contractService.createContract(terms, clientid, contractorid, operationdate, status);
            return res.status(201).json(newContract);
        } catch(error){
            return res.status(500).json({message: "Failed to create contract", error});
        }
    }

    public async getAllContracts(req: Request, res:Response): Promise<Response> {
        try{
            const contracts = await this.contractService.getAllContracts();
            return res.status(200).json(contracts);
        } catch(error){
            return res.status(500).json({message: "falhou no fetch contratato", error});
        }
    }

    public async getContractJobs(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const contractWithJobs = await Contract.findOne({
                where: { id },
                include: [Job],
            });

            if (!contractWithJobs) {
                return res.status(404).json({ message: "Contract not found" });
            }

            return res.status(200).json(contractWithJobs);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching contract jobs", error });
        }
    }

    public async deleteContratante(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.contractService.deleteContract(Number(id));
            return res.status(200).json({ message: `Contrato com ID ${id} foi excluído com sucesso.`});
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir contrato", error });
        }
    }

    public async updateContract(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            const { terms, clientid, contractorid, operationdate, status } = req.body; 
            
            const updatedContract = await this.contractService.update(
                Number(id),
                { terms, clientid, contractorid, operationdate, status }
            );
    
            if (!updatedContract) {
                return res.status(404).json({ message: "Contrato não encontrado" });
            }
    
            const result = updatedContract.get({ plain: true });
    
            return res.status(200).json({ 
                message: `Contrato com ID ${id} foi atualizado com sucesso`,
                contract: result 
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao atualizar contrato:', error.message);
                return res.status(500).json({ message: "Falha ao atualizar contrato, Mas mesmo assim ele foi atualizado"});
            } else {
                console.error('Erro desconhecido ao atualizar contrato:', error);
                return res.status(500).json({ message: "Falha ao atualizar contrato", error: 'Erro desconhecido' });
            }
        }
    }
}
