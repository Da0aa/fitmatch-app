import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // =========================
  // CONTAINER
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#F4FAFD",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  desktopContent: {
    alignItems: "center",
  },

  // =========================
  // HEADER
  // =========================

  header: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTop: {
    width: "100%",
    maxWidth: 850,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4B8FC4",
  },

  greeting: {
    fontSize: 14,
    color: "#7893A3",
    marginTop: 4,
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EAF6FC",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    fontSize: 24,
    color: "#4B8FC4",
  },

  // =========================
  // SEARCH
  // =========================

  searchContainer: {
    width: "100%",
    maxWidth: 850,
    alignSelf: "center",
    height: 46,
    backgroundColor: "#EDF6FB",
    borderRadius: 24,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  searchIcon: {
    fontSize: 25,
    color: "#78A7C4",
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#315B73",
    paddingVertical: 0,
  },

  // =========================
  // SECTION
  // =========================

  section: {
    width: "100%",
    maxWidth: 850,
    paddingHorizontal: 24,
    marginTop: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionIcon: {
    fontSize: 20,
    color: "#5B9CCB",
    marginRight: 7,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#315B73",
  },

  seeAll: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B9FBE",
  },

  // =========================
  // BANNER
  // =========================

  banner: {
    width: "100%",
    minHeight: 175,
    backgroundColor: "#DCEFFA",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  bannerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  bannerSmallText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#76A7C4",
    letterSpacing: 1,
    marginBottom: 5,
  },

  bannerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#3D78A4",
  },

  bannerSubtitle: {
    fontSize: 12,
    color: "#7193A6",
    marginTop: 9,
  },

  bannerImage: {
    width: 125,
    height: 135,
    backgroundColor: "#C5E2F3",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  bannerDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 7,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5D9FD0",
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#D4E5EE",
  },

  // =========================
  // OUTFIT CARDS
  // =========================

  horizontalCards: {
    gap: 12,
    paddingRight: 24,
  },

  outfitCard: {
    width: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingBottom: 13,
    overflow: "hidden",

    shadowColor: "#76A9C5",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 2,
  },

  outfitImage: {
    width: "100%",
    height: 155,
    backgroundColor: "#DCECF5",
    alignItems: "center",
    justifyContent: "center",
  },

  imagePlaceholder: {
    fontSize: 12,
    color: "#8AA9BA",
  },

  outfitName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#315B73",
    marginTop: 10,
    paddingHorizontal: 12,
  },

  outfitCategory: {
    fontSize: 11,
    color: "#79A7C1",
    marginTop: 3,
    paddingHorizontal: 12,
  },

  cardPressed: {
    opacity: 0.7,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  // =========================
  // FEATURES
  // =========================

  featureGrid: {
    gap: 10,
  },

  featureCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#76A9C5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#C8E5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  featureIconText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#39779E",
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#315B73",
  },

  featureDescription: {
    fontSize: 11,
    color: "#7B96A5",
    marginTop: 3,
  },

  featureArrow: {
    fontSize: 27,
    color: "#75A7C2",
    marginLeft: 8,
  },

  // =========================
  // BOTTOM
  // =========================

  bottomSpace: {
    height: 45,
  },
});

export default styles;
