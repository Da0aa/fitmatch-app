import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import styles from "../styles/homeStyles";

// ========================================
// TYPE / INTERFACE
// ========================================

interface Outfit {
  id: number;
  name: string;
  category: string;
  description: string;
}

// ========================================
// ARRAY OF OBJECTS
// ========================================

const outfits: Outfit[] = [
  {
    id: 1,
    name: "Casual Everyday",
    category: "Casual",
    description: "Simple outfit for everyday activities",
  },
  {
    id: 2,
    name: "Minimalist Look",
    category: "Minimalist",
    description: "Clean and simple style",
  },
  {
    id: 3,
    name: "Street Style",
    category: "Streetwear",
    description: "Trendy outfit for a casual day",
  },
  {
    id: 4,
    name: "Elegant Look",
    category: "Formal",
    description: "A neat outfit for special occasions",
  },
];

// ========================================
// CUSTOM FUNCTION
// ========================================

const renderOutfit = (outfit: Outfit) => {
  return (
    <View key={outfit.id} style={styles.outfitCard}>
      <View style={styles.outfitIcon}>
        <Text style={styles.outfitIconText}>👕</Text>
      </View>

      <View style={styles.outfitInfo}>
        <Text style={styles.outfitName}>{outfit.name}</Text>

        <Text style={styles.outfitCategory}>{outfit.category}</Text>

        <Text style={styles.outfitDescription}>{outfit.description}</Text>
      </View>
    </View>
  );
};

// ========================================
// HOME SCREEN
// ========================================

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ==================================
          HEADER
      ================================== */}

      <View style={styles.header}>
        <Text style={styles.logo}>FITMATCH</Text>

        <Text style={styles.title}>Find Your Style</Text>

        <Text style={styles.subtitle}>
          Discover outfit ideas that match your personality and occasion.
        </Text>

        {/* INLINE STYLE */}
        <Text
          style={{
            marginTop: 12,
            color: "#5B6F82",
            fontSize: 13,
          }}
        >
          Your personal outfit companion ✨
        </Text>
      </View>

      {/* ==================================
          FOR YOU
      ================================== */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>For You</Text>

        <Text style={styles.sectionSubtitle}>
          Outfit recommendations for you
        </Text>

        {/* LOOP / MAP */}
        {outfits.map((outfit) => renderOutfit(outfit))}
      </View>

      {/* ==================================
          TRENDING
      ================================== */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending</Text>

        <Text style={styles.sectionSubtitle}>Popular styles this week</Text>

        <View style={styles.trendingContainer}>
          <Pressable style={styles.trendingCard}>
            <Text style={styles.trendingEmoji}>👟</Text>

            <Text style={styles.trendingText}>Casual</Text>
          </Pressable>

          <Pressable style={styles.trendingCard}>
            <Text style={styles.trendingEmoji}>🧥</Text>

            <Text style={styles.trendingText}>Streetwear</Text>
          </Pressable>

          <Pressable style={styles.trendingCard}>
            <Text style={styles.trendingEmoji}>👔</Text>

            <Text style={styles.trendingText}>Formal</Text>
          </Pressable>
        </View>
      </View>

      {/* ==================================
          EXPLORE STYLE
      ================================== */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Style</Text>

        <Text style={styles.sectionSubtitle}>Find a style that fits you</Text>

        <View style={styles.styleContainer}>
          <Pressable style={styles.styleChip}>
            <Text style={styles.styleChipText}>Minimalist</Text>
          </Pressable>

          <Pressable style={styles.styleChip}>
            <Text style={styles.styleChipText}>Korean</Text>
          </Pressable>

          <Pressable style={styles.styleChip}>
            <Text style={styles.styleChipText}>Vintage</Text>
          </Pressable>

          <Pressable style={styles.styleChip}>
            <Text style={styles.styleChipText}>Streetwear</Text>
          </Pressable>
        </View>
      </View>

      {/* ==================================
          MATCH BUTTON
      ================================== */}

      <Pressable
        style={styles.matchButton}
        onPress={() => router.push("/match")}
      >
        <Text style={styles.matchButtonText}>✨ FIND MY MATCH</Text>

        <Text style={styles.matchButtonSubtext}>
          Create an outfit based on your preferences
        </Text>
      </Pressable>

      {/* ==================================
          FOOTER
      ================================== */}

      <Text style={styles.footer}>FITMATCH • Your Style, Your Match</Text>
    </ScrollView>
  );
}
