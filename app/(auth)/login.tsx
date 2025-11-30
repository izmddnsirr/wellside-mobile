import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 px-6 justify-center">
      <View>

        {/* Email */}
        <Text className="text-base text-gray-700 mb-1">Email</Text>
        <TextInput
          className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-base mb-4"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text className="text-base text-gray-700 mb-1">Password</Text>
        <TextInput
          className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-base mb-4"
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          className="bg-blue-500 p-4 mt-2 rounded-full active:opacity-80"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Login
          </Text>
        </Pressable>

        {/* Register Link */}
        <View className="mt-4 flex-row justify-center">
          <Text className="text-base text-gray-700">Don't have an account? </Text>
          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Text className="text-base font-semibold text-blue-600">
              Register
            </Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}
