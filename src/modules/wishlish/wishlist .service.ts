import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlists} from './entities';
import { WishlistsProduct} from './entities/wishlist_products.entity';
import { Products } from '../products/entities';
import { Users } from '../users/entities';
import { updateWishlistDTO } from './dto/updateWishlist.dto';
import { successException } from '../Exception/succesExeption';

@Injectable()
export class  WishlistService {
    constructor(
        @InjectRepository(Wishlists)
        private readonly  wishlistsRepository: Repository<Wishlists>,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
        @InjectRepository(WishlistsProduct)
        private readonly  wishlistsProductRepository: Repository<WishlistsProduct>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) { }

    async getWishlistByUserId(@Param('userId') userId: number): Promise<Wishlists[]> {
        const wishlist = await this.wishlistsRepository.createQueryBuilder('wishlist')
            .leftJoinAndSelect('wishlist.wishlistsProduct', 'wishlistsProduct')
            .leftJoinAndSelect('wishlistsProduct.product', 'product')
            .where('wishlist.user = :userId', { userId })
            .getMany();
            if (!wishlist || wishlist.length === 0) {
                throw new NotFoundException(`No wishlist found for userId ${userId}`);
            }
        return wishlist;
    }

    async addToWishlist(@Param('userId') userId: number, @Param('productId') productId: number): Promise<string> {
        let wishlist = await this.wishlistsRepository.createQueryBuilder('wishlist')
            .where('wishlist.user = :userId', { userId })
            .getOne();

        let product = await this.productsRepository.createQueryBuilder('product')
            .where('product.id = :productId', { productId })
            .getOne();

        let wishlistsProduct = await this.wishlistsProductRepository.createQueryBuilder('wishlistsProduct')
            .where('wishlistsProduct.productId = :productId', { productId })
            .getOne();

        if (!wishlist) {
            // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
            const user = await this.usersRepository.findOne({ where: { id: userId } });
            wishlist = new Wishlists();
            wishlist.user = user;
            wishlist.total_price = 0;
            wishlist.total_quantity = 0;
            await this.wishlistsRepository.save(wishlist);

            const wishlistsProduct = new WishlistsProduct();
            wishlistsProduct.wishlistId = wishlist.id;
            wishlistsProduct.productId = productId;
            wishlistsProduct.quantity = 1;
            await this.wishlistsProductRepository.save(wishlistsProduct);

            wishlist.total_quantity += 1;
            wishlist.total_price += product.price;
            await this.wishlistsRepository.save(wishlist);
            throw new successException('thêm sản phẩm thành công');    

        }
        else {
            if (wishlistsProduct) {
                wishlistsProduct.quantity += 1
                await this.wishlistsProductRepository.save(wishlistsProduct);

                wishlist.total_price += product.price * wishlistsProduct.quantity;
                await this.wishlistsRepository.save(wishlist);
                throw new successException('thêm sản phẩm thành công');    

            }
            else {
                const wishlistsProduct = new WishlistsProduct();
                wishlistsProduct.wishlistId = wishlist.id;
                wishlistsProduct.productId = productId;
                wishlistsProduct.quantity = 1;
                await this.wishlistsProductRepository.save(wishlistsProduct);
                // Cập nhật thông tin của giỏ hàng
                wishlist.total_quantity += 1;
                wishlist.total_price += product.price;
                await this.wishlistsRepository.save(wishlist)
                throw new successException('thêm sản phẩm thành công');    
            }
        }
    }

    async updateWishlist(updateWishlistDTO: updateWishlistDTO): Promise<Wishlists> {
        const { userId, productId, operation } = updateWishlistDTO;

        let wishlist = await this.wishlistsRepository.createQueryBuilder('wishlist')
            .where('wishlist.user = :userId', { userId })
            .getOne();

        let product = await this.productsRepository.createQueryBuilder('product')
            .where('product.id = :productId', { productId })
            .getOne();

        let wishlistsProduct = await this.wishlistsProductRepository.createQueryBuilder('cartsProduct')
            .where('wishlist_product.productId = :productId', { productId })
            .getOne();

        if (operation === 'add') {
            wishlistsProduct.quantity += 1;
            wishlist.total_price += product.price;
        } else if (operation === 'remove') {
            wishlistsProduct.quantity -= 1;
            wishlist.total_price -= product.price;
        }
        await this.wishlistsRepository.save(wishlist);
        await this.wishlistsProductRepository.save(wishlistsProduct);

        return wishlist;
    }

    async removeFromWishlist(userId: string, productId: string): Promise<Wishlists> {
        let wishlist = await this.wishlistsRepository.createQueryBuilder('wishlist')
            .where('wishlist.user = :userId', { userId })
            .getOne();

        let product = await this.productsRepository.createQueryBuilder('product')
            .where('product.id = :productId', { productId })
            .getOne();

            let wishlistsProduct = await this.wishlistsProductRepository.createQueryBuilder('wishlistsProduct')
                .where('wishlistsProduct.productId = :productId', { productId })
                .andWhere('wishlistsProduct.cartId = :id', { id :wishlist.id})
                .getOne();

        if (wishlistsProduct) {
            await this.wishlistsProductRepository.remove(wishlistsProduct);
            wishlist.total_price -= product.price * wishlistsProduct.quantity;
            wishlist.total_quantity -= 1;
            await this.wishlistsRepository.save(wishlist);
        }
        return wishlist;
    }
}
