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
}
