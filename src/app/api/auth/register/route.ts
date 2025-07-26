import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword } from "@/lib/bcrypt";


export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, company, mobile, email, password } = body;

  await connectDB();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await hashPassword(password);

  const newUser = new User({
    firstName,
    lastName,
    company,
    mobile,
    email,
    password: hashed,
  });

  await newUser.save();

  return NextResponse.json({ message: "User registered successfully" });
}