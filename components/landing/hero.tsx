"use client"

import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function Hero() {
  const [tourModal, setTourModal] = useState(false)

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-campus.png')" }}
        role="img"
        aria-label="Kampus Universitas Nusantara"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[oklch(0.20_0.06_250)/0.72]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.06_250)/0.85] via-[oklch(0.16_0.06_250)/0.5] to-transparent" />

      {/* Announcement Banner */}
      <div className="absolute top-20 inset-x-0 flex justify-center px-4">
        <Badge className="bg-accent/90 text-accent-foreground px-4 py-1.5 text-xs font-semibold shadow-lg">
          Pendaftaran PMB 2025/2026 Telah Dibuka — Batas Akhir 31 Agustus 2025
        </Badge>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Penerimaan Mahasiswa Baru 2025/2026
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-5">
            Wujudkan Impianmu Bersama{" "}
            <span className="text-accent">Universitas Nusantara</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
            Bergabunglah dengan lebih dari 25.000 mahasiswa aktif di 8 fakultas pilihan. Raih prestasi akademik terbaik dengan fasilitas modern dan dosen berpengalaman.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href="#jalur">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2">
                Daftar Sekarang <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <button
              onClick={() => setTourModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/20">
                <Play className="h-3.5 w-3.5 text-white fill-white" />
              </span>
              Virtual Tour Kampus
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: "25.000+", label: "Mahasiswa Aktif" },
              { value: "8", label: "Fakultas" },
              { value: "45+", label: "Program Studi" },
              { value: "92%", label: "Lulusan Terserap Kerja" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-accent font-bold text-2xl">{stat.value}</p>
                <p className="text-white/70 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center">
        <div className="flex flex-col items-center gap-1.5 animate-bounce">
          <div className="w-0.5 h-8 bg-white/30 rounded-full" />
          <p className="text-white/50 text-xs">Gulir ke bawah</p>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {tourModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setTourModal(false)}
        >
          <div
            className="relative bg-card rounded-xl overflow-hidden w-full max-w-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Virtual Tour Kampus</h3>
              <button
                onClick={() => setTourModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video">
              <img
                src="/images/virtual-tour.png"
                alt="Virtual Tour Kampus Universitas Nusantara"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-lg px-6 py-4 text-center">
                  <p className="text-white font-semibold mb-1">Virtual Tour 360°</p>
                  <p className="text-white/70 text-sm">Fitur virtual tour interaktif segera hadir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
