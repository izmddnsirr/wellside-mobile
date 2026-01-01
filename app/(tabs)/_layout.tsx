import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      {/* Home */}
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "house.fill", selected: "house.fill" }} />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      {/* Booking */}
      <NativeTabs.Trigger name="booking">
        <Icon sf={{ default: "calendar", selected: "calendar" }} />
        <Label>Booking</Label>
      </NativeTabs.Trigger>

      {/* AI */}
      <NativeTabs.Trigger name="ai">
        <Icon
          sf={{
            default: "ellipsis.bubble.fill",
            selected: "ellipsis.bubble.fill",
          }}
        />
        <Label>AI</Label>
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
