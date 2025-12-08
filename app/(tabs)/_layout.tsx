import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const iconTintColor = labelColor;

  if (Platform.OS === "android") {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: iconTintColor,
          tabBarLabelStyle: { color: labelColor },
          headerShown: false,
          tabBarStyle: {
            height: 85,
            paddingBottom: 0,
            paddingTop: 5,
            borderTopWidth: 0.5,
            borderTopColor: "#d1d5db",
            backgroundColor: "white",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointment"
          options={{
            title: "Appointment",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="calendar-month" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Notification",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="notifications" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }

  return (
    <NativeTabs
      labelStyle={{
        color: labelColor,
      }}
      tintColor={iconTintColor}
    >
      {/* Home */}
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "house.fill", selected: "house.fill" }} />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      {/* Appointment */}
      <NativeTabs.Trigger name="appointment">
        <Icon sf={{ default: "calendar", selected: "calendar" }} />
        <Label>Appointment</Label>
      </NativeTabs.Trigger>

      {/* Notification */}
      <NativeTabs.Trigger name="notification">
        <Icon sf={{ default: "bell.fill", selected: "bell.fill" }} />
        <Label>Notification</Label>
      </NativeTabs.Trigger>

      {/* Profile */}
      <NativeTabs.Trigger name="profile">
        <Icon sf={{ default: "person.fill", selected: "person.fill" }} />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
