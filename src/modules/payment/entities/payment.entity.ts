// payment.entity.ts
import { Transactions } from 'src/modules/transactions/entities/transactions.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @OneToMany(() => Transactions, transactions => transactions.payment)
  transactions: Transactions;
}
