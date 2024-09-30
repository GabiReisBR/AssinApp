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

    public async deleteJob(id: number): Promise<void> {
        try {
            const result = await Job.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Trabalho com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir trabalho com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<JobAttributes>): Promise<Job | null> {
        try {
            const [numberOfAffectedRows, [updatedJob]] = await Job.update(
                data,
                { where: { id }, returning: true }
            );

            if (numberOfAffectedRows === 0) {
                return null;
            }

            return updatedJob;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar trabalho: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o trabalho.");
            }
        }
    }
}
