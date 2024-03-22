import { injectable } from 'tsyringe';
import { AppDataSource } from '../../../data-source';
import { Harvest } from '../../domain/harvest';
import { HarvestRepository } from '../../domain/harvest.repository';
import { HarvestEntity } from './harvest.entity';

@injectable()
export class SQLiteHarvestRepository implements HarvestRepository {

  async save(harvest: Harvest): Promise<Harvest> {
    // Map to data entity
    const harvestEntity: HarvestEntity = {
      field_name: harvest.field_name,
      field_location: harvest.field_location,
      client_email: harvest.client_email,
      fruit: harvest.fruit,
      variety: harvest.variety
    };

    const harvestRepository = AppDataSource.getRepository(HarvestEntity);
    const resultHarvest = await harvestRepository.save(harvestEntity);

    // TODO: Map to business entity (resultHarvest, resultField)
    //       En paso anterior, si no hay error, serán los mismo datos

    return harvest;
  }

  async findOneBy(field_name: string, field_location: string, client_email: string, fruit: string, variety: string): Promise<Harvest | null> {
    const harvestRepository = AppDataSource.getRepository(HarvestEntity);
    const result = await harvestRepository.findOneBy(
      { field_name, field_location, client_email, fruit, variety }
    );

    if (result) {
      // Map to business entity
      return {
        field_name: result.field_name,
        field_location: result.field_location,
        client_email: result.client_email,
        fruit: result.fruit,
        variety: result.variety
      }
    }

    return null;
  }
}
