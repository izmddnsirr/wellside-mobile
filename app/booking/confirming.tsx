import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  Animated,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBooking } from "../../context/BookingContext";
import { supabase } from "../../utils/supabase";

const GRACE_PERIOD_MS = 10000;
const TIME_ZONE = "Asia/Kuala_Lumpur";
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

type Phase =
  | "counting"
  | "confirming"
  | "cancelled"
  | "confirmed"
  | "error";

export default function ConfirmingBookingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { startedAt: startedAtParam } = useLocalSearchParams<{
    startedAt?: string;
  }>();
  const { selectedService, selectedBarber, selectedSlot, selectedDate } =
    useBooking();
  const [phase, setPhase] = useState<Phase>("counting");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());
  const finalizeRequestedRef = useRef(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const startedAt = useMemo(() => {
    const parsed = Number(startedAtParam);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
    return Date.now();
  }, [startedAtParam]);

  const elapsed = Math.max(0, now - startedAt);
  const remaining = Math.max(0, GRACE_PERIOD_MS - elapsed);
  const secondsLeft = Math.ceil(remaining / 1000);

  const syncProgressAnimation = useCallback(() => {
    const elapsedNow = Math.max(0, Date.now() - startedAt);
    const remainingNow = Math.max(0, GRACE_PERIOD_MS - elapsedNow);
    const progressNow = Math.min(1, elapsedNow / GRACE_PERIOD_MS);
    progressAnim.setValue(progressNow);
    const animation = Animated.timing(progressAnim, {
      toValue: 1,
      duration: remainingNow,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [progressAnim, startedAt]);

  useEffect(() => {
    if (phase !== "counting") {
      return;
    }
    return syncProgressAnimation();
  }, [phase, startedAt, syncProgressAnimation]);

  useEffect(() => {
    if (phase !== "counting") {
      return;
    }
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 250);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setNow(Date.now());
        if (phase === "counting") {
          syncProgressAnimation();
        }
      }
    });
    return () => subscription.remove();
  }, [phase, startedAt, syncProgressAnimation]);

  useEffect(() => {
    if (phase !== "counting") {
      return;
    }
    if (elapsed >= GRACE_PERIOD_MS) {
      void finalizeBooking();
    }
  }, [elapsed, phase, finalizeBooking]);

  useEffect(() => {
    if (!selectedService || !selectedBarber || !selectedSlot) {
      setPhase("error");
      setErrorMessage("Booking details are missing. Please review again.");
    }
  }, [selectedService, selectedBarber, selectedSlot]);

  const sendBookingEmail = useCallback(
    async ({
      bookingId,
      bookingRef,
      customerId,
      customerEmail,
    }: {
      bookingId: string;
      bookingRef: string | null;
      customerId: string;
      customerEmail: string | null;
    }) => {
      if (
        !selectedService ||
        !selectedBarber ||
        !selectedSlot ||
        !selectedDate
      ) {
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("first_name,last_name,email,phone")
        .eq("id", customerId)
        .maybeSingle();

      const firstName = profileData?.first_name?.trim();
      const lastName = profileData?.last_name?.trim();
      const customerName =
        [firstName, lastName].filter(Boolean).join(" ").trim() || "there";
      const email =
        profileData?.email?.trim() || customerEmail?.trim() || "";
      const customerPhone = profileData?.phone?.trim() || null;

      if (!email) {
        return;
      }

      const startAt = new Date(selectedSlot.startAt);
      const bookingDate = dateFormatter.format(startAt);
      const bookingTime = timeFormatter.format(startAt);
      const totalPrice = `MYR ${selectedService.basePrice ?? 0}`;

      const localBase = process.env.EXPO_PUBLIC_BASE_URL_LOCAL ?? "";
      const hostedBase = process.env.EXPO_PUBLIC_BASE_URL ?? "";
      const apiBase =
        Platform.OS === "web"
          ? ""
          : __DEV__ && localBase
          ? localBase
          : hostedBase;
      if (!apiBase && Platform.OS !== "web") {
        console.warn("Booking email skipped: EXPO_PUBLIC_BASE_URL missing.");
        return;
      }

      const payload = {
        email,
        customerName,
        bookingId,
        bookingRef: bookingRef ?? undefined,
        services: selectedService.name,
        barberName: selectedBarber.displayName,
        bookingDate,
        bookingTime,
        totalPrice,
        status: "Confirmed",
        customerPhone,
        event: "confirmation" as const,
      };

      try {
        await Promise.all([
          fetch(`${apiBase}/api/booking-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...payload,
              audience: "customer",
            }),
          }),
          fetch(`${apiBase}/api/booking-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...payload,
              audience: "admin",
            }),
          }),
        ]);
      } catch (emailError) {
        console.warn("Booking email request failed:", emailError);
      }
    },
    [selectedBarber, selectedDate, selectedService, selectedSlot]
  );

  const finalizeBooking = useCallback(async () => {
    if (finalizeRequestedRef.current || phase !== "counting") {
      return;
    }
    finalizeRequestedRef.current = true;
    setPhase("confirming");
    setErrorMessage(null);

    if (!selectedService || !selectedBarber || !selectedSlot) {
      setPhase("error");
      setErrorMessage("Booking details are missing. Please review again.");
      finalizeRequestedRef.current = false;
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      setPhase("error");
      setErrorMessage("Please sign in again to confirm your booking.");
      finalizeRequestedRef.current = false;
      return;
    }

    const { data: existingBooking, error: existingError } = await supabase
      .from("bookings")
      .select("id")
      .eq("customer_id", authData.user.id)
      .in("status", ["scheduled", "in_progress"])
      .limit(1)
      .maybeSingle();

    if (existingError) {
      console.error("Booking check failed:", existingError);
      setPhase("error");
      setErrorMessage("Unable to confirm booking right now.");
      finalizeRequestedRef.current = false;
      return;
    }

    if (existingBooking) {
      setPhase("error");
      setErrorMessage("You already have an active booking.");
      finalizeRequestedRef.current = false;
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        customer_id: authData.user.id,
        barber_id: selectedBarber.id,
        service_id: selectedService.id,
        start_at: selectedSlot.startAt,
        end_at: selectedSlot.endAt,
        status: "scheduled",
      })
      .select("id,booking_ref")
      .single();

    if (error || !data) {
      console.error("Booking confirm failed:", error);
      setPhase("error");
      setErrorMessage(error?.message ?? "Unable to confirm booking right now.");
      finalizeRequestedRef.current = false;
      return;
    }

    void sendBookingEmail({
      bookingId: data.id,
      bookingRef: data.booking_ref ?? null,
      customerId: authData.user.id,
      customerEmail: authData.user.email ?? null,
    });

    setPhase("confirmed");
    router.replace({
      pathname: "/booking/success",
      params: {
        bookingId: data.id,
        bookingCode: data.booking_ref ?? "",
      },
    });
  }, [
    phase,
    router,
    selectedBarber,
    selectedService,
    selectedSlot,
    sendBookingEmail,
  ]);

  const handleCancel = () => {
    if (phase !== "counting") {
      return;
    }
    setPhase("cancelled");
    router.back();
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 pt-3">
        <Pressable
          onPress={handleCancel}
          className="h-10 w-10 items-center justify-center"
          hitSlop={10}
        >
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </Pressable>
        <Pressable
          onPress={() => {
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
          Confirming booking
        </Text>
        <Text className="mt-2 text-base text-slate-600">
          Confirming your booking… You have 10 seconds to cancel.
        </Text>
      </View>

      <View className="mt-6 px-5">
        <View className="rounded-3xl border border-slate-200 bg-white p-5">
          <View className="h-3 overflow-hidden rounded-full bg-slate-200">
            <Animated.View
              className="h-3 rounded-full bg-slate-900"
              style={{
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              }}
            />
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-sm text-slate-500">Time remaining</Text>
            <Text className="text-sm font-semibold text-slate-900">
              {secondsLeft}s
            </Text>
          </View>

          {phase === "confirming" ? (
            <View className="mt-5 flex-row items-center">
              <ActivityIndicator color="#0f172a" />
              <Text className="ml-3 text-sm text-slate-600">
                Finalizing your booking…
              </Text>
            </View>
          ) : null}

          {errorMessage ? (
            <Text className="mt-4 text-sm text-red-500">{errorMessage}</Text>
          ) : null}

          <Pressable
            onPress={handleCancel}
            disabled={phase !== "counting"}
            className={`mt-5 border border-red-200 bg-red-50 px-4 py-3 rounded-3xl ${
              phase !== "counting" ? "opacity-60" : ""
            }`}
          >
            <Text className="text-center text-red-600 font-semibold">
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
