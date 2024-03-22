import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Farmer')
export class FarmerEntity {
  @PrimaryColumn()
  email!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;
}
