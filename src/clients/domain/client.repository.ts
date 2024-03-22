import { Client } from './client';

export interface ClientRepository {
  save(client: Client): Promise<Client>;
  findOneBy(email: string): Promise<Client | null>;
}
