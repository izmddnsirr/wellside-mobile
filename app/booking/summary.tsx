import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SERVICE } from "../../utils/booking-data";

export default function BookingSummaryScreen() {
  const router = useRouter();
  const {
    barberName,
    dateLabel,
    dateDetail,
    slotTime,
    slotChair,
    barberId,
    dateId,
    slotId,
  } = useLocalSearchParams<{
    barberName?: string;
    dateLabel?: string;
    dateDetail?: string;
    slotTime?: string;
    slotChair?: string;
    barberId?: string;
    dateId?: string;
    slotId?: string;
  }>();

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">Booking summary</Text>
            <Text className="text-gray-500 text-lg">Step 4 of 5</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="border px-6 py-3 rounded-full bg-white border-gray-300"
          >
            <Text className="font-semibold">Back</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-5 mt-6 rounded-2xl border border-gray-300 bg-white p-5">
          <Text className="text-sm text-gray-500">Barber</Text>
          <Text className="text-lg font-semibold mt-1">
            {barberName ?? "Any barber"}
          </Text>

          <View className="h-px bg-gray-200 my-4" />

          <Text className="text-sm text-gray-500">Date</Text>
          <Text className="text-lg font-semibold mt-1">
            {dateLabel ?? "Selected date"} {dateDetail ? `- ${dateDetail}` : ""}
          </Text>

          <View className="h-px bg-gray-200 my-4" />

          <Text className="text-sm text-gray-500">Time slot</Text>
          <Text className="text-lg font-semibold mt-1">
            {slotTime ?? "Selected time"} {slotChair ? `- ${slotChair}` : ""}
          </Text>

          <View className="h-px bg-gray-200 my-4" />

          <Text className="text-sm text-gray-500">Service</Text>
          <Text className="text-lg font-semibold mt-1">{SERVICE.name}</Text>
          <Text className="text-gray-500 mt-1">
            {SERVICE.duration} - {SERVICE.price}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/booking/confirm",
              params: {
                barberName: barberName ?? "",
                dateLabel: dateLabel ?? "",
                dateDetail: dateDetail ?? "",
                slotTime: slotTime ?? "",
                slotChair: slotChair ?? "",
                barberId: barberId ?? "",
                dateId: dateId ?? "",
                slotId: slotId ?? "",
              },
            })
          }
          className="mx-5 mt-6 mb-10 bg-black rounded-full py-4 active:opacity-80"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Confirm booking
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
