import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // =====================================================
  // MAIN
  // =====================================================

  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },

  content: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 55,
  },

  // =====================================================
  // LOGO
  // =====================================================

  logo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#79A7D3",
    letterSpacing: 2,
    marginBottom: 18,
  },

  // =====================================================
  // HERO
  // =====================================================

  heroCard: {
    width: "100%",
    height: 300,
    borderRadius: 28,
    overflow: "hidden",
    position: "relative",
    marginBottom: 30,

    backgroundColor: "#DCECF9",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  heroOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(25, 48, 70, 0.20)",
  },

  heroText: {
    position: "absolute",
    left: 25,
    bottom: 25,
  },

  heroSmallText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 7,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 5,
  },

  heroDescription: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },

  // =====================================================
  // INTRO
  // =====================================================

  intro: {
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#202A35",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#718096",
    maxWidth: 650,
  },

  // =====================================================
  // SECTION
  // =====================================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
  },

  sectionNumber: {
    fontSize: 12,
    fontWeight: "800",
    color: "#79A7D3",
    marginRight: 9,
    letterSpacing: 1,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#202A35",
  },

  sectionDescription: {
    color: "#8A96A3",
    fontSize: 13,
    marginBottom: 13,
  },

  // =====================================================
  // OPTIONS
  // =====================================================

  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE7EF",
    borderRadius: 30,

    paddingVertical: 13,
    paddingHorizontal: 20,

    marginRight: 9,
    marginBottom: 9,

    elevation: 1,

    shadowColor: "#8AA8C0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  selectedOption: {
    backgroundColor: "#8AB5DC",
    borderColor: "#8AB5DC",

    elevation: 3,

    shadowColor: "#78A9D2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  optionText: {
    color: "#344454",
    fontSize: 14,
    fontWeight: "600",
  },

  selectedOptionText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  // =====================================================
  // FIND BUTTON
  // =====================================================

  matchButton: {
    backgroundColor: "#263746",
    borderRadius: 20,

    minHeight: 64,

    paddingHorizontal: 24,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 5,
    marginBottom: 30,

    elevation: 3,

    shadowColor: "#263746",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 7,
  },

  matchButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  matchButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  matchButtonArrow: {
    color: "#A9D2F2",
    fontSize: 24,
    fontWeight: "400",
    marginLeft: 12,
  },

  // =====================================================
  // RESULT CARD
  // =====================================================

  resultContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#E0EAF2",

    marginTop: 5,
    marginBottom: 25,

    elevation: 3,

    shadowColor: "#6E91AC",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.09,
    shadowRadius: 10,
  },

  resultLabel: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: "#7FAED6",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  resultImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },

  resultContent: {
    padding: 20,
  },

  resultTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7FAED6",
    marginBottom: 7,
  },

  resultName: {
    fontSize: 23,
    fontWeight: "900",
    color: "#263746",
    marginBottom: 13,
  },

  resultTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  resultTag: {
    backgroundColor: "#EDF6FD",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 7,
    marginBottom: 7,
  },

  resultTagText: {
    color: "#6392BA",
    fontSize: 12,
    fontWeight: "700",
  },

  resultDetail: {
    fontSize: 14,
    lineHeight: 21,
    color: "#718096",
  },

  resultFooter: {
    fontSize: 11,
    color: "#A1ACB6",
    marginTop: 5,
  },

  // =====================================================
  // HINT
  // =====================================================

  hint: {
    textAlign: "center",
    marginTop: 5,
    color: "#9AA7B2",
    fontSize: 12,
  },
});

export default styles;
