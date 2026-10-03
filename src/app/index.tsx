import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import styles from "../styles/homeStyles";
interface Outfit {
  id: number;
  name: string;
  category: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  route: string;
}

const outfits: Outfit[] = [
  {
    id: 1,
    name: "Casual Blue",
    category: "Casual",
  },
  {
    id: 2,
    name: "Street Style",
    category: "Street",
  },
  {
    id: 3,
    name: "Clean White",
    category: "Minimalist",
  },
];

const trendingOutfits: Outfit[] = [
  {
    id: 4,
    name: "Everyday Look",
    category: "Casual",
  },
  {
    id: 5,
    name: "Simple Couple",
    category: "Casual",
  },
  {
    id: 6,
    name: "Soft Neutral",
    category: "Minimalist",
  },
];

const features: Feature[] = [
  {
    id: 1,
    title: "Wardrobe",
    description: "Kelola koleksi pakaianmu.",
    route: "/wardrobe",
  },
  {
    id: 2,
    title: "Match",
    description: "Cari kombinasi outfit yang cocok.",
    route: "/match",
  },
  {
    id: 3,
    title: "My Fits",
    description: "Simpan outfit favoritmu.",
    route: "/myfits",
  },
  {
    id: 4,
    title: "Planner",
    description: "Rencanakan outfit harianmu.",
    route: "/planner",
  },
  {
    id: 5,
    title: "Profile",
    description: "Kelola profilmu.",
    route: "/profile",
  },
];

const renderOutfit = (outfit: Outfit) => {
  return (
    <Pressable
      key={outfit.id}
      style={({ pressed }) => [
        styles.outfitCard,
        pressed && styles.cardPressed,
      ]}
    >
      {/* Placeholder gambar */}
      <View style={styles.outfitImage}>
        <Text style={styles.imagePlaceholder}>Outfit</Text>
      </View>

      <Text style={styles.outfitName}>{outfit.name}</Text>

      <Text style={styles.outfitCategory}>{outfit.category}</Text>
    </Pressable>
  );
};

const renderFeature = (feature: Feature) => {
  return (
    <Pressable
      key={feature.id}
      style={({ pressed }) => [
        styles.featureCard,
        pressed && styles.cardPressed,
      ]}
      onPress={() => router.push(feature.route as any)}
    >
      <View style={styles.featureIcon}>
        <Text style={styles.featureIconText}>{feature.id}</Text>
      </View>

      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{feature.title}</Text>

        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>

      <Text style={styles.featureArrow}>›</Text>
    </Pressable>
  );
};

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        isDesktop && styles.desktopContent,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            {/* INLINE STYLING */}
            <Text
              style={[
                styles.logo,
                {
                  letterSpacing: 1,
                  textTransform: "uppercase",
                },
              ]}
            >
              FitMatch
            </Text>

            <Text style={styles.greeting}>Find your style</Text>
          </View>

          <Pressable style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>♡</Text>
          </Pressable>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Cari outfit, gaya, atau inspirasi..."
            placeholderTextColor="#8CA7B7"
          />
        </View>
      </View>

      {/* ========================= */}
      {/* BANNER */}
      {/* ========================= */}

      <View style={styles.section}>
        <Pressable style={styles.banner}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerSmallText}>FITMATCH</Text>

            <Text style={styles.bannerTitle}>Good Outfit</Text>

            <Text style={styles.bannerTitle}>Good Mood ♡</Text>

            <Text style={styles.bannerSubtitle}>Temukan gaya terbaikmu</Text>
          </View>

          {/* Placeholder gambar */}
          <View style={styles.bannerImage}>
            <Text style={styles.imagePlaceholder}>Outfit</Text>
          </View>
        </Pressable>

        <View style={styles.bannerDots}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* ========================= */}
      {/* FOR YOU */}
      {/* ========================= */}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>♡</Text>

            <Text style={styles.sectionTitle}>For You</Text>
          </View>

          <Pressable>
            <Text style={styles.seeAll}>Lihat semua ›</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCards}
        >
          {outfits.map((outfit) => renderOutfit(outfit))}
        </ScrollView>
      </View>

      {/* ========================= */}
      {/* TRENDING */}
      {/* ========================= */}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>♧</Text>

            <Text style={styles.sectionTitle}>Trending</Text>
          </View>

          <Pressable>
            <Text style={styles.seeAll}>Lihat semua ›</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCards}
        >
          {trendingOutfits.map((outfit) => renderOutfit(outfit))}
        </ScrollView>
      </View>

      {/* ========================= */}
      {/* EXPLORE FITMATCH */}
      {/* ========================= */}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>✦</Text>

            <Text style={styles.sectionTitle}>Explore FITMATCH</Text>
          </View>
        </View>

        <View style={styles.featureGrid}>
          {features.map((feature) => renderFeature(feature))}
        </View>
      </View>

      {/* ========================= */}
      {/* BOTTOM */}
      {/* ========================= */}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}
