import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  colorTag: string;
  bgColor: string;
}

const CATEGORIES = ["All", "Tops", "Bottoms", "Outer", "Dress", "Shoes"];

const INITIAL_WARDROBE_ITEMS: WardrobeItem[] = [
  {
    id: "1",
    name: "Oversized Tee",
    category: "Tops",
    colorTag: "#2B2B2B",
    bgColor: "#F0F4F8",
  },
  {
    id: "2",
    name: "Linen Shorts",
    category: "Bottoms",
    colorTag: "#8B5A2B",
    bgColor: "#E3EDF7",
  },
  {
    id: "3",
    name: "Cropped Cardigan",
    category: "Outer",
    colorTag: "#AEC6CF",
    bgColor: "#D9E8F5",
  },
  {
    id: "4",
    name: "Wide Jeans",
    category: "Bottoms",
    colorTag: "#4682B4",
    bgColor: "#E1EBF5",
  },
  {
    id: "5",
    name: "Floral Summer Dress",
    category: "Dress",
    colorTag: "#E8A7A1",
    bgColor: "#FCE4EC",
  },
  {
    id: "6",
    nameBerikut adalah kode lengkap yang sudah dirapikan dan dioptimalkan. 

Beberapa perbaikan dan penyempurnaan yang telah diterapkan:
1. **Pembersihan Duplikasi Code**: Menghapus deklarasi komponen berulang dari file awal.
2. **Penggunaan `FlatList`**: Menggantikan rendering `ScrollView` + `map()` manual untuk grid produk agar performa jauh lebih efisien (*smooth scrolling* dan *memory-friendly*).
3. **Penyempurnaan Modal Detail**: Menambahkan penanganan emoji kategori yang dinamis pada modal detail agar sesuai dengan semua kategori (termasuk *Dress* dan *Shoes*).
4. **Keamanan Tipe Data (TypeScript)**: Membuat interface `WardrobeItem` secara jelas dan mengganti `any` pada *state* `selectedItem`.

```tsx
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Interface Data Item
interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  colorTag: string;
  bgColor: string;
}

export default function WardrobeScreen() {
  // State Filter & Pencarian
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State Modal & Input Item Baru
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemCategory, setNewItemCategory] = useState<string>("Tops");
  const [selectedItem, setSelectedItem] = useState<WardrobeItem null |>(null);

  // Daftar Kategori
  const categories: string[] = ["All", "Tops", "Bottoms", "Outer", "Dress", "Shoes"];

  // Initial Data Wardrobe
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([
    {
      id: "1",
      name: "Oversized Tee",
      category: "Tops",
      colorTag: "#2B2B2B",
      bgColor: "#F0F4F8",
    },
    {
      id: "2",
      name: "Linen Shorts",
      category: "Bottoms",
      colorTag: "#8B5A2B",
      bgColor: "#E3EDF7",
    },
    {
      id: "3",
      name: "Cropped Cardigan",
      category: "Outer",
      colorTag: "#AEC6CF",
      bgColor: "#D9E8F5",
    },
    {
      id: "4",
      name: "Wide Jeans",
      category: "Bottoms",
      colorTag: "#4682B4",
      bgColor: "#E1EBF5",
    },
    {
      id: "5",
      name: "Floral Summer Dress",
      category: "Dress",
      colorTag: "#E8A7A1",
      bgColor: "#FCE4EC",
    },
    {
      id: "6",
      name: "White Sneakers",
      category: "Shoes",
      colorTag: "#FFFFFF",
      bgColor: "#F5F7FA",
    },
  ]);

  // Helper untuk mendapatkan Emoji berdasarkan Kategori
  const getCategoryEmoji = (category: string): string => {
    switch (category) {
      case "Tops":
        return "👕";
      case "Bottoms":
        return "👖";
      case "Outer":
        return "🧥";
      case "Dress":
        return "👗";
      case "Shoes":
        return "👟";
      default:
        return "👔";
    }
  };

  // Logic Filtering
  const filteredItems = wardrobeItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handler Tambah Item Baru
  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert("Warning", "Please enter an item name!");
      return;
    }

    const newItem: WardrobeItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: newItemCategory,
      colorTag: "#AEC6CF",
      bgColor: "#E3EDF7",
    };

    setWardrobeItems([newItem, ...wardrobeItems]);
    setNewItemName("");
    setIsAddModalVisible(false);
    Alert.alert("Success", "New item added to your wardrobe!");
  };

  // Handler Hapus Item
  const handleDeleteItem = (id: string) => {
    setWardrobeItems(wardrobeItems.filter((item) => item.id !== id));
    setSelectedItem(null);
    Alert.alert("Deleted", "Item successfully removed from wardrobe.");
  };

  // Render Item Kartu
  const renderCardItem = ({ item }: { item: WardrobeItem }) => (
    <TouchableOpacity onPress="{()" style="{styles.card}"> setSelectedItem(item)}
      activeOpacity={0.7}
    >
      <View backgroundColor: item.bgColor style="{[styles.cardImage," { }]}>
        <View backgroundColor: item.colorTag style="{[styles.colorBadge," { }]}/>
        <Text 42 fontSize: style="{{" }}>{getCategoryEmoji(item.category)}</Text>
      </View>
      <View style="{styles.cardBody}">
        <Text numberOfLines="{1}" style="{styles.cardTitle}">
          {item.name}
        </Text>
        <Text style="{styles.cardSub}">{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style="{styles.container}">
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>

      {/* 1. HEADER */}
      <View style="{styles.header}">
        <Text style="{styles.headerTitle}">WARDROBE</Text>
        <TouchableOpacity onPress="{()" style="{styles.editBtn}"> Alert.alert("Info", "Management mode activated")}
        >
          <Text style="{styles.editText}">Manage</Text>
        </TouchableOpacity>
      </View>

      {/* 2. SEARCH BAR */}
      <View style="{styles.searchContainer}">
        <TextInput onChangeText="{setSearchQuery}" placeholder="🔍 Search items, colors, or types..." placeholderTextColor="#A0B2C6" style="{styles.searchInput}" value="{searchQuery}"/>
      </View>

      {/* 3. CATEGORY CHIPS */}
      <View 10 45, marginBottom: maxHeight: style="{{" }}>
        <ScrollView contentContainerStyle="{styles.categoryContainer}" horizontal showsHorizontalScrollIndicator="{false}">
          {categories.map((cat, index) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity && isActive key="{index}" onPress="{()" style="{[styles.chip," styles.chipActive]}> setSelectedCategory(cat)}
              >
                <Text && isActive style="{[styles.chipText," styles.chipTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. INFO BAR */}
      <View style="{styles.infoBar}">
        <Text style="{styles.infoText}">
          {filteredItems.length} items displayed
        </Text>