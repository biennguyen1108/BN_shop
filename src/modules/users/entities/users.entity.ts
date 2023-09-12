// user.entity.ts
import { Address } from 'src/modules/address/entities';
import { Carts } from 'src/modules/carts/entities/carts.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable:true})
  address: string;

  @Column({nullable:true})
  full_name: string;

  @Column()
  status: string;
  
  @Column({nullable:true})
  phonenumber: number;

  @Column({default:null})
  refreshToken: string;

    // mối quan hệ với bảng role
  @ManyToOne(() => Roles, role => role.user)
  @JoinColumn({ name: 'role_id'})
  role: Roles;
    // mối quan hệ với bảng carts
  @OneToOne(() => Carts,cart => cart.user)
  cart: Carts;
  
  @ManyToMany(() => Address, (address) => address.users)
  @JoinTable()
  addresses: Address[];
  
  @OneToMany(() => Order, (order) => order.users)
  orders: Order[];
}

