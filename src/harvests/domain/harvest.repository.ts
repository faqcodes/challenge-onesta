import { Harvest } from './harvest';

export interface HarvestRepository {
  save(harvest: Harvest): Promise<Harvest>;
  findOneBy(field_name: string, field_location: string, client_email: string, fruit: string, variety: string): Promise<Harvest | null>;
}
