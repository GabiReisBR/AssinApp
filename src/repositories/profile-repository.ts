import {Profile, ProfileCreationAttributes} from "../models/profile-model";

export class ProfileRepository {
    public async create(data: ProfileCreationAttributes): Promise<Profile> {
        try{
            const profile = await Profile.create(data);
            return profile;
        } catch(error){
            throw new Error(`unable to create profile: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Profile[]> {
        try{
            const profile = await Profile.findAll();
            return profile;
        } catch(error){
            throw new Error(`unable to fetch profile: ${(error as Error).message}`);
        }
    }

    public async findById(id:number): Promise<Profile|null> {
        try{
            const profile = await Profile.findByPk(id);
            return profile;
        } catch(error){
            throw new Error(`unable to find profile with ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<ProfileCreationAttributes>): Promise<Profile | null> {
        try {
            const profile = await Profile.findByPk(id);
            if (!profile) {
                throw new Error(`Perfil com ID ${id} não encontrado`);
            }
            await profile.update(data);
            return profile;
        } catch (error) {
            throw new Error(`Impossível atualizar perfil com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async delete(id: number): Promise<void> {
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
}
