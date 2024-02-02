import { Product } from "../models/productModel";
import { ProductRepository } from "../repos/productRepository";

export class ProductService {
    constructor(private repo: ProductRepository) {}

    async get(): Promise<Product[]> {
        return await this.repo.get()
    }

    async getById(id: number): Promise<Product> {
        const product = await this.repo.getById(id)
        if (!product)
            throw new Error(`No product found for id ${id}`)

        return product
    }
    
    async create(product: Product): Promise<void> {
        await this.repo.create(product)
    }

    async update(id: number, payload: Partial<Product>): Promise<void> {
        await this.repo.update(id, payload)
    }

    async delete(id: number): Promise<void>{
        await this.repo.deleteProduct(id)
    }
}