import { Payment, PaymentCreationAttributes } from "../models/payment-model";

export class PaymentRepository {
  public async create(data: PaymentCreationAttributes): Promise<Payment> {
    try {
      const payment = await Payment.create(data);
      return payment;
    } catch (error) {
      throw new Error(`Unable to create payment: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Payment[]> {
    try {
      const payments = await Payment.findAll();
      return payments;
    } catch (error) {
      throw new Error(`Unable to fetch payments: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Payment | null> {
    try {
      const payment = await Payment.findByPk(id);
      return payment;
    } catch (error) {
      throw new Error(`Unable to find payment with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async update(id: number, data: Partial<PaymentCreationAttributes>): Promise<Payment | null> {
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        throw new Error(`Payment with ID ${id} not found`);
      }
      await payment.update(data);
      return payment;
    } catch (error) {
      throw new Error(`Unable to update payment with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const result = await Payment.destroy({ where: { id } });
      if (result === 0) {
        throw new Error(`Payment with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Unable to delete payment with ID ${id}: ${(error as Error).message}`);
    }
  }
}
