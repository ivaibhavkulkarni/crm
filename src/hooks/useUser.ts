// src/hooks/useUser.ts

type User = {
  name: string
  company: string
  initials: string
}

export function useUser(): User {
  // Replace this mock with actual logic (e.g., from context or API)
  return {
    name: "John Doe",
    company: "Hola IO",
    initials: "JD"
  }
}
