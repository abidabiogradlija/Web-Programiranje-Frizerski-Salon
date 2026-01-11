"use client"

import { Instagram, Facebook } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin") || pathname === "/login") {
    return null
  }

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-6">
          <Link
            href="https://www.instagram.com/adore.hairsalon?igsh=ODBiZnloMmNrdWpz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.facebook.com/adore.hairsalon1/?locale=hr_HR"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Facebook className="h-5 w-5" />
          </Link>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Naš tim stručnih frizera posvećen je vašim
          željama i potrebama, pružajući vam
          personalizirane tretmane koji ističu vašu
          prirodnu ljepotu.
        </p>
      </div>
    </footer>
  )
}
