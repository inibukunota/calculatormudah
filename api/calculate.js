export default function handler(req, res) {
  const { expression } = req.body;

  try {
    // Allow only numbers and math operators
    if (!/^[0-9+\-*/.]+$/.test(expression)) {
      return res.status(400).json({ result: "Invalid input" });
    }

    // Evaluate safely (basic controlled environment)
    const result = Function(`"use strict"; return (${expression})`)();

    return res.status(200).json({ result });

  } catch (err) {
    return res.status(400).json({ result: "Error" });
  }
}
