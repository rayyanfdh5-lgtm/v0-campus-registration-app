"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GraduationCap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Profil Kampus", href: "#profil" },
  { label: "Fakultas & Prodi", href: "#fakultas" },
  { label: "Biaya Kuliah", href: "#biaya" },
  { label: "Jalur Masuk", href: "#jalur" },
  { label: "Jadwal PMB", href: "#jadwal" },
  { label: "Berita", href: "#berita" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className={cn("text-sm font-bold leading-tight", scrolled ? "text-foreground" : "text-white")}>
                Universitas Nusantara
              </p>
              <p className={cn("text-xs leading-tight", scrolled ? "text-muted-foreground" : "text-white/70")}>
                PMB 2025/2026
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-primary/10",
                  scrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20info%20PMB"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button
                size="sm"
                variant={scrolled ? "outline" : "ghost"}
                className={cn(!scrolled && "border-white/40 text-white hover:bg-white/10")}
              >
                Hubungi Kami
              </Button>
            </a>
            <a href="#jalur">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Daftar Sekarang
              </Button>
            </a>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X className={cn("h-5 w-5", scrolled ? "text-foreground" : "text-white")} />
                : <Menu className={cn("h-5 w-5", scrolled ? "text-foreground" : "text-white")} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20info%20PMB"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1"
            >
              <Button variant="outline" size="sm" className="w-full">
                Hubungi via WhatsApp
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
