import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Card } from "./Card";

import { Part1Instruction, TextAreaPanel } from "./Part1Instruction";

import { ControlBar } from "./ControlBar";

import { Btn } from "./Btn";
import { startRecording, stopRecording } from "../utils/recording";

export const Part3 = ({
  p3Questions,
  p3Index,
  setP3Index,
  manualText,
  setManualText,
  active,
  setActive,
  setLoading,
  loading,
  setRecording,
  setUri,
  recording,
  setPhase,
  setCueCard,
  phase,
}) => {
  return (
    <Card>
      <Text style={styles.heading}>Part 3 – Discussion</Text>

      {loading && <ActivityIndicator color="#fff" size="large" />}

      {!loading && p3Questions.length > 0 && (
        <View style={styles.container}>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{p3Questions[p3Index]}</Text>
          </View>

          <ControlBar>
            <Btn
              onPress={async () => {
                setActive("stop");
                await startRecording(setRecording, setUri, recording);
              }}
              disabled={active !== "start"}
              icon={() => (
                <Ionicons name="play-circle-outline" size={18} color="#fff" />
              )}
              variant="success"
            >
              Start
            </Btn>

            <Btn
              onPress={async () => {
                setActive("next");
                await stopRecording(
                  recording,
                  setRecording,
                  p3Questions[p3Index],
                  phase
                );
              }}
              disabled={active !== "stop"}
              icon={() => (
                <Ionicons name="stop-circle-outline" size={18} color="#fff" />
              )}
              variant="danger"
            >
              Stop
            </Btn>

            <Btn
              onPress={() => {
                setActive("start");
                if (p3Index < p3Questions.length - 1) setP3Index(p3Index + 1);
                else alert("finished");
              }}
              disabled={active !== "next"}
              icon={() => (
                <Ionicons
                  name="play-skip-forward-outline"
                  size={18}
                  color="#fff"
                />
              )}
              variant="primary"
            >
              Next
            </Btn>
          </ControlBar>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20, // text-xl
    fontWeight: "600", // font-semibold
    marginBottom: 12,
    color: "#fff",
  },
  container: {
    gap: 12, // space-y-3 (RN 0.71+ supports gap)
  },
  questionBox: {
    backgroundColor: "rgba(17, 24, 39, 0.6)", // bg-gray-900/60
    borderRadius: 12, // rounded-xl
    padding: 16, // p-4
    borderWidth: 1,
    borderColor: "#374151", // border-gray-700
  },
  questionText: {
    color: "#fff",
    fontSize: 16, // text-lg
  },
});
