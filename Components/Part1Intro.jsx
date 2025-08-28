// IdleScreen.js
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Card } from "./Card";
import { ControlBar } from "./ControlBar";
import { Btn } from "./Btn";
import { startPart1 } from "../utils/functions";
import { Ionicons } from "@expo/vector-icons";

export const Part1Intro = ({
  setP1Questions,
  setLoading,
  setPhase,
  loading,
}) => {
  return (
    <Card>
      <Text style={styles.description}>
        This simulator follows IELTS Speaking structure. {"\n\n"}You will go
        through
        <Text style={styles.bold}> Part 1</Text> (intro),
        <Text style={styles.bold}> Part 2</Text> (cue card) and
        <Text style={styles.bold}> Part 3</Text> (discussion).
        <Text>
          {"\n\n"}Just speak your answers and record them in each part.
        </Text>
      </Text>

      <ControlBar>
        <Btn
          onPress={async () =>
            await startPart1(setP1Questions, setLoading, setPhase)
          }
        >
          <View style={styles.btnContent}>
            <Ionicons name="play-circle-outline" size={20} color="#fff" />
            <Text style={styles.btnText}>
              {loading ? <ActivityIndicator color="#ffffff" /> : `Start Part 1`}
            </Text>
          </View>
        </Btn>
      </ControlBar>
    </Card>
  );
};

const styles = StyleSheet.create({
  description: {
    color: "#d1d5db", // text-gray-300
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 26,
    textAlign: "left",
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
});
