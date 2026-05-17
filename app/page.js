"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0","C","=","+"
  ];

  const press = (val) => {
    if (val === "C") {
      setInput("");
      setResult("");
      return;
    }

    if (val === "=") {
      calculate();
      return;
    }

    setInput((prev) => prev + val);
  };

  const calculate = async () => {
    if (!input) return;

    const res = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: input }),
    });

    const data = await res.json();

    setResult(data.result);

    setHistory((prev) => [
      `${input} = ${data.result}`,
      ...prev.slice(0, 4),
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

      {/* Display */}
      <div className="w-72 bg-white rounded-2xl shadow p-4 mb-4">
        <div className="text-right text-gray-500 h-6">{input}</div>
        <div className="text-right text-2xl font-bold">{result}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 w-72">
        {buttons.map((b) => (
          <button
            key={b}
            onClick={() => press(b)}
            className="bg-white shadow rounded-xl p-4 text-lg active:scale-95"
          >
            {b}
          </button>
        ))}
      </div>

      {/* History */}
      <div className="w-72 mt-6">
        <h3 className="text-sm text-gray-600 mb-2">History</h3>
        <div className="bg-white rounded-xl shadow p-3 text-sm space-y-1">
          {history.length === 0 && (
            <p className="text-gray-400">No calculations yet</p>
          )}

          {history.map((h, i) => (
            <div key={i} className="text-gray-700">
              {h}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
