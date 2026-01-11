import { type NextRequest, NextResponse } from "next/server"
import pool from "@/utils/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "adore-salon-secret-key-change-this-in-production"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Korisničko ime i lozinka su obavezni" }, { status: 400 })
    }

    const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [username])

    const users = rows as any[]

    if (users.length === 0) {
      return NextResponse.json({ error: "Pogrešno korisničko ime ili lozinka" }, { status: 401 })
    }

    const user = users[0]

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: "Pogrešno korisničko ime ili lozinka" }, { status: 401 })
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" })

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Greška prilikom prijave" }, { status: 500 })
  }
}
