export default function handler(req, res) {
  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { expression } = body || {};

    if (!expression) {
      return res.status(400).json({ result: "No input" });
    }

    if (!/^[0-9+\-*/.]+$/.test(expression)) {
      return res.status(400).json({ result: "Invalid input" });
    }

    const result = Function(`"use strict"; return (${expression})`)();

    return res.status(200).json({ result });

  } catch (err) {
    return res.status(500).json({ result: "Server error" });
  }
}
