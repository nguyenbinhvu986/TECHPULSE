import type { postsResponse } from "../localStorage/types/post";
import BookmarkButton from "../components/features/BookMarkButton";

export default async function HomePage() {
  const res = await Promise.all([
    fetch("https://dummyjson.com/posts/tag-list", { cache: "force-cache" }),
    fetch("https://dummyjson.com/posts?limit=6", { cache: "force-cache" }),
  ]);

  if (!res[0].ok) {
    throw new Error(`Lỗi máy chủ (tags): ${res[0].status}`);
  }
  if (!res[1].ok) {
    throw new Error(`Lỗi máy chủ (posts): ${res[1].status}`);
  }

  const data = await Promise.all([res[0].json(), res[1].json()]);
  const tags: string[] = data[0];
  const postsData: postsResponse = data[1];
  const posts = postsData.posts;

  return (
    <main>
      <p className="mx-auto mt-4 max-w-4xl px-6 text-center text-gray-600">
        Nền tảng chia sẻ tin tức, kiến thức và xu hướng công nghệ mới nhất dành
        for cộng đồng lập trình viên.
      </p>

      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="mb-2 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {post.body}
              </p>
              <div className="mt-4">
                <BookmarkButton />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
