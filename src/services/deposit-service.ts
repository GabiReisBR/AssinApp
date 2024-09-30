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

    public async deleteDeposit(id: number): Promise<void> {
        try {
            const result = await Deposit.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Contratante com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir contratante com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<DepositAttributes>): Promise<Deposit | null> {
        try {
            const [numberOfAffectedRows, [updatedDeposit]] = await Deposit.update(
                data,
                { where: { id }, returning: true }
            );

            if (numberOfAffectedRows === 0) {
                return null;
            }

            return updatedDeposit;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar contratante: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o contratante.");
            }
        }
    }
}
