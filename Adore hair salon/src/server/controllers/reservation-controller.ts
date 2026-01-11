import { NextResponse, type NextRequest } from "next/server"
import { ReservationService } from "../services/reservation-service"

// Controller sloj: validacija + HTTP odgovori za Reservation resurs.
export class ReservationController {
  static async list(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    const reservations = await ReservationService.list()
    return NextResponse.json({ reservations })
  }

  static async getById(request: NextRequest, id: number) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    const reservation = await ReservationService.getById(id)
    if (!reservation) return NextResponse.json({ error: "Rezervacija nije pronađena" }, { status: 404 })

    return NextResponse.json({ reservation })
  }

  static async create(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    const body = await request.json()

    const required = ["client_name", "client_phone", "service", "appointment_date", "appointment_time"] as const
    for (const key of required) {
      if (!body[key]) return NextResponse.json({ error: "Sva obavezna polja moraju biti popunjena" }, { status: 400 })
    }

    const result = await ReservationService.create({
      client_name: body.client_name,
      client_email: body.client_email || null,
      client_phone: body.client_phone,
      service: body.service,
      appointment_date: body.appointment_date,
      appointment_time: body.appointment_time,
      duration_hours: body.duration_hours || 1,
      status: body.status || "pending",
      notes: body.notes || null,
    })

    return NextResponse.json(result)
  }

  static async update(request: NextRequest, id: number) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    const body = await request.json()

    await ReservationService.update(id, {
      client_name: body.client_name,
      client_email: body.client_email || null,
      client_phone: body.client_phone,
      service: body.service,
      appointment_date: body.appointment_date,
      appointment_time: body.appointment_time,
      duration_hours: body.duration_hours || 1,
      status: body.status || "pending",
      notes: body.notes || null,
    })

    return NextResponse.json({ success: true })
  }

  static async remove(request: NextRequest, id: number) {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })

    await ReservationService.remove(id)
    return NextResponse.json({ success: true })
  }
}

