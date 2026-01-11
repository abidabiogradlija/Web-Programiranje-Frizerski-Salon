import { type NextRequest } from "next/server"
import { ReservationController } from "@/src/server/controllers/reservation-controller"

// Controller entrypoint (Next.js route handler): delegira na MVC controller.

export async function GET(request: NextRequest) {
  return ReservationController.list(request)
}

export async function POST(request: NextRequest) {
  return ReservationController.create(request)
}
