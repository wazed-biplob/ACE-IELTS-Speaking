import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { Card } from "./Card";

import RecordingBar from "./RecordingBar";
import { Spinner } from "../utils/functions";

// Make sure Spinner, startRecording, stopRecording, startPart3, onSubmitAnswer are imported

export const Part2 = ({
  loading,
  setRecording,
  setUri,
  recording,
  cueCard,
  phase,
  setPhase,
}) => {
  const lines = (cueCard?.raw || "")
    .split("\n")
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
          {/* <Text style={{ color: "white" }}>
            {"\n"}You should say : {"\n"}
          </Text> */}
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

          <View style={{ marginTop: 16 }}>
            <RecordingBar
              durationMs={120000} // 2 minutes
              onComplete={() => console.log("Recording finished (2:00)")}
              setRecording={setRecording}
              setUri={setUri}
              recording={recording}
              question={cueCard.raw}
              phase={phase}
              setPhase={setPhase}
            />
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
