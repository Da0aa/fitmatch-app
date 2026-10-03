import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#87CEEB' }}>
      {/* Layar 1: Beranda (index.tsx) */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Beranda',
        }} 
      />
      
      {/* Layar 2: Pakaian (wardrobe.tsx) */}
      <Tabs.Screen 
        name="wardrobe" 
        options={{ 
          title: 'Lemari',
        }} 
      />

      {/* Layar 3: Rekomendasi Outfit (match.tsx) */}
      <Tabs.Screen 
        name="match" 
        options={{ 
          title: 'FITMATCH',
        }} 
      />
    </Tabs>
  );
}