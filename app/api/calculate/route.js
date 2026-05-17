export async function POST(req) {
  try {
    const { expression } = await req.json();

    // security: only math characters allowed
    if (!/^[0-9+\-*/.]+$/.test(expression)) {
      return Response.json({ result: "Invalid input" }, { status: 400 });
    }

    const result = Function(`"use strict"; return (${expression})`)();

    return Response.json({ result });

  } catch (err) {
    return Response.json({ result: "Error" }, { status: 500 });
  }
}
