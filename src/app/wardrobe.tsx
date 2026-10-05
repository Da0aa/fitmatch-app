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

const categories = ["All", "Tops", "Bottoms", "Outer", "Dress", "Shoes"];

export default function WardrobeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [newItemName, setNewItemName] = useState("");

  const [newItemCategory, setNewItemCategory] = useState("Tops");

  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);

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

  // ==============================
  // GET EMOJI
  // ==============================

  const getCategoryEmoji = (category: string) => {
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

  // ==============================
  // FILTER
  // ==============================

  const filteredItems = wardrobeItems.filter((item) => {
    const search = searchQuery.trim().toLowerCase();

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch =
      search === "" ||
      item.name.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  // ==============================
  // ADD ITEM
  // ==============================

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert("Peringatan", "Masukkan nama pakaian terlebih dahulu!");
      return;
    }

    const newItem: WardrobeItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: newItemCategory,
      colorTag: "#AEC6CF",
      bgColor: "#E3EDF7",
    };

    setWardrobeItems((currentItems) => [newItem, ...currentItems]);

    setNewItemName("");
    setNewItemCategory("Tops");
    setIsAddModalVisible(false);

    Alert.alert("Berhasil", "Pakaian berhasil ditambahkan ke wardrobe!");
  };

  // ==============================
  // DELETE ITEM
  // ==============================

  const handleDeleteItem = (id: string) => {
    setWardrobeItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );

    setSelectedItem(null);

    Alert.alert("Dihapus", "Pakaian berhasil dihapus dari wardrobe.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>WARDROBE</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            Alert.alert("Info", "Mode kelola wardrobe diaktifkan.")
          }
        >
          <Text style={styles.editText}>Manage</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search items, colors, or types..."
          placeholderTextColor="#A0B2C6"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* CATEGORY */}

      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <TouchableOpacity
                key={category}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* INFO BAR */}

      <View style={styles.infoBar}>
        <Text style={styles.infoText}>
          {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"}{" "}
          displayed
        </Text>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Filter",
              "Pilih kategori menggunakan tombol kategori di atas.",
            )
          }
        >
          <Text style={styles.filterText}>🏷 Filter ▾</Text>
        </TouchableOpacity>
      </View>

      {/* GRID */}

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {filteredItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>👕</Text>

              <Text style={styles.emptyTitle}>No items found</Text>

              <Text style={styles.emptyText}>
                Try another search or category.
              </Text>
            </View>
          ) : (
            filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => setSelectedItem(item)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.cardImage,
                    {
                      backgroundColor: item.bgColor,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.colorBadge,
                      {
                        backgroundColor: item.colorTag,
                      },
                    ]}
                  />

                  <Text style={styles.itemEmoji}>
                    {getCategoryEmoji(item.category)}
                  </Text>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text style={styles.cardSub}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* ADD BUTTON */}

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setIsAddModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>

      {/* DETAIL MODAL */}

      <Modal
        visible={selectedItem !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>

                <View
                  style={[
                    styles.modalImage,
                    {
                      backgroundColor: selectedItem.bgColor,
                    },
                  ]}
                >
                  <Text style={styles.modalEmoji}>
                    {getCategoryEmoji(selectedItem.category)}
                  </Text>
                </View>

                <Text style={styles.modalSub}>
                  Category: {selectedItem.category}
                </Text>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteItem(selectedItem.id)}
                  >
                    <Text style={styles.deleteText}>🗑️ Delete Item</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedItem(null)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* ADD ITEM MODAL */}

      <Modal
        visible={isAddModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Item 👕</Text>

            <TextInput
              style={styles.inputForm}
              placeholder="Enter item name..."
              placeholderTextColor="#A0B2C6"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            <Text style={styles.selectLabel}>Select Category:</Text>

            <View style={styles.categoryPicker}>
              {categories
                .filter((category) => category !== "All")
                .map((category) => {
                  const isSelected = newItemCategory === category;

                  return (
                    <TouchableOpacity
                      key={category}
                      style={[styles.miniChip, isSelected && styles.chipActive]}
                      onPress={() => setNewItemCategory(category)}
                    >
                      <Text
                        style={[
                          styles.miniChipText,
                          isSelected && styles.chipTextActive,
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddItem}>
                <Text style={styles.saveText}>Save to Wardrobe</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => {
                  setNewItemName("");
                  setIsAddModalVisible(false);
                }}
              >
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
