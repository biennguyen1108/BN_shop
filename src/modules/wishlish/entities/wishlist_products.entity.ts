// carts-products.entity.ts
import { Entity, ManyToOne, Column, JoinColumn, PrimaryColumn } from 'typeorm';
import { Wishlists } from './wishlist.entity';
import { Products } from 'src/modules/products/entities/products.entity';

@Entity()
export class WishlistsProduct {
  push(WishlistsProduct: WishlistsProduct) {
      throw new Error('Method not implemented.');
  }
  @PrimaryColumn({ name: 'wishlistId' })
  wishlistId: number;

  @PrimaryColumn({ name: 'productId' })
  productId: number;
  
  @Column({ default: 1 }) 
  quantity: number;

  @ManyToOne(() => Wishlists, wishlist => wishlist.wishlistsProduct)
  @JoinColumn({ name: "wishlistId", referencedColumnName: 'id' })
  wishlist: Wishlists;

  @ManyToOne(() => Products, product => product.wishlistsProduct)
  @JoinColumn({ name: "productId", referencedColumnName: 'id' })
  product: Products;

  
}

