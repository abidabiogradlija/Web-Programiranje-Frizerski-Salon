import { Routes, Route } from "react-router-dom"
import RootLayout from "@/src/layouts/root-layout"
import AdminLayoutWrapper from "@/src/layouts/admin-layout"
import HomePage from "@/src/pages/home-page"
import KontaktPage from "@/src/pages/kontakt-page"
import UslugePage from "@/src/pages/usluge-page"
import ProizvodiPage from "@/src/pages/proizvodi-page"
import LoginPage from "@/src/pages/login-page"
import AdminPage from "@/src/pages/admin-page"
import RezervacijePage from "@/src/pages/rezervacije-page"
import PorukePage from "@/src/pages/poruke-page"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="kontakt" element={<KontaktPage />} />
        <Route path="usluge" element={<UslugePage />} />
        <Route path="proizvodi" element={<ProizvodiPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayoutWrapper />}>
        <Route index element={<AdminPage />} />
        <Route path="rezervacije" element={<RezervacijePage />} />
        <Route path="poruke" element={<PorukePage />} />
      </Route>
    </Routes>
  )
}
