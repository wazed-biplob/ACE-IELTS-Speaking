import parseQuestions from "./parseQuestion";
import { splitQuestions } from "./splitQuestion";
import { parseCueCard } from "./splitQuestion";

const baseURL = "http://192.168.0.102:5000";

export const fetchQuestion = async (
  part,
  setP1Questions,
  setP3Question,
  setLoading,
  setCueCard
) => {
  try {
    console.log("ok");
    const res = await fetch(`${baseURL}/exam/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ part }),
    });
    console.log("ok");
    const data = await res.json();

    if (part === 1) {
      setP1Questions(splitQuestions(data.question));
    } else if (part === 2) {
      setCueCard(parseCueCard(data.question));
    } else if (part === 3) {
      setP3Question(parseQuestions(data.question));
    }
  } catch (e) {
    alert("Failed to fetch questions from the server.", e?.message);
  } finally {
    setLoading(false);
  }
};

export const fetchTranscription = async (question, uri, phase) => {
  const formData = new FormData();
  formData.append("phase", phase);
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
  console.log("data", data?.transcript);
};
