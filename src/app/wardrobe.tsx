import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

import { useWardrobe, WardrobeItem } from "../context/WardrobeContext";

export default function WardrobeScreen() {
  const router = useRouter();

  const { user, isLoading } = useAuth();

  const { wardrobeItems, addItem, updateItem, removeItem } = useWardrobe();

  const [categories, setCategories] = useState<string[]>([
    "Tops",
    "Bottoms",
    "Outer",
    "Shoes",
    "Accessories",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // FORM TAMBAH
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Tops");
  const [newItemImageUri, setNewItemImageUri] = useState<string | null>(null);

  // FORM EDIT
  const [editingItem, setEditingItem] = useState<WardrobeItem | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemCategory, setEditItemCategory] = useState("Tops");
  const [editItemImageUri, setEditItemImageUri] = useState<string | null>(null);

  const [newCategoryName, setNewCategoryName] = useState("");

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const confirmDelete = (
    title: string,
    message: string,
    onConfirm: () => void,
  ) => {
    if (Platform.OS === "web") {
      if (window.confirm(`${title}\n\n${message}`)) {
        onConfirm();
      }
    } else {
      Alert.alert(title, message, [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: onConfirm },
      ]);
    }
  };

  // MEMILIH FOTO
  const pickImage = async (mode: "add" | "edit") => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        showAlert("Izin Ditolak", "Izinkan akses galeri untuk memilih foto.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.8,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;

        if (mode === "add") {
          setNewItemImageUri(uri);
        } else {
          setEditItemImageUri(uri);
        }
      }
    } catch (error) {
      showAlert("Gagal", "Tidak dapat membuka galeri.");
    }
  };

  // FILTER DATA
  const filteredItems = wardrobeItems.filter((item) => {
    const search = searchQuery.trim().toLowerCase();

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch =
      search === "" || item.name.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  // CREATE
  const handleAddItem = async () => {
    if (!newItemName.trim()) {
      showAlert("Peringatan", "Masukkan nama pakaian terlebih dahulu!");
      return;
    }

    try {
      setIsSaving(true);

      await addItem({
        name: newItemName.trim(),
        category: newItemCategory,
        imageUri:
          newItemImageUri ||
          "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=500&q=80",
      });

      setNewItemName("");
      setNewItemImageUri(null);
      setNewItemCategory(categories[0] || "Tops");
      setIsAddModalVisible(false);

      showAlert("Berhasil", "Pakaian berhasil ditambahkan.");
    } catch (error) {
      showAlert("Gagal", "Gagal menyimpan pakaian ke Supabase.");
    } finally {
      setIsSaving(false);
    }
  };

  // MEMBUKA MODAL EDIT
  const openEditModal = (item: WardrobeItem) => {
    setEditingItem(item);
    setEditItemName(item.name);
    setEditItemCategory(item.category);
    setEditItemImageUri(item.imageUri);
    setIsEditModalVisible(true);
  };

  // UPDATE
  const handleUpdateItem = async () => {
    if (!editingItem) return;

    if (!editItemName.trim()) {
      showAlert("Peringatan", "Nama pakaian tidak boleh kosong!");
      return;
    }

    try {
      setIsSaving(true);

      await updateItem(editingItem.id, {
        name: editItemName.trim(),
        category: editItemCategory,
        imageUri: editItemImageUri || editingItem.imageUri,
      });

      setIsEditModalVisible(false);
      setEditingItem(null);

      showAlert("Berhasil", "Data pakaian berhasil diperbarui.");
    } catch (error) {
      console.error("Gagal update:", error);
      showAlert("Gagal", "Gagal memperbarui pakaian di Supabase.");
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE
  const handleDeleteItem = (id: string) => {
    confirmDelete(
      "Hapus Pakaian",
      "Yakin ingin menghapus pakaian ini?",
      async () => {
        try {
          await removeItem(id);
          showAlert("Berhasil", "Pakaian berhasil dihapus.");
        } catch (error) {
          showAlert("Gagal", "Gagal menghapus dari cloud database.");
        }
      },
    );
  };

  // TAMBAH KATEGORI
  const handleAddCategory = () => {
    const trimmedCat = newCategoryName.trim();

    if (!trimmedCat) return;

    if (categories.includes(trimmedCat)) {
      showAlert("Info", "Kategori sudah ada.");
      return;
    }

    setCategories((prev) => [...prev, trimmedCat]);
    setNewCategoryName("");
    setIsCategoryModalVisible(false);
  };

  // HAPUS KATEGORI
  const handleDeleteCategory = (catToDelete: string) => {
    if (catToDelete === "All") return;

    confirmDelete("Hapus Kategori", `Hapus kategori "${catToDelete}"?`, () => {
      setCategories((prev) => prev.filter((c) => c !== catToDelete));

      if (selectedCategory === catToDelete) {
        setSelectedCategory("All");
      }
    });
  };

  // KOMPONEN PILIH KATEGORI
  const renderCategoryPicker = (
    selected: string,
    onSelect: (category: string) => void,
  ) => (
    <View style={styles.pickerBox}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.miniChip, selected === cat && styles.miniChipActive]}
            onPress={() => onSelect(cat)}
          >
            <Text
              style={[
                styles.miniChipText,
                selected === cat && styles.miniChipTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // KOMPONEN FORM FOTO
  const renderImagePicker = (imageUri: string | null, mode: "add" | "edit") => (
    <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(mode)}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.uploadedImage}
          resizeMode="contain"
        />
      ) : (
        <>
          <Ionicons name="image-outline" size={32} color="#94A3B8" />
          <Text style={styles.uploadText}>Pilih Foto</Text>
          <Text style={styles.uploadSubText}>dari Galeri</Text>
        </>
      )}
    </TouchableOpacity>
  );

  // TAMPILAN UTAMA
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgBlobTopRight} />
      <View style={styles.bgBlobBottomLeft} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WARDROBE</Text>

        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#94A3B8"
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search your clothes..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* CATEGORY TABS */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            style={[
              styles.chip,
              selectedCategory === "All" && styles.chipActive,
            ]}
            onPress={() => setSelectedCategory("All")}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === "All" && styles.chipTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <View key={category} style={styles.chipWrapper}>
                <TouchableOpacity
                  style={[styles.chip, isActive && styles.chipActive]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[styles.chipText, isActive && styles.chipTextActive]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>

                {!isActive && (
                  <TouchableOpacity
                    style={styles.deleteCatBtn}
                    onPress={() => handleDeleteCategory(category)}
                  >
                    <Ionicons name="close-circle" size={16} color="#F87171" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}

          <TouchableOpacity
            style={styles.addCatChip}
            onPress={() => setIsCategoryModalVisible(true)}
          >
            <Ionicons name="add" size={16} color="#1E3A8A" />
            <Text style={styles.addCatText}>Kategori</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* CONTENT */}
      {filteredItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.illustrationWrapper}>
            <View style={styles.ellipseLine} />

            <View style={styles.closetBox}>
              <MaterialCommunityIcons
                name="wardrobe"
                size={90}
                color="#3B82F6"
              />
            </View>

            <View style={styles.paperBox}>
              <Ionicons name="shirt" size={40} color="#2563EB" />
            </View>

            <Ionicons
              name="sparkles"
              size={24}
              color="#3B82F6"
              style={styles.sparkle1}
            />

            <Ionicons
              name="sparkles"
              size={16}
              color="#3B82F6"
              style={styles.sparkle2}
            />

            <View style={styles.lineDecoration} />
          </View>

          <Text style={styles.emptyTitle}>
            Your Wardrobe is <Text style={{ color: "#2563EB" }}>Empty!</Text>
          </Text>

          <Text style={styles.emptyText}>
            Mulai tambahkan koleksi pakaian favoritmu untuk mengatur wardrobe
            dengan lebih rapi.
          </Text>

          <TouchableOpacity
            style={styles.addEmptyBtn}
            onPress={() => setIsAddModalVisible(true)}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addEmptyBtnText}>Tambah Pakaian</Text>
          </TouchableOpacity>

          <View style={styles.buttonDecorations}>
            <View style={styles.decoLine1} />
            <View style={styles.decoLine2} />
          </View>
        </View>
      ) : (
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          <View style={styles.gridContainer}>
            {filteredItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardImageWrapper}>
                  <Image
                    source={{ uri: item.imageUri }}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardTextWrapper}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {item.name}
                    </Text>

                    <View style={styles.tagBg}>
                      <Text style={styles.tagText}>{item.category}</Text>
                    </View>
                  </View>

                  {/* TOMBOL EDIT DAN DELETE */}
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      onPress={() => openEditModal(item)}
                      style={styles.editBtn}
                    >
                      <Ionicons
                        name="create-outline"
                        size={19}
                        color="#2563EB"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDeleteItem(item.id)}
                      style={styles.cardOptionsBtn}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* FLOATING ADD BUTTON */}
      {filteredItems.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            setNewItemName("");
            setNewItemImageUri(null);
            setNewItemCategory(categories[0] || "Tops");
            setIsAddModalVisible(true);
          }}
        >
          <Ionicons name="add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* MODAL TAMBAH */}
      <Modal visible={isAddModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Ionicons name="shirt-outline" size={24} color="#1E3A8A" />
                <Text style={styles.modalTitle}>Tambah Pakaian</Text>
              </View>

              <TouchableOpacity
                onPress={() => setIsAddModalVisible(false)}
                disabled={isSaving}
              >
                <Ionicons name="close" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalFormRow}>
              {renderImagePicker(newItemImageUri, "add")}

              <View style={styles.modalInputWrapper}>
                <Text style={styles.label}>Nama Pakaian</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Contoh: Kemeja Flanel"
                  value={newItemName}
                  onChangeText={setNewItemName}
                />

                <Text style={styles.label}>Pilih Kategori</Text>

                {renderCategoryPicker(newItemCategory, setNewItemCategory)}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsAddModalVisible(false)}
                disabled={isSaving}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleAddItem}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.saveBtnText}>Simpan</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL EDIT */}
      <Modal visible={isEditModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Ionicons name="create-outline" size={24} color="#1E3A8A" />
                <Text style={styles.modalTitle}>Edit Pakaian</Text>
              </View>

              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                disabled={isSaving}
              >
                <Ionicons name="close" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalFormRow}>
              {renderImagePicker(editItemImageUri, "edit")}

              <View style={styles.modalInputWrapper}>
                <Text style={styles.label}>Nama Pakaian</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Nama pakaian"
                  value={editItemName}
                  onChangeText={setEditItemName}
                />

                <Text style={styles.label}>Pilih Kategori</Text>

                {renderCategoryPicker(editItemCategory, setEditItemCategory)}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsEditModalVisible(false)}
                disabled={isSaving}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleUpdateItem}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.saveBtnText}>Simpan Perubahan</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL TAMBAH KATEGORI */}
      <Modal visible={isCategoryModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxWidth: 350 }]}>
            <Text style={styles.modalTitle}>Tambah Kategori Baru</Text>

            <TextInput
              style={[styles.input, { marginVertical: 16 }]}
              placeholder="Contoh: Olahraga, Formal..."
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsCategoryModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleAddCategory}
              >
                <Text style={styles.saveBtnText}>Tambah</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
  },

  bgBlobTopRight: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#E0EFFE",
    opacity: 0.6,
  },

  bgBlobBottomLeft: {
    position: "absolute",
    bottom: -50,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "#E0EFFE",
    opacity: 0.4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E3A8A",
    letterSpacing: 1,
  },

  backBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },

  backBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E3A8A",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1E293B",
  },

  categoryWrapper: {
    marginTop: 16,
  },

  categoryScroll: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: "center",
  },

  chipWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 4,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  chipActive: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },

  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },

  deleteCatBtn: {
    padding: 4,
    marginRight: 8,
  },

  addCatChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    gap: 4,
    backgroundColor: "#FFFFFF",
  },

  addCatText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E3A8A",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 60,
  },

  illustrationWrapper: {
    width: 260,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },

  ellipseLine: {
    position: "absolute",
    width: 240,
    height: 80,
    borderRadius: 120,
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderStyle: "dashed",
    transform: [{ rotate: "-10deg" }],
  },

  closetBox: {
    zIndex: 2,
  },

  paperBox: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    elevation: 4,
    transform: [{ rotate: "15deg" }],
    zIndex: 3,
  },

  sparkle1: {
    position: "absolute",
    left: 20,
    top: 40,
  },

  sparkle2: {
    position: "absolute",
    right: 40,
    bottom: 40,
  },

  lineDecoration: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 20,
    height: 2,
    backgroundColor: "#3B82F6",
    transform: [{ rotate: "-45deg" }],
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 12,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },

  addEmptyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    gap: 8,
    elevation: 6,
  },

  addEmptyBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonDecorations: {
    position: "absolute",
    bottom: 110,
    right: 60,
    flexDirection: "row",
    gap: 4,
  },

  decoLine1: {
    width: 12,
    height: 2,
    backgroundColor: "#3B82F6",
    transform: [{ rotate: "45deg" }],
  },

  decoLine2: {
    width: 8,
    height: 2,
    backgroundColor: "#3B82F6",
    transform: [{ rotate: "20deg" }],
  },

  list: {
    flex: 1,
    marginTop: 16,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    paddingBottom: 100,
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },

  cardImageWrapper: {
    width: "100%",
    height: 180,
    backgroundColor: "#F8FAFC",
    padding: 8,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },

  cardTextWrapper: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
  },

  tagBg: {
    backgroundColor: "#E0E7FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  tagText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#4338CA",
  },

  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  editBtn: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#EFF6FF",
  },

  cardOptionsBtn: {
    padding: 5,
  },

  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: "#1E3A8A",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  modalFormRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },

  uploadBox: {
    width: 110,
    height: 140,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    overflow: "hidden",
  },

  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },

  uploadText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
    marginTop: 8,
  },

  uploadSubText: {
    fontSize: 10,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 4,
  },

  modalInputWrapper: {
    flex: 1,
    gap: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: "#1E293B",
  },

  pickerBox: {
    marginTop: 4,
  },

  miniChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginRight: 6,
  },

  miniChipActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#3B82F6",
  },

  miniChipText: {
    fontSize: 12,
    color: "#64748B",
  },

  miniChipTextActive: {
    color: "#2563EB",
    fontWeight: "700",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 16,
  },

  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cancelBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },

  saveBtn: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 90,
    alignItems: "center",
  },

  saveBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
