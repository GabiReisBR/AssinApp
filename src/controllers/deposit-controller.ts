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
}
