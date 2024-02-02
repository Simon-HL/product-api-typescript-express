import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('product')
        .addColumn('id', 'serial', (cb) => cb.primaryKey())
        .addColumn('name', 'text', (cb) => cb.notNull())
        .addColumn('price', 'numeric', (cb) => cb.notNull())
        .addColumn('quantity', 'numeric', (cb) => cb.notNull())
        .addColumn('created_at', 'timestamp', (cb) => cb.notNull().defaultTo(sql`NOW()`))
        .addColumn('updated_at', 'timestamp', (cb) => cb.notNull().defaultTo(sql`NOW()`))
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('product').execute()
}