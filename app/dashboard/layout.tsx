"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { RegistrationProvider } from "@/contexts/registration-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Spinner } from "@/components/ui/spinner"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
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
    <RegistrationProvider>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <main className="lg:pl-72">
          <div className="min-h-screen pt-14 lg:pt-0">
            {children}
          </div>
        </main>
      </div>
    </RegistrationProvider>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  )
}
