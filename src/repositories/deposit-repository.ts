import { Deposit, DepositCreationAttributes } from "../models/deposit-model";

export class DepositRepository {
  public async create(data: DepositCreationAttributes): Promise<Deposit> {
    try {
      const deposit = await Deposit.create(data);
      return deposit;
    } catch (error) {
      throw new Error(`Unable to create deposit: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Deposit[]> {
    try {
      const deposits = await Deposit.findAll();
      return deposits;
    } catch (error) {
      throw new Error(`Unable to fetch deposits: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Deposit | null> {
    try {
      const deposit = await Deposit.findByPk(id);
      return deposit;
    } catch (error) {
      throw new Error(`Unable to find deposit with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async update(id: number, data: Partial<DepositCreationAttributes>): Promise<Deposit | null> {
    try {
      const deposit = await Deposit.findByPk(id);
      if (!deposit) {
        throw new Error(`Deposit with ID ${id} not found`);
      }
      await deposit.update(data);
      return deposit;
    } catch (error) {
      throw new Error(`Unable to update deposit with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const result = await Deposit.destroy({ where: { id } });
      if (result === 0) {
        throw new Error(`Deposit with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Unable to delete deposit with ID ${id}: ${(error as Error).message}`);
    }
  }
}
