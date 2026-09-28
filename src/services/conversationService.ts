import type { Conversation, User, SourceCitation } from '@/domain/types'
import rawData from '@/data/conversations.json'

interface ConversationData {
  user: User
  conversations: Conversation[]
  sources: SourceCitation[]
}

const data = rawData as ConversationData

export function getUser(): User {
  return data.user
}

export function getConversations(): Conversation[] {
  return data.conversations
}

export function getConversationById(id: string): Conversation | undefined {
  return data.conversations.find(c => c.id === id)
}

export function getSources(): SourceCitation[] {
  return data.sources
}
