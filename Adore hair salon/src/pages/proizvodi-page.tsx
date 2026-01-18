import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const productPages = [
  [
    {
      name: "Kérastase Genesis Bain Nutri-Fortifiant",
      description: "Šampon za kosu sklonu opadanju",
      price: "50 KM",
      image: "/slika1.jpg",
    },
    {
      name: "Kérastase Genesis Fondant Renforcateur",
      description: "Balzam za jačanje kose",
      price: "55 KM",
      image: "/slika2.jpg",
    },
    {
      name: "Kérastase Genesis Serum Fortifiant",
      description: "Serum protiv opadanja kose",
      price: "80 KM",
      image: "/slika3.jpg",
    },
    {
      name: "Kérastase Resistance Bain Force",
      description: "Shampoo za oštećenu kosu",
      price: "48 KM",
      image: "/slika4.jpg",
    },
    {
      name: "Kérastase Resistance Masque",
      description: "Maska za dubinsku njegu",
      price: "75 KM",
      image: "/slika5.jpg",
    },
    {
      name: "Kérastase Elixir Ultime",
      description: "Ulje za sve tipove kose",
      price: "85 KM",
      image: "/slika6.jpg",
    },
    {
      name: "Kérastase Blond Absolu Bain",
      description: "Ljubičasti shampoo za plavu kosu",
      price: "52 KM",
      image: "/slika7.jpg",
    },
    {
      name: "Kérastase Blond Absolu Cicaflash",
      description: "Intenzivni tretman za plavu kosu",
      price: "70 KM",
      image: "/slika8.jpg",
    },
    {
      name: "Kérastase Nutritive Lait Vital",
      description: "Balzam za normalnu do suhu kosu",
      price: "60 KM",
      image: "/slika9.jpg",
    },
  ],
  [
    {
      name: "Kérastase Discipline Bain Fluidealiste",
      description: "Shampoo za neposlušnu kosu",
      price: "50 KM",
      image: "/slika10.jpg",
    },
    {
      name: "Kérastase Discipline Fondant",
      description: "Balzam za glatkost kose",
      price: "55 KM",
      image: "/slika11.jpg",
    },
    {
      name: "Kérastase Discipline Keratine",
      description: "Tretman sa keratinom",
      price: "90 KM",
      image: "/slika12.jpg",
    },
    {
      name: "Kérastase Specifique Bain Prevention",
      description: "Preventivni shampoo",
      price: "48 KM",
      image: "/slika13.jpg",
    },
    {
      name: "Kérastase Densifique Serum",
      description: "Serum za gustinu kose",
      price: "95 KM",
      image: "/slika14.jpg",
    },
    {
      name: "Kérastase Chronologiste Bain",
      description: "Revitalizirajući shampoo",
      price: "65 KM",
      image: "/slika15.jpg",
    },
    {
      name: "Kérastase Paris Bain Hydra Fortifiant REFILL",
      description: "Šampon",
      price: "95 KM",
      image: "/slika16.jpg",
    },
    {
      name: "Kérastase Paris Bain Lumière Kupka REFILL",
      description: "Šampon",
      price: "95 KM",
      image: "/slika17.jpg",
    },
    {
      name: "Kérastase Paris Force Achitecte Kupka REFILL",
      description: "Šampon",
      price: "95 KM",
      image: "/slika18.jpg",
    },
  ],
]

export default function ProizvodiPage() {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex items-center justify-center gap-4">
          <h1 className="text-center text-5xl font-light tracking-wide">PROIZVODI</h1>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {productPages[currentPage].map((product, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square bg-muted">
                  <img
                    src={product.image || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-balance text-lg font-medium leading-tight">{product.name}</h3>
                  <p className="mb-3 text-pretty text-sm text-muted-foreground">{product.description}</p>
                  <p className="text-xl font-semibold">{product.price}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {productPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === currentPage ? "bg-foreground" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(productPages.length - 1, currentPage + 1))}
              disabled={currentPage === productPages.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
