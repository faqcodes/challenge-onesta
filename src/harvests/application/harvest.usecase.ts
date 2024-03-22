import { inject, injectable } from 'tsyringe';
import { ClientRepository } from '../../clients/domain/client.repository';
import { FruitRepository } from '../../fruits/domain/fruit.repository';
import { ErrorItem } from '../../shared/models/error-item.model';
import { Result } from '../../shared/models/result.model';
import { FieldRepository } from '../domain/field.repository';
import { Harvest } from '../domain/harvest';
import { HarvestRepository } from '../domain/harvest.repository';

@injectable()
export class CreateHarvestUseCase {
  constructor(
    @inject('HarvestRepository')
    private readonly harvestRepository: HarvestRepository,
    @inject('FieldRepository')
    private readonly fieldRepository: FieldRepository,
    @inject('ClientRepository')
    private readonly clientRepository: ClientRepository,
    @inject('FruitRepository')
    private readonly fruitRepository: FruitRepository
  ) { }

  async execute(field_name: string, field_location: string, client_email: string, fruit: string, variety: string): Promise<Result<Harvest>> {
    try {
      const details: ErrorItem[] = [];
      // Application rules:
      // validaciones de existencia de refencias por aplicación
      //
      // 1. Si el registro ya existe, no crear en la base de datos
      const harvestData = await this.harvestRepository.findOneBy(field_name, field_location, client_email, fruit, variety);
      if (harvestData) {
        console.log('Harvest Exists:', harvestData);
        const errorItem: ErrorItem = { message: `La Cosecha ingresada ya existe en la base de datos` };
        return Result.failure<Harvest>([errorItem])
      }

      // 2. Validar la referencias: el Campo debe existir en la bd
      const fieldData = await this.fieldRepository.findOneBy(field_name, field_location);
      if (!fieldData) {
        const errorItem: ErrorItem = { message: `El Campo ingresado no existe en la bd y no se puede referenciar [name: ${field_name}, location: ${field_location}]` };
        details.push(errorItem);
      }

      // 3. Validar la referencias: el Cliente debe existir en la bd
      const clientData = await this.clientRepository.findOneBy(client_email);
      if (!clientData) {
        const errorItem: ErrorItem = { message: `El Cliente ingresado no existe en la bd y no se puede referenciar [email: ${client_email}]` };
        details.push(errorItem);
      }

      // 3. Validar la referencias: la Fruta y su Variedad debe existir en la bd
      const fruitData = await this.fruitRepository.findOneBy(fruit, variety);
      if (!fruitData) {
        const errorItem: ErrorItem = { message: `La Fruta o su Variedad ingresada no existe en la bd y no se puede referenciar [fruit: ${fruit}, variety: ${variety}]` };
        details.push(errorItem);
      }

      // Hay problemas para la creación de la cosecha
      if (details.length > 0) {
        return Result.failure<Harvest>(details)
      }

      const harvestEntity: Harvest = new Harvest(field_name, field_location, client_email, fruit, variety);

      await this.harvestRepository.save(harvestEntity);

      return Result.success<Harvest>(harvestEntity);
    } catch (error: any) {
      const details: ErrorItem = { message: error?.message };
      return Result.failure<Harvest>([details])
    }
  }
}