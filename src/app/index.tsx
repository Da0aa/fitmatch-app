import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user, signOut, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const openExplore = () => router.navigate("/explore");
  const openWardrobe = () => router.navigate("/wardrobe");
  const openMatch = () => router.navigate("/match");
  const openAuth = () => router.navigate("/auth");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="shirt-outline" size={28} color="#1E3A8A" />
            <Text style={styles.logoText}>FitMatch</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            {!user ? (
              <Link href="/auth" asChild>
                <Pressable style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
              </Link>
            ) : (
              <Pressable style={styles.profileButton} onPress={signOut}>
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              </Pressable>
            )}
          </View>
        </View>

        {/* HERO BANNER */}
        <View style={styles.heroBanner}>
          <Ionicons
            name="sparkles"
            size={24}
            color="#93C5FD"
            style={styles.decoSparkle1}
            pointerEvents="none"
          />

          <Ionicons
            name="sparkles"
            size={16}
            color="#93C5FD"
            style={styles.decoSparkle2}
            pointerEvents="none"
          />

          <View style={styles.heroTextContainer}>
            <View style={styles.badge}>
              <Ionicons name="sparkles" size={12} color="#3B82F6" />
              <Text style={styles.badgeText}>Find your fit.</Text>
            </View>

            <Text style={styles.heroTitle}>
              Mix, Match,{"\n"}
              <Text style={styles.heroTitleHighlight}>Be You.</Text>
            </Text>

            <Text style={styles.heroSubtitle}>
              Explore styles, find your vibe, and dress the best version of you!
            </Text>

            <Pressable style={styles.exploreButton} onPress={openExplore}>
              <Text style={styles.exploreButtonText}>Explore Now</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* ILUSTRASI */}
          <View style={styles.heroIllustrationContainer} pointerEvents="none">
            <View style={styles.illustrationRing} />

            <MaterialCommunityIcons
              name="hanger"
              size={140}
              color="#FFFFFF"
              style={styles.illustrationIcon}
            />

            <Text style={styles.illustrationText}>Dress{"\n"}Your Mood</Text>
          </View>
        </View>

        {/* FOR YOU */}
        <View style={styles.forYouHeader}>
          <View style={styles.forYouTitleContainer}>
            <Ionicons name="sparkles" size={20} color="#1E3A8A" />
            <Text style={styles.forYouTitle}>For You</Text>
          </View>

          <Text style={styles.forYouSubtitle}>
            Discover features that match your style!
          </Text>
        </View>

        {/* FEATURE CARDS */}
        <View style={styles.featureCardsContainer}>
          {/* EXPLORE */}
          <Pressable
            style={[styles.featureCard, { backgroundColor: "#EBF4FF" }]}
            onPress={openExplore}
          >
            <View style={[styles.cardIconBg, { backgroundColor: "#DBEAFE" }]}>
              <Ionicons name="shirt-outline" size={32} color="#3B82F6" />
            </View>

            <View style={styles.cardTextWrapper}>
              <Text style={styles.featureCardTitle}>Explore Styles</Text>
              <Text style={styles.featureCardDesc}>
                Find outfit ideas for any occasion.
              </Text>
            </View>

            <View style={styles.cardArrow} pointerEvents="none">
              <Ionicons name="arrow-forward" size={14} color="#1E3A8A" />
            </View>
          </Pressable>

          {/* WARDROBE */}
          <Pressable
            style={[styles.featureCard, { backgroundColor: "#FFFBEB" }]}
            onPress={openWardrobe}
          >
            <View style={[styles.cardIconBg, { backgroundColor: "#FEF3C7" }]}>
              <MaterialCommunityIcons
                name="wardrobe-outline"
                size={32}
                color="#D97706"
              />
            </View>

            <View style={styles.cardTextWrapper}>
              <Text style={styles.featureCardTitle}>Wardrobe</Text>
              <Text style={styles.featureCardDesc}>Track your outfits.</Text>
            </View>

            <View style={styles.cardArrow} pointerEvents="none">
              <Ionicons name="arrow-forward" size={14} color="#1E3A8A" />
            </View>
          </Pressable>

          {/* MATCH */}
          <Pressable
            style={[styles.featureCard, { backgroundColor: "#F5F3FF" }]}
            onPress={openMatch}
          >
            <View style={[styles.cardIconBg, { backgroundColor: "#E0E7FF" }]}>
              <Ionicons name="extension-puzzle" size={32} color="#4F46E5" />
            </View>

            <View style={styles.cardTextWrapper}>
              <Text style={styles.featureCardTitle}>Get Match</Text>
              <Text style={styles.featureCardDesc}>Find your perfect fit.</Text>
            </View>

            <View style={styles.cardArrow} pointerEvents="none">
              <Ionicons name="arrow-forward" size={14} color="#1E3A8A" />
            </View>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    zIndex: 10,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logoText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  loginButton: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },

  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  heroBanner: {
    backgroundColor: "#D0E6FC",
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 32,
    position: "relative",
    zIndex: 10,
  },

  decoSparkle1: {
    position: "absolute",
    top: 20,
    left: "45%",
    opacity: 0.6,
  },

  decoSparkle2: {
    position: "absolute",
    bottom: 30,
    left: "40%",
    opacity: 0.4,
  },

  heroTextContainer: {
    flex: 1,
    zIndex: 2,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0EFFE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
    gap: 6,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E3A8A",
  },

  heroTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#1E3A8A",
    lineHeight: 42,
    marginBottom: 12,
  },

  heroTitleHighlight: {
    color: "#3B82F6",
  },

  heroSubtitle: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: "90%",
  },

  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3A8A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 8,
  },

  exploreButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  heroIllustrationContainer: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  illustrationRing: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 20,
    borderColor: "rgba(255, 255, 255, 0.4)",
    transform: [{ rotate: "-20deg" }],
  },

  illustrationIcon: {
    zIndex: 2,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },

  illustrationText: {
    position: "absolute",
    bottom: 10,
    right: -10,
    fontSize: 16,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#1E3A8A",
    transform: [{ rotate: "-10deg" }],
  },

  forYouHeader: {
    marginBottom: 16,
    zIndex: 10,
  },

  forYouTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  forYouTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  forYouSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },

  featureCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    zIndex: 10,
  },

  featureCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    position: "relative",
    minHeight: 180,
    justifyContent: "space-between",
  },

  cardIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  cardTextWrapper: {
    flex: 1,
  },

  featureCardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 4,
  },

  featureCardDesc: {
    fontSize: 12,
    color: "#475569",
    lineHeight: 16,
  },

  cardArrow: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
