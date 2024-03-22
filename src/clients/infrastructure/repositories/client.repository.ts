import { injectable } from 'tsyringe';
import { AppDataSource } from '../../../data-source';
import { Client } from '../../domain/client';
import { ClientRepository } from '../../domain/client.repository';
import { ClientEntity } from './client.entity';

@injectable()
export class SQLiteClientRepository implements ClientRepository {

  async save(client: Client): Promise<Client> {
    // Map to data entity
    const clientEntity: ClientEntity = {
      email: client.email,
      first_name: client.first_name,
      last_name: client.last_name
    };

    const clientRepository = AppDataSource.getRepository(ClientEntity);
    const result = await clientRepository.save(clientEntity);

    // TODO: Map to business entity
    //       En paso anterior, si no hay error, serán los mismo datos

    return client;
  }

  async findOneBy(email: string): Promise<Client | null> {
    const clientRepository = AppDataSource.getRepository(ClientEntity);
    const result = await clientRepository.findOneBy({ email });

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
