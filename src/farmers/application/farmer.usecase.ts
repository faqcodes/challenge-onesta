import { inject, injectable } from 'tsyringe';
import { ErrorItem } from '../../shared/models/error-item.model';
import { Result } from '../../shared/models/result.model';
import { Farmer } from '../domain/farmer';
import { FarmerRepository } from '../domain/farmer.repository';
import { Field } from '../domain/field';

@injectable()
export class CreateFarmerUseCase {
  constructor(
    @inject('FarmerRepository')
    private readonly farmerRepository: FarmerRepository
  ) { }

  async execute(email: string, first_name: string, last_name: string, fields: Field[]): Promise<Result<Farmer>> {
    try {
      // Application rule: si el registro ya existe, no insertar
      const farmerData = await this.farmerRepository.findOneBy(email);
      if (farmerData) {
        // Do nothing: the save method in repository update the record
        console.log('Farmer Exists:', farmerData);
      }

      const farmerEntity: Farmer = new Farmer(email, first_name, last_name, fields);

      await this.farmerRepository.save(farmerEntity);

      return Result.success<Farmer>(farmerEntity);
    } catch (error: any) {
      const details: ErrorItem = { message: error?.message };
      return Result.failure<Farmer>([details])
    }
  }
}