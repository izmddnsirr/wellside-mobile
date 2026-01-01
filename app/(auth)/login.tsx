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
import { supabase } from "../../utils/supabase";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onLogin = async () => {
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
    if (!password) {
      const message = "Password is required.";
      setErrorMessage(message);
      Alert.alert("Check your details", message);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      Alert.alert("Sign-in failed", error.message);
      return;
    }

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
          contentContainerStyle={{ paddingBottom: 22 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/*  */}
            <View className="flex-row justify-between mt-6 mb-6">
              <Text className="text-sm">W E L L S I D E + </Text>
              <Text className="text-sm">L O G I N</Text>
            </View>

            {/*  */}
            <View>
              <Text className="text-4xl font-semibold mb-2">Welcome back.</Text>
              <Text className="mb-6 text-gray-600">Sign in with phone number or Google</Text>
            </View>

            {/* Email */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              EMAIL
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              textAlign="left"
            />

            {/* Password */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
              PASSWORD
            </Text>
            <TextInput
              className="bg-slate-50 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
              placeholder="Enter your password"
              keyboardType="default"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />

            {errorMessage ? (
              <Text className="text-sm text-red-600 mb-4">{errorMessage}</Text>
            ) : null}

            {/* Login Button */}
            <Pressable
              onPress={onLogin}
              disabled={isSubmitting}
              className={`bg-black p-4 mt-2 rounded-full active:opacity-80 mb-6 ${
                isSubmitting ? "opacity-60" : ""
              }`}
            >
              <Text className="text-center text-white font-semibold text-lg">
                {isSubmitting ? "Signing in..." : "Login"}
              </Text>
            </Pressable>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className="text-base text-gray-700">
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("/(auth)/register")}>
              <Text className="text-base font-semibold text-line">
                Register
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
