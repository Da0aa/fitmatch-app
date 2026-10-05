import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    letterSpacing: 1,
  },

  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F0F5FA",
    borderRadius: 12,
  },

  editText: {
    fontSize: 12,
    color: "#4A729D",
    fontWeight: "600",
  },

  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  searchInput: {
    backgroundColor: "#F0F5FA",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 13,
    color: "#1E293B",
  },

  categoryWrapper: {
    height: 45,
    marginBottom: 10,
  },

  categoryContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0F5FA",
    marginRight: 8,
    height: 35,
    justifyContent: "center",
  },

  chipActive: {
    backgroundColor: "#7FA8D0",
  },

  chipText: {
    fontSize: 12,
    color: "#4A729D",
  },

  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  infoText: {
    fontSize: 12,
    color: "#64748B",
  },

  filterText: {
    fontSize: 12,
    color: "#1E293B",
    fontWeight: "600",
  },

  list: {
    flex: 1,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 100,
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  cardImage: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  colorBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  itemEmoji: {
    fontSize: 36,
  },

  cardBody: {
    padding: 10,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1E293B",
  },

  cardSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  emptyContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 60,
  },

  emptyEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },

  emptyText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 5,
  },

  fabButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#7FA8D0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#7FA8D0",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  fabIcon: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "300",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
    textAlign: "center",
  },

  modalImage: {
    height: 140,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  modalEmoji: {
    fontSize: 60,
  },

  modalSub: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: 15,
  },

  modalActions: {
    gap: 10,
  },

  saveBtn: {
    backgroundColor: "#7FA8D0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  deleteBtn: {
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteText: {
    color: "#EF4444",
    fontWeight: "bold",
  },

  closeBtn: {
    padding: 10,
    alignItems: "center",
  },

  closeText: {
    color: "#64748B",
  },

  inputForm: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: "#1E293B",
  },

  selectLabel: {
    marginTop: 10,
    fontSize: 12,
    color: "#5C738B",
  },

  categoryPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginVertical: 10,
  },

  miniChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: "#F0F5FA",
  },

  miniChipText: {
    fontSize: 11,
    color: "#4A729D",
  },
});

export default styles;
