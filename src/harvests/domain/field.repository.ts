import { Field } from '../../farmers/domain/field';

export interface FieldRepository {
  findOneBy(field_name: string, field_location: string): Promise<Field | null>;
}
