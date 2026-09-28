export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
}

export interface SourceCitation {
  id: string
  type: 'link' | 'document'
  title: string
  description: string
  url?: string
  fileType?: string
  fileSize?: string
  pageCount?: number
  previewText?: string
}
