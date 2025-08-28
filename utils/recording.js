import { fetchTranscription } from "./api";
import { recordingOptions } from "./constants";
import { Audio } from "expo-av";

// module-scoped variable (like a singleton recorder)
let recordingInstance = null;

export async function startRecording(setRecording, setUri, recording) {
  try {
    // ask permission
    const permission = await Audio.requestPermissionsAsync();
    if (permission.status !== "granted") {
      throw new Error("Microphone permission is required.");
    }

    // set audio mode
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    // create and start recording
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );

    recordingInstance = recording;
    console.log("🎙 Recording started");

    return recording; // return in case caller wants reference
  } catch (err) {
    console.error("Failed to start recording:", err);
    return null;
  }
}

export async function stopRecording(recording, setRecording, question, phase) {
  if (!recordingInstance) {
    console.warn("⚠️ No recording is active");
    return null;
  }

  try {
    console.log("🛑 Stopping...");
    await recordingInstance.stopAndUnloadAsync();

    const uri = recordingInstance.getURI();
    console.log("✅ Recording stopped. File saved at:", uri);

    // reset instance
    const finished = recordingInstance;
    recordingInstance = null;
    await fetchTranscription(question, uri, phase);
    return uri; // return file path
  } catch (err) {
    console.error("Failed to stop recording:", err);
    return null;
  }
}
