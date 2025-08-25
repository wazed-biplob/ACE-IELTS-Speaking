import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { Audio } from "expo-av";

const recordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 16000, // ✅ Deepgram loves 16kHz for STT
    numberOfChannels: 1, // mono is best for STT
    bitRate: 128000,
  },
  ios: {
    extension: ".m4a",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 16000, // ✅ match Deepgram expected sample rate
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export default function App() {
  const [recording, setRecording] = useState(null);
  const [uri, setUri] = useState(null);
  const [sound, setSound] = useState(null);

  // cleanup sound when unmounting
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {uri && (
        <>
          <Button title="Play Recording" onPress={playRecording} />
        </>
      )}
    </View>
  );
}
