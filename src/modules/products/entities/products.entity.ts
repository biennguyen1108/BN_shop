import { Carts } from "src/modules/carts/entities/carts.entity";
import { CartsProducts } from "src/modules/carts/entities/carts_products.entity";
import { Category } from "src/modules/category/entities/category.entity";
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
    brand : number;

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
  
    @ManyToOne(() => Category, category => category.products, { nullable: true })
    category: Category | null;
}



