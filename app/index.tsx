import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar style="auto" />

      {/* Brand name */}
      <Text className="text-5xl font-extrabold tracking-tighter">
        W E L L S I D E
      </Text>

      {/* Brand name */}
      <Text className="text-xl font-bold tracking-widest text-neutral-500">
        BARBERSHOP
      </Text>

      {/* Loader at the bottom */}
      <View className="absolute bottom-20 left-0 right-0 items-center">
        <Text className="pb-6 text-neutral-500">Preparing your chair</Text>
        <ActivityIndicator className="" size="small" color="#000000" />
      </View>
    </View>
  );
}
