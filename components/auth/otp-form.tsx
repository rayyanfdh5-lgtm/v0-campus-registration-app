"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GraduationCap, Loader2, Mail, Phone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function OtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { pendingOtp, verifyOtp, resendOtp } = useAuth()
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Demo OTP from URL
  const demoOtp = searchParams.get("otp")

  useEffect(() => {
    if (!pendingOtp) {
      router.push("/auth/register")
    }
  }, [pendingOtp, router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await verifyOtp(otp)
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Verifikasi gagal")
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setError("")
    const result = await resendOtp()
    if (result.success) {
      setCountdown(60)
      setCanResend(false)
      // Update URL with new OTP for demo
      if (result.otp) {
        router.replace(`/auth/verify-otp?otp=${result.otp}`)
      }
    }
  }

  if (!pendingOtp) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Verifikasi OTP</CardTitle>
          <CardDescription>
            Masukkan kode OTP yang dikirim ke email/WhatsApp Anda
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {demoOtp && (
              <Alert className="border-primary/20 bg-primary/5">
                <Mail className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  <span className="font-medium">Demo Mode:</span> Kode OTP Anda adalah{" "}
                  <span className="font-mono font-bold text-primary">{demoOtp}</span>
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="rounded-lg border bg-secondary/30 p-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  {pendingOtp.type === "register" ? (
                    <Mail className="h-4 w-4 text-primary" />
                  ) : (
                    <Phone className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">Kode dikirim ke</p>
                  <p>{pendingOtp.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Kode OTP</Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Masukkan 6 digit kode"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="text-center text-lg font-mono tracking-widest"
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verifikasi
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-medium text-primary hover:underline"
                >
                  Kirim ulang kode
                </button>
              ) : (
                <span>Kirim ulang dalam {countdown} detik</span>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
