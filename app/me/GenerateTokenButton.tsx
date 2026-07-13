"use client";

import { generateToken } from "../actions/users";

export default function GenerateTokenButton() {
  const handleGenerateClick = async () => {
    await generateToken();
  };

  return (
    <button
      className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleGenerateClick}
      data-testid="generate-token-button"
    >
      Generate New Token
    </button>
  );
}
