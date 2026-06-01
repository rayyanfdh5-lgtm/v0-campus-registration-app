"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, CheckCircle, Clock } from "lucide-react"

// Mock analytics data
const registrantsPerDay = [
  { date: "1", total: 45 },
  { date: "2", total: 52 },
  { date: "3", total: 48 },
  { date: "4", total: 61 },
  { date: "5", total: 55 },
  { date: "6", total: 67 },
  { date: "7", total: 72 },
  { date: "8", total: 68 },
  { date: "9", total: 79 },
  { date: "10", total: 85 },
]

const registrantsByProdi = [
  { name: "Teknik Informatika", value: 245, color: "#3b82f6" },
  { name: "Manajemen", value: 198, color: "#8b5cf6" },
  { name: "Teknik Sipil", value: 156, color: "#ec4899" },
  { name: "Kedokteran", value: 143, color: "#f59e0b" },
  { name: "Hukum", value: 127, color: "#10b981" },
  { name: "Lainnya", value: 181, color: "#6366f1" },
]

const registrantsByWave = [
  { name: "Gelombang 1", registrasi: 320, terima: 280, tolak: 40 },
  { name: "Gelombang 2", registrasi: 380, terima: 310, tolak: 70 },
  { name: "Gelombang 3", registrasi: 260, terima: 200, tolak: 60 },
]

const COLORS_PRODI = registrantsByProdi.map(p => p.color)

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("month")

  // Mock KPI data
  const totalRegistrants = 850
  const totalAccepted = 790
  const pendingVerification = 45
  const rejected = 15

  const acceptanceRate = ((totalAccepted / totalRegistrants) * 100).toFixed(1)

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PMB Dashboard</h1>
          <p className="text-sm text-muted-foreground">Sistem Informasi Penerimaan Mahasiswa Baru</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrants}</div>
            <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Diterima</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAccepted}</div>
            <p className="text-xs text-muted-foreground">Acceptance Rate: {acceptanceRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu Verifikasi</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVerification}</div>
            <p className="text-xs text-muted-foreground">{((pendingVerification / totalRegistrants) * 100).toFixed(1)}% dari total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejected}</div>
            <p className="text-xs text-muted-foreground">{((rejected / totalRegistrants) * 100).toFixed(1)}% dari total</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Registrants per day */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Grafik Pendaftar Per Hari</CardTitle>
            <CardDescription>Tren pendaftaran selama sebulan terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrantsPerDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                  name="Jumlah Pendaftar"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Registrants by program */}
        <Card>
          <CardHeader>
            <CardTitle>Grafik Per Prodi</CardTitle>
            <CardDescription>Distribusi pendaftar berdasarkan program studi</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={registrantsByProdi}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {registrantsByProdi.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Registrants by wave */}
        <Card>
          <CardHeader>
            <CardTitle>Grafik Per Gelombang</CardTitle>
            <CardDescription>Statistik per gelombang pendaftaran</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={registrantsByWave}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="registrasi" fill="#3b82f6" name="Pendaftar" />
                <Bar dataKey="terima" fill="#10b981" name="Diterima" />
                <Bar dataKey="tolak" fill="#ef4444" name="Ditolak" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Status Pendaftaran</CardTitle>
          <CardDescription>Breakdown status pendaftar saat ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Selesai Verifikasi Berkas", value: 750, color: "bg-green-500" },
              { label: "Berkas Ditolak", value: 25, color: "bg-red-500" },
              { label: "Menunggu Verifikasi Berkas", value: 45, color: "bg-amber-500" },
              { label: "Menunggu Pembayaran", value: 30, color: "bg-blue-500" },
            ].map((status) => (
              <div key={status.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{status.label}</span>
                  <span className="text-sm font-bold">{status.value}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${status.color}`}
                    style={{ width: `${(status.value / totalRegistrants) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
