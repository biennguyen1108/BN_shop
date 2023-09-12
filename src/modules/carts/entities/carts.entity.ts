// user.entity.ts
import { Products } from 'src/modules/products/entities/products.entity';
import { Users } from 'src/modules/users/entities/users.entity';
import { Entity,PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,OneToMany ,ManyToMany,JoinTable} from 'typeorm';
import { CartsProducts } from './carts_products.entity';
import { Transactions } from 'src/modules/transactions/entities/transactions.entity';


@Entity()
export class Carts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;
  
  @Column()
  total_quantity: number;


  @OneToOne(() => Users, user => user.cart)
  @JoinColumn()
  user: Users;

  @OneToMany(()=>CartsProducts , cartsProduct => cartsProduct.cart)
  cartsProduct: CartsProducts[];

  @OneToOne(() => Transactions, Transactions => Transactions.cart)
  @JoinColumn()
  Transactions: Transactions;

  @ManyToMany(() => Products, product => product.cart)
  @JoinTable({
    name: 'carts_products',
    joinColumn: {
      name: 'cartId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
  })
  product: Products[];

}
