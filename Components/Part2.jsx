import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Btn } from "./Btn";
import { Card } from "./Card";
import { ControlBar } from "./ControlBar";
import TextAreaPanel from "./TextAreaPanel";
import { startRecording, stopRecording } from "../utils/recording";
import LiveRecordingBar from "./LiveRecordingBar";

// Make sure Spinner, startRecording, stopRecording, startPart3, onSubmitAnswer are imported

export const Part2 = ({
  active,
  setActive,
  loading,
  setRecording,
  setUri,
  recording,
  cueCard,
  phase,
}) => {
  const lines = cueCard?.raw
    ?.split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // First line (always first non-empty line)
  const firstLine = lines[0];

  // Extract bullets (lines starting with "*")
  const bullets = lines
    .filter((line) => line.startsWith("*"))
    .map((line) => line.replace("*", "").trim());

  // Last line (always last non-empty line that isn’t a bullet or "You should say:")
  const lastLine = lines[lines.length - 1];

  return (
    <Card>
      <Text style={styles.title}>Part 2 – Cue Card</Text>
      {loading && <Spinner />}
      {cueCard && (
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{firstLine}</Text>
          </View>
          <Text style={{ color: "white" }}>
            {"\n"}You should say : {"\n"}
          </Text>
          <FlatList
            data={bullets}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", marginBottom: 8 }}>
                <Text style={{ fontSize: 16, marginRight: 6, color: "white" }}>
                  •
                </Text>
                <Text style={{ fontSize: 16, flexShrink: 1, color: "white" }}>
                  {item}
                </Text>
              </View>
            )}
          />
          <Text style={{ color: "white" }}>
            {"\n"}
            {lastLine}
          </Text>
          <TextAreaPanel phase={phase} />
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
          <View style={{ padding: 16 }}>
            <View style={{ padding: 16 }}>
              <LiveRecordingBar
                durationMs={120000} // 2 minutes
                onComplete={() => console.log("Recording finished (2:00)")}
              />
            </View>
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "white",
  },
  container: {
    gap: 16,
    color: "white",
  },
  cueCardBox: {
    backgroundColor: "rgba(17, 24, 39, 0.6)", // gray-900/60
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151", // gray-700
    color: "white",
    height: 200,
  },
  cueCardTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
    color: "white",
  },
  bullet: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
});
