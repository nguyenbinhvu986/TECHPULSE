"use client";

import { createContext, useContext, useState } from "react";

export const BookmarkContext = createContext({
  savedIds: [] as number[],
  toggle: (id: number) => {},
});

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const toggle = (id: number) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <BookmarkContext.Provider value={{ savedIds, toggle }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function BookmarkCount() {
  const { savedIds } = useContext(BookmarkContext);
  return <div className="ml-auto"> Số bài đã lưu {savedIds.length}</div>;
}

export default function BookmarkButton({ postId }: { postId: number }) {
  const { savedIds, toggle } = useContext(BookmarkContext);
  const saved = savedIds.includes(postId);

  return (
    <button
      onClick={() => toggle(postId)}
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
