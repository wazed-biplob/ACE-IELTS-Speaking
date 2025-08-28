// IdleScreen.js
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Card } from "./Card";
import { ControlBar } from "./ControlBar";
import { Btn } from "./Btn";

import { Ionicons } from "@expo/vector-icons";
import { startPart2 } from '../utils/functions';

export const Part2Intro = ({ setLoading, setPhase, setCueCard, loading }) => {
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.label}>Your Answer{"\n"}</Text>
          <Text style={styles.textarea}>
            In Part 2, you will be given a Cue Card.
            {"\n\n"}
            You have to speak for at least 1 to (max) 2 minute on the Topic of
            the card.
            {"\n\n"}
            And You have 1 minute to prepare. {"\n\n"}During this time, you can
            make notes on paper.
            {"\n\n"}Then, you must speak continuously for 1–2 minutes on the
            topic. {"\n\n"}
            After that, I will ask you some follow-up questions related to the
            topic. {"\n\n"}
          </Text>
        </View>
      </View>

      <ControlBar>
        <Btn
          onPress={async () =>
            await startPart2(setLoading, setPhase, setCueCard)
          }
        >
          <View style={styles.btnContent}>
            <Ionicons name="play-circle-outline" size={20} color="#fff" />
            <Text style={styles.btnText}>
              {loading ? <ActivityIndicator color="#ffffff" /> : `Start Part 2`}
            </Text>
          </View>
        </Btn>
      </ControlBar>
    </Card>
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
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
});
