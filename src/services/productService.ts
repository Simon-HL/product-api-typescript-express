import { Product } from "../types";

const _exampleProducts: Product[] = [{
    id: 1,
    name: 'flask',
    price: 50,
    quantity: 2
}]

export class ProductService {
    async get(): Promise<Product[]> {
        return _exampleProducts
    }

    async getById(id: number): Promise<Product> {
        return _exampleProducts[0]
    }
    
    async create(product: Product): Promise<void> {
        return
    }

    async update(id: number, payload: Partial<Product>): Promise<void> {
        return
    }

    async delete(id: number): Promise<void>{
        return
    }
}