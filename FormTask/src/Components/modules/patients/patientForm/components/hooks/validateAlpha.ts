
import { useState } from "react";

export const useAlphabetOnly = () => {
  const [error, setError] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isLetter = /^[a-zA-Z\s]$/.test(e.key);

    // Allow backspace, delete, tab, arrows, etc.
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Enter",
    ];

    if (!isLetter && !allowedKeys.includes(e.key) && e.key.length === 1) {
      e.preventDefault();
      setError("Only alphabets are allowed");
      setTimeout(() => setError(""), 2000); // Clear error after 2s
    }
  };

  return { handleKeyDown, error };
};