import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useWardrobe, WardrobeItem } from "../context/WardrobeContext";

const CATEGORIES = [
  { id: "Tops", label: "Atasan", icon: "tshirt-crew" },
  { id: "Bottoms", label: "Bawahan", icon: "human-male" },
  { id: "Shoes", label: "Sepatu", icon: "shoe-sneaker" },
];

export default function MatchScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { wardrobeItems } = useWardrobe();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  const [step, setStep] = useState<"select" | "loading" | "result">("select");
  const [activeTab, setActiveTab] = useState("Tops");

  const [selectedTops, setSelectedTops] = useState<WardrobeItem | null>(null);
  const [selectedBottoms, setSelectedBottoms] = useState<WardrobeItem | null>(
    null,
  );
  const [selectedShoes, setSelectedShoes] = useState<WardrobeItem | null>(null);

  const [matchResult, setMatchResult] = useState<WardrobeItem[]>([]);

  const displayedItems = wardrobeItems.filter(
    (item: WardrobeItem) => item.category === activeTab,
  );

  const handleSelectItem = (item: WardrobeItem) => {
    if (item.category === "Tops") setSelectedTops(item);
    if (item.category === "Bottoms") setSelectedBottoms(item);
    if (item.category === "Shoes") setSelectedShoes(item);
  };

  const isReadyToMatch = selectedTops && selectedBottoms && selectedShoes;

  const generateMatch = () => {
    if (!isReadyToMatch) return;
    setStep("loading");
    setTimeout(() => {
      setMatchResult([selectedTops, selectedBottoms, selectedShoes]);
      setStep("result");
    }, 1500);
  };

  // TAMPILAN UTAMA
  return (
    <SafeAreaView style={styles.container}>
      {/* BACKGROUND DECORATIONS */}
      <View style={styles.bgBlobTopLeft} />
      <View style={styles.bgBlobBottomRight} />
      <MaterialCommunityIcons
        name="hanger"
        size={150}
        color="#E0EFFE"
        style={styles.bgHangerIconLeft}
      />
      <MaterialCommunityIcons
        name="hanger"
        size={120}
        color="#E0EFFE"
        style={styles.bgHangerIconRight}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MATCH</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* ========================================= */}
      {/* TAHAP 1: PILIH PAKAIAN */}
      {/* ========================================= */}
      {step === "select" && (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Pilih Kategori Pakaian</Text>
              <Text style={styles.subtitle}>
                Pilih kategori terlebih dahulu, lalu temukan pakaian yang cocok
                denganmu!
              </Text>
            </View>

            {/* TAB KATEGORI */}
            <View
              style={[
                styles.tabWrapper,
                isDesktop && { justifyContent: "center", gap: 20 },
              ]}
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                    onPress={() => setActiveTab(cat.id)}
                  >
                    {isActive && (
                      <View style={styles.decoLinesActive}>
                        <View style={styles.decoLine} />
                        <View style={styles.decoLine} />
                      </View>
                    )}
                    <MaterialCommunityIcons
                      name={cat.icon as any}
                      size={24}
                      color={isActive ? "#FFFFFF" : "#1E3A8A"}
                    />
                    <Text
                      style={[styles.tabText, isActive && styles.tabTextActive]}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Section Header Grid */}
            <View style={styles.gridHeader}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Ionicons name="sparkles" size={20} color="#1E3A8A" />
                <Text style={styles.gridTitle}>
                  Daftar {CATEGORIES.find((c) => c.id === activeTab)?.label}{" "}
                  Kamu
                </Text>
              </View>
              <TouchableOpacity style={styles.sortBtn}>
                <Text style={styles.sortText}>Terbaru</Text>
                <Ionicons name="chevron-down" size={14} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Grid Pakaian */}
            <View style={styles.gridContainer}>
              {displayedItems.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>
                    Belum ada pakaian di kategori ini.
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/wardrobe")}
                    style={styles.addBtn}
                  >
                    <Text style={styles.addBtnText}>Tambah ke Wardrobe</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                displayedItems.map((item: WardrobeItem) => {
                  const isSelected =
                    selectedTops?.id === item.id ||
                    selectedBottoms?.id === item.id ||
                    selectedShoes?.id === item.id;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.itemCard,
                        isSelected && styles.itemCardActive,
                      ]}
                      onPress={() => handleSelectItem(item)}
                      activeOpacity={0.8}
                    >
                      {/* Wadah Gambar dengan Background agar gambar utuh */}
                      <View style={styles.itemImageWrapper}>
                        <Image
                          source={{ uri: item.imageUri }}
                          style={styles.itemImage}
                          resizeMode="contain"
                        />
                      </View>

                      <View
                        style={[
                          styles.radioCircle,
                          isSelected && styles.radioCircleActive,
                        ]}
                      >
                        {isSelected && <View style={styles.radioInner} />}
                      </View>

                      <View style={styles.itemTextWrapper}>
                        <Text style={styles.itemText} numberOfLines={2}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </ScrollView>

          {/* BOTTOM BAR */}
          <View style={styles.floatingBottomBar}>
            <TouchableOpacity
              style={[
                styles.generateBtn,
                !isReadyToMatch && styles.generateBtnDisabled,
              ]}
              onPress={generateMatch}
              disabled={!isReadyToMatch}
            >
              <Ionicons name="sparkles" size={20} color="#FFF" />
              <Text style={styles.generateBtnText}>Generate Outfit ✨</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ========================================= */}
      {/* TAHAP 2: LOADING */}
      {/* ========================================= */}
      {step === "loading" && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingIconWrapper}>
            <View style={styles.loadingRing} />
            <Ionicons name="shirt" size={80} color="#3B82F6" />
          </View>
          <Text style={styles.loadingTitle}>Memproses Outfit...</Text>
          <ActivityIndicator
            size="small"
            color="#2563EB"
            style={{ marginTop: 20 }}
          />
        </View>
      )}

      {/* ========================================= */}
      {/* TAHAP 3: HASIL */}
      {/* ========================================= */}
      {step === "result" && (
        <ScrollView contentContainerStyle={styles.resultScrollContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Outfit Rekomendasi!</Text>
            <Text style={styles.subtitle}>
              Ini dia padu padan terbaik dari lemari kamu.
            </Text>
          </View>

          <View
            style={[styles.resultLayout, isDesktop && { flexDirection: "row" }]}
          >
            <View style={styles.leftColumn}>
              <View style={styles.imageStackContainer}>
                <Image
                  source={{ uri: matchResult[0]?.imageUri }}
                  style={styles.stackImgTop}
                />
                <Image
                  source={{ uri: matchResult[1]?.imageUri }}
                  style={styles.stackImgBottom}
                />
                <Image
                  source={{ uri: matchResult[2]?.imageUri }}
                  style={styles.stackImgShoe}
                />
              </View>
            </View>

            <View style={styles.rightColumn}>
              <View style={styles.ratingCard}>
                <View style={styles.ratingLeft}>
                  <Text style={styles.ratingTitle}>Rating Outfit</Text>
                  <Text style={styles.ratingScore}>⭐ 4.8 / 5</Text>
                </View>
                <View style={styles.ratingRight}>
                  <Text style={styles.ratingMatchText}>Cocok Banget!</Text>
                </View>
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricValue}>5 / 5</Text>
                  <Text style={styles.metricLabel}>Kecocokan Warna</Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricValue}>4.5 / 5</Text>
                  <Text style={styles.metricLabel}>Keserasian Style</Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricValue}>5 / 5</Text>
                  <Text style={styles.metricLabel}>Kesesuaian Outfit</Text>
                </View>
              </View>

              <View style={styles.suggestionSection}>
                <Text style={styles.sectionTitleText}>💡 Saran</Text>
                <View style={styles.suggestionBox}>
                  <Text style={styles.suggestionText}>
                    Perpaduan {matchResult[0]?.name.toLowerCase()} dengan{" "}
                    {matchResult[1]?.name.toLowerCase()} dan{" "}
                    {matchResult[2]?.name.toLowerCase()} memberikan tampilan
                    yang simpel dan stylish. Cocok untuk kuliah atau hangout!
                  </Text>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitleText}>👕 Detail Outfit</Text>
                {matchResult.map((item, index) => (
                  <View key={index} style={styles.detailItem}>
                    <Image
                      source={{ uri: item.imageUri }}
                      style={styles.detailImage}
                    />
                    <View style={styles.detailTextWrapper}>
                      <Text style={styles.detailName}>{item.name}</Text>
                      <Text style={styles.detailCategory}>
                        {item.category === "Tops"
                          ? "Atasan"
                          : item.category === "Bottoms"
                            ? "Bawahan"
                            : "Sepatu"}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View
            style={[
              styles.actionRow,
              isDesktop && {
                maxWidth: 600,
                alignSelf: "center",
                width: "100%",
              },
            ]}
          >
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => setStep("select")}
            >
              <Ionicons name="refresh" size={20} color="#1E3A8A" />
              <Text style={styles.retryBtnText}>Coba Lagi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => alert("Outfit disimpan!")}
            >
              <Ionicons name="download-outline" size={20} color="#FFF" />
              <Text style={styles.saveBtnText}>Simpan Outfit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", overflow: "hidden" },

  // --- BACKGROUND DECORATIONS ---
  bgBlobTopLeft: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#E0EFFE",
    opacity: 0.7,
  },
  bgBlobBottomRight: {
    position: "absolute",
    bottom: -80,
    right: -80,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: "#E0EFFE",
    opacity: 0.6,
  },
  bgHangerIconLeft: {
    position: "absolute",
    bottom: 50,
    left: -30,
    opacity: 0.3,
    transform: [{ rotate: "-20deg" }],
  },
  bgHangerIconRight: {
    position: "absolute",
    top: 80,
    right: -20,
    opacity: 0.3,
    transform: [{ rotate: "15deg" }],
  },

  // --- HEADER ---
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

  // --- TAHAP 1: PILIH PAKAIAN ---
  titleContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
  },

  // Tab Kapsul
  tabWrapper: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tabBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
    position: "relative",
  },
  tabBtnActive: { backgroundColor: "#1E3A8A", borderColor: "#1E3A8A" },
  tabText: { fontSize: 15, fontWeight: "700", color: "#1E3A8A" },
  tabTextActive: { color: "#FFFFFF" },
  decoLinesActive: {
    position: "absolute",
    top: -12,
    right: 10,
    flexDirection: "row",
    gap: 4,
  },
  decoLine: {
    width: 3,
    height: 10,
    backgroundColor: "#1E3A8A",
    transform: [{ rotate: "45deg" }],
  },

  // Grid Header
  gridHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  gridTitle: { fontSize: 18, fontWeight: "800", color: "#1E3A8A" },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 4,
  },
  sortText: { fontSize: 12, fontWeight: "600", color: "#64748B" },

  // Grid Pakaian
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  itemCard: {
    width: "31%", // 3 kolom
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
    paddingBottom: 12,
    overflow: "hidden",
  },
  itemCardActive: { borderColor: "#1E3A8A" },

  // PERBAIKAN: Kunci tinggi wadah gambar & Beri Background
  itemImageWrapper: {
    width: "100%",
    height: 160, // Tinggi kotak gambar
    backgroundColor: "#F8FAFC", // Background abu-abu muda agar tidak terlihat kosong
    padding: 8, // Jarak agar gambar tidak menempel di pinggir
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Memastikan gambar terlihat utuh (tidak terpotong)
  },

  radioCircle: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 2,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleActive: { borderColor: "#1E3A8A", backgroundColor: "#FFFFFF" },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1E3A8A",
  },

  itemTextWrapper: {
    paddingHorizontal: 8,
    paddingTop: 10,
    height: 40,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },

  emptyState: { width: "100%", alignItems: "center", marginTop: 20 },
  emptyText: { color: "#94A3B8", marginBottom: 12 },
  addBtn: {
    backgroundColor: "#E0E7FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addBtnText: { color: "#1E3A8A", fontWeight: "700" },

  // Tombol Melayang Bawah
  floatingBottomBar: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  generateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    gap: 10,
    elevation: 6,
    shadowColor: "#1E3A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  generateBtnDisabled: {
    backgroundColor: "#94A3B8",
    elevation: 0,
    shadowOpacity: 0,
  },
  generateBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },

  // --- TAHAP 2: LOADING ---
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingIconWrapper: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  loadingRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#BFDBFE",
    borderStyle: "dashed",
  },
  loadingTitle: { fontSize: 22, fontWeight: "900", color: "#1E3A8A" },

  // --- TAHAP 3: HASIL ---
  resultScrollContent: { padding: 20, paddingTop: 10, paddingBottom: 40 },
  resultLayout: { gap: 20, width: "100%", maxWidth: 1000, alignSelf: "center" },
  leftColumn: { flex: 1, width: "100%", maxWidth: 400, alignSelf: "center" },
  imageStackContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 20,
    height: 480,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  stackImgTop: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 3,
  },
  stackImgBottom: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    position: "absolute",
    top: 160,
    left: 30,
    zIndex: 2,
  },
  stackImgShoe: {
    width: "80%",
    height: 150,
    resizeMode: "contain",
    position: "absolute",
    top: 300,
    left: 40,
    zIndex: 4,
  },

  rightColumn: { flex: 1.2, width: "100%", gap: 16 },
  ratingCard: {
    flexDirection: "row",
    backgroundColor: "#E0EFFE",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingLeft: { flex: 1 },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 8,
  },
  ratingScore: { fontSize: 24, fontWeight: "900", color: "#1E3A8A" },
  ratingRight: { flex: 1, alignItems: "center" },
  ratingMatchText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E3A8A",
    fontStyle: "italic",
  },

  metricsRow: { flexDirection: "row", gap: 12 },
  metricBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 11,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
  },
  metricValue: { fontSize: 18, fontWeight: "800", color: "#1E3A8A" },

  suggestionSection: { marginTop: 10 },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 10,
  },
  suggestionBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  suggestionText: { fontSize: 14, color: "#475569", lineHeight: 22 },

  detailSection: { marginTop: 10 },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  detailImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#F1F5F9",
  },
  detailTextWrapper: { flex: 1 },
  detailName: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  detailCategory: { fontSize: 12, color: "#64748B" },

  actionRow: { flexDirection: "row", gap: 12, marginTop: 30 },
  retryBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
  },
  retryBtnText: { fontSize: 16, fontWeight: "700", color: "#1E3A8A" },
  saveBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
    elevation: 4,
  },
  saveBtnText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF" },
});
