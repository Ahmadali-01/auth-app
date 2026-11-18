import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { email, password, name } = parsed.data;
  const exists = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (exists) {
    return NextResponse.json({ error: "Could not create account" }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  await prisma.user.create({
    data: { email: email.toLowerCase(), name, passwordHash },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
