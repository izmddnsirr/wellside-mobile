import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppointmentScreen() {
  return (
    <SafeAreaView className="flex-1 p-6">
      <Text className="text-[22px] font-semibold">Make an Appointment</Text>

      <View className="mt-4">
        <Button title="Select Service" onPress={() => {}} />
      </View>

      <View className="mt-3">
        <Button title="Choose Barber" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}
