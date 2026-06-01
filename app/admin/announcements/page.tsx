"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, MessageSquare, Send, Eye, Trash2, Plus } from "lucide-react"

// Mock data
const mockPengumuman = [
  {
    id: 1,
    judul: "Hasil Pengumuman Gelombang 1",
    konten: "Hasil seleksi administrasi gelombang 1 telah diumumkan...",
    tanggal: "2024-06-10",
    status: "Dipublikasikan",
  },
  {
    id: 2,
    judul: "Pembukaan Gelombang 2",
    konten: "Pendaftaran gelombang 2 dibuka mulai 15 Juni...",
    tanggal: "2024-06-12",
    status: "Terjadwal",
  },
]

const mockEmail = [
  {
    id: 1,
    penerima: "750 Pendaftar",
    subjek: "Hasil Seleksi Administrasi",
    tanggal: "2024-06-10",
    status: "Terkirim",
  },
  {
    id: 2,
    penerima: "1000 Pendaftar",
    subjek: "Pengingat Pengumpulan Dokumen",
    tanggal: "2024-06-05",
    status: "Terkirim",
  },
]

const mockWhatsApp = [
  {
    id: 1,
    penerima: "750 Pendaftar",
    pesan: "Hasil seleksi administrasi telah diumumkan. Cek portal PMB Anda.",
    tanggal: "2024-06-10",
    status: "Terkirim",
  },
]

const mockNotifikasi = [
  { id: 1, jenis: "Email", pesan: "Hasil pengumuman gelombang 1", waktu: "2024-06-10 14:30" },
  { id: 2, jenis: "WhatsApp", pesan: "Pengingat pembayaran", waktu: "2024-06-09 10:00" },
  { id: 3, jenis: "Email", pesan: "Jadwal ujian dipublikasikan", waktu: "2024-06-08 09:15" },
]

export default function AnnouncementsPage() {
  const [pengumuman, setPengumuman] = useState(mockPengumuman)
  const [email, setEmail] = useState(mockEmail)
  const [whatsapp, setWhatsApp] = useState(mockWhatsApp)
  const [notifikasi, setNotifikasi] = useState(mockNotifikasi)

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold">Pengumuman & Broadcast</h1>
        <p className="text-sm text-muted-foreground">Kelola pengumuman, broadcast email/WhatsApp, dan notifikasi</p>
      </div>

      <Tabs defaultValue="pengumuman" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pengumuman">Pengumuman</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
        </TabsList>

        {/* Pengumuman Tab */}
        <TabsContent value="pengumuman" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola pengumuman untuk pendaftar</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Buat Pengumuman
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Buat Pengumuman Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div>
                    <Label>Judul Pengumuman</Label>
                    <Input placeholder="Masukkan judul pengumuman" />
                  </div>
                  <div>
                    <Label>Konten</Label>
                    <Textarea placeholder="Masukkan konten pengumuman..." rows={5} />
                  </div>
                  <div>
                    <Label>Jadwal Publikasi</Label>
                    <Input type="datetime-local" />
                  </div>
                  <div>
                    <Label>Kategori</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hasil">Hasil Seleksi</SelectItem>
                        <SelectItem value="jadwal">Jadwal Ujian</SelectItem>
                        <SelectItem value="pengingat">Pengingat</SelectItem>
                        <SelectItem value="umum">Umum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">Simpan Draf</Button>
                    <Button className="flex-1">Publikasikan Sekarang</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pengumuman.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{p.judul}</div>
                          <div className="text-sm text-muted-foreground truncate">{p.konten}</div>
                        </div>
                      </TableCell>
                      <TableCell>{p.tanggal}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          p.status === "Dipublikasikan" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {p.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Broadcast email ke pendaftar</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Kirim Email
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Broadcast Email</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div>
                    <Label>Tujuan Pengiriman</Label>
                    <div className="space-y-2 border rounded p-3 max-h-40 overflow-y-auto">
                      {[
                        "Semua Pendaftar",
                        "Pendaftar Gelombang 1",
                        "Pendaftar Gelombang 2",
                        "Verifikasi Lolos",
                        "Pembayaran Terverifikasi",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <Checkbox />
                          <label className="text-sm cursor-pointer">{item}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Subjek Email</Label>
                    <Input placeholder="Masukkan subjek email" />
                  </div>
                  <div>
                    <Label>Konten Email</Label>
                    <Textarea placeholder="Masukkan konten email..." rows={5} />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">Simpan Draf</Button>
                    <Button className="flex-1" className="gap-2">
                      <Send className="h-4 w-4" />
                      Kirim Sekarang
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Penerima</TableHead>
                    <TableHead>Subjek</TableHead>
                    <TableHead>Tanggal Kirim</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {email.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{e.penerima}</TableCell>
                      <TableCell>{e.subjek}</TableCell>
                      <TableCell>{e.tanggal}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {e.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp Tab */}
        <TabsContent value="whatsapp" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Broadcast WhatsApp ke pendaftar</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Kirim WhatsApp
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Broadcast WhatsApp</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div>
                    <Label>Tujuan Pengiriman</Label>
                    <div className="space-y-2 border rounded p-3 max-h-40 overflow-y-auto">
                      {[
                        "Semua Pendaftar",
                        "Pendaftar Gelombang 1",
                        "Pendaftar Gelombang 2",
                        "Verifikasi Lolos",
                        "Pembayaran Terverifikasi",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <Checkbox />
                          <label className="text-sm cursor-pointer">{item}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Pesan WhatsApp</Label>
                    <Textarea placeholder="Masukkan pesan WhatsApp..." rows={4} />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">Simpan Draf</Button>
                    <Button className="flex-1" className="gap-2">
                      <Send className="h-4 w-4" />
                      Kirim Sekarang
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Penerima</TableHead>
                    <TableHead>Pesan</TableHead>
                    <TableHead>Tanggal Kirim</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whatsapp.map((w) => (
                    <TableRow key={w.id}>
                      <TableCell className="font-medium">{w.penerima}</TableCell>
                      <TableCell className="max-w-sm truncate">{w.pesan}</TableCell>
                      <TableCell>{w.tanggal}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {w.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifikasi Tab */}
        <TabsContent value="notifikasi" className="space-y-4">
          <CardDescription>Log notifikasi yang telah dikirim</CardDescription>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Pesan</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifikasi.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          n.jenis === "Email" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}>
                          {n.jenis}
                        </span>
                      </TableCell>
                      <TableCell>{n.pesan}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{n.waktu}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
