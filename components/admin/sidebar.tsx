"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, Settings, FileText, Bell, BarChart4, CheckCircle2, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { CampusSwitcher } from "@/components/campus-switcher"

const ADMIN_MENU = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    label: "Executive",
    href: "/admin/executive",
    icon: Crown,
  },
  {
    label: "PMB Management",
    href: "/admin/pmb",
    icon: Settings,
  },
  {
    label: "Registrants",
    href: "/admin/registrants",
    icon: Users,
  },
  {
    label: "Exam Management",
    href: "/admin/exam",
    icon: BarChart4,
  },
  {
    label: "Check-in",
    href: "/admin/check-in",
    icon: CheckCircle2,
  },
  {
    label: "Announcements",
    href: "/admin/announcements",
    icon: Bell,
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center border-b border-border/40 bg-background px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="font-bold">Admin Portal</span>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-border/40 bg-background p-6 lg:block">
        <div className="mb-6 flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <div className="font-bold">PMB Admin</div>
            <div className="text-xs text-muted-foreground">Campus Registration</div>
          </div>
        </div>

        <div className="mb-6 pb-6 border-b">
          <CampusSwitcher />
        </div>

        <nav className="space-y-2">
          {ADMIN_MENU.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border/40 bg-background lg:hidden">
        {ADMIN_MENU.slice(0, 5).map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate">{item.label.split(" ")[0]}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
