import { View } from "react-native";
import { Stack } from "expo-router";

export default function home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "home", headerTitle: '' }} />
    </View>
  );
}