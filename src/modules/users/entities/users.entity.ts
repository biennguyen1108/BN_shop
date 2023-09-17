import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne, JoinColumn, OneToOne, JoinTable } from 'typeorm';
import { address_user } from 'src/modules/address/entities/address_user.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { Address } from 'src/modules/address/entities/address.entity';
import { Carts } from 'src/modules/carts/entities/carts.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  full_name: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  phonenumber: number;

  @Column({ default: null })
  refreshToken: string;

  @ManyToOne(() => Roles, role => role.user)
  @JoinColumn({ name: 'role_id'})
  role: Roles;

  @OneToOne(() => Carts,cart => cart.user)
  cart: Carts;
  
  @OneToMany(() => address_user, (addressUser) => addressUser.user)
  addressUsers: address_user[];

  @OneToMany(() => Order, (order) => order.users)
  orders: Order[];

  @ManyToMany(() => Address, address => address.user)
  @JoinTable({
    name: 'address_user',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'addressId',
      referencedColumnName: 'id',
    },
  })
  addresses: Address[];
}