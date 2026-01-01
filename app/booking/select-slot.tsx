import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BARBERS, SLOT_OPTIONS } from "../../utils/booking-data";

export default function SelectSlotScreen() {
  const router = useRouter();
  const { barberId, barberName, dateId, dateLabel, dateDetail } =
    useLocalSearchParams<{
      barberId?: string;
      barberName?: string;
      dateId?: string;
      dateLabel?: string;
      dateDetail?: string;
    }>();
  const [selectedSlotId, setSelectedSlotId] = useState(
    SLOT_OPTIONS[0]?.id ?? ""
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

  const selectedSlot = SLOT_OPTIONS.find((slot) => slot.id === selectedSlotId);

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">Select slot</Text>
            <Text className="text-gray-500 text-lg">Step 3 of 5</Text>
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
          <Text className="text-gray-500 mt-1">
            {dateLabel ?? "Selected date"} {dateDetail ? `- ${dateDetail}` : ""}
          </Text>
        </View>

        <View className="mx-5 mt-6">
          {SLOT_OPTIONS.map((slot) => {
            const isSelected = slot.id === selectedSlotId;
            return (
              <TouchableOpacity
                key={slot.id}
                onPress={() => setSelectedSlotId(slot.id)}
                className={`mb-4 rounded-2xl border p-5 ${
                  isSelected ? "border-black bg-white" : "border-gray-300 bg-white"
                }`}
              >
                <View className="flex-row justify-between">
                  <Text className="text-lg font-semibold">{slot.time}</Text>
                  <Text className="text-gray-500">{slot.chair}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/booking/summary",
              params: {
                barberId: selectedBarber?.id ?? "",
                barberName: selectedBarber?.name ?? "",
                dateId: dateId ?? "",
                dateLabel: dateLabel ?? "",
                dateDetail: dateDetail ?? "",
                slotId: selectedSlot?.id ?? "",
                slotTime: selectedSlot?.time ?? "",
                slotChair: selectedSlot?.chair ?? "",
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
