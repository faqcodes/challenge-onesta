import { Client } from '../../clients/domain/client';
import { Farmer } from '../../farmers/domain/farmer';
import { Fruit } from '../../fruits/domain/fruit';

export class Upload {
  constructor(
    public farmer: Farmer,
    public client: Client,
    public fruit: Fruit
  ) { }
}