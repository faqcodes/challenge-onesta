import { injectable } from 'tsyringe';
import { AppDataSource } from '../../../data-source';
import { Farmer } from '../../domain/farmer';
import { FarmerRepository } from '../../domain/farmer.repository';
import { FarmerEntity } from './farmer.entity';

@injectable()
export class SQLiteFarmerRepository implements FarmerRepository {

  async save(farmer: Farmer): Promise<Farmer> {
    // Map to data entity
    const farmerEntity: FarmerEntity = {
      email: farmer.email,
      first_name: farmer.first_name,
      last_name: farmer.last_name
    };

    const farmerRepository = AppDataSource.getRepository(FarmerEntity);
    const result = await farmerRepository.save(farmerEntity);

    // TODO: Map to business entity
    //       En paso anterior, si no hay error, serán los mismo datos

    return farmer;
  }

  async findOneBy(email: string): Promise<Farmer | null> {
    const farmerRepository = AppDataSource.getRepository(FarmerEntity);
    const result = await farmerRepository.findOneBy({ email });

    if (result) {
      return {
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name
      }
    }

    return null;
  }
}
