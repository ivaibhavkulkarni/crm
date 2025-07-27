import { useEffect, useState } from "react"

type User = {
  name: string
  company: string
  initials: string
}

export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        const { firstName, lastName, company } = data;

        setUser({
          name: `${firstName} ${lastName}`,
          company,
          initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
        });
      } catch (err) {
        console.error("User fetch error:", err);
      }
    }

    fetchUser();
  }, []);

  return user;
}
