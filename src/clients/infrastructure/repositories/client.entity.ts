import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Client')
export class ClientEntity {
  @PrimaryColumn()
  email!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;
}
