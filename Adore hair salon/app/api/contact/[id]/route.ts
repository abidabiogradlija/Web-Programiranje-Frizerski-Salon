import { type NextRequest } from "next/server"
import { ContactController } from "@/src/server/controllers/contact-controller"

// Controller entrypoint (Next.js route handler): delegira na MVC controller.

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return ContactController.getById(request, Number(id))
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return ContactController.update(request, Number(id))
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return ContactController.remove(request, Number(id))
}
