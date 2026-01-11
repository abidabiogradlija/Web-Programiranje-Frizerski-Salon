import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "adore-salon-secret-key-change-this-in-production"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any

    return NextResponse.json({
      user: { id: decoded.id, username: decoded.username },
    })
  } catch (error) {
    return NextResponse.json({ error: "Nevažeći token" }, { status: 401 })
  }
}
