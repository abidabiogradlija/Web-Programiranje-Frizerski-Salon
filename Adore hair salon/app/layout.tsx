import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "ADORE – Frizerski Salon",
  description:
      "Dobrodošli u naš frizerski salon gdje Vašu ljepotu bojimo potencijom novih dimenzija",
  icons: {
    icon: [
      { url: "/ikona.png", media: "(prefers-color-scheme: light)" },
      { url: "/ikona.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/ikona.png",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bs">
      <body className={`${_playfair.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />

      </body>
    </html>
  )
}
