import {Request, Response} from "express";
import {JobService} from "../services/job-service.js";

export class  JobController {
    private jobService = new JobService;

    constructor() {
        this.jobService = new JobService();
    }

    public async createJob(req: Request, res:Response): Promise<Response> {
        try {
            const {contract_id, description, operationdate, paymentdate, price, paid} = req.body;
            const newJob = await this.jobService.createJob(contract_id, description, operationdate, paymentdate, price, paid);
            return res.status(201).json(newJob);
        } catch(error){
            return res.status(500).json({message: "Failed to create contract", error});
        }
    }

    public async getAllJobs(req: Request, res:Response): Promise<Response> {
        try{
            const jobs = await this.jobService.getAllJobs();
            return res.status(200).json(jobs);
        } catch(error){
            return res.status(500).json({message: "falhou no fetch job", error});
        }
    }

    public async getUnpaidJobsSum(req: Request, res: Response): Promise<Response> {
        try {
            const unpaidSum = await this.jobService.getUnpaidJobsSum();
            return res.status(200).json({ unpaidSum });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch unpaid jobs sum', error });
        }
    }

    public async deleteJob(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.jobService.deleteJob(Number(id));
            return res.status(200).json({ message: `Contrato com ID ${id} foi excluído com sucesso.`});
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir contrato", error });
        }
    }

    public async updateJob(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            const { contract_id, description, operationdate, paymentdate, price, paid } = req.body; 
            
            const updatedJob = await this.jobService.update(
                Number(id),
                { contract_id, description, operationdate, paymentdate, price, paid }
            );
    
            if (!updatedJob) {
                return res.status(404).json({ message: "Trabalho não encontrado" });
            }
    
            const result = updatedJob.get({ plain: true });
    
            return res.status(200).json({ 
                message: `Trabalho com ID ${id} foi atualizado com sucesso`,
                job: result 
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao atualizar trabalho:', error.message);
                return res.status(500).json({ message: "Falha ao atualizar trabalho, Mas mesmo assim ele foi atualizado"});
            } else {
                console.error('Erro desconhecido ao atualizar trabalho:', error);
                return res.status(500).json({ message: "Falha ao atualizar trabalho", error: 'Erro desconhecido' });
            }
        }
    }
}
