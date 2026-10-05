import { useState } from "react";
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
// OPTION DATA
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
// OUTFIT DATA
// =====================================================

const outfits: Outfit[] = [
  {
    id: 1,
    name: "Black Minimalist Outfit",
    occasion: "Casual",
    style: "Minimalist",
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 2,
    name: "White Classic Outfit",
    occasion: "Formal",
    style: "Classic",
    color: "White",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 3,
    name: "Beige Street Outfit",
    occasion: "Casual",
    style: "Streetwear",
    color: "Beige",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 4,
    name: "Black Street Party Outfit",
    occasion: "Party",
    style: "Streetwear",
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
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
  // FIND MATCH
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
  // OPTION COMPONENT
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* =================================================
            TOP LABEL
        ================================================= */}

        <Text style={styles.logo}>FITMATCH</Text>

        {/* =================================================
            HERO
        ================================================= */}

        <View style={styles.heroCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
            }}
            style={styles.heroImage}
          />

          <View style={styles.heroOverlay} />

          <View style={styles.heroText}>
            <Text style={styles.heroSmallText}>YOUR STYLE, YOUR MATCH</Text>

            <Text style={styles.heroTitle}>Find Your Fit</Text>

            <Text style={styles.heroDescription}>
              Mix your vibe, occasion & color.
            </Text>
          </View>
        </View>

        {/* =================================================
            INTRO
        ================================================= */}

        <View style={styles.intro}>
          <Text style={styles.title}>Find Your Fit ✨</Text>

          <Text style={styles.subtitle}>
            Choose your preferences and let FITMATCH find an outfit that matches
            your vibe.
          </Text>
        </View>

        {/* =================================================
            OCCASION
        ================================================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>01</Text>

          <Text style={styles.sectionTitle}>Occasion</Text>
        </View>

        <Text style={styles.sectionDescription}>Where are you going?</Text>

        <View style={styles.optionContainer}>
          {occasions.map((option) =>
            renderOption(option, selectedOccasion, setSelectedOccasion),
          )}
        </View>

        {/* =================================================
            STYLE
        ================================================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>02</Text>

          <Text style={styles.sectionTitle}>Style</Text>
        </View>

        <Text style={styles.sectionDescription}>What's your fashion vibe?</Text>

        <View style={styles.optionContainer}>
          {styleOptions.map((option) =>
            renderOption(option, selectedStyle, setSelectedStyle),
          )}
        </View>

        {/* =================================================
            COLOR
        ================================================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNumber}>03</Text>

          <Text style={styles.sectionTitle}>Color</Text>
        </View>

        <Text style={styles.sectionDescription}>Pick your main color.</Text>

        <View style={styles.optionContainer}>
          {colors.map((option) =>
            renderOption(option, selectedColor, setSelectedColor),
          )}
        </View>

        {/* =================================================
            BUTTON
        ================================================= */}

        <Pressable
          onPress={findMatch}
          style={({ pressed }) => [
            styles.matchButton,
            pressed && styles.matchButtonPressed,
          ]}
        >
          <Text style={styles.matchButtonText}>FIND MY FIT</Text>

          <Text style={styles.matchButtonArrow}>→</Text>
        </Pressable>

        {/* =================================================
            RESULT
        ================================================= */}

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>✦ YOUR MATCH</Text>

            <Image source={{ uri: result.image }} style={styles.resultImage} />

            <View style={styles.resultContent}>
              <Text style={styles.resultTitle}>You got a match!</Text>

              <Text style={styles.resultName}>{result.name}</Text>

              <View style={styles.resultTags}>
                <View style={styles.resultTag}>
                  <Text style={styles.resultTagText}>{result.occasion}</Text>
                </View>

                <View style={styles.resultTag}>
                  <Text style={styles.resultTagText}>{result.style}</Text>
                </View>

                <View style={styles.resultTag}>
                  <Text style={styles.resultTagText}>{result.color}</Text>
                </View>
              </View>

              <Text style={styles.resultFooter}>
                FITMATCH • Your Style, Your Match
              </Text>
            </View>
          </View>
        )}

        {/* =================================================
            NO RESULT
        ================================================= */}

        {!result && selectedOccasion && selectedStyle && selectedColor && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>No Match Found</Text>

            <Text style={styles.resultDetail}>
              Try another combination of occasion, style, or color.
            </Text>
          </View>
        )}

        {/* =================================================
            HINT
        ================================================= */}

        <Text style={styles.hint}>
          Choose all preferences to discover your fit ✦
        </Text>
      </View>
    </ScrollView>
  );
}
