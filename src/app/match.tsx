import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import styles from "../styles/matchStyles";

// =====================================================
// TYPE / INTERFACE
// =====================================================

interface MatchOption {
  id: number;
  name: string;
}

interface Outfit {
  id: number;
  name: string;
  occasion: string;
  style: string;
  color: string;
  image: string;
}

// =====================================================
// ARRAY OF OBJECTS
// =====================================================

const occasions: MatchOption[] = [
  { id: 1, name: "Casual" },
  { id: 2, name: "Formal" },
  { id: 3, name: "Party" },
];

const styleOptions: MatchOption[] = [
  { id: 1, name: "Minimalist" },
  { id: 2, name: "Streetwear" },
  { id: 3, name: "Classic" },
];

const colors: MatchOption[] = [
  { id: 1, name: "Black" },
  { id: 2, name: "White" },
  { id: 3, name: "Beige" },
];

// =====================================================
// DATA OUTFIT (DENGAN FOTO)
// =====================================================

const outfits: Outfit[] = [
  {
    id: 1,
    name: "Black Minimalist Outfit",
    occasion: "Casual",
    style: "Minimalist",
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "White Classic Outfit",
    occasion: "Formal",
    style: "Classic",
    color: "White",
    image:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Beige Street Outfit",
    occasion: "Casual",
    style: "Streetwear",
    color: "Beige",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Black Street Party Outfit",
    occasion: "Party",
    style: "Streetwear",
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
  },
];

// =====================================================
// MATCH SCREEN (MODUL 2: HOOKS & EXPO ROUTER)
// =====================================================

export default function Match() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    occasion?: string;
    style?: string;
    color?: string;
  }>();

  const [selectedOccasion, setSelectedOccasion] = useState(
    params.occasion || "",
  );
  const [selectedStyle, setSelectedStyle] = useState(params.style || "");
  const [selectedColor, setSelectedColor] = useState(params.color || "");
  const [result, setResult] = useState<Outfit | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setHasSearched(false);
    setResult(null);
  }, [selectedOccasion, selectedStyle, selectedColor]);

  const isReadyToMatch = useMemo(() => {
    return Boolean(selectedOccasion && selectedStyle && selectedColor);
  }, [selectedOccasion, selectedStyle, selectedColor]);

  const findMatch = () => {
    const matchedOutfit = outfits.find(
      (outfit) =>
        outfit.occasion === selectedOccasion &&
        outfit.style === selectedStyle &&
        outfit.color === selectedColor,
    );

    setResult(matchedOutfit || null);
    setHasSearched(true);

    router.setParams({
      occasion: selectedOccasion,
      style: selectedStyle,
      color: selectedColor,
    });
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleGoToExplore = () => {
    router.push({
      pathname: "/explore",
      params: { matchedOutfit: result?.name || "Belum ada outfit" },
    });
  };

  const renderOption = (
    option: MatchOption,
    selectedValue: string,
    onSelect: (value: string) => void,
  ) => {
    const isSelected = selectedValue === option.name;

    return (
      <Pressable
        key={option.id}
        onPress={() => onSelect(option.name)}
        style={[styles.option, isSelected && styles.selectedOption]}
      >
        <Text
          style={[styles.optionText, isSelected && styles.selectedOptionText]}
        >
          {option.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 12,
          }}
        >
          <Pressable
            onPress={handleGoBack}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              backgroundColor: "#EBF3FA",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#4A90E2", fontWeight: "600", fontSize: 13 }}>
              ← Back
            </Text>
          </Pressable>

          <Pressable
            onPress={handleGoToExplore}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              backgroundColor: "#EBF3FA",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#4A90E2", fontWeight: "600", fontSize: 13 }}>
              Explore →
            </Text>
          </Pressable>
        </View>

        <Text style={styles.logo}>FITMATCH</Text>

        <Text style={styles.title}>Find Your Fit ✨</Text>

        <Text style={styles.subtitle}>
          Choose your occasion, style, and color to find the perfect outfit.
        </Text>

        <Text style={styles.sectionTitle}>Occasion</Text>

        <View style={styles.optionContainer}>
          {occasions.map((option) =>
            renderOption(option, selectedOccasion, setSelectedOccasion),
          )}
        </View>

        <Text style={styles.sectionTitle}>Style</Text>

        <View style={styles.optionContainer}>
          {styleOptions.map((option) =>
            renderOption(option, selectedStyle, setSelectedStyle),
          )}
        </View>

        <Text style={styles.sectionTitle}>Color</Text>

        <View style={styles.optionContainer}>
          {colors.map((option) =>
            renderOption(option, selectedColor, setSelectedColor),
          )}
        </View>

        <Pressable onPress={findMatch} style={styles.matchButton}>
          <Text style={styles.matchButtonText}>FIND MY FIT</Text>
        </Pressable>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Your Match ✨</Text>

            <Image
              source={{ uri: result.image }}
              style={{
                width: 180,
                height: 220,
                borderRadius: 14,
                marginVertical: 12,
                alignSelf: "center",
              }}
              resizeMode="cover"
            />

            <Text style={styles.resultName}>{result.name}</Text>

            <Text style={styles.resultDetail}>
              {result.occasion} • {result.style} • {result.color}
            </Text>

            <Text
              style={{
                marginTop: 15,
                color: "#999999",
                fontSize: 12,
              }}
            >
              FITMATCH • Your Style, Your Match
            </Text>
          </View>
        )}

        {hasSearched && !result && isReadyToMatch && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>No Match Found</Text>

            <Text style={styles.resultDetail}>
              Try another combination of occasion, style, or color.
            </Text>
          </View>
        )}

        <Text style={styles.hint}>
          {isReadyToMatch
            ? `Ready to match: ${selectedOccasion} • ${selectedStyle} • ${selectedColor}`
            : "Choose all preferences to find your fit."}
        </Text>
      </View>
    </ScrollView>
  );
}
