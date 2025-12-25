import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { OnboardingProvider } from "../context/OnboardingContext";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              animation: "fade",
            }}
          />
        </Stack>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}
