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
import { Edit2, Trash2, Plus, Eye } from "lucide-react"

// Mock exam data
const mockSoalCBT = [
  {
    id: 1,
    no: 1,
    pertanyaan: "Apa ibu kota Indonesia?",
    opsiA: "Jakarta",
    opsiB: "Bandung",
    opsiC: "Yogyakarta",
    opsiD: "Surabaya",
    jawaban: "A",
    kategori: "Pengetahuan Umum",
  },
  {
    id: 2,
    no: 2,
    pertanyaan: "Berapa hasil dari 15 + 25?",
    opsiA: "30",
    opsiB: "35",
    opsiC: "40",
    opsiD: "45",
    jawaban: "C",
    kategori: "Matematika",
  },
]

const mockJadwalUjian = [
  {
    id: 1,
    gelombang: "Gelombang 1",
    tanggal: "2024-06-15",
    jamMulai: "08:00",
    jamSelesai: "11:00",
    lokasi: "Lab Komputer A",
    peserta: 45,
  },
  {
    id: 2,
    gelombang: "Gelombang 1",
    tanggal: "2024-06-16",
    jamMulai: "13:00",
    jamSelesai: "16:00",
    lokasi: "Lab Komputer B",
    peserta: 38,
  },
]

const mockRuangUjian = [
  { id: 1, nama: "Lab Komputer A", kapasitas: 50, status: "Tersedia" },
  { id: 2, nama: "Lab Komputer B", kapasitas: 45, status: "Tersedia" },
  { id: 3, nama: "Lab Komputer C", kapasitas: 40, status: "Pemeliharaan" },
]

const mockPengawas = [
  { id: 1, nama: "Dr. Budi Hartono", nip: "19700101", ruang: "Lab Komputer A", status: "Aktif" },
  { id: 2, nama: "Ir. Siti Nurhaliza", nip: "19750615", ruang: "Lab Komputer B", status: "Aktif" },
  { id: 3, nama: "Prof. Ahmad Wijaya", nip: "19650320", ruang: "Lab Komputer C", status: "Cuti" },
]

export default function ExamManagement() {
  const [soal, setSoal] = useState(mockSoalCBT)
  const [jadwal, setJadwal] = useState(mockJadwalUjian)
  const [ruang, setRuang] = useState(mockRuangUjian)
  const [pengawas, setPengawas] = useState(mockPengawas)

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold">Manajemen Ujian</h1>
        <p className="text-sm text-muted-foreground">Kelola soal CBT, jadwal ujian, ruang, dan pengawas</p>
      </div>

      <Tabs defaultValue="soal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="soal">Soal CBT</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal Ujian</TabsTrigger>
          <TabsTrigger value="ruang">Ruang Ujian</TabsTrigger>
          <TabsTrigger value="pengawas">Pengawas</TabsTrigger>
        </TabsList>

        {/* Soal CBT Tab */}
        <TabsContent value="soal" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola bank soal ujian CBT</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Soal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tambah Soal Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div>
                    <Label>Kategori Soal</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="umum">Pengetahuan Umum</SelectItem>
                        <SelectItem value="mat">Matematika</SelectItem>
                        <SelectItem value="ing">Bahasa Inggris</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Pertanyaan</Label>
                    <Textarea placeholder="Masukkan pertanyaan..." rows={3} />
                  </div>
                  <div>
                    <Label>Opsi A</Label>
                    <Input placeholder="Masukkan opsi A" />
                  </div>
                  <div>
                    <Label>Opsi B</Label>
                    <Input placeholder="Masukkan opsi B" />
                  </div>
                  <div>
                    <Label>Opsi C</Label>
                    <Input placeholder="Masukkan opsi C" />
                  </div>
                  <div>
                    <Label>Opsi D</Label>
                    <Input placeholder="Masukkan opsi D" />
                  </div>
                  <div>
                    <Label>Jawaban Benar</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jawaban" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">A</SelectItem>
                        <SelectItem value="b">B</SelectItem>
                        <SelectItem value="c">C</SelectItem>
                        <SelectItem value="d">D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Simpan Soal</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Pertanyaan</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Jawaban</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {soal.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.no}</TableCell>
                      <TableCell className="max-w-sm truncate">{s.pertanyaan}</TableCell>
                      <TableCell>{s.kategori}</TableCell>
                      <TableCell className="font-bold">{s.jawaban}</TableCell>
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

        {/* Jadwal Ujian Tab */}
        <TabsContent value="jadwal" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola jadwal ujian untuk setiap gelombang</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Jadwal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Jadwal Ujian Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Gelombang</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih gelombang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g1">Gelombang 1</SelectItem>
                        <SelectItem value="g2">Gelombang 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Tanggal Ujian</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Jam Mulai</Label>
                    <Input type="time" />
                  </div>
                  <div>
                    <Label>Jam Selesai</Label>
                    <Input type="time" />
                  </div>
                  <div>
                    <Label>Lokasi/Ruang</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih ruang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab-a">Lab Komputer A</SelectItem>
                        <SelectItem value="lab-b">Lab Komputer B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Simpan Jadwal</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gelombang</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Peserta</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jadwal.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="font-medium">{j.gelombang}</TableCell>
                      <TableCell>{j.tanggal}</TableCell>
                      <TableCell>{j.jamMulai} - {j.jamSelesai}</TableCell>
                      <TableCell>{j.lokasi}</TableCell>
                      <TableCell>{j.peserta} orang</TableCell>
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

        {/* Ruang Ujian Tab */}
        <TabsContent value="ruang" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola ruang ujian dan kapasitasnya</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Ruang
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Ruang Ujian Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nama Ruang</Label>
                    <Input placeholder="Lab Komputer D" />
                  </div>
                  <div>
                    <Label>Kapasitas</Label>
                    <Input type="number" placeholder="50" />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tersedia">Tersedia</SelectItem>
                        <SelectItem value="pemeliharaan">Pemeliharaan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Simpan Ruang</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Ruang</TableHead>
                    <TableHead>Kapasitas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ruang.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.nama}</TableCell>
                      <TableCell>{r.kapasitas} orang</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          r.status === "Tersedia" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {r.status}
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

        {/* Pengawas Tab */}
        <TabsContent value="pengawas" className="space-y-4">
          <div className="flex justify-between items-center">
            <CardDescription>Kelola daftar pengawas ujian</CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Pengawas
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Pengawas Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nama Pengawas</Label>
                    <Input placeholder="Nama lengkap" />
                  </div>
                  <div>
                    <Label>NIP</Label>
                    <Input placeholder="19YYMMDD..." />
                  </div>
                  <div>
                    <Label>Ruang Tugas</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih ruang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab-a">Lab Komputer A</SelectItem>
                        <SelectItem value="lab-b">Lab Komputer B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="cuti">Cuti</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Simpan Pengawas</Button>
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
                    <TableHead>NIP</TableHead>
                    <TableHead>Ruang Tugas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pengawas.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.nama}</TableCell>
                      <TableCell>{p.nip}</TableCell>
                      <TableCell>{p.ruang}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          p.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {p.status}
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
