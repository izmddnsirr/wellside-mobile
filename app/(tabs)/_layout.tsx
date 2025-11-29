import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tab2">
        <Icon sf="calendar" />
        <Label>Booking</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tab3">
        <Icon sf="clock" />
        <Label>History</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tab4">
        <Icon sf="person" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
