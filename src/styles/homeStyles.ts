import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==============================
  // CONTAINER
  // ==============================

  container: {
    flex: 1,
    backgroundColor: "#F7FBFF",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // ==============================
  // HEADER
  // ==============================

  header: {
    backgroundColor: "#DCEFFC",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },

  logo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4C89AE",
    letterSpacing: 2,
    marginBottom: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#23445A",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5B6F82",
  },

  // ==============================
  // SECTION
  // ==============================

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#23445A",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#7890A1",
    marginBottom: 14,
  },

  // ==============================
  // OUTFIT CARD
  // ==============================

  outfitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,

    shadowColor: "#8FB9D1",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    elevation: 3,
  },

  outfitIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#DCEFFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  outfitIconText: {
    fontSize: 28,
  },

  outfitInfo: {
    flex: 1,
  },

  outfitName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#294B61",
    marginBottom: 3,
  },

  outfitCategory: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6BA5C6",
    marginBottom: 4,
  },

  outfitDescription: {
    fontSize: 12,
    color: "#7B8D99",
    lineHeight: 17,
  },

  // ==============================
  // TRENDING
  // ==============================

  trendingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  trendingCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7EAF5",
  },

  trendingEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },

  trendingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#45677C",
  },

  // ==============================
  // EXPLORE STYLE
  // ==============================

  styleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  styleChip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#B9DDF2",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  styleChipText: {
    color: "#4C89AE",
    fontSize: 13,
    fontWeight: "600",
  },

  // ==============================
  // MATCH BUTTON
  // ==============================

  matchButton: {
    backgroundColor: "#8FC6E3",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,

    shadowColor: "#6BA5C6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    elevation: 4,
  },

  matchButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 5,
  },

  matchButtonSubtext: {
    color: "#F7FBFF",
    fontSize: 12,
    textAlign: "center",
  },

  // ==============================
  // FOOTER
  // ==============================

  footer: {
    textAlign: "center",
    color: "#8AA1B0",
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
