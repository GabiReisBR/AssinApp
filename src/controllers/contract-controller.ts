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
}
