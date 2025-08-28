export default function parseQuestions(text) {
  // Match each line starting with a number followed by a dot
  const questionRegex = /^\d+\.\s*(.+)$/gm;
  const questions = [];
  let match;

  while ((match = questionRegex.exec(text)) !== null) {
    let q = match[1];
    // Remove any bracketed text like (this is extra)
    q = q.replace(/\s*\(.*?\)/g, "").trim();
    questions.push(q);
  }

  return questions;
}
