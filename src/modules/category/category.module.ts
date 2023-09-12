import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [TypeOrmModule.forFeature([Category]),
    ConfigModule],
    controllers: [],
    providers: []
})
export class CategoryModule {}
