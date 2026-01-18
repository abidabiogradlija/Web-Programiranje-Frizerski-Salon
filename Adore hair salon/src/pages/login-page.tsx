import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Uspješna prijava",
          description: `Dobrodošli, ${data.user.username}!`,
        })
        navigate("/admin")
      } else {
        toast({
          title: "Greška",
          description: data.error || "Pogrešno korisničko ime ili lozinka",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom prijave. Pokušajte ponovo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <Card className="w-full max-w-md p-8">
        <div className="mb-4">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)} disabled={loading}>
            Nazad
          </Button>
        </div>

        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-light tracking-wide">Admin prijava</h1>
          <p className="mt-2 text-sm text-muted-foreground">Prijavite se za pristup admin panelu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Korisničko ime</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Unesite korisničko ime"
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Lozinka</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Unesite lozinku"
              required
              autoComplete="new-password"
              name="password_fake"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Prijava u toku..." : "Prijavi se"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">Ova stranica je dostupna samo za administratore salona ADORE</p>
        </div>
      </Card>
    </div>
  )
}
