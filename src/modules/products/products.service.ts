import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { getProductsDto } from './dto/getProductsDto.dto';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { Products } from './entities/products.entity';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductDTO } from './dto/Product.dto';
import { successException } from '../Exception/succesExeption';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ){}

  async searchProducts(searchDto: getProductsDto): Promise<Products[]> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.delete_At IS NULL')
      .andWhere('product.status = :status', { status: 'active' })
    if (searchDto.productName) {
      
      query.andWhere('LOWER(product.product_name) LIKE LOWER(:productName)', { productName: `%${searchDto.productName}%` });
    }
    if (searchDto.categoryId !== undefined) {
      query.andWhere('category.id = :categoryId', { categoryId: searchDto.categoryId });
    }
    if (searchDto.sortByPrice) {
      query.orderBy('product.price', searchDto.sortByPrice);
    }
    if (searchDto.sortByQuantitySold) {
      query.orderBy('product.quantity_sold', searchDto.sortByQuantitySold);
    }
    return query.getMany();
  }

  // Tìm sản phẩm theo ID
  async findById(id: number): Promise<ProductDTO> {
    const product = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id })
      .andWhere('product.delete_At IS NULL')
      .getOne();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const productDTO: ProductDTO = {
      id: product.id,
      product_name: product.product_name,
      brand: product.brand,
      price: product.price,
      sku: product.sku,
      quantity: product.quantity,
      status: product.status,
      delete_at: product.delete_at,
      sold_quantity: product.sold_quantity,
      image: product.image,
      description: product.description,
      category: product.category, 
    };

    return productDTO;
  }
  
  // Thêm sản phẩm
  async createProduct(image: Express.Multer.File, createProductDTO: CreateProductDTO): Promise<ProductDTO> {
    const product = new Products();
    product.product_name = createProductDTO.product_name;
    product.brand = createProductDTO.brand;
    product.category = createProductDTO.category;
    product.price = createProductDTO.price;
    product.description = createProductDTO.description;
    product.image = image ? image.filename : null; // Lưu tên tệp tin hình ảnh
    product.sku = createProductDTO.sku;
    product.quantity = createProductDTO.quantity_inventory;
    product.status = 'active';
    product.delete_at = null;
    product.sold_quantity = 0;

    return await this.productsRepository.save(product);
  }

  async updateProduct(id: number, image: Express.Multer.File, updateProductDTO: UpdateProductDTO): Promise<ProductDTO> {
    const product = await this.productsRepository.findOne({ where: { id, delete_at: null } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found or already deleted`);
    }

    if (updateProductDTO.delete_at === null) {
      product.delete_at = null;
      product.status = 'active';
    }

    if (product.status === 'inactive'  && product.delete_at !== null) {
      throw new NotFoundException('Cannot update product with ceased, inactive status, and deleted product');
    }

    // Update other fields
    product.product_name = updateProductDTO.product_name ?? product.product_name;
    product.sold_quantity = updateProductDTO.sold_quantity ?? product.sold_quantity;
    product.quantity = updateProductDTO.quantity ?? product.quantity;
    product.status = updateProductDTO.status ?? product.status;
    product.delete_at = updateProductDTO.delete_at ? new Date(updateProductDTO.delete_at) : product.delete_at;
    product.brand = updateProductDTO.brand ?? product.brand;
    product.category = updateProductDTO.category !== undefined ? updateProductDTO.category : null;
    product.price = updateProductDTO.price ?? product.price;
    product.description = updateProductDTO.description ?? product.description;
    product.sku = updateProductDTO.sku ?? product.sku;
    // Process the image file
    if (image) {
      product.image = image.filename;
    }

  
    return await this.productsRepository.save(product);

  }
  // Xóa sản phẩm theo ID
  async deleteProduct(id: number): Promise<void> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.delete_at = new Date();
    await this.productsRepository.save(product);
    throw new successException('Delete Product Succesfull');
  }
}

