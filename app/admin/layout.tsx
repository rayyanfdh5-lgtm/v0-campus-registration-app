"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { CampusProvider } from "@/contexts/campus-context"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Spinner } from "@/components/ui/spinner"

function AdminContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
    // Check if user has admin role (in real app, verify from backend)
    if (!isLoading && user && !user.email?.endsWith("@admin")) {
      // For demo, allow all logged-in users to admin panel
      // In production, check user role from database
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:ml-72">
        <div className="min-h-screen pt-14 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <CampusProvider>
        <AdminContent>{children}</AdminContent>
      </CampusProvider>
    </AuthProvider>
  )
}
