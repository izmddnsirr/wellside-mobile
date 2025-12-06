import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegister = () => {
    // 👉 Nanti sambung Supabase register
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 px-6">
      <View>
        {/* Top Header */}
        <View className="flex-row justify-between mt-10 mb-12">
          <Text className="text-sm">W E L L S I D E</Text>
          <Text className="text-sm">R E G I S T E R</Text>
        </View>

        {/* Title + Subtitle */}
        <View>
          <Text className="text-4xl font-semibold mb-2">Create account.</Text>
          <Text className="mb-12 text-gray-600">Your personal barber.</Text>
        </View>

        {/* FULL NAME */}
        <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
          FULL NAME
        </Text>
        <TextInput
          className="bg-gray-100 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
          placeholder="Enter your full name"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />

        {/* EMAIL */}
        <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
          EMAIL
        </Text>
        <TextInput
          className="bg-gray-100 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
          PASSWORD
        </Text>
        <TextInput
          className="bg-gray-100 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {/* CONFIRM PASSWORD */}
        <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
          CONFIRM PASSWORD
        </Text>
        <TextInput
          className="bg-gray-100 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
          placeholder="Confirm your password"
          secureTextEntry
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

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
          <Pressable onPress={() => router.back()}>
            <Text className="text-base font-semibold text-line">Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
