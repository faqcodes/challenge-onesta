import { inject, injectable } from 'tsyringe';
import { ErrorItem } from '../../shared/models/error-item.model';
import { Result } from '../../shared/models/result.model';
import { Client } from '../domain/client';
import { ClientRepository } from '../domain/client.repository';

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject('ClientRepository')
    private readonly clientRepository: ClientRepository
  ) { }

  async execute(email: string, first_name: string, last_name: string): Promise<Result<Client>> {
    try {
      // Application rule: si el registro ya existe, no insertar
      const clientData = await this.clientRepository.findOneBy(email);
      if (clientData) {
        // Do nothing: the save method in repository update the record
        console.log('Client Exists:', clientData);
      }

      const clientEntity: Client = new Client(email, first_name, last_name);

      await this.clientRepository.save(clientEntity);

      return Result.success<Client>(clientEntity);
    } catch (error: any) {
      const details: ErrorItem = { message: error?.message };
      return Result.failure<Client>([details])
    }
  }
}