import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { IdleScreen } from "./IdleScreen";
import { Part1 } from "./Part1";
// import { Part2 } from "./Part2";

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {phase === "idle" && (
          <IdleScreen
            loading={loading}
            setManualText={setManualText}
            setP1Questions={setP1Questions}
            setLoading={setLoading}
            setPhase={setPhase}
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
          />
        )}

        {/* Uncomment when implementing */}
        {/* {phase === "part2" && <Part2 key="p2" />} */}
        {/* {phase === "part3" && <Part3 key="p3" />} */}
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
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  innerContainer: {
    width: "100%",
  },
});
