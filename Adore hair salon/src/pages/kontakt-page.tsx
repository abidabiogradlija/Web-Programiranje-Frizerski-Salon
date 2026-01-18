import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"

export default function KontaktPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Poruka poslana",
          description: "Vaša poruka je uspješno poslana. Odgovorit ćemo vam uskoro.",
        })
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom slanja poruke. Pokušajte ponovo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[500px] w-full overflow-hidden bg-muted">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2865.2367956225535!2d17.87460561177114!3d44.099105723356494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475f19ffcb4bce01%3A0xf97566345dd00435!2sAdore%20HAIR%20SALON!5e0!3m2!1sbs!2sba!4v1768072993787!5m2!1sbs!2sba"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ADORE Salon Location"
        />
      </div>

      <div className="container mx-auto px-6 py-16">
        <h1 className="mb-12 text-center text-5xl font-light tracking-wide">KONTAKT</h1>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="mb-6 text-2xl font-medium">Kontakt informacije</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="mb-1 font-medium">Adresa</h3>
                    <p className="text-pretty text-sm text-muted-foreground">
                      Branitelja domovine, Busovača
                      <br />
                      72260 Busovača, BiH
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="mb-1 font-medium">Telefon</h3>
                    <p className="text-sm text-muted-foreground">+387 63 493 685</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="mb-1 font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">info@adoresalon.ba</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="mb-1 font-medium">Radno vrijeme</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Ponedjeljak - Subota: 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="mb-6 text-2xl font-medium">Pratite nas</h2>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/adore.hairsalon/?hl=hr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="text-sm">@adoresalon</span>
                </a>
                <a
                  href="https://www.facebook.com/adore.hairsalon1/?locale=hr_HR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="text-sm">ADORE Salon</span>
                </a>
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="mb-6 text-2xl font-medium">Pošaljite nam poruku</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ime i prezime *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Vaše ime i prezime"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="vas.email@primjer.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+387 61 234 567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Poruka *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Vaša poruka..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Šaljem..." : "Pošalji poruku"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
