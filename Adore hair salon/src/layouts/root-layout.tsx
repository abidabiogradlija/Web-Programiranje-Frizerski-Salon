import { Outlet } from "react-router-dom"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout() {
  return (
    <div className="font-sans antialiased">
      <Navigation />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
