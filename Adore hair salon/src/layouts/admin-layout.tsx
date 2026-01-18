import { Outlet } from "react-router-dom"
import { AuthProvider } from "@/utils/use-auth"
import { AdminLayout } from "@/components/admin-layout"

export default function AdminLayoutWrapper() {
  return (
    <AuthProvider>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AuthProvider>
  )
}
