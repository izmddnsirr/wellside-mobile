import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AIScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-100" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">AI</Text>
            <Text className="text-gray-500 text-lg">Anything for you</Text>
          </View>
        </View>

        {/* Suggestions */}
        <Text className="text-xl font-semibold mx-5 mt-7">Try asking</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
        >
          <View className="ml-5 mr-3 border border-gray-300 rounded-full bg-white px-4 py-2">
            <Text className="text-gray-700">Best cut for oval face</Text>
          </View>
          <View className="mr-3 border border-gray-300 rounded-full bg-white px-4 py-2">
            <Text className="text-gray-700">Care tips for fades</Text>
          </View>
          <View className="mr-5 border border-gray-300 rounded-full bg-white px-4 py-2">
            <Text className="text-gray-700">Suggest a new look</Text>
          </View>
        </ScrollView>

        {/* Latest */}
        <Text className="text-xl font-semibold mx-5 mt-7">Latest advice</Text>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-5">
          <Text className="text-sm text-gray-500">Today · 2:10 PM</Text>
          <Text className="text-lg font-semibold mt-2">
            Skin fade + textured top
          </Text>
          <Text className="text-gray-600 mt-2">
            Your hair pattern suits a mid skin fade with light texture. Ask for
            3–4cm on top and a matte finish.
          </Text>
        </View>

        {/* Prompt */}
        <Text className="text-xl font-semibold mx-5 mt-7">Ask the stylist</Text>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-4">
          <TextInput
            className="text-base"
            placeholder="Describe your hair goals..."
            multiline
          />
          <TouchableOpacity className="mt-4 bg-black rounded-full py-3">
            <Text className="text-center text-white font-semibold">
              Send
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
