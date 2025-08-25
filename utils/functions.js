// utils/functions.tsx (React Native / Expo compatible)

import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { fetchQuestion } from "./api";
import { Audio } from "expo-av";

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

const recordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".m4a",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export const startRecording = async (setRecording, setUri, recording) => {
  try {
    if (recording) {
      await recording.stopAndUnloadAsync();
      setRecording(null);
    }

    const permission = await Audio.requestPermissionsAsync();
    if (permission.status !== "granted") {
      alert("Microphone permission required!");
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const newRecording = new Audio.Recording();

    // ✅ pass the full recordingOptions object
    await newRecording.prepareToRecordAsync(recordingOptions);

    await newRecording.startAsync();

    setRecording(newRecording);
    setUri(null);
    console.log("🎙 Recording started");
  } catch (err) {
    console.error("Failed to start recording:", err);
  }
};

export const stopRecording = async (recording, setRecording, question) => {
  try {
    if (!recording) {
      console.warn("No active recording to stop");
      return;
    }

    console.log("🛑 Stopping...");
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("✅ Recording stopped. File stored at:", uri);

    // Clear recording state
    setRecording(null);

    const formData = new FormData();
    formData.append("question", question);
    formData.append("file", {
      uri,
      type: "audio/m4a",
      name: "recording.m4a",
    });

    const response = await fetch("http://192.168.0.104:5000/transcribe-file", {
      method: "POST",
      body: formData,
    });

    // Handle JSON safely
    const data = await response.json();

    const transcript =
      data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
    console.log("Transcript:", transcript);

    return transcript; // Optional: return transcript to caller
  } catch (err) {
    console.error("Failed to stop recording:", err);
  }
};
