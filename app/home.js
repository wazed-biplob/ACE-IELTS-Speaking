import { View, Text } from "react-native";
import Main from "../Components/Main";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <Main />
    </SafeAreaView>
  );
}
