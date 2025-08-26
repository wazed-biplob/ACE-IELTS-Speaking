// IdleScreen.js
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Card } from "./Card";
import { ControlBar } from "./ControlBar";
import { Btn } from "./Btn";
import { startPart1, startPart2 } from "../utils/functions";
import { Ionicons } from "@expo/vector-icons";

export const Part2Intro = () => {
  return (
    <Card>
      <Text style={styles.description}>
        You'll be given a cue card.
        <Text>{"\n\n"}Just speak your answers and record.</Text>
      </Text>

      <ControlBar>
        <Btn onPress={() => console.log("ok")}>
          <View style={styles.btnContent}>
            <Ionicons name="play-circle-outline" size={20} color="#fff" />
            <Text style={styles.btnText}>
              {loading ? <ActivityIndicator color="#ffffff" /> : `Start Part 2`}
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
