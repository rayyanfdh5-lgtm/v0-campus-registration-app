import { RoleDemo } from "@/components/role-demo";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Aplikasi Pendaftaran Kampus
            </h1>
            <p className="text-sm text-muted-foreground">
              Sistem Penerimaan Mahasiswa Baru (PMB)
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Struktur Role Pengguna</h2>
          <p className="mt-1 text-muted-foreground">
            Sistem ini memiliki 6 role dengan hak akses yang berbeda untuk mengelola proses PMB
          </p>
        </div>

        <RoleDemo />
      </main>
    </div>
  );
}
