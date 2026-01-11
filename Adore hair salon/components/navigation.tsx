"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin") || pathname === "/login") {
    return null
  }

  const links = [
    { href: "/usluge", label: "USLUGE" },
    { href: "/proizvodi", label: "PROIZVODI" },
  ]

  const rightLinks = [
    { href: "/kontakt", label: "KONTAKT" },
    { href: "/login", label: "PROFIL", icon: User },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wider transition-colors hover:text-foreground ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-serif text-3xl font-light tracking-[0.2em]">adore</span>
        </Link>

        <div className="flex items-center gap-8">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wider transition-colors hover:text-foreground ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.icon && <link.icon className="inline-block h-4 w-4" />}
              {!link.icon && link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
