import { Field } from './field';

export class Farmer {
  constructor(
    public email: string,
    public first_name: string,
    public last_name: string,
    public fields: Field[]
  ) { }
}