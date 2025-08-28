// LiveRecordingBar.jsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  startRecording,
  stopPart2Recording,
  stopRecording,
} from "../utils/recording";

export default function RecordingBar({
  durationMs = 120000,
  onComplete,
  setRecording,
  setUri,
  recording,
  question,
  phase,
  setPhase,
}) {
  const [elapsed, setElapsed] = useState(0); // in ms
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const progress = Math.min(elapsed / durationMs, 1);

  const mmss = formatMmSs(elapsed);

  const start = () => {
    if (running) return;
    setElapsed(0);
    setRunning(true);

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 100;
        if (next >= durationMs) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);
          onComplete && onComplete();
          return durationMs;
        }
        return next;
      });
    }, 100); // update every 100ms
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
    setElapsed(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {running ? "Recording…" : elapsed >= durationMs ? "Finished" : "Idle"}
      </Text>

      <View style={styles.barOuter}>
        <View style={[styles.barInner, { width: `${progress * 100}%` }]} />
      </View>

      <Text style={styles.time}>
        {mmss} / {formatMmSs(durationMs)}
      </Text>

      <View style={styles.buttons}>
        <Pressable
          onPress={async () => {
            start();
            await startRecording(setRecording, setUri, recording);
          }}
          style={[styles.btn, running && styles.btnDisabled]}
          disabled={running}
        >
          <Text style={styles.btnText}>Start</Text>
        </Pressable>

        <Pressable
          onPress={async () => {
            stop();
            await stopRecording(recording, setRecording, question, phase);
          }}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Stop</Text>
        </Pressable>
        <Pressable onPress={() => setPhase("part3Intro")} style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}

function formatMmSs(ms) {
  const total = Math.floor(ms / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 18,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#f4f4f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  barOuter: {
    height: 14,
    borderRadius: 999,
    backgroundColor: "#e4e4e7",
    overflow: "hidden",
  },
  barInner: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#22c55e",
  },
  time: {
    fontVariant: ["tabular-nums"],
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#111827",
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnText: {
    color: "white",
    fontWeight: "600",
  },
});
