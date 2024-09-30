import { Contract, ContractCreationAttributes } from "../models/contract-model";
import Job from "../models/job-model";

export class ContractRepository {
  public async create(data: ContractCreationAttributes): Promise<Contract> {
    try {
      const contract = await Contract.create(data);
      return contract;
    } catch (error) {
      throw new Error(`Unable to create contract: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Contract[]> {
    try {
      const contracts = await Contract.findAll();
      return contracts;
    } catch (error) {
      throw new Error(`Unable to fetch contracts: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Contract | null> {
    try {
      const contract = await Contract.findByPk(id);
      return contract;
    } catch (error) {
      throw new Error(`Unable to find contract with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async update(id: number, data: Partial<ContractCreationAttributes>): Promise<Contract | null> {
    try {
      const contract = await Contract.findByPk(id);
      if (!contract) {
        throw new Error(`Contract with ID ${id} not found`);
      }
      await contract.update(data);
      return contract;
    } catch (error) {
      throw new Error(`Unable to update contract with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const result = await Contract.destroy({ where: { id } });
      if (result === 0) {
        throw new Error(`Contract with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Unable to delete contract with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async getAllJobsByContractId(contract_id: number): Promise<Job[]> {
    try {
      const jobs = await Job.findAll({ where: { contract_id } });
      return jobs;
    } catch (error) {
      throw new Error(`Unable to fetch jobs for contract ID ${contract_id}: ${(error as Error).message}`);
    }
  }
}
