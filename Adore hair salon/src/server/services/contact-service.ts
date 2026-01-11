import pool from "@/utils/db"
import type { ContactMessage } from "../models/contact-message"

// Service sloj: sav rad sa bazom za contact_messages.
export class ContactService {
  static async create(input: { name: string; email: string; phone?: string | null; message: string }) {
    await pool.execute("INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)", [
      input.name,
      input.email,
      input.phone || null,
      input.message,
    ])

    return { success: true }
  }

  static async list(): Promise<ContactMessage[]> {
    const [rows] = await pool.execute("SELECT * FROM contact_messages ORDER BY created_at DESC")
    return rows as ContactMessage[]
  }

  static async getById(id: number): Promise<ContactMessage | null> {
    const [rows] = await pool.execute("SELECT * FROM contact_messages WHERE id = ? LIMIT 1", [id])
    const list = rows as ContactMessage[]
    return list[0] ?? null
  }

  static async update(id: number, input: { is_read?: boolean }) {
    if (typeof input.is_read === "boolean") {
      await pool.execute("UPDATE contact_messages SET is_read = ? WHERE id = ?", [input.is_read ? 1 : 0, id])
    }
    return { success: true }
  }

  static async remove(id: number) {
    await pool.execute("DELETE FROM contact_messages WHERE id = ?", [id])
    return { success: true }
  }
}

