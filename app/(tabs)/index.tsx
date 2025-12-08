import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-4xl mt-1 font-semibold">
              Hello, Izamuddin
            </Text>
            <Text className="text-gray-500 text-lg">
              Ready for a fresh cut today?
            </Text>
          </View>
        </View>

        {/* Card */}
        <View className="bg-black border mx-5 mt-7 rounded-3xl p-5">
          <Text className="text-neutral-400 text-sm tracking-tighter">
            T O D A Y
          </Text>
          <Text className="text-white text-3xl font-semibold mt-3">
            Style without waiting.
          </Text>
          <Text className="text-neutral-400 mt-3 text-lg">
            Book your appointment now and skip the queue
          </Text>
          <TouchableOpacity className="mt-6 bg-white py-3 px-8 rounded-full self-start border border-gray-400">
            <Text className="font-semibold text-slate-900">Book Now</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming */}
        <Text className="text-xl font-semibold mx-5 mt-7">Upcoming</Text>
        <View className="mt-3 p-5 mx-5 border rounded-2xl border-gray-300 bg-gray-50 ">
          <Text className="text-neutral-500 text-sm tracking-tighter">
            A P P O I N T M E N T
          </Text>
          <Text className="mt-1 text-xl font-semibold">Friday, 3:30 PM</Text>
          <Text className="mt-1">Fade + Beard with Arif</Text>
          <View className="h-px bg-gray-300 my-4" />
          <View className="flex-row justify-between">
            <Text className="text-neutral-600">Notes: Keep neckline low</Text>
            <Text className="font-semibold">RM35</Text>
          </View>
        </View>

        {/*  */}
        <Text className="text-xl font-semibold mx-5 mt-7">Services</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
