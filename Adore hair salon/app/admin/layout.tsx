"use client"

import type React from "react"

import { AuthProvider } from "@/utils/use-auth"
import { AdminLayout } from "@/components/admin-layout"

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  )
}
