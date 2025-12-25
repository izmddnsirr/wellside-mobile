import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/start");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <StatusBar style="auto" />

      <Image
        source={require("../assets/images/wellside-logo.png")}
        style={{
          width: 240,
          height: 78,
        }}
        resizeMode="contain"
      />

      {/* Loader at the bottom */}
      <View className="absolute bottom-20 left-0 right-0 items-center">
        <Text className="pb-6 text-neutral-500">Preparing your chair</Text>
        <ActivityIndicator className="" size="small" color="#000000" />
      </View>
    </View>
  );
}
