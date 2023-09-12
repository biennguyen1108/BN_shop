import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Category } from '../category/entities';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Products,Category]),
ConfigModule],
  controllers: [],
  providers: []
})
export class ProductsModule {}
