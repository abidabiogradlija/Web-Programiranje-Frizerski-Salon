// Model: User (tabela `users`)
// Ovaj fajl predstavlja "Model" sloj u MVC arhitekturi.

export interface User {
  id: number
  username: string
  /** bcrypt hash */
  password: string
  created_at: string
}

export type PublicUser = Pick<User, "id" | "username">;

