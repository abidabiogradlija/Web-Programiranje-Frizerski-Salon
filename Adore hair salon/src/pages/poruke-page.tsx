import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Mail, Trash2, Check } from "lucide-react"
import { format } from "date-fns"
import { sr } from "date-fns/locale"

interface Message {
  id: number
  name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
}

export default function PorukePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact")
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error("Fetch messages error:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: number) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_read: true }),
      })

      if (response.ok) {
        setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg)))
        toast({ title: "Poruka označena kao pročitana" })
      } else {
        const data = await response.json().catch(() => null)
        toast({
          title: "Greška",
          description: data?.error ?? "Nije moguće ažurirati poruku",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({ title: "Greška", description: "Nije moguće ažurirati poruku", variant: "destructive" })
    }
  }

  const deleteMessage = async (id: number) => {
    if (!confirm("Da li ste sigurni da želite obrisati ovu poruku?")) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id))
        toast({ title: "Poruka obrisana" })
      }
    } catch (error) {
      toast({ title: "Greška", description: "Nije moguće obrisati poruku", variant: "destructive" })
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  if (loading) {
    return <div className="text-center text-muted-foreground">Učitavanje poruka...</div>
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-light tracking-wide">Kontakt poruke</h1>
        <Badge variant="secondary" className="text-base">
          {messages.filter((m) => !m.is_read).length} nepročitanih
        </Badge>
      </div>

      {messages.length === 0 ? (
        <Card className="p-12 text-center">
          <Mail className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Nemate poruka</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`p-6 ${!message.is_read ? "border-l-4 border-l-primary" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-xl font-medium">{message.name}</h3>
                    {!message.is_read && <Badge variant="default">Nova</Badge>}
                  </div>

                  <div className="mb-3 space-y-1 text-sm text-muted-foreground">
                    <p>
                      <strong>Email:</strong> {message.email}
                    </p>
                    {message.phone && (
                      <p>
                        <strong>Telefon:</strong> {message.phone}
                      </p>
                    )}
                    <p>
                      <strong>Datum:</strong>{" "}
                      {format(new Date(message.created_at), "dd.MM.yyyy. HH:mm", { locale: sr })}
                    </p>
                  </div>

                  <div className="rounded bg-muted p-4">
                    <p className="text-pretty leading-relaxed">{message.message}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {!message.is_read && (
                    <Button variant="outline" size="sm" onClick={() => markAsRead(message.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => deleteMessage(message.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
