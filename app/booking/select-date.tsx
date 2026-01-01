import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BARBERS, DATE_OPTIONS } from "../../utils/booking-data";

export default function SelectDateScreen() {
  const router = useRouter();
  const { barberId, barberName } = useLocalSearchParams<{
    barberId?: string;
    barberName?: string;
  }>();
  const [selectedDateId, setSelectedDateId] = useState(
    DATE_OPTIONS[0]?.id ?? ""
  );

  const selectedBarber = useMemo(() => {
    if (barberId) {
      return BARBERS.find((barber) => barber.id === barberId);
    }
    if (barberName) {
      return BARBERS.find((barber) => barber.name === barberName);
    }
    return BARBERS[0];
  }, [barberId, barberName]);

  const selectedDate = DATE_OPTIONS.find((date) => date.id === selectedDateId);

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">Select date</Text>
            <Text className="text-gray-500 text-lg">Step 2 of 5</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="border px-6 py-3 rounded-full bg-white border-gray-300"
          >
            <Text className="font-semibold">Back</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-5 mt-4 rounded-2xl border border-gray-300 bg-white p-4">
          <Text className="text-gray-500 text-sm">Selected barber</Text>
          <Text className="text-lg font-semibold mt-1">
            {selectedBarber?.name ?? "Any barber"}
          </Text>
        </View>

        <View className="mx-5 mt-6">
          {DATE_OPTIONS.map((date) => {
            const isSelected = date.id === selectedDateId;
            return (
              <TouchableOpacity
                key={date.id}
                onPress={() => setSelectedDateId(date.id)}
                className={`mb-4 rounded-2xl border p-5 ${
                  isSelected ? "border-black bg-white" : "border-gray-300 bg-white"
                }`}
              >
                <Text className="text-lg font-semibold">{date.label}</Text>
                <Text className="text-gray-500 mt-1">{date.detail}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/booking/select-slot",
              params: {
                barberId: selectedBarber?.id ?? "",
                barberName: selectedBarber?.name ?? "",
                dateId: selectedDate?.id ?? "",
                dateLabel: selectedDate?.label ?? "",
                dateDetail: selectedDate?.detail ?? "",
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
