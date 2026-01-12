import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-slate-50 px-5"
      style={{ paddingTop: insets.top }}
    >
      {/* Hero */}
      <View className="mt-3">
        <Text className="text-3xl mt-1 font-semibold text-slate-900">
          Fresh cuts,
        </Text>
        <Text className="text-3xl font-semibold text-slate-900">
          zero waiting.
        </Text>
        <Text className="text-slate-600 text-base mt-1">
          Book your chair, track your style, and keep your grooming on point.
        </Text>
      </View>

      {/* Highlight (hidden for now) */}

      {/* Actions */}
      <View className="w-full mt-auto pb-6">
        <Pressable
          onPress={() => router.push("/(auth)/login")}
          className="bg-slate-900 rounded-full py-5 active:opacity-80" // mb-4
        >
          <Text className="text-center text-white font-semibold text-lg">
            Continue with Email
          </Text>
        </Pressable>

        {/* <Pressable className="bg-white rounded-full py-5 border border-slate-200 active:opacity-80">
          <View className="flex-row items-center justify-center">
            <View className="mr-3 flex-row items-center">
              <View className="h-2 w-2 rounded-full bg-blue-600" />
              <View className="h-2 w-2 rounded-full bg-red-500 ml-1" />
              <View className="h-2 w-2 rounded-full bg-yellow-500 ml-1" />
              <View className="h-2 w-2 rounded-full bg-green-500 ml-1" />
            </View>
            <Text className="text-center text-slate-900 font-semibold text-lg">
              Continue with Google
            </Text>
          </View>
        </Pressable> */}

        <Text className="text-center text-xs text-slate-600 mt-5">
          By continuing, you agree to our Terms & Privacy Policy.
        </Text>
      </View>
    </View>
  );
}
