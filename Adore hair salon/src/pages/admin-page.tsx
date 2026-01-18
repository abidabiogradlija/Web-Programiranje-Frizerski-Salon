import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { MessageSquare, Calendar } from "lucide-react"

export default function AdminPage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-light tracking-wide">Admin Panel</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Link to="/admin/poruke">
          <Card className="p-8 transition-all hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-medium">Poruke</h2>
                <p className="text-sm text-muted-foreground">Pregledajte kontakt poruke</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/admin/rezervacije">
          <Card className="p-8 transition-all hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-medium">Rezervacije</h2>
                <p className="text-sm text-muted-foreground">Upravljajte terminima</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}
