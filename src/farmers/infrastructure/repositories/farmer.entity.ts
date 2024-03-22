import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { FieldEntity } from './field.entity';

@Entity('Farmer')
export class FarmerEntity {
  @PrimaryColumn()
  email!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @OneToMany(() => FieldEntity, (field) => field.farmer)
  fields?: FieldEntity[]
}
