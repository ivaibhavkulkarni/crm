import { useEffect, useState } from "react"
import { UserResponse } from "@/types"

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
        if (!res.ok) {
          if (res.status === 401) {
            // User is not authenticated, redirect to login
            window.location.href = '/auth/login';
            return;
          }
          throw new Error("Failed to fetch user");
        }
        
        const data: UserResponse = await res.json();
        const { firstName, lastName, company } = data;

        // Add null checks for user properties
        const firstNameSafe = firstName || '';
        const lastNameSafe = lastName || '';
        const companySafe = company || '';

        setUser({
          name: `${firstNameSafe} ${lastNameSafe}`.trim() || 'User',
          company: companySafe,
          initials: `${firstNameSafe[0] || 'U'}${lastNameSafe[0] || 'S'}`.toUpperCase(),
        });
      } catch (err) {
        console.error("User fetch error:", err);
        // Don't set user to null on error to avoid infinite redirects
      }
    }

    fetchUser();
  }, []);

  return user;
}
