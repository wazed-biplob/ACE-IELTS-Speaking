import { splitQuestions } from "./splitQuestion";
import { parseCueCard } from "./splitQuestion";

const baseURL = "http://192.168.0.104:5000";

export const fetchQuestion = async (
  part,
  setP1Questions,
  setLoading,
  setCueCard
) => {
  try {
    const res = await fetch(`${baseURL}/exam/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ part }),
    });
    const data = await res.json();

    if (part === 1) {
      setP1Questions(splitQuestions(data.question));
    } else if (part === 2) {
      console.log("raw data", data.question);
      setCueCard(parseCueCard(data.question));
    }
  } catch (e) {
    alert("Failed to fetch questions from the server.", e?.message);
  } finally {
    setLoading(false);
  }
};

export const fetchTranscription = async (question, uri) => {
  const formData = new FormData();

  formData.append("question", question);
  formData.append("file", {
    uri,
    type: "audio/m4a",
    name: "recording.m4a",
  });

  const response = await fetch(`${baseURL}/transcribe-file`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  const transcript =
    data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
  console.log("Transcript:", transcript);
};
