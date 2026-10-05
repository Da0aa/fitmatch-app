import { useState } from "react";
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

// Definisi tipe data item wardrobe
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

  // State untuk Modal Tambah Item
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Tops");

  // State untuk Modal Detail Item
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);

  const categories = ["All", "Tops", "Bottoms", "Outer", "Dress", "Shoes"];

  // Initial Wardrobe Data
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

  // Filter Logic (Search & Category)
  const filteredItems = wardrobeItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handler Tambah Item
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WARDROBE</Text>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => Alert.alert("Info", "Manage mode activated")}
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
            const isActive = selectedCategory === item;
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
          {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"}{" "}
          displayed
        </Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Filter", "Select filter option by color or occasion")
          }
        >
          <Text style={styles.filterText}>🏷 Filter ▾</Text>
        </TouchableOpacity>
      </View>

      {/* 5. GRID CATALOG */}
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
                  {getCategoryEmoji(item.category)}
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

      {/* 6. FAB ADD ITEM BUTTON */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setIsAddModalVisible(true)}
      >
        <Text style={styles.fabIcon}>➕</Text>
      </TouchableOpacity>

      {/* DETAIL MODAL */}
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
                    <Text style={styles.deleteText}>🗑️️ Delete Item</Text>
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
      <Modal visible={isAddModalVisible} animationType="fade" transparent>
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

            <Text style={{ marginTop: 10, fontSize: 12, color: "#5C738B" }}>
              Select Category:
            </Text>
            <View style={styles.categoryPicker}>
              {categories
                .filter((cat) => cat !== "All")
                .map((cat) => (
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
                <Text style={styles.saveText}>Save to Wardrobe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsAddModalVisible(false)}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    letterSpacing: 1,
  },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F0F5FA",
    borderRadius: 12,
  },
  editText: { fontSize: 12, color: "#4A729D", fontWeight: "600" },
  searchContainer: { paddingHorizontal: 20, marginBottom: 12 },
  searchInput: {
    backgroundColor: "#F0F5FA",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 13,
    color: "#1E293B",
  },
  categoryContainer: { paddingLeft: 20, paddingRight: 10 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F5FA",
    marginRight: 8,
    height: 35,
    justifyContent: "center",
  },
  chipActive: { backgroundColor: "#7FA8D0" },
  chipText: { fontSize: 12, color: "#4A729D" },
  chipTextActive: { color: "#FFFFFF", fontWeight: "bold" },
  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  infoText: { fontSize: 12, color: "#64748B" },
  filterText: { fontSize: 12, color: "#1E293B", fontWeight: "600" },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  cardImage: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  colorBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  cardBody: { padding: 10 },
  cardTitle: { fontSize: 13, fontWeight: "bold", color: "#1E293B" },
  cardSub: { fontSize: 11, color: "#64748B", marginTop: 2 },
  fabButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#7FA8D0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#7FA8D0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  fabIcon: { fontSize: 22, color: "#FFFFFF" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
    textAlign: "center",
  },
  modalImage: {
    height: 140,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  modalSub: { textAlign: "center", color: "#64748B", marginBottom: 15 },
  modalActions: { gap: 10 },
  saveBtn: {
    backgroundColor: "#7FA8D0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: { color: "#FFFFFF", fontWeight: "bold" },
  deleteBtn: {
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteText: { color: "#EF4444", fontWeight: "bold" },
  closeBtn: { padding: 10, alignItems: "center" },
  closeText: { color: "#64748B" },
  inputForm: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: "#1E293B",
  },
  categoryPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginVertical: 10,
  },
  miniChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: "#F0F5FA",
  },
  miniChipText: { fontSize: 11, color: "#4A729D" },
});
