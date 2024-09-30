import { DoubleDataType } from "sequelize";
import Profile, {ProfileAttributes} from "../models/profile-model.js";

export class ProfileService {
    public async createProfile(firstname: string, lastname: string, profession: string, balance: number, type: string): Promise<Profile> {
        try{
            const profile = await Profile.create({firstname, lastname, profession, balance, type});
            return profile;
        }catch (error){
            if (error instanceof Error){
                throw new Error(`Unable to create contratante: ${error.message}`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getAllProfiles(): Promise<Profile[]> {
        try {
            return await Profile.findAll();
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to fetch contratantes:  lalles: pterror.message)' $(error.message)`);
            }else{
                throw new Error("An unknown error occurred.");
            }
        }
    }

    public async getBalance(id: number): Promise<number | null> {
        const profile = await Profile.findByPk(id);
        if (!profile) {
            return null;
        }
        return profile.balance;
    }

    public async deposit(id: number, amount: number): Promise<Profile | null> {
        const profile = await Profile.findByPk(id);
        if (!profile) {
            return null;
        }

        profile.balance = profile.balance + amount;
        await profile.save();
        return profile;
    }

    public async deleteProfile(id: number): Promise<void> {
        try {
            const result = await Profile.destroy({
                where: { id }
            });

            if (result === 0) {
                throw new Error(`Perfil com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir perfil com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<ProfileAttributes>): Promise<Profile | null> {
        try {
            const [numberOfAffectedRows, [updatedProfile]] = await Profile.update(
                data,
                { where: { id }, returning: true }
            );

            if (numberOfAffectedRows === 0) {
                return null;
            }

            return updatedProfile;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Impossível atualizar perfil: ${error.message}`);
            } else {
                throw new Error("Um erro desconhecido ocorreu ao tentar atualizar o perfil.");
            }
        }
    }
}
