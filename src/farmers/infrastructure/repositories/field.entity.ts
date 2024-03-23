import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FarmerEntity } from './farmer.entity';

@Entity('Field')
export class FieldEntity {
  constructor(name: string, location: string, farmer: FarmerEntity) {
    this.name = name;
    this.location = location;
    this.farmer = farmer;
  }

  @PrimaryColumn()
  name!: string;

  @PrimaryColumn()
  location!: string;

  @ManyToOne(() => FarmerEntity, (farmer) => farmer.fields)
  @JoinColumn([
    { name: 'email', referencedColumnName: 'email' }
  ])
  farmer!: FarmerEntity;
}
