import { Carts } from "src/modules/carts/entities/carts.entity";
import { Payment } from "src/modules/payment/entities/payment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transactions{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transaction_date: Date;

    @Column()
    transaction_status: string;

    @Column()
    transaction_amount: string;
    
    @OneToOne(() => Carts, (cart) => cart.Transactions)
    @JoinColumn({ name: 'cart_id' })
    cart: Carts;

    @ManyToOne(() => Payment, (payment) => payment.transactions)
    @JoinColumn({ name: 'payment_id' })
    payment: Payment;
}