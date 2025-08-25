import { splitQuestions } from "./functions";

const api = "http://192.168.0.104:5000";

export const fetchQuestion = async (part, setP1Questions, setLoading) => {
  try {
    const res = await fetch(`${api}/exam/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ part }),
    });
    const data = await res.json();

    console.log(splitQuestions(data.question));
    if (part === 1) {
      setP1Questions(splitQuestions(data.question));
    }
  } catch (e) {
    console.error(e);
    alert("Failed to fetch questions from the server.");
  } finally {
    setLoading(false);
  }
};
