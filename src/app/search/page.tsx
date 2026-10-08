"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDebounce } from "../search/useDebounce";
import type { posts } from "../../localStorage/types/post";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<posts[]>([]);
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (!debouncedKeyword) return;
    fetch(`https://dummyjson.com/posts/search?q=${debouncedKeyword}`)
      .then((res) => res.json())
      .then((data) => setResults(data.posts));
  }, [debouncedKeyword]);

  return (
    <div className="mx-auto mt-6 max-w-6xl px-6">
      <h1 className="mb-4 text-3xl font-bold">Search posts</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Nhập từ khóa..."
        className="mt-4 w-full rounded-lg border border-gray-300 p-3"
      />

      <div className="mt-6 space-y-4">
        {debouncedKeyword &&
          results.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="block rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {post.body}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
