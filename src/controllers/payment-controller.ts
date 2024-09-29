import {Request, Response} from "express";
import {PaymentService} from "../services/payment-service.js";

export class  PaymentController {
    private paymentService = new PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    public async createPayment(req: Request, res:Response): Promise<Response> {
        try {
            const {job_id, operationdate, paymentvalue} = req.body;
            const newPayment = await this.paymentService.createPayment(job_id, operationdate, paymentvalue);
            return res.status(201).json(newPayment);
        } catch(error){
            return res.status(500).json({message: "Failed to create contract", error});
        }
    }

    public async getAllPayments(req: Request, res:Response): Promise<Response> {
        try{
            const payments = await this.paymentService.getAllPayments();
            return res.status(200).json(payments);
        } catch(error){
            return res.status(500).json({message: "falhou no fetch job", error});
        }
    }
}
