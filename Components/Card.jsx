// Card.js
import { View, StyleSheet } from "react-native";

export const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(31, 41, 55, 0.7)", // bg-gray-800/70
    borderColor: "#374151", // border-gray-700
    borderWidth: 1,
    borderRadius: 24, // rounded-2xl
    padding: 15, // p-5
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10, // Android shadow
  },
});
