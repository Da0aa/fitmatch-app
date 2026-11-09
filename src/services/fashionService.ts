import { ApiResponse, Product } from "../types/fashion";

export const fetchFashionProducts = async (): Promise<Product[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products/category/womens-dresses",
      );

      if (!response.ok) {
        reject(new Error("Gagal mengambil data dari server"));
        return;
      }

      const data: ApiResponse = await response.json();

      resolve(data.products);
    } catch (error) {
      reject(new Error("Koneksi terputus, periksa internet kamu"));
    }
  });
};
