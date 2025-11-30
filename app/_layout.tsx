import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
