import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(input: string, hash: string) {
  return await bcrypt.compare(input, hash);
}