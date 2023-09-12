import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule} from '@nestjs/config'; 
import { Users } from '../users/entities';

  @Module({
    imports:[
      TypeOrmModule.forFeature([Users]),
      JwtModule.register({
        global:true,
        secret:'123456',
        signOptions:{expiresIn:14400}
      }),
      ConfigModule
    ],
    controllers: [],
    providers: []
  })
export class AuthModule {}

