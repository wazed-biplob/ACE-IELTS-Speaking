// TextAreaPanel.js
import { View, Text, StyleSheet } from "react-native";

export const TextAreaPanel = ({ phase }) => {
  return phase === "part1" ? (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.label}>Your Answer{"\n"}</Text>
        <Text style={styles.textarea}>
          1. Press The 'Start' Button and speak your answer. {"\n\n"}2. Only
          After you press 'Start', recording begins and the 'Start' Button
          becomes disabled.{"\n\n"}3. Then 'Stop' Button will be enabled and
          when you finish speaking, Press 'Stop'.{"\n\n"}4. Then 'Next' will be
          enabled, Press 'Next' to go to the next question."
        </Text>
      </View>
    </View>
  ) : (
    <>
      <View style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.label}>Your Answer{"\n"}</Text>
          <Text style={styles.textarea}>
            You are given 1 minute to prepare. {"\n\n"}During this minute, you
            can make notes on paper (which the examiner provides). {"\n\n"}Then,
            you must speak continuously for 1–2 minutes on the topic. {"\n\n"}
            After that, I will ask you one or two short follow-up questions
            related to the topic. {"\n\n"}Then we'll move to Part 3.
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12, // space-y-3, RN 0.71+
    marginTop: 10,
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
