import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#EBF3FA" },
          headerTintColor: "#2C3E50",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "FITMATCH Home",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="match"
          options={{
            title: "Find Your Fit ✨",
          }}
        />
        <Stack.Screen
          name="explore"
          options={{
            title: "Explore Outfits",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
