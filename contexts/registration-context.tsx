"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import type {
  RegistrationData,
  DataPribadi,
  DataOrangTua,
  DataSekolah,
  NilaiRapor,
  Prestasi,
  DocumentUpload,
  PilihanProdi,
  Pembayaran,
  ApplicationStatus,
  StatusHistoryItem,
  UploadedFile,
  PaymentMethod,
} from "@/types/registration"
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage"
import { INITIAL_DOCUMENTS, generateNoPendaftaran, generateVirtualAccount, PRODI_LIST } from "@/lib/mock-data"
import { useAuth } from "./auth-context"

interface RegistrationContextType {
  registration: RegistrationData | null
  isLoading: boolean
  completionPercentage: number
  // Data Pribadi
  updateDataPribadi: (data: Partial<DataPribadi>) => void
  // Data Orang Tua
  updateDataOrangTua: (data: Partial<DataOrangTua>) => void
  // Data Sekolah
  updateDataSekolah: (data: Partial<DataSekolah>) => void
  // Nilai Rapor
  addNilaiRapor: (nilai: Omit<NilaiRapor, "id">) => void
  updateNilaiRapor: (id: string, nilai: Partial<NilaiRapor>) => void
  removeNilaiRapor: (id: string) => void
  // Prestasi
  addPrestasi: (prestasi: Omit<Prestasi, "id">) => void
  updatePrestasi: (id: string, prestasi: Partial<Prestasi>) => void
  removePrestasi: (id: string) => void
  // Documents
  uploadDocument: (type: DocumentUpload["type"], file: UploadedFile) => void
  removeDocument: (type: DocumentUpload["type"]) => void
  // Pilihan Prodi
  setPilihanProdi: (pilihan: PilihanProdi[]) => void
  // Payment
  initPayment: (method: PaymentMethod, bankCode?: string, ewalletProvider?: string) => void
  uploadBuktiTransfer: (file: UploadedFile) => void
  // Status
  submitRegistration: () => void
  // Reset
  resetRegistration: () => void
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined)

const INITIAL_DATA_PRIBADI: DataPribadi = {
  namaLengkap: "",
  nik: "",
  tempatLahir: "",
  tanggalLahir: "",
  jenisKelamin: "",
  agama: "",
  kewarganegaraan: "Indonesia",
  alamat: "",
  rt: "",
  rw: "",
  kelurahan: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
  kodePos: "",
  noHp: "",
  email: "",
}

const INITIAL_DATA_ORANGTUA: DataOrangTua = {
  namaAyah: "",
  nikAyah: "",
  pekerjaanAyah: "",
  pendidikanAyah: "",
  penghasilanAyah: "",
  noHpAyah: "",
  namaIbu: "",
  nikIbu: "",
  pekerjaanIbu: "",
  pendidikanIbu: "",
  penghasilanIbu: "",
  noHpIbu: "",
  alamatOrangTua: "",
}

const INITIAL_DATA_SEKOLAH: DataSekolah = {
  namaSekolah: "",
  npsn: "",
  jenjang: "",
  jurusan: "",
  alamatSekolah: "",
  kabupatenSekolah: "",
  provinsiSekolah: "",
  tahunLulus: "",
  nisn: "",
  noIjazah: "",
}

