import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const storageAdapter = {
  getItem: async (key: string) => {
    if (Platform.OS === "web") {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error("Gagal menyimpan ke localStorage", e);
      }
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    if (Platform.OS === "web") {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error("Gagal menghapus dari localStorage", e);
      }
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};
