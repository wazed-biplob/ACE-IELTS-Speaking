// utils/functions.tsx (React Native / Expo compatible)

import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { fetchQuestion } from "./api";

// Starts Part 1
export const startPart1 = async (
  setManualText,
  setP1Questions,
  setLoading,
  setPhase
) => {
  setLoading(true);
  setManualText(""); // reset text input
  await fetchQuestion(1, setP1Questions, setLoading);
  setPhase("part1");
};

// Utility function like clsx (not as important in RN, but still usable for conditional strings)
export function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

// Splits raw questions into array
export function splitQuestions(raw) {
  if (!raw) return [];
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  let qs = [];
  for (const l of lines) {
    if (/\?$/.test(l)) qs.push(l);
  }

  if (qs.length === 0) return [raw.trim()];
  qs = qs.map((q) => q.replace(/^\d+\.\s*/, ""));
  return qs;
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
