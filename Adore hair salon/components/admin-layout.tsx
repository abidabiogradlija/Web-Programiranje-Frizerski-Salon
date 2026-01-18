import type React from "react"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/utils/use-auth"
import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Učitavanje...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 hover:opacity-80">
              <span className="font-serif text-2xl font-light tracking-wider">adore</span>
              <span className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground">ADMIN</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Prijavljeni kao: {user.username}</span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Početna
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Odjavi se
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">{children}</div>
    </div>
  )
}
