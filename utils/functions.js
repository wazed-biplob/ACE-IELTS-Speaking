// utils/functions.tsx (React Native / Expo compatible)

import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { fetchQuestion } from "./api";

// Starts Part 1
export const startPart1 = async (setP1Questions, setLoading, setPhase) => {
  setLoading(true);
  await fetchQuestion(1, setP1Questions, setLoading); // fetches questions before rendering Part 1 UI
  setPhase("part1"); // setting phase renders Part 1 UI
};

export const startPart2 = async (setLoading, setPhase, setCueCard) => {
  setLoading(true);
  await fetchQuestion(2, () => {}, setLoading, setCueCard); // fetches questions before rendering Part 1 UI
  setPhase("part2");
};

// Utility function like clsx (not as important in RN, but still usable for conditional strings)
export function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

// Native Spinner (instead of Loader2 from lucide-react)
export const Spinner = () => (
  <View style={styles.spinnerContainer}>
    <ActivityIndicator size="small" color="#ccc" />
    <Text style={styles.spinnerText}>Loading…</Text>
  </View>
);

// Submit answer placeholder
export const onSubmitAnswer = async () => {
  // Example implementation:
  // const answer = manualText.trim();
  // if (!answer) return Alert.alert("Validation", "Please type your answer before submitting.");
  // const result = await evaluate(answer);
  // setEvaluation(result);
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  spinnerText: {
    color: "#ccc",
    marginLeft: 6,
  },
});
