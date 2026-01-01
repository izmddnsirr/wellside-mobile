import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BARBERS } from "../../utils/booking-data";

export default function SelectBarberScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(BARBERS[0]?.id ?? "");
  const selectedBarber = BARBERS.find((barber) => barber.id === selectedId);

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">Select barber</Text>
            <Text className="text-gray-500 text-lg">Step 1 of 5</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="border px-6 py-3 rounded-full bg-white border-gray-300"
          >
            <Text className="font-semibold">Back</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-5 mt-6">
          {BARBERS.map((barber) => {
            const isSelected = barber.id === selectedId;
            return (
              <TouchableOpacity
                key={barber.id}
                onPress={() => setSelectedId(barber.id)}
                className={`mb-4 rounded-2xl border p-5 ${
                  isSelected ? "border-black bg-white" : "border-gray-300 bg-white"
                }`}
              >
                <View className="flex-row justify-between">
                  <Text className="text-lg font-semibold">{barber.name}</Text>
                  <Text className="text-gray-600">Rating {barber.rating}</Text>
                </View>
                <Text className="text-gray-500 mt-2">{barber.specialty}</Text>
                <Text className="text-gray-500 mt-1">{barber.chair}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/booking/select-date",
              params: {
                barberId: selectedBarber?.id ?? "",
                barberName: selectedBarber?.name ?? "",
              },
            })
          }
          className="mx-5 mt-2 mb-10 bg-black rounded-full py-4 active:opacity-80"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
