import { injectable } from 'tsyringe';
import { CreateClientUseCase } from '../../clients/application/client.usecase';
import { CreateFarmerUseCase } from '../../farmers/application/farmer.usecase';
import { CreateFruitUseCase } from '../../fruits/application/fruit.usecase';
import { CreateHarvestUseCase } from '../../harvests/application/harvest.usecase';
import { ErrorItem } from '../../shared/models/error-item.model';
import { Result } from '../../shared/models/result.model';
import { Upload } from '../domain/upload';

@injectable()
export class UploadUseCase {
  constructor(
    private readonly farmerUseCase: CreateFarmerUseCase,
    private readonly clientUseCase: CreateClientUseCase,
    private readonly fruitUseCase: CreateFruitUseCase,
    private readonly harvestUseCase: CreateHarvestUseCase
  ) { }

  async execute(data: Upload): Promise<Result<Upload>> {
    try {

      const { email, first_name, last_name, fields } = data.farmer;
      const farmerResult = this.farmerUseCase.execute(email, first_name, last_name, fields);
      const clientResult = this.clientUseCase.execute(data.client.email, data.client.first_name, data.client.last_name);
      const fruitResult = this.fruitUseCase.execute(data.fruit.fruit, data.fruit.variety);

      const result = await Promise.all([farmerResult, clientResult, fruitResult]);

      const farmerError = result[0].isFailure() ? result[0].getErrors()! : [];
      const clientError = result[1].isFailure() ? result[1].getErrors()! : [];
      const fruitError = result[2].isFailure() ? result[2].getErrors()! : [];

      const errors = [...farmerError, ...clientError, ...fruitError];
      if (errors.length > 0) {
        console.log('errores usecase', errors);
        return Result.failure<Upload>(errors!)
      }

      // ejecutar una vez que se han ejecutados los anteriores
      const harvestResult = await this.harvestUseCase.execute(
        fields[0].name,
        fields[0].location,
        data.client.email,
        data.fruit.fruit,
        data.fruit.variety
      );

      if (harvestResult.isFailure()) {
        console.log('errores harvestResult', errors);
        return Result.failure<Upload>(harvestResult.getErrors()!)
      }

      return Result.success<Upload>(data);
    } catch (error: any) {
      const details: ErrorItem = { message: error?.message };
      return Result.failure<Upload>([details])
    }
  }
}