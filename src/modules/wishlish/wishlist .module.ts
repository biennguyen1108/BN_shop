import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/entities';
import { Users } from '../users/entities';
import { ConfigModule } from '@nestjs/config';
import { Wishlists} from './entities';
import { WishlistsProduct} from './entities/wishlist_products.entity';
import { WishlishController } from './wishlist .controller';
import { WishlistService } from './wishlist .service';


@Module({
  imports: [TypeOrmModule.forFeature([Wishlists,WishlistsProduct,Products,Users]),
  ConfigModule],
  controllers: [WishlishController],
  providers: [WishlistService]
})
export class WishlishModule {}
