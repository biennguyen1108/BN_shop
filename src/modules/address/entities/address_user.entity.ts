import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Address } from './address.entity';
import { Users } from 'src/modules/users/entities/users.entity';

@Entity()
export class address_user {

  @PrimaryColumn({ name: 'addressId' })
  addressId: number;

  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Address, (address) => address.addressUsers)
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @ManyToOne(() => Users, (user) => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: Users;
}