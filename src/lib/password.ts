import { hash, verify } from "@node-rs/argon2";

export function hashPassword(password: string) {
  return hash(password, {
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });
}

export async function verifyPassword(hashStr: string, password: string) {
  try {
    return await verify(hashStr, password);
  } catch {
    return false;
  }
}
