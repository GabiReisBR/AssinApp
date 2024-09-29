import { DoubleDataType } from "sequelize";
import Job, {JobAttributes} from "../models/job-model.js";

export class JobService {
    public async createJob(contract_id: number, description: string, operationdate: Date, paymentdate: Date, price: number, paid: number): Promise<Job> {
        try{
            const job = await Job.create({contract_id, description, operationdate, paymentdate, price, paid});
            return job;
        }catch (error){
            if (error instanceof Error){
                throw new Error(`Unable to create contratante: ${error.message}`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getAllJobs(): Promise<Job[]> {
        try {
            return await Job.findAll();
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contratantes:  lalles: pterror.message)' $(error.message)`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getUnpaidJobsSum(): Promise<number> {
        const unpaidJobs = await Job.sum('price', { where: { paid: false } });
        return unpaidJobs || 0;
    }
}
