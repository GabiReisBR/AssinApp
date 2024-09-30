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

    public async deletePayment(id: number): Promise<void> {
        try {
            const result = await Payment.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Pagamento com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir pagamento com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<PaymentAttributes>): Promise<Payment | null> {
        try {
            const [numberOfAffectedRows, [updatedPayment]] = await Payment.update(
                data,
                { where: { id }, returning: true }
            );

            if (numberOfAffectedRows === 0) {
                return null;
            }

            return updatedPayment;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar pagamento: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o pagamento.");
            }
        }
    }
}
