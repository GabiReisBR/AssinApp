import { Contratante, ContratanteCreationAttributes } from "../models/contratante-model";

export class ContratanteRepository {
    public async create(data: ContratanteCreationAttributes): Promise<Contratante> {
        try{
            const contratante = await Contratante.create(data);
            return contratante;
        } catch(error){
            throw new Error(`unable to create contratante: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Contratante[]> {
        try{
            const contratante = await Contratante.findAll();
            return contratante;
        } catch(error){
            throw new Error(`unable to fetch contratantes: ${(error as Error).message}`);
        }
    }

    public async findById(id:number): Promise<Contratante|null> {
        try{
            const contratante = await Contratante.findByPk(id);
            return contratante;
        } catch(error){
            throw new Error(`unable to find contratante with ID ${id}: ${(error as Error).message}`);
        }
    }
    
}