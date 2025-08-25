// ControlBar.js
import { View, StyleSheet } from "react-native";

export const ControlBar = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // flex
    flexWrap: "wrap", // flex-wrap
    alignItems: "center", // items-center
    marginTop: 16, // mt-4
    gap: 12, // gap-3
  },
});
