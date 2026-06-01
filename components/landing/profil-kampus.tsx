import { Award, BookOpen, Users, Globe } from "lucide-react"

const KEUNGGULAN = [
  {
    icon: Award,
    title: "Terakreditasi A",
    desc: "Seluruh program studi telah terakreditasi BAN-PT dengan nilai unggul dan terpercaya.",
  },
  {
    icon: BookOpen,
    title: "Kurikulum Modern",
    desc: "Kurikulum berbasis OBE (Outcome-Based Education) disesuaikan dengan kebutuhan industri.",
  },
  {
    icon: Users,
    title: "Dosen Berpengalaman",
    desc: "Lebih dari 400 dosen aktif, 70% bergelar Doktor dari universitas dalam dan luar negeri.",
  },
  {
    icon: Globe,
    title: "Kemitraan Internasional",
    desc: "Kerja sama dengan 80+ universitas dan perusahaan global untuk pertukaran mahasiswa dan riset.",
  },
]

export function ProfilKampus() {
  return (
    <section id="profil" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="/images/campus-profile.png"
                alt="Pimpinan dan civitas akademika Universitas Nusantara"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-4 bg-primary text-primary-foreground rounded-xl px-5 py-3 shadow-lg hidden sm:block">
              <p className="text-2xl font-bold">35+</p>
              <p className="text-xs text-primary-foreground/80">Tahun Berdiri</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Tentang Kami
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight text-balance mb-5">
              Membentuk Generasi Unggul untuk Indonesia
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Universitas Nusantara berdiri sejak 1990 dengan komitmen penuh menghasilkan lulusan berkompeten, berintegritas, dan berdaya saing global. Berlokasi strategis di jantung kota, kampus kami dilengkapi fasilitas bertaraf internasional.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Kami percaya bahwa setiap mahasiswa memiliki potensi luar biasa. Dengan pendekatan pembelajaran inovatif dan lingkungan akademik yang kondusif, kami membantu setiap mahasiswa meraih pencapaian tertinggi mereka.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {KEUNGGULAN.map((item) => (
                <div key={item.title} className="flex gap-3 p-4 rounded-xl bg-secondary border border-border">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
