import { type NextRequest } from "next/server"
import { ContactController } from "@/src/server/controllers/contact-controller"

// Controller entrypoint (Next.js route handler): delegira na MVC controller.

export async function POST(request: NextRequest) {
  return ContactController.create(request)
}

export async function GET(request: NextRequest) {
  return ContactController.list(request)
}
