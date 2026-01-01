import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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

export default function RegisterScreen() {
  const router = useRouter();
  
  const { email, password, setEmail, setPassword } = useOnboarding();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onRegister = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      const message = "Email is required.";
      setErrorMessage(message);
      Alert.alert("Check your details", message);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      const message = "Please enter a valid email.";
      setErrorMessage(message);
      Alert.alert("Check your details", message);
      return;
    }
    if (password.length < 6) {
      const message = "Password must be at least 6 characters.";
      setErrorMessage(message);
      Alert.alert("Check your details", message);
      return;
    }
    if (password !== confirmPassword) {
      const message = "Passwords do not match.";
      setErrorMessage(message);
      Alert.alert("Check your details", message);
      return;
    }
    setErrorMessage("");
    router.push("/(onboarding)/details");
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

            {/* EMAIL */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              EMAIL
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />

            {/* PASSWORD */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              PASSWORD
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />

            {/* CONFIRM PASSWORD */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              CONFIRM PASSWORD
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Confirm your password"
              secureTextEntry
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
                Next
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
