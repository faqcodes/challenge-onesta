import { injectable } from 'tsyringe';
import { AppDataSource } from '../../../data-source';
import { Field } from '../../../farmers/domain/field';
import { FieldEntity } from '../../../farmers/infrastructure/repositories/field.entity';
import { FieldRepository } from '../../domain/field.repository';

@injectable()
export class SQLiteFieldRepository implements FieldRepository {

  async findOneBy(field_name: string, field_location: string): Promise<Field | null> {
    const fieldRepository = AppDataSource.getRepository(FieldEntity);
    const result = await fieldRepository.findOneBy(
      { name: field_name, location: field_location }
    );

    if (result) {
      // Map to business entity
      return {
        name: result.name,
        location: result.location,
      }
    }

    return null;
  }
}
