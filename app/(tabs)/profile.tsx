import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 items-center p-6 mt-12">
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        className="w-32 h-32 rounded-full shadow-md"
      />

      <Text className="text-xl font-semibold mt-4">User Name</Text>
      <Text className="mt-1 opacity-60 text-base">user@email.com</Text>
    </SafeAreaView>
  );
}
