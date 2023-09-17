import { IsNotEmpty } from "class-validator";
import { Category } from "src/modules/category/entities";

export class ProductDTO {
    id: number;
    product_name: string;
    brand: string;
    price: number;
    quantity: number;
    sku: number;
    sold_quantity: number;
    status: string;
    delete_at: Date;
    image: string;
    description: string;
    category: Category;
}