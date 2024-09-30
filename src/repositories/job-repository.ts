import {Job, JobCreationAttributes} from "../models/job-model";

export class JobRepository {
    public async create(data: JobCreationAttributes): Promise<Job> {
        try{
            const job = await Job.create(data);
            return job;
        } catch(error){
            throw new Error(`unable to create job: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Job[]> {
        try{
            const job = await Job.findAll();
            return job;
        } catch(error){
            throw new Error(`unable to fetch job: ${(error as Error).message}`);
        }
    }

    public async findById(id:number): Promise<Job|null> {
        try{
            const job = await Job.findByPk(id);
            return job;
        } catch(error){
            throw new Error(`unable to find job with ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<JobCreationAttributes>): Promise<Job | null> {
        try {
            const job = await Job.findByPk(id);
            if (!job) {
                throw new Error(`Trabalho com ID ${id} não encontrado`);
            }
            await job.update(data);
            return job;
        } catch (error) {
            throw new Error(`Impossível atualizar trabalho com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async delete(id: number): Promise<void> {
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
}
