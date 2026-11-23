// src/services/wardrobeService.ts
import { supabase } from "../lib/supabase";

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  imageUri: string;
}

// 1. Mengambil data dari Supabase
export const fetchWardrobeFromCloud = async (): Promise<WardrobeItem[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User tidak ditemukan");

  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Ubah format dari database (snake_case) ke UI (camelCase)
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    imageUri: item.image_url,
  }));
};

// 2. Menyimpan data ke Supabase
export const addWardrobeToCloud = async (item: Omit<WardrobeItem, "id">) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User tidak ditemukan");

  const { data, error } = await supabase
    .from("wardrobe_items")
    .insert([
      {
        user_id: user.id,
        name: item.name,
        category: item.category,
        image_url: item.imageUri,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 3. Menghapus data di Supabase
export const deleteWardrobeFromCloud = async (id: string) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("User tidak ditemukan");

  const { error } = await supabase
    .from("wardrobe_items")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
};

// 4. Memperbarui data pakaian di Supabase
export const updateWardrobeInCloud = async (
  id: string,
  item: Omit<WardrobeItem, "id">,
) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("User tidak ditemukan");

  const { data, error } = await supabase
    .from("wardrobe_items")
    .update({
      name: item.name,
      category: item.category,
      image_url: item.imageUri,
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw error;

  return data;
};
