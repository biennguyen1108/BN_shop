import { Category } from "src/modules/category/entities";

export class UpdateProductDTO {
    product_name: string;
    brand: string;
    price: number;
    description: string;
    image: string;
    sku: number;
    sold_quantity: number;
    quantity: number; 
    status: string;
    delete_at: Date;
    category: Category ;
}