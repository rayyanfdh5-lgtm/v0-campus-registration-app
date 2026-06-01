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
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Eye, Check, X, AlertCircle } from "lucide-react"

// Mock registrants data
const mockRegistrants = [
  {
    id: 1,
    noPendaftaran: "PMB24001",
    nama: "Budi Santoso",
    email: "budi@example.com",
    prodi: "Teknik Informatika",
    jalur: "SNBP",
    status: "Menunggu Verifikasi Berkas",
    berkas: "pending",
    pembayaran: "pending",
    createdAt: "2024-06-01",
  },
  {
    id: 2,
    noPendaftaran: "PMB24002",
    nama: "Siti Nurhaliza",
    email: "siti@example.com",
    prodi: "Manajemen",
    jalur: "SNBT",
    status: "Berkas Diterima",
    berkas: "approved",
    pembayaran: "pending",
    createdAt: "2024-06-02",
  },
  {
    id: 3,
    noPendaftaran: "PMB24003",
    nama: "Ahmad Wijaya",
    email: "ahmad@example.com",
    prodi: "Teknik Sipil",
    jalur: "Mandiri",
    status: "Pembayaran Diverifikasi",
    berkas: "approved",
    pembayaran: "approved",
    createdAt: "2024-06-03",
  },
  {
    id: 4,
    noPendaftaran: "PMB24004",
    nama: "Rina Kusuma",
    email: "rina@example.com",
    prodi: "Hukum",
    jalur: "Prestasi",
    status: "Berkas Ditolak",
    berkas: "rejected",
    pembayaran: "pending",
    createdAt: "2024-06-04",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    case "pending":
      return "bg-amber-100 text-amber-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function RegistrantManagement() {
  const [registrants, setRegistrants] = useState(mockRegistrants)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedRegistrant, setSelectedRegistrant] = useState<(typeof mockRegistrants)[0] | null>(null)

  const filtered = registrants.filter((r) => {
    const matchesSearch = r.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.noPendaftaran.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || r.status.includes(filterStatus)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold">Manajemen Pendaftar</h1>
        <p className="text-sm text-muted-foreground">Kelola data pendaftar, verifikasi berkas dan pembayaran</p>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Daftar Pendaftar</TabsTrigger>
          <TabsTrigger value="verify-docs">Verifikasi Berkas</TabsTrigger>
          <TabsTrigger value="verify-payment">Verifikasi Pembayaran</TabsTrigger>
        </TabsList>

        {/* List Tab */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Semua Pendaftar</CardTitle>
              <CardDescription>Kelola dan filter data pendaftar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Cari nama atau no. pendaftaran..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Menunggu">Menunggu</SelectItem>
                    <SelectItem value="Diterima">Diterima</SelectItem>
                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>No. Pendaftaran</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Program Studi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">{r.noPendaftaran}</TableCell>
                      <TableCell>{r.nama}</TableCell>
                      <TableCell className="text-sm">{r.email}</TableCell>
                      <TableCell>{r.prodi}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {r.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedRegistrant(r)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detail Pendaftar</DialogTitle>
                            </DialogHeader>
                            {selectedRegistrant && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">No. Pendaftaran</Label>
                                    <div className="font-semibold">{selectedRegistrant.noPendaftaran}</div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Nama</Label>
                                    <div className="font-semibold">{selectedRegistrant.nama}</div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Email</Label>
                                    <div className="font-semibold">{selectedRegistrant.email}</div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Program Studi</Label>
                                    <div className="font-semibold">{selectedRegistrant.prodi}</div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Jalur Masuk</Label>
                                    <div className="font-semibold">{selectedRegistrant.jalur}</div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Tanggal Daftar</Label>
                                    <div className="font-semibold">{selectedRegistrant.createdAt}</div>
                                  </div>
                                </div>

                                <div className="border-t pt-4 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">Status Berkas</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedRegistrant.berkas)}`}>
                                      {selectedRegistrant.berkas === "approved" && "Disetujui"}
                                      {selectedRegistrant.berkas === "rejected" && "Ditolak"}
                                      {selectedRegistrant.berkas === "pending" && "Menunggu"}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">Status Pembayaran</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedRegistrant.pembayaran)}`}>
                                      {selectedRegistrant.pembayaran === "approved" && "Diverifikasi"}
                                      {selectedRegistrant.pembayaran === "pending" && "Menunggu"}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex gap-2 pt-4 border-t">
                                  <Button variant="outline" className="flex-1">Lihat Dokumen</Button>
                                  <Button className="flex-1">Ambil Aksi</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verify Docs Tab */}
        <TabsContent value="verify-docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verifikasi Berkas</CardTitle>
              <CardDescription>Periksa dan verifikasi dokumen pendaftar</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Pendaftaran</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrants.filter(r => r.berkas === "pending").map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.noPendaftaran}</TableCell>
                      <TableCell>{r.nama}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          Menunggu Verifikasi
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-1" variant="outline">
                            <X className="h-4 w-4" />
                            Tolak
                          </Button>
                          <Button size="sm" className="gap-1">
                            <Check className="h-4 w-4" />
                            Terima
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verify Payment Tab */}
        <TabsContent value="verify-payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verifikasi Pembayaran</CardTitle>
              <CardDescription>Periksa dan verifikasi bukti pembayaran</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Pendaftaran</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrants.filter(r => r.pembayaran === "pending").map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.noPendaftaran}</TableCell>
                      <TableCell>{r.nama}</TableCell>
                      <TableCell>Rp 500.000</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          Menunggu Verifikasi
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-4 w-4" />
                            Lihat Bukti
                          </Button>
                          <Button size="sm" className="gap-1">
                            <Check className="h-4 w-4" />
                            Verifikasi
                          </Button>
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
