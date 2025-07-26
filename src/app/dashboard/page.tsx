import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  const user = verifyToken(token);
  if (!user || typeof user === "string" || !("email" in user)) {
    redirect("/auth/login");
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-sm text-slate-700">You're logged in as: <strong>{(user as { email: string }).email}</strong></p>
    </main>
  );
}
