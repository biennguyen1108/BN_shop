// carts-products.entity.ts
import { Entity, ManyToOne, Column, JoinColumn, PrimaryColumn } from 'typeorm';
import { wishlist } from './wishlist.entity';
import { Products } from 'src/modules/products/entities/products.entity';

@Entity()
export class wishlist_product {
  push(wishlist_product: wishlist_product) {
      throw new Error('Method not implemented.');
  }
  @PrimaryColumn({ name: 'wishlistId' })
  wishlistId: number;

  @PrimaryColumn({ name: 'productId' })
  productId: number;
  
  @Column({ default: 1 }) 
  quantity: number;

  @ManyToOne(() => wishlist, wishlist => wishlist.wishlist_product)
  @JoinColumn({ name: "wishlistId", referencedColumnName: 'id' })
  wishlist: wishlist;

  @ManyToOne(() => Products, product => product.wishlist_product)
  @JoinColumn({ name: "productId", referencedColumnName: 'id' })
  product: Products;

  
}

