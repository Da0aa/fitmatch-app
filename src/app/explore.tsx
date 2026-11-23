import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

// Import fungsi API yang sudah kita buat
import { ExploreOutfit, fetchExploreOutfits } from "../services/fashionService";

const CATEGORIES = [
  { id: "All", label: "Semua", icon: "tshirt-crew-outline" },
  { id: "Casual", label: "Casual", icon: "emoticon-happy-outline" },
  { id: "Formal", label: "Formal", icon: "briefcase-outline" },
  { id: "Streetwear", label: "Streetwear", icon: "star-outline" },
  { id: "Korean", label: "Korean Style", icon: "heart-outline" },
];

const ITEMS_PER_PAGE = 3;

export default function ExploreScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  // STATE UNTUK API
  const [apiData, setApiData] = useState<ExploreOutfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // STATE UI
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // ==========================================
  // IMPLEMENTASI API CALL (Sesuai Modul 3)
  // ==========================================
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");

        // Memanggil fungsi async dari service
        const result = await fetchExploreOutfits();
        setApiData(result);
      } catch (error: any) {
        setErrorMsg(error.message || "Terjadi kesalahan saat memuat data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter & Pagination Logic
  const filteredData = useMemo(() => {
    return apiData.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, apiData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  // ==========================================
  // TAMPILAN ERROR (JIKA API GAGAL)
  // ==========================================
  if (errorMsg) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center", padding: 20 },
        ]}
      >
        <Ionicons name="cloud-offline-outline" size={60} color="#EF4444" />
        <Text
          style={{
            marginTop: 16,
            color: "#EF4444",
            fontWeight: "700",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Gagal Memuat Data
        </Text>
        <Text style={{ marginTop: 8, color: "#64748B", textAlign: "center" }}>
          {errorMsg}
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 24,
            backgroundColor: "#1E3A8A",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 20,
          }}
          onPress={() => {
            // Reload halaman dengan me-restart state
            setApiData([]);
            setIsLoading(true);
            setErrorMsg("");
            // Memicu useEffect lagi (cara paling mudah di sini adalah restart aplikasi atau pindah tab)
            // Untuk demo, kita bisa alert saja
            alert(
              "Silakan tarik ke bawah atau restart aplikasi untuk mencoba lagi.",
            );
          }}
        >
          <Text style={{ color: "#FFF", fontWeight: "700" }}>Coba Lagi</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ==========================================
  // TAMPILAN UTAMA (JIKA DATA BERHASIL DIAMBIL)
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      {/* BACKGROUND */}
      <View style={styles.bgBlobTopLeft} />
      <View style={styles.bgBlobBottomRight} />
      <MaterialCommunityIcons
        name="hanger"
        size={150}
        color="#E0EFFE"
        style={styles.bgHangerIconRight}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EXPLORE</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* TITLE */}
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={styles.decoLines}>
              <View style={styles.decoLine} />
              <View style={styles.decoLine} />
            </View>
            <Text style={styles.title}>Explore Your Style!</Text>
          </View>
          <Text style={styles.subtitle}>
            Temukan inspirasi outfit yang cocok untuk kamu ✨
          </Text>
        </View>

        {/* SEARCH */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari gaya atau nama pakaian..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* CATEGORIES */}
        <View style={styles.categoryWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.chip, isActive && styles.chipActive]}
                  onPress={() => handleCategoryChange(cat.id)}
                >
                  <MaterialCommunityIcons
                    name={cat.icon as any}
                    size={18}
                    color={isActive ? "#FFFFFF" : "#1E3A8A"}
                  />
                  <Text
                    style={[styles.chipText, isActive && styles.chipTextActive]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* GRID */}
        <View style={styles.gridContainer}>
          {currentData.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Outfit tidak ditemukan.</Text>
            </View>
          ) : (
            currentData.map((item) => (
              <View
                key={item.id}
                style={[styles.card, isDesktop && { maxWidth: 280 }]}
              >
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                  <TouchableOpacity style={styles.heartBtn}>
                    <Ionicons name="heart-outline" size={20} color="#1E3A8A" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.cardTagsRow}>
                    <Text style={styles.cardCategory}>{item.category}</Text>
                    <View style={styles.dotSeparator} />
                    <Text style={styles.cardTags}>{item.tags}</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.detailBtn}>
                    <Text style={styles.detailBtnText}>Lihat Detail</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color="#1E3A8A"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[
                styles.pageArrowBtn,
                currentPage === 1 && { opacity: 0.5 },
              ]}
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Ionicons name="chevron-back" size={18} color="#1E3A8A" />
            </TouchableOpacity>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              const isActive = currentPage === pageNum;
              return (
                <TouchableOpacity
                  key={pageNum}
                  style={[
                    styles.pageNumberBtn,
                    isActive && styles.pageNumberBtnActive,
                  ]}
                  onPress={() => handlePageChange(pageNum)}
                >
                  <Text
                    style={
                      isActive
                        ? styles.pageNumberTextActive
                        : styles.pageNumberText
                    }
                  >
                    {pageNum}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[
                styles.pageArrowBtn,
                currentPage === totalPages && { opacity: 0.5 },
              ]}
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Ionicons name="chevron-forward" size={18} color="#1E3A8A" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", overflow: "hidden" },
  bgBlobTopLeft: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#E0EFFE",
    opacity: 0.6,
  },
  bgBlobBottomRight: {
    position: "absolute",
    bottom: -80,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#E0EFFE",
    opacity: 0.5,
  },
  bgHangerIconRight: {
    position: "absolute",
    top: 100,
    right: -40,
    opacity: 0.3,
    transform: [{ rotate: "15deg" }],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
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
  backBtnText: { fontSize: 12, fontWeight: "600", color: "#1E3A8A" },
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1E3A8A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
  },
  decoLines: { flexDirection: "row", gap: 4 },
  decoLine: {
    width: 3,
    height: 15,
    backgroundColor: "#1E3A8A",
    transform: [{ rotate: "45deg" }],
  },
  searchWrapper: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: "#1E293B",
    marginLeft: 8,
  },
  searchBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  categoryWrapper: { marginBottom: 24 },
  categoryScroll: { paddingHorizontal: 20, gap: 10 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 1,
  },
  chipActive: { backgroundColor: "#1E3A8A", borderColor: "#1E3A8A" },
  chipText: { fontSize: 13, fontWeight: "600", color: "#1E3A8A" },
  chipTextActive: { color: "#FFFFFF" },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    gap: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  imageWrapper: {
    width: "100%",
    height: 220,
    position: "relative",
    backgroundColor: "#F8FAFC",
    padding: 8,
  },
  cardImage: { width: "100%", height: "100%" },
  heartBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  cardBody: { paddingHorizontal: 12, paddingTop: 8, paddingBottom: 8 },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  cardTagsRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardCategory: { fontSize: 12, color: "#64748B", fontWeight: "500" },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
  },
  cardTags: { fontSize: 12, color: "#64748B", fontWeight: "500" },
  cardFooter: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    alignItems: "flex-end",
  },
  detailBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F8FAFC",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  detailBtnText: { fontSize: 12, fontWeight: "700", color: "#1E3A8A" },
  emptyState: { width: "100%", alignItems: "center", marginTop: 40 },
  emptyText: { color: "#94A3B8", fontSize: 16 },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  pageArrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumberBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumberBtnActive: { backgroundColor: "#1E3A8A", borderColor: "#1E3A8A" },
  pageNumberText: { fontSize: 14, fontWeight: "700", color: "#64748B" },
  pageNumberTextActive: { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },
});
