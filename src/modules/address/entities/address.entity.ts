import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { address_user } from './address_user.entity';
import { Users } from 'src/modules/users/entities/users.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  consignee_name: string;
  
  @Column()
  phonenumber: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postal_code: string;

  @ManyToMany(() => Users, (user) => user.addresses)
  @JoinTable({
    name: 'address_user',
    joinColumn: {
      name: 'addressId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  user: Users[];

  @OneToMany(() => address_user, (addressUser) => addressUser.address)
  addressUsers: address_user[];
}