"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "../../../../sanity.types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CartProduct = {
  id: string
  product: Product
  price: number
  quantity: number
  subtotal: number
}

export const columns: ColumnDef<CartProduct>[] = [
  {
    accessorKey: "product",
    header: "PRODUCT",
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "quantity",
    header: "QUANTITY",
  },
  {
    accessorKey: "subtotal",
    header: "SUBTOTAL",
  },
]
