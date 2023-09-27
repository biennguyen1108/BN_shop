import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { updateWishlistDTO } from './dto/updateWishlist.dto';
import { WishlistService } from './wishlist .service';
import { Wishlists} from './entities';
import { WishlistsProduct} from './entities/wishlist_products.entity';


@Controller('wishlist')

export class WishlishController {

    constructor(private readonly wishlistsService: WishlistService) { }

    @UseGuards(new RoleGuard(['user']))
    @UseGuards(AuthGuard)
    @Get(':userId')
    async getWishlistByUserId(@Param('userId') userId: number) {
        return this.wishlistsService.getWishlistByUserId(userId);
    }

    @UseGuards(new RoleGuard(['user']))
    @UseGuards(AuthGuard)
    @Post('/userId/:userId/productId/:productId')
    async addToWishlist(@Param('userId') userId: number, @Param('productId') productId: number): Promise<string> {
        return this.wishlistsService.addToWishlist(userId, productId);
    }

    @UseGuards(new RoleGuard(['user']))
    @UseGuards(AuthGuard)
    @Patch()
    async updateWishlist(@Body() updateWishlistDTO: updateWishlistDTO) {
        return await this.wishlistsService.updateWishlist(updateWishlistDTO);
    }

    @UseGuards(new RoleGuard(['user']))
    @UseGuards(AuthGuard)
    @Delete('remove/:userId/:productId')
    async removeFromWishlist(@Param('userId') wishlistId: string, @Param('productId') productId: string): Promise<Wishlists> {
    const wishlist = await this.wishlistsService.removeFromWishlist(wishlistId, productId);
    return wishlist;
    }
}
