 import Payment, {PaymentAttributes} from "../models/payment-model.js";

export class PaymentService {
    public async createPayment(job_id: number, operationdate: Date, paymentvalue: number): Promise<Payment> {
        try{
            const payment = await Payment.create({job_id, operationdate, paymentvalue});
            return payment;
        }catch (error){
            if (error instanceof Error){
                throw new Error(`Unable to create contratante: ${error.message}`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getAllPayments(): Promise<Payment[]> {
        try {
            return await Payment.findAll();
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contratantes:  lalles: pterror.message)' $(error.message)`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }
}
