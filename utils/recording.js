import { fetchTranscription } from "./api";
import { recordingOptions } from "./constants";
import { Audio } from "expo-av";
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

    setRecording(null);

    fetchTranscription(question, uri);
  } catch (err) {
    console.error("Failed to stop recording:", err);
  }
};
