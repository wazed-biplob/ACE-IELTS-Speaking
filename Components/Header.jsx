import { View, Text, StyleSheet } from "react-native";

export const Header = () => (
  <View style={styles.container}>
    <Text style={styles.title}>ACE IELTS SPEAKING</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #ccc",
    backgroundColor: "lightgray", // bg-gray-200
    padding: 20, // border-2 border-gray-300
    borderRadius: 16,
  },
  title: {
    fontSize: 24, // text-2xl
    fontWeight: "600", // font-semibold
    letterSpacing: 1, // tracking-tight ~ tighten a bit
  },
});
