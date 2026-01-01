import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../utils/supabase";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
};

export default function ProfileEditScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (!isMounted) {
        return;
      }
      if (authError || !authData.user) {
        setIsLoading(false);
        Alert.alert(
          "Unable to load profile",
          authError?.message ?? "Please sign in again."
        );
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("first_name,last_name,phone")
        .eq("id", authData.user.id)
        .maybeSingle();

      if (!isMounted) {
        return;
      }
      if (profileError) {
        setIsLoading(false);
        Alert.alert("Unable to load profile", profileError.message);
        return;
      }

      setProfile({
        id: authData.user.id,
        first_name: profileData?.first_name ?? null,
        last_name: profileData?.last_name ?? null,
        phone: profileData?.phone ?? null,
      });
      setFirstName(profileData?.first_name ?? "");
      setLastName(profileData?.last_name ?? "");
      setPhone(profileData?.phone ?? "");
      setIsLoading(false);
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const onSave = async () => {
    if (!profile) {
      return;
    }
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedFirst || !trimmedLast) {
      Alert.alert("Check your details", "First and last name are required.");
      return;
    }
    if (trimmedPhone && trimmedPhone.length < 8) {
      Alert.alert("Check your details", "Please enter a valid phone number.");
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: trimmedFirst,
        last_name: trimmedLast,
        phone: trimmedPhone || null,
      })
      .eq("id", profile.id);

    if (error) {
      setIsSaving(false);
      Alert.alert("Update failed", error.message);
      return;
    }

    setIsSaving(false);
    router.back();
  };

  const onDelete = async () => {
    if (!profile) {
      return;
    }
    Alert.alert(
      "Delete profile?",
      "This removes your profile record. Your auth account remains.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("profiles")
              .delete()
              .eq("id", profile.id);

            if (error) {
              Alert.alert("Delete failed", error.message);
              return;
            }

            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-5 mt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-600">W E L L S I D E + </Text>
            <Text className="text-3xl mt-1 font-semibold">Edit profile</Text>
            <Text className="text-gray-500 text-lg">
              Update your details
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="border px-6 py-3 rounded-full bg-white border-gray-300"
          >
            <Text className="font-semibold">Back</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View className="mt-10 items-center">
            <ActivityIndicator size="small" color="#111827" />
          </View>
        ) : (
          <View className="mx-5 mt-6 rounded-3xl border border-gray-300 bg-white p-5">
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              FIRST NAME
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your first name"
              autoCapitalize="words"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              LAST NAME
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your last name"
              autoCapitalize="words"
              value={lastName}
              onChangeText={setLastName}
            />

            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              PHONE NUMBER
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              autoCapitalize="none"
              value={phone}
              onChangeText={setPhone}
            />

            <TouchableOpacity
              onPress={onSave}
              disabled={isSaving}
              className={`bg-black p-4 rounded-full active:opacity-80 ${
                isSaving ? "opacity-60" : ""
              }`}
            >
              <Text className="text-center text-white font-semibold text-lg">
                {isSaving ? "Saving..." : "Save changes"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDelete}
              className="mt-4 border border-red-300 bg-red-50 p-4 rounded-full active:opacity-80"
            >
              <Text className="text-center text-red-600 font-semibold text-lg">
                Delete profile
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
