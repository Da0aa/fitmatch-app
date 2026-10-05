import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 31,
    fontWeight: "700",
    color: "#377CCF",
    letterSpacing: -1.5,
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F9FE",
    position: "relative",
  },

  notificationIcon: {
    fontSize: 25,
    color: "#5B91D5",
    transform: [{ rotate: "180deg" }],
  },

  notificationDot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#6FA7E5",
    top: 9,
    right: 10,
  },

  searchContainer: {
    height: 43,
    borderRadius: 22,
    backgroundColor: "#F0F6FC",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  searchIcon: {
    fontSize: 25,
    color: "#8EACCB",
    marginRight: 8,
    transform: [{ rotate: "-20deg" }],
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 13,
    color: "#315A83",
    paddingVertical: 0,
  },

  clearText: {
    fontSize: 23,
    color: "#8EACCB",
    paddingLeft: 5,
  },

  banner: {
    height: 153,
    borderRadius: 14,
    backgroundColor: "#E4F1FD",
    overflow: "hidden",
    position: "relative",
    flexDirection: "row",
  },

  bannerText: {
    flex: 1,
    paddingLeft: 18,
    paddingTop: 29,
    zIndex: 2,
  },

  bannerTitle: {
    fontSize: 25,
    fontWeight: "500",
    fontStyle: "italic",
    color: "#3878C5",
  },

  bannerSubtitle: {
    fontSize: 24,
    fontWeight: "500",
    fontStyle: "italic",
    color: "#3878C5",
    marginTop: -2,
  },

  bannerDescription: {
    fontSize: 9,
    color: "#7196BA",
    marginTop: 8,
  },

  bannerLine: {
    width: 82,
    height: 2,
    backgroundColor: "#6DA1D9",
    marginTop: 8,
    borderRadius: 2,
    transform: [{ rotate: "-6deg" }],
  },

  bannerPerson: {
    width: "38%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  bannerEmoji: {
    fontSize: 75,
    marginBottom: 7,
  },

  bannerHeart: {
    position: "absolute",
    right: 5,
    top: 6,
    fontSize: 55,
    color: "#6FA7E5",
  },

  bannerSparkle: {
    position: "absolute",
    left: 13,
    top: 10,
    fontSize: 18,
    color: "#8AB8E8",
  },

  dots: {
    height: 31,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#DCE7F2",
  },

  activeDot: {
    width: 9,
    height: 9,
    backgroundColor: "#5995D7",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 12,
  },

  sectionTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionIcon: {
    fontSize: 20,
    color: "#4384CE",
    marginRight: 7,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#315F93",
  },

  seeAll: {
    fontSize: 10,
    fontWeight: "600",
    color: "#7B9DC0",
  },

  horizontalList: {
    gap: 10,
    paddingRight: 5,
    paddingBottom: 5,
  },

  outfitCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEF2F6",
    elevation: 1,
  },

  outfitImage: {
    width: "100%",
    height: 125,
    backgroundColor: "#EEF4F9",
  },

  outfitInfo: {
    padding: 8,
  },

  outfitName: {
    fontSize: 10,
    fontWeight: "700",
    color: "#385B7F",
  },

  outfitCategory: {
    fontSize: 9,
    color: "#91A5B9",
    marginTop: 2,
  },

  quickAction: {
    marginTop: 25,
    padding: 17,
    borderRadius: 16,
    backgroundColor: "#EEF6FD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  quickTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#315F93",
  },

  quickSubtitle: {
    fontSize: 10,
    color: "#7C9AB6",
    marginTop: 3,
  },

  quickButton: {
    backgroundColor: "#7FA8D0",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 10,
  },

  quickButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  emptySearch: {
    minHeight: 130,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFD",
    borderRadius: 14,
    marginBottom: 10,
  },

  emptyIcon: {
    fontSize: 28,
    color: "#9BB5CE",
  },

  emptyTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#557795",
    marginTop: 6,
  },

  emptyText: {
    fontSize: 10,
    color: "#94A8BA",
    marginTop: 3,
  },

  bottomSpace: {
    height: 30,
  },
});

export default styles;
