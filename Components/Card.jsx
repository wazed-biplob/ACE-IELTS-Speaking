// Card.js
import { View, StyleSheet } from "react-native";

export const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(31, 41, 55, 0.7)",
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 24,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
});
