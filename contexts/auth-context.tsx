"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import type { User } from "@/types/registration"
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from "@/lib/storage"

interface StoredUser extends User {
  password: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  pendingOtp: { email: string; otp: string; type: "register" | "forgot" } | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, phone: string, name: string) => Promise<{ success: boolean; error?: string; otp?: string }>
  verifyOtp: (otp: string) => Promise<{ success: boolean; error?: string }>
  resendOtp: () => Promise<{ success: boolean; otp?: string }>
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string; otp?: string }>
  resetPassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingOtp, setPendingOtp] = useState<{ email: string; otp: string; type: "register" | "forgot"; userData?: Omit<StoredUser, "id" | "isVerified" | "createdAt"> } | null>(null)

  useEffect(() => {
    const storedUser = getStorageItem<User>(STORAGE_KEYS.USER)
    const session = getStorageItem<string>(STORAGE_KEYS.SESSION)
    if (storedUser && session) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const getUsersDb = useCallback((): StoredUser[] => {
    return getStorageItem<StoredUser[]>(STORAGE_KEYS.USERS_DB) || []
  }, [])

  const saveUsersDb = useCallback((users: StoredUser[]) => {
    setStorageItem(STORAGE_KEYS.USERS_DB, users)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsersDb()
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!foundUser) {
      return { success: false, error: "Email tidak terdaftar" }
    }

    if (foundUser.password !== password) {
      return { success: false, error: "Password salah" }
    }

    if (!foundUser.isVerified) {
      return { success: false, error: "Akun belum diverifikasi. Silakan verifikasi OTP terlebih dahulu." }
    }

    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    setStorageItem(STORAGE_KEYS.USER, userWithoutPassword)
    setStorageItem(STORAGE_KEYS.SESSION, `session_${Date.now()}`)

    return { success: true }
  }, [getUsersDb])

  const register = useCallback(async (
    email: string,
    password: string,
    phone: string,
    name: string
  ): Promise<{ success: boolean; error?: string; otp?: string }> => {
    const users = getUsersDb()
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      return { success: false, error: "Email sudah terdaftar" }
    }

    const otp = generateOtp()
    setPendingOtp({
      email,
      otp,
      type: "register",
      userData: { email, password, phone, name },
    })

    // In real app, send OTP via email/WhatsApp
    // For demo, we return it to display in UI
    return { success: true, otp }
  }, [getUsersDb])

  const verifyOtp = useCallback(async (inputOtp: string): Promise<{ success: boolean; error?: string }> => {
    if (!pendingOtp) {
      return { success: false, error: "Tidak ada verifikasi OTP yang pending" }
    }

    if (inputOtp !== pendingOtp.otp) {
      return { success: false, error: "Kode OTP salah" }
    }

    if (pendingOtp.type === "register" && pendingOtp.userData) {
      const users = getUsersDb()
      const newUser: StoredUser = {
        id: generateUserId(),
        email: pendingOtp.userData.email,
        password: pendingOtp.userData.password,
        phone: pendingOtp.userData.phone,
        name: pendingOtp.userData.name,
        isVerified: true,
        createdAt: new Date().toISOString(),
      }
      users.push(newUser)
      saveUsersDb(users)

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setStorageItem(STORAGE_KEYS.USER, userWithoutPassword)
      setStorageItem(STORAGE_KEYS.SESSION, `session_${Date.now()}`)
    }

    setPendingOtp(null)
    return { success: true }
  }, [pendingOtp, getUsersDb, saveUsersDb])

  const resendOtp = useCallback(async (): Promise<{ success: boolean; otp?: string }> => {
    if (!pendingOtp) {
      return { success: false }
    }

    const newOtp = generateOtp()
    setPendingOtp({ ...pendingOtp, otp: newOtp })

    return { success: true, otp: newOtp }
  }, [pendingOtp])

  const forgotPassword = useCallback(async (email: string): Promise<{ success: boolean; error?: string; otp?: string }> => {
    const users = getUsersDb()
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!foundUser) {
      return { success: false, error: "Email tidak terdaftar" }
    }

    const otp = generateOtp()
    setPendingOtp({ email, otp, type: "forgot" })

    return { success: true, otp }
  }, [getUsersDb])

  const resetPassword = useCallback(async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!pendingOtp || pendingOtp.type !== "forgot") {
      return { success: false, error: "Tidak ada reset password yang pending" }
    }

    const users = getUsersDb()
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === pendingOtp.email.toLowerCase())

    if (userIndex === -1) {
      return { success: false, error: "User tidak ditemukan" }
    }

    users[userIndex].password = newPassword
    saveUsersDb(users)
    setPendingOtp(null)

    return { success: true }
  }, [pendingOtp, getUsersDb, saveUsersDb])

  const logout = useCallback(() => {
    setUser(null)
    removeStorageItem(STORAGE_KEYS.USER)
    removeStorageItem(STORAGE_KEYS.SESSION)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        pendingOtp: pendingOtp ? { email: pendingOtp.email, otp: pendingOtp.otp, type: pendingOtp.type } : null,
        login,
        register,
        verifyOtp,
        resendOtp,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
