import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { usePathname } from "expo-router";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (lastPathRef.current === null) {
      lastPathRef.current = pathname;
      return;
    }

    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      if (Platform.OS !== "web") {
        void Haptics.selectionAsync();
      }
    }
  }, [pathname]);

  return (
    <NativeTabs
      iconColor={{
        default: "#0f172a",
        selected: "#0f172a",
      }}
    >
      {/* Home */}
      <NativeTabs.Trigger name="index">
        <Icon
          src={{
            default: <VectorIcon family={Ionicons} name="home-outline" />,
            selected: <VectorIcon family={Ionicons} name="home" />,
          }}
        />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      {/* Booking */}
      <NativeTabs.Trigger name="booking">
        <Icon
          src={{
            default: <VectorIcon family={Ionicons} name="calendar-outline" />,
            selected: <VectorIcon family={Ionicons} name="calendar" />,
          }}
        />
        <Label>Book</Label>
      </NativeTabs.Trigger>

      {/* AI */}
      <NativeTabs.Trigger name="ai">
        <Icon
          src={{
            default: <VectorIcon family={Ionicons} name="sparkles-outline" />,
            selected: <VectorIcon family={Ionicons} name="sparkles" />,
          }}
        />
        <Label>AI</Label>
      </NativeTabs.Trigger>

      {/* Notification */}
      <NativeTabs.Trigger name="notification">
        <Icon
          src={{
            default: <VectorIcon family={Ionicons} name="notifications-outline" />,
            selected: <VectorIcon family={Ionicons} name="notifications" />,
          }}
        />
        <Label>Alerts</Label>
      </NativeTabs.Trigger>

      {/* Profile */}
      <NativeTabs.Trigger name="profile">
        <Icon
          src={{
            default: <VectorIcon family={Ionicons} name="person-outline" />,
            selected: <VectorIcon family={Ionicons} name="person" />,
          }}
        />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
