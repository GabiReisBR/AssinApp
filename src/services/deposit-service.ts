import { DoubleDataType } from "sequelize";
import Deposit, {DepositAttributes} from "../models/deposit-model.js";

export class DepositService {
    public async createDeposit(profile_id: number,operationdate: Date, depositvalue: number): Promise<Deposit> {
        try{
            const deposit = await Deposit.create({profile_id, operationdate, depositvalue});
            return deposit;
        }catch (error){
            if (error instanceof Error){
                throw new Error(`Unable to create contratante: ${error.message}`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getAllDeposits(): Promise<Deposit[]> {
        try {
            return await Deposit.findAll();
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contratantes:  lalles: pterror.message)' $(error.message)`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }
}
