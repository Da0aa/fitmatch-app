import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

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
}

// =====================================================
// ARRAY OF OBJECTS
// =====================================================

const occasions: MatchOption[] = [
  {
    id: 1,
    name: "Casual",
  },
  {
    id: 2,
    name: "Formal",
  },
  {
    id: 3,
    name: "Party",
  },
];

const styleOptions: MatchOption[] = [
  {
    id: 1,
    name: "Minimalist",
  },
  {
    id: 2,
    name: "Streetwear",
  },
  {
    id: 3,
    name: "Classic",
  },
];

const colors: MatchOption[] = [
  {
    id: 1,
    name: "Black",
  },
  {
    id: 2,
    name: "White",
  },
  {
    id: 3,
    name: "Beige",
  },
];

// =====================================================
// DATA OUTFIT
// =====================================================

const outfits: Outfit[] = [
  {
    id: 1,
    name: "Black Minimalist Outfit",
    occasion: "Casual",
    style: "Minimalist",
    color: "Black",
  },

  {
    id: 2,
    name: "White Classic Outfit",
    occasion: "Formal",
    style: "Classic",
    color: "White",
  },

  {
    id: 3,
    name: "Beige Street Outfit",
    occasion: "Casual",
    style: "Streetwear",
    color: "Beige",
  },

  {
    id: 4,
    name: "Black Street Party Outfit",
    occasion: "Party",
    style: "Streetwear",
    color: "Black",
  },
];

// =====================================================
// MATCH SCREEN
// =====================================================

export default function Match() {
  const [selectedOccasion, setSelectedOccasion] = useState("");

  const [selectedStyle, setSelectedStyle] = useState("");

  const [selectedColor, setSelectedColor] = useState("");

  const [result, setResult] = useState<Outfit | null>(null);

  // ===================================================
  // CUSTOM FUNCTION UNTUK MENCARI OUTFIT
  // ===================================================

  const findMatch = () => {
    const matchedOutfit = outfits.find(
      (outfit) =>
        outfit.occasion === selectedOccasion &&
        outfit.style === selectedStyle &&
        outfit.color === selectedColor,
    );

    setResult(matchedOutfit || null);
  };

  // ===================================================
  // CUSTOM FUNCTION UNTUK MEMBUAT OPTION
  // ===================================================

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
        {/* =========================================
            HEADER
        ========================================= */}

        <Text style={styles.logo}>FITMATCH</Text>

        <Text style={styles.title}>Find Your Fit ✨</Text>

        <Text style={styles.subtitle}>
          Choose your occasion, style, and color to find the perfect outfit.
        </Text>

        {/* =========================================
            OCCASION
        ========================================= */}

        <Text style={styles.sectionTitle}>Occasion</Text>

        <View style={styles.optionContainer}>
          {occasions.map((option) =>
            renderOption(option, selectedOccasion, setSelectedOccasion),
          )}
        </View>

        {/* =========================================
            STYLE
        ========================================= */}

        <Text style={styles.sectionTitle}>Style</Text>

        <View style={styles.optionContainer}>
          {styleOptions.map((option) =>
            renderOption(option, selectedStyle, setSelectedStyle),
          )}
        </View>

        {/* =========================================
            COLOR
        ========================================= */}

        <Text style={styles.sectionTitle}>Color</Text>

        <View style={styles.optionContainer}>
          {colors.map((option) =>
            renderOption(option, selectedColor, setSelectedColor),
          )}
        </View>

        {/* =========================================
            BUTTON
        ========================================= */}

        <Pressable onPress={findMatch} style={styles.matchButton}>
          <Text style={styles.matchButtonText}>FIND MY FIT</Text>
        </Pressable>

        {/* =========================================
            MATCH RESULT
        ========================================= */}

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Your Match ✨</Text>

            <Text style={styles.resultName}>{result.name}</Text>

            <Text style={styles.resultDetail}>
              {result.occasion} • {result.style} • {result.color}
            </Text>

            {/* INLINE STYLE */}
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

        {/* =========================================
            NO RESULT
        ========================================= */}

        {!result && selectedOccasion && selectedStyle && selectedColor && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>No Match Found</Text>

            <Text style={styles.resultDetail}>
              Try another combination of occasion, style, or color.
            </Text>
          </View>
        )}

        {/* =========================================
            HINT
        ========================================= */}

        <Text style={styles.hint}>
          Choose all preferences to find your fit.
        </Text>
      </View>
    </ScrollView>
  );
}
