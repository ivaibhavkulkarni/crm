import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword } from "@/lib/bcrypt";
import { RegisterRequest, AuthResponse } from "@/types";

export async function POST(req: Request) {
  try {
    const body: RegisterRequest = await req.json();
    const { firstName, lastName, company, mobile, email, password } = body;

    // Input validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json<AuthResponse>({ error: "Required fields are missing" }, { status: 400 });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json<AuthResponse>({ error: "Invalid input types" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<AuthResponse>({ error: "Invalid email format" }, { status: 400 });
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json<AuthResponse>({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json<AuthResponse>({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      company: company || '',
      mobile: mobile || '',
      email,
      password: hashed,
    });

    await newUser.save();

    return NextResponse.json<AuthResponse>({ message: "User registered successfully" });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json<AuthResponse>({ error: "Internal server error" }, { status: 500 });
  }
}