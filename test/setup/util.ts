import { Kysely } from 'kysely'
import { Database, TableName } from '../../src/models/database'

export async function populateDb(db: Kysely<Database>, table: TableName, testData: any[]) {
    await db.insertInto(table)
        .values(testData)
        .execute()
}