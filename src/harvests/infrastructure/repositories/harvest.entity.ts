import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Harvest')
export class HarvestEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  field_name!: string;

  @Column()
  field_location!: string;

  @Column()
  client_email!: string;

  @Column()
  fruit!: string;

  @Column()
  variety!: string;

  // @OneToMany(() => FieldEntity, (field) => field.harvest)
  // fields?: FieldEntity[]
}
