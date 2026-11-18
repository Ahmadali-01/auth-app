import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const instant = false; // Next.js 16 ke naye caching system ke liye

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <main className="mx-auto max-w-md p-8 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Signed in as <strong>{session.user.email}</strong></p>
      <p className="text-sm text-gray-500">Role: {session.user.role}</p>
      <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
        <button className="bg-black text-white p-2 rounded">Sign out</button>
      </form>
    </main>
  );
}
