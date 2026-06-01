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
import { Edit2, Trash2, Plus } from "lucide-react"

// Mock data
const mockGelombang = [
  { id: 1, nama: "Gelombang 1", status: "Aktif", mulai: "2024-06-01", selesai: "2024-07-15" },
  { id: 2, nama: "Gelombang 2", status: "Aktif", mulai: "2024-07-20", selesai: "2024-08-30" },
  { id: 3, nama: "Gelombang 3", status: "Selesai", mulai: "2024-09-01", selesai: "2024-10-15" },
]

const mockJalurMasuk = [
  { id: 1, nama: "SNBP", deskripsi: "Seleksi Nasional Berdasarkan Prestasi" },
  { id: 2, nama: "SNBT", deskripsi: "Seleksi Nasional Berbasis Tes" },
  { id: 3, nama: "Mandiri", deskripsi: "Seleksi Mandiri" },
  { id: 4, nama: "Prestasi", deskripsi: "Jalur Prestasi" },
  { id: 5, nama: "KIP-Kuliah", deskripsi: "KIP Kuliah" },
]

const mockKuota = [
  { id: 1, prodi: "Teknik Informatika", jalur: "SNBP", kuota: 50 },
  { id: 2, prodi: "Teknik Informatika", jalur: "SNBT", kuota: 100 },
  { id: 3, prodi: "Manajemen", jalur: "SNBP", kuota: 40 },
  { id: 4, prodi: "Manajemen", jalur: "Mandiri", kuota: 60 },
]

const mockTahunAkademik = [
  { id: 1, tahun: "2024/2025", status: "Aktif" },
  { id: 2, tahun: "2023/2024", status: "Selesai" },
  { id: 3, tahun: "2022/2023", status: "Selesai" },
]

export default function PMBManagement() {
  const [gelombang, setGelombang] = useState(mockGelombang)
  const [jalurMasuk, setJalurMasuk] = useState(mockJalurMasuk)
  const [kuota, setKuota] = useState(mockKuota)
  const [tahunAkademik, setTahunAkademik] = useState(mockTahunAkademik)

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold">Manajemen PMB</h1>
        <p className="text-sm text-muted-foreground">Kelola gelombang, jalur masuk, kuota, dan tahun akademik</p>
      </div>

      <Tabs defaultValue="gelombang" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gelombang">Gelombang</TabsTrigger>
          <TabsTrigger value="jalur">Jalur Masuk</TabsTrigger>
          <TabsTrigger value="kuota">Kuota</TabsTrigger>
          <TabsTrigger value="tahun">Tahun Akademik</TabsTrigger>
        </TabsList>

        {/* Gelombang Tab */}
        <TabsContent value="gelombang" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola gelombang pendaftaran</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Gelombang
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Gelombang Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nama Gelombang</Label>
                    <Input placeholder="Gelombang 4" />
                  </div>
                  <div>
                    <Label>Tanggal Mulai</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Tanggal Selesai</Label>
                    <Input type="date" />
                  </div>
                  <Button className="w-full">Simpan Gelombang</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Tanggal Mulai</TableHead>
                    <TableHead>Tanggal Selesai</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gelombang.map((g) => (
                    <TableRow key={g.id}>
                      <TableCell className="font-medium">{g.nama}</TableCell>
                      <TableCell>{g.mulai}</TableCell>
                      <TableCell>{g.selesai}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          g.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {g.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm"><Edit2 className="h-4 w-4" /></Button>
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

        {/* Jalur Masuk Tab */}
        <TabsContent value="jalur" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola jalur masuk</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Jalur
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Jalur Masuk Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nama Jalur</Label>
                    <Input placeholder="SNBP" />
                  </div>
                  <div>
                    <Label>Deskripsi</Label>
                    <Input placeholder="Deskripsi jalur masuk" />
                  </div>
                  <Button className="w-full">Simpan Jalur</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jalurMasuk.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="font-medium">{j.nama}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{j.deskripsi}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm"><Edit2 className="h-4 w-4" /></Button>
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

        {/* Kuota Tab */}
        <TabsContent value="kuota" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola kuota mahasiswa per prodi dan jalur</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Kuota
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Kuota Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Program Studi</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih prodi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ti">Teknik Informatika</SelectItem>
                        <SelectItem value="mn">Manajemen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Jalur Masuk</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jalur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="snbp">SNBP</SelectItem>
                        <SelectItem value="snbt">SNBT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Kuota</Label>
                    <Input type="number" placeholder="50" />
                  </div>
                  <Button className="w-full">Simpan Kuota</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program Studi</TableHead>
                    <TableHead>Jalur Masuk</TableHead>
                    <TableHead>Kuota</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kuota.map((k) => (
                    <TableRow key={k.id}>
                      <TableCell className="font-medium">{k.prodi}</TableCell>
                      <TableCell>{k.jalur}</TableCell>
                      <TableCell>{k.kuota}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm"><Edit2 className="h-4 w-4" /></Button>
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

        {/* Tahun Akademik Tab */}
        <TabsContent value="tahun" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola tahun akademik</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Tahun
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Tahun Akademik Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Tahun Akademik</Label>
                    <Input placeholder="2025/2026" />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Simpan Tahun</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tahun Akademik</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tahunAkademik.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.tahun}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          t.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {t.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm"><Edit2 className="h-4 w-4" /></Button>
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
      </Tabs>
    </div>
  )
}
