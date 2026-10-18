import { Text, View } from "react-native";

export default function StyleGuide() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Style Guide</Text>

      <Text>• Casual: nyaman untuk kegiatan sehari-hari.</Text>
      <Text>• Formal: cocok untuk acara resmi.</Text>
      <Text>• Streetwear: gaya santai yang lebih ekspresif.</Text>
      <Text>• Classic: gaya sederhana yang tidak lekang waktu.</Text>
    </View>
  );
}
