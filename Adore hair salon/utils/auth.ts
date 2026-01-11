import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "adore-salon-secret-key"

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function isAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return false

  const token = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("auth-token="))
    ?.split("=")[1]

  if (!token) return false

  const decoded = verifyToken(token)
  return decoded !== null
}
