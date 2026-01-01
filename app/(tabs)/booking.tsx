import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BookingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-100" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">Appointment</Text>
            <Text className="text-gray-500 text-lg">Choose your chair now</Text>
          </View>
        </View>

        {/* Upcoming */}
        <Text className="text-xl font-semibold mx-5 mt-7">Upcoming</Text>
        <View className="mt-3 p-5 mx-5 border rounded-2xl border-gray-300 bg-white">
          <Text className="text-neutral-500 text-sm tracking-tighter">
            F R I D A Y
          </Text>
          <Text className="mt-1 text-xl font-semibold">3:30 PM · Chair 04</Text>
          <Text className="mt-1">Fade + Beard with Arif</Text>
          <View className="h-px bg-gray-200 my-4" />
          <View className="flex-row justify-between">
            <Text className="text-neutral-600">Duration: 45 min</Text>
            <Text className="font-semibold">RM35</Text>
          </View>
        </View>

        {/* Quick Pick */}
        <Text className="text-xl font-semibold mx-5 mt-7">Quick Pick</Text>

        <TouchableOpacity
          onPress={() => router.push("/booking/select-barber")}
          className="mx-5 mt-6 mb-10 bg-black rounded-full py-4 active:opacity-80"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Book appointment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
