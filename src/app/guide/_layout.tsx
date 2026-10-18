import { Stack } from "expo-router";

export default function GuideLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "FITMATCH Guide" }} />
      <Stack.Screen name="style" options={{ title: "Style Guide" }} />
      <Stack.Screen name="[category]" options={{ title: "Style Category" }} />
    </Stack>
  );
}
