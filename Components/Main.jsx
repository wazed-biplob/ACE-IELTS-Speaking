import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Part1Intro } from "./Part1Intro";
import { Part1 } from "./Part1";
import { Part2 } from "./Part2";
import { Part2Intro } from "./Part2Intro";
import { Part3Intro } from "./Part3Intro";
import { Part3 } from "./Part3";

export default function Main() {
  const [phase, setPhase] = useState("idle");

  const [loading, setLoading] = useState(false);

  // Part 1
  const [p1Questions, setP1Questions] = useState([]);

  const [p1Index, setP1Index] = useState(0);

  // Part 2
  const [cueCard, setCueCard] = useState(null);

  // Part 3
  const [p3Questions, setP3Questions] = useState([]);

  const [p3Index, setP3Index] = useState(0);

  // Answer text
  const [manualText, setManualText] = useState([]);

  const [active, setActive] = useState("start");

  const [recording, setRecording] = useState(null);
  const [uri, setUri] = useState(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {phase === "idle" && (
          <Part1Intro
            loading={loading}
            setP1Questions={setP1Questions}
            setLoading={setLoading}
            setPhase={setPhase}
            phase={phase}
          />
        )}

        {phase === "part1" && (
          <Part1
            p1Questions={p1Questions}
            p1Index={p1Index}
            setP1Index={setP1Index}
            manualText={manualText}
            setManualText={setManualText}
            active={active}
            setActive={setActive}
            loading={loading}
            recording={recording}
            setRecording={setRecording}
            setUri={setUri}
            uri={uri}
            setLoading={setLoading}
            setCueCard={setCueCard}
            setPhase={setPhase}
            phase={phase}
          />
        )}
        {phase === "part2Intro" && (
          <Part2Intro
            setLoading={setLoading}
            setPhase={setPhase}
            setCueCard={setCueCard}
            loading={loading}
          />
        )}

        {phase === "part2" && (
          <Part2
            active={active}
            setActive={setActive}
            loading={loading}
            setRecording={setLoading}
            setUri={setUri}
            recording={recording}
            cueCard={cueCard}
            phase={phase}
            setPhase={setPhase}
          />
        )}
        {phase === "part3Intro" && (
          <Part3Intro
            loading={loading}
            setP3Questions={setP3Questions}
            setLoading={setLoading}
            setPhase={setPhase}
            phase={phase}
          />
        )}
        {phase === "part3" && (
          <Part3
            p3Questions={p3Questions}
            p3Index={p3Index}
            setP3Index={setP3Index}
            manualText={manualText}
            setManualText={setManualText}
            active={active}
            setActive={setActive}
            loading={loading}
            recording={recording}
            setRecording={setRecording}
            setUri={setUri}
            uri={uri}
            setLoading={setLoading}
            setCueCard={setCueCard}
            setPhase={setPhase}
            phase={phase}
          />
        )}
        {/* {phase === "done" && <Done key="done" />} */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "gray", // bg-gray-950
    justifyContent: "center",
    rowGap: 24,
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  innerContainer: {
    width: "100%",
  },
});
