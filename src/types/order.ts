import { ProductCart } from "./product";

export type OrdersStatus = "pending" | "ready" | "delivered";

export type Order = {
  client: string;
  table: string;
  products: ProductCart[];
  userId: number,
  status: OrdersStatus;
  dataEntry: string;
  dateProcessed: string;
  id: string;
}