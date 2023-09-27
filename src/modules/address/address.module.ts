import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/entities';
import { Users } from '../users/entities';
import { ConfigModule } from '@nestjs/config';
import { Address } from './entities';
import { address_user } from './entities/address_user.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';


@Module({
  imports: [TypeOrmModule.forFeature([Address,address_user,Products,Users]),
  ConfigModule],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
