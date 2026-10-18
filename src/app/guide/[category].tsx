import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function CategoryGuide() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();

  const descriptions: Record<string, string> = {
    casual: "Gaya nyaman untuk kegiatan sehari-hari.",
    formal: "Gaya rapi yang cocok untuk acara resmi.",
    streetwear: "Gaya santai yang lebih ekspresif.",
    classic: "Gaya sederhana yang tetap terlihat elegan.",
  };

  const selectedCategory = category?.toLowerCase() ?? "";
  const description =
    descriptions[selectedCategory] ?? "Belum ada tips untuk kategori ini.";

  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Pressable onPress={() => router.back()}>
        <Text style={{ color: "#6D9BC3", fontWeight: "600" }}>← Kembali</Text>
      </Pressable>

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {category ?? "Style Guide"}
      </Text>

      <Text style={{ fontSize: 16 }}>{description}</Text>
    </View>
  );
}
