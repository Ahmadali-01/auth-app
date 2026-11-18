import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-md p-8 space-y-4">
      <h1 className="text-3xl font-bold">Auth Demo</h1>
      <p className="text-gray-600">Next.js + Auth.js + Prisma</p>
      <div className="flex gap-3">
        <Link className="bg-black text-white px-4 py-2 rounded" href="/login">Sign in</Link>
        <Link className="border px-4 py-2 rounded" href="/register">Register</Link>
      </div>
    </main>
  );
}
