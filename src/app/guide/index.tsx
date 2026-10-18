import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function GuideHome() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>FITMATCH Guide</Text>

      <Text>Pelajari tips memilih outfit sesuai gaya kamu.</Text>

      <Pressable
        onPress={() => router.push("/guide/casual")}
        style={{
          backgroundColor: "#6D9BC3",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Lihat Style Guide →
        </Text>
      </Pressable>
    </View>
  );
}
