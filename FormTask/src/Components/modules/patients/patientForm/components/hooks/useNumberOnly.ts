import { useState } from "react";

export const useNumberOnly = () => {
  const [error, setError] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (allowedKeys.includes(e.key)) return;

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      setError("Only numbers are allowed");
    } else {
      setError("");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    if (!/^[0-9]+$/.test(pastedData)) {
      e.preventDefault();
      setError("Only numbers are allowed");
    }
  };

  return { handleKeyDown, handlePaste, error };
};