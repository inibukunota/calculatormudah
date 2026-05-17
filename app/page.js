"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const buttons = [
    ["C", "±", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const isOperator = (val) => ["/", "*", "-", "+", "="].includes(val);

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

    if (val === "±") {
      if (input) {
        setInput((prev) => String(-Number(prev)));
      }
      return;
    }

    if (val === "%") {
      if (input) {
        setInput((prev) => String(Number(prev) / 100));
      }
      return;
    }

    setInput((prev) => prev + val);
  };

  const calculate = async () => {
    const res = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: input }),
    });

    const data = await res.json();
    setResult(data.result);
    setInput("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[320px] rounded-3xl p-4">

        {/* Display */}
        <div className="text-right text-white mb-6">
          <div className="text-gray-400 text-lg h-6">{input}</div>
          <div className="text-5xl font-light">{result}</div>
        </div>

        {/* Buttons */}
        <div className="grid gap-3">
          {buttons.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-3">
              {row.map((btn) => (
                <button
                  key={btn}
                  onClick={() => press(btn)}
                  className={`
                    h-16 rounded-full text-xl font-medium active:scale-95 transition
                    ${
                      btn === "0"
                        ? "col-span-2 text-left pl-6"
                        : ""
                    }
                    ${
                      isOperator(btn)
                        ? "bg-orange-500 text-white"
                        : "bg-[#333] text-white"
                    }
                    ${btn === "=" ? "bg-orange-500" : ""}
                  `}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
