import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 px-6">
      <View>
        {/*  */}
        <View className="flex-row justify-between mt-10 mb-12">
          <Text className="text-sm">W E L L S I D E</Text>
          <Text className="text-sm">L O G I N</Text>
        </View>

        {/*  */}
        <View>
          <Text className="text-4xl font-semibold mb-2">Welcome back.</Text>
          <Text className="mb-12 text-gray-600">Your personal barber.</Text>
        </View>

        {/* Email */}
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
          textAlign="left"
        />

        {/* Password */}
        <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-widest">
          PASSWORD
        </Text>
        <TextInput
          className="bg-gray-100 border border-gray-300 rounded-xl p-5 text-base leading-5 mb-6"
          placeholder="Enter your password"
          keyboardType="default"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          className="bg-black p-4 mt-2 rounded-full active:opacity-80 mb-6"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Login
          </Text>
        </Pressable>
      </View>
      {/* Register Link */}
      <View className="flex-row justify-center">
        <Text className="text-base text-gray-700">Don't have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text className="text-base font-semibold text-line">Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
