import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F5",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 50,
  },

  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#C97B63",
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2D2525",
  },

  subtitle: {
    fontSize: 15,
    color: "#777777",
    marginTop: 8,
    marginBottom: 30,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D2525",
    marginBottom: 12,
  },

  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 25,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5D8D3",
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 17,
    marginRight: 8,
    marginBottom: 8,
  },

  selectedOption: {
    backgroundColor: "#C97B63",
    borderColor: "#C97B63",
  },

  optionText: {
    color: "#4A3D3A",
    fontSize: 14,
    fontWeight: "500",
  },

  selectedOptionText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  matchButton: {
    backgroundColor: "#2D2525",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  matchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  resultContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#EADDD8",
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D2525",
    marginBottom: 10,
  },

  resultName: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#C97B63",
    marginBottom: 8,
  },

  resultDetail: {
    fontSize: 15,
    color: "#777777",
  },

  hint: {
    textAlign: "center",
    marginTop: 20,
    color: "#999999",
    fontSize: 12,
  },
});

export default styles;