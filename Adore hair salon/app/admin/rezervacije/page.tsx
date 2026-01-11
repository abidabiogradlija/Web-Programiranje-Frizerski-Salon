"use client"

import React from "react"
import { useToast } from "@/hooks/use-toast"

import type { ReactElement } from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronLeft, ChevronRight, Phone } from "lucide-react"

interface Reservation {
  id: number
  client_name: string
  client_email: string | null
  client_phone: string
  service: string
  appointment_date: string
  appointment_time: string
  duration_hours: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes: string | null
  created_at: string
}

const STATUS_LABELS = {
  pending: "Na čekanju",
  confirmed: "Potvrđeno",
  completed: "Završeno",
  cancelled: "Otkazano",
}

const STATUS_COLORS = {
  pending: "bg-orange-500 text-white border-orange-600",
  confirmed: "bg-blue-500 text-white border-blue-600",
  completed: "bg-green-600 text-white border-green-700",
  cancelled: "bg-red-50 text-red-900 border-red-200",
}

const DAYS = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

export default function RezervacijePage(): ReactElement {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()))
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    service: "",
    appointment_date: "",
    appointment_time: "09:00",
    duration_hours: 1,
    status: "pending" as Reservation["status"],
    notes: "",
  })

  function getMonday(date: Date): Date {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  function getWeekDates(startDate: Date): Date[] {
    const dates: Date[] = []
    for (let i = 0; i < 6; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeekStart)

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations")
      if (response.ok) {
        const data = await response.json()
        setReservations(data.reservations)
      }
    } catch (error) {
      console.error("Error fetching reservations:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/reservations/${editingId}` : "/api/reservations"
      const method = editingId ? "PUT" : "POST"

      const formattedData = {
        ...formData,
        appointment_date: formData.appointment_date.split("T")[0],
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })

      if (response.ok) {
        toast({
          title: editingId ? "Rezervacija ažurirana" : "Rezervacija kreirana",
          description: "Promjene su uspješno sačuvane.",
        })
        setDialogOpen(false)
        resetForm()
        fetchReservations()
      } else {
        const data = await response.json()
        toast({
          title: "Greška",
          description: data.error || "Nije moguće sačuvati rezervaciju",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške. Pokušajte ponovo.",
        variant: "destructive",
      })
    }
  }

  const deleteReservation = async (id: number) => {
    if (!confirm("Da li ste sigurni da želite obrisati ovu rezervaciju?")) return

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({ title: "Rezervacija obrisana" })
        setDetailDialogOpen(false)
        fetchReservations()
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nije moguće obrisati rezervaciju",
        variant: "destructive",
      })
    }
  }

  const editReservation = (reservation: Reservation) => {
    setEditingId(reservation.id)
    const dateOnly = reservation.appointment_date.split("T")[0]
    setFormData({
      client_name: reservation.client_name,
      client_email: reservation.client_email || "",
      client_phone: reservation.client_phone,
      service: reservation.service,
      appointment_date: dateOnly,
      appointment_time: reservation.appointment_time.slice(0, 5),
      duration_hours: reservation.duration_hours,
      status: reservation.status,
      notes: reservation.notes || "",
    })
    setDetailDialogOpen(false)
    setDialogOpen(true)
  }

  const resetForm = () => {
    setEditingId(null)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const defaultDate = tomorrow.toISOString().split("T")[0]

    setFormData({
      client_name: "",
      client_email: "",
      client_phone: "",
      service: "",
      appointment_date: defaultDate,
      appointment_time: "09:00",
      duration_hours: 1,
      status: "pending",
      notes: "",
    })
  }

  const previousWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(newStart.getDate() - 7)
    setCurrentWeekStart(newStart)
  }

  const nextWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(newStart.getDate() + 7)
    setCurrentWeekStart(newStart)
  }

  const formatWeekRange = () => {
    const start = weekDates[0]
    const end = weekDates[5]
    return `${start.getDate()}. ${start.toLocaleDateString("sr-Latn-RS", { month: "long" })} – ${end.getDate()}. ${end.toLocaleDateString("sr-Latn-RS", { month: "long", year: "numeric" })}`
  }

  const getReservationsForSlot = (date: Date, hour: number): Reservation[] => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const dateStr = `${year}-${month}-${day}`

    const filtered = reservations.filter((res) => {
      const dbDate = res.appointment_date.split("T")[0]

      if (dbDate !== dateStr) {
        return false
      }

      const resHour = Number.parseInt(res.appointment_time.split(":")[0])
      const resEndHour = resHour + res.duration_hours

      return hour >= resHour && hour < resEndHour
    })

    return filtered
  }

  const isFirstSlot = (reservation: Reservation, hour: number): boolean => {
    const resHour = Number.parseInt(reservation.appointment_time.split(":")[0])
    return hour === resHour
  }

  const calculateReservationLayout = (reservations: Reservation[], date: Date) => {
    const sorted = [...reservations].sort((a, b) => {
      const timeA = a.appointment_time
      const timeB = b.appointment_time
      return timeA.localeCompare(timeB)
    })

    const columns: { reservation: Reservation; endHour: number }[][] = []

    sorted.forEach((reservation) => {
      const startHour = Number.parseInt(reservation.appointment_time.split(":")[0])
      const endHour = startHour + reservation.duration_hours

      let columnIndex = 0
      let foundColumn = false

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        const hasOverlap = column.some((item) => {
          const itemStart = Number.parseInt(item.reservation.appointment_time.split(":")[0])
          const itemEnd = itemStart + item.reservation.duration_hours
          return startHour < itemEnd && endHour > itemStart
        })

        if (!hasOverlap) {
          columnIndex = i
          foundColumn = true
          columns[i].push({ reservation, endHour })
          break
        }
      }

      if (!foundColumn) {
        columnIndex = columns.length
        columns.push([{ reservation, endHour }])
      }
    })

    const layout = new Map<number, { column: number; totalColumns: number }>()

    sorted.forEach((reservation) => {
      const startHour = Number.parseInt(reservation.appointment_time.split(":")[0])
      const endHour = startHour + reservation.duration_hours

      let columnIndex = 0
      for (let i = 0; i < columns.length; i++) {
        const found = columns[i].find((item) => item.reservation.id === reservation.id)
        if (found) {
          columnIndex = i
          break
        }
      }

      let maxColumns = 1
      columns.forEach((column) => {
        const overlaps = column.some((item) => {
          const itemStart = Number.parseInt(item.reservation.appointment_time.split(":")[0])
          const itemEnd = itemStart + item.reservation.duration_hours
          return startHour < itemEnd && endHour > itemStart
        })
        if (overlaps) maxColumns = Math.max(maxColumns, columns.length)
      })

      layout.set(reservation.id, { column: columnIndex, totalColumns: columns.length })
    })

    return layout
  }

  const getReservationsForDay = (date: Date): Reservation[] => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const dateStr = `${year}-${month}-${day}`

    return reservations.filter((res) => {
      const dbDate = res.appointment_date.split("T")[0]
      return dbDate === dateStr
    })
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const defaultDate = tomorrow.toISOString().split("T")[0]
    setFormData((prev) => ({ ...prev, appointment_date: defaultDate }))
  }, [])

  return (
      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-light tracking-wide">Rezervacije termina</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={previousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[200px] text-center text-sm">{formatWeekRange()}</span>
              <Button variant="outline" size="icon" onClick={nextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-neutral-900 hover:bg-neutral-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova rezervacija
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingId ? "Uredi rezervaciju" : "Nova rezervacija"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Ime klijenta *</Label>
                    <Input
                        id="client_name"
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client_email">Email</Label>
                    <Input
                        id="client_email"
                        type="email"
                        value={formData.client_email}
                        onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client_phone">Telefon *</Label>
                    <Input
                        id="client_phone"
                        type="tel"
                        value={formData.client_phone}
                        onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                        required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Usluga *</Label>
                    <Input
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointment_date">Datum *</Label>
                      <Input
                          id="appointment_date"
                          type="date"
                          value={formData.appointment_date}
                          onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                          required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointment_time">Vrijeme *</Label>
                      <Select
                          value={formData.appointment_time}
                          onValueChange={(value) => setFormData({ ...formData, appointment_time: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS.slice(0, -1).map((hour) => (
                              <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                                {hour.toString().padStart(2, "0")}:00
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration_hours">Trajanje (sati) *</Label>
                    <Select
                        value={formData.duration_hours.toString()}
                        onValueChange={(value) => setFormData({ ...formData, duration_hours: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 sat</SelectItem>
                        <SelectItem value="2">2 sata</SelectItem>
                        <SelectItem value="3">3 sata</SelectItem>
                        <SelectItem value="4">4 sata</SelectItem>
                        <SelectItem value="5">5 sati</SelectItem>
                        <SelectItem value="6">6 sati</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value as Reservation["status"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Na čekanju</SelectItem>
                        <SelectItem value="confirmed">Potvrđeno</SelectItem>
                        <SelectItem value="completed">Završeno</SelectItem>
                        <SelectItem value="cancelled">Otkazano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Napomene</Label>
                    <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingId ? "Sačuvaj izmjene" : "Kreiraj rezervaciju"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setDialogOpen(false)
                          resetForm()
                        }}
                    >
                      Otkaži
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-px bg-neutral-200">
              <div className="bg-white p-3"></div>
              {weekDates.map((date, idx) => (
                  <div key={idx} className="bg-neutral-50 p-3 text-center">
                    <div className="text-sm font-medium text-neutral-900">{DAYS[idx]}</div>
                    <div className="mt-1 text-xs text-neutral-500">
                      {date.getDate()}. {date.toLocaleDateString("sr-Latn-RS", { month: "short" })}
                    </div>
                  </div>
              ))}
            </div>

            <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-px bg-neutral-200">
              {HOURS.map((hour) => (
                  <React.Fragment key={hour}>
                    <div className="bg-white p-3 text-center text-sm text-neutral-600">
                      {hour.toString().padStart(2, "0")}:00
                    </div>

                    {weekDates.map((date, dayIdx) => {
                      const reservationsInSlot = getReservationsForSlot(date, hour)
                      const dayReservations = getReservationsForDay(date)
                      const layout = calculateReservationLayout(dayReservations, date)

                      return (
                          <div key={dayIdx} className="relative min-h-[60px] bg-white p-1">
                            {reservationsInSlot.map((reservation) => {
                              if (!isFirstSlot(reservation, hour)) return null

                              const resHour = Number.parseInt(reservation.appointment_time.split(":")[0])
                              const resMinute = Number.parseInt(reservation.appointment_time.split(":")[1])
                              const heightMultiplier = reservation.duration_hours

                              const layoutInfo = layout.get(reservation.id) || { column: 0, totalColumns: 1 }
                              const widthPercent = 100 / layoutInfo.totalColumns
                              const leftPercent = widthPercent * layoutInfo.column

                              return (
                                  <button
                                      key={reservation.id}
                                      onClick={() => {
                                        setSelectedReservation(reservation)
                                        setDetailDialogOpen(true)
                                      }}
                                      className={`absolute z-10 rounded-md p-2 text-left text-xs shadow-sm ${STATUS_COLORS[reservation.status]}`}
                                      style={{
                                        top: "4px",
                                        height: `calc(${heightMultiplier} * 60px - 12px)`,
                                        left: `calc(${leftPercent}% + 4px)`,
                                        width: `calc(${widthPercent}% - 8px)`,
                                      }}
                                  >
                                    <div className="font-semibold truncate">{reservation.client_name}</div>
                                    <div className="mt-0.5 opacity-90 truncate">{reservation.service}</div>
                                    {widthPercent > 40 && (
                                        <div className="mt-1 flex items-center gap-1 text-[10px] opacity-80">
                                          <Phone className="h-2.5 w-2.5" />
                                          {reservation.client_phone}
                                        </div>
                                    )}
                                  </button>
                              )
                            })}
                          </div>
                      )
                    })}
                  </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedReservation?.client_name}</span>
                <Badge className={selectedReservation ? STATUS_COLORS[selectedReservation.status] : ""}>
                  {selectedReservation && STATUS_LABELS[selectedReservation.status]}
                </Badge>
              </DialogTitle>
            </DialogHeader>

            {selectedReservation && (
                <div className="space-y-4">
                  <div>
                    <div className="text-lg font-medium">{selectedReservation.service}</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Vrijeme:</span>
                      <span>
                    {selectedReservation.appointment_time.slice(0, 5)} (
                        {selectedReservation.duration_hours === 1 ? "1 sat" : `${selectedReservation.duration_hours} sata`})
                  </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{selectedReservation.client_phone}</span>
                    </div>

                    {selectedReservation.client_email && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Email:</span>
                          <span>{selectedReservation.client_email}</span>
                        </div>
                    )}

                    {selectedReservation.notes && (
                        <div className="rounded-md bg-neutral-50 p-3">
                          <div className="mb-1 text-xs font-medium text-neutral-600">Napomena:</div>
                          <div className="text-sm">{selectedReservation.notes}</div>
                        </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => editReservation(selectedReservation)}
                    >
                      Uredi
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => deleteReservation(selectedReservation.id)}
                    >
                      Obriši
                    </Button>
                  </div>
                </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  )
}
