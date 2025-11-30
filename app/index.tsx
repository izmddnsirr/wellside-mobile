import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <StatusBar style="light" />

      {/* Logo ring */}
      <View className="w-20 h-20 rounded-full border border-neutral-700 items-center justify-center mb-6">
        <Text className="text-2xl font-semibold text-white">WS</Text>
      </View>

      {/* Brand name */}
      <Text className="text-3xl font-extrabold tracking-[0.3em] text-white">
        WELLSIDE
      </Text>

      {/* Tagline */}
      <Text className="mt-2 text-sm text-neutral-300">
        Barbershop & Grooming Studio
      </Text>

      {/* Loader */}
      <View className="mt-10">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
}
