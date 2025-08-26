// Splits raw questions into array
export function splitQuestions(raw) {
  if (!raw) return [];
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  let qs = [];
  for (const l of lines) {
    if (/\?$/.test(l)) qs.push(l);
  }

  if (qs.length === 0) return [raw.trim()];
  qs = qs.map((q) => q.replace(/^\d+\.\s*/, ""));
  return qs;
}

export function parseCueCard(raw) {
  const lines = raw.split(/\r?\n/).map((l) => l.trim());
  const title = lines[0] || "IELTS Part 2 Cue Card";
  const bullets = lines
    .slice(1)
    .filter(
      (l) => /^[-•]/.test(l) || l.toLowerCase().startsWith("you should say")
    )
    .map((l) => l.replace(/^[-•]\s?/, ""));
  return { title, bullets, raw };
}
