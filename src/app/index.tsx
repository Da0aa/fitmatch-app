import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import styles from "../styles/styles";

interface Outfit {
  id: number;
  name: string;
  category: string;
  image: string;
  description?: string;
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
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Street Style",
    category: "Street",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Clean White",
    category: "Minimalist",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
  },
];

const trendingOutfits: Outfit[] = [
  {
    id: 4,
    name: "Everyday Look",
    category: "Casual",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Simple Couple",
    category: "Casual",
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Soft Neutral",
    category: "Minimalist",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
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
      onPress={() =>
        router.push({
          pathname: "/match",
          params: { occasion: "Casual", style: outfit.category },
        })
      }
    >
      <View style={[styles.outfitImage, { overflow: "hidden" }]}>
        <Image
          source={{ uri: outfit.image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
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
        <Pressable style={styles.banner} onPress={() => router.push("/match")}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerSmallText}>FITMATCH</Text>

            <Text style={styles.bannerTitle}>Good Outfit</Text>

            <Text style={styles.bannerTitle}>Good Mood ♡</Text>

            <Text style={styles.bannerSubtitle}>Temukan gaya terbaikmu</Text>
          </View>

          <View style={[styles.bannerImage, { overflow: "hidden" }]}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
              }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
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

          <Pressable onPress={() => router.push("/match")}>
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

          <Pressable onPress={() => router.push("/match")}>
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
