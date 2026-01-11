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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../utils/supabase";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      Alert.alert("Sign-in failed", error.message);
      return;
    }

    let signedInUser = data.user ?? data.session?.user ?? null;
    if (!signedInUser) {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        Alert.alert("Unable to load profile", userError.message);
      } else {
        signedInUser = userData.user ?? null;
      }
    }

    if (signedInUser) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", signedInUser.id)
        .maybeSingle();

      if (profileError) {
        Alert.alert("Unable to load profile", profileError.message);
      } else if (!profileData) {
        const metadata = signedInUser.user_metadata ?? {};
        const { error: insertError } = await supabase.from("profiles").insert({
          id: signedInUser.id,
          email: signedInUser.email ?? trimmedEmail,
          first_name: metadata.first_name ?? null,
          last_name: metadata.last_name ?? null,
          phone: metadata.phone ?? null,
        });

        if (insertError) {
          Alert.alert("Profile setup failed", insertError.message);
        }
      }
    }

    router.replace("/(tabs)");
  };

  return (
    <View
      className="flex-1 px-5 bg-slate-50"
      style={{ paddingTop: insets.top }}
    >
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
            <View className="mt-3">
              <Text className="text-3xl mt-1 font-semibold text-slate-900">
                Welcome back.
              </Text>
              <Text className="text-slate-600 text-base mt-1">
                Sign in with phone number or Google
              </Text>
            </View>

            {/* Email */}
            <Text className="text-xs font-semibold text-slate-600 mb-3 tracking-[0.2em]">
              EMAIL
            </Text>
            <TextInput
              className="bg-white border border-slate-200 rounded-3xl p-5 text-base leading-5 mb-6 text-slate-900"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              textAlign="left"
            />

            {/* Password */}
            <Text className="text-xs font-semibold text-slate-600 mb-3 tracking-[0.2em]">
              PASSWORD
            </Text>
            <TextInput
              className="bg-white border border-slate-200 rounded-3xl p-5 text-base leading-5 mb-6 text-slate-900"
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
              className={`bg-slate-900 p-4 mt-2 rounded-full active:opacity-80 mb-6 ${
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
            <Text className="text-base text-slate-600">
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("/(auth)/register")}>
              <Text className="text-base font-semibold text-slate-900">
                Register
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
