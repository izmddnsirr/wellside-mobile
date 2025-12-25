import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-100 px-5">
      {/* Header */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold text-center mb-2">
          Welcome to Wellside
        </Text>

        <Text className="text-base text-gray-500 text-center">
          The easiest way to manage your seating and wellness experience.
        </Text>
      </View>

      {/* Actions */}
      <View className="w-full px-4">
        <Pressable
          onPress={() => router.push("/(auth)/login")}
          className="bg-black rounded-full py-5 mb-4 active:opacity-80"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Login with Email
          </Text>
        </Pressable>

        <Pressable className="bg-gray-100 rounded-full py-5 border border-gray-300 active:opacity-80">
          <Text className="text-center text-black font-semibold text-lg">
            Login with Google
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
