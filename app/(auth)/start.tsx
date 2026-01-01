import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-slate-100 px-6"
      style={{ paddingTop: insets.top }}
    >
      <View className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-slate-200 opacity-70" />
      <View className="absolute top-40 -left-16 h-40 w-40 rounded-full bg-slate-300 opacity-40" />

      {/* Brand */}
      <View className="mt-6">
        <Text className="text-xs tracking-[0.5em] text-gray-500">
          W E L L S I D E +
        </Text>
      </View>

      {/* Hero */}
      <View className="mt-6">
        <Text className="text-5xl font-semibold leading-tight">
          Fresh cuts,
        </Text>
        <Text className="text-5xl font-semibold leading-tight">
          zero waiting.
        </Text>
        <Text className="text-base text-gray-500 mt-3">
          Book your chair, track your style, and keep your grooming on point.
        </Text>
      </View>

      {/* Highlight (hidden for now) */}

      {/* Actions */}
      <View className="w-full mt-auto pb-6">
        <Pressable
          onPress={() => router.push("/(auth)/login")}
          className="bg-black rounded-full py-5 mb-4 active:opacity-80"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Continue with Email
          </Text>
        </Pressable>

        <Pressable className="bg-white rounded-full py-5 border border-gray-300 active:opacity-80">
          <View className="flex-row items-center justify-center">
            <View className="mr-3 flex-row items-center">
              <View className="h-2 w-2 rounded-full bg-blue-600" />
              <View className="h-2 w-2 rounded-full bg-red-500 ml-1" />
              <View className="h-2 w-2 rounded-full bg-yellow-500 ml-1" />
              <View className="h-2 w-2 rounded-full bg-green-500 ml-1" />
            </View>
            <Text className="text-center text-black font-semibold text-lg">
              Continue with Google
            </Text>
          </View>
        </Pressable>

        <Text className="text-center text-xs text-gray-400 mt-5">
          By continuing, you agree to our Terms & Privacy Policy.
        </Text>
      </View>
    </View>
  );
}
