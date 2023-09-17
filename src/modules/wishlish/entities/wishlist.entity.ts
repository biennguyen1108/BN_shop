// user.entity.ts
import { Products } from 'src/modules/products/entities/products.entity';
import { Users } from 'src/modules/users/entities/users.entity';
import { Entity,PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,OneToMany ,ManyToMany,JoinTable} from 'typeorm';
import { Transactions } from 'src/modules/transactions/entities/transactions.entity';
import { wishlist_product } from './wishlist_products.entity';


@Entity()
export class wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;
  
  @Column()
  total_quantity: number;


  @OneToOne(() => Users, user => user.cart)
  @JoinColumn()
  user: Users;

  @OneToMany(()=>wishlist_product , wishlist_product => wishlist_product.wishlist)
  wishlist_product: wishlist_product[];

  @OneToOne(() => Transactions, Transactions => Transactions.cart)
  @JoinColumn()
  Transactions: Transactions;

  @ManyToMany(() => Products, product => product.wishlist)
  @JoinTable({
    name: 'wishlist_product',
    joinColumn: {
      name: 'wishlistId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
  })
  product: Products[];

}
