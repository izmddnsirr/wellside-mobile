import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../utils/supabase";
import { StatusBar } from "expo-status-bar";

type Profile = {
  first_name: string | null;
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchName = useCallback(async () => {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      setProfile(null);
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("first_name")
      .eq("id", authData.user.id)
      .maybeSingle();

    setProfile({
      first_name: profileData?.first_name ?? null,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const load = async () => {
        setIsLoading(true);
        await fetchName();
        if (isMounted) {
          setIsLoading(false);
        }
      };

      load();

      return () => {
        isMounted = false;
      };
    }, [fetchName])
  );

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchName();
    setIsRefreshing(false);
  }, [fetchName]);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />
      <View className="absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[#E6E6E6]" />
      <View className="absolute top-36 -left-24 h-72 w-72 rounded-full bg-[#F2F2F2]" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="mx-6 mt-6 flex-row items-center justify-between">
          <View>
            <Text className="text-[11px] tracking-[4px] text-[#666666]">
              WELLSIDE +
            </Text>
            <View className="flex-row items-center">
              <Text className="text-3xl mt-1 font-semibold text-black">
                Hi{profile?.first_name ? `, ${profile.first_name}` : ""}
              </Text>
              {isLoading ? (
                <ActivityIndicator className="ml-3" size="small" />
              ) : null}
            </View>
            <Text className="text-[#4D4D4D] text-base mt-1">
              Clean lines. Calm day.
            </Text>
          </View>
          <View className="h-12 w-12 rounded-full bg-black items-center justify-center">
            <Text className="text-white text-lg font-semibold">W</Text>
          </View>
        </View>

        <View className="mx-6 mt-8 rounded-[32px] bg-black p-6 overflow-hidden">
          <View className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white opacity-15" />
          <Text className="text-[#BFBFBF] text-[11px] tracking-[3px]">
            NEXT UP
          </Text>
          <Text className="mt-3 text-3xl font-semibold text-white">
            Friday
          </Text>
          <Text className="text-lg text-[#E6E6E6]">3:30 PM · Seat 2</Text>
          <TouchableOpacity className="mt-6 bg-white px-5 py-2.5 rounded-full self-start">
            <Text className="font-semibold text-black">Manage visit</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-6 mt-6 flex-row justify-between">
          <TouchableOpacity className="w-[31%] rounded-2xl bg-white border border-[#E0E0E0] p-4">
            <Text className="text-[11px] tracking-[2px] text-[#666666]">
              QUEUE
            </Text>
            <Text className="mt-2 text-lg font-semibold text-black">
              12 min
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[31%] rounded-2xl bg-white border border-[#E0E0E0] p-4">
            <Text className="text-[11px] tracking-[2px] text-[#666666]">
              POINTS
            </Text>
            <Text className="mt-2 text-lg font-semibold text-black">
              240
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[31%] rounded-2xl bg-white border border-[#E0E0E0] p-4">
            <Text className="text-[11px] tracking-[2px] text-[#666666]">
              WALK IN
            </Text>
            <Text className="mt-2 text-lg font-semibold text-black">
              2 left
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="mx-6 mt-8 text-[11px] tracking-[4px] text-[#666666]">
          GALLERY
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
        >
          <View className="mr-4 h-40 w-32 rounded-3xl bg-[#E6E6E6]" />
          <View className="mr-4 h-40 w-32 rounded-3xl bg-[#CFCFCF]" />
          <View className="mr-4 h-40 w-32 rounded-3xl bg-[#F2F2F2]" />
          <View className="h-40 w-32 rounded-3xl bg-[#BFBFBF]" />
        </ScrollView>

        <View className="mx-6 mt-8 rounded-[28px] border border-[#E0E0E0] bg-white p-5">
          <Text className="text-[11px] tracking-[3px] text-[#666666]">
            NOTE
          </Text>
          <Text className="mt-2 text-lg font-semibold text-black">
            Keep neckline low, matte finish.
          </Text>
          <Text className="mt-2 text-[#4D4D4D]">
            Saved for your next visit.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
