import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = email
    ? await prisma.user.findUnique({
        where: { email: String(email).toLowerCase() },
      })
    : null;

  if (user) {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetTokenHash: tokenHash,
        resetTokenExpires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const url = `${process.env.APP_URL ?? "http://localhost:3000"}/reset-password?token=${rawToken}`;
    console.log(`\n🔑 Password reset link for ${user.email}:\n${url}\n`);
  }

  return Response.json({
    message: "If that email is registered, a reset link has been sent.",
  });
}