function createInitialRegistration(userId: string): RegistrationData {
  return {
    userId,
    dataPribadi: INITIAL_DATA_PRIBADI,
    dataOrangTua: INITIAL_DATA_ORANGTUA,
    dataSekolah: INITIAL_DATA_SEKOLAH,
    nilaiRapor: [],
    prestasi: [],
    documents: [...INITIAL_DOCUMENTS],
    pilihanProdi: [],
    status: "draft",
    statusHistory: [{ status: "draft", timestamp: new Date().toISOString(), note: "Pendaftaran dimulai" }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function calculateCompletion(reg: RegistrationData): number {
  let total = 0
  let filled = 0

  // Data Pribadi (20%)
  const pribadiFields = Object.values(reg.dataPribadi).filter((v) => v !== "")
  total += 20
  filled += (pribadiFields.length / Object.keys(reg.dataPribadi).length) * 20

  // Data Orang Tua (15%)
  const ortuFields = Object.values(reg.dataOrangTua).filter((v) => v !== "" && v !== undefined)
  const requiredOrtuFields = Object.keys(reg.dataOrangTua).filter((k) => !k.includes("Wali"))
  total += 15
  filled += (ortuFields.length / requiredOrtuFields.length) * 15

  // Data Sekolah (15%)
  const sekolahFields = Object.values(reg.dataSekolah).filter((v) => v !== "")
  total += 15
  filled += (sekolahFields.length / Object.keys(reg.dataSekolah).length) * 15

  // Nilai Rapor (10%)
  total += 10
  filled += reg.nilaiRapor.length >= 5 ? 10 : (reg.nilaiRapor.length / 5) * 10

  // Documents (20%)
  const requiredDocs = reg.documents.filter((d) => d.required)
  const uploadedDocs = requiredDocs.filter((d) => d.file)
  total += 20
  filled += (uploadedDocs.length / requiredDocs.length) * 20

  // Pilihan Prodi (10%)
  total += 10
  filled += reg.pilihanProdi.length >= 1 ? 10 : 0

  // Pembayaran (10%)
  total += 10
  filled += reg.pembayaran?.status === "verified" ? 10 : reg.pembayaran?.buktiTransfer ? 5 : 0

  return Math.round((filled / total) * 100)
}

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [registration, setRegistration] = useState<RegistrationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const stored = getStorageItem<RegistrationData>(`${STORAGE_KEYS.REGISTRATION}_${user.id}`)
      if (stored) {
        setRegistration(stored)
      } else {
        const newReg = createInitialRegistration(user.id)
        newReg.dataPribadi.email = user.email
        newReg.dataPribadi.noHp = user.phone
        newReg.dataPribadi.namaLengkap = user.name
        setRegistration(newReg)
        setStorageItem(`${STORAGE_KEYS.REGISTRATION}_${user.id}`, newReg)
      }
    } else {
      setRegistration(null)
    }
    setIsLoading(false)
  }, [user])

  const saveRegistration = useCallback((reg: RegistrationData) => {
    const updated = { ...reg, updatedAt: new Date().toISOString() }
    setRegistration(updated)
    if (user) {
      setStorageItem(`${STORAGE_KEYS.REGISTRATION}_${user.id}`, updated)
    }
  }, [user])

  const updateDataPribadi = useCallback((data: Partial<DataPribadi>) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      dataPribadi: { ...registration.dataPribadi, ...data },
    })
  }, [registration, saveRegistration])

  const updateDataOrangTua = useCallback((data: Partial<DataOrangTua>) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      dataOrangTua: { ...registration.dataOrangTua, ...data },
    })
  }, [registration, saveRegistration])

  const updateDataSekolah = useCallback((data: Partial<DataSekolah>) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      dataSekolah: { ...registration.dataSekolah, ...data },
    })
  }, [registration, saveRegistration])

  const addNilaiRapor = useCallback((nilai: Omit<NilaiRapor, "id">) => {
    if (!registration) return
    const newNilai: NilaiRapor = {
      ...nilai,
      id: `nilai_${Date.now()}`,
    }
    saveRegistration({
      ...registration,
      nilaiRapor: [...registration.nilaiRapor, newNilai],
    })
  }, [registration, saveRegistration])

  const updateNilaiRapor = useCallback((id: string, nilai: Partial<NilaiRapor>) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      nilaiRapor: registration.nilaiRapor.map((n) => (n.id === id ? { ...n, ...nilai } : n)),
    })
  }, [registration, saveRegistration])

  const removeNilaiRapor = useCallback((id: string) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      nilaiRapor: registration.nilaiRapor.filter((n) => n.id !== id),
    })
  }, [registration, saveRegistration])

  const addPrestasi = useCallback((prestasi: Omit<Prestasi, "id">) => {
    if (!registration) return
    const newPrestasi: Prestasi = {
      ...prestasi,
      id: `prestasi_${Date.now()}`,
    }
    saveRegistration({
      ...registration,
      prestasi: [...registration.prestasi, newPrestasi],
    })
  }, [registration, saveRegistration])

  const updatePrestasi = useCallback((id: string, prestasi: Partial<Prestasi>) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      prestasi: registration.prestasi.map((p) => (p.id === id ? { ...p, ...prestasi } : p)),
    })
  }, [registration, saveRegistration])

  const removePrestasi = useCallback((id: string) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      prestasi: registration.prestasi.filter((p) => p.id !== id),
    })
  }, [registration, saveRegistration])

  const uploadDocument = useCallback((type: DocumentUpload["type"], file: UploadedFile) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      documents: registration.documents.map((d) =>
        d.type === type ? { ...d, file } : d
      ),
    })
  }, [registration, saveRegistration])

  const removeDocument = useCallback((type: DocumentUpload["type"]) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      documents: registration.documents.map((d) =>
        d.type === type ? { ...d, file: undefined } : d
      ),
    })
  }, [registration, saveRegistration])

  const setPilihanProdi = useCallback((pilihan: PilihanProdi[]) => {
    if (!registration) return
    saveRegistration({
      ...registration,
      pilihanProdi: pilihan,
    })
  }, [registration, saveRegistration])

  const initPayment = useCallback((method: PaymentMethod, bankCode?: string, ewalletProvider?: string) => {
    if (!registration) return
    
    const prodi = registration.pilihanProdi[0]
    const prodiData = PRODI_LIST.find((p) => p.id === prodi?.prodiId)
    const amount = prodiData?.biayaRegistrasi || 350000

    const payment: Pembayaran = {
      id: `pay_${Date.now()}`,
      amount,
      method,
      status: "pending",
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    }

    if (method === "virtual_account" && bankCode) {
      payment.bankCode = bankCode
      payment.virtualAccountNumber = generateVirtualAccount(bankCode)
    } else if (method === "qris") {
      payment.qrisCode = `QRIS-PMB-${Date.now()}`
    } else if (method === "ewallet" && ewalletProvider) {
      payment.ewalletProvider = ewalletProvider
      payment.ewalletNumber = `${ewalletProvider.toUpperCase()}-${Math.floor(Math.random() * 1000000)}`
    }

    saveRegistration({
      ...registration,
      pembayaran: payment,
    })
  }, [registration, saveRegistration])

  const uploadBuktiTransfer = useCallback((file: UploadedFile) => {
    if (!registration || !registration.pembayaran) return
    saveRegistration({
      ...registration,
      pembayaran: {
        ...registration.pembayaran,
        buktiTransfer: file,
        paidAt: new Date().toISOString(),
      },
    })
  }, [registration, saveRegistration])

  const submitRegistration = useCallback(() => {
    if (!registration) return

    const noPendaftaran = registration.noPendaftaran || generateNoPendaftaran()
    const newStatus: ApplicationStatus = "menunggu_verifikasi"
    const historyItem: StatusHistoryItem = {
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: "Pendaftaran disubmit, menunggu verifikasi berkas",
    }

    saveRegistration({
      ...registration,
      noPendaftaran,
      status: newStatus,
      statusHistory: [...registration.statusHistory, historyItem],
    })
  }, [registration, saveRegistration])

  const resetRegistration = useCallback(() => {
    if (!user) return
    const newReg = createInitialRegistration(user.id)
    newReg.dataPribadi.email = user.email
    newReg.dataPribadi.noHp = user.phone
    newReg.dataPribadi.namaLengkap = user.name
    saveRegistration(newReg)
  }, [user, saveRegistration])

  const completionPercentage = registration ? calculateCompletion(registration) : 0

  return (
    <RegistrationContext.Provider
      value={{
        registration,
        isLoading,
        completionPercentage,
        updateDataPribadi,
        updateDataOrangTua,
        updateDataSekolah,
        addNilaiRapor,
        updateNilaiRapor,
        removeNilaiRapor,
        addPrestasi,
        updatePrestasi,
        removePrestasi,
        uploadDocument,
        removeDocument,
        setPilihanProdi,
        initPayment,
        uploadBuktiTransfer,
        submitRegistration,
        resetRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistration() {
  const context = useContext(RegistrationContext)
  if (context === undefined) {
    throw new Error("useRegistration must be used within a RegistrationProvider")
  }
  return context
}
