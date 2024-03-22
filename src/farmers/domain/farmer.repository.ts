import { Farmer } from './farmer';

export interface FarmerRepository {
  save(farmer: Farmer): Promise<Farmer>;
  findOneBy(email: string): Promise<Farmer | null>;
}
