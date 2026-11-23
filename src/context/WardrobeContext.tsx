import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  addWardrobeToCloud,
  deleteWardrobeFromCloud,
  fetchWardrobeFromCloud,
  updateWardrobeInCloud,
} from "../services/wardrobeService";

import { useAuth } from "./AuthContext";

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  imageUri: string;
}

interface WardrobeContextData {
  wardrobeItems: WardrobeItem[];

  addItem: (item: Omit<WardrobeItem, "id">) => Promise<void>;

  updateItem: (id: string, item: Omit<WardrobeItem, "id">) => Promise<void>;

  removeItem: (id: string) => Promise<void>;

  isLoading: boolean;
}

const WardrobeContext = createContext<WardrobeContextData>(
  {} as WardrobeContextData,
);

export function WardrobeProvider({ children }: { children: ReactNode }) {
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  // Mengambil data wardrobe dari Supabase
  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setWardrobeItems([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const data = await fetchWardrobeFromCloud();

        setWardrobeItems(data);
      } catch (error) {
        console.error("Gagal memuat wardrobe:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  // CREATE: Menambahkan pakaian
  const addItem = async (item: Omit<WardrobeItem, "id">) => {
    try {
      const newItem = await addWardrobeToCloud(item);

      setWardrobeItems((prev) => [
        {
          id: newItem.id,
          name: newItem.name,
          category: newItem.category,
          imageUri: newItem.image_url,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Gagal menambah item:", error);
      throw error;
    }
  };

  // UPDATE: Memperbarui pakaian
  const updateItem = async (id: string, item: Omit<WardrobeItem, "id">) => {
    try {
      const updatedItem = await updateWardrobeInCloud(id, item);

      setWardrobeItems((prev) =>
        prev.map((oldItem) =>
          oldItem.id === id
            ? {
                id: updatedItem.id,
                name: updatedItem.name,
                category: updatedItem.category,
                imageUri: updatedItem.image_url,
              }
            : oldItem,
        ),
      );
    } catch (error) {
      console.error("Gagal memperbarui item:", error);
      throw error;
    }
  };

  // DELETE: Menghapus pakaian
  const removeItem = async (id: string) => {
    try {
      await deleteWardrobeFromCloud(id);

      setWardrobeItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      throw error;
    }
  };

  return (
    <WardrobeContext.Provider
      value={{
        wardrobeItems,
        addItem,
        updateItem,
        removeItem,
        isLoading,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  return useContext(WardrobeContext);
}
