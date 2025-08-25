import { View, Text, StyleSheet } from "react-native";

export const Header = () => (
  <View style={styles.container}>
    <Text style={styles.title}>IELTS Speaking Exam</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24, // mb-6
  },
  title: {
    fontSize: 24, // text-2xl
    fontWeight: "600", // font-semibold
    letterSpacing: 1, // tracking-tight ~ tighten a bit
  },
});
