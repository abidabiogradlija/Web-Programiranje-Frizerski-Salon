import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import path from "node:path"
import pool from "../utils/db"
import { ReservationService } from "../src/server/services/reservation-service"
import { ContactService } from "../src/server/services/contact-service"

const app = express()
const port = Number(process.env.PORT) || 3000
const JWT_SECRET = process.env.JWT_SECRET || "adore-salon-secret-key-change-this-in-production"

app.use(express.json())
app.use(cookieParser())

const requireAuth = (req: express.Request, res: express.Response) => {
  const token = req.cookies["auth-token"]
  if (!token) {
    res.status(401).json({ error: "Niste prijavljeni" })
    return null
  }
  return token
}

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string }

    if (!username || !password) {
      return res.status(400).json({ error: "Korisničko ime i lozinka su obavezni" })
    }

    const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [username])
    const users = rows as any[]

    if (users.length === 0) {
      return res.status(401).json({ error: "Pogrešno korisničko ime ili lozinka" })
    }

    const user = users[0]
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.status(401).json({ error: "Pogrešno korisničko ime ili lozinka" })
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" })

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400 * 1000,
      path: "/",
    })

    return res.json({
      success: true,
      user: { id: user.id, username: user.username },
    })
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ error: "Greška prilikom prijave" })
  }
})

app.get("/api/auth/me", async (req, res) => {
  try {
    const token = requireAuth(req, res)
    if (!token) return

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string }
    return res.json({ user: { id: decoded.id, username: decoded.username } })
  } catch (error) {
    return res.status(401).json({ error: "Nevažeći token" })
  }
})

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("auth-token", { path: "/" })
  return res.json({ success: true })
})

app.get("/api/reservations", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const reservations = await ReservationService.list()
  return res.json({ reservations })
})

app.get("/api/reservations/:id", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const id = Number(req.params.id)
  const reservation = await ReservationService.getById(id)

  if (!reservation) {
    return res.status(404).json({ error: "Rezervacija nije pronađena" })
  }

  return res.json({ reservation })
})

app.post("/api/reservations", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const body = req.body as Record<string, unknown>
  const required = ["client_name", "client_phone", "service", "appointment_date", "appointment_time"] as const

  for (const key of required) {
    if (!body[key]) {
      return res.status(400).json({ error: "Sva obavezna polja moraju biti popunjena" })
    }
  }

  const result = await ReservationService.create({
    client_name: body.client_name as string,
    client_email: (body.client_email as string) || null,
    client_phone: body.client_phone as string,
    service: body.service as string,
    appointment_date: body.appointment_date as string,
    appointment_time: body.appointment_time as string,
    duration_hours: (body.duration_hours as number) || 1,
    status: (body.status as string) || "pending",
    notes: (body.notes as string) || null,
  })

  return res.json(result)
})

app.put("/api/reservations/:id", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const id = Number(req.params.id)
  const body = req.body as Record<string, unknown>

  await ReservationService.update(id, {
    client_name: body.client_name as string,
    client_email: (body.client_email as string) || null,
    client_phone: body.client_phone as string,
    service: body.service as string,
    appointment_date: body.appointment_date as string,
    appointment_time: body.appointment_time as string,
    duration_hours: (body.duration_hours as number) || 1,
    status: (body.status as string) || "pending",
    notes: (body.notes as string) || null,
  })

  return res.json({ success: true })
})

app.delete("/api/reservations/:id", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const id = Number(req.params.id)
  await ReservationService.remove(id)
  return res.json({ success: true })
})

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body as {
    name?: string
    email?: string
    phone?: string
    message?: string
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Ime, email i poruka su obavezni" })
  }

  await ContactService.create({ name, email, phone, message })
  return res.json({ success: true })
})

app.get("/api/contact", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const messages = await ContactService.list()
  return res.json({ messages })
})

app.get("/api/contact/:id", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const id = Number(req.params.id)
  const message = await ContactService.getById(id)

  if (!message) {
    return res.status(404).json({ error: "Poruka nije pronađena" })
  }

  return res.json({ message })
})

app.put("/api/contact/:id", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const id = Number(req.params.id)
  const is_read = typeof req.body?.is_read === "boolean" ? req.body.is_read : true

  await ContactService.update(id, { is_read })
  return res.json({ success: true })
})

app.delete("/api/contact/:id", async (req, res) => {
  const token = requireAuth(req, res)
  if (!token) return

  const id = Number(req.params.id)
  await ContactService.remove(id)
  return res.json({ success: true })
})

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist")
  app.use(express.static(distPath))
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"))
  })
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
