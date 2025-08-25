import { View, Text } from "react-native";
import Main from "../Components/Main";
import { Header } from "../Components/Header";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Main />
    </View>
  );
}
