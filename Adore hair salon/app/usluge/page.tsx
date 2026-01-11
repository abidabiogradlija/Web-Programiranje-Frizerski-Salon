import { Card } from "@/components/ui/card"

export default function UslugePage() {
  const services = [
    {
      category: "USLUGE",
      items: [
        { name: "Feniranje kratke kose", price: "20 KM" },
        { name: "Feniranje srednje kose", price: "25 KM" },
        { name: "Feniranje duge kose", price: "30 KM" },
        { name: "Šišanje + feniranje", price: "40 KM" },
        { name: "Pranje + šišanje + feniranje", price: "50 KM" },
        { name: "Uvijanje na figare", price: "25 KM" },
      ],
    },
    {
      category: "TRETMANI",
      items: [
        { name: "Fusio Dose + feniranje", description: "Intense repair treatment", price: "35 KM" },
        { name: "Fusio Dose – tretman", description: "Deep conditioning", price: "25 KM" },
      ],
    },
    {
      category: "FARBANJE",
      items: [
        { name: "Farbanje INOA kratka kosa", price: "50 KM" },
        { name: "Farbanje INOA srednja kosa", price: "60 KM" },
        { name: "Farbanje INOA duga kosa", price: "70 KM" },
        { name: "Preljev 35 fol + fen", description: "Colour melt technique", price: "145 KM" },
        { name: "Preljev 60 fol + fen", description: "Full head highlights", price: "180 KM" },
      ],
    },
    {
      category: "TRETMANI KOSE",
      items: [
        { name: "Olaplex Nο.0 - Nο.3", description: "Bond building treatment", price: "15 KM" },
        { name: "Olaplex kompletan tretman", description: "Complete bonding system", price: "100 KM" },
        { name: "Brazilian blowdry", description: "Keratin smoothing treatment", price: "300 KM" },
      ],
    },
    {
      category: "KERATINSKI TRETMANI",
      items: [
        { name: "Goldwell Kerasilk All-in-one tretman", description: "Complete smoothing system", price: "60 KM" },
        { name: "Goldwell Kerasilk Keratin tretman", description: "Intense keratin repair", price: "80 KM" },
      ],
    },
    {
      category: "ŠMINKANJE",
      items: [
        { name: "Profesionalno šminkanje", description: "Professional makeup application", price: "40 KM" },
        { name: "Svečano šminkanje", description: "Special occasion makeup", price: "60 KM" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6">
        <h1 className="mb-12 text-center text-5xl font-light tracking-wide">USLUGE</h1>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {services.map((section, i) => (
            <Card key={i} className="p-8">
              <h2 className="mb-6 border-b border-border pb-3 text-2xl font-medium">{section.category}</h2>
              <div className="space-y-4">
                {section.items.map((service, j) => (
                  <div key={j} className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{service.name}</p>
                      {service.description && <p className="text-sm text-muted-foreground">{service.description}</p>}
                    </div>
                    <p className="whitespace-nowrap font-semibold">{service.price}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
