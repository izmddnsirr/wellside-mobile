import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  return (
    <SafeAreaView className="border-black border- flex-1 p-6">
      <Text className="text-[22px] font-semibold">Notifications</Text>

      <View className="mt-4 p-4 rounded-xl bg-neutral-100">
        <Text className="text-base font-medium">
          Your booking is confirmed!
        </Text>
        <Text className="mt-1 opacity-60">Today, 3:00 PM</Text>
      </View>
    </SafeAreaView>
  );
}
