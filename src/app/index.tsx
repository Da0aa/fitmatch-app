import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { fetchFashionProducts } from "../services/fashionService";
import styles from "../styles/homeStyles";
import { Product } from "../types/fashion";
import { simulateDelay } from "../utils/promiseHelper";

const BANNERS = [
  {
    id: "1",
    title: "Good Outfit",
    subtitle: "Good Mood ♡",
    description: "Find your perfect style today.",
  },
  {
    id: "2",
    title: "Your Style",
    subtitle: "Your Match ✨",
    description: "Mix, match, and discover your look.",
  },
  {
    id: "3",
    title: "Dress Better",
    subtitle: "Feel Better ♡",
    description: "Let FitMatch inspire your outfit.",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeBanner, setActiveBanner] = useState(0);

  // State untuk menampung data API
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const isDesktop = width >= 768;
  const contentWidth = isDesktop ? Math.min(width - 80, 1100) : width - 40;
  const cardWidth = isDesktop
    ? Math.min((contentWidth - 48) / 3, 300)
    : (contentWidth - 20) / 3;

  const currentBanner = BANNERS[activeBanner];

  useEffect(() => {
    const loadData = async () => {
      try {
        await simulateDelay(1500);

        fetchFashionProducts()
          .then((result) => {
            setProducts(result);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setErrorMsg("Terjadi kesalahan sistem");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;

    return products.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }, [searchQuery, products]);

  const openOutfit = (item: Product) => {
    router.push("/match");
  };

  const nextBanner = () => {
    setActiveBanner((current) => (current + 1) % BANNERS.length);
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 18, color: "#6D9BC3", fontWeight: "bold" }}>
          Loading Outfits...
        </Text>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
          {errorMsg}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            width: contentWidth,
            alignSelf: "center",
          },
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>FitMatch</Text>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => alert("No new notifications.")}
          >
            <Text style={styles.notificationIcon}>♧</Text>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cari outfit, gaya, atau inspirasi..."
            placeholderTextColor="#9AAFC6"
            style={styles.searchInput}
            returnKeyType="search"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={styles.clearText}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* BANNER */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.banner}
          onPress={nextBanner}
        >
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>{currentBanner.title}</Text>
            <Text style={styles.bannerSubtitle}>{currentBanner.subtitle}</Text>
            <Text style={styles.bannerDescription}>
              {currentBanner.description}
            </Text>
            <View style={styles.bannerLine} />
          </View>

          <View style={styles.bannerPerson}>
            <Text style={styles.bannerEmoji}>👗</Text>
          </View>

          <Text style={styles.bannerHeart}>♡</Text>
          <Text style={styles.bannerSparkle}>✦</Text>
        </TouchableOpacity>

        {/* BANNER DOTS */}
        <View style={styles.dots}>
          {BANNERS.map((banner, index) => (
            <TouchableOpacity
              key={banner.id}
              onPress={() => setActiveBanner(index)}
              style={[styles.dot, index === activeBanner && styles.activeDot]}
            />
          ))}
        </View>

        {/* FOR YOU (Data diambil dari API) */}
        <SectionHeader
          title="For You"
          icon="♡"
          onPress={() => router.push("/match")}
        />

        {filteredProducts.length === 0 ? (
          <EmptySearch />
        ) : (
          <FlatList
            data={filteredProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()} // ID dari API bertipe number, ubah ke string
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => openOutfit(item)}
                style={[styles.outfitCard, { width: cardWidth }]}
              >
                {/* API menggunakan 'thumbnail' bukan 'image' */}
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.outfitImage}
                />

                <View style={styles.outfitInfo}>
                  {/* API menggunakan 'title' bukan 'name' */}
                  <Text style={styles.outfitName} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.outfitCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        {/* QUICK MATCH */}
        <View style={styles.quickAction}>
          <View>
            <Text style={styles.quickTitle}>Can't decide what to wear?</Text>
            <Text style={styles.quickSubtitle}>
              Let FitMatch find it for you.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => router.push("/match")}
          >
            <Text style={styles.quickButtonText}>Match ✨</Text>
          </TouchableOpacity>
        </View>

        <Pressable
          onPress={() => router.push("/guide")}
          style={{
            backgroundColor: "#6D9BC3",
            padding: 16,
            borderRadius: 12,
            marginTop: 12,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
            FITMATCH Guide →
          </Text>
        </Pressable>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

interface SectionHeaderProps {
  title: string;
  icon: string;
  onPress: () => void;
}

function SectionHeader({ title, icon, onPress }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleWrapper}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeAll}>Lihat semua ›</Text>
      </TouchableOpacity>
    </View>
  );
}

function EmptySearch() {
  return (
    <View style={styles.emptySearch}>
      <Text style={styles.emptyIcon}>⌕</Text>
      <Text style={styles.emptyTitle}>Outfit tidak ditemukan</Text>
      <Text style={styles.emptyText}>Coba kata kunci pencarian lainnya.</Text>
    </View>
  );
}
