import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AIScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mx-5 mt-3">
          <Text className="text-3xl mt-1 font-semibold text-slate-900">
            AI Style Studio
          </Text>
          <Text className="text-slate-600 text-base mt-1">
            Upload a photo for tailored cut suggestions.
          </Text>
        </View>

        {/* Upload */}
        <View className="mx-5 mt-6 rounded-3xl border border-slate-200 bg-white p-5">
          <Text className="text-xs font-semibold tracking-[0.2em] text-slate-600">
            Upload Photo
          </Text>
          <View className="mt-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-10 items-center">
            <View className="h-12 w-12 rounded-full bg-slate-900 items-center justify-center">
              <Ionicons name="cloud-upload-outline" size={22} color="#ffffff" />
            </View>
            <Text className="mt-3 text-base font-semibold text-slate-900">
              Tap to add a photo
            </Text>
            <Text className="mt-1 text-sm text-slate-600 text-center">
              Front or side profile works best.
            </Text>
            <TouchableOpacity className="mt-4 rounded-full bg-slate-900 px-5 py-2.5">
              <Text className="text-white font-semibold">Upload image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggestions */}
        {/* <View className="mx-5 mt-6 rounded-3xl border border-slate-200 bg-white p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold tracking-[0.2em] text-slate-600">
              AI Suggestion
            </Text>
            <View className="rounded-full bg-emerald-100 px-3 py-1">
              <Text className="text-xs font-semibold text-emerald-700">
                READY
              </Text>
            </View>
          </View>
          <Text className="text-lg font-semibold mt-3 text-slate-900">
            Soft taper + textured top
          </Text>
          <Text className="text-slate-600 mt-2">
            Your hair pattern suits a soft taper with light texture. Ask for
            3-4cm on top and a matte finish for easy styling.
          </Text>
        </View> */}

        {/* Notes */}
        {/* <View className="mx-5 mt-6 rounded-3xl border border-slate-200 bg-white p-4">
          <Text className="text-xs font-semibold tracking-[0.2em] text-slate-600">
            ADD NOTES
          </Text>
          <TextInput
            className="mt-3 text-base text-slate-900"
            placeholder="Describe your hair goals..."
            multiline
          />
          <TouchableOpacity className="mt-4 bg-slate-900 rounded-full py-3">
            <Text className="text-center text-white font-semibold">
              Get suggestions
            </Text>
          </TouchableOpacity>
        </View> */}

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
