import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

import { AuthProvider, useAuth } from "../context/AuthContext";
import { WardrobeProvider } from "../context/WardrobeContext";

function TabNavigator() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const currentRoute = segments[0];

    if (!user && currentRoute !== "auth") {
      router.replace("/auth");
    } else if (user && currentRoute === "auth") {
      router.replace("/");
    }
  }, [user, isLoading, segments, router]);

  if (isLoading) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6D9BC3",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 68,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="wardrobe"
        options={{
          title: "Wardrobe",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shirt-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="match"
        options={{
          title: "Match",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="sparkles-outline"
              size={size}
              color={String(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="auth"
        options={{
          tabBarItemStyle: {
            display: "none",
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <AuthProvider>
      <WardrobeProvider>
        <TabNavigator />
      </WardrobeProvider>
    </AuthProvider>
  );
}
