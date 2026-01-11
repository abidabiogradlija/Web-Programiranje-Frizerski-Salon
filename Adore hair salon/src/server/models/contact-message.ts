// Model: ContactMessage (tabela `contact_messages`)
// Ovaj fajl predstavlja "Model" sloj u MVC arhitekturi.

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string | null
  message: string
  is_read: 0 | 1
  created_at: string
}

