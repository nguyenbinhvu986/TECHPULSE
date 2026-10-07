"use client";

import { useState } from "react";

export default function BookmarkButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      onClick={() => setSaved(!saved)}
      className={`rounded-full border px-3 py-1 text-sm transition ${
        saved
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
    >
      {saved ? "Đã lưu" : "Lưu bài"}
    </button>
  );
}
