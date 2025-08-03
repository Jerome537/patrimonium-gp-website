export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  cover?: string
  published: boolean
  publishedAt: Date
  tags: string[]
  author: string
  content?: string
}

export interface Service {
  id: string
  title: string
  slug: string
  summary: string
  body: string
  icon?: string
  order: number
  keywords: string[]
  visible: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo?: string
  email?: string
  phone?: string
  linkedin?: string
  order: number
  visible: boolean
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
}

export interface NotionPageBlock {
  id: string
  type: string
  [key: string]: any
}
