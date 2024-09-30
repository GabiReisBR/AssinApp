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

    public async deletePayment(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await this.paymentService.deletePayment(Number(id));
            return res.status(200).json({ message: `Pagamento com ID ${id} foi excluído com sucesso.`});
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir pagamento", error });
        }
    }

    public async updatePayment(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            const { job_id, operationdate, paymentvalue } = req.body; 
            
            const updatedPayment = await this.paymentService.update(
                Number(id),
                { job_id, operationdate, paymentvalue }
            );
    
            if (!updatedPayment) {
                return res.status(404).json({ message: "Pagamento não encontrado" });
            }
    
            const result = updatedPayment.get({ plain: true });
    
            return res.status(200).json({ 
                message: `Pagamento com ID ${id} foi atualizado com sucesso`,
                payment: result 
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao atualizar pagamento:', error.message);
                return res.status(500).json({ message: "Falha ao atualizar pagamento, Mas mesmo assim ele foi atualizado"});
            } else {
                console.error('Erro desconhecido ao atualizar pagamento:', error);
                return res.status(500).json({ message: "Falha ao atualizar pagamento", error: 'Erro desconhecido' });
            }
        }
    }
}
