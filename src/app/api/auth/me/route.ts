import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { verifyToken } from "@/lib/auth";
import { UserResponse, AuthResponse } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json<AuthResponse>({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    
    if (!payload || typeof payload === 'string' || !('id' in payload)) {
      return NextResponse.json<AuthResponse>({ error: "Invalid token" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(payload.id);

    if (!user) {
      return NextResponse.json<AuthResponse>({ error: "User not found" }, { status: 404 });
    }

    const userResponse: UserResponse = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      company: user.company || '',
    };

    return NextResponse.json(userResponse);
  } catch (error) {
    console.error('Me route error:', error);
    return NextResponse.json<AuthResponse>({ error: "Internal server error" }, { status: 500 });
  }
}
