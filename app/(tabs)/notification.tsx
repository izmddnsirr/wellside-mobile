import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotificationScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-100" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">Notification</Text>
            <Text className="text-gray-500 text-lg">Anything for you</Text>
          </View>
        </View>

        <Text className="text-xl font-semibold mx-5 mt-7">Today</Text>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-5">
          <Text className="text-sm text-gray-500">2:45 PM</Text>
          <Text className="text-lg font-semibold mt-2">
            Appointment confirmed
          </Text>
          <Text className="text-gray-600 mt-2">
            Your booking with Arif is set for Friday at 3:30 PM.
          </Text>
        </View>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-5">
          <Text className="text-sm text-gray-500">11:10 AM</Text>
          <Text className="text-lg font-semibold mt-2">
            New styles available
          </Text>
          <Text className="text-gray-600 mt-2">
            Check out the latest fades and textures curated for you.
          </Text>
        </View>

        <Text className="text-xl font-semibold mx-5 mt-7">Earlier</Text>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-5">
          <Text className="text-sm text-gray-500">Yesterday</Text>
          <Text className="text-lg font-semibold mt-2">
            Loyalty points updated
          </Text>
          <Text className="text-gray-600 mt-2">
            You earned 30 points from your last visit.
          </Text>
        </View>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-5">
          <Text className="text-sm text-gray-500">Mon</Text>
          <Text className="text-lg font-semibold mt-2">
            Reminder: care routine
          </Text>
          <Text className="text-gray-600 mt-2">
            Apply matte clay for a clean, all-day hold.
          </Text>
        </View>

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
