import Contract, {ContractAttributes} from "../models/contract-model.js";
import Job from "../models/job-model.js";

export class ContractService {
    public async createContract(terms: string, clientid: number, contractorid: number, operationdate: Date, status: string): Promise<Contract> {
        try{
            const contract = await Contract.create({terms, clientid, contractorid, operationdate, status});
            return contract;
        }catch (error){
            if (error instanceof Error){
                throw new Error(`Unable to create contratante: ${error.message}`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getAllContracts(): Promise<Contract[]> {
        try {
            return await Contract.findAll();
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contratantes:  lalles: pterror.message)' $(error.message)`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getAllJobsByContractId(contract_id: number): Promise<Job[]> {
        const jobs = await Job.findAll({
            where: { contract_id },
        });

        return jobs;
    }

    public async deleteContract(id: number): Promise<void> {
        try {
            const result = await Contract.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Contratante com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir contratante com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<ContractAttributes>): Promise<Contract | null> {
        try {
            const [numberOfAffectedRows, [updatedContract]] = await Contract.update(
                data,
                { where: { id }, returning: true }
            );

            if (numberOfAffectedRows === 0) {
                return null;
            }

            return updatedContract;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar contratante: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o contratante.");
            }
        }
    }
}
