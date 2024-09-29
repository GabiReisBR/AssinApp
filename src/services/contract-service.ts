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
}
