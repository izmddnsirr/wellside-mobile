import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Buat masa ni terus pergi ke tabs
      router.replace("/(tabs)");
      // Kalau nanti nak check login:
      // kalau tak login -> router.replace("/(auth)/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Wellside Barbershop
      </Text>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
}
