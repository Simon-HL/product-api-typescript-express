import { db } from '../models/database'
import { Product, NewProduct, ProductUpdate } from '../models/productModel'

export class ProductRepository {
    async get(): Promise<Product[]> {
        return await db.selectFrom('product')
            .selectAll()
            .execute()
    }
    
    async getById(id: number): Promise<Product | undefined> {
        return await db.selectFrom('product')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst()
    }
    
    async update(id: number, payload: ProductUpdate): Promise<Product> {
        return await db.updateTable('product')
            .set(payload)    
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
    
    async create(product: NewProduct): Promise<Product> {
        return await db.insertInto('product')
            .values(product)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
    
    async deleteProduct(id: number): Promise<Product> {
        return await db.deleteFrom('product')
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
}
