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
}
