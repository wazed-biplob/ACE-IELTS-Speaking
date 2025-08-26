import { Text, View } from "react-native";

export default function NotificationScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <Text style={{ fontSize: 24, color: "white" }}>Notifications Screen</Text>
    </View>
  );
}
