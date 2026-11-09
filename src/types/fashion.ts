export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
}

export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
