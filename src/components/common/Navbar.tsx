import Link from "next/link";

export default function Navbar() {
  return (
    <header className="mx-auto mt-6 flex max-w-6xl items-center gap-4 px-6">
      <Link href="/" className="text-3xl font-bold md:text-5xl">
        TechPulse
      </Link>
      <Link href="/">Trang chủ</Link>
      <Link href="/market">Crypto list</Link>
      <Link href="/search">Search posts</Link>
    </header>
  );
}
