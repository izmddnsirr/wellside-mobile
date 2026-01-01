import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../utils/supabase";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
};

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProfile = useCallback(async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      Alert.alert(
        "Unable to load profile",
        authError?.message ?? "Please sign in again."
      );
      setProfile(null);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("first_name,last_name,email,phone")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError) {
      Alert.alert("Unable to load profile", profileError.message);
      return;
    }

    setProfile({
      id: authData.user.id,
      first_name: profileData?.first_name ?? null,
      last_name: profileData?.last_name ?? null,
      email: profileData?.email ?? authData.user.email ?? null,
      phone: profileData?.phone ?? null,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const load = async () => {
        setIsLoading(true);
        await fetchProfile();
        if (isMounted) {
          setIsLoading(false);
        }
      };

      load();

      return () => {
        isMounted = false;
      };
    }, [fetchProfile])
  );

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchProfile();
    setIsRefreshing(false);
  }, [fetchProfile]);

  const onLogout = async () => {
    Alert.alert("Log out?", "You can sign in again anytime.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            Alert.alert("Logout failed", error.message);
            return;
          }
          router.replace("/(auth)/start");
        },
      },
    ]);
  };

  const fullName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ");
  const initials = `${profile?.first_name?.[0] ?? ""}${
    profile?.last_name?.[0] ?? ""
  }`.toUpperCase();

  return (
    <View className="flex-1 bg-slate-100" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {/* Greeting Section */}
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">Profile</Text>
            <Text className="text-gray-500 text-lg">
              Customized your profile
            </Text>
          </View>
          <TouchableOpacity
            onPress={onLogout}
            className="border px-6 py-3 rounded-full bg-white border-gray-300"
          >
            <Text className="font-semibold">Log out</Text>
          </TouchableOpacity>
        </View>

        {/* Card */}
        <View className="bg-slate-950 mx-5 mt-7 rounded-3xl p-5 flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-gray-300 mr-5 overflow-hidden justify-center items-center">
            {/* Replace the source URI with user profile image path if available */}
            {isLoading ? (
              <ActivityIndicator size="small" color="#111827" />
            ) : (
              <Text className="text-2xl text-black font-semibold text-center">
                {initials || "?"}
              </Text>
            )}
            {/* Example for Image: */}
            {/* <Image source={{ uri: "https://example.com/profile.jpg" }} className="w-16 h-16 rounded-full" /> */}
          </View>
          <View style={{ flex: 1 }}>
            <Text className="text-white font-semibold text-xl">
              {isLoading ? "Loading..." : fullName || "Your Profile"}
            </Text>
            <Text className="text-gray-300 text-base mt-1">
              {isLoading ? "Fetching details" : profile?.email || "—"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile-edit")}
            className="bg-white px-4 py-2 rounded-full active:opacity-80"
          >
            <Text className="font-semibold text-black">Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <Text className="text-xl font-semibold mx-5 mt-7">Preferences</Text>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-5">
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Preferred barber</Text>
            <Text className="font-semibold">Arif</Text>
          </View>
          <View className="h-px bg-gray-200 my-4" />
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Style</Text>
            <Text className="font-semibold">Skin fade</Text>
          </View>
          <View className="h-px bg-gray-200 my-4" />
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Allergies</Text>
            <Text className="font-semibold">None</Text>
          </View>
        </View>

        {/* Billing */}
        <Text className="text-xl font-semibold mx-5 mt-7">Billing</Text>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-5">
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Primary</Text>
            <Text className="font-semibold">Visa ···· 1872</Text>
          </View>
          <View className="h-px bg-gray-200 my-4" />
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Next payment</Text>
            <Text className="font-semibold">RM35 · Fri</Text>
          </View>
        </View>

        {/* Support */}
        <Text className="text-xl font-semibold mx-5 mt-7">Support</Text>
        <View className="mx-5 mt-3 rounded-2xl border border-gray-300 bg-white p-5">
          <Text className="text-gray-700">Help center</Text>
          <View className="h-px bg-gray-200 my-4" />
          <Text className="text-gray-700">Terms & privacy</Text>
        </View>

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
