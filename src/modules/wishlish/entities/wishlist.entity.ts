// user.entity.ts
import { Products } from 'src/modules/products/entities/products.entity';
import { Users } from 'src/modules/users/entities/users.entity';
import { Entity, ManyToOne,PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,OneToMany ,ManyToMany,JoinTable} from 'typeorm';


@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, user => user.cart)
  @JoinColumn()
  user: Users;

  @OneToMany(() => Products, product => product.category,{ cascade: true })
  products: Products[];
}

