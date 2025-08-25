// TextAreaPanel.js
import { View, Text, TextInput, StyleSheet } from "react-native";

export const TextAreaPanel = ({ manualText, setManualText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.label}>Your Answer</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Press The 'Start' Button and speak your answer, when finished press 'Stop'. And Press 'Next' to go to the next question."
          placeholderTextColor="#9ca3af" // text-gray-400
          multiline
          value={manualText}
          onChangeText={setManualText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12, // space-y-3, RN 0.71+
  },
  panel: {
    backgroundColor: "rgba(17, 24, 39, 0.6)", // bg-gray-900/60
    borderRadius: 12, // rounded-xl
    padding: 12, // p-3
    borderWidth: 1,
    borderColor: "#374151", // border-gray-700
  },
  label: {
    fontSize: 12, // text-xs
    textTransform: "uppercase",
    color: "#9ca3af", // text-gray-400
    marginBottom: 4,
  },
  textarea: {
    color: "#f3f4f6", // text-gray-100
    minHeight: 120, // min-h-[120px]
    textAlignVertical: "top", // top align text in multiline
    backgroundColor: "transparent",
    padding: 0,
  },
});

export default TextAreaPanel;
