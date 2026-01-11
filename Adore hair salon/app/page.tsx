import Image from "next/image"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const teamMembers = [
    {
      name: "Aida Saračević",
      bio: "Uvijek živim, radujem se i djelujem iz srca jer sam sigurna da će se sve dobro u životu vratiti. Stručnost u salonu nadopunjujem prijateljstvom s mojom redovnom klijentelom.\n",
    },
  ]

  const galleryImages = [
    { src: "/salon3.jpg", alt: "Salon interior 1" },
    { src: "/salon2.jpg", alt: "Salon interior 2" },
  ]

  const hairstyleImages = [
    "/f1.jpg",
    "/f2.jpg",
    "/f3.jpg",
    "/f4.jpg",
    "/f5.jpg",
    "/f6.jpg",
    "/f7.jpg",
    "/f8.jpg",
    "/f9.jpg",
  ]

  return (
    <div className="flex flex-col">
      <section className="relative h-[600px] overflow-hidden bg-muted">
        <Image
          src="/pozadina5.jpg"
          alt="ADORE Salon Team"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="mb-8 max-w-4xl text-balance px-6 text-5xl font-light leading-tight tracking-wide text-foreground md:text-6xl">
            DOBRODOŠLI U NAŠ FRIZERSKI SALON – MJESTO GDJE VAŠA LJEPOTA DOBIJA NOVU DIMENZIJU.
          </h1>
        </div>
      </section>

      <section className="border-b border-border bg-background py-12">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Rad od ponedjeljka do subote između 9:00h i 18:00h. Dobrodošli u naš frizerski salon mjesto gdje Vašu ljepotu
            bojimo potencijom novih dimenzija, nađite najbolje frizere i doživite najbolji frizerski tretman.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-4xl font-light tracking-wide">NAŠ TIM</h2>
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
            <div className="flex justify-center">
              <Image
                  src="/owner2.jpg"
                  alt="ADORE Team"
                  width={350}
                  height={400}
                  className="rounded-lg object-cover"
              />
            </div>

            {teamMembers.map((member, i) => (
                <Card key={i} className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
                    <Image
                        src="/owner.jpg"
                        alt={member.name}
                        width={128}
                        height={128}
                        className="object-cover"
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-medium">{member.name}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </Card>
            ))}
            <div className="flex justify-center">
              <Image
                  src="/tim.jpg"
                  alt="ADORE Team"
                  width={350}
                  height={400}
                  className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-center text-3xl font-light tracking-wide">GALERIJA</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {galleryImages.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg">
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-center text-3xl font-light tracking-wide">FRIZURE</h2>
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {hairstyleImages.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-lg">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Hairstyle ${i + 1}`}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
