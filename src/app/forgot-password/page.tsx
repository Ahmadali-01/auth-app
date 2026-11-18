"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email") }),
    });
    setLoading(false);
    setMessage("Agar email registered hai tou reset link bhej diya gaya. Dev mode mein link Codespace terminal mein print hota hai.");
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold mb-4">Forgot password</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" className="w-full border p-2 rounded" />
        <button disabled={loading} className="w-full bg-black text-white p-2 rounded disabled:opacity-50">
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
      <p className="mt-4 text-sm"><a className="underline" href="/login">Back to sign in</a></p>
    </main>
  );
}
