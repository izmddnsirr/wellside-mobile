import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBooking } from "../../context/BookingContext";

const TIME_ZONE = "Asia/Kuala_Lumpur";
const dateLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "long",
  month: "short",
  day: "numeric",
});
const timeLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

function formatTimeLabel(value?: string) {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return timeLabelFormatter.format(parsed);
}

function formatTimeRange(startAt?: string, endAt?: string) {
  const startLabel = formatTimeLabel(startAt);
  const endLabel = formatTimeLabel(endAt);
  if (startLabel && endLabel) {
    return `${startLabel} - ${endLabel}`;
  }
  if (startLabel) {
    return startLabel;
  }
  if (endLabel) {
    return endLabel;
  }
  return null;
}

export default function BookingSuccessScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bookingCode } = useLocalSearchParams<{
    bookingCode?: string;
  }>();
  const { selectedService, selectedBarber, selectedDate, selectedSlot, resetBooking } =
    useBooking();

  const dateLabel = selectedDate?.date
    ? dateLabelFormatter.format(selectedDate.date)
    : "Date not available";
  const slotLabel =
    selectedSlot?.label ??
    formatTimeRange(selectedSlot?.startAt, selectedSlot?.endAt) ??
    "Time not available";
  const barberName = selectedBarber?.displayName ?? "Professional";

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View className="flex-row items-center justify-between px-5 pt-3">
          <View className="h-10 w-10" />
          <Pressable
            onPress={() => {
              resetBooking();
              router.dismissAll();
              router.replace("/(tabs)/booking");
            }}
            className="h-10 w-10 items-center justify-center"
            hitSlop={10}
          >
            <Ionicons name="close" size={24} color="#0f172a" />
          </Pressable>
        </View>

        <View className="px-5 pt-2">
          <Text className="text-3xl font-semibold text-slate-900">
            Booking confirmed
          </Text>
          <Text className="mt-2 text-base text-slate-600">
            We’ve locked in your slot. See you soon.
          </Text>
        </View>

        <View className="mt-6 px-5">
          <View className="rounded-3xl border border-slate-200 bg-white p-4">
            <Text className="text-xs font-semibold text-slate-600 tracking-[0.2em]">
              Appointment
            </Text>
            <View className="mt-3 flex-row items-center">
              <Ionicons name="calendar-outline" size={18} color="#0f172a" />
              <Text className="ml-3 text-base font-semibold text-slate-900">
                {dateLabel}
              </Text>
            </View>
            <View className="mt-3 flex-row items-center">
              <Ionicons name="time-outline" size={18} color="#0f172a" />
              <Text className="ml-3 text-base font-semibold text-slate-900">
                {slotLabel}
              </Text>
            </View>
            <View className="mt-3 flex-row items-center">
              <Ionicons name="person-outline" size={18} color="#0f172a" />
              <Text className="ml-3 text-base font-semibold text-slate-900">
                {barberName}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-4 px-5">
          <View className="rounded-3xl border border-slate-200 bg-white p-4">
            <Text className="text-xs font-semibold text-slate-600 tracking-[0.2em]">
              Service
            </Text>
            <View className="mt-3">
              <Text className="text-base font-semibold text-slate-900">
                {selectedService?.name ?? "Service"}
              </Text>
              <Text className="mt-1 text-sm text-slate-600">
                {selectedService?.durationMinutes
                  ? `${selectedService.durationMinutes} min`
                  : "Duration unavailable"}
              </Text>
            </View>
          </View>
        </View>

        {bookingCode ? (
          <View className="mt-4 px-5">
            <View className="rounded-3xl border border-slate-200 bg-white p-4">
              <Text className="text-xs font-semibold text-slate-600 tracking-[0.2em]">
                Booking code
              </Text>
              <Text className="mt-2 text-lg font-semibold text-slate-900">
                {bookingCode}
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-5 py-4"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Pressable
          onPress={() => {
            resetBooking();
            router.dismissAll();
            router.replace("/(tabs)/booking");
          }}
          className="rounded-full bg-slate-900 px-6 py-3"
        >
          <Text className="text-center text-base font-semibold text-white">
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
