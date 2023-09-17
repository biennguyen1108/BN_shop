import { Carts } from "src/modules/carts/entities/carts.entity";
import { CartsProducts } from "src/modules/carts/entities/carts_products.entity";
import { Category } from "src/modules/category/entities/category.entity";
import { wishlist } from "src/modules/wishlish/entities";
import { wishlist_product } from "src/modules/wishlish/entities/wishlist_products.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Products{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;

    @Column()
    description : string;

    @Column()
    price : number;
    
    @Column()
    old_price : number;

    @Column()
    brand : string;

    @Column()
    sku : number;

    @Column()
    image : string;

    @Column()
    quantity : number;

    @Column()
    sold_quantity : number;

    @Column({type: 'timestamp',default: null})
    delete_at : Date;

    @Column()
    status: string;

    @Column()
    create_at: Date;

    @ManyToMany(() => Carts, cart => cart.product)
    cart: Carts[]

    @OneToMany(() => CartsProducts, cartsProduct => cartsProduct.product)
    cartsProducts: CartsProducts[];

    @ManyToMany(() => wishlist, wishlist => wishlist.product)
    wishlist: wishlist[]

    @OneToMany(() => wishlist_product, wishlist_product => wishlist_product.product)
    wishlist_product: wishlist_product[];
  
    @ManyToOne(() => Category, category => category.products, { nullable: true })
    category: Category | null;
}



