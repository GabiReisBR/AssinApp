import {Payment, PaymentCreationAttributes} from "../models/payment-model";

export class PaymentRepository {
    public async create(data: PaymentCreationAttributes): Promise<Payment> {
        try{
            const payment = await Payment.create(data);
            return payment;
        } catch(error){
            throw new Error(`unable to create payment: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Payment[]> {
        try{
            const payment = await Payment.findAll();
            return payment;
        } catch(error){
            throw new Error(`unable to fetch job: ${(error as Error).message}`);
        }
    }

    public async findById(id:number): Promise<Payment|null> {
        try{
            const payment = await Payment.findByPk(id);
            return payment;
        } catch(error){
            throw new Error(`unable to find payment with ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<PaymentCreationAttributes>): Promise<Payment | null> {
        try {
            const payment = await Payment.findByPk(id);
            if (!payment) {
                throw new Error(`Pagamento com ID ${id} não encontrado`);
            }
            await payment.update(data);
            return payment;
        } catch (error) {
            throw new Error(`Impossível atualizar pagamento com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async delete(id: number): Promise<void> {
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
}
