import { after, afterEach, before, beforeEach, describe, it } from "node:test"
import { sql } from 'kysely'
import { db } from '../src/models/database'
import { ProductRepository } from '../src/repos/productRepository'
import assert from "node:assert"
import { populateDb } from "./setup/util"
import { productsTestData } from "./setup/testData"

describe('ProductRepository', async () => {
    before(async () => {
        await db.schema.createTable('product')
            .addColumn('id', 'serial', (cb) => cb.primaryKey())
            .addColumn('name', 'varchar', (cb) => cb.notNull())
            .addColumn('price', 'numeric', (cb) => cb.notNull())
            .addColumn('quantity', 'numeric', (cb) => cb.notNull())
            .addColumn('dateCreated', 'varchar', (cb) => cb.notNull())
            .addColumn('dateModified', 'varchar', (cb) => cb.notNull())
            .execute()
    })

    beforeEach(async () => {
        await populateDb(db, 'product', productsTestData)
    })

    afterEach(async () => {
        await sql`truncate table ${sql.table('product')}`.execute(db)
    })

    after(async () => {
        await db.schema.dropTable('product').execute()
    })

    it('should get all products', async () => {
        const repo = new ProductRepository()
        const products = await repo.get()

        assert.equal(products.length, 3)
    })

    it('should get a product by id', async () => {
        const repo = new ProductRepository()
        const product = await repo.getById(2)

        assert.equal(product?.id, 2)
        assert.equal(product?.name, 'Bucket')
        assert.equal(product?.price, 10)
    })

    it('should update an existing product', async () => {
        const repo = new ProductRepository()
        const payload = { price: 20 }

        const product = await repo.update(2, payload)

        assert.equal(product?.name, 'Bucket')
        assert.equal(product?.price, 20)
    })

    it('should create a new product', async () => {
        const repo = new ProductRepository()
        const newProduct = { 
            name: 'Car',
            price: 2000,
            quantity: 1
        }

        const product = await repo.create(newProduct)

        assert.equal(product?.name, 'Car')
        assert.equal(product?.price, 2000)
    })

    it('should delete a product', async () => {
        const repo = new ProductRepository()

        const product = await repo.deleteProduct(2)

        assert.equal(product?.name, 'Bucket')
        assert.equal(product?.price, 10)
    })
})