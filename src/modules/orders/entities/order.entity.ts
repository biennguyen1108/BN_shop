// payment.entity.ts
import { Users } from 'src/modules/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_date:Date;

  @Column()
  total_amount: number;

  @Column({ default: 'Chờ xác nhận' }) // Default order status
  status: string;
  
  @ManyToOne(() => Users, (users) => users.orders) // If you want to associate Order with a User entity
  @JoinColumn({ name: 'user_id' }) // Define the foreign key column
  users: Users; 
}

