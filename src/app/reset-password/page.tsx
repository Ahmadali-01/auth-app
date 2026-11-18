"use client";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token") ?? "");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) setError(data.error ?? "Something went wrong");
    else setMessage("Password updated. Ab sign in kar sakte hain.");
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold mb-4">Reset password</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input value={token} onChange={(e) => setToken(e.target.value)} required placeholder="Reset token" className="w-full border p-2 rounded font-mono text-sm" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} placeholder="New password (min 8)" className="w-full border p-2 rounded" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-700 text-sm">{message}</p>}
        <button disabled={loading} className="w-full bg-black text-white p-2 rounded disabled:opacity-50">
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
      <p className="mt-4 text-sm"><a className="underline" href="/login">Back to sign in</a></p>
    </main>
  );
}
