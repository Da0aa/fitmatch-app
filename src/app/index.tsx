import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import styles from "../styles/homeStyles";

interface Outfit {
  id: string;
  name: string;
  category: string;
  image: string;
}

const FOR_YOU: Outfit[] = [
  {
    id: "1",
    name: "Soft Blue Outfit",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600",
  },
  {
    id: "2",
    name: "Striped Casual",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600",
  },
  {
    id: "3",
    name: "Clean White Look",
    category: "Classic",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600",
  },
];

const TRENDING: Outfit[] = [
  {
    id: "4",
    name: "Earth Tone Look",
    category: "Streetwear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    id: "5",
    name: "Everyday Couple",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  },
  {
    id: "6",
    name: "Neutral Layering",
    category: "Minimalist",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
  },
];

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

  const isDesktop = width >= 768;

  const contentWidth = isDesktop ? Math.min(width - 80, 1100) : width - 40;

  const cardWidth = isDesktop
    ? Math.min((contentWidth - 48) / 3, 300)
    : (contentWidth - 20) / 3;

  const currentBanner = BANNERS[activeBanner];

  const filteredForYou = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return FOR_YOU;
    }

    return FOR_YOU.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const filteredTrending = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return TRENDING;
    }

    return TRENDING.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const openOutfit = (item: Outfit) => {
    router.push("/match");
  };

  const nextBanner = () => {
    setActiveBanner((current) => (current + 1) % BANNERS.length);
  };

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

        {/* FOR YOU */}
        <SectionHeader
          title="For You"
          icon="♡"
          onPress={() => router.push("/match")}
        />

        {filteredForYou.length === 0 ? (
          <EmptySearch />
        ) : (
          <FlatList
            data={filteredForYou}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => openOutfit(item)}
                style={[styles.outfitCard, { width: cardWidth }]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.outfitImage}
                />

                <View style={styles.outfitInfo}>
                  <Text style={styles.outfitName} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text style={styles.outfitCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        {/* TRENDING */}
        <SectionHeader
          title="Trending"
          icon="♧"
          onPress={() => router.push("/explore")}
        />

        {filteredTrending.length === 0 ? (
          <EmptySearch />
        ) : (
          <FlatList
            data={filteredTrending}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => openOutfit(item)}
                style={[styles.outfitCard, { width: cardWidth }]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.outfitImage}
                />

                <View style={styles.outfitInfo}>
                  <Text style={styles.outfitName} numberOfLines={1}>
                    {item.name}
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
