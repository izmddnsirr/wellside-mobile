import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center p-6">
      <Text className="text-2xl font-semibold">
        Welcome to Wellside Barbershop
      </Text>
      <Text className="mt-2 text-base opacity-60">
        Book your haircut with ease.
      </Text>
    </SafeAreaView>
  );
}
