// user.entity.ts
import { Users } from 'src/modules/users/entities/users.entity';
import { Entity,PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';


@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  consignee_name: string
  
  @Column()
  phonenumber: Number;

  @Column()
  city: string;

  @Column()
  state : string;

  @Column()
  postal_code : string;

  @ManyToMany(() => Users, (users) => users.addresses)
  users: Users[];
}
