import { Job, JobCreationAttributes } from "../models/job-model";

export class JobRepository {
  public async create(data: JobCreationAttributes): Promise<Job> {
    try {
      const job = await Job.create(data);
      return job;
    } catch (error) {
      throw new Error(`Unable to create job: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Job[]> {
    try {
      const jobs = await Job.findAll();
      return jobs;
    } catch (error) {
      throw new Error(`Unable to fetch jobs: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Job | null> {
    try {
      const job = await Job.findByPk(id);
      return job;
    } catch (error) {
      throw new Error(`Unable to find job with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async update(id: number, data: Partial<JobCreationAttributes>): Promise<Job | null> {
    try {
      const job = await Job.findByPk(id);
      if (!job) {
        throw new Error(`Job with ID ${id} not found`);
      }
      await job.update(data);
      return job;
    } catch (error) {
      throw new Error(`Unable to update job with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const result = await Job.destroy({ where: { id } });
      if (result === 0) {
        throw new Error(`Job with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Unable to delete job with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async getUnpaidJobsSum(): Promise<number> {
    try {
      const unpaidSum = await Job.sum("price", { where: { paid: false } });
      return unpaidSum || 0;
    } catch (error) {
      throw new Error(`Unable to calculate unpaid jobs sum: ${(error as Error).message}`);
    }
  }
}
