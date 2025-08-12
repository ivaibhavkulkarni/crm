import jwt from "jsonwebtoken";
import { TokenPayload } from "@/types";
import "./env";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as TokenPayload;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}
