import pool from "../../../utils/db"
import type { Reservation } from "../models/reservation"

// Service sloj: sav rad sa bazom za reservations.
export class ReservationService {
  static async list(): Promise<Reservation[]> {
    const query =
      "SELECT id, client_name, client_email, client_phone, service, DATE_FORMAT(appointment_date, '%Y-%m-%d') as appointment_date, appointment_time, duration_hours, status, notes, created_at, updated_at FROM reservations ORDER BY appointment_date, appointment_time"
    const [rows] = await pool.execute(query)
    return rows as Reservation[]
  }

  static async getById(id: number): Promise<Reservation | null> {
    const [rows] = await pool.execute(
      "SELECT id, client_name, client_email, client_phone, service, DATE_FORMAT(appointment_date, '%Y-%m-%d') as appointment_date, appointment_time, duration_hours, status, notes, created_at, updated_at FROM reservations WHERE id = ? LIMIT 1",
      [id],
    )
    const list = rows as Reservation[]
    return list[0] ?? null
  }

  static async create(input: Omit<Reservation, "id" | "created_at" | "updated_at">) {
    const [result] = await pool.execute(
      "INSERT INTO reservations (client_name, client_email, client_phone, service, appointment_date, appointment_time, duration_hours, status, notes) VALUES (?, ?, ?, ?, DATE(?), ?, ?, ?, ?)",
      [
        input.client_name,
        input.client_email || null,
        input.client_phone,
        input.service,
        input.appointment_date,
        input.appointment_time,
        input.duration_hours || 1,
        input.status || "pending",
        input.notes || null,
      ],
    )

    return { success: true, id: (result as any).insertId as number }
  }

  static async update(id: number, input: Partial<Omit<Reservation, "id" | "created_at" | "updated_at">>) {
    await pool.execute(
      "UPDATE reservations SET client_name = ?, client_email = ?, client_phone = ?, service = ?, appointment_date = ?, appointment_time = ?, duration_hours = ?, status = ?, notes = ? WHERE id = ?",
      [
        input.client_name,
        input.client_email || null,
        input.client_phone,
        input.service,
        input.appointment_date,
        input.appointment_time,
        input.duration_hours || 1,
        input.status || "pending",
        input.notes || null,
        id,
      ],
    )

    return { success: true }
  }

  static async remove(id: number) {
    await pool.execute("DELETE FROM reservations WHERE id = ?", [id])
    return { success: true }
  }
}
