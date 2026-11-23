import { ApiResponse, Product } from "../types/fashion";

export interface ExploreOutfit {
  id: string;
  title: string;
  category: string;
  tags: string;
  imageUrl: string;
}

// Fungsi lama Anda (Biarkan saja)
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

// --- FUNGSI BARU UNTUK EXPLORE (DIPERBAIKI) ---
export const fetchExploreOutfits = async (): Promise<ExploreOutfit[]> => {
  try {
    // Kita request beberapa kategori fashion sekaligus secara paralel
    // menggunakan Promise.all agar cepat
    const urls = [
      "https://dummyjson.com/products/category/mens-shirts?limit=10",
      "https://dummyjson.com/products/category/womens-dresses?limit=10",
      "https://dummyjson.com/products/category/mens-shoes?limit=10",
      "https://dummyjson.com/products/category/womens-shoes?limit=10",
    ];

    const responses = await Promise.all(urls.map((url) => fetch(url)));

    // Cek apakah ada response yang gagal
    for (const res of responses) {
      if (!res.ok) throw new Error("Gagal mengambil data dari server");
    }

    // Ubah semua response menjadi JSON
    const dataArrays = await Promise.all(responses.map((res) => res.json()));

    // Gabungkan semua produk dari berbagai kategori menjadi satu array
    let allProducts: any[] = [];
    dataArrays.forEach((data) => {
      allProducts = [...allProducts, ...data.products];
    });

    // Format data agar sesuai dengan UI
    const formattedData: ExploreOutfit[] = allProducts.map((item: any) => {
      const categories = ["Casual", "Formal", "Streetwear", "Korean"];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const tags = ["Fresh", "Cool", "Elegant", "Comfy", "Trendy"];
      const randomTag = tags[Math.floor(Math.random() * tags.length)];

      return {
        id: item.id.toString(),
        title: item.title,
        category: randomCategory,
        tags: randomTag,
        imageUrl: item.thumbnail,
      };
    });

    // Acak urutan datanya agar tidak berkelompok per kategori
    return formattedData.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error di fetchExploreOutfits:", error);
    throw error;
  }
};
