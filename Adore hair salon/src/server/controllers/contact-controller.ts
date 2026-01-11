import { NextResponse, type NextRequest } from "next/server"
import { ContactService } from "../services/contact-service"

// Controller sloj: validacija + HTTP odgovori za ContactMessage resurs.
export class ContactController {
  static async create(request: NextRequest) {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Ime, email i poruka su obavezni" }, { status: 400 })
    }

    await ContactService.create({ name, email, phone, message })
    return NextResponse.json({ success: true })
  }

  static async list(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    const messages = await ContactService.list()
    return NextResponse.json({ messages })
  }

  static async getById(request: NextRequest, id: number) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    const message = await ContactService.getById(id)
    if (!message) return NextResponse.json({ error: "Poruka nije pronađena" }, { status: 404 })

    return NextResponse.json({ message })
  }

  static async update(request: NextRequest, id: number) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    const body = await request.json().catch(() => ({}))
    const is_read = typeof body.is_read === "boolean" ? body.is_read : true

    await ContactService.update(id, { is_read })
    return NextResponse.json({ success: true })
  }

  static async remove(request: NextRequest, id: number) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    await ContactService.remove(id)
    return NextResponse.json({ success: true })
  }
}

