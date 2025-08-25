import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Card } from "./Card";

import { TextAreaPanel } from "./TextAreaPanel";

import { ControlBar } from "./ControlBar";

import { Btn } from "./Btn";

import {
  onSubmitAnswer,
  startRecording,
  stopRecording,
} from "../utils/functions";
import { Recording } from "expo-av/build/Audio";

export const Part1 = ({
  p1Questions,
  p1Index,
  setP1Index,
  manualText,
  setManualText,
  active,
  setActive,
  loading,
  setRecording,
  setUri,
  recording,
}) => {
  return (
    <Card>
      <Text style={styles.heading}>Part 1 – Introduction & Interview</Text>

      {loading && <ActivityIndicator color="#fff" size="large" />}

      {!loading && p1Questions.length > 0 && (
        <View style={styles.container}>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{p1Questions[p1Index]}</Text>
          </View>

          <TextAreaPanel
            manualText={manualText}
            setManualText={setManualText}
          />

          <ControlBar>
            <Btn
              onPress={() => {
                onSubmitAnswer();
                setActive("stop");
                startRecording(setRecording, setUri, recording);
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
              onPress={() => {
                onSubmitAnswer();
                setActive("next");
                stopRecording(recording, setRecording, p1Questions[p1Index]);
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
                if (p1Index < p1Questions.length - 1) setP1Index(p1Index + 1);
                else startPart2();
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
