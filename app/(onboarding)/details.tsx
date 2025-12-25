import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboarding } from "../../context/OnboardingContext";

export default function DetailsScreen() {
  const router = useRouter();

  const {
    firstName,
    lastName,
    phone,
    setFirstName,
    setLastName,
    setPhone,
    reset,
  } = useOnboarding();
  const [errorMessage, setErrorMessage] = useState("");

  const onRegister = () => {
    if (!firstName.trim()) {
      setErrorMessage("First name is required.");
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage("Last name is required.");
      return;
    }
    if (phone.trim().length < 8) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    setErrorMessage("");
    reset();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-slate-100">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 8 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* Top Header */}
            <View className="flex-row justify-between mt-6 mb-6">
              <Text className="text-sm">W E L L S I D E +</Text>
              <Text className="text-sm">R E G I S T E R</Text>
            </View>

            {/* Title + Subtitle */}
            <View>
              <Text className="text-4xl font-semibold mb-2">
                Create account.
              </Text>
              <Text className="mb-6 text-gray-600">Your personal barber.</Text>
            </View>

            {/* FULL NAME */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              FIRST NAME
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your first name"
              autoCapitalize="words"
              value={firstName}
              onChangeText={(value) => setFirstName(value)}
            />

            {/* FULL NAME */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              LAST NAME
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your last name"
              autoCapitalize="words"
              value={lastName}
              onChangeText={(value) => setLastName(value)}
            />

            {/* PHONE NUMBER */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              PHONE NUMBER
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              autoCapitalize="none"
              value={phone}
              onChangeText={(value) => setPhone(value)}
            />

            {errorMessage ? (
              <Text className="text-sm text-red-600 mb-4">{errorMessage}</Text>
            ) : null}

            {/* Register Button */}
            <Pressable
              onPress={onRegister}
              className="bg-black p-4 mt-2 rounded-full active:opacity-80 mb-6"
            >
              <Text className="text-center text-white font-semibold text-lg">
                Register
              </Text>
            </Pressable>

            {/* Login Link */}
            <View className="flex-row justify-center mb-4">
              <Text className="text-base text-gray-700">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/(auth)/login")}>
                <Text className="text-base font-semibold text-line">Login</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
