export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry: string;
};

export type ProductCart = {
  qty: number;
  product: Product
}

export type Cart = {
  products: ProductCart[]
}