import { 
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable
  } from 'kysely'

export interface ProductTable {
    id: Generated<number>
    name: string
    price: number
    quantity: number
    dateCreated: ColumnType<string, string | undefined, never>
    dateModified: ColumnType<string, string | undefined, string | undefined>
}

export type Product = Selectable<ProductTable>
export type NewProduct = Insertable<ProductTable>
export type ProductUpdate = Updateable<ProductTable>