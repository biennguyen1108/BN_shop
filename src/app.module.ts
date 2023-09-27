import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path'; // Import module path
import { FirebaseService } from './modules/firebase/firebase.service';
import { PassportModule } from '@nestjs/passport';
import { CartsModule } from './modules/carts/carts.module';
import { CategoryModule } from './modules/category/category.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { GoogleStrategy } from './modules/strategies/google.strategy';
import { FirebaseController } from './modules/firebase/firebase.controller';
import { AddressModule } from './modules/address/address.module';
import { WishlishModule } from './modules/wishlish/wishlist .module';
// import * as redisStore from 'cache-manager-redis-store';



@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      // store: redisStore,
      host: process.env.REDIS_HOST, 
      port: parseInt(process.env.REDIS_PORT),
      auth_pass: process.env.REDIS_PASS, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DB'),

        entities:  [path.join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
        isGlobal: true,
      }),
      inject: [ConfigService], 
    }),
    CartsModule,
    AuthModule,
    CategoryModule,
    PaymentModule,
    ProductsModule,
    UsersModule,
    RolesModule,
    AddressModule,
    WishlishModule
  ],
  controllers: [FirebaseController],
  providers: [FirebaseService ,GoogleStrategy,],
})
export class AppModule {
  
}