// Model: Reservation (tabela `reservations`)
// Ovaj fajl predstavlja "Model" sloj u MVC arhitekturi.

export type ReservationStatus = "pending" | "confirmed" | "completed" | "cancelled"

export interface Reservation {
  id: number
  client_name: string
  client_email: string | null
  client_phone: string
  service: string
  /** format: YYYY-MM-DD */
  appointment_date: string
  /** format: HH:mm:ss */
  appointment_time: string
  duration_hours: number
  status: ReservationStatus
  notes: string | null
  created_at: string
  updated_at?: string
}

