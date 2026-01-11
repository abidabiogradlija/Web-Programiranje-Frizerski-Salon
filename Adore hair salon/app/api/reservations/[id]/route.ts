import { type NextRequest } from "next/server"
import { ReservationController } from "@/src/server/controllers/reservation-controller"

// Controller entrypoint (Next.js route handler): delegira na MVC controller.

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return ReservationController.getById(request, Number(id))
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return ReservationController.update(request, Number(id))
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return ReservationController.remove(request, Number(id))
}
