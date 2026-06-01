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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Download, Eye, Filter } from "lucide-react"

// Mock data
const statistikData = [
  { name: "Gelombang 1", total: 450, terima: 380, tolak: 70 },
  { name: "Gelombang 2", total: 520, terima: 420, tolak: 100 },
  { name: "Gelombang 3", total: 380, terima: 300, tolak: 80 },
]

const auditLog = [
  { id: 1, waktu: "2024-06-13 15:45", user: "Admin 1", aksi: "Verifikasi berkas", detail: "Pendaftar PMB24001 - Berkas ditolak", status: "Sukses" },
  { id: 2, waktu: "2024-06-13 14:20", user: "Admin 2", aksi: "Broadcast email", detail: "750 pendaftar - Hasil pengumuman", status: "Sukses" },
  { id: 3, waktu: "2024-06-13 13:10", user: "Admin 1", aksi: "Ubah kuota", detail: "TI SNBP: 50 → 55", status: "Sukses" },
  { id: 4, waktu: "2024-06-13 11:30", user: "Admin 3", aksi: "Tambah soal", detail: "10 soal CBT ditambahkan", status: "Sukses" },
  { id: 5, waktu: "2024-06-13 10:15", user: "Admin 2", aksi: "Verifikasi pembayaran", detail: "Pendaftar PMB24002 - Pembayaran terverifikasi", status: "Sukses" },
]

const loginHistory = [
  { id: 1, waktu: "2024-06-13 15:30", user: "Admin 1", email: "admin1@univ.ac.id", status: "Berhasil", ipAddress: "192.168.1.100" },
  { id: 2, waktu: "2024-06-13 14:00", user: "Admin 2", email: "admin2@univ.ac.id", status: "Berhasil", ipAddress: "192.168.1.101" },
  { id: 3, waktu: "2024-06-13 13:15", user: "Admin 3", email: "admin3@univ.ac.id", status: "Berhasil", ipAddress: "192.168.1.102" },
  { id: 4, waktu: "2024-06-13 10:45", user: "Admin 1", email: "admin1@univ.ac.id", status: "Gagal (Password salah)", ipAddress: "192.168.1.100" },
]

export default function ReportsPage() {
  const [filterJenis, setFilterJenis] = useState("semua")
  const [filterTanggal, setFilterTanggal] = useState("today")

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold">Laporan & Audit</h1>
        <p className="text-sm text-muted-foreground">Export laporan, statistik PMB, audit log, dan riwayat aktivitas</p>
      </div>

      <Tabs defaultValue="statistik" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="statistik">Statistik PMB</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="login">Login History</TabsTrigger>
        </TabsList>

        {/* Statistik Tab */}
        <TabsContent value="statistik" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Pendaftaran PMB</CardTitle>
              <CardDescription>Ringkasan pendaftaran per gelombang</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statistikData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#3b82f6" name="Total Pendaftar" />
                  <Bar dataKey="terima" fill="#10b981" name="Diterima" />
                  <Bar dataKey="tolak" fill="#ef4444" name="Ditolak" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Pendaftar Keseluruhan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1.350</div>
                <p className="text-xs text-muted-foreground mt-2">+8% dari periode sebelumnya</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Diterima Keseluruhan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1.100</div>
                <p className="text-xs text-muted-foreground mt-2">Acceptance Rate: 81.5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Ditolak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">250</div>
                <p className="text-xs text-muted-foreground mt-2">Rejection Rate: 18.5%</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Export Data Tab */}
        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>Unduh data dalam format PDF atau Excel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Pilih Jenis Laporan</Label>
                  <div className="grid gap-3 mt-3">
                    {[
                      { name: "Data Pendaftar Lengkap", desc: "Export semua data pendaftar dengan biodata" },
                      { name: "Statistik Pendaftaran", desc: "Grafik dan statistik per gelombang/prodi" },
                      { name: "Laporan Verifikasi", desc: "Status verifikasi berkas dan pembayaran" },
                      { name: "Laporan Ujian", desc: "Hasil dan statistik ujian CBT" },
                    ].map((item) => (
                      <div key={item.name} className="border rounded-lg p-3 hover:bg-accent cursor-pointer">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-semibold">Pilih Format</Label>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" className="gap-2 flex-1">
                      <Download className="h-4 w-4" />
                      Export PDF
                    </Button>
                    <Button variant="outline" className="gap-2 flex-1">
                      <Download className="h-4 w-4" />
                      Export Excel
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Label className="font-semibold">Filter Data (Opsional)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <Label className="text-sm">Gelombang</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Semua gelombang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua gelombang</SelectItem>
                          <SelectItem value="g1">Gelombang 1</SelectItem>
                          <SelectItem value="g2">Gelombang 2</SelectItem>
                          <SelectItem value="g3">Gelombang 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Program Studi</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Semua prodi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua prodi</SelectItem>
                          <SelectItem value="ti">Teknik Informatika</SelectItem>
                          <SelectItem value="mn">Manajemen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Riwayat semua aktivitas admin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Select value={filterJenis} onValueChange={setFilterJenis}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Aksi</SelectItem>
                    <SelectItem value="verifikasi">Verifikasi</SelectItem>
                    <SelectItem value="broadcast">Broadcast</SelectItem>
                    <SelectItem value="ubah">Ubah Data</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Cari..." className="flex-1" />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Detail</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">{log.waktu}</TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.aksi}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{log.detail}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {log.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Login History Tab */}
        <TabsContent value="login" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Riwayat login admin portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input type="date" className="w-40" />
                <Input placeholder="Cari user..." className="flex-1" />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginHistory.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">{log.waktu}</TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell className="text-sm">{log.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.ipAddress}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          log.status === "Berhasil" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {log.status}
                        </span>
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
