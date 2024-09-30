import {Contract, ContractCreationAttributes} from "../models/contract-model";

export class ContrctRepository {
    public async create(data: ContractCreationAttributes): Promise<Contract> {
        try{
            const contract = await Contract.create(data);
            return contract;
        } catch(error){
            throw new Error(`unable to create contratante: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Contract[]> {
        try{
            const contract = await Contract.findAll();
            return contract;
        } catch(error){
            throw new Error(`unable to fetch contratantes: ${(error as Error).message}`);
        }
    }

    public async findById(id:number): Promise<Contract|null> {
        try{
            const contract = await Contract.findByPk(id);
            return contract;
        } catch(error){
            throw new Error(`unable to find contratante with ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<ContractCreationAttributes>): Promise<Contract | null> {
        try {
            const contract = await Contract.findByPk(id);
            if (!contract) {
                throw new Error(`Contrato com ID ${id} não encontrado`);
            }
            await contract.update(data);
            return contract;
        } catch (error) {
            throw new Error(`Impossível atualizar contrato com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const result = await Contract.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Contrato com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir contrato com ID ${id}: ${(error as Error).message}`);
        }
    }
}
