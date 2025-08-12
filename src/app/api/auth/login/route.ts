import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { comparePassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/auth";
import { LoginRequest, AuthResponse } from "@/types";

export async function POST(req: Request) {
  try {
    const body: LoginRequest = await req.json();
    const { email, password } = body;

    // Input validation
    if (!email || !password) {
      return NextResponse.json<AuthResponse>({ error: "Email and password are required" }, { status: 400 });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json<AuthResponse>({ error: "Invalid input types" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json<AuthResponse>({ error: "User not found" }, { status: 404 });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json<AuthResponse>({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ id: user._id, email: user.email });

    const res = NextResponse.json<AuthResponse>({
      message: "Login successful",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
      }
    });
    res.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<AuthResponse>({ error: "Internal server error" }, { status: 500 });
  }
}
