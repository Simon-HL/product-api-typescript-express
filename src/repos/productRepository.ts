import { db } from '../models/database'
import { Product, NewProduct, ProductUpdate } from '../models/productModel'
import { formatISO } from 'date-fns'

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
        const timestamp = formatISO(new Date())
        
        return await db.updateTable('product')
            .set({...payload, updated_at: timestamp})    
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirstOrThrow()
    }
    
    async create(product: NewProduct): Promise<Product> {
        const timestamp = formatISO(new Date())

        return await db.insertInto('product')
            .values({...product, created_at: timestamp})
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
