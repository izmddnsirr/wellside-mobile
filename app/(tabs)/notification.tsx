import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotificationScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View className="mx-5 mt-3 flex-row justify-between items-center">
          <View>
            <Text className="text-3xl mt-1 font-semibold text-slate-900">
              Notification
            </Text>
            <Text className="text-slate-600 text-base mt-1">
              Anything for you
            </Text>
          </View>
        </View>

        <View className="mx-5 mt-6 rounded-3xl border border-dashed border-slate-200 bg-white p-6">
          <Text className="text-slate-600 text-base">
            No notifications yet.
          </Text>
        </View>
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
