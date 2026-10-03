import { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/wardrobeStyles";
interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  colorTag: string;
  bgColor: string;
}

export default function WardrobeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk Modal Tambah Baju
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Tops");

  // State untuk Modal Detail Baju
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);

  const categories = ["All", "Tops", "Bottoms", "Outer", "Dress", "Shoes"];

  // Data State Baju
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

  // Filter Kategori & Search Bar
  const filteredItems = wardrobeItems.filter((item) => {
    const cleanSearch = searchQuery.trim().toLowerCase();
    const cleanCategory = selectedCategory.trim().toLowerCase();

    const matchesCategory =
      cleanCategory === "all" ||
      cleanCategory === "semua" ||
      item.category.toLowerCase() === cleanCategory;

    const matchesSearch =
      cleanSearch === "" || item.name.toLowerCase().includes(cleanSearch);

    return matchesCategory && matchesSearch;
  });

  // Fungsi Tambah Baju
  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert("Peringatan", "Masukkan nama baju terlebih dahulu!");
      return;
    }

    const newItem: WardrobeItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: newItemCategory,
      colorTag: "#AEC6CF",
      bgColor: "#E3EDF7",
    };

    setWardrobeItems([newItem, ...wardrobeItems]);
    setNewItemName("");
    setIsAddModalVisible(false);
    Alert.alert("Berhasil", "Baju baru telah ditambahkan ke lemari!");
  };

  // Fungsi Hapus Baju
  const handleDeleteItem = (id: string) => {
    setWardrobeItems(wardrobeItems.filter((item) => item.id !== id));
    setSelectedItem(null);
    Alert.alert("Dihapus", "Item berhasil dihapus dari lemari.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WARDROBE</Text>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => Alert.alert("Info", "Mode kelola diaktifkan")}
        >
          <Text style={styles.editText}>Manage</Text>
        </TouchableOpacity>
      </View>

      {/* 2. SEARCH BAR */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search items, colors, or types..."
          placeholderTextColor="#A0B2C6"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 3. CATEGORY CHIPS */}
      <View style={{ maxHeight: 45, marginBottom: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((item, index) => {
            const isActive =
              selectedCategory.toLowerCase() === item.toLowerCase();
            return (
              <TouchableOpacity
                key={index}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. INFO BAR */}
      <View style={styles.infoBar}>
        <Text style={styles.infoText}>
          {filteredItems.length} Items ditampilkan
        </Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Filter", "Pilih filter berdasarkan warna atau event")
          }
        >
          <Text style={styles.filterText}>🏷 Filter ▾</Text>
        </TouchableOpacity>
      </View>

      {/* 5. GRID KATALOG BAJU */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.gridContainer}>
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => setSelectedItem(item)}
            >
              <View
                style={[styles.cardImage, { backgroundColor: item.bgColor }]}
              >
                <View
                  style={[
                    styles.colorBadge,
                    { backgroundColor: item.colorTag },
                  ]}
                />
                <Text style={{ fontSize: 36 }}>
                  {item.category === "Tops"
                    ? "👕"
                    : item.category === "Bottoms"
                      ? "👖"
                      : item.category === "Outer"
                        ? "🧥"
                        : item.category === "Dress"
                          ? "👗"
                          : "👟"}
                </Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSub}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 6. FAB TAMBAH BAJU ("+") */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setIsAddModalVisible(true)}
      >
        <Text style={styles.fabIcon}>➕</Text>
      </TouchableOpacity>

      {/* MODAL DETAIL BAJU */}
      <Modal visible={selectedItem !== null} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <View
                  style={[
                    styles.modalImage,
                    { backgroundColor: selectedItem.bgColor },
                  ]}
                >
                  <Text style={{ fontSize: 60 }}>
                    {selectedItem.category === "Tops"
                      ? "👕"
                      : selectedItem.category === "Bottoms"
                        ? "👖"
                        : selectedItem.category === "Outer"
                          ? "🧥"
                          : selectedItem.category === "Dress"
                            ? "👗"
                            : "👟"}
                  </Text>
                </View>
                <Text style={styles.modalSub}>
                  Kategori: {selectedItem.category}
                </Text>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteItem(selectedItem.id)}
                  >
                    <Text style={styles.deleteText}>🗑️ Hapus Baju</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedItem(null)}
                  >
                    <Text style={styles.closeText}>Tutup</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* MODAL TAMBAH BAJU BARU */}
      <Modal visible={isAddModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambah Item Baru 👕</Text>

            <TextInput
              style={styles.inputForm}
              placeholder="Masukkan nama baju..."
              placeholderTextColor="#A0B2C6"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            <Text style={{ marginTop: 10, fontSize: 12, color: "#5C738B" }}>
              Pilih Kategori:
            </Text>
            <View style={styles.categoryPicker}>
              {["Tops", "Bottoms", "Outer", "Dress", "Shoes"].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.miniChip,
                    newItemCategory === cat && styles.chipActive,
                  ]}
                  onPress={() => setNewItemCategory(cat)}
                >
                  <Text
                    style={[
                      styles.miniChipText,
                      newItemCategory === cat && styles.chipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddItem}>
                <Text style={styles.saveText}>Simpan Ke Wardrobe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsAddModalVisible(false)}
              >
                <Text style={styles.closeText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
