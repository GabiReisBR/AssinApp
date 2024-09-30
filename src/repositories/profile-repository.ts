import { Profile, ProfileCreationAttributes } from "../models/profile-model";

export class ProfileRepository {
  public async create(data: ProfileCreationAttributes): Promise<Profile> {
    try {
      const profile = await Profile.create(data);
      return profile;
    } catch (error) {
      throw new Error(`Unable to create profile: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Profile[]> {
    try {
      const profiles = await Profile.findAll();
      return profiles;
    } catch (error) {
      throw new Error(`Unable to fetch profiles: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Profile | null> {
    try {
      const profile = await Profile.findByPk(id);
      return profile;
    } catch (error) {
      throw new Error(`Unable to find profile with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async update(id: number, data: Partial<ProfileCreationAttributes>): Promise<Profile | null> {
    try {
      const profile = await Profile.findByPk(id);
      if (!profile) {
        throw new Error(`Profile with ID ${id} not found`);
      }
      await profile.update(data);
      return profile;
    } catch (error) {
      throw new Error(`Unable to update profile with ID ${id}: ${(error as Error).message}`);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const result = await Profile.destroy({
        where: { id },
      });
      if (result === 0) {
        throw new Error(`Profile with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Unable to delete profile with ID ${id}: ${(error as Error).message}`);
    }
  }
}
