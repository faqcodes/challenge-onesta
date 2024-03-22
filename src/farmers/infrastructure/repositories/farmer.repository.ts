import { injectable } from 'tsyringe';
import { AppDataSource } from '../../../data-source';
import { Farmer } from '../../domain/farmer';
import { FarmerRepository } from '../../domain/farmer.repository';
import { Field } from '../../domain/field';
import { FarmerEntity } from './farmer.entity';
import { FieldEntity } from './field.entity';

@injectable()
export class SQLiteFarmerRepository implements FarmerRepository {

  async save(farmer: Farmer): Promise<Farmer> {
    // Map to data entity
    const farmerEntity: FarmerEntity = {
      email: farmer.email,
      first_name: farmer.first_name,
      last_name: farmer.last_name
    };
    farmerEntity.fields = farmer.fields.map(f => new FieldEntity(f.name, f.location, farmerEntity));

    const farmerRepository = AppDataSource.getRepository(FarmerEntity);
    const fieldRespository = AppDataSource.getRepository(FieldEntity);

    const resultFarmer = await farmerRepository.save(farmerEntity);
    const resultField = await fieldRespository.save(farmerEntity.fields);

    // TODO: Map to business entity (resultFarmer, resultField)
    //       En paso anterior, si no hay error, serán los mismo datos

    return farmer;
  }

  async findOneBy(email: string): Promise<Farmer | null> {
    const farmerRepository = AppDataSource.getRepository(FarmerEntity);
    const result = await farmerRepository.findOneBy({ email });

    if (result) {
      // Map to business entity
      return {
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        fields: result.fields?.map(f => new Field(f.name, f.location)) || []
      }
    }

    return null;
  }
}
